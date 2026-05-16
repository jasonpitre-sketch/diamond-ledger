/**
 * INGEST-GAME — Live Single-Game Ingestion Engine  (Pass 62 + Pass 66 / 2026-05-14)
 * =========================================================================
 * Reusable, player-agnostic cascade that ingests one box-score line into the
 * organism's game log, recomputes all rolling windows from scratch, computes
 * the organism's DLR delta, and optionally persists to Supabase.
 *
 * PASS 66 EXTENSION: Pitcher ingestion path added.
 * ─────────────────────────────────────────────────────────────────────────
 *   - Auto-detects player kind from games/<player_id>.config.json
 *   - kind: "hitter"  → existing hitter cascade (Pass 62, byte-identical behavior)
 *   - kind: "pitcher" → new pitcher cascade (Pass 66, 13-step mirror)
 *   - Hitter behavior is UNCHANGED. Mismatched kind/args HALT with clear error.
 *   - IP convention: 6.1 = 6⅓ innings (6.333 decimal), 5.2 = 5⅔ (5.667 decimal)
 *   - Pitcher rolling windows are APPEARANCE-BASED (last N starts), not date-based
 *
 * HITTER 13-STEP CASCADE (unchanged)
 * ──────────────────────────────────────────────────────────────────────────
 *   Step  1  Parse & validate CLI / JSON input
 *   Step  2  Load player config  (games/<player_id>.config.json)
 *   Step  3  Load game log       (games/<player_id>-<year>.json)
 *   Step  4  Idempotency check   — reject if date already in log
 *   Step  5  Compute game TB     = h + d + 2t + 3hr
 *   Step  6  Append game         (in-memory; not written until Step 13)
 *   Step  7  Recompute cumulative season totals
 *   Step  8  Recompute rolling windows  (7D / 15D / 30D)
 *   Step  9  Compute organism signals   (BAT / VAL / RUN)
 *   Step 10  Compute DLR delta          (P58 fallback chain)
 *   Step 11  Update weeklyHistory       (trailing 4-week window)
 *   Step 12  Compute deltaMonthly       (arithmetic avg of weeklyHistory)
 *   Step 13  Dry-run output  OR  Live write (game log → disk, Supabase upsert)
 *
 * PITCHER 13-STEP CASCADE (Pass 66)
 * ──────────────────────────────────────────────────────────────────────────
 *   Step  1  Validate pitcher input  (IP, H, ER, BB, K required)
 *   Step  2  Load game log + idempotency check + append game
 *   Step  3  Recompute season totals + derived rates (ERA/WHIP/K9/BB9/FIP)
 *   Step  4  Recompute rolling windows (appearance-based: starts7/15/30)
 *   Step  5  Update lastGame field
 *   Step  6  Recompute pitcher signals (CMD / K / DUR / VAL)
 *   Step  7  Compute ISO week + new-week vs same-week
 *   Step  8  Compute DLR delta (ERA-based, vs baselineERA from config)
 *   Step  9  UPSERT player_dlr_weekly (skipped in dry-run)
 *   Step 10  Update players.dlr_score hot cache (skipped in dry-run)
 *   Step 11  Update weeklyHistory + append journal entry
 *   Step 12  Compute deltaMonthly
 *   Step 13  Output summary  OR  Live write
 *
 * HITTER USAGE
 * ──────────────────────────────────────────────────────────────────────────
 *   node scripts/ingest-game.mjs \
 *     --player eli_willits \
 *     --date 2026-05-13 \
 *     --opp "vs SAL" \
 *     --ab 4 --r 1 --h 2 --tb 3 \
 *     --2b 1 --3b 0 --hr 0 --rbi 1 --bb 0 --so 1 --sb 1 --cs 0 \
 *     [--dry-run] [--write-week] [--year 2026]
 *
 * PITCHER USAGE
 * ──────────────────────────────────────────────────────────────────────────
 *   node scripts/ingest-game.mjs \
 *     --player carson_bolemon \
 *     --date 2026-04-15 \
 *     --opp "vs Eastside HS" \
 *     --ip 6.0 --h 2 --r 0 --er 0 --bb 1 --k 11 --hr 0 \
 *     --bf 21 --result "W" \
 *     --dry-run
 *
 * FLAGS
 *   --dry-run     Print full cascade output without writing anything.
 *   --write-week  Force a weekly Supabase snapshot upsert even if not week-close.
 *   --year YYYY   Override season year (default: year from --date or config).
 *
 * DESIGN CONTRACT
 *   - Game log is the single source of truth for rolling window recomputation.
 *   - Rolling windows always recomputed from full game log, never patched.
 *   - Idempotency: a game date already in the log causes a non-zero exit.
 *   - Pitcher rolling windows: appearance-based (last N starts), not date-based.
 *   - IP convention: the fractional digit is THIRDS (0/1/2), not a decimal.
 *   - Supabase upsert uses ON CONFLICT (player_id, snapshot_week, engine_version).
 *
 * See: data/dlr/LIVE_INGESTION_RULES.md
 *      data/dlr/WILLITS_2026_REPLAY.md
 *      data/dlr/engineVersion.ts (engine version = P59)
 */

import { readFileSync, writeFileSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { createClient } from "@supabase/supabase-js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = join(__dirname, "..")
const ENGINE_VERSION = "P59"

// =============================================================
// SECTION 0 — ENV LOADER
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
  } catch {
    return {}
  }
}

const env = {
  ...loadEnv(join(ROOT, ".env")),
  ...loadEnv(join(ROOT, ".env.local"))
}

const SUPABASE_URL  = env.NEXT_PUBLIC_SUPABASE_URL  ?? ""
const SERVICE_KEY   = env.SUPABASE_SERVICE_ROLE_KEY ?? ""
const SUPABASE_CONFIGURED = SUPABASE_URL.startsWith("https://") && SERVICE_KEY.length > 0

// =============================================================
// SECTION 1 — INPUT PARSING
// =============================================================

function parseCLI(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--dry-run")    { args.dryRun = true; continue }
    if (a === "--write-week") { args.writeWeek = true; continue }
    if (a.startsWith("--")) {
      const key = a.slice(2)
      const val = argv[i + 1]
      if (val !== undefined && !val.startsWith("--")) {
        args[key] = val
        i++
      } else {
        args[key] = true
      }
    }
  }
  return args
}

// =============================================================
// SECTION 2 — PLAYER CONFIG
// =============================================================

function loadConfig(playerId) {
  const path = join(ROOT, "games", `${playerId}.config.json`)
  if (!existsSync(path)) {
    fatal(`Player config not found: ${path}\nCreate games/${playerId}.config.json before ingesting.`)
  }
  return JSON.parse(readFileSync(path, "utf8"))
}

// =============================================================
// SECTION 3 — GAME LOG
// =============================================================

function loadGameLog(playerId, year) {
  const path = join(ROOT, "games", `${playerId}-${year}.json`)
  if (!existsSync(path)) {
    warn(`Game log not found: ${path}. Bootstrapping empty log.`)
    return { player_id: playerId, season: year, games: [] }
  }
  return JSON.parse(readFileSync(path, "utf8"))
}

// =============================================================
// SECTION 4 — IDEMPOTENCY CHECK
// =============================================================

function idempotencyCheck(games, date) {
  const existing = games.find(g => g.date === date)
  if (existing) {
    fatal(
      `IDEMPOTENCY VIOLATION: Game on ${date} already exists in log (g=${existing.g}).\n` +
      `To update, edit the JSON manually. Run --dry-run to preview state after a new game.`
    )
  }
}

// =============================================================
// SECTION 5 — HITTER: COMPUTE TB
// =============================================================

function computeTB(game) {
  // TB = singles + 2×doubles + 3×triples + 4×HR
  // singles = h - d - t - hr
  const singles = game.h - game.d - game.t - game.hr
  return singles + game.d * 2 + game.t * 3 + game.hr * 4
}

// =============================================================
// SECTION 6 — HITTER: APPEND GAME (in-memory)
// =============================================================

function appendGame(games, game) {
  const nextG = games.length > 0 ? Math.max(...games.map(g => g.g)) + 1 : 1
  return [...games, { ...game, g: nextG }]
}

// =============================================================
// SECTION 7 — HITTER: CUMULATIVE SEASON TOTALS
// =============================================================

