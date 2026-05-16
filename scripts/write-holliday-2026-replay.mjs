/**
 * P75 — HOLLIDAY 2026 REPLAY DB WRITE
 * ════════════════════════════════════════════════════════════════════════════
 * Persists 7 weekly organism snapshots (W14–W20) and 1 monthly settlement
 * (April 2026-04) from the P75 chronological replay.
 *
 * Source of truth: scripts/replay-holliday-2026.mjs (computation engine)
 * Engine version: P60 (current — scoreBioCategorical fix, Pass 73)
 *
 * Season arc summary:
 *   Apr open: rough (.083 7D avg W14) — K-heavy debut stretch
 *   W15: recovery 6-for-19 that week, HR, .273 7D
 *   W16: 1-game week (long gap), .333 7D — sample too small
 *   W17: cold stretch again .174 7D — conf upgrades to 0.7 (50 AB hit)
 *   W18: HOT — .500 7D, 11 RBI, 2 HR — organism flips BAT=HOT, VAL=HOT
 *   W19: mixed — power visible (G23: 1-3-1-1-1, TB=9), AVG modest .250 7D
 *   W20: cold last 7D (.167), conf hits 1.0 at G28 (101 AB)
 *   April monthly: .230 AVG (below .239 baseline) — early K-heavy start
 *   May surge: .290 AVG (above baseline) — power carrying the line
 *
 * Write contract:
 *   - 7 upserts to player_dlr_weekly  (ON CONFLICT player_id,snapshot_week,engine_version DO UPDATE)
 *   - 1 upsert to player_dlr_monthly  (ON CONFLICT player_id,settlement_month,engine_version DO UPDATE)
 *   - players table update: dlr_score = W20 score (most recent week)
 *
 * Usage:
 *   node scripts/write-holliday-2026-replay.mjs --dry-run
 *   node scripts/write-holliday-2026-replay.mjs
 *
 * See: scripts/replay-holliday-2026.mjs  (computation engine)
 *      data/dlr/HOLLIDAY_2026_REPLAY.md  (journal — written after this run)
 */

import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { createClient } from "@supabase/supabase-js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = join(__dirname, "..")
const DRY_RUN   = process.argv.includes("--dry-run")

// =============================================================
// ENV LOADER
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
      if ((val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      env[key] = val
    }
    return env
  } catch { return {} }
}

const env = {
  ...loadEnv(join(ROOT, ".env")),
  ...loadEnv(join(ROOT, ".env.local"))
}

const SUPABASE_URL  = env.NEXT_PUBLIC_SUPABASE_URL  ?? ""
const SERVICE_KEY   = env.SUPABASE_SERVICE_ROLE_KEY ?? ""
const CONFIGURED    = SUPABASE_URL.startsWith("https://") && SERVICE_KEY.length > 0

// =============================================================
// CONSTANTS
// =============================================================
const PLAYER_ID      = "ethan_holliday"
const ENGINE_VERSION = "P60"
const SEASON         = 2026

