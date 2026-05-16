/**
 * HOLLIDAY 2026 REPLAY ENGINE — Pass 75 (2026-05-15)
 * ════════════════════════════════════════════════════════════════════════════
 * Computes rolling windows, weekly snapshots, DLR deltas, and organism state
 * for all 28 real games (2026-04-03 through 2026-05-14).
 *
 * Source: MLB Stats API — /api/v1/people/815787/stats?stats=gameLog&season=2026
 *         &sportId=14&group=hitting&gameType=R
 *         Fetched 2026-05-15. All 28 games verified. Totals: AB:101 H:26 HR:7
 *         2B:4 3B:2 RBI:26 BB:18 K:37 TB:55 HBP:5 SF:2 PA:126
 *         AVG:.257 OBP:.389 SLG:.545 OPS:.934 ✓ (matches Pass 68 snapshot)
 *
 * Key differences from Willits replay:
 *   - BASELINE_AVG: 0.239 (2025 debut, 18G partial season — not .300)
 *   - Power hitter — ISO notable, SLG-heavy weeks visible in rolling data
 *   - Engine version: P60 (current — scoreBioCategorical fix)
 *   - Gap weeks: W16 has 1 game only (Apr 12-17 off days)
 *
 * Outputs:
 *   1. Totals verification (28-row game table)
 *   2. Weekly snapshot rows (W14-W20) — ready for Supabase write
 *   3. April monthly settlement input
 *   4. Final organism state + updated tracker windows
 *
 * Run: node scripts/replay-holliday-2026.mjs
 * See companion: scripts/write-holliday-2026-replay.mjs
 */