function computeSeasonTotals(games) {
  const ab  = games.reduce((s, g) => s + g.ab,  0)
  const h   = games.reduce((s, g) => s + g.h,   0)
  const d   = games.reduce((s, g) => s + g.d,   0)
  const t   = games.reduce((s, g) => s + g.t,   0)
  const hr  = games.reduce((s, g) => s + g.hr,  0)
  const rbi = games.reduce((s, g) => s + g.rbi, 0)
  const bb  = games.reduce((s, g) => s + g.bb,  0)
  const so  = games.reduce((s, g) => s + g.so,  0)
  const sb  = games.reduce((s, g) => s + g.sb,  0)
  const r   = games.reduce((s, g) => s + g.r,   0)
  const tb  = games.reduce((s, g) => s + g.tb,  0)
  const avg = ab > 0 ? h / ab : null
  const obp = (ab + bb) > 0 ? (h + bb) / (ab + bb) : null
  const slg = ab > 0 ? tb / ab : null
  const ops = (obp !== null && slg !== null) ? obp + slg : null
  return { g: games.length, ab, h, d, t, hr, rbi, bb, so, sb, r, tb, avg, obp, slg, ops }
}

// =============================================================
// SECTION 8 — HITTER: ROLLING WINDOWS  (7D / 15D / 30D)
// =============================================================

function dateMs(str) {
  return new Date(str + "T12:00:00Z").getTime()
}

function rollingWindow(games, targetDate, daysBack) {
  const targetMs = dateMs(targetDate)
  const cutoffMs = targetMs - (daysBack - 1) * 24 * 3600 * 1000
  const window   = games.filter(g => {
    const ms = dateMs(g.date)
    return ms >= cutoffMs && ms <= targetMs
  })
  if (window.length === 0) return null

  const ab  = window.reduce((s, g) => s + g.ab,  0)
  const h   = window.reduce((s, g) => s + g.h,   0)
  const bb  = window.reduce((s, g) => s + g.bb,  0)
  const tb  = window.reduce((s, g) => s + g.tb,  0)
  const hr  = window.reduce((s, g) => s + g.hr,  0)
  const sb  = window.reduce((s, g) => s + g.sb,  0)
  const so  = window.reduce((s, g) => s + g.so,  0)
  const avg = ab > 0 ? h / ab : null
  const obp = (ab + bb) > 0 ? (h + bb) / (ab + bb) : null
  const slg = ab > 0 ? tb / ab : null
  const ops = (obp !== null && slg !== null) ? obp + slg : null

  return { ab, h, bb, tb, hr, sb, so, avg, obp, slg, ops, games: window.length }
}

// =============================================================
// SECTION 9 — HITTER: ORGANISM SIGNALS  (BAT / VAL / RUN)
// =============================================================

// Five-band: DARK / COOL / NEUTRAL / WARM / HOT
// Thresholds match replay-willits-2026.mjs
const BASELINE_THRESHOLDS = {
  avg: { hot: 0.330, warm: 0.300, cool: 0.260, dark: 0.230 },
  bb:  { hot: 0.120, warm: 0.080, cool: 0.050              },  // BB/(AB+BB) rate
  sb:  { hot: 12,    warm: 6,     cool: 2                   },  // cumulative SB
}

function signalBand(value, t, higherIsBetter = true) {
  if (value === null) return "NEUTRAL"
  if (higherIsBetter) {
    if (value >= t.hot)  return "HOT"
    if (value >= t.warm) return "WARM"
    if (value >= t.cool) return "COOL"
    if (t.dark !== undefined && value >= t.dark) return "DARK"
    return "DARK"
  } else {
    if (value <= t.hot)  return "HOT"
    if (value <= t.warm) return "WARM"
    if (value <= t.cool) return "COOL"
    return "DARK"
  }
}

function computeSignals(d7, d15, d30, blendedAVG, cumAB, cumBB, cumSB) {
  const bbRate = (cumAB + cumBB) > 0 ? cumBB / (cumAB + cumBB) : null
  const bat = signalBand(blendedAVG, BASELINE_THRESHOLDS.avg)
  const val = signalBand(bbRate,     BASELINE_THRESHOLDS.bb)
  const run = signalBand(cumSB,      BASELINE_THRESHOLDS.sb)
  return { bat, val, run }
}

// =============================================================
// SECTION 10 — HITTER: DLR DELTA  (P58 fallback chain)
// =============================================================

// SNAPSHOT_WEIGHTS — mirrors playerBridge.ts
const SNAPSHOT_WEIGHTS = { d7: 0.20, d15: 0.30, d30: 0.50 }

function blendStat(d7, d15, d30, weights) {
  const pts = []
  if (d7  !== null && d7  !== undefined) pts.push({ val: d7,  w: weights.d7  })
  if (d15 !== null && d15 !== undefined) pts.push({ val: d15, w: weights.d15 })
  if (d30 !== null && d30 !== undefined) pts.push({ val: d30, w: weights.d30 })
  if (pts.length === 0) return null
  const total = pts.reduce((s, p) => s + p.w, 0)
  return pts.reduce((s, p) => s + p.val * (p.w / total), 0)
}

function blendAVG(d7, d15, d30) {
  return blendStat(d7?.avg, d15?.avg, d30?.avg, SNAPSHOT_WEIGHTS)
}

// P58 fallback chain: 7D → 15D → 30D → null (for delta signal)
function weeklyDeltaAVG(d7, d15, d30) {
  return d7?.avg ?? d15?.avg ?? d30?.avg ?? null
}

function confidenceTier(ab) {
  if (ab >= 100) return 1.0
  if (ab >= 50)  return 0.7
  if (ab >= 20)  return 0.4
  return 0.2
}

const LARGE_MOVEMENT_THRESHOLD = 2.0

function calcDeltaShort(weeklyAvg, baselineAVG, cumAB) {
  if (weeklyAvg === null) return { deltaShort: 0, largeMovement: false }
  const perfDelta  = weeklyAvg - baselineAVG
  const capped     = Math.max(-0.04, Math.min(0.04, perfDelta))
  const conf       = confidenceTier(cumAB)
  const ds         = Number((capped * 20 * conf).toFixed(2))
  return { deltaShort: ds, largeMovement: Math.abs(ds) > LARGE_MOVEMENT_THRESHOLD }
}

// =============================================================
// SECTION 11 — WEEKLY HISTORY UPDATE
// =============================================================

/**
 * Update the trailing 4-week weeklyHistory array.
 *
 * Same-week rule: if the new game is in the same ISO week as the
 * most recent game already in the log, REPLACE the last history
 * entry (the current week's value gets refreshed, not duplicated).
 *
 * New-week rule: if the new game is in a new ISO week, APPEND
 * to the history and trim to the most recent 4 entries.
 *
 * This prevents phantom duplicate entries for intraweek ingests.
 */
function updateWeeklyHistory(prevGames, existingHistory, deltaShort, newDate) {
  const history = Array.isArray(existingHistory) ? existingHistory : []
  if (prevGames.length === 0) return [deltaShort]

  const lastPrev = [...prevGames].sort((a, b) => a.date.localeCompare(b.date)).at(-1)
  const lastWeek = isoWeekStr(lastPrev.date)
  const newWeek  = isoWeekStr(newDate)

  if (lastWeek === newWeek) {
    // Same ISO week — replace last entry (refresh current week's signal)
    return history.length > 0
      ? [...history.slice(0, -1), deltaShort]
      : [deltaShort]
  } else {
    // New ISO week — append + keep trailing 4
    return [...history, deltaShort].slice(-4)
  }
}

// =============================================================
// SECTION 12 — DELTA MONTHLY
// =============================================================

function computeDeltaMonthly(weeklyHistory) {
  if (!weeklyHistory.length) return 0
  const sum = weeklyHistory.reduce((s, v) => s + v, 0)
  return Number((sum / weeklyHistory.length).toFixed(2))
}

// =============================================================
// SECTION 13 — ISO WEEK
// =============================================================

