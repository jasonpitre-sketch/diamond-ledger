/**
 * DAILY SCHEDULER — Pass 72
 * ═══════════════════════════════════════════════════════════════════════════
 * Orchestrates daily ingestion for all active roster players.
 *
 * Runs at 6 AM ET (11:00 UTC) via Vercel Cron.
 * Can also be invoked manually for a specific date, or with --dry-run.
 *
 * Execution flow:
 *   1. Determine target date (yesterday in America/New_York)
 *   2. Query roster table for all active players
 *   3. For each player, route to the appropriate adapter by data_source
 *   4. Adapter returns AdapterResult (success / no_game / error)
 *   5. On success: call ingest-game.mjs as child process
 *   6. Update roster.last_ingested_* fields
 *   7. Write row to daily_ingestion_log
 *   8. Send email summary via Resend
 *
 * CLI usage:
 *   node scripts/daily-scheduler.mjs [--date YYYY-MM-DD] [--dry-run]
 *
 * Flags:
 *   --date YYYY-MM-DD   Override target date (default: yesterday ET)
 *   --dry-run           Run adapters, print what would happen; no ingestions, no Supabase writes
 *
 * Design rules:
 *   - Players are processed sequentially (no parallelism in v1)
 *   - Per-player timeout: 30 seconds
 *   - One player failure never blocks the next
 *   - Email is best-effort; failure does not fail the run
 *   - Idempotency: if roster.last_ingested_date === targetDate, skip
 *
 * See: data/dlr/MLB_AUTOMATION_RULES.md
 */

import { createClient }    from "@supabase/supabase-js"
import { spawn }           from "child_process"
import { readFileSync, existsSync } from "fs"
import { join, dirname }   from "path"
import { fileURLToPath }   from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = join(__dirname, "..")

// ─────────────────────────────────────────────────────────────────────────────
// ENV LOADER (mirrors ingest-game.mjs pattern)
// ─────────────────────────────────────────────────────────────────────────────

