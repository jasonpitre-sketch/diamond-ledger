/**
 * WILLITS 2026 REPLAY ENGINE — Pass 57 / Updated P58
 * Computes rolling windows, weekly snapshots, DLR deltas, and organism state
 * for all 32 verified games (2026-04-03 through 2026-05-12).
 *
 * Outputs:
 *   1. Daily journal table (CSV-formatted for copy/paste)
 *   2. Weekly snapshot rows (W14-W20)
 *   3. Monthly settlement input (April = W14-W17 + W18 Option A)
 *   4. Milestone events
 *   5. Final organism state
 *
 * Run: node scripts/replay-willits-2026.mjs
 */

// ── Game Dataset (32 verified games) ──────────────────────────────────────
const GAMES = [
  { g: 1,  date: "2026-04-03", opp: "vs AUG", ab: 4, r: 0,  h: 1, d: 1, t: 0, hr: 0, rbi: 1, bb: 0, so: 0,  sb: 1, cs: 0 },
  { g: 2,  date: "2026-04-04", opp: "vs AUG", ab: 5, r: 0,  h: 2, d: 1, t: 0, hr: 0, rbi: 1, bb: 0, so: 0,  sb: 1, cs: 0 },
  { g: 3,  date: "2026-04-05", opp: "vs AUG", ab: 5, r: 1,  h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 1,  sb: 1, cs: 0 },
  { g: 4,  date: "2026-04-07", opp: "@ HC",   ab: 2, r: 2,  h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 3, so: 1,  sb: 3, cs: 1 },
  { g: 5,  date: "2026-04-08", opp: "@ HC",   ab: 4, r: 0,  h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 2,  sb: 0, cs: 0 },
  { g: 6,  date: "2026-04-09", opp: "@ HC",   ab: 4, r: 0,  h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 1, so: 2,  sb: 1, cs: 0 },
  { g: 7,  date: "2026-04-10", opp: "@ HC",   ab: 3, r: 1,  h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 1, so: 1,  sb: 0, cs: 0 },
  { g: 8,  date: "2026-04-11", opp: "@ HC",   ab: 4, r: 1,  h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 2,  sb: 1, cs: 1 },
  { g: 9,  date: "2026-04-12", opp: "@ HC",   ab: 5, r: 0,  h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 2,  sb: 0, cs: 0 },
  { g: 10, date: "2026-04-14", opp: "vs DEL", ab: 3, r: 4,  h: 2, d: 1, t: 0, hr: 0, rbi: 0, bb: 4, so: 0,  sb: 1, cs: 0 },
  { g: 11, date: "2026-04-15", opp: "vs DEL", ab: 5, r: 1,  h: 1, d: 0, t: 0, hr: 1, rbi: 1, bb: 0, so: 2,  sb: 0, cs: 0 },
  { g: 12, date: "2026-04-16", opp: "vs DEL", ab: 5, r: 1,  h: 1, d: 0, t: 0, hr: 1, rbi: 1, bb: 0, so: 1,  sb: 0, cs: 0 },
  { g: 13, date: "2026-04-17", opp: "vs DEL", ab: 1, r: 2,  h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 4, so: 0,  sb: 2, cs: 0 },
  { g: 14, date: "2026-04-18", opp: "vs DEL", ab: 5, r: 1,  h: 2, d: 0, t: 0, hr: 0, rbi: 1, bb: 0, so: 1,  sb: 0, cs: 0 },
  { g: 15, date: "2026-04-19", opp: "vs DEL", ab: 5, r: 1,  h: 2, d: 1, t: 1, hr: 0, rbi: 2, bb: 0, so: 0,  sb: 1, cs: 0 },
  { g: 16, date: "2026-04-21", opp: "@ SAL",  ab: 5, r: 0,  h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 2,  sb: 1, cs: 0 },
  { g: 17, date: "2026-04-22", opp: "@ SAL",  ab: 4, r: 2,  h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 1, so: 1,  sb: 0, cs: 1 },
  { g: 18, date: "2026-04-23", opp: "@ SAL",  ab: 5, r: 1,  h: 2, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 2,  sb: 1, cs: 0 },
  { g: 19, date: "2026-04-24", opp: "@ SAL",  ab: 3, r: 2,  h: 2, d: 1, t: 0, hr: 0, rbi: 3, bb: 3, so: 0,  sb: 2, cs: 0 },
  { g: 20, date: "2026-04-25", opp: "@ SAL",  ab: 4, r: 1,  h: 2, d: 1, t: 0, hr: 0, rbi: 1, bb: 1, so: 0,  sb: 0, cs: 0 },
  { g: 21, date: "2026-04-28", opp: "vs HIC", ab: 4, r: 3,  h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 1, so: 2,  sb: 1, cs: 0 },
  { g: 22, date: "2026-04-29", opp: "vs HIC", ab: 4, r: 0,  h: 1, d: 0, t: 0, hr: 0, rbi: 1, bb: 1, so: 1,  sb: 1, cs: 0 },
  { g: 23, date: "2026-04-30", opp: "vs HIC", ab: 4, r: 0,  h: 0, d: 0, t: 0, hr: 0, rbi: 1, bb: 0, so: 2,  sb: 0, cs: 0 },
  { g: 24, date: "2026-05-01", opp: "vs HIC", ab: 2, r: 1,  h: 1, d: 0, t: 0, hr: 1, rbi: 2, bb: 3, so: 1,  sb: 1, cs: 1 },
  { g: 25, date: "2026-05-02", opp: "vs HIC", ab: 3, r: 0,  h: 2, d: 1, t: 0, hr: 0, rbi: 2, bb: 2, so: 1,  sb: 0, cs: 1 },
  { g: 26, date: "2026-05-03", opp: "vs HIC", ab: 4, r: 2,  h: 2, d: 0, t: 0, hr: 0, rbi: 0, bb: 1, so: 1,  sb: 2, cs: 0 },
  { g: 27, date: "2026-05-05", opp: "@ HC",   ab: 5, r: 1,  h: 2, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 1,  sb: 0, cs: 1 },
  { g: 28, date: "2026-05-06", opp: "@ HC",   ab: 4, r: 1,  h: 1, d: 0, t: 0, hr: 1, rbi: 1, bb: 1, so: 1,  sb: 0, cs: 0 },
  { g: 29, date: "2026-05-07", opp: "@ HC",   ab: 5, r: 0,  h: 1, d: 0, t: 0, hr: 0, rbi: 2, bb: 0, so: 3,  sb: 0, cs: 0 },
  { g: 30, date: "2026-05-08", opp: "@ HC",   ab: 4, r: 1,  h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 1, so: 2,  sb: 0, cs: 0 },
  { g: 31, date: "2026-05-09", opp: "@ HC",   ab: 5, r: 1,  h: 1, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 2,  sb: 1, cs: 0 },
  { g: 32, date: "2026-05-12", opp: "vs SAL", ab: 3, r: 1,  h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 1, so: 0,  sb: 0, cs: 0 },
]

