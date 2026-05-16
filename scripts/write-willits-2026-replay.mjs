/**
 * P57-2 / P58 / P59 — WILLITS 2026 REPLAY DB WRITE
 * ==================================================
 * Persists the 7 weekly organism snapshots (W14–W20) and 1 monthly
 * settlement (April 2026-04) computed by the Pass 57/58/59 chronological replay.
 * Current state: P59 — engine_version = "P59". Weekly delta cap removed.
 * largeMovement flag added. Cap was never binding in this dataset (max |Δ|=0.80
 * natural ceiling from cappedPerfDelta=0.04×20×conf). All 7 weeks identical to
 * P58; large_movement=false for all rows. Finding documented in WILLITS_2026_REPLAY.md.
 *
 * Source of truth: data/dlr/WILLITS_2026_REPLAY.md
 * Companion script: scripts/replay-willits-2026.mjs (computation engine)
 *
 * Write contract:
 *   - 7 upserts to player_dlr_weekly  (ON CONFLICT player_id,snapshot_week DO UPDATE)
 *   - 1 upsert to player_dlr_monthly  (ON CONFLICT player_id,settlement_month DO UPDATE)
 *   - 1 update to players.dlr_score   (hot-read cache — most recent weekly write owns this)
 *
 * PROHIBITED:
 *   - Do NOT add game-by-game rows. player_dlr_weekly is weekly only.
 *   - Do NOT re-score from calculateDLR.ts. Consume replay output only.
 *   - Do NOT call from render cycles or client components.
 *
 * Usage:
 *   node scripts/write-willits-2026-replay.mjs
 *   node scripts/write-willits-2026-replay.mjs --dry-run
 *
 * See: data/dlr/WILLITS_2026_REPLAY.md
 *      data/dlr/writeWeeklySnapshot.ts
 *      data/dlr/settleMonthlyDLR.ts
 */

import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { createClient } from "@supabase/supabase-js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = join(__dirname, "..")
const DRY_RUN   = process.argv.includes("--dry-run")

// =============================================================
// ENV LOADER — parse .env.local without dotenv dependency
// =============================================================

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
      // Strip surrounding quotes if present
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

const env = {
  ...loadEnv(join(ROOT, ".env")),
  ...loadEnv(join(ROOT, ".env.local"))   // .env.local overrides .env
}

const SUPABASE_URL  = env.NEXT_PUBLIC_SUPABASE_URL  ?? ""
const SERVICE_KEY   = env.SUPABASE_SERVICE_ROLE_KEY ?? ""

const SUPABASE_CONFIGURED =
  SUPABASE_URL.startsWith("https://") && SERVICE_KEY.length > 0

// =============================================================
// REPLAY DATA — verified output of replay-willits-2026.mjs
// Source: data/dlr/WILLITS_2026_REPLAY.md (Pass 57)
// All values are replay-computed, not re-scored.
// =============================================================

const PLAYER_ID   = "eli_willits"
const SEASON      = 2026
const NOW_ISO     = new Date().toISOString()

// ── Weekly snapshot rows (W14–W20) ───────────────────────────
//
// Field semantics mirror WeeklySnapshotPayload in writeWeeklySnapshot.ts:
//   dlr_score           — baseDLR + deltaShort (cold start → ≈50)
//   weekly_delta        — deltaShort at week close (capped ±1.5)
//   monthly_contribution — deltaMonthly = arithmetic avg of weeklyHistory window
//   weekly_history      — rolling 4-week delta window at week close
//   confidence_level    — composite sample-size tier at week close
//   health_class        — window population class (FULLY_REACTIVE = all 3 windows present)
//   fallback_used       — false: rolling blend drove scoring (no static-file fallback)
//   base_dlr            — 50 throughout (cold start — no prior 2026 persistedScore)
//
// baseDLR = 50 for all weeks because no prior 2026 persistedScore or
// monthlySettledScore existed when this observation began (Pass 56 Day Zero).
// In production, calculateDLR() would yield mid-60s to low-70s composite.
// The replay correctly bootstraps from cold start.