function loadEnv(filePath) {
  try {
    const raw = readFileSync(filePath, "utf8")
    const env = {}
    for (const line of raw.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const idx = trimmed.indexOf("=")
      if (idx === -1) continue
      const key = trimmed.slice(0, idx).trim()
      let val    = trimmed.slice(idx + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      env[key] = val
    }
    return env
  } catch {
    return {}
  }
}

const fileEnv = {
  ...loadEnv(join(ROOT, ".env")),
  ...loadEnv(join(ROOT, ".env.local")),
}

function env(key) {
  return process.env[key] ?? fileEnv[key] ?? ""
}

// ─────────────────────────────────────────────────────────────────────────────
// ADAPTER REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

async function loadAdapter(dataSource) {
  switch (dataSource) {
    case "mlb_stats_api":
      return await import("./adapters/mlb-stats-api.mjs")
    case "milb_stats_api":
      return await import("./adapters/milb-stats-api.mjs")  // Pass 74
    case "ncaa_ucla_scrape":
      return null  // Pass 75
    case "manual":
      return null  // permanent manual
    default:
      return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DATE UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns yesterday's date in America/New_York timezone as YYYY-MM-DD.
 * Games played yesterday (ET) are finalized and ready to ingest this morning.
 */
function yesterdayET() {
  const now = new Date()
  // Shift to ET (approximate: UTC-5 in winter / UTC-4 in summer)
  // Using a reliable method via toLocaleDateString
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric", month: "2-digit", day: "2-digit"
  })
  const today = formatter.format(now)  // YYYY-MM-DD in ET
  // Subtract one day
  const d = new Date(today + "T12:00:00Z")
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

// ─────────────────────────────────────────────────────────────────────────────
// INGEST ENGINE INVOCATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calls ingest-game.mjs as a child process with the given ingestionArgs.
 * Returns { success: bool, output: string, exitCode: number }.
 *
 * The engine is called with --write-week to force Supabase snapshot on week
 * boundary (the engine's own boundary detection handles normal weeks;
 * we always pass it to ensure proper weekly tracking for MLB players
 * who may have many games in the same week).
 *
 * We do NOT pass --write-week for daily ingestions — we let the engine
 * handle its own week-boundary detection to avoid over-writing.
 */
function callIngestEngine(ingestionArgs, dryRun, timeoutMs = 30_000) {
  return new Promise((resolve) => {
    const args = buildCLIArgs(ingestionArgs, dryRun)

    const child = spawn("node", ["scripts/ingest-game.mjs", ...args], {
      cwd:   ROOT,
      stdio: "pipe",
    })

    let output = ""
    let timedOut = false

    const timer = setTimeout(() => {
      timedOut = true
      child.kill("SIGTERM")
    }, timeoutMs)

    child.stdout.on("data", chunk => { output += chunk.toString() })
    child.stderr.on("data", chunk => { output += chunk.toString() })

    child.on("close", (code) => {
      clearTimeout(timer)
      if (timedOut) {
        resolve({ success: false, output: output + "\n[TIMEOUT after 30s]", exitCode: -1 })
      } else {
        resolve({ success: code === 0, output, exitCode: code })
      }
    })

    child.on("error", (err) => {
      clearTimeout(timer)
      resolve({ success: false, output: err.message, exitCode: -1 })
    })
  })
}

/**
 * Converts ingestionArgs object → CLI flags array for ingest-game.mjs.
 * Handles both hitter and pitcher arg shapes.
 */
function buildCLIArgs(ingestionArgs, dryRun) {
  const args = []
  for (const [key, val] of Object.entries(ingestionArgs)) {
    if (val === null || val === undefined) continue
    args.push(`--${key}`)
    args.push(String(val))
  }
  if (dryRun) args.push("--dry-run")
  return args
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPABASE OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

function getSupabase() {
  const url    = env("NEXT_PUBLIC_SUPABASE_URL")
  const key    = env("SUPABASE_SERVICE_ROLE_KEY")
  const active = url.startsWith("https://") && key.length > 0
  if (!active) return null
  return createClient(url, key)
}

async function fetchRoster(supabase) {
  const { data, error } = await supabase
    .from("roster")
    .select("*")
    .eq("active", true)
    .order("player_id")
  if (error) throw new Error(`Roster fetch failed: ${error.message}`)
  return data ?? []
}

/**
 * Local roster — mirrors the migration seed data.
 * Used for dry-run testing before the Supabase migration is applied.
 * When --local-roster is passed, the scheduler bypasses Supabase entirely.
 */
function buildLocalRoster() {
  return [
    { player_id: "alec_bohm",    name: "Alec Bohm",    kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "664761", external_team_id: "143", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "brice_turang", name: "Brice Turang", kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "668930", external_team_id: "158", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "brady_singer", name: "Brady Singer", kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "663903", external_team_id: "113", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "casey_mize",   name: "Casey Mize",   kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "663554", external_team_id: "116", external_sport_id: "1",  last_ingested_date: null },
    // MiLB players — IDs verified 2026-05-14 via MLB Stats API /api/v1/people/search
    // Sport IDs confirmed: 14=Single-A, 12=Double-A (see AUTOMATION_RULES.md)
    { player_id: "eli_willits",    name: "Eli Willits",    kind: "hitter",  level: "A",  active: true, data_source: "milb_stats_api", external_player_id: "816113", external_team_id: "436", external_sport_id: "14", last_ingested_date: null },
    { player_id: "ethan_holliday", name: "Ethan Holliday", kind: "hitter",  level: "A",  active: true, data_source: "milb_stats_api", external_player_id: "815787", external_team_id: "259", external_sport_id: "14", last_ingested_date: null },
    { player_id: "kade_anderson",  name: "Kade Anderson",  kind: "pitcher", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "807739", external_team_id: "574", external_sport_id: "12", last_ingested_date: null },
    { player_id: "roch_cholowsky", name: "Roch Cholowsky", kind: "hitter",  level: "NCAA", active: true, data_source: "manual",          external_player_id: null, last_ingested_date: null },
    { player_id: "carson_bolemon", name: "Carson Bolemon", kind: "pitcher", level: "HS",   active: true, data_source: "manual",          external_player_id: null, last_ingested_date: null },
    { player_id: "grady_emerson",  name: "Grady Emerson",  kind: "hitter",  level: "HS",   active: true, data_source: "manual",          external_player_id: null, last_ingested_date: null },
  ]
}

async function updateRosterRow(supabase, playerId, date, status, message) {
  const { error } = await supabase
    .from("roster")
    .update({
      last_ingested_date:    status === "success" ? date : undefined,
      last_ingested_at:      new Date().toISOString(),
      last_ingestion_status: status,
      last_ingestion_message: message,
      updated_at:            new Date().toISOString(),
    })
    .eq("player_id", playerId)
  if (error) console.warn(`[WARN] roster update failed for ${playerId}: ${error.message}`)
}

async function writeIngestionLog(supabase, logRow) {
  const { error } = await supabase
    .from("daily_ingestion_log")
    .insert(logRow)
  if (error) console.warn(`[WARN] daily_ingestion_log write failed: ${error.message}`)
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL
// ─────────────────────────────────────────────────────────────────────────────

async function sendSummaryEmail(results, targetDate, runDurationMs) {
  const resendKey    = env("RESEND_API_KEY")
  const captainEmail = env("CAPTAIN_EMAIL") || "jasonpitre74@outlook.com"

  if (!resendKey || resendKey.length < 10) {
    console.log("[EMAIL] RESEND_API_KEY not set — printing summary to stdout instead:")
    console.log(buildEmailBody(results, targetDate, runDurationMs))
    return false
  }

  const subject = `Diamond Ledger — ${targetDate} Ingestion Report`
  const text    = buildEmailBody(results, targetDate, runDurationMs)

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from:    "Diamond Ledger <noreply@yourdomain.com>",
        to:      [captainEmail],
        subject,
        text,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.warn(`[EMAIL] Send failed: HTTP ${res.status} — ${body}`)
      return false
    }
    console.log(`[EMAIL] ✓ Sent to ${captainEmail}`)
    return true
  } catch (err) {
    console.warn(`[EMAIL] Send failed: ${err.message}`)
    return false
  }
}

function buildEmailBody(results, targetDate, runDurationMs) {
  const successes    = results.filter(r => r.status === "success")
  const noGame       = results.filter(r => r.status === "no_game" && r.data_source === "mlb_stats_api")
  const errors       = results.filter(r => r.status === "error")
  const manualPending= results.filter(r => r.status === "manual_pending")

  const lines = []
  lines.push(`Diamond Ledger — ${targetDate} Ingestion Report`)
  lines.push("─".repeat(50))
  lines.push("")

  if (successes.length > 0) {
    lines.push(`✅ Auto-ingested: ${successes.length} player(s)`)
    for (const r of successes) {
      lines.push(`  - ${r.name} (${targetDate}): ${r.summary}`)
    }
  } else {
    lines.push("✅ Auto-ingested: 0 players")
  }
  lines.push("")

  // No-game MLB players
  const mlbNoGame = results.filter(r => r.status === "no_game" && r.data_source === "mlb_stats_api")
  if (mlbNoGame.length > 0) {
    lines.push("○ No game / did not appear:")
    for (const r of mlbNoGame) {
      lines.push(`  - ${r.name}: ${r.message}`)
    }
    lines.push("")
  }

  if (errors.length > 0) {
    lines.push(`⚠️  Errors: ${errors.length}`)
    for (const r of errors) {
      lines.push(`  - ${r.name}: ${r.message}`)
    }
    lines.push("")
  }

  if (manualPending.length > 0) {
    lines.push(`📋 Manual pending: ${manualPending.length} player(s)`)
    for (const r of manualPending) {
      lines.push(`  - ${r.name} (${r.data_source === "milb_stats_api" ? "MiLB adapter pending — Pass 73" : "manual"})`)
    }
    lines.push("")
  }

  const durSec = (runDurationMs / 1000).toFixed(1)
  lines.push(`Total run time: ${durSec}s`)

  return lines.join("\n")
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ORCHESTRATOR
// ─────────────────────────────────────────────────────────────────────────────

export async function runScheduler({ targetDate, dryRun = false, localRoster = false } = {}) {
  const date      = targetDate ?? yesterdayET()
  const runStart  = Date.now()
  const startedAt = new Date().toISOString()

  console.log(`\n╔═══════════════════════════════════════════════════════════╗`)
  console.log(`║  DIAMOND LEDGER DAILY SCHEDULER — Pass 72                 ║`)
  console.log(`╚═══════════════════════════════════════════════════════════╝`)
  console.log(`Target date : ${date}`)
  console.log(`Mode        : ${dryRun ? "DRY-RUN (no writes)" : "PRODUCTION"}`)
  console.log(`Roster src  : ${localRoster ? "LOCAL (pre-migration)" : "SUPABASE"}`)
  console.log(`Started     : ${startedAt}\n`)

  // Supabase connection (required for production; optional for local-roster dry-run)
  const supabase = getSupabase()
  if (!supabase && !localRoster) {
    console.error("[HALT] Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.")
    process.exit(1)
  }

  // Fetch roster
  let roster
  try {
    if (localRoster) {
      roster = buildLocalRoster()
      console.log(`Roster: ${roster.length} players (local fallback — apply migration to use Supabase)\n`)
    } else {
      roster = await fetchRoster(supabase)
      console.log(`Roster: ${roster.length} active players\n`)
    }
  } catch (err) {
    console.error(`[HALT] ${err.message}`)
    process.exit(1)
  }

  const results = []

  // ─── Process each player sequentially ──────────────────────────────────────
  for (const player of roster) {
    const { player_id, name, data_source } = player

    console.log(`── ${name} (${player_id}) ── data_source: ${data_source}`)

    // Idempotency outer guard: skip if already ingested today
    if (!dryRun && !localRoster && player.last_ingested_date === date && player.data_source === "mlb_stats_api") {
      const msg = `already ingested today (${date})`
      console.log(`  ○ Skipping — ${msg}\n`)
      results.push({ player_id, name, data_source, status: "success", message: msg, summary: msg })
      continue
    }

    // Manual / no-adapter players
    const adapterModule = await loadAdapter(data_source)
    if (!adapterModule) {
      const msg = data_source === "manual"
        ? "Manual ingestion — no adapter"
        : `Adapter pending (${data_source})`
      console.log(`  📋 ${msg}\n`)
      results.push({ player_id, name, data_source, status: "manual_pending", message: msg, summary: msg })
      if (!dryRun && !localRoster && supabase) {
        await updateRosterRow(supabase, player_id, date, "manual_pending", msg)
      }
      continue
    }

    // Run adapter
    let adapterResult
    try {
      adapterResult = await Promise.race([
        adapterModule.fetchLastGame(player, date),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Adapter timeout after 30s")), 30_000)
        )
      ])
    } catch (err) {
      const msg = `Adapter error: ${err.message}`
      console.log(`  ✗ ${msg}\n`)
      results.push({ player_id, name, data_source, status: "error", message: msg, summary: msg })
      if (!dryRun) {
        await updateRosterRow(supabase, player_id, date, "error", msg)
      }
      continue
    }

    console.log(`  Adapter: status=${adapterResult.status}  msg="${adapterResult.message}"`)

    if (adapterResult.status === "no_game") {
      const msg = adapterResult.message
      console.log(`  ○ No ingestion: ${msg}\n`)
      results.push({ player_id, name, data_source, status: "no_game", message: msg, summary: msg })
      if (!dryRun && !localRoster && supabase) {
        await updateRosterRow(supabase, player_id, date, "no_game", msg)
      }
      continue
    }

    if (adapterResult.status === "error") {
      const msg = adapterResult.message
      console.log(`  ✗ Adapter error: ${msg}\n`)
      results.push({ player_id, name, data_source, status: "error", message: msg, summary: msg })
      if (!dryRun && !localRoster && supabase) {
        await updateRosterRow(supabase, player_id, date, "error", msg)
      }
      continue
    }

    // status === "success" — call ingest engine
    const { ingestionArgs } = adapterResult
    console.log(`  ingestionArgs: ${JSON.stringify(ingestionArgs)}`)

    if (dryRun) {
      const summary = buildSummaryLine(ingestionArgs, player.kind)
      console.log(`  [DRY-RUN] Would ingest: ${summary}\n`)
      results.push({ player_id, name, data_source, status: "success", message: "dry-run", summary })
      continue
    }

    const engineResult = await callIngestEngine(ingestionArgs, false)

    if (!engineResult.success) {
      // Check for idempotency exit (already ingested)
      const alreadyIngested = engineResult.output.includes("IDEMPOTENCY VIOLATION")
      if (alreadyIngested) {
        const msg = `Game ${date} already in log (idempotent skip)`
        console.log(`  ○ ${msg}`)
        results.push({ player_id, name, data_source, status: "success", message: msg, summary: msg })
        if (!localRoster && supabase) await updateRosterRow(supabase, player_id, date, "success", msg)
      } else {
        const msg = `Engine error (exit=${engineResult.exitCode}): ${engineResult.output.slice(-300)}`
        console.log(`  ✗ Engine failed (exit ${engineResult.exitCode})`)
        results.push({ player_id, name, data_source, status: "error", message: msg, summary: `Engine failed` })
        if (!localRoster && supabase) await updateRosterRow(supabase, player_id, date, "error", msg)
      }
    } else {
      const summary = buildSummaryLine(ingestionArgs, player.kind)
      console.log(`  ✓ Ingested: ${summary}`)
      results.push({ player_id, name, data_source, status: "success", message: "OK", summary })
      if (!localRoster && supabase) await updateRosterRow(supabase, player_id, date, "success", summary)
    }

    // Print last few lines of engine output for audit trail
    const outputLines = engineResult.output.split("\n").filter(Boolean)
    const lastLines   = outputLines.slice(-3)
    for (const line of lastLines) console.log(`  │ ${line}`)
    console.log("")
  }

  // ─── Run summary ─────────────────────────────────────────────────────────
  const runDurationMs = Date.now() - runStart
  const completedAt   = new Date().toISOString()

  const counts = {
    total:         results.length,
    success:       results.filter(r => r.status === "success").length,
    no_game:       results.filter(r => r.status === "no_game").length,
    error:         results.filter(r => r.status === "error").length,
    manual_pending:results.filter(r => r.status === "manual_pending").length,
  }

  console.log(`\n╔═══════════════════════════════════════════════════════════╗`)
  console.log(`║  RUN SUMMARY — ${date}`)
  console.log(`╠═══════════════════════════════════════════════════════════╣`)
  console.log(`║  Total attempted : ${counts.total}`)
  console.log(`║  Successful      : ${counts.success}`)
  console.log(`║  No game         : ${counts.no_game}`)
  console.log(`║  Errors          : ${counts.error}`)
  console.log(`║  Manual pending  : ${counts.manual_pending}`)
  console.log(`║  Duration        : ${(runDurationMs / 1000).toFixed(1)}s`)
  console.log(`║  Mode            : ${dryRun ? "DRY-RUN" : "PRODUCTION"}`)
  console.log(`╚═══════════════════════════════════════════════════════════╝\n`)

  if (!dryRun && !localRoster && supabase) {
    // Write daily_ingestion_log
    const logRow = {
      run_date:              date,
      run_started_at:        startedAt,
      run_completed_at:      completedAt,
      total_attempted:       counts.total,
      successful_ingestions: counts.success,
      no_game_count:         counts.no_game,
      error_count:           counts.error,
      manual_pending_count:  counts.manual_pending,
      run_summary:           results.map(r => ({
        player_id: r.player_id,
        name:      r.name,
        status:    r.status,
        message:   r.message,
        summary:   r.summary ?? null,
      })),
    }
    await writeIngestionLog(supabase, logRow)
    console.log(`✓ daily_ingestion_log written`)

    // Send email
    const emailSent = await sendSummaryEmail(results, date, runDurationMs)
    if (!emailSent) {
      console.log("[EMAIL] Summary printed above (email delivery skipped)")
    }
  } else {
    // In dry-run mode, always print the email body
    console.log("\n[DRY-RUN] Email body would be:")
    console.log("─".repeat(60))
    console.log(buildEmailBody(results, date, runDurationMs))
    console.log("─".repeat(60))
  }

  return { date, dryRun, counts, results }
}

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY LINE BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildSummaryLine(args, kind) {
  if (kind === "pitcher") {
    return `${args.opp}  IP:${args.ip}  H:${args.h}  ER:${args.er}  BB:${args.bb}  K:${args.k}  (${args.result ?? "ND"})`
  } else {
    const avg_str = args.ab > 0 ? ` (${args.h}/${args.ab})` : ""
    return `${args.opp}${avg_str}  HR:${args.hr ?? 0}  RBI:${args.rbi ?? 0}  BB:${args.bb ?? 0}`
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

async function cliMain() {
  const argv = process.argv.slice(2)
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--dry-run")      { args.dryRun = true; continue }
    if (a === "--local-roster") { args.localRoster = true; continue }
    if (a.startsWith("--")) {
      args[a.slice(2)] = argv[i + 1]
      i++
    }
  }

  const targetDate  = args.date ?? null
  const dryRun      = args.dryRun ?? false
  const localRoster = args.localRoster ?? false

  try {
    const result = await runScheduler({ targetDate, dryRun, localRoster })
    if (result.counts.error > 0) {
      process.exit(1)
    }
  } catch (err) {
    console.error("[FATAL]", err.message)
    process.exit(1)
  }
}

// Run as CLI if invoked directly
if (process.argv[1].endsWith("daily-scheduler.mjs")) {
  cliMain()
}