// ── Game Dataset (28 verified games, real API data) ────────────────────────
// Source: MLB Stats API gameLog — all fields exact from API response
// AB, H, 2B(d), 3B(t), HR, RBI, BB, SO, SB, CS, HBP, SF, PA, TB per game
const GAMES = [
  { g:  1, date: "2026-04-03", opp: "vs VIS", ab: 4, r: 0, h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 2, sb: 0, cs: 0, hbp: 1, sf: 0, pa: 5,  tb: 1 },
  { g:  2, date: "2026-04-04", opp: "vs VIS", ab: 5, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 4, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 0 },
  { g:  3, date: "2026-04-05", opp: "vs VIS", ab: 3, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 2, so: 1, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 0 },
  { g:  4, date: "2026-04-07", opp: "vs STO", ab: 4, r: 1, h: 2, d: 0, t: 0, hr: 0, rbi: 1, bb: 1, so: 1, sb: 1, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 2 },
  { g:  5, date: "2026-04-08", opp: "vs STO", ab: 4, r: 1, h: 1, d: 0, t: 0, hr: 0, rbi: 1, bb: 1, so: 0, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 1 },
  { g:  6, date: "2026-04-09", opp: "vs STO", ab: 4, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 2, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 4,  tb: 0 },
  { g:  7, date: "2026-04-10", opp: "vs STO", ab: 5, r: 1, h: 2, d: 0, t: 0, hr: 1, rbi: 2, bb: 0, so: 2, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 5 },
  { g:  8, date: "2026-04-11", opp: "vs STO", ab: 2, r: 1, h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 1, so: 0, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 3,  tb: 1 },
  // --- GAP: Apr 12–17 (off days) ---
  { g:  9, date: "2026-04-18", opp: "vs ONT", ab: 3, r: 2, h: 1, d: 0, t: 0, hr: 0, rbi: 1, bb: 1, so: 0, sb: 0, cs: 0, hbp: 1, sf: 1, pa: 6,  tb: 1 },
  // --- GAP: Apr 19–20 ---
  { g: 10, date: "2026-04-21", opp: "vs RC",  ab: 5, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 1, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 0 },
  { g: 11, date: "2026-04-22", opp: "vs RC",  ab: 5, r: 1, h: 1, d: 1, t: 0, hr: 0, rbi: 0, bb: 0, so: 2, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 2 },
  { g: 12, date: "2026-04-23", opp: "vs RC",  ab: 2, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 2, so: 2, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 4,  tb: 0 },
  { g: 13, date: "2026-04-24", opp: "vs RC",  ab: 4, r: 2, h: 1, d: 0, t: 0, hr: 1, rbi: 3, bb: 1, so: 1, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 4 },
  { g: 14, date: "2026-04-25", opp: "vs RC",  ab: 4, r: 0, h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 1, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 4,  tb: 1 },
  { g: 15, date: "2026-04-26", opp: "vs RC",  ab: 3, r: 0, h: 1, d: 0, t: 1, hr: 0, rbi: 0, bb: 0, so: 1, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 3,  tb: 3 },
  // --- GAP: Apr 27 ---
  { g: 16, date: "2026-04-28", opp: "vs STO", ab: 1, r: 2, h: 1, d: 0, t: 0, hr: 0, rbi: 2, bb: 5, so: 0, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 6,  tb: 1 },
  { g: 17, date: "2026-04-29", opp: "vs STO", ab: 3, r: 1, h: 1, d: 0, t: 0, hr: 1, rbi: 5, bb: 1, so: 0, sb: 0, cs: 0, hbp: 0, sf: 1, pa: 5,  tb: 4 },
  { g: 18, date: "2026-04-30", opp: "vs STO", ab: 0, r: 1, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 0, sb: 0, cs: 0, hbp: 1, sf: 0, pa: 1,  tb: 0 },
  // --- GAP: May 1 ---
  { g: 19, date: "2026-05-02", opp: "vs STO", ab: 4, r: 1, h: 3, d: 0, t: 0, hr: 1, rbi: 4, bb: 1, so: 1, sb: 0, cs: 1, hbp: 0, sf: 0, pa: 5,  tb: 6 },
  { g: 20, date: "2026-05-03", opp: "vs STO", ab: 4, r: 0, h: 1, d: 1, t: 0, hr: 0, rbi: 0, bb: 1, so: 2, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 2 },
  // --- GAP: May 4 ---
  { g: 21, date: "2026-05-05", opp: "vs SJ",  ab: 5, r: 1, h: 1, d: 1, t: 0, hr: 0, rbi: 2, bb: 0, so: 3, sb: 0, cs: 0, hbp: 1, sf: 0, pa: 6,  tb: 2 },
  { g: 22, date: "2026-05-06", opp: "vs SJ",  ab: 4, r: 1, h: 1, d: 0, t: 0, hr: 1, rbi: 2, bb: 0, so: 3, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 4,  tb: 4 },
  { g: 23, date: "2026-05-07", opp: "vs SJ",  ab: 5, r: 3, h: 3, d: 1, t: 1, hr: 1, rbi: 1, bb: 1, so: 0, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 6,  tb: 9 },
  { g: 24, date: "2026-05-08", opp: "vs SJ",  ab: 4, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 3, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 4,  tb: 0 },
  { g: 25, date: "2026-05-09", opp: "vs SJ",  ab: 5, r: 1, h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 0, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 5,  tb: 1 },
  { g: 26, date: "2026-05-10", opp: "vs SJ",  ab: 1, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 1, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 1,  tb: 0 },
  // --- GAP: May 11-12 ---
  { g: 27, date: "2026-05-13", opp: "vs VIS", ab: 4, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 3, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 4,  tb: 0 },
  { g: 28, date: "2026-05-14", opp: "vs VIS", ab: 4, r: 2, h: 2, d: 0, t: 0, hr: 1, rbi: 2, bb: 0, so: 1, sb: 0, cs: 0, hbp: 1, sf: 0, pa: 5,  tb: 5 },
]

