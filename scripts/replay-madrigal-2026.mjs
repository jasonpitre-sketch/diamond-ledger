/**
 * MADRIGAL 2026 REPLAY ENGINE — Pass 79 (2026-05-15)
 * Fetches Brice Madrigal's 2026 MLB game log, computes days-based rolling windows,
 * weekly DLR snapshots, an April settlement, and optionally refreshes
 * games/nick_madrigal-2026.json.
 *
 * Source: MLB Stats API — player 663611, sport_id 11, season 2026.
 * Engine version: P60.
 *
 * Usage:
 *   node scripts/replay-turang-2026.mjs
 *   node scripts/replay-turang-2026.mjs --write-json
 */

import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const WRITE_JSON = process.argv.includes("--write-json")

const PLAYER_ID = "nick_madrigal"
const MLBAM_ID = 663611
const SEASON = 2026
const ENGINE_VERSION = "P60"
const BASELINE_AVG = 0.283
const BASE_DLR = 43.0
const LARGE_MOVEMENT_THRESHOLD = 2.0

const TEAM_ABBR = {
  400: "LV", 105: "SAC", 2310: "RNO", 5434: "SUG", 238: "OKC", 4904: "ELP", 561: "SL",
}

function isoWeek(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z")
  const jan4 = new Date(d.getUTCFullYear() + "-01-04T12:00:00Z")
  const startOfW1 = new Date(jan4)
  startOfW1.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7))
  return Math.floor((d - startOfW1) / (7 * 24 * 3600 * 1000)) + 1
}

function isoWeekStr(dateStr) {
  return `${dateStr.slice(0, 4)}-W${String(isoWeek(dateStr)).padStart(2, "0")}`
}

function dateMs(str) {
  return new Date(str + "T12:00:00Z").getTime()
}

function dlrTier(score) {
  if (score >= 90) return "ELITE"
  if (score >= 80) return "PREMIUM"
  if (score >= 70) return "SOLID"
  if (score >= 60) return "WATCHLIST"
  return "HOLD"
}

function confidenceTier(ab) {
  if (ab >= 150) return 1.0
  if (ab >= 75) return 0.7
  if (ab >= 20) return 0.4
  return 0.2
}

function healthClass(d7, d15, d30) {
  const count = [d7, d15, d30].filter(Boolean).length
  if (count === 3) return "FULLY_REACTIVE"
  if (count >= 1) return "PARTIALLY_REACTIVE"
  return "STATIC_SUPPORTED"
}

function calcDeltaShort(weeklyAvg, currentAB) {
  if (weeklyAvg == null || Number.isNaN(weeklyAvg)) return { ds: 0, largeMovement: false }
  const capped = Math.max(-0.04, Math.min(0.04, weeklyAvg - BASELINE_AVG))
  const ds = Number((capped * 20 * confidenceTier(currentAB)).toFixed(2))
  return { ds, largeMovement: Math.abs(ds) >= LARGE_MOVEMENT_THRESHOLD }
}

function rollingWindow(games, targetDate, daysBack) {
  const targetMs = dateMs(targetDate)
  const cutoffMs = targetMs - (daysBack - 1) * 24 * 3600 * 1000
  const window = games.filter(g => {
    const ms = dateMs(g.date)
    return ms >= cutoffMs && ms <= targetMs
  })
  if (!window.length) return null
  const sum = key => window.reduce((s, g) => s + (g[key] ?? 0), 0)
  const ab = sum("ab")
  const h = sum("h")
  const bb = sum("bb")
  const hbp = sum("hbp")
  const sf = sum("sf")
  const tb = sum("tb")
  const obp = (ab + bb + hbp + sf) > 0 ? (h + bb + hbp) / (ab + bb + hbp + sf) : null
  const slg = ab > 0 ? tb / ab : null
  return {
    games: window.length,
    ab, h, bb, hbp, sf, tb,
    hr: sum("hr"),
    rbi: sum("rbi"),
    so: sum("so"),
    sb: sum("sb"),
    avg: ab > 0 ? h / ab : null,
    obp,
    slg,
    ops: obp != null && slg != null ? obp + slg : null,
  }
}