const WEEKLY_ROWS = [
  {
    snapshot_week:         "2026-W14",
    dlr_score:             50,
    dlr_tier:              "HOLD",
    weekly_delta:          -0.06,
    monthly_contribution:  -0.06,
    weekly_history:        [-0.06],
    confidence_level:      0.200,
    confidence_overall:    0.200,
    confidence_performance: 0.200,
    confidence_knowledge:  null,
    confidence_media:      null,
    confidence_market:     null,
    health_class:          "FULLY_REACTIVE",
    fallback_used:         false,
    base_dlr:              50,
    competition_level:     "A",
    large_movement: false,
    // P59 (= P58 = P57-3 for W14): Season opener Apr 3-5, 3 games, 14 AB.
    // 7D AVG .286. delta = .286 - .300 = -.014. conf=0.2. deltaShort=-0.06.
    // Cap never bound. Identical across all three versions.
    // Partial week. VAL=DARK (0 BB). Organism awakens from Day Zero reset.
  },
  {
    snapshot_week:         "2026-W15",
    dlr_score:             50,
    dlr_tier:              "HOLD",
    weekly_delta:          -0.32,
    monthly_contribution:  -0.19,
    weekly_history:        [-0.06, -0.32],
    confidence_level:      0.400,
    confidence_overall:    0.400,
    confidence_performance: 0.400,
    confidence_knowledge:  null,
    confidence_media:      null,
    confidence_market:     null,
    health_class:          "FULLY_REACTIVE",
    fallback_used:         false,
    base_dlr:              50,
    competition_level:     "A",
    large_movement: false,
    // P59 (= P58 = P57-3 for W15): ORGANISM COLLAPSE. 1-for-22 over 6 games.
    // 7D AVG .045. delta = -.255. cappedPerfDelta = -0.04. conf=0.4.
    // deltaShort = -0.04×20×0.4 = -0.32. ±1.5 hard cap never bound. Same all versions.
    // VAL=NEUTRAL (5 BB held discipline).
  },
  {
    snapshot_week:         "2026-W16",
    dlr_score:             50,
    dlr_tier:              "HOLD",
    weekly_delta:          +0.47,
    monthly_contribution:  +0.03,
    weekly_history:        [-0.06, -0.32, +0.47],
    confidence_level:      0.700,
    confidence_overall:    0.700,
    confidence_performance: 0.700,
    confidence_knowledge:  null,
    confidence_media:      null,
    confidence_market:     null,
    health_class:          "FULLY_REACTIVE",
    fallback_used:         false,
    base_dlr:              50,
    competition_level:     "A",
    large_movement: false,
    // P59 (= P58): Recovery arc. 7D AVG .333. delta = +.033.
    // cappedPerfDelta = +0.033 (within ±0.04). conf=0.7.
    // deltaShort = .033×20×0.7 = 0.462 → +0.47. Cap never bound.
    // P57-3 had -0.56 (30D drag). P58/P59: honest recovery visible.
    // Confidence upgrades to 0.7 at game 13 (cumAB=50).
  },
  {
    snapshot_week:         "2026-W17",
    dlr_score:             50,
    dlr_tier:              "HOLD",
    weekly_delta:          +0.56,
    monthly_contribution:  +0.16,
    weekly_history:        [-0.06, -0.32, +0.47, +0.56],
    confidence_level:      0.700,
    confidence_overall:    0.700,
    confidence_performance: 0.700,
    confidence_knowledge:  null,
    confidence_media:      null,
    confidence_market:     null,
    health_class:          "FULLY_REACTIVE",
    fallback_used:         false,
    base_dlr:              50,
    competition_level:     "A",
    large_movement: false,
    // P59 (= P58): Hot stretch. 7D AVG .385. delta = +.085. cappedPerfDelta = +0.04.
    // conf=0.7. deltaShort = 0.04×20×0.7 = +0.56. ±1.5 cap never bound.
    // P57-3 had +0.01 (30D drag). P58/P59: hot week reads hot.
    // 18 SB through April — RUN=HOT. Elite speed profile confirmed.
  },
  {
    snapshot_week:         "2026-W18",
    dlr_score:             50,
    dlr_tier:              "HOLD",
    weekly_delta:          +0.67,
    monthly_contribution:  +0.34,
    weekly_history:        [-0.32, +0.47, +0.56, +0.67],
    confidence_level:      1.000,
    confidence_overall:    1.000,
    confidence_performance: 1.000,
    confidence_knowledge:  null,
    confidence_media:      null,
    confidence_market:     null,
    health_class:          "FULLY_REACTIVE",
    fallback_used:         false,
    base_dlr:              50,
    competition_level:     "A",
    large_movement: false,
    // P59 (= P58): W18 spans Apr 27–May 3 (calendar month boundary).
    // Option A: W18 included in APRIL settlement.
    // Confidence upgrades to 1.000 at game 26 (cumAB=102).
    // 7D AVG .333. delta = +.033. cappedPerfDelta = +0.033. conf=1.0.
    // deltaShort = .033×20×1.0 = +0.66 → +0.67. Cap never bound.
    // W14 (-0.06) drops from weeklyHistory as 4-week window advances.
  },
  {
    snapshot_week:         "2026-W19",
    dlr_score:             50,
    dlr_tier:              "HOLD",
    weekly_delta:          -0.80,
    monthly_contribution:  +0.23,
    weekly_history:        [+0.47, +0.56, +0.67, -0.80],
    confidence_level:      1.000,
    confidence_overall:    1.000,
    confidence_performance: 1.000,
    confidence_knowledge:  null,
    confidence_media:      null,
    confidence_market:     null,
    health_class:          "FULLY_REACTIVE",
    fallback_used:         false,
    base_dlr:              50,
    competition_level:     "A",
    large_movement: false,
    // P59 (= P58): Cooling. 7D AVG .259. delta = -.041. cappedPerfDelta = -0.04.
    // conf=1.0. deltaShort = -0.04×20×1.0 = -0.80.
    // *** P59 CAP-REMOVAL FINDING: -0.80 is NATURAL (from cappedPerfDelta ceiling),
    // NOT from the ±1.5 post-multiplication clamp. Cap was never binding.
    // P57-3 had -0.34 (blended .283 — 30D cushion). P58/P59 identical.
    // large_movement=false (-0.80 < 2.0 threshold). VAL stays HOT.
  },
  {
    snapshot_week:         "2026-W20",
    dlr_score:             50,
    dlr_tier:              "HOLD",
    weekly_delta:          -0.80,
    monthly_contribution:  -0.09,
    weekly_history:        [+0.56, +0.67, -0.80, -0.80],
    confidence_level:      1.000,
    confidence_overall:    1.000,
    confidence_performance: 1.000,
    confidence_knowledge:  null,
    confidence_media:      null,
    confidence_market:     null,
    health_class:          "FULLY_REACTIVE",
    fallback_used:         false,
    base_dlr:              50,
    competition_level:     "A",
    large_movement: false,
    // P59 (= P58): PARTIAL WEEK — 1 game only (May 12 replay cutoff). 0-for-3, 1 BB vs SAL.
    // 7D AVG .143. delta = -.157. cappedPerfDelta = -0.04. conf=1.0.
    // deltaShort = -0.04×20×1.0 = -0.80. ±1.5 cap never bound.
    // *** HALT FINDING CONFIRMED: P59 identical to P58 for all 7 weeks.
    // The -0.80 ceiling is the natural output of cappedPerfDelta (±0.04) ×20×1.0.
    // The old ±1.5 hard cap was safety-only — it never fired in this 32-game dataset.
    // BAT=NEUTRAL, VAL=HOT, RUN=HOT. Organism distressed but not broken.
  }
]

