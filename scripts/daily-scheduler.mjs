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
import { readFileSync } from "fs"
import { join, dirname }   from "path"
import { fileURLToPath }   from "url"
import { runIngestGame }    from "./ingest-game.mjs"

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
      return await import("./adapters/ucla-sidearm-baseball.mjs")  // Pass 83 prototype
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
async function callIngestEngine(ingestionArgs, dryRun) {
  const args = buildCLIArgs(ingestionArgs, dryRun)
  let output = ""

  const capture = (method) => (...parts) => {
    const line = parts.map(part =>
      typeof part === "string" ? part : JSON.stringify(part)
    ).join(" ")
    output += `${line}\n`
    console[method](...parts)
  }

  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  }

  try {
    console.log = capture("log")
    console.warn = capture("warn")
    console.error = capture("error")
    await runIngestGame(args)
    return { success: true, output, exitCode: 0 }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    output += `${message}\n`
    return { success: false, output, exitCode: 1 }
  } finally {
    console.log = original.log
    console.warn = original.warn
    console.error = original.error
  }
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
    { player_id: "matthew_liberatore", name: "Matthew Liberatore", kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "669461", external_team_id: "138", external_sport_id: "1", last_ingested_date: null },
    { player_id: "bo_naylor",    name: "Bo Naylor",    kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "666310", external_team_id: "114", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "jake_mccarthy",name: "Jake McCarthy",kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "664983", external_team_id: "115", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "chase_burns",   name: "Chase Burns",   kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "695505", external_team_id: "113", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "nick_kurtz",    name: "Nick Kurtz",    kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "701762", external_team_id: "133", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "jac_caglianone",name: "Jac Caglianone",kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "695506", external_team_id: "118", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "jj_wetherholt", name: "JJ Wetherholt", kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "802139", external_team_id: "138", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "cam_smith",     name: "Cam Smith",     kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "701358", external_team_id: "117", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "carson_benge",  name: "Carson Benge",  kind: "hitter",  level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "701807", external_team_id: "121", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "trey_yesavage", name: "Trey Yesavage", kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "702056", external_team_id: "141", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "ryan_waldschmidt", name: "Ryan Waldschmidt", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "814439", external_team_id: "109", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "payton_tolle", name: "Payton Tolle", kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "801139", external_team_id: "111", external_sport_id: "1",  last_ingested_date: null },
    { player_id: "paul_skenes", name: "Paul Skenes", kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "694973", external_team_id: "134", external_sport_id: "1", last_ingested_date: null },
    { player_id: "wyatt_langford", name: "Wyatt Langford", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "694671", external_team_id: "140", external_sport_id: "1", last_ingested_date: null },
    { player_id: "jacob_wilson", name: "Jacob Wilson", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "805779", external_team_id: "133", external_sport_id: "1", last_ingested_date: null },
    { player_id: "rhett_lowder", name: "Rhett Lowder", kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "695076", external_team_id: "113", external_sport_id: "1", last_ingested_date: null },
    { player_id: "chase_dollander", name: "Chase Dollander", kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "801403", external_team_id: "115", external_sport_id: "1", last_ingested_date: null },
    { player_id: "nolan_schanuel", name: "Nolan Schanuel", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "694384", external_team_id: "108", external_sport_id: "1", last_ingested_date: null },
    { player_id: "matt_shaw", name: "Matt Shaw", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "807713", external_team_id: "112", external_sport_id: "1", last_ingested_date: null },
    { player_id: "bryce_eldridge", name: "Bryce Eldridge", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "805811", external_team_id: "137", external_sport_id: "1", last_ingested_date: null },
    { player_id: "hurston_waldrep", name: "Hurston Waldrep", kind: "pitcher", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "694462", external_team_id: "144", external_sport_id: "1", last_ingested_date: null },
    { player_id: "brice_matthews", name: "Brice Matthews", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "694728", external_team_id: "117", external_sport_id: "1", last_ingested_date: null },
    { player_id: "kevin_mcgonigle", name: "Kevin McGonigle", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "805808", external_team_id: "116", external_sport_id: "1", last_ingested_date: null },
    // MiLB players — IDs verified 2026-05-14 via MLB Stats API /api/v1/people/search
    // Sport IDs confirmed: 14=Single-A, 12=Double-A (see AUTOMATION_RULES.md)
    { player_id: "eli_willits",    name: "Eli Willits",    kind: "hitter",  level: "A",  active: true, data_source: "milb_stats_api", external_player_id: "816113", external_team_id: "436", external_sport_id: "14", last_ingested_date: null },
    { player_id: "ethan_holliday", name: "Ethan Holliday", kind: "hitter",  level: "A",  active: true, data_source: "milb_stats_api", external_player_id: "815787", external_team_id: "259", external_sport_id: "14", last_ingested_date: null },
    { player_id: "kade_anderson",  name: "Kade Anderson",  kind: "pitcher", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "807739", external_team_id: "574", external_sport_id: "12", last_ingested_date: null },
    { player_id: "tyler_bremner",  name: "Tyler Bremner",  kind: "pitcher", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "803285", external_team_id: "460", external_sport_id: "13", last_ingested_date: null },
    { player_id: "nick_madrigal",  name: "Nick Madrigal",  kind: "hitter",  level: "AAA",active: true, data_source: "milb_stats_api", external_player_id: "663611", external_team_id: "561", external_sport_id: "11", last_ingested_date: null },
    { player_id: "jordyn_adams",   name: "Jordyn Adams",   kind: "hitter",  level: "AAA",active: true, data_source: "milb_stats_api", external_player_id: "677941", external_team_id: "556", external_sport_id: "11", last_ingested_date: null },
    { player_id: "travis_bazzana", name: "Travis Bazzana", kind: "hitter",  level: "AAA",active: true, data_source: "milb_stats_api", external_player_id: "683953", external_team_id: "445", external_sport_id: "11", last_ingested_date: null },
    { player_id: "charlie_condon", name: "Charlie Condon", kind: "hitter",  level: "AAA",active: true, data_source: "milb_stats_api", external_player_id: "809707", external_team_id: "342", external_sport_id: "11", last_ingested_date: null },
    { player_id: "hagen_smith",    name: "Hagen Smith",    kind: "pitcher", level: "AAA",active: true, data_source: "milb_stats_api", external_player_id: "696146", external_team_id: "494", external_sport_id: "11", last_ingested_date: null },
    { player_id: "christian_moore",name: "Christian Moore",kind: "hitter",  level: "AAA",active: true, data_source: "milb_stats_api", external_player_id: "695681", external_team_id: "561", external_sport_id: "11", last_ingested_date: null },
    { player_id: "konnor_griffin", name: "Konnor Griffin", kind: "hitter",  level: "AAA",active: true, data_source: "milb_stats_api", external_player_id: "804606", external_team_id: "484", external_sport_id: "11", last_ingested_date: null },
    { player_id: "seaver_king",    name: "Seaver King",    kind: "hitter",  level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "814409", external_team_id: "547", external_sport_id: "12", last_ingested_date: null },
    { player_id: "bryce_rainer",   name: "Bryce Rainer",   kind: "hitter",  level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "800614", external_team_id: "582", external_sport_id: "13", last_ingested_date: null },
    { player_id: "braden_montgomery", name: "Braden Montgomery", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "695731", external_team_id: "494", external_sport_id: "11", last_ingested_date: null },
    { player_id: "james_tibbs_iii", name: "James Tibbs III", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "696486", external_team_id: "238", external_sport_id: "11", last_ingested_date: null },
    { player_id: "jurrangelo_cijntje", name: "Jurrangelo Cijntje", kind: "pitcher", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "701388", external_team_id: "440", external_sport_id: "12", last_ingested_date: null },
    { player_id: "pj_morlando",    name: "PJ Morlando",    kind: "hitter",  level: "A",  active: true, data_source: "milb_stats_api", external_player_id: "703563", external_team_id: "479", external_sport_id: "14", last_ingested_date: null },
    { player_id: "braylon_payne",  name: "Braylon Payne",  kind: "hitter",  level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "815520", external_team_id: "572", external_sport_id: "13", last_ingested_date: null },
    { player_id: "theo_gillen",    name: "Theo Gillen",    kind: "hitter",  level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "815394", external_team_id: "2498", external_sport_id: "13", last_ingested_date: null },
    { player_id: "kaelen_culpepper", name: "Kaelen Culpepper", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "701785", external_team_id: "1960", external_sport_id: "11", last_ingested_date: null },
    { player_id: "vance_honeycutt", name: "Vance Honeycutt", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "701689", external_team_id: "493", external_sport_id: "13", last_ingested_date: null },
    { player_id: "kellon_lindsey", name: "Kellon Lindsey", kind: "hitter", level: "A", active: true, data_source: "milb_stats_api", external_player_id: "813916", external_team_id: "6482", external_sport_id: "14", last_ingested_date: null },
    { player_id: "cam_caminiti", name: "Cam Caminiti", kind: "pitcher", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "807284", external_team_id: "432", external_sport_id: "13", last_ingested_date: null },
    { player_id: "kash_mayfield", name: "Kash Mayfield", kind: "pitcher", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "824026", external_team_id: "584", external_sport_id: "13", last_ingested_date: null },
    { player_id: "ben_hess", name: "Ben Hess", kind: "pitcher", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "696292", external_team_id: "1956", external_sport_id: "12", last_ingested_date: null },
    { player_id: "dante_nori", name: "Dante Nori", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "807276", external_team_id: "522", external_sport_id: "12", last_ingested_date: null },
    { player_id: "walker_janek", name: "Walker Janek", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "801075", external_team_id: "482", external_sport_id: "12", last_ingested_date: null },
    { player_id: "slade_caldwell", name: "Slade Caldwell", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "815154", external_team_id: "419", external_sport_id: "13", last_ingested_date: null },
    { player_id: "malcolm_moore", name: "Malcolm Moore", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "702270", external_team_id: "6324", external_sport_id: "13", last_ingested_date: null },
    { player_id: "griff_oferrall", name: "Griff O'Ferrall", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "803172", external_team_id: "418", external_sport_id: "12", last_ingested_date: null },
    { player_id: "kyle_debarge", name: "Kyle DeBarge", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "814414", external_team_id: "3898", external_sport_id: "12", last_ingested_date: null },
    { player_id: "blake_burke", name: "Blake Burke", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "695501", external_team_id: "5015", external_sport_id: "12", last_ingested_date: null },
    { player_id: "jd_dix", name: "JD Dix", kind: "hitter", level: "A", active: true, data_source: "milb_stats_api", external_player_id: "807267", external_team_id: "516", external_sport_id: "14", last_ingested_date: null },
    { player_id: "braylon_doughty", name: "Braylon Doughty", kind: "pitcher", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "815785", external_team_id: "437", external_sport_id: "13", last_ingested_date: null },
    { player_id: "levi_sterling", name: "Levi Sterling", kind: "pitcher", level: "A", active: true, data_source: "milb_stats_api", external_player_id: "815552", external_team_id: "3390", external_sport_id: "14", last_ingested_date: null },
    { player_id: "brody_brecht", name: "Brody Brecht", kind: "pitcher", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "701679", external_team_id: "486", external_sport_id: "13", last_ingested_date: null },
    { player_id: "caleb_lomavita", name: "Caleb Lomavita", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "701616", external_team_id: "547", external_sport_id: "12", last_ingested_date: null },
    { player_id: "tommy_white", name: "Tommy White", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "695720", external_team_id: "400", external_sport_id: "11", last_ingested_date: null },
    { player_id: "david_shields", name: "David Shields", kind: "pitcher", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "815789", external_team_id: "565", external_sport_id: "13", last_ingested_date: null },
    { player_id: "jared_thomas", name: "Jared Thomas", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "703606", external_team_id: "538", external_sport_id: "12", last_ingested_date: null },
    { player_id: "caleb_bonemer", name: "Caleb Bonemer", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "815352", external_team_id: "580", external_sport_id: "13", last_ingested_date: null },
    { player_id: "luke_dickerson", name: "Luke Dickerson", kind: "hitter", level: "A", active: true, data_source: "milb_stats_api", external_player_id: "815380", external_team_id: "436", external_sport_id: "14", last_ingested_date: null },
    { player_id: "chris_cortez", name: "Chris Cortez", kind: "pitcher", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "700933", external_team_id: "559", external_sport_id: "12", last_ingested_date: null },
    { player_id: "jonathan_santucci", name: "Jonathan Santucci", kind: "pitcher", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "695558", external_team_id: "505", external_sport_id: "12", last_ingested_date: null },
    { player_id: "wyatt_sanford", name: "Wyatt Sanford", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "815608", external_team_id: "477", external_sport_id: "13", last_ingested_date: null },
    { player_id: "jacob_cozart", name: "Jacob Cozart", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "695524", external_team_id: "402", external_sport_id: "12", last_ingested_date: null },
    { player_id: "owen_hall", name: "Owen Hall", kind: "pitcher", level: "Rookie", active: true, data_source: "milb_stats_api", external_player_id: "815157", external_team_id: "473", external_sport_id: "16", last_ingested_date: null },
    { player_id: "dylan_crews", name: "Dylan Crews", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "686611", external_team_id: "534", external_sport_id: "11", last_ingested_date: null },
    { player_id: "max_clark", name: "Max Clark", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "703601", external_team_id: "512", external_sport_id: "11", last_ingested_date: null },
    { player_id: "walker_jenkins", name: "Walker Jenkins", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "805805", external_team_id: "1960", external_sport_id: "11", last_ingested_date: null },
    { player_id: "blake_mitchell", name: "Blake Mitchell", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "805810", external_team_id: "565", external_sport_id: "13", last_ingested_date: null },
    { player_id: "noble_meyer", name: "Noble Meyer", kind: "pitcher", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "800611", external_team_id: "520", external_sport_id: "13", last_ingested_date: null },
    { player_id: "tommy_troy", name: "Tommy Troy", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "694371", external_team_id: "2310", external_sport_id: "11", last_ingested_date: null },
    { player_id: "kyle_teel", name: "Kyle Teel", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "691019", external_team_id: "494", external_sport_id: "11", last_ingested_date: null },
    { player_id: "jacob_gonzalez", name: "Jacob Gonzalez", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "694378", external_team_id: "494", external_sport_id: "11", last_ingested_date: null },
    { player_id: "enrique_bradfield_jr", name: "Enrique Bradfield Jr.", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "690961", external_team_id: "568", external_sport_id: "11", last_ingested_date: null },
    { player_id: "brock_wilken", name: "Brock Wilken", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "694385", external_team_id: "556", external_sport_id: "11", last_ingested_date: null },
    { player_id: "brayden_taylor", name: "Brayden Taylor", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "694966", external_team_id: "421", external_sport_id: "12", last_ingested_date: null },
    { player_id: "arjun_nimmala", name: "Arjun Nimmala", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "805796", external_team_id: "463", external_sport_id: "12", last_ingested_date: null },
    { player_id: "chase_davis", name: "Chase Davis", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "690971", external_team_id: "440", external_sport_id: "12", last_ingested_date: null },
    { player_id: "colt_emerson", name: "Colt Emerson", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "806068", external_team_id: "529", external_sport_id: "11", last_ingested_date: null },
    { player_id: "ralphy_velazquez", name: "Ralphy Velazquez", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "806252", external_team_id: "402", external_sport_id: "12", last_ingested_date: null },
    { player_id: "dillon_head", name: "Dillon Head", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "702977", external_team_id: "554", external_sport_id: "13", last_ingested_date: null },
    { player_id: "george_lombard_jr", name: "George Lombard Jr.", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "806146", external_team_id: "531", external_sport_id: "11", last_ingested_date: null },
    { player_id: "aidan_miller", name: "Aidan Miller", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "805795", external_team_id: "1410", external_sport_id: "11", last_ingested_date: null },
    { player_id: "jonny_farmelo", name: "Jonny Farmelo", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "806071", external_team_id: "403", external_sport_id: "13", last_ingested_date: null },
    { player_id: "tai_peete", name: "Tai Peete", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "806191", external_team_id: "443", external_sport_id: "13", last_ingested_date: null },
    { player_id: "adrian_santana", name: "Adrian Santana", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "803745", external_team_id: "2498", external_sport_id: "13", last_ingested_date: null },
    { player_id: "colin_houck", name: "Colin Houck", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "806124", external_team_id: "453", external_sport_id: "13", last_ingested_date: null },
    { player_id: "josh_knoth", name: "Josh Knoth", kind: "pitcher", level: "Rookie", active: true, data_source: "milb_stats_api", external_player_id: "805807", external_team_id: "406", external_sport_id: "16", last_ingested_date: null },
    { player_id: "charlee_soto", name: "Charlee Soto", kind: "pitcher", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "805792", external_team_id: "492", external_sport_id: "11", last_ingested_date: null },
    { player_id: "thomas_white", name: "Thomas White", kind: "pitcher", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "806258", external_team_id: "564", external_sport_id: "11", last_ingested_date: null },
    { player_id: "kendall_george", name: "Kendall George", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "806077", external_team_id: "260", external_sport_id: "12", last_ingested_date: null },
    { player_id: "ty_floyd", name: "Ty Floyd", kind: "pitcher", level: "Rookie", active: true, data_source: "milb_stats_api", external_player_id: "692226", external_team_id: "450", external_sport_id: "16", last_ingested_date: null },
    { player_id: "myles_naylor", name: "Myles Naylor", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "802504", external_team_id: "499", external_sport_id: "13", last_ingested_date: null },
    { player_id: "yohandy_morales", name: "Yohandy Morales", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "691002", external_team_id: "534", external_sport_id: "11", last_ingested_date: null },
    { player_id: "ryan_lasko", name: "Ryan Lasko", kind: "hitter", level: "AA", active: true, data_source: "milb_stats_api", external_player_id: "805782", external_team_id: "237", external_sport_id: "12", last_ingested_date: null },
    { player_id: "mitch_jebb", name: "Mitch Jebb", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "694991", external_team_id: "484", external_sport_id: "11", last_ingested_date: null },
    { player_id: "sammy_stafura", name: "Sammy Stafura", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "806230", external_team_id: "477", external_sport_id: "13", last_ingested_date: null },
    { player_id: "blake_wolters", name: "Blake Wolters", kind: "pitcher", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "806265", external_team_id: "565", external_sport_id: "13", last_ingested_date: null },
    { player_id: "max_anderson", name: "Max Anderson", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "801194", external_team_id: "512", external_sport_id: "11", last_ingested_date: null },
    { player_id: "sean_sullivan", name: "Sean Sullivan", kind: "pitcher", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "807743", external_team_id: "342", external_sport_id: "11", last_ingested_date: null },
    { player_id: "kemp_alderman", name: "Kemp Alderman", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "694580", external_team_id: "564", external_sport_id: "11", last_ingested_date: null },
    { player_id: "lujames_groover", name: "LuJames Groover", kind: "hitter", level: "AAA", active: true, data_source: "milb_stats_api", external_player_id: "694410", external_team_id: "2310", external_sport_id: "11", last_ingested_date: null },
    { player_id: "luke_keaschall", name: "Luke Keaschall", kind: "hitter", level: "MLB", active: true, data_source: "mlb_stats_api", external_player_id: "807712", external_team_id: "142", external_sport_id: "1", last_ingested_date: null },
    { player_id: "nazzan_zanetello", name: "Nazzan Zanetello", kind: "hitter", level: "A+", active: true, data_source: "milb_stats_api", external_player_id: "805801", external_team_id: "428", external_sport_id: "13", last_ingested_date: null },
    { player_id: "roch_cholowsky", name: "Roch Cholowsky", kind: "hitter",  level: "NCAA", active: true, data_source: "ncaa_ucla_scrape", external_player_id: "15523", last_ingested_date: null },
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