function computeSignals(d7, d15, d30, season) {
  const avg = d7?.avg ?? d15?.avg ?? d30?.avg ?? null
  const iso = season.ab > 0 ? (season.tb - season.h) / season.ab : null
  const bbRate = (season.ab + season.bb) > 0 ? season.bb / (season.ab + season.bb) : 0
  return {
    bat: avg == null ? "PENDING" : avg >= 0.310 ? "HOT" : avg >= 0.270 ? "WARM" : avg >= 0.230 ? "NEUTRAL" : avg >= 0.190 ? "COOL" : "DARK",
    val: bbRate >= 0.13 ? "WARM" : bbRate >= 0.09 ? "NEUTRAL" : bbRate >= 0.06 ? "COOL" : "DARK",
    run: season.sb >= 4 ? "NEUTRAL" : season.sb >= 1 ? "COOL" : "DARK",
    pwr: iso == null ? "PENDING" : iso >= 0.220 ? "WARM" : iso >= 0.150 ? "NEUTRAL" : iso >= 0.080 ? "COOL" : "DARK",
  }
}

async function fetchGames() {
  const url = `https://statsapi.mlb.com/api/v1/people/${MLBAM_ID}/stats?stats=gameLog&sportId=11&season=${SEASON}&group=hitting&gameType=R`
  const data = await fetch(url).then(res => {
    if (!res.ok) throw new Error(`MLB Stats API HTTP ${res.status}`)
    return res.json()
  })
  const splits = data?.stats?.[0]?.splits
  if (!Array.isArray(splits)) throw new Error("Unexpected MLB Stats API response shape")
  return splits.map((split, idx) => {
    const st = split.stat ?? {}
    const opp = TEAM_ABBR[split.opponent?.id] ?? split.opponent?.abbreviation ?? `T${split.opponent?.id ?? "UNK"}`
    return {
      g: idx + 1,
      date: split.date,
      opp: split.isHome ? `vs ${opp}` : `@ ${opp}`,
      ab: st.atBats ?? 0,
      r: st.runs ?? 0,
      h: st.hits ?? 0,
      d: st.doubles ?? 0,
      t: st.triples ?? 0,
      hr: st.homeRuns ?? 0,
      rbi: st.rbi ?? 0,
      bb: st.baseOnBalls ?? 0,
      so: st.strikeOuts ?? 0,
      sb: st.stolenBases ?? 0,
      cs: st.caughtStealing ?? 0,
      hbp: st.hitByPitch ?? 0,
      sf: st.sacFlies ?? 0,
      pa: st.plateAppearances ?? 0,
      tb: st.totalBases ?? 0,
      week: isoWeekStr(split.date),
    }
  })
}