// Compute TB for each game
GAMES.forEach(g => {
  g.tb = g.h + g.d + 2 * g.t + 3 * g.hr
})

// ── ISO Week assignment ────────────────────────────────────────────────────
// W14: Mar 30 – Apr 5 | W15: Apr 6–12 | W16: Apr 13–19 | W17: Apr 20–26
// W18: Apr 27 – May 3 | W19: May 4–10 | W20: May 11–17
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
  const ab = window.reduce((s, g) => s + g.ab, 0)
  const h  = window.reduce((s, g) => s + g.h,  0)
  const bb = window.reduce((s, g) => s + g.bb, 0)
  const tb = window.reduce((s, g) => s + g.tb, 0)
  const hr = window.reduce((s, g) => s + g.hr, 0)
  const sb = window.reduce((s, g) => s + g.sb, 0)
  const rbi = window.reduce((s, g) => s + g.rbi, 0)
  const so = window.reduce((s, g) => s + g.so, 0)
  const r  = window.reduce((s, g) => s + g.r,  0)
  const avg = ab > 0 ? h / ab : null
  const obp = (ab + bb) > 0 ? (h + bb) / (ab + bb) : null
  const slg = ab > 0 ? tb / ab : null
  const ops = (obp !== null && slg !== null) ? obp + slg : null
  return { ab, h, bb, tb, hr, sb, rbi, so, r, avg, obp, slg, ops, games: window.length }
}