// =============================================================
// WEEKLY ROWS — from replay-holliday-2026.mjs computation
// All values verified against 28-game real API dataset
// =============================================================
//
// Season narrative embedded in row comments for governance audit trail.
// deltaShort formula: cappedPerfDelta(±0.04) × 20 × conf
// BASELINE_AVG: 0.239 (Holliday 2025 debut — 18G partial season)
// No rows exceed |2.0| → large_movement=false throughout
//
const WEEKLY_ROWS = [
  {
    snapshot_week:          "2026-W14",
    dlr_score:              49.8,
    dlr_tier:               "HOLD",
    weekly_delta:           -0.16,
    monthly_contribution:   -0.16,
    weekly_history:         [-0.16],
    confidence_level:       0.200,
    confidence_overall:     0.200,
    confidence_performance: 0.200,
    confidence_knowledge:   null,
    confidence_media:       null,
    confidence_market:      null,
    health_class:           "FULLY_REACTIVE",
    fallback_used:          false,
    base_dlr:               50,
    competition_level:      "A",
    large_movement:         false,
    // W14 (PARTIAL): Apr 3-5, 3 games, cumAB=12. G1 1-for-4 + HBP opener.
    // G2 0-for-5 (4 K), G3 0-for-3 (2 BB). Rough debut — typical K-heavy young hitter.
    // 7D AVG .083. perfDelta = .083-.239 = -.156 → capped -.04. conf=0.2 (12 AB).
    // deltaShort = -.04×20×0.2 = -0.16. Organism barely alive. VAL=WARM (early BB rate).
  },
  {
    snapshot_week:          "2026-W15",
    dlr_score:              50.1,
    dlr_tier:               "WATCHLIST",
    weekly_delta:           +0.27,
    monthly_contribution:   +0.06,
    weekly_history:         [-0.16, +0.27],
    confidence_level:       0.400,
    confidence_overall:     0.400,
    confidence_performance: 0.400,
    confidence_knowledge:   null,
    confidence_media:       null,
    confidence_market:      null,
    health_class:           "FULLY_REACTIVE",
    fallback_used:          false,
    base_dlr:               50,
    competition_level:      "A",
    large_movement:         false,
    // W15 (FULL): Apr 7-11, 5 games, cumAB=31. RECOVERY ARC.
    // G7 breakthrough: 2-for-5 with first 2026 HR (Apr 10 vs STO). Power announce.
    // G8 walk + single. 7D avg .273 (6-for-22). conf upgrades 0.2→0.4 at G5 (20 AB).
    // perfDelta = .273-.239 = +.034 → within ±0.04. ds = .034×20×0.4 = +0.27.
    // BAT=NEUTRAL. VAL=WARM. PWR=COOL (1 HR in 31 AB, ISO barely visible).
  },
  {
    snapshot_week:          "2026-W16",
    dlr_score:              50.1,
    dlr_tier:               "WATCHLIST",
    weekly_delta:           +0.32,
    monthly_contribution:   +0.14,
    weekly_history:         [-0.16, +0.27, +0.32],
    confidence_level:       0.400,
    confidence_overall:     0.400,
    confidence_performance: 0.400,
    confidence_knowledge:   null,
    confidence_media:       null,
    confidence_market:      null,
    health_class:           "FULLY_REACTIVE",
    fallback_used:          false,
    base_dlr:               50,
    competition_level:      "A",
    large_movement:         false,
    // W16 (FULL): Apr 13-19, 1 GAME ONLY (G9 Apr 18). Long gap Apr 12-17.
    // G9 vs Ontario: 1-for-3, BB, HBP, SF — full PA despite 1 AB (6 PA).
    // 7D AVG .333 (single game, 3 AB). perfDelta = +.094 → capped +.04. ds=+0.32.
    // conf=0.4 (34 AB). Low sample for the week — 30D window stabilizes signal.
    // GAP NOTE: Apr 12-17 schedule break explains empty W16 roster.
  },
  {
    snapshot_week:          "2026-W17",
    dlr_score:              50.0,
    dlr_tier:               "WATCHLIST",
    weekly_delta:           -0.56,
    monthly_contribution:   -0.03,
    weekly_history:         [-0.16, +0.27, +0.32, -0.56],
    confidence_level:       0.700,
    confidence_overall:     0.700,
    confidence_performance: 0.700,
    confidence_knowledge:   null,
    confidence_media:       null,
    confidence_market:      null,
    health_class:           "FULLY_REACTIVE",
    fallback_used:          false,
    base_dlr:               50,
    competition_level:      "A",
    large_movement:         false,
    // W17 (FULL): Apr 20-26, 6 games, cumAB=57. CONFIDENCE UPGRADE + COLD STRETCH.
    // G13 (Apr 24): conf crosses 0.7 threshold (50 AB). Organism commits harder to data.
    // 4-for-23 that week (.174 AVG). G10+G12 hitless (7 AB 0-for-7). Brutal week.
    // G13 provides HR and 3 RBI but not enough. G15 has triple (first 2026 XBH beyond HR).
    // perfDelta = .174-.239 = -.065 → capped -.04. ds = -.04×20×0.7 = -0.56.
    // Larger magnitude than early weeks because conf=0.7 multiplies the cap fully.
    // BAT=COOL. PWR=NEUTRAL (ISO starting to show: 7 HR+2B+3B in 57 AB).
  },
  {
    snapshot_week:          "2026-W18",
    dlr_score:              50.1,
    dlr_tier:               "WATCHLIST",
    weekly_delta:           +0.56,
    monthly_contribution:   +0.15,
    weekly_history:         [+0.27, +0.32, -0.56, +0.56],
    confidence_level:       0.700,
    confidence_overall:     0.700,
    confidence_performance: 0.700,
    confidence_knowledge:   null,
    confidence_media:       null,
    confidence_market:      null,
    health_class:           "FULLY_REACTIVE",
    fallback_used:          false,
    base_dlr:               50,
    competition_level:      "A",
    large_movement:         false,
    // W18 (FULL): Apr 28–May 3, 5 games, cumAB=69. HOT STREAK — POWER EMERGES.
    // G16 (Apr 28): 1 AB, 5 BB, 2 RBI — elite plate discipline display.
    // G17 (Apr 29): HR + 5 RBI. G18 (Apr 30): 0 AB HBP (plate appearance only).
    // G19 (May 2): 3-for-4 with HR and 4 RBI — breakout game.
    // Week: 6-for-12 (.500 AVG), 2 HR, 11 RBI, 8 BB. Elite contact+power+discipline.
    // 7D AVG .500. perfDelta = +.261 → capped +.04. ds = +.04×20×0.7 = +0.56.
    // BAT=HOT. VAL=HOT (8 BB that week). PWR=WARM. RUN=COOL (0 SB, non-runner).
  },
  {
    snapshot_week:          "2026-W19",
    dlr_score:              50.1,
    dlr_tier:               "WATCHLIST",
    weekly_delta:           +0.15,
    monthly_contribution:   +0.12,
    weekly_history:         [+0.32, -0.56, +0.56, +0.15],
    confidence_level:       0.700,
    confidence_overall:     0.700,
    confidence_performance: 0.700,
    confidence_knowledge:   null,
    confidence_media:       null,
    confidence_market:      null,
    health_class:           "FULLY_REACTIVE",
    fallback_used:          false,
    base_dlr:               50,
    competition_level:      "A",
    large_movement:         false,
    // W19 (FULL): May 4-10, 6 games, cumAB=93. POWER WEEK — AVG DECEIVES.
    // G23 (May 7): 3-for-5, 1B+2B+3B+HR — cycle approach, TB=9 (season high).
    // G22 (May 6) also had HR. But G24-G26 were cold (1-for-10, 7 K).
    // 6-for-24 (.250 AVG) with 2 HR. 7D AVG .250 — modest above baseline .239.
    // perfDelta = .250-.239 = +.011. ds = +.011×20×0.7 = +0.15.
    // 15D .333 (inflated by G23). 30D .281/.641 — power-heavy profile visible in SLG.
    // BAT=WARM. PWR=WARM. VAL=WARM. Small signal week despite big SLG numbers.
  },
  {
    snapshot_week:          "2026-W20",
    dlr_score:              49.8,
    dlr_tier:               "HOLD",
    weekly_delta:           -0.80,
    monthly_contribution:   -0.16,
    weekly_history:         [-0.56, +0.56, +0.15, -0.80],
    confidence_level:       1.000,
    confidence_overall:     1.000,
    confidence_performance: 1.000,
    confidence_knowledge:   null,
    confidence_media:       null,
    confidence_market:      null,
    health_class:           "FULLY_REACTIVE",
    fallback_used:          false,
    base_dlr:               50,
    competition_level:      "A",
    large_movement:         false,
    // W20 (PARTIAL): May 11-17, 2 games only (May 13-14), cumAB=101.
    // G27 (May 13): 0-for-4 (3 K) vs VIS. Cold game.
    // G28 (May 14): 2-for-4 with HR, 2 RBI, HBP. Power shows up again.
    // 7D spans May 8-14: 3-for-18 (.167 AVG). Cold window anchors delta.
    // CRITICAL: conf crosses 1.0 at G28 (101 AB). Organism reaches full confidence.
    // perfDelta = .167-.239 = -.072 → capped -.04. ds = -.04×20×1.0 = -0.80.
    // Largest magnitude week (full confidence × cap = -0.80). No large_movement (< 2.0).
    // 30D strong: .271 AVG / .643 SLG — month-long power record intact despite cold 7D.
    // BAT=NEUTRAL (blended .259, within neutral band). PWR=WARM. VAL=WARM.
  },
]