export function computeReplay(games) {
  let season = { ab: 0, r: 0, h: 0, d: 0, t: 0, hr: 0, rbi: 0, bb: 0, so: 0, sb: 0, cs: 0, hbp: 0, sf: 0, pa: 0, tb: 0 }
  let weeklyHistoryBuf = []
  const dailyRows = []
  const weeklyBuckets = {}

  for (const game of games) {
    for (const key of Object.keys(season)) season[key] += game[key] ?? 0
    const d7 = rollingWindow(games.filter(g => dateMs(g.date) <= dateMs(game.date)), game.date, 7)
    const d15 = rollingWindow(games.filter(g => dateMs(g.date) <= dateMs(game.date)), game.date, 15)
    const d30 = rollingWindow(games.filter(g => dateMs(g.date) <= dateMs(game.date)), game.date, 30)
    const { ds, largeMovement } = calcDeltaShort(d7?.avg ?? d15?.avg ?? d30?.avg, season.ab)
    const signals = computeSignals(d7, d15, d30, season)
    const row = {
      ...game,
      cumAB: season.ab,
      cumAVG: season.ab > 0 ? season.h / season.ab : null,
      d7, d15, d30,
      deltaShort: ds,
      largeMovement,
      conf: confidenceTier(season.ab),
      health: healthClass(d7, d15, d30),
      signals,
    }
    dailyRows.push(row)
    if (!weeklyBuckets[game.week]) weeklyBuckets[game.week] = []
    weeklyBuckets[game.week].push(row)
  }

  const weeklyRows = []
  for (const week of Object.keys(weeklyBuckets).sort()) {
    const rows = weeklyBuckets[week]
    const last = rows.at(-1)
    weeklyHistoryBuf = [...weeklyHistoryBuf.slice(-3), last.deltaShort]
    const deltaMonthly = weeklyHistoryBuf.reduce((s, v) => s + v, 0) / weeklyHistoryBuf.length
    weeklyRows.push({
      snapshot_week: week,
      dlr_score: Math.round((BASE_DLR + deltaMonthly) * 10) / 10,
      dlr_tier: dlrTier(Math.round((BASE_DLR + deltaMonthly) * 10) / 10),
      weekly_delta: last.deltaShort,
      monthly_contribution: Number(deltaMonthly.toFixed(2)),
      weekly_history: [...weeklyHistoryBuf],
      confidence_level: last.conf,
      confidence_overall: last.conf,
      confidence_performance: last.conf,
      confidence_knowledge: null,
      confidence_media: null,
      confidence_market: null,
      health_class: last.health,
      fallback_used: false,
      base_dlr: BASE_DLR,
      competition_level: "AAA",
      large_movement: last.largeMovement,
      meta: {
        close_date: last.date,
        games: rows.length,
        week_ab: rows.reduce((s, r) => s + r.ab, 0),
        week_h: rows.reduce((s, r) => s + r.h, 0),
        week_hr: rows.reduce((s, r) => s + r.hr, 0),
        week_rbi: rows.reduce((s, r) => s + r.rbi, 0),
        cum_ab: last.cumAB,
        d7: last.d7,
        d15: last.d15,
        d30: last.d30,
        signals: last.signals,
      },
    })
  }

  const aprilWeeks = weeklyRows.filter(w => ["2026-W14", "2026-W15", "2026-W16", "2026-W17", "2026-W18"].includes(w.snapshot_week))
  const aprilDeltas = weeklyRows.filter(w => ["2026-W14", "2026-W15", "2026-W16", "2026-W17"].includes(w.snapshot_week))
  const aprilAvgDelta = aprilDeltas.reduce((s, w) => s + w.weekly_delta, 0) / aprilDeltas.length
  const aprilSettlement = {
    settlement_month: "2026-04",
    dlr_score: Math.round((BASE_DLR + aprilAvgDelta) * 10) / 10,
    dlr_tier: dlrTier(Math.round((BASE_DLR + aprilAvgDelta) * 10) / 10),
    week_count: aprilWeeks.length,
    confidence_level: Number((aprilWeeks.reduce((s, w) => s + w.confidence_level, 0) / aprilWeeks.length).toFixed(3)),
    health_class: "FULLY_REACTIVE",
    weekly_avg_delta: Number(aprilAvgDelta.toFixed(2)),
    monthly_contribution: null,
    weekly_history: weeklyRows.find(w => w.snapshot_week === "2026-W18")?.weekly_history ?? [],
    source: "manual",
    season: SEASON,
  }

  return { dailyRows, weeklyRows, aprilSettlement, season, final: dailyRows.at(-1) }
}

function fmt(n) {
  return n == null ? "—" : n.toFixed(3).replace(/^0/, "")
}

const games = await fetchGames()
const replay = computeReplay(games)

console.log("=== MADRIGAL 2026 REPLAY — PASS 79 COMPUTATION OUTPUT ===\n")
console.log(`Dataset: ${games.length} games (${games[0]?.date} – ${games.at(-1)?.date})`)
console.log("=== TOTALS VERIFICATION ===")
console.log(`G:${games.length} AB:${replay.season.ab} H:${replay.season.h} 2B:${replay.season.d} 3B:${replay.season.t} HR:${replay.season.hr}`)
console.log(`R:${replay.season.r} RBI:${replay.season.rbi} BB:${replay.season.bb} K:${replay.season.so} SB:${replay.season.sb} TB:${replay.season.tb}`)
console.log(`HBP:${replay.season.hbp} SF:${replay.season.sf} PA:${replay.season.pa}`)
console.log(`AVG:${fmt(replay.season.h / replay.season.ab)} OBP:${fmt((replay.season.h + replay.season.bb + replay.season.hbp) / (replay.season.ab + replay.season.bb + replay.season.hbp + replay.season.sf))} SLG:${fmt(replay.season.tb / replay.season.ab)} OPS:${fmt((replay.season.h + replay.season.bb + replay.season.hbp) / (replay.season.ab + replay.season.bb + replay.season.hbp + replay.season.sf) + replay.season.tb / replay.season.ab)}`)