function isoWeekStr(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z")
  const dayOfWeek = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek)
  const yearStart  = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNumber = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`
}

function isWeekBoundary(games, newDate) {
  // Week boundary = the new game is in a different ISO week than the previous game,
  // AND there were games before it.
  if (games.length === 0) return false
  const prevGame = [...games].sort((a, b) => a.date.localeCompare(b.date)).at(-1)
  return prevGame && isoWeekStr(prevGame.date) !== isoWeekStr(newDate)
}

// =============================================================
// SECTION 14 — SUPABASE WRITE
// =============================================================

async function fetchCurrentBaseDLR(supabase, playerId) {
  try {
    const { data } = await supabase
      .from("player_dlr_weekly")
      .select("dlr_score, snapshot_week")
      .eq("player_id", playerId)
      .eq("engine_version", ENGINE_VERSION)
      .order("snapshot_week", { ascending: false })
      .limit(1)
      .single()
    return data?.dlr_score ?? 50
  } catch {
    return 50
  }
}

async function upsertWeeklySnapshot(supabase, payload) {
  const { error } = await supabase
    .from("player_dlr_weekly")
    .upsert(payload, {
      onConflict:       "player_id,snapshot_week,engine_version",
      ignoreDuplicates: false
    })
  if (error) throw new Error(`Supabase upsert failed: ${error.message}`)
}

async function updatePlayersDLRScore(supabase, playerId, dlrScore) {
  const { error } = await supabase
    .from("players")
    .update({ dlr_score: dlrScore, dlr_updated_at: new Date().toISOString() })
    .eq("id", playerId)
  if (error) {
    warn(`players.dlr_score update failed (non-fatal): ${error.message}`)
  }
}

// =============================================================
// HELPERS
// =============================================================

function fatal(msg) {
  throw new Error(`[HALT] ${msg}`)
}

function warn(msg) {
  console.warn(`[WARN] ${msg}`)
}

function fmt3(n) { return n !== null && n !== undefined ? n.toFixed(3) : "—" }
function fmt2(n) { return n !== null && n !== undefined ? n.toFixed(2) : "—" }
function fmtP(n) { return n !== null && n !== undefined ? `${(n * 100).toFixed(1)}%` : "—" }

// =============================================================
// ╔═══════════════════════════════════════════════════════════╗
// ║  PASS 66 — PITCHER INGESTION EXTENSION                   ║
// ║  All functions below are NEW. Nothing above was changed. ║
// ╚═══════════════════════════════════════════════════════════╝
// =============================================================

// =============================================================
// P66-A — IP CONVENTION UTILITIES
// =============================================================

/**
 * Convert baseball IP notation to decimal innings.
 *
 * Baseball uses a non-decimal fractional system:
 *   6.0 = 6 full innings         = 6.000 decimal
 *   6.1 = 6 and 1/3 innings      = 6.333... decimal
 *   6.2 = 6 and 2/3 innings      = 6.667... decimal
 *
 * The digit after the decimal point represents THIRDS (0, 1, or 2),
 * NOT a standard decimal fraction. 6.1 is NOT 6.1 innings —
 * it is 6⅓ innings. This is the most common source of ERA
 * calculation errors in baseball software.
 *
 * Valid inputs: X.0, X.1, X.2 where X is any non-negative integer.
 */
function toDecimalInnings(ip) {
  const full      = Math.floor(ip)
  const fracDigit = Math.round((ip - full) * 10)  // extracts the tenths digit (0, 1, or 2)
  if (fracDigit === 0) return full
  if (fracDigit === 1) return full + 1 / 3
  if (fracDigit === 2) return full + 2 / 3
  // Out-of-range fraction — warn and treat as full innings
  warn(`Unusual IP fraction: ${ip} (frac=${fracDigit}). Expected X.0, X.1, or X.2. Treating as ${full} full innings.`)
  return full
}

/**
 * Convert decimal innings back to baseball notation for display.
 *   6.333... → "6.1"
 *   5.667... → "5.2"
 *   6.000    → "6.0"
 */
function fromDecimalInnings(ipDec) {
  const full = Math.floor(ipDec)
  const frac = ipDec - full
  if (frac < 0.01)                    return `${full}.0`
  if (Math.abs(frac - 1 / 3) < 0.01) return `${full}.1`
  if (Math.abs(frac - 2 / 3) < 0.01) return `${full}.2`
  return ipDec.toFixed(2)  // fallback for accumulated sums
}

function formatIP(ipDec) { return fromDecimalInnings(ipDec) }

function fmtERA(n) {
  if (n === null || n === undefined) return "—"
  if (n === 0) return "0.00"
  return n.toFixed(2)
}

// =============================================================
// P66-B — PITCHER: APPEND GAME
// =============================================================

function appendPitcherGame(games, game) {
  const nextG = games.length > 0 ? Math.max(...games.map(g => g.g)) + 1 : 1
  return [...games, { ...game, g: nextG }]
}

// =============================================================
// P66-C — PITCHER: CUMULATIVE SEASON TOTALS + RATE STATS
// =============================================================

function computePitcherSeasonTotals(games) {
  if (games.length === 0) {
    return {
      gs: 0, ipDec: 0, h: 0, r: 0, er: 0, bb: 0, k: 0, hr: 0, bf: 0,
      era: null, whip: null, k9: null, bb9: null, hr9: null, kMinusBBPct: null, fip: null
    }
  }

  // ipDec stored on game object from ingest; fall back to converting ip field
  const ipDec = games.reduce((s, g) => s + (g.ipDec ?? toDecimalInnings(g.ip)), 0)
  const h     = games.reduce((s, g) => s + g.h,  0)
  const r     = games.reduce((s, g) => s + g.r,  0)
  const er    = games.reduce((s, g) => s + g.er, 0)
  const bb    = games.reduce((s, g) => s + g.bb, 0)
  const k     = games.reduce((s, g) => s + g.k,  0)
  const hr    = games.reduce((s, g) => s + g.hr, 0)
  const bf    = games.reduce((s, g) => s + (g.bf ?? 0), 0)
  const gs    = games.length

  const era         = ipDec > 0 ? (er * 9)  / ipDec : null
  const whip        = ipDec > 0 ? (bb + h)  / ipDec : null
  const k9          = ipDec > 0 ? (k * 9)   / ipDec : null
  const bb9         = ipDec > 0 ? (bb * 9)  / ipDec : null
  const hr9         = ipDec > 0 ? (hr * 9)  / ipDec : null
  const kMinusBBPct = bf   > 0 ? (k - bb)   / bf    : null

  // FIP (Fielding Independent Pitching) — league constant 3.10 approximation
  // Formula: ((13×HR + 3×BB − 2×K) / IP) + 3.10
  // Negative FIP values are valid and indicate extreme dominance (very high K, very low HR/BB).
  const fip = ipDec > 0 ? ((13 * hr + 3 * bb - 2 * k) / ipDec) + 3.10 : null

  return { gs, ipDec, h, r, er, bb, k, hr, bf, era, whip, k9, bb9, hr9, kMinusBBPct, fip }
}

// =============================================================
// P66-D — PITCHER: ROLLING WINDOWS (APPEARANCE-BASED)
// =============================================================

/**
 * Pitcher rolling windows are APPEARANCE-BASED (last N starts),
 * NOT date-based. This is a critical structural difference from hitters.
 *
 * Rationale: HS pitchers start once per week (~5–7 day intervals).
 * A 7-day date window would capture at most 1–2 starts, which is
 * insufficient for meaningful signal. "Last 7 starts" captures ~5–7
 * weeks of recent performance — the correct evaluation window.
 *
 * For MLB pitchers (future use), this remains correct: "last 7 starts"
 * covers roughly 35 days of a standard rotation.
 */
function pitcherRollingWindow(games, n) {
  if (games.length === 0) return null
  const sorted = [...games].sort((a, b) => a.date.localeCompare(b.date))
  const window = sorted.slice(-n)
  if (window.length === 0) return null

  const ipDec = window.reduce((s, g) => s + (g.ipDec ?? toDecimalInnings(g.ip)), 0)
  const h     = window.reduce((s, g) => s + g.h,  0)
  const er    = window.reduce((s, g) => s + g.er, 0)
  const bb    = window.reduce((s, g) => s + g.bb, 0)
  const k     = window.reduce((s, g) => s + g.k,  0)
  const hr    = window.reduce((s, g) => s + g.hr, 0)
  const bf    = window.reduce((s, g) => s + (g.bf ?? 0), 0)

  return {
    starts: window.length,
    ipDec,
    h, er, bb, k, hr, bf,
    era:  ipDec > 0 ? (er * 9)  / ipDec : null,
    whip: ipDec > 0 ? (bb + h)  / ipDec : null,
    k9:   ipDec > 0 ? (k * 9)   / ipDec : null,
    bb9:  ipDec > 0 ? (bb * 9)  / ipDec : null,
  }
}

// =============================================================
// P66-E — PITCHER: SIGNALS  (CMD / K / DUR / VAL)
// =============================================================

/**
 * Pitcher signal thresholds — calibrated for HS/NCAA context.
 *
 * CMD (command):  BB/9. Lower is better.
 *   HOT  < 2.0 BB/9   — elite command (Bolemon 2025: 1.3 BB/9)
 *   WARM < 3.0 BB/9   — above-average command
 *   COOL < 4.5 BB/9   — fringe command
 *   DARK ≥ 4.5 BB/9   — command concern
 *
 * K (strikeout signal): K/9. Higher is better.
 *   HOT  ≥ 14.0 K/9   — elite (HS-calibrated; Bolemon 2025: 22.1 K/9)
 *   WARM ≥  9.0 K/9   — above-average
 *   COOL ≥  5.0 K/9   — average
 *   DARK <  5.0 K/9   — below-average for a starter
 *
 * DUR (durability): avg IP per start. Higher is better.
 *   HOT  ≥ 6.0 IP/start — deep outings
 *   WARM ≥ 5.0 IP/start — solid length
 *   COOL ≥ 4.0 IP/start — serviceable
 *   DARK <  4.0 IP/start — short-outing concern
 *
 * VAL (composite value): arithmetic average of CMD rank + K rank.
 */
const PITCHER_THRESHOLDS = {
  bb9:        { hot: 2.0,  warm: 3.0,  cool: 4.5  },   // lower is better
  k9:         { hot: 14.0, warm: 9.0,  cool: 5.0  },   // higher is better
  ipPerStart: { hot: 6.0,  warm: 5.0,  cool: 4.0  },   // higher is better
}

const BAND_RANK = { DARK: 0, COOL: 1, NEUTRAL: 2, WARM: 3, HOT: 4 }

function computePitcherSignals(activeWindow, totals) {
  const bb9        = activeWindow?.bb9 ?? totals.bb9
  const k9         = activeWindow?.k9  ?? totals.k9
  const avgIPStart = totals.gs > 0 ? totals.ipDec / totals.gs : null

  // CMD — lower BB/9 is better
  let cmd = "NEUTRAL"
  if (bb9 !== null) {
    if (bb9 < PITCHER_THRESHOLDS.bb9.hot)       cmd = "HOT"
    else if (bb9 < PITCHER_THRESHOLDS.bb9.warm) cmd = "WARM"
    else if (bb9 < PITCHER_THRESHOLDS.bb9.cool) cmd = "COOL"
    else                                         cmd = "DARK"
  }

  // K signal — higher K/9 is better
  let kSig = "NEUTRAL"
  if (k9 !== null) {
    if (k9 >= PITCHER_THRESHOLDS.k9.hot)       kSig = "HOT"
    else if (k9 >= PITCHER_THRESHOLDS.k9.warm) kSig = "WARM"
    else if (k9 >= PITCHER_THRESHOLDS.k9.cool) kSig = "COOL"
    else                                        kSig = "DARK"
  }

  // DUR signal — higher avg IP/start is better
  let dur = "NEUTRAL"
  if (avgIPStart !== null) {
    if (avgIPStart >= PITCHER_THRESHOLDS.ipPerStart.hot)       dur = "HOT"
    else if (avgIPStart >= PITCHER_THRESHOLDS.ipPerStart.warm) dur = "WARM"
    else if (avgIPStart >= PITCHER_THRESHOLDS.ipPerStart.cool) dur = "COOL"
    else                                                       dur = "DARK"
  }

  // VAL — composite of CMD + K signal ranks
  const cmdRank = BAND_RANK[cmd]  ?? 2
  const kRank   = BAND_RANK[kSig] ?? 2
  const avgRank = (cmdRank + kRank) / 2
  let val = "NEUTRAL"
  if (avgRank >= 3.5)      val = "HOT"
  else if (avgRank >= 2.5) val = "WARM"
  else if (avgRank >= 1.5) val = "COOL"
  else                     val = "DARK"

  // VEL — placeholder; requires velocity tracking in tracker block
  return { cmd, k: kSig, dur, val, vel: null }
}

// =============================================================
// P66-F — PITCHER: DLR DELTA
// =============================================================

/**
 * Confidence tier for pitchers — based on innings pitched.
 * Mirrors hitter confidenceTier(ab) but scaled to IP.
 */
function confidenceTierIP(ipDec) {
  if (ipDec >= 30) return 1.0
  if (ipDec >= 15) return 0.7
  if (ipDec >= 5)  return 0.4
  return 0.2
}

/**
 * ERA-based delta computation for pitchers.
 * Mirrors calcDeltaShort() for hitters but inverted direction (lower ERA = better).
 *
 * ERA range (~0–10) is wider than AVG range (~0.150–0.400),
 * so the scaling factor (20/15) is adjusted to produce comparable
 * deltaShort magnitudes.
 *
 * Returns { deltaShort: 0, fallbackUsed: true } when baselineERA is null
 * (first ingestion / no prior baseline established).
 */
function calcPitcherDeltaShort(rollingERA, baselineERA, ipDec) {
  if (baselineERA === null || rollingERA === null) {
    return { deltaShort: 0, largeMovement: false, fallbackUsed: true }
  }
  // ERA: lower is better → (baseline − rolling) is positive when improving
  const perfDelta = baselineERA - rollingERA
  // Cap at ±3.00 ERA (broader than AVG ±0.04 cap)
  const capped    = Math.max(-3.0, Math.min(3.0, perfDelta))
  // Scale: (20/15) brings ERA delta into similar DLR magnitude range as hitter delta
  const conf      = confidenceTierIP(ipDec)
  const ds        = Number((capped * (20 / 15) * conf).toFixed(2))
  return { deltaShort: ds, largeMovement: Math.abs(ds) > LARGE_MOVEMENT_THRESHOLD, fallbackUsed: false }
}

// =============================================================
// P66-G — PITCHER CASCADE (13 STEPS)
// =============================================================

async function ingestPitcherGame(rawArgs, filePayload, config, playerId, year, dateStr, dryRun, writeWeek) {
  const opp = rawArgs.opp ?? filePayload?.opponent ?? filePayload?.opp ?? ""
  console.log(`Opponent: ${opp}`)
  console.log(`Dry-run: ${dryRun ? "YES — no writes" : "NO — live write"}`)

  // ── Step 1: Validate pitcher input ─────────────────────────────────────
  section("Step 1 — Pitcher Input Validation")

  const ip_raw  = rawArgs.ip  !== undefined ? Number(rawArgs.ip)  : (filePayload?.IP  ?? filePayload?.ip  ?? undefined)
  const h_all   = rawArgs.h   !== undefined ? Number(rawArgs.h)   : Number(filePayload?.H   ?? filePayload?.h   ?? 0)
  const r_all   = rawArgs.r   !== undefined ? Number(rawArgs.r)   : Number(filePayload?.R   ?? filePayload?.r   ?? 0)
  const er      = rawArgs.er  !== undefined ? Number(rawArgs.er)  : Number(filePayload?.ER  ?? filePayload?.er  ?? 0)
  const bb      = rawArgs.bb  !== undefined ? Number(rawArgs.bb)  : Number(filePayload?.BB  ?? filePayload?.bb  ?? 0)
  const k       = rawArgs.k   !== undefined ? Number(rawArgs.k)   : Number(filePayload?.K   ?? filePayload?.k   ?? 0)
  const hr      = rawArgs.hr  !== undefined ? Number(rawArgs.hr)  : Number(filePayload?.HR  ?? filePayload?.hr  ?? 0)
  const bf      = rawArgs.bf  !== undefined ? Number(rawArgs.bf)  : (filePayload?.BF !== undefined ? Number(filePayload.BF) : filePayload?.bf !== undefined ? Number(filePayload.bf) : null)
  const pitches = rawArgs.pitches !== undefined ? Number(rawArgs.pitches) : (filePayload?.pitches ?? null)
  const result  = rawArgs.result ?? filePayload?.result ?? null
  const notes   = rawArgs.notes  ?? filePayload?.notes  ?? ""

  if (ip_raw === undefined || ip_raw === null || isNaN(Number(ip_raw)) || Number(ip_raw) < 0) {
    fatal(`Missing or invalid --ip: "${ip_raw}". Pitcher mode requires innings pitched (e.g. --ip 6.0)`)
  }

  // Convert baseball IP notation to decimal innings (the critical step — see toDecimalInnings)
  const ipDecimal = toDecimalInnings(Number(ip_raw))

  console.log(`Input validated:`)
  console.log(`  IP     : ${ip_raw} (baseball notation) → ${ipDecimal.toFixed(6)} decimal innings`)
  console.log(`         : Convention: floor=${Math.floor(Number(ip_raw))}, frac-digit=${Math.round((Number(ip_raw) - Math.floor(Number(ip_raw))) * 10)} → ${formatIP(ipDecimal)}`)
  console.log(`  H      : ${h_all}  (hits allowed)`)
  console.log(`  R      : ${r_all}  (runs allowed)`)
  console.log(`  ER     : ${er}   (earned runs)`)
  console.log(`  BB     : ${bb}   (walks issued)`)
  console.log(`  K      : ${k}   (strikeouts)`)
  console.log(`  HR     : ${hr}   (HR allowed)`)
  console.log(`  BF     : ${bf !== null ? bf : "— (not provided)"}`)
  if (pitches !== null) console.log(`  Pitches: ${pitches}`)
  if (result)           console.log(`  Result : ${result}`)

  if (er > r_all) {
    warn(`ER (${er}) > R (${r_all}) — unusual (inherited runners). Proceeding.`)
  }

  const baselineERA  = config.baselineERA  ?? null
  const baselineWHIP = config.baselineWHIP ?? null
  console.log(`\nBaseline ERA  : ${baselineERA  !== null ? baselineERA.toFixed(2)  : "null (no prior baseline — delta will be 0)"}`)
  console.log(`Baseline WHIP : ${baselineWHIP !== null ? baselineWHIP.toFixed(3) : "null"}`)

  // ── Step 2: Load game log, idempotency, append ──────────────────────────
  section("Step 2 — Game Log + Idempotency + Append")
  const logPath   = join(ROOT, "games", `${playerId}-${year}.json`)
  const gameLog   = loadGameLog(playerId, year)
  const prevGames = gameLog.games
  console.log(`Log path    : games/${playerId}-${year}.json`)
  console.log(`Games loaded: ${prevGames.length}`)
  if (prevGames.length > 0) {
    const last = [...prevGames].sort((a, b) => a.date.localeCompare(b.date)).at(-1)
    console.log(`Last game   : ${last.date} (g=${last.g}) — IP:${last.ip}  ER:${last.er}  K:${last.k}`)
  }

  idempotencyCheck(prevGames, dateStr)
  console.log(`✓ No duplicate found for ${dateStr}`)

  const newGameObj = {
    date:    dateStr,
    opp,
    ip:      Number(ip_raw),   // baseball notation stored for readability
    ipDec:   ipDecimal,         // decimal stored for all rate computations
    h:       h_all,
    r:       r_all,
    er,
    bb,
    k,
    hr,
    bf:      bf !== null ? bf : null,
    pitches: pitches !== null ? pitches : null,
    result:  result ?? null,
    notes
  }

  const updatedGames = appendPitcherGame(prevGames, newGameObj)
  const newGame      = updatedGames.at(-1)
  console.log(`Game #${newGame.g} appended (${newGame.date}  ${newGame.opp}  IP:${ip_raw}  ER:${er}  K:${k})`)

  // ── Step 3: Season totals + rate stats ─────────────────────────────────
  section("Step 3 — Season Totals & Rate Statistics")
  const prevTotals = computePitcherSeasonTotals(prevGames)
  const totals     = computePitcherSeasonTotals(updatedGames)

  console.log(`Starts : ${prevTotals.gs} → ${totals.gs}`)
  console.log(`IP     : ${formatIP(prevTotals.ipDec)} → ${formatIP(totals.ipDec)}  (decimal: ${prevTotals.ipDec.toFixed(6)} → ${totals.ipDec.toFixed(6)})`)
  console.log(`H      : ${prevTotals.h}  → ${totals.h}`)
  console.log(`ER     : ${prevTotals.er} → ${totals.er}`)
  console.log(`BB     : ${prevTotals.bb} → ${totals.bb}`)
  console.log(`K      : ${prevTotals.k}  → ${totals.k}`)
  console.log(`HR     : ${prevTotals.hr} → ${totals.hr}`)
  console.log(`ERA    : ${fmtERA(prevTotals.era)} → ${fmtERA(totals.era)}`)
  console.log(`       : (${totals.er}×9)÷${totals.ipDec.toFixed(6)} = ${totals.era !== null ? totals.era.toFixed(6) : "—"}`)
  console.log(`WHIP   : ${fmt3(prevTotals.whip)} → ${fmt3(totals.whip)}`)
  console.log(`       : (${totals.bb}+${totals.h})÷${totals.ipDec.toFixed(6)} = ${totals.whip !== null ? totals.whip.toFixed(6) : "—"}`)
  console.log(`K/9    : ${fmt2(prevTotals.k9)} → ${fmt2(totals.k9)}`)
  console.log(`       : (${totals.k}×9)÷${totals.ipDec.toFixed(6)} = ${totals.k9 !== null ? totals.k9.toFixed(6) : "—"}`)
  console.log(`BB/9   : ${fmt2(prevTotals.bb9)} → ${fmt2(totals.bb9)}`)
  console.log(`       : (${totals.bb}×9)÷${totals.ipDec.toFixed(6)} = ${totals.bb9 !== null ? totals.bb9.toFixed(6) : "—"}`)
  if (totals.bf > 0) {
    console.log(`K-BB%  : ${fmtP(totals.kMinusBBPct)}  (${totals.k}-${totals.bb}÷${totals.bf} BF)`)
    console.log(`FIP    : ${totals.fip !== null ? totals.fip.toFixed(2) : "—"}  ((13×${totals.hr}+3×${totals.bb}-2×${totals.k})÷${totals.ipDec.toFixed(4)}+3.10)`)
  }

  // ── Step 4: Rolling windows (appearance-based) ──────────────────────────
  section("Step 4 — Rolling Windows (appearance-based: last N starts, not date-based)")

  const w7  = pitcherRollingWindow(updatedGames, 7)
  const w15 = pitcherRollingWindow(updatedGames, 15)
  const w30 = pitcherRollingWindow(updatedGames, 30)

  const fmtWin = (w, label) => {
    if (!w) return `${label}: null (no starts in window)`
    return `${label} (${w.starts} starts): IP:${formatIP(w.ipDec)}  ERA:${fmtERA(w.era)}  WHIP:${fmt3(w.whip)}  K/9:${fmt2(w.k9)}  BB/9:${fmt2(w.bb9)}`
  }
  console.log(fmtWin(w7,  "W7 "))
  console.log(fmtWin(w15, "W15"))
  console.log(fmtWin(w30, "W30"))

  // Fallback chain: W7 → W15 → W30 → season totals
  const activeWindow  = w7 ?? w15 ?? w30
  const fallbackLabel = w7 ? "W7" : w15 ? "W15" : w30 ? "W30" : "SEASON"
  const rollingERA    = activeWindow?.era  ?? totals.era
  const rollingWHIP   = activeWindow?.whip ?? totals.whip
  const rollingK9     = activeWindow?.k9   ?? totals.k9
  const rollingBB9    = activeWindow?.bb9  ?? totals.bb9
  console.log(`Active (${fallbackLabel}): ERA:${fmtERA(rollingERA)}  WHIP:${fmt3(rollingWHIP)}  K/9:${fmt2(rollingK9)}  BB/9:${fmt2(rollingBB9)}`)

  // ── Step 5: Update lastGame ────────────────────────────────────────────
  section("Step 5 — Last Game Record")
  console.log(`lastGame : ${newGame.date}  ${newGame.opp}`)
  console.log(`         : IP:${ip_raw}  H:${h_all}  R:${r_all}  ER:${er}  BB:${bb}  K:${k}  HR:${hr}${result ? `  (${result})` : ""}`)
  if (pitches !== null) console.log(`         : Pitches: ${pitches}`)

  // ── Step 6: Pitcher signals ────────────────────────────────────────────
  section("Step 6 — Pitcher Signals (CMD / K / DUR / VAL)")
  const sigs = computePitcherSignals(activeWindow, totals)
  const avgIPStart = totals.gs > 0 ? totals.ipDec / totals.gs : null
  console.log(`Source window : ${fallbackLabel}  (fallback chain: W7 → W15 → W30 → SEASON)`)
  console.log(`CMD : ${sigs.cmd}  (BB/9:${fmt2(rollingBB9)} — HOT<2.0, WARM<3.0, COOL<4.5, DARK≥4.5)`)
  console.log(`K   : ${sigs.k}   (K/9:${fmt2(rollingK9)}  — HOT≥14.0, WARM≥9.0, COOL≥5.0, DARK<5.0)`)
  console.log(`DUR : ${sigs.dur}  (IP/start:${fmt2(avgIPStart)} — HOT≥6.0, WARM≥5.0, COOL≥4.0, DARK<4.0)`)
  console.log(`VAL : ${sigs.val}  (composite: CMD rank ${BAND_RANK[sigs.cmd]} + K rank ${BAND_RANK[sigs.k]} → avg ${((BAND_RANK[sigs.cmd] + BAND_RANK[sigs.k]) / 2).toFixed(1)})`)
  console.log(`VEL : null  (velocity requires tracker.velocity block — not yet populated)`)

  // ── Step 7: ISO week ───────────────────────────────────────────────────
  section("Step 7 — ISO Week & Week Boundary")
  const snapshotWeek = isoWeekStr(dateStr)
  const weekBoundary = isWeekBoundary(prevGames, dateStr)
  console.log(`Week     : ${snapshotWeek}`)
  console.log(`Boundary : ${weekBoundary ? "YES (new ISO week)" : "NO (intraweek start)"}`)

  // ── Step 8: DLR delta ──────────────────────────────────────────────────
  section("Step 8 — DLR Delta (ERA-based, P58 fallback chain pattern)")
  const conf = confidenceTierIP(totals.ipDec)
  const { deltaShort, largeMovement, fallbackUsed } = calcPitcherDeltaShort(rollingERA, baselineERA, totals.ipDec)
  console.log(`Confidence tier : ${conf}  (${formatIP(totals.ipDec)} IP)`)
  console.log(`Rolling ERA     : ${fmtERA(rollingERA)}  (${fallbackLabel} window)`)
  console.log(`Baseline ERA    : ${baselineERA !== null ? baselineERA.toFixed(2) : "null"}`)
  if (fallbackUsed) {
    console.log(`deltaShort      : 0.00  [no baselineERA — first ingestion, delta neutral]`)
  } else {
    console.log(`perfDelta (ERA) : ${(baselineERA - rollingERA).toFixed(4)}  (positive = ERA improved vs baseline)`)
    console.log(`cappedDelta     : ${Math.max(-3.0, Math.min(3.0, baselineERA - rollingERA)).toFixed(4)}  (cap ±3.00 ERA)`)
    console.log(`deltaShort      : ${fmt2(deltaShort)}`)
  }
  console.log(`largeMovement   : ${largeMovement}  (threshold ±${LARGE_MOVEMENT_THRESHOLD})`)

  // ── Step 11: Weekly history + journal (Steps 9/10 = Supabase, shown below) ─
  section("Step 11 — Weekly History & Journal Entry")
  const prevWeeklyHistory = gameLog.weeklyHistory ?? []
  const newWeeklyHistory  = updateWeeklyHistory(prevGames, prevWeeklyHistory, deltaShort, dateStr)
  console.log(`Previous history : [${prevWeeklyHistory.map(v => fmt2(v)).join(", ")}]`)
  console.log(`Updated history  : [${newWeeklyHistory.map(v => fmt2(v)).join(", ")}]`)

  // Journal row (written to BOLEMON_2026_LIVE.md on first live write)
  const journalRow = `| ${newGame.g} | ${dateStr} | ${opp} | ${ip_raw} | ${h_all} | ${er} | ${bb} | ${k} | ${hr} | ${fmtERA(w7?.era)} | ${fmt3(w7?.whip)} | ${fmt2(w7?.k9)} | ${fmt2(deltaShort)} | ${conf} | — | CMD:${sigs.cmd} K:${sigs.k} DUR:${sigs.dur} VAL:${sigs.val} | ${fallbackLabel} |`
  console.log(`\nJournal (data/dlr/BOLEMON_2026_LIVE.md — created on first live write):`)
  console.log(`| # | Date | Opp | IP | H | ER | BB | K | HR | ERA-W7 | WHIP-W7 | K/9-W7 | deltaShort | conf | health | signals | fallback |`)
  console.log(journalRow)

  // ── Step 12: Delta monthly ─────────────────────────────────────────────
  section("Step 12 — Delta Monthly")
  const deltaMonthly = computeDeltaMonthly(newWeeklyHistory)
  console.log(`deltaMonthly : ${fmt2(deltaMonthly)}  (avg of ${newWeeklyHistory.length} weekly delta(s))`)

  // ── Step 13: Output summary / Write ───────────────────────────────────
  section("Step 13 — " + (dryRun ? "DRY-RUN OUTPUT (no writes)" : "LIVE WRITE"))

  const shouldWriteWeek = writeWeek || weekBoundary

  console.log(`\n╔══════════════════════════════════════════════════════════════`)
  console.log(`║  PITCHER ORGANISM STATE — ${dateStr} (start #${newGame.g})`)
  console.log(`╠══════════════════════════════════════════════════════════════`)
  console.log(`║  Season     : ${year}  |  Starts: ${totals.gs}  |  Week: ${snapshotWeek}`)
  console.log(`║  Box score  : IP:${ip_raw}  H:${h_all}  R:${r_all}  ER:${er}  BB:${bb}  K:${k}  HR:${hr}${result ? `  (${result})` : ""}`)
  console.log(`║  Season ERA : ${fmtERA(totals.era)}  WHIP:${fmt3(totals.whip)}  K/9:${fmt2(totals.k9)}  BB/9:${fmt2(totals.bb9)}`)
  console.log(`║  Rolling (${fallbackLabel}) : ERA:${fmtERA(rollingERA)}  WHIP:${fmt3(rollingWHIP)}  K/9:${fmt2(rollingK9)}  BB/9:${fmt2(rollingBB9)}`)
  console.log(`║  Signals    : CMD:${sigs.cmd}  K:${sigs.k}  DUR:${sigs.dur}  VAL:${sigs.val}  VEL:—`)
  console.log(`║  deltaShort : ${fmt2(deltaShort)}  ${largeMovement ? "⚠ LARGE_MOVEMENT" : ""}${fallbackUsed ? "  [no baseline — neutral]" : ""}`)
  console.log(`║  deltaMonthly: ${fmt2(deltaMonthly)}`)
  console.log(`║  weekHistory: [${newWeeklyHistory.map(v => fmt2(v)).join(", ")}]`)
  console.log(`║`)
  console.log(`║  IP CONVENTION VERIFICATION`)
  console.log(`║    Input ${ip_raw} (baseball) = ${ipDecimal.toFixed(6)} decimal innings`)
  console.log(`║    ERA  : (${er}×9)÷${ipDecimal.toFixed(6)} = ${totals.era !== null ? totals.era.toFixed(6) : "—"}  → ${fmtERA(totals.era)}`)
  console.log(`║    WHIP : (${bb}+${h_all})÷${ipDecimal.toFixed(6)} = ${totals.whip !== null ? totals.whip.toFixed(6) : "—"}  → ${fmt3(totals.whip)}`)
  console.log(`║    K/9  : (${k}×9)÷${ipDecimal.toFixed(6)} = ${totals.k9 !== null ? totals.k9.toFixed(6) : "—"}  → ${fmt2(totals.k9)}`)
  console.log(`║    BB/9 : (${bb}×9)÷${ipDecimal.toFixed(6)} = ${totals.bb9 !== null ? totals.bb9.toFixed(6) : "—"}  → ${fmt2(totals.bb9)}`)
  console.log(`╚══════════════════════════════════════════════════════════════`)

  console.log(`\nWeek boundary detected : ${weekBoundary ? "YES" : "NO"}`)
  console.log(`--write-week flag      : ${writeWeek ? "YES" : "NO"}`)
  console.log(`Supabase snapshot write: ${shouldWriteWeek ? "YES" : "NO (intraweek start)"}`)

  if (dryRun) {
    console.log(`\n✓ DRY-RUN COMPLETE — no files written, no Supabase writes.`)
    console.log(`  Would write : games/${playerId}-${year}.json  (start #${newGame.g} appended)`)
    console.log(`  Would create: data/dlr/BOLEMON_2026_LIVE.md  (first live write)`)
    return
  }

  // ── LIVE WRITE (Steps 9 + 10 + game log) ────────────────────────────────

  const updatedLog = {
    ...gameLog,
    weeklyHistory: newWeeklyHistory,
    games: updatedGames
  }
  writeFileSync(logPath, JSON.stringify(updatedLog, null, 2) + "\n")
  console.log(`✓ Game log written      : games/${playerId}-${year}.json`)

  if (shouldWriteWeek) {
    if (!SUPABASE_CONFIGURED) {
      warn("Supabase not configured — skipping weekly snapshot upsert.")
      warn("Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local")
    } else {
      const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
      const baseDLR  = await fetchCurrentBaseDLR(supabase, playerId)
      const dlrScore = Number((baseDLR + Math.max(-1.5, Math.min(1.5, deltaMonthly))).toFixed(1))

      const payload = {
        player_id:              playerId,
        snapshot_week:          snapshotWeek,
        engine_version:         ENGINE_VERSION,
        dlr_score:              dlrScore,
        dlr_tier:               null,
        confidence_level:       conf,
        confidence_overall:     conf,
        confidence_knowledge:   null,
        confidence_performance: conf,
        confidence_media:       null,
        confidence_market:      null,
        health_class:           w7 && w15 ? "FULLY_REACTIVE" : "PARTIALLY_REACTIVE",
        fallback_used:          fallbackUsed,
        base_dlr:               baseDLR,
        weekly_delta:           deltaShort,
        monthly_contribution:   deltaMonthly,
        weekly_history:         newWeeklyHistory,
        large_movement:         largeMovement,
        competition_level:      config.competition_level ?? config.competitionLevel ?? null,
        source:                 "manual",
        season:                 year,
        updated_at:             new Date().toISOString()
      }

      await upsertWeeklySnapshot(supabase, payload)
      console.log(`✓ Supabase upsert       : player_dlr_weekly  ${snapshotWeek}  DLR=${dlrScore}  δ=${fmt2(deltaShort)}`)

      await updatePlayersDLRScore(supabase, playerId, dlrScore)
      console.log(`✓ Supabase cache update : players.dlr_score = ${dlrScore}`)
    }
  }

  console.log(`\n✓ INGEST COMPLETE — ${playerId}  start ${newGame.g}  ${dateStr}  (${snapshotWeek})`)
}