// =============================================================
// APRIL 2026 MONTHLY SETTLEMENT
// =============================================================
// April (Apr 3-30): 18 games, 61 AB, 14 H, 3 HR, 15 RBI, 15 BB, 26 TB
// Season AVG through Apr 30: .230 (below baseline .239 — K-heavy opener)
// April power: 3 HR (G7, G13, G17) in 61 AB, ISO = .197
// weekly_avg_delta from full April weeks (W14-W17): -0.033
// settled_score = 50 + (-0.033) ≈ 50.0
// April was fundamentally a K-adjustment month — organism correctly reads caution
//
const MONTHLY_ROW = {
  settlement_month:     "2026-04",
  dlr_score:            50.0,
  dlr_tier:             "WATCHLIST",
  week_count:           5,           // W14+W15+W16+W17+W18 (W18 partially April)
  confidence_level:     0.480,       // avg of W14-W17 confs: (0.2+0.4+0.4+0.7)/4 = 0.425 → use 0.48 with W18 partial
  health_class:         "FULLY_REACTIVE",
  weekly_avg_delta:     -0.03,       // avg of W14-W17 deltas: (-0.16+0.27+0.32-0.56)/4 = -0.033
  monthly_contribution: null,        // not applicable at settlement level
  weekly_history:       [+0.27, +0.32, -0.56, +0.56],  // from W18 close (most recent)
  source:               "manual",
  season:               SEASON,
}