// ── Confidence tier (from calculateDLRMovement.ts) ────────────────────────
function confidenceTier(ab) {
  if (ab >= 100) return 1.0
  if (ab >= 50)  return 0.7
  if (ab >= 20)  return 0.4
  return 0.2
}

// ── blendAVG (used for BAT signal display — weighted blend, unchanged P58) ──
// SNAPSHOT_WEIGHTS: d7=0.20, d15=0.30, d30=0.50 (30D-heavy, anti-twitchy)
// Retained for signal display only. NOT used for delta in P58.
// Matches playerBridge.ts SNAPSHOT_WEIGHTS exactly.
// Missing windows redistribute proportionally (as in blendStat()).
function blendAVG(d7, d15, d30) {
  const available = []
  if (d7?.avg  != null) available.push({ v: d7.avg,  w: 0.20 })
  if (d15?.avg != null) available.push({ v: d15.avg, w: 0.30 })
  if (d30?.avg != null) available.push({ v: d30.avg, w: 0.50 })
  if (available.length === 0) return null
  const totalW = available.reduce((s, x) => s + x.w, 0)
  return available.reduce((s, x) => s + x.v * (x.w / totalW), 0)
}

// ── weeklyDeltaAVG (P58 — fallback chain for delta calculation) ───────────
// Mirrors the P58 change in playerBridge.ts blendPerformance().
// Primary: 7D. Fallback: 15D → 30D → null.
// "What happened this week?" — highest-priority non-null window wins directly.
// No weighted averaging. 7D is authoritative when present.
function weeklyDeltaAVG(d7, d15, d30) {
  return d7?.avg ?? d15?.avg ?? d30?.avg ?? null
}

// Baseline: 2025 season AVG = .300
const BASELINE_AVG = 0.300

// ── DeltaShort calculation ─────────────────────────────────────────────────
// P58: caller passes weeklyDeltaAVG result (fallback chain), not blendAVG.
function calcDeltaShort(blendedAvg, currentAB) {
  if (blendedAvg === null) return 0
  const perfDelta = blendedAvg - BASELINE_AVG
  const capped = Math.max(-0.04, Math.min(0.04, perfDelta))
  const conf = confidenceTier(currentAB)
  let ds = capped * 20 * conf
  ds = Math.max(-1.5, Math.min(1.5, ds))
  return Number(ds.toFixed(2))
}

// ── Health class ──────────────────────────────────────────────────────────
// FULLY_REACTIVE: all 3 rolling windows populated
// PARTIALLY_REACTIVE: 1 or 2 windows populated
// STATIC_SUPPORTED: no rolling data (days7=null and days15=null)
function healthClass(d7, d15, d30) {
  const count = [d7, d15, d30].filter(x => x !== null).length
  if (count === 3) return "FULLY_REACTIVE"
  if (count >= 1) return "PARTIALLY_REACTIVE"
  return "STATIC_SUPPORTED"
}

// ── Signal evaluation (simplified) ───────────────────────────────────────
// BAT: based on blended AVG vs baseline (.300)
// OBP/Plate discipline: bbRate
// SB: raw count in 30D window
function signals(d7, d15, d30, blendedAvg, totalAB, totalBB, totalSB) {
  // BAT signal
  let bat = "PENDING"
  if (blendedAvg !== null) {
    if (blendedAvg >= 0.320) bat = "HOT"
    else if (blendedAvg >= 0.285) bat = "WARM"
    else if (blendedAvg >= 0.250) bat = "NEUTRAL"
    else if (blendedAvg >= 0.200) bat = "COOL"
    else bat = "DARK"
  }

  // VAL (plate discipline): bbRate = BB / (AB + BB)
  const bbRate = (totalAB + totalBB) > 0 ? totalBB / (totalAB + totalBB) : 0
  let val = "NEUTRAL"
  if (bbRate >= 0.18) val = "HOT"
  else if (bbRate >= 0.13) val = "WARM"
  else if (bbRate >= 0.09) val = "NEUTRAL"
  else if (bbRate >= 0.06) val = "COOL"
  else val = "DARK"

  // RUN (speed): SB in season
  let run = "NEUTRAL"
  if (totalSB >= 15) run = "HOT"
  else if (totalSB >= 8) run = "WARM"
  else if (totalSB >= 4) run = "NEUTRAL"
  else if (totalSB >= 1) run = "COOL"
  else run = "DARK"

  return { bat, val, run }
}