// ── April 2026 monthly settlement (P58) ──────────────────────
//
// Weeks: W14, W15, W16, W17, W18 (Option A: W18 included in April)
// Weighting: most recent (W18) = 1.5×, prior weeks = 1.0×
//
// Weighted DLR:  (50×1.0 + 50×1.0 + 50×1.0 + 50×1.0 + 50×1.5) / 5.5 = 50.0
// Weighted conf: (0.2×1.0 + 0.4×1.0 + 0.7×1.0 + 0.7×1.0 + 1.0×1.5) / 5.5 = 3.5/5.5 = 0.636
// Avg delta:     (-0.06 + -0.32 + 0.47 + 0.56 + 0.67) / 5 = 1.32/5 = +0.264 → +0.26
// health_class:  FULLY_REACTIVE (from W18 — most recent row)
// weekly_history: [-0.32, +0.47, +0.56, +0.67] (from W18 — most recent row)
//
// NOTE: P57-3 had avgΔ = -0.13. P58 has avgΔ = +0.26. The swing reflects that
// P58 honestly credits the recovery arc (W16–W18 are genuinely above baseline)
// rather than dampening them via 30D drag. April was a month where the collapse
// (W14–W15) was outweighed in magnitude by the genuine recovery (W16–W18).
// The +0.26 is outside the spec's estimated -0.30 to +0.10 range — that estimate
// was based on P57-3 behavior. P58's honest weekly signals produce honest monthly
// aggregation. This is correct behavior, not a bug.