console.log("\n=== DAILY JOURNAL TABLE ===")
for (const row of replay.dailyRows) {
  console.log(
    `Game ${String(row.g).padStart(2, "0")} | ${row.date} | ${row.opp.padEnd(6)} | ` +
    `AB ${row.ab} H ${row.h} HR ${row.hr} RBI ${row.rbi} BB ${row.bb} SO ${row.so} | ` +
    `AVG ${fmt(row.cumAVG)} | 7D ${row.d7.h}-for-${row.d7.ab} AVG ${fmt(row.d7.avg)} OPS ${fmt(row.d7.ops)} | ` +
    `${row.week} DLR ${replay.weeklyRows.find(w => w.snapshot_week === row.week)?.dlr_score ?? "—"} Δ ${row.deltaShort >= 0 ? "+" : ""}${row.deltaShort} conf ${row.conf}`
  )
}

console.log("\n=== WEEKLY SNAPSHOTS ===")
for (const row of replay.weeklyRows) {
  console.log(`${row.snapshot_week}: ${row.meta.games} game(s), close ${row.meta.close_date}, week ${row.meta.week_h}-for-${row.meta.week_ab}, 7D AVG ${fmt(row.meta.d7.avg)} OPS ${fmt(row.meta.d7.ops)}, Δ ${row.weekly_delta >= 0 ? "+" : ""}${row.weekly_delta}, conf ${row.confidence_level}, DLR ${row.dlr_score} (${row.dlr_tier})`)
}

console.log("\n=== APRIL SETTLEMENT ===")
console.log(`2026-04: dlr=${replay.aprilSettlement.dlr_score} avgΔ=${replay.aprilSettlement.weekly_avg_delta} weeks=${replay.aprilSettlement.week_count} conf=${replay.aprilSettlement.confidence_level}`)

console.log("\n=== FINAL TRACKER STATE ===")
console.log(`G:${games.length} AB:${replay.season.ab} H:${replay.season.h} AVG:${fmt(replay.season.h / replay.season.ab)} OPS:${fmt((replay.season.h + replay.season.bb + replay.season.hbp) / (replay.season.ab + replay.season.bb + replay.season.hbp + replay.season.sf) + replay.season.tb / replay.season.ab)}`)
console.log(`7D AVG:${fmt(replay.final.d7.avg)} OPS:${fmt(replay.final.d7.ops)} | 15D AVG:${fmt(replay.final.d15.avg)} OPS:${fmt(replay.final.d15.ops)} | 30D AVG:${fmt(replay.final.d30.avg)} OPS:${fmt(replay.final.d30.ops)}`)
console.log(`Final DLR: ${replay.weeklyRows.at(-1)?.dlr_score} (${replay.weeklyRows.at(-1)?.dlr_tier})`)

if (WRITE_JSON) {
  const out = {
    player_id: PLAYER_ID,
    season: SEASON,
    engine_version: ENGINE_VERSION,
    source: "MLB Stats API gameLog",
    source_url: `https://statsapi.mlb.com/api/v1/people/${MLBAM_ID}/stats?stats=gameLog&sportId=11&season=${SEASON}&group=hitting&gameType=R`,
    replayed_at: new Date().toISOString(),
    totals: replay.season,
    rates: {
      avg: Number((replay.season.h / replay.season.ab).toFixed(3)),
      obp: Number(((replay.season.h + replay.season.bb + replay.season.hbp) / (replay.season.ab + replay.season.bb + replay.season.hbp + replay.season.sf)).toFixed(3)),
      slg: Number((replay.season.tb / replay.season.ab).toFixed(3)),
      ops: Number(((replay.season.h + replay.season.bb + replay.season.hbp) / (replay.season.ab + replay.season.bb + replay.season.hbp + replay.season.sf) + replay.season.tb / replay.season.ab).toFixed(3)),
    },
    games,
    dailyRows: replay.dailyRows,
    weeklyRows: replay.weeklyRows,
    aprilSettlement: replay.aprilSettlement,
  }
  writeFileSync(join(ROOT, "games", "nick_madrigal-2026.json"), JSON.stringify(out, null, 2) + "\n")
  console.log("\nWrote games/nick_madrigal-2026.json")
}