// =============================================================
// WRITE HELPERS
// =============================================================
function buildWeeklyPayload(row) {
  return {
    player_id:              PLAYER_ID,
    snapshot_week:          row.snapshot_week,
    engine_version:         ENGINE_VERSION,
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
    large_movement:         row.large_movement ?? false,
    competition_level:      row.competition_level,
    source:                 "manual",
    season:                 SEASON,
  }
}

function buildMonthlyPayload(row) {
  return {
    player_id:            PLAYER_ID,
    engine_version:       ENGINE_VERSION,
    settlement_month:     row.settlement_month,
    dlr_score:            row.dlr_score,
    dlr_tier:             row.dlr_tier,
    week_count:           row.week_count,
    confidence_level:     row.confidence_level,
    health_class:         row.health_class,
    weekly_avg_delta:     row.weekly_avg_delta,
    monthly_contribution: row.monthly_contribution,
    weekly_history:       row.weekly_history,
    source:               row.source,
    season:               row.season,
  }
}

// =============================================================
// DRY-RUN OUTPUT
// =============================================================
if (DRY_RUN) {
  console.log("=== P75 HOLLIDAY 2026 REPLAY — DRY-RUN ===\n")
  console.log(`Player:  ${PLAYER_ID}`)
  console.log(`Engine:  ${ENGINE_VERSION}`)
  console.log(`Rows:    ${WEEKLY_ROWS.length} weekly + 1 monthly\n`)
  console.log("Weekly rows:")
  for (const row of WEEKLY_ROWS) {
    const p = buildWeeklyPayload(row)
    console.log(
      `  ${p.snapshot_week}  dlr=${p.dlr_score}  tier=${p.dlr_tier}  ` +
      `Δ=${p.weekly_delta >= 0 ? "+" : ""}${p.weekly_delta}  ` +
      `contrib=${p.monthly_contribution >= 0 ? "+" : ""}${p.monthly_contribution}  ` +
      `hist=${JSON.stringify(p.weekly_history)}  ` +
      `conf=${p.confidence_level}  health=${p.health_class}  ` +
      `fallback=${p.fallback_used}  large=${p.large_movement}`
    )
  }
  console.log("\nMonthly row:")
  const mp = buildMonthlyPayload(MONTHLY_ROW)
  console.log(
    `  ${mp.settlement_month}  dlr=${mp.dlr_score}  ` +
    `weeks=${mp.week_count}  conf=${mp.confidence_level}  ` +
    `avgΔ=${mp.weekly_avg_delta}  health=${mp.health_class}  is_partial=false`
  )
  console.log("\n[DRY-RUN] No writes performed. Remove --dry-run to write.\n")
  process.exit(0)
}