const MONTHLY_ROW = {
  settlement_month:    "2026-04",
  dlr_score:           50.0,
  dlr_tier:            "HOLD",
  week_count:          5,
  confidence_level:    0.636,
  health_class:        "FULLY_REACTIVE",
  weekly_avg_delta:    +0.26,
  monthly_contribution: null,        // not applicable at settlement level
  weekly_history:      [-0.32, +0.47, +0.56, +0.67],  // from W18 (most recent)
  source:              "manual",
  season:              SEASON
}

// =============================================================
// WRITE HELPERS
// =============================================================

function buildWeeklyPayload(row) {
  return {
    player_id:              PLAYER_ID,
    snapshot_week:          row.snapshot_week,
    engine_version:         "P59",
    dlr_score:              row.dlr_score,
    dlr_tier:               row.dlr_tier,
    confidence_level:       row.confidence_level,
    confidence_overall:     row.confidence_overall,
    confidence_knowledge:   row.confidence_knowledge,
    confidence_performance: row.confidence_performance,
    confidence_media:       row.confidence_media,
    confidence_market:      row.confidence_market,
    health_class:           row.health_class,
    fallback_used:          row.fallback_used,
    base_dlr:               row.base_dlr,
    weekly_delta:           row.weekly_delta,
    monthly_contribution:   row.monthly_contribution,
    weekly_history:         row.weekly_history,
    large_movement:         row.large_movement ?? false,  // P59 — migration 006
    competition_level:      row.competition_level,
    source:                 "manual",
    season:                 SEASON,
    updated_at:             NOW_ISO
  }
}

function buildMonthlyPayload(row) {
  return {
    player_id:             PLAYER_ID,
    settlement_month:      row.settlement_month,
    engine_version:        "P59",
    dlr_score:             row.dlr_score,
    dlr_tier:              row.dlr_tier,
    week_count:            row.week_count,
    confidence_level:      row.confidence_level,
    health_class:          row.health_class,
    weekly_avg_delta:      row.weekly_avg_delta,
    monthly_contribution:  row.monthly_contribution,
    weekly_history:        row.weekly_history,
    source:                row.source,
    season:                row.season,
    updated_at:            NOW_ISO
  }
}

// =============================================================
// DRY RUN OUTPUT
// =============================================================