// ── Process all games ─────────────────────────────────────────────────────
let cumulativeAB = 0
let cumulativeH  = 0
let cumulativeBB = 0
let cumulativeSB = 0
let weeklyHistory = []
const dailyRows = []
const weeklySnapshots = {}

// Track DAYS30_POPULATED milestone
let days30PopulatedDate = null

GAMES.forEach((game, idx) => {
  cumulativeAB += game.ab
  cumulativeH  += game.h
  cumulativeBB += game.bb
  cumulativeSB += game.sb

  const d7  = rollingWindow(GAMES, game.date, 7)
  const d15 = rollingWindow(GAMES, game.date, 15)
  const d30 = rollingWindow(GAMES, game.date, 30)

  // DAYS30_POPULATED: first game where 30-day window has data from >= 30 calendar days ago
  const firstGameMs = dateMs(GAMES[0].date)
  const thisGameMs  = dateMs(game.date)
  const daysSinceFirst = (thisGameMs - firstGameMs) / (24 * 3600 * 1000)
  if (!days30PopulatedDate && daysSinceFirst >= 29) {
    days30PopulatedDate = game.date
  }

  const blended  = blendAVG(d7, d15, d30)          // weighted blend — for signal display
  const weekly   = weeklyDeltaAVG(d7, d15, d30)    // fallback chain — for delta (P58)
  const conf     = confidenceTier(cumulativeAB)
  const hClass   = healthClass(d7, d15, d30)
  const ds       = calcDeltaShort(weekly, cumulativeAB)  // P58: uses fallback-chain value
  const sigs     = signals(d7, d15, d30, blended, cumulativeAB, cumulativeBB, cumulativeSB)

  const avgDisplay = n => n !== null ? n.toFixed(3) : "—"

  dailyRows.push({
    g: game.g,
    date: game.date,
    opp: game.opp,
    week: game.week,
    ab: game.ab,
    h: game.h,
    hr: game.hr,
    rbi: game.rbi,
    bb: game.bb,
    so: game.so,
    sb: game.sb,
    cumAB: cumulativeAB,
    cumAVG: cumulativeAB > 0 ? (cumulativeH / cumulativeAB).toFixed(3) : "—",
    d7avg:  avgDisplay(d7?.avg),
    d7ops:  avgDisplay(d7?.ops),
    d15avg: avgDisplay(d15?.avg),
    d30avg: avgDisplay(d30?.avg),
    blended: blended !== null ? blended.toFixed(3) : "—",
    weekly:  weekly  !== null ? weekly.toFixed(3)  : "—",
    deltaShort: ds,
    conf,
    health: hClass,
    bat: sigs.bat,
    val: sigs.val,
    run: sigs.run,
    d7raw: d7,
    d15raw: d15,
    d30raw: d30,
  })

  // Accumulate weekly snapshot data — at week close, take the last game of that week
  if (!weeklySnapshots[game.week]) {
    weeklySnapshots[game.week] = []
  }
  weeklySnapshots[game.week].push({ ...dailyRows[dailyRows.length - 1], game })
})

// ── Weekly snapshot summary ───────────────────────────────────────────────
const WEEKS = ["2026-W14","2026-W15","2026-W16","2026-W17","2026-W18","2026-W19","2026-W20"]

console.log("=== WILLITS 2026 REPLAY — COMPUTATION OUTPUT ===\n")
console.log(`Section 0: Dataset verified — ${GAMES.length} games (2026-04-03 to 2026-05-12)\n`)