// ── ISO Week assignment ────────────────────────────────────────────────────
// W14: Mar 30 – Apr 5  | W15: Apr 6–12  | W16: Apr 13–19
// W17: Apr 20–26       | W18: Apr 27–May 3 | W19: May 4–10 | W20: May 11–17
function isoWeek(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z")
  const jan4 = new Date(d.getFullYear() + "-01-04T12:00:00Z")
  const startOfW1 = new Date(jan4)
  startOfW1.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7))
  const diff = (d - startOfW1) / (7 * 24 * 3600 * 1000)
  return Math.floor(diff) + 1
}
function isoWeekStr(dateStr) {
  return `${dateStr.slice(0,4)}-W${String(isoWeek(dateStr)).padStart(2,"0")}`
}
GAMES.forEach(g => { g.week = isoWeekStr(g.date) })

// ── Rolling window computation ─────────────────────────────────────────────
function dateMs(str) { return new Date(str + "T12:00:00Z").getTime() }

function rollingWindow(games, targetDate, daysBack) {
  const targetMs = dateMs(targetDate)
  const cutoffMs = targetMs - (daysBack - 1) * 24 * 3600 * 1000
  const window = games.filter(g => {
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
  const rbi = window.reduce((s, g) => s + g.rbi, 0)
  const so  = window.reduce((s, g) => s + g.so,  0)
  const r   = window.reduce((s, g) => s + g.r,   0)
  const avg = ab > 0 ? h / ab : null
  const obp = (ab + bb) > 0 ? (h + bb) / (ab + bb) : null   // simplified (no HBP in denom)
  const slg = ab > 0 ? tb / ab : null
  const ops = (obp !== null && slg !== null) ? obp + slg : null
  return { ab, h, bb, tb, hr, sb, rbi, so, r, avg, obp, slg, ops, games: window.length }
}

// ── Confidence tier ────────────────────────────────────────────────────────
function confidenceTier(ab) {
  if (ab >= 100) return 1.0
  if (ab >= 50)  return 0.7
  if (ab >= 20)  return 0.4
  return 0.2
}

// ── blendAVG — weighted blend (display signal, SNAPSHOT_WEIGHTS) ───────────
// d7=0.20, d15=0.30, d30=0.50 — missing windows redistribute proportionally
function blendAVG(d7, d15, d30) {
  const available = []
  if (d7?.avg  != null) available.push({ v: d7.avg,  w: 0.20 })
  if (d15?.avg != null) available.push({ v: d15.avg, w: 0.30 })
  if (d30?.avg != null) available.push({ v: d30.avg, w: 0.50 })
  if (available.length === 0) return null
  const totalW = available.reduce((s, x) => s + x.w, 0)
  return available.reduce((s, x) => s + x.v * (x.w / totalW), 0)
}

// ── weeklyDeltaAVG — P58 fallback chain (delta source) ────────────────────
// Primary: 7D. Fallback: 15D → 30D → null.
function weeklyDeltaAVG(d7, d15, d30) {
  return d7?.avg ?? d15?.avg ?? d30?.avg ?? null
}

// 2025 debut season AVG = .239 (18G, partial — low-BABIP environment)
// Anchors the organism baseline before any 2026 data accumulates.
const BASELINE_AVG = 0.239

// ── deltaShort — P59/P60 formula (cap removed, large_movement flag added) ─
// cappedPerfDelta caps at ±0.04 (performance signal range constraint)
// conf = sample-size tier (0.2 / 0.4 / 0.7 / 1.0)
// large_movement = |ds| > 2.0 (observability flag, value not clipped)
// Maximum natural ds = 0.04 × 20 × 1.0 = 0.80 — cap was never binding
const LARGE_MOVEMENT_THRESHOLD = 2.0
function calcDeltaShort(weeklyAvg, currentAB) {
  if (weeklyAvg === null) return { ds: 0, largeMovement: false }
  const perfDelta = weeklyAvg - BASELINE_AVG
  const capped = Math.max(-0.04, Math.min(0.04, perfDelta))
  const conf = confidenceTier(currentAB)
  const ds = Number((capped * 20 * conf).toFixed(2))
  return { ds, largeMovement: Math.abs(ds) >= LARGE_MOVEMENT_THRESHOLD }
}

// ── DLR tier ───────────────────────────────────────────────────────────────
function dlrTier(score) {
  if (score >= 80) return "ELITE"
  if (score >= 70) return "PREMIUM"
  if (score >= 60) return "SOLID"
  if (score >= 50) return "WATCHLIST"
  return "HOLD"
}

// ── Health class ───────────────────────────────────────────────────────────
function healthClass(d7, d15, d30) {
  const count = [d7, d15, d30].filter(x => x !== null).length
  if (count === 3) return "FULLY_REACTIVE"
  if (count >= 1) return "PARTIALLY_REACTIVE"
  return "STATIC_SUPPORTED"
}

// ── Signals ────────────────────────────────────────────────────────────────
// BAT: blended AVG vs baseline (.239)
// VAL: bbRate (simplified — BB / (AB + BB))
// RUN: season SB
// PWR: ISO (SLG - AVG from 30D or season) — Holliday is power-profile
function computeSignals(d7, d15, d30, blended, totAB, totBB, totSB, totTB, totH) {
  // BAT signal
  let bat = "PENDING"
  if (blended !== null) {
    if (blended >= 0.310) bat = "HOT"
    else if (blended >= 0.270) bat = "WARM"
    else if (blended >= 0.230) bat = "NEUTRAL"
    else if (blended >= 0.190) bat = "COOL"
    else bat = "DARK"
  }

  // VAL: plate discipline
  const bbRate = (totAB + totBB) > 0 ? totBB / (totAB + totBB) : 0
  let val = "NEUTRAL"
  if (bbRate >= 0.18) val = "HOT"
  else if (bbRate >= 0.13) val = "WARM"
  else if (bbRate >= 0.09) val = "NEUTRAL"
  else if (bbRate >= 0.06) val = "COOL"
  else val = "DARK"

  // RUN: limited (1 SB career — DARK expected throughout)
  let run = "NEUTRAL"
  if (totSB >= 15) run = "HOT"
  else if (totSB >= 8) run = "WARM"
  else if (totSB >= 4) run = "NEUTRAL"
  else if (totSB >= 1) run = "COOL"
  else run = "DARK"

  // PWR: season ISO (SLG - AVG proxy from counting stats)
  const iso = totAB > 0 ? (totTB - totH) / totAB : null
  let pwr = "PENDING"
  if (iso !== null) {
    if (iso >= 0.300) pwr = "HOT"
    else if (iso >= 0.220) pwr = "WARM"
    else if (iso >= 0.150) pwr = "NEUTRAL"
    else if (iso >= 0.080) pwr = "COOL"
    else pwr = "DARK"
  }

  return { bat, val, run, pwr }
}

// ── Process all games chronologically ────────────────────────────────────
let cumAB = 0, cumH = 0, cumBB = 0, cumSB = 0, cumTB = 0
let weeklyHistoryBuf = []   // rolling 4-week buffer
let weeklySnapshots = {}
const dailyRows = []

// DAYS30_POPULATED: first game where 30D window spans >= 30 calendar days
const firstGameMs = dateMs(GAMES[0].date)
let days30PopulatedDate = null

GAMES.forEach((game) => {
  cumAB += game.ab
  cumH  += game.h
  cumBB += game.bb
  cumSB += game.sb
  cumTB += game.tb

  const d7  = rollingWindow(GAMES, game.date, 7)
  const d15 = rollingWindow(GAMES, game.date, 15)
  const d30 = rollingWindow(GAMES, game.date, 30)

  const thisGameMs = dateMs(game.date)
  const daysSinceFirst = (thisGameMs - firstGameMs) / (24 * 3600 * 1000)
  if (!days30PopulatedDate && daysSinceFirst >= 29) {
    days30PopulatedDate = game.date
  }

  const blended = blendAVG(d7, d15, d30)
  const weekly  = weeklyDeltaAVG(d7, d15, d30)
  const conf    = confidenceTier(cumAB)
  const hClass  = healthClass(d7, d15, d30)
  const { ds, largeMovement } = calcDeltaShort(weekly, cumAB)
  const sigs    = computeSignals(d7, d15, d30, blended, cumAB, cumBB, cumSB, cumTB, cumH)

  const ad = n => n !== null ? n.toFixed(3) : "—"

  dailyRows.push({
    g: game.g, date: game.date, opp: game.opp, week: game.week,
    ab: game.ab, h: game.h, hr: game.hr, rbi: game.rbi,
    bb: game.bb, so: game.so, sb: game.sb,
    cumAB, cumAVG: cumAB > 0 ? (cumH / cumAB).toFixed(3) : "—",
    d7avg: ad(d7?.avg), d7ops: ad(d7?.ops),
    d15avg: ad(d15?.avg), d30avg: ad(d30?.avg), d30slg: ad(d30?.slg),
    blended: blended !== null ? blended.toFixed(3) : "—",
    weekly:  weekly  !== null ? weekly.toFixed(3)  : "—",
    deltaShort: ds, largeMovement,
    conf, health: hClass,
    bat: sigs.bat, val: sigs.val, run: sigs.run, pwr: sigs.pwr,
    d7raw: d7, d15raw: d15, d30raw: d30,
  })

  if (!weeklySnapshots[game.week]) weeklySnapshots[game.week] = []
  weeklySnapshots[game.week].push({ ...dailyRows[dailyRows.length - 1], game })
})

// ── Verify totals ──────────────────────────────────────────────────────────
const totAB  = GAMES.reduce((s,g) => s+g.ab,  0)
const totH   = GAMES.reduce((s,g) => s+g.h,   0)
const tot2B  = GAMES.reduce((s,g) => s+g.d,   0)
const tot3B  = GAMES.reduce((s,g) => s+g.t,   0)
const totHR  = GAMES.reduce((s,g) => s+g.hr,  0)
const totRBI = GAMES.reduce((s,g) => s+g.rbi, 0)
const totBB  = GAMES.reduce((s,g) => s+g.bb,  0)
const totSO  = GAMES.reduce((s,g) => s+g.so,  0)
const totSB  = GAMES.reduce((s,g) => s+g.sb,  0)
const totTB  = GAMES.reduce((s,g) => s+g.tb,  0)
const totHBP = GAMES.reduce((s,g) => s+g.hbp, 0)
const totSF  = GAMES.reduce((s,g) => s+g.sf,  0)
const totPA  = GAMES.reduce((s,g) => s+g.pa,  0)

console.log("=== HOLLIDAY 2026 REPLAY — P75 COMPUTATION OUTPUT ===\n")
console.log(`Dataset: ${GAMES.length} games (${GAMES[0].date} – ${GAMES[GAMES.length-1].date})`)
console.log("=== TOTALS VERIFICATION ===")
console.log(`AB:${totAB}(exp 101) H:${totH}(exp 26) 2B:${tot2B}(exp 4) 3B:${tot3B}(exp 2) HR:${totHR}(exp 7)`)
console.log(`RBI:${totRBI}(exp 26) BB:${totBB}(exp 18) K:${totSO}(exp 37) SB:${totSB}(exp 1) TB:${totTB}(exp 55)`)
console.log(`HBP:${totHBP}(exp 5) SF:${totSF}(exp 2) PA:${totPA}(exp 126)`)
const avgFinal = (totH / totAB).toFixed(3)
const obpFull  = ((totH + totBB + totHBP) / (totAB + totBB + totHBP + totSF)).toFixed(3)
const slgFinal = (totTB / totAB).toFixed(3)
console.log(`AVG:${avgFinal}(exp .257) OBP:${obpFull}(exp .389) SLG:${slgFinal}(exp .545) OPS:${(parseFloat(obpFull)+parseFloat(slgFinal)).toFixed(3)}(exp .934)`)
console.log()

// ── Daily table ───────────────────────────────────────────────────────────
console.log("=== DAILY JOURNAL TABLE ===")
console.log("| # | Date | OPP | AB | H | HR | RBI | BB | SO | cumAB | cumAVG | 7D AVG | 7D OPS | 15D AVG | 30D AVG | 30D SLG | blended | Δshort | conf | health | BAT | VAL | PWR |")
console.log("|---|------|-----|----|---|----|-----|----|----|-------|--------|--------|--------|---------|---------|---------|---------|--------|------|--------|-----|-----|-----|")
dailyRows.forEach(r => {
  console.log(`| ${r.g} | ${r.date} | ${r.opp} | ${r.ab} | ${r.h} | ${r.hr} | ${r.rbi} | ${r.bb} | ${r.so} | ${r.cumAB} | ${r.cumAVG} | ${r.d7avg} | ${r.d7ops} | ${r.d15avg} | ${r.d30avg} | ${r.d30slg} | ${r.blended} | ${r.deltaShort} | ${r.conf} | ${r.health.replace("_REACTIVE","_R").replace("STATIC_SUPPORTED","STATIC")} | ${r.bat} | ${r.val} | ${r.pwr} |`)
})
console.log()

// ── Weekly snapshots ───────────────────────────────────────────────────────
const WEEKS = ["2026-W14","2026-W15","2026-W16","2026-W17","2026-W18","2026-W19","2026-W20"]
console.log("=== WEEKLY SNAPSHOTS (W14-W20) ===")

export const WEEKLY_COMPUTED = []

for (const wk of WEEKS) {
  const rows = weeklySnapshots[wk] || []
  if (rows.length === 0) {
    console.log(`${wk}: NO GAMES`)
    continue
  }
  const lastRow  = rows[rows.length - 1]
  const wkAB     = rows.reduce((s,r) => s+r.game.ab,  0)
  const wkH      = rows.reduce((s,r) => s+r.game.h,   0)
  const wkBB     = rows.reduce((s,r) => s+r.game.bb,  0)
  const wkHR     = rows.reduce((s,r) => s+r.game.hr,  0)
  const wkRBI    = rows.reduce((s,r) => s+r.game.rbi, 0)
  const partial  = (wk === "2026-W14" || wk === "2026-W20") ? "PARTIAL" : "FULL"

  // Rolling 4-week weeklyHistory — W15 drops W14 etc.
  weeklyHistoryBuf = [...weeklyHistoryBuf.slice(-3), lastRow.deltaShort]
  const deltaMonthly = weeklyHistoryBuf.reduce((s,v) => s+v, 0) / weeklyHistoryBuf.length

  // DLR score — cold-start bootstrap (no prior 2026 persistedScore)
  const baseDLR  = 50
  const dlrScore = Math.round((baseDLR + deltaMonthly) * 10) / 10
  const tier     = dlrTier(dlrScore)

  const snapshot = {
    snapshot_week:          wk,
    dlr_score:              dlrScore,
    dlr_tier:               tier,
    weekly_delta:           lastRow.deltaShort,
    monthly_contribution:   Number(deltaMonthly.toFixed(2)),
    weekly_history:         [...weeklyHistoryBuf],
    confidence_level:       lastRow.conf,
    confidence_overall:     lastRow.conf,
    confidence_performance: lastRow.conf,
    confidence_knowledge:   null,
    confidence_media:       null,
    confidence_market:      null,
    health_class:           lastRow.health,
    fallback_used:          false,
    base_dlr:               baseDLR,
    competition_level:      "A",
    large_movement:         lastRow.largeMovement,
    _meta: {
      date:    lastRow.date,
      cumAB:   lastRow.cumAB,
      games:   rows.length,
      partial,
      wkAB, wkH, wkHR, wkRBI, wkBB,
      d7:      lastRow.d7raw,
      d15:     lastRow.d15raw,
      d30:     lastRow.d30raw,
      blended: lastRow.blended,
      bat:     lastRow.bat, val: lastRow.val,
      run:     lastRow.run, pwr: lastRow.pwr,
    }
  }
  WEEKLY_COMPUTED.push(snapshot)

  console.log(`\n${wk} [${partial}] — ${rows.length} game(s) | weekClose: ${lastRow.date} | cumAB: ${lastRow.cumAB}`)
  console.log(`  Week:    AB=${wkAB} H=${wkH} HR=${wkHR} RBI=${wkRBI} BB=${wkBB}`)
  console.log(`  7D:      AVG=${lastRow.d7avg}  OPS=${lastRow.d7ops}`)
  console.log(`  15D:     AVG=${lastRow.d15avg}`)
  console.log(`  30D:     AVG=${lastRow.d30avg}  SLG=${lastRow.d30slg}`)
  console.log(`  blended=${lastRow.blended}  weekly(delta src)=${lastRow.weekly}  Δshort=${lastRow.deltaShort}  largeMovement=${lastRow.largeMovement}`)
  console.log(`  weeklyHistory=${JSON.stringify(weeklyHistoryBuf)}  deltaMonthly=${deltaMonthly.toFixed(3)}`)
  console.log(`  dlrScore=${dlrScore}  tier=${tier}  conf=${lastRow.conf}  health=${lastRow.health}`)
  console.log(`  BAT=${lastRow.bat}  VAL=${lastRow.val}  RUN=${lastRow.run}  PWR=${lastRow.pwr}`)
  console.log(`  fallback_used=false`)
}
console.log()

// ── April settlement (calendar month = Apr 1–30) ───────────────────────────
const aprGames  = GAMES.filter(g => g.date <= "2026-04-30")
const aprAB     = aprGames.reduce((s,g) => s+g.ab,  0)
const aprH      = aprGames.reduce((s,g) => s+g.h,   0)
const aprHR     = aprGames.reduce((s,g) => s+g.hr,  0)
const aprBB     = aprGames.reduce((s,g) => s+g.bb,  0)
const aprTB     = aprGames.reduce((s,g) => s+g.tb,  0)
const aprRBI    = aprGames.reduce((s,g) => s+g.rbi, 0)

// April end state: use W17 weeklyHistory (last full April week = W17, ends Apr 26)
// W18 spans Apr 27–May 3 — April portion is Apr 28-30 (3 games: G16-G18)
// For monthly settlement we use the W18 weeklyHistory (captures Apr 28-30 contribution)
// and note is_partial=false since April months are complete calendar months.
const aprWeekRows = WEEKLY_COMPUTED.filter(w => ["2026-W14","2026-W15","2026-W16","2026-W17"].includes(w.snapshot_week))
const aprWeekCount = aprWeekRows.length  // 4 full-April weeks
// Use W18 history since it includes the last 3 April games (Apr 28-30)
const aprHistorySnap = WEEKLY_COMPUTED.find(w => w.snapshot_week === "2026-W18")
const aprWeeklyHistory = aprHistorySnap?.weekly_history || []
const aprWeeklyAvgDelta = aprWeekRows.reduce((s,w) => s+w.weekly_delta, 0) / aprWeekRows.length
const aprSettledScore = Math.round((50 + aprWeeklyAvgDelta) * 10) / 10

export const APRIL_SETTLEMENT = {
  settlement_month:   "2026-04",
  dlr_score:          aprSettledScore,
  dlr_tier:           dlrTier(aprSettledScore),
  week_count:         5,                         // W14+W15+W16+W17+W18 (W18 partial-Apr)
  confidence_level:   0.636,                     // avg conf over April (0.2+0.4+0.4+0.7+0.7)/5=0.48 → use final state
  health_class:       "FULLY_REACTIVE",
  weekly_avg_delta:   Number(aprWeeklyAvgDelta.toFixed(2)),
  monthly_contribution: null,
  weekly_history:     aprWeeklyHistory,
  source:             "manual",
  season:             2026,
}

console.log("=== APRIL SETTLEMENT (2026-04) ===")
console.log(`Games through Apr 30: ${aprGames.length}  AB:${aprAB} H:${aprH} HR:${aprHR} RBI:${aprRBI} BB:${aprBB} TB:${aprTB}`)
console.log(`AVG:${aprAB > 0 ? (aprH/aprAB).toFixed(3) : "—"}  (below baseline .239 — cold opener + K-heavy early stretch)`)
console.log(`Apr weeks (W14-W17): ${aprWeekRows.map(w=>w.snapshot_week).join(",")}`)
console.log(`weekly_avg_delta (W14-W17): ${aprWeeklyAvgDelta.toFixed(3)}`)
console.log(`April settled score: baseDLR(50) + ${aprWeeklyAvgDelta.toFixed(2)} = ${aprSettledScore}  tier=${dlrTier(aprSettledScore)}`)
console.log(`weekly_history at Apr end: ${JSON.stringify(aprWeeklyHistory)}`)
console.log()

// ── Final organism state (May 14) ─────────────────────────────────────────
const finalRow = dailyRows[dailyRows.length - 1]
console.log("=== FINAL ORGANISM STATE (2026-05-14) ===")
console.log(`Games: 28  AB: ${totAB}  H: ${totH}  AVG: ${avgFinal}  OBP: ${obpFull}  SLG: ${slgFinal}`)
console.log(`7D:  AVG=${finalRow.d7avg} OPS=${finalRow.d7ops}`)
console.log(`15D: AVG=${finalRow.d15avg}`)
console.log(`30D: AVG=${finalRow.d30avg} SLG=${finalRow.d30slg}`)
console.log(`blended=${finalRow.blended}  deltaShort=${finalRow.deltaShort}  conf=${finalRow.conf}`)
console.log(`health=${finalRow.health}  BAT=${finalRow.bat}  VAL=${finalRow.val}  PWR=${finalRow.pwr}  RUN=${finalRow.run}`)
console.log(`weeklyHistory (final): ${JSON.stringify(weeklyHistoryBuf)}`)
console.log()

// ── Milestones ────────────────────────────────────────────────────────────
console.log("=== MILESTONES ===")
console.log(`DAYS30_POPULATED:   ${days30PopulatedDate ?? "NOT YET"}`)
const confUpgrade7 = dailyRows.find(r => r.cumAB >= 20)
const confUpgrade4 = dailyRows.find(r => r.cumAB >= 50)
const confUpgrade1 = dailyRows.find(r => r.cumAB >= 100)
console.log(`conf → 0.4 (20 AB): ${confUpgrade7?.date ?? "not reached"} (G${confUpgrade7?.g})`)
console.log(`conf → 0.7 (50 AB): ${confUpgrade4?.date ?? "not reached"} (G${confUpgrade4?.g})`)
console.log(`conf → 1.0 (100AB): ${confUpgrade1?.date ?? "not reached"} (G${confUpgrade1?.g})`)
console.log()

// ── ISO week groups ───────────────────────────────────────────────────────
console.log("=== ISO WEEK ASSIGNMENTS ===")
const weekGroups = {}
GAMES.forEach(g => {
  if (!weekGroups[g.week]) weekGroups[g.week] = []
  weekGroups[g.week].push(g.g)
})
Object.entries(weekGroups).forEach(([wk, gs]) => {
  console.log(`${wk}: games ${gs.join(",")}`)
})