function dryRunReport() {
  console.log("\n╔══════════════════════════════════════════════════════════╗")
  console.log("║  P57-2 DRY RUN — Willits 2026 Replay DB Write          ║")
  console.log("╚══════════════════════════════════════════════════════════╝\n")

  console.log("── PLAYER_DLR_WEEKLY (7 upserts) ─────────────────────────\n")
  for (const row of WEEKLY_ROWS) {
    const payload = buildWeeklyPayload(row)
    const indicator = row.weekly_delta >= 0 ? "▲" : "▼"
    console.log(
      `  ${payload.snapshot_week}  dlr=${payload.dlr_score}  ` +
      `Δ${indicator}${Math.abs(payload.weekly_delta).toFixed(2)}  ` +
      `conf=${payload.confidence_level}  ` +
      `health=${payload.health_class}  ` +
      `hist=[${payload.weekly_history?.join(", ")}]`
    )
  }

  console.log("\n── PLAYER_DLR_MONTHLY (1 upsert) ─────────────────────────\n")
  const mp = buildMonthlyPayload(MONTHLY_ROW)
  console.log(
    `  ${mp.settlement_month}  dlr=${mp.dlr_score}  ` +
    `weeks=${mp.week_count}  conf=${mp.confidence_level}  ` +
    `avgΔ=${mp.weekly_avg_delta >= 0 ? "+" : ""}${mp.weekly_avg_delta}  health=${mp.health_class}  ` +
    `is_partial=false`
  )

  console.log("\n── PLAYERS.DLR_SCORE (1 update, hot-read cache) ──────────\n")
  const mostRecent = WEEKLY_ROWS[WEEKLY_ROWS.length - 1]
  console.log(
    `  player_id=${PLAYER_ID}  dlr_score=${mostRecent.dlr_score}  ` +
    `dlr_updated_at=${NOW_ISO}`
  )

  console.log("\n── GOVERNANCE BOUNDS CHECK (P59) ──────────────────────────\n")
  let allClear = true
  for (const row of WEEKLY_ROWS) {
    // P59: no ±1.5 clamp. HALT only if |delta| > 5.0 (suspected math bug).
    if (Math.abs(row.weekly_delta) > 5.0) {
      console.log(`  ✗ HALT: ${row.snapshot_week} weekly_delta ${row.weekly_delta} exceeds ±5.0 — suspected math bug`)
      allClear = false
    }
    if (row.dlr_score < 0 || row.dlr_score > 100) {
      console.log(`  ✗ HALT: ${row.snapshot_week} dlr_score ${row.dlr_score} out of [0,100]`)
      allClear = false
    }
    if (![0.200, 0.400, 0.700, 1.000].includes(row.confidence_level)) {
      console.log(`  ✗ HALT: ${row.snapshot_week} confidence_level ${row.confidence_level} is not a valid tier`)
      allClear = false
    }
    if (row.large_movement) {
      console.log(`  ⚠ LARGE MOVEMENT: ${row.snapshot_week} |Δ|=${Math.abs(row.weekly_delta)} > 2.0 threshold — flag will persist`)
    }
  }
  if (allClear) {
    const largeCount = WEEKLY_ROWS.filter(r => r.large_movement).length
    console.log(`  ✓ All 7 rows pass P59 governance (no |Δ|>5.0, DLR ∈ [0,100], conf valid)`)
    if (largeCount === 0) console.log("  ✓ large_movement=false for all rows (cap was never binding)")
  }

  console.log("\n  DRY RUN COMPLETE — no writes performed. Remove --dry-run to execute.\n")
}

// =============================================================
// LIVE WRITE
// =============================================================