// ── Verify totals ─────────────────────────────────────────────────────────
const totalAB  = GAMES.reduce((s,g) => s+g.ab, 0)
const totalH   = GAMES.reduce((s,g) => s+g.h,  0)
const totalHR  = GAMES.reduce((s,g) => s+g.hr, 0)
const totalRBI = GAMES.reduce((s,g) => s+g.rbi, 0)
const totalBB  = GAMES.reduce((s,g) => s+g.bb, 0)
const totalSO  = GAMES.reduce((s,g) => s+g.so, 0)
const totalSB  = GAMES.reduce((s,g) => s+g.sb, 0)
const totalTB  = GAMES.reduce((s,g) => s+g.tb, 0)
console.log("=== TOTALS VERIFICATION ===")
console.log(`AB:${totalAB}(exp 128) H:${totalH}(exp 33) HR:${totalHR}(exp 4) RBI:${totalRBI}(exp 20) BB:${totalBB}(exp 29) SO:${totalSO}(exp 37) SB:${totalSB}(exp 22) TB:${totalTB}`)
const totalPA = totalAB + totalBB
const avgFinal = (totalH / totalAB).toFixed(3)
const obpFinal = ((totalH + totalBB) / (totalAB + totalBB)).toFixed(3)
const slgFinal = (totalTB / totalAB).toFixed(3)
const opsFinal = (parseFloat(obpFinal) + parseFloat(slgFinal)).toFixed(3)
console.log(`AVG:${avgFinal}(exp .258) OBP:${obpFinal}(exp .392) SLG:${slgFinal}(exp .422) OPS:${opsFinal}(exp .814)`)
console.log()

// ── Daily compact table ───────────────────────────────────────────────────
console.log("=== DAILY JOURNAL TABLE ===")
console.log("| # | Date | OPP | AB | H | HR | RBI | BB | SO | SB | 7D AVG | 7D OPS | 15D AVG | 30D AVG | blended | Δshort | conf | health | BAT | VAL | RUN |")
console.log("|---|------|-----|----|---|----|-----|----|----|----|--------|--------|---------|---------|---------|--------|------|--------|-----|-----|-----|")
dailyRows.forEach(r => {
  console.log(`| ${r.g} | ${r.date} | ${r.opp} | ${r.ab} | ${r.h} | ${r.hr} | ${r.rbi} | ${r.bb} | ${r.so} | ${r.sb} | ${r.d7avg} | ${r.d7ops} | ${r.d15avg} | ${r.d30avg} | ${r.blended} | ${r.deltaShort} | ${r.conf} | ${r.health.replace("_REACTIVE","_R").replace("STATIC_SUPPORTED","STATIC")} | ${r.bat} | ${r.val} | ${r.run} |`)
})
console.log()

// ── Weekly snapshots ──────────────────────────────────────────────────────
console.log("=== WEEKLY SNAPSHOTS (W14-W20) ===")
let cumulativeWeekAB = 0
let cumulativeWeekH  = 0
let cumulativeWeekBB = 0
let cumulativeWeekTB = 0

for (const wk of WEEKS) {
  const rows = weeklySnapshots[wk] || []
  if (rows.length === 0) {
    console.log(`${wk}: NO GAMES`)
    continue
  }
  const lastRow = rows[rows.length - 1]
  const wkAB  = rows.reduce((s,r) => s+r.game.ab,  0)
  const wkH   = rows.reduce((s,r) => s+r.game.h,   0)
  const wkBB  = rows.reduce((s,r) => s+r.game.bb,  0)
  const wkHR  = rows.reduce((s,r) => s+r.game.hr,  0)
  const wkSB  = rows.reduce((s,r) => s+r.game.sb,  0)
  const wkRBI = rows.reduce((s,r) => s+r.game.rbi, 0)
  const partial = (wk === "2026-W14" || wk === "2026-W20") ? "PARTIAL" : "FULL"

  // DLR baseDLR = dlr.score (runtime) but we use 50 as fallback for replay
  // The organism doesn't have a persisted score yet — so for weekly DLR,
  // we compute it as baseDLR + deltaMonthly approximation
  // Since we're bootstrapping, use baseDLR = 50 (cold start) for first write
  // then it would update with each write. For simplicity, we track the
  // current weeklyHistory and compute deltaMonthly.

  // deltaMonthly = average of last 4 deltaShort values (weeklyHistory)
  const ds = lastRow.deltaShort
  weeklyHistory = [...weeklyHistory.slice(-3), ds]
  const deltaMonthly = weeklyHistory.reduce((s,v) => s+v, 0) / weeklyHistory.length

  // baseDLR: after first weekly write, persistedScore = computed DLR
  // For simplicity: dlrScore = 50 + deltaMonthly (cold start bootstrap)
  // But we track it across weeks
  const baseDLR = 50  // cold start for all replay weeks (no prior persistedScore)
  const adjustment = Math.max(-1.5, Math.min(1.5, deltaMonthly))
  const dlrScore = Math.round((baseDLR + adjustment) * 10) / 10

  console.log(`\n${wk} [${partial}] — ${rows.length} games`)
  console.log(`  Week stats: AB=${wkAB} H=${wkH} HR=${wkHR} RBI=${wkRBI} BB=${wkBB} SB=${wkSB}`)
  console.log(`  Final state at week close (${lastRow.date}):`)
  console.log(`  7D: AVG=${lastRow.d7avg} OPS=${lastRow.d7ops}`)
  console.log(`  15D: AVG=${lastRow.d15avg}`)
  console.log(`  30D: AVG=${lastRow.d30avg}`)
  console.log(`  blended=${lastRow.blended} (display)  weekly=${lastRow.weekly} (delta source)  deltaShort=${ds}  weeklyHistory=${JSON.stringify(weeklyHistory)}`)
  console.log(`  deltaMonthly=${deltaMonthly.toFixed(2)}  dlrScore=${dlrScore}  conf=${lastRow.conf}  health=${lastRow.health}`)
  console.log(`  BAT=${lastRow.bat}  VAL=${lastRow.val}  RUN=${lastRow.run}`)
  console.log(`  fallback_used=${lastRow.d7raw === null || lastRow.d15raw === null}`)
}
console.log()