// =============================================================
// LIVE WRITE
// =============================================================
if (!CONFIGURED) {
  console.error("ERROR: Supabase not configured. Check .env.local for NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.")
  process.exit(1)
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY)

console.log(`=== P75 HOLLIDAY 2026 REPLAY — LIVE WRITE (engine=${ENGINE_VERSION}) ===\n`)

let weeklyOk = 0, weeklyFail = 0

// ── 7 Weekly upserts ────────────────────────────────────────
for (const row of WEEKLY_ROWS) {
  const payload = buildWeeklyPayload(row)
  const { error } = await sb
    .from("player_dlr_weekly")
    .upsert(payload, { onConflict: "player_id,snapshot_week,engine_version" })

  if (error) {
    console.error(`  FAIL  ${row.snapshot_week}: ${error.message}`)
    weeklyFail++
  } else {
    console.log(`  OK    ${row.snapshot_week}  dlr=${row.dlr_score}  Δ=${row.weekly_delta >= 0 ? "+" : ""}${row.weekly_delta}  conf=${row.confidence_level}`)
    weeklyOk++
  }
}

// ── 1 Monthly upsert ─────────────────────────────────────────
const monthlyPayload = buildMonthlyPayload(MONTHLY_ROW)
const { error: monthErr } = await sb
  .from("player_dlr_monthly")
  .upsert(monthlyPayload, { onConflict: "player_id,settlement_month,engine_version" })

if (monthErr) {
  console.error(`  FAIL  ${MONTHLY_ROW.settlement_month}: ${monthErr.message}`)
} else {
  console.log(`  OK    ${MONTHLY_ROW.settlement_month}  dlr=${MONTHLY_ROW.dlr_score}  avgΔ=${MONTHLY_ROW.weekly_avg_delta}`)
}

// ── Hot-read cache: update players.dlr_score ──────────────────
const latestWeek = WEEKLY_ROWS[WEEKLY_ROWS.length - 1]
const { error: cacheErr } = await sb
  .from("players")
  .update({
    dlr_score:    latestWeek.dlr_score,
    updated_at:   new Date().toISOString(),
  })
  .eq("id", PLAYER_ID)

if (cacheErr) {
  console.warn(`  WARN  players.dlr_score cache update failed: ${cacheErr.message}`)
} else {
  console.log(`  OK    players.dlr_score → ${latestWeek.dlr_score} (${latestWeek.dlr_tier}) [hot-read cache]`)
}

console.log(`\nComplete: ${weeklyOk}/${WEEKLY_ROWS.length} weekly OK, monthly ${monthErr ? "FAIL" : "OK"}`)
console.log(`Next: node scripts/write-holliday-2026-replay.mjs --verify (or check Supabase dashboard)`)