async function run() {
  if (DRY_RUN) {
    dryRunReport()
    return
  }

  if (!SUPABASE_CONFIGURED) {
    console.error(
      "\n[P57-2] Supabase not configured.\n" +
      "  NEXT_PUBLIC_SUPABASE_URL must start with 'https://' and\n" +
      "  SUPABASE_SERVICE_ROLE_KEY must be non-empty in .env.local\n" +
      "\n  Run with --dry-run to inspect payloads without writing.\n"
    )
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

  console.log("\n[P57-2] Willits 2026 Replay — DB Write")
  console.log(`  player_id: ${PLAYER_ID}`)
  console.log(`  season:    ${SEASON}`)
  console.log(`  mode:      LIVE WRITE`)
  console.log("")

  let weeklyOk = 0
  let weeklyFail = 0

  // ── Write 1: Weekly snapshot rows ────────────────────────────
  for (const row of WEEKLY_ROWS) {
    const payload = buildWeeklyPayload(row)

    const { error } = await supabase
      .from("player_dlr_weekly")
      .upsert(payload, {
        onConflict:       "player_id,snapshot_week,engine_version",
        ignoreDuplicates: false
      })

    if (error) {
      console.error(`  ✗ ${row.snapshot_week} — ${error.message}`)
      weeklyFail++
    } else {
      const indicator = row.weekly_delta >= 0 ? "▲" : "▼"
      console.log(
        `  ✓ ${row.snapshot_week}  dlr=${payload.dlr_score}  ` +
        `Δ${indicator}${Math.abs(payload.weekly_delta).toFixed(2)}  ` +
        `conf=${payload.confidence_level}  hist=[${payload.weekly_history?.join(", ")}]`
      )
      weeklyOk++
    }
  }

  // ── Write 2: Monthly settlement ───────────────────────────────
  console.log("")
  const mp = buildMonthlyPayload(MONTHLY_ROW)
  const { error: monthlyError } = await supabase
    .from("player_dlr_monthly")
    .upsert(mp, {
      onConflict:       "player_id,settlement_month,engine_version",
      ignoreDuplicates: false
    })

  if (monthlyError) {
    console.error(`  ✗ Monthly ${mp.settlement_month} — ${monthlyError.message}`)
  } else {
    console.log(
      `  ✓ Monthly ${mp.settlement_month}  dlr=${mp.dlr_score}  ` +
      `weeks=${mp.week_count}  conf=${mp.confidence_level}  ` +
      `avgΔ=${mp.weekly_avg_delta >= 0 ? "+" : ""}${mp.weekly_avg_delta}  is_partial=false`
    )
  }

  // ── Write 3: players.dlr_score hot-read cache ────────────────
  // Weekly layer owns this cache. W20 is the most recent week.
  // This is the value fetchPersistedDLR() will return for hydration.
  console.log("")
  const mostRecent = WEEKLY_ROWS[WEEKLY_ROWS.length - 1]
  const { error: playerError } = await supabase
    .from("players")
    .update({
      dlr_score:      mostRecent.dlr_score,
      dlr_updated_at: NOW_ISO
    })
    .eq("id", PLAYER_ID)

  if (playerError) {
    // Non-fatal: player row may not exist yet in players table
    console.warn(`  ⚠ players.dlr_score update: ${playerError.message} (non-fatal)`)
  } else {
    console.log(
      `  ✓ players.dlr_score → ${mostRecent.dlr_score} (hot-read cache updated)`
    )
  }

  // ── Summary ───────────────────────────────────────────────────
  console.log("")
  console.log(`  Weekly writes:  ${weeklyOk}/${WEEKLY_ROWS.length} succeeded`)
  console.log(`  Monthly writes: ${monthlyError ? 0 : 1}/1 succeeded`)
  console.log(`  Hot cache:      ${playerError ? "⚠ non-fatal fail" : "✓ updated"}`)

  const allSucceeded = weeklyOk === WEEKLY_ROWS.length && !monthlyError
  console.log(`\n  P57-2 ${allSucceeded ? "✓ COMPLETE" : "✗ PARTIAL — review errors above"}\n`)

  if (!allSucceeded) process.exit(1)
}

run().catch(err => {
  console.error("[P57-2] Fatal error:", err)
  process.exit(1)
})