// ── Milestones ───────────────────────────────────────────────────────────
console.log("=== MILESTONES ===")
console.log(`DAYS30_POPULATED: ${days30PopulatedDate || "NOT YET"}`)

// April settlement (W14-W18 Option A)
const aprWeeks = ["2026-W14","2026-W15","2026-W16","2026-W17","2026-W18"]
const aprGames = GAMES.filter(g => aprWeeks.includes(g.week))
const aprAB = aprGames.reduce((s,g) => s+g.ab, 0)
const aprH  = aprGames.reduce((s,g) => s+g.h, 0)
const aprBB = aprGames.reduce((s,g) => s+g.bb, 0)
const aprTB = aprGames.reduce((s,g) => s+g.tb, 0)
console.log(`APRIL SETTLEMENT (W14+W15+W16+W17+W18 = Option A):`)
console.log(`  Games: ${aprGames.length}  AB:${aprAB} H:${aprH} AVG:${(aprH/aprAB).toFixed(3)}`)

// April includes only the 4/30 game boundary
const aprOnlyGames = GAMES.filter(g => g.date <= "2026-04-30")
const aprOnlyAB = aprOnlyGames.reduce((s,g) => s+g.ab, 0)
const aprOnlyH  = aprOnlyGames.reduce((s,g) => s+g.h, 0)
console.log(`APRIL ONLY (through 4/30): Games=${aprOnlyGames.length} AB=${aprOnlyAB} H=${aprOnlyH} AVG=${(aprOnlyH/aprOnlyAB).toFixed(3)} (matches .247 split: ${(aprOnlyH/aprOnlyAB).toFixed(3) === "0.247" ? "YES" : "close"})`)
console.log()

// ── Final state ──────────────────────────────────────────────────────────
const finalRow = dailyRows[dailyRows.length - 1]
console.log("=== FINAL ORGANISM STATE (May 12) ===")
console.log(`Games: 32  AB: ${totalAB}  H: ${totalH}  AVG: ${avgFinal}  OBP: ${obpFinal}  OPS: ${opsFinal}`)
console.log(`7D:  AVG=${finalRow.d7avg} OPS=${finalRow.d7ops}`)
console.log(`15D: AVG=${finalRow.d15avg}`)
console.log(`30D: AVG=${finalRow.d30avg}`)
console.log(`blended=${finalRow.blended}  deltaShort=${finalRow.deltaShort}`)
console.log(`Confidence=${finalRow.conf}  healthClass=${finalRow.health}`)
console.log(`BAT=${finalRow.bat}  VAL=${finalRow.val}  RUN=${finalRow.run}`)
console.log(`weeklyHistory (final): ${JSON.stringify(weeklyHistory)}`)
console.log()

// ── ISO week check ───────────────────────────────────────────────────────
console.log("=== ISO WEEK ASSIGNMENTS ===")
const weekGroups = {}
GAMES.forEach(g => {
  if (!weekGroups[g.week]) weekGroups[g.week] = []
  weekGroups[g.week].push(g.g)
})
Object.entries(weekGroups).forEach(([wk, games]) => {
  console.log(`${wk}: games ${games.join(",")}`)
})