// =============================================================
// MAIN
// =============================================================

export async function runIngestGame(argv = process.argv.slice(2)) {
  // ── Common parse: extract player + date before loading config ───────────
  // (Kind detection requires config load; config load requires playerId)
  const rawArgs = parseCLI(argv)

  // Handle --file JSON input (supported for both hitters and pitchers)
  let filePayload = null
  if (rawArgs.file) {
    const filePath = join(ROOT, rawArgs.file)
    if (!existsSync(filePath)) fatal(`JSON input file not found: ${rawArgs.file}`)
    filePayload = JSON.parse(readFileSync(filePath, "utf8"))
  }

  // Extract common required fields
  const playerId = rawArgs.player ?? filePayload?.player ?? filePayload?.playerId ?? null
  const dateStr  = rawArgs.date   ?? filePayload?.date   ?? null

  if (!playerId) fatal("Missing required field: --player")
  if (!dateStr)  fatal("Missing required field: --date")
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    fatal(`Invalid date format: "${dateStr}". Expected YYYY-MM-DD.`)
  }

  const dryRun    = rawArgs.dryRun    ?? filePayload?.dryRun    ?? false
  const writeWeek = rawArgs.writeWeek ?? filePayload?.writeWeek ?? false
  const year      = rawArgs.year ? Number(rawArgs.year) : Number(dateStr.slice(0, 4))

  banner(`INGEST-GAME — Pass 62/66 — Engine ${ENGINE_VERSION}`)
  console.log(`Player : ${playerId}`)
  console.log(`Date   : ${dateStr}  (${isoWeekStr(dateStr)})`)

  // ── Step 2: Load player config — kind detection ────────────────────────
  section("Step 2 — Player Config")
  const config = loadConfig(playerId)
  const kind   = config.kind ?? "hitter"  // backward compat: configs without kind field default to hitter
  console.log(`Kind         : ${kind}`)

  // ── Cross-validate: args must match player kind ────────────────────────
  const hasHitterArgs  = rawArgs.ab !== undefined || filePayload?.ab !== undefined
  const hasPitcherArgs = rawArgs.ip !== undefined || filePayload?.IP !== undefined || filePayload?.ip !== undefined

  if (kind === "pitcher" && hasHitterArgs && !hasPitcherArgs) {
    fatal(
      `KIND MISMATCH: --ab is a hitter argument but player "${playerId}" has kind: "pitcher".\n` +
      `Use pitcher arguments instead: --ip --h --er --bb --k [--r] [--hr] [--bf] [--result]`
    )
  }
  if (kind === "hitter" && hasPitcherArgs && !hasHitterArgs) {
    fatal(
      `KIND MISMATCH: --ip is a pitcher argument but player "${playerId}" has kind: "hitter".\n` +
      `Use hitter arguments instead: --ab --h [--hr] [--rbi] [--bb] [--so] [--sb]`
    )
  }

  // ── Route: pitcher cascade (Pass 66) ──────────────────────────────────
  if (kind === "pitcher") {
    await ingestPitcherGame(rawArgs, filePayload, config, playerId, year, dateStr, dryRun, writeWeek)
    return
  }

  // =================================================================
  // HITTER PATH — byte-identical to Pass 62
  // The block below is the original main() body for hitters.
  // Changes from Pass 62: (1) input is now built here rather than from
  // parseInput(), because parseInput() must be called after kind detection
  // to avoid ab/h validation triggering on pitcher players.
  // Behavior is identical for any valid hitter invocation.
  // =================================================================

  // Build hitter input struct (mirrors old parseInput output exactly)
  let input
  if (filePayload) {
    // --file path: payload spreads directly, same as old parseInput file path
    input = { ...filePayload, dryRun, writeWeek }
  } else {
    // CLI path: validate hitter-specific required fields
    if (rawArgs.ab === undefined) fatal("Missing required field: --ab (hitter mode)")
    if (rawArgs.h  === undefined) fatal("Missing required field: --h (hitter mode)")

    input = {
      player:    playerId,
      date:      dateStr,
      opp:       rawArgs.opp ?? "",
      ab:        Number(rawArgs.ab),
      r:         Number(rawArgs.r  ?? 0),
      h:         Number(rawArgs.h),
      d:         Number(rawArgs["2b"] ?? 0),
      t:         Number(rawArgs["3b"] ?? 0),
      hr:        Number(rawArgs.hr  ?? 0),
      rbi:       Number(rawArgs.rbi ?? 0),
      bb:        Number(rawArgs.bb  ?? 0),
      so:        Number(rawArgs.so  ?? 0),
      sb:        Number(rawArgs.sb  ?? 0),
      cs:        Number(rawArgs.cs  ?? 0),
      tb:        rawArgs.tb !== undefined ? Number(rawArgs.tb) : null,
      year:      rawArgs.year ? Number(rawArgs.year) : null,
      dryRun,
      writeWeek
    }
  }

  // ── Step 1: Validate hitter input ───────────────────────────────────────
  if (isNaN(input.ab) || input.ab < 0) fatal(`Invalid --ab: ${input.ab}`)
  if (isNaN(input.h)  || input.h < 0)  fatal(`Invalid --h: ${input.h}`)
  if (input.h > input.ab)              fatal(`H (${input.h}) cannot exceed AB (${input.ab})`)

  console.log(`Opponent: ${input.opp}`)
  console.log(`Dry-run: ${input.dryRun ? "YES — no writes" : "NO — live write"}`)

  const baselineAVG = config.baseline?.AVG
  if (!baselineAVG) fatal(`Player config missing baseline.AVG for ${playerId}`)
  console.log(`Baseline AVG : ${fmt3(baselineAVG)}  (${config.baseline.year} ${config.baseline.source})`)

  // ── Step 3: Load game log ───────────────────────────────────────────────
  section("Step 3 — Game Log")
  const logPath  = join(ROOT, "games", `${playerId}-${year}.json`)
  const gameLog  = loadGameLog(playerId, year)
  const prevGames = gameLog.games
  console.log(`Log path     : games/${playerId}-${year}.json`)
  console.log(`Games loaded : ${prevGames.length}`)
  if (prevGames.length > 0) {
    const last = [...prevGames].sort((a, b) => a.date.localeCompare(b.date)).at(-1)
    console.log(`Last game    : ${last.date} (g=${last.g}) — ${fmt3(last.h / last.ab)} ${last.ab}AB ${last.h}H`)
  }

  // ── Step 4: Idempotency check ───────────────────────────────────────────
  section("Step 4 — Idempotency Check")
  idempotencyCheck(prevGames, input.date)
  console.log(`✓ No duplicate found for ${input.date}`)

  // ── Step 5: Compute TB ─────────────────────────────────────────────────
  section("Step 5 — Compute TB")
  const game = {
    date: input.date,
    opp:  input.opp,
    ab:   input.ab,
    r:    input.r,
    h:    input.h,
    d:    input.d,
    t:    input.t,
    hr:   input.hr,
    rbi:  input.rbi,
    bb:   input.bb,
    so:   input.so,
    sb:   input.sb,
    cs:   input.cs,
    tb:   input.tb !== null ? input.tb : computeTB(input)
  }
  console.log(`TB : ${game.tb}  (${game.h}H − ${game.d}2B − ${game.t}3B − ${game.hr}HR = ${game.h - game.d - game.t - game.hr} 1B  → ${game.h - game.d - game.t - game.hr} + ${game.d * 2} + ${game.t * 3} + ${game.hr * 4})`)

  // ── Step 6: Append game ─────────────────────────────────────────────────
  section("Step 6 — Append Game")
  const updatedGames = appendGame(prevGames, game)
  const newGame = updatedGames.at(-1)
  console.log(`Game #${newGame.g} appended  (${newGame.date}  ${newGame.opp}  ${newGame.ab}AB ${newGame.h}H)`)

  // ── Step 7: Season totals ───────────────────────────────────────────────
  section("Step 7 — Cumulative Season Totals")
  const prevTotals = computeSeasonTotals(prevGames)
  const totals     = computeSeasonTotals(updatedGames)
  console.log(`Games : ${prevTotals.g} → ${totals.g}`)
  console.log(`AB    : ${prevTotals.ab} → ${totals.ab}  (+${game.ab})`)
  console.log(`H     : ${prevTotals.h}  → ${totals.h}   (+${game.h})`)
  console.log(`AVG   : ${fmt3(prevTotals.avg)} → ${fmt3(totals.avg)}`)
  console.log(`OBP   : ${fmt3(prevTotals.obp)} → ${fmt3(totals.obp)}`)
  console.log(`SLG   : ${fmt3(prevTotals.slg)} → ${fmt3(totals.slg)}`)
  console.log(`OPS   : ${fmt3(prevTotals.ops)} → ${fmt3(totals.ops)}`)
  console.log(`HR    : ${prevTotals.hr} → ${totals.hr}`)
  console.log(`RBI   : ${prevTotals.rbi} → ${totals.rbi}`)
  console.log(`BB    : ${prevTotals.bb} → ${totals.bb}`)
  console.log(`SO    : ${prevTotals.so} → ${totals.so}`)
  console.log(`SB    : ${prevTotals.sb} → ${totals.sb}`)

  // ── Step 8: Rolling windows ─────────────────────────────────────────────
  section("Step 8 — Rolling Windows")
  const d7  = rollingWindow(updatedGames, game.date, 7)
  const d15 = rollingWindow(updatedGames, game.date, 15)
  const d30 = rollingWindow(updatedGames, game.date, 30)
  console.log(`7D  : ${d7  ? `${fmt3(d7.avg)}  AVG  ${fmt3(d7.ops)}  OPS  (${d7.ab} AB, ${d7.games} games)` : "null (no data)"}`)
  console.log(`15D : ${d15 ? `${fmt3(d15.avg)} AVG  ${fmt3(d15.ops)} OPS  (${d15.ab} AB, ${d15.games} games)` : "null"}`)
  console.log(`30D : ${d30 ? `${fmt3(d30.avg)} AVG  ${fmt3(d30.ops)} OPS  (${d30.ab} AB, ${d30.games} games)` : "null"}`)

  const blended  = blendAVG(d7, d15, d30)
  const weeklyAV = weeklyDeltaAVG(d7, d15, d30)
  console.log(`Blended AVG (20/30/50) : ${fmt3(blended)}`)
  console.log(`Weekly delta source    : ${fmt3(weeklyAV)}  (P58 fallback chain: 7D → 15D → 30D)`)

  // ── Step 9: Organism signals ────────────────────────────────────────────
  section("Step 9 — Organism Signals")
  const sigs = computeSignals(d7, d15, d30, blended, totals.ab, totals.bb, totals.sb)
  console.log(`BAT : ${sigs.bat}  (blended AVG ${fmt3(blended)} vs baseline ${fmt3(baselineAVG)})`)
  console.log(`VAL : ${sigs.val}  (BB rate ${fmtP(totals.bb / (totals.ab + totals.bb))})`)
  console.log(`RUN : ${sigs.run}  (cumulative SB ${totals.sb})`)

  // ── Step 10: DLR delta ──────────────────────────────────────────────────
  section("Step 10 — DLR Delta  (P58 fallback chain)")
  const conf = confidenceTier(totals.ab)
  const { deltaShort, largeMovement } = calcDeltaShort(weeklyAV, baselineAVG, totals.ab)
  console.log(`Confidence tier  : ${conf}  (${totals.ab} AB)`)
  console.log(`perfDelta        : ${fmt3(weeklyAV !== null ? weeklyAV - baselineAVG : null)}`)
  console.log(`cappedPerfDelta  : ${fmt3(weeklyAV !== null ? Math.max(-0.04, Math.min(0.04, weeklyAV - baselineAVG)) : null)}`)
  console.log(`deltaShort       : ${fmt2(deltaShort)}`)
  console.log(`largeMovement    : ${largeMovement}  (threshold ±${LARGE_MOVEMENT_THRESHOLD})`)

  // ── Step 11: Weekly history ─────────────────────────────────────────────
  section("Step 11 — Weekly History")
  const prevWeeklyHistory = gameLog.weeklyHistory ?? []
  const currentWeek = isoWeekStr(game.date)
  const newWeeklyHistory = updateWeeklyHistory(prevGames, prevWeeklyHistory, deltaShort, game.date)
  console.log(`Week             : ${currentWeek}`)
  console.log(`Previous history : [${prevWeeklyHistory.map(v => fmt2(v)).join(", ")}]`)
  console.log(`Updated history  : [${newWeeklyHistory.map(v => fmt2(v)).join(", ")}]`)

  // ── Step 12: Delta monthly ──────────────────────────────────────────────
  section("Step 12 — Delta Monthly")
  const deltaMonthly = computeDeltaMonthly(newWeeklyHistory)
  console.log(`deltaMonthly : ${fmt2(deltaMonthly)}  (avg of ${newWeeklyHistory.length} weekly deltas)`)

  // ── Step 13: Output / Write ─────────────────────────────────────────────
  section("Step 13 — " + (input.dryRun ? "DRY-RUN OUTPUT (no writes)" : "LIVE WRITE"))

  const snapshotWeek = isoWeekStr(game.date)
  const weekBoundary = isWeekBoundary(prevGames, game.date)

  console.log(`\n╔══════════════════════════════════════════════════════`)
  console.log(`║  ORGANISM STATE — ${game.date} (g=${newGame.g})`)
  console.log(`╠══════════════════════════════════════════════════════`)
  console.log(`║  Season      : ${year}  |  Games: ${totals.g}  |  Week: ${snapshotWeek}`)
  console.log(`║  Stats       : ${totals.ab} AB  ${totals.h} H  AVG ${fmt3(totals.avg)}  OPS ${fmt3(totals.ops)}`)
  console.log(`║  Rolling 7D  : ${d7  ? `${d7.ab} AB  AVG ${fmt3(d7.avg)}` : "—"}`)
  console.log(`║  Rolling 15D : ${d15 ? `${d15.ab} AB  AVG ${fmt3(d15.avg)}` : "—"}`)
  console.log(`║  Rolling 30D : ${d30 ? `${d30.ab} AB  AVG ${fmt3(d30.avg)}` : "—"}`)
  console.log(`║  Signals     : BAT=${sigs.bat}  VAL=${sigs.val}  RUN=${sigs.run}`)
  console.log(`║  deltaShort  : ${fmt2(deltaShort)}  ${largeMovement ? "⚠ LARGE_MOVEMENT" : ""}`)
  console.log(`║  deltaMonthly: ${fmt2(deltaMonthly)}`)
  console.log(`║  weekHistory : [${newWeeklyHistory.map(v => fmt2(v)).join(", ")}]`)
  console.log(`╚══════════════════════════════════════════════════════`)

  const shouldWriteWeek = input.writeWeek || weekBoundary
  console.log(`\nWeek boundary detected : ${weekBoundary ? "YES" : "NO"}`)
  console.log(`--write-week flag      : ${input.writeWeek ? "YES" : "NO"}`)
  console.log(`Supabase snapshot write: ${shouldWriteWeek ? "YES" : "NO (intra-week game)"}`)

  if (input.dryRun) {
    console.log(`\n✓ DRY-RUN COMPLETE — no files written, no Supabase writes.`)
    return
  }

  // ── LIVE WRITE ──────────────────────────────────────────────────────────

  // Write 1: Update game log JSON
  const updatedLog = {
    ...gameLog,
    weeklyHistory: newWeeklyHistory,
    games: updatedGames
  }
  writeFileSync(logPath, JSON.stringify(updatedLog, null, 2) + "\n")
  console.log(`✓ Game log written      : games/${playerId}-${year}.json`)

  // Write 2: Supabase weekly snapshot (only on week boundary or --write-week)
  if (shouldWriteWeek) {
    if (!SUPABASE_CONFIGURED) {
      warn("Supabase not configured — skipping weekly snapshot upsert.")
      warn("Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local")
    } else {
      const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
      const baseDLR  = await fetchCurrentBaseDLR(supabase, playerId)
      const dlrScore = Number((baseDLR + Math.max(-1.5, Math.min(1.5, deltaMonthly))).toFixed(1))

      const payload = {
        player_id:              playerId,
        snapshot_week:          snapshotWeek,
        engine_version:         ENGINE_VERSION,
        dlr_score:              dlrScore,
        dlr_tier:               null,
        confidence_level:       conf,
        confidence_overall:     conf,
        confidence_knowledge:   null,
        confidence_performance: conf,
        confidence_media:       null,
        confidence_market:      null,
        health_class:           d7 && d15 && d30 ? "FULLY_REACTIVE" : "PARTIALLY_REACTIVE",
        fallback_used:          false,
        base_dlr:               baseDLR,
        weekly_delta:           deltaShort,
        monthly_contribution:   deltaMonthly,
        weekly_history:         newWeeklyHistory,
        large_movement:         largeMovement,
        competition_level:      config.competition_level ?? null,
        source:                 "manual",
        season:                 year,
        updated_at:             new Date().toISOString()
      }

      await upsertWeeklySnapshot(supabase, payload)
      console.log(`✓ Supabase upsert       : player_dlr_weekly  ${snapshotWeek}  DLR=${dlrScore}  δ=${fmt2(deltaShort)}`)

      await updatePlayersDLRScore(supabase, playerId, dlrScore)
      console.log(`✓ Supabase cache update : players.dlr_score = ${dlrScore}`)
    }
  }

  console.log(`\n✓ INGEST COMPLETE — ${playerId}  game ${newGame.g}  ${game.date}  (${snapshotWeek})`)
}

// =============================================================
// DISPLAY HELPERS
// =============================================================

function banner(title) {
  const line = "═".repeat(title.length + 4)
  console.log(`\n╔${line}╗`)
  console.log(`║  ${title}  ║`)
  console.log(`╚${line}╝\n`)
}

function section(title) {
  console.log(`\n── ${title} ${"─".repeat(Math.max(0, 56 - title.length))}`)
}

// =============================================================
// ENTRY POINT
// =============================================================

if (process.argv[1]?.endsWith("ingest-game.mjs")) {
  runIngestGame().catch(err => {
    console.error("\n[FATAL]", err.message ?? err)
    process.exit(1)
  })
}
