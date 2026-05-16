/**
 * LIBERATORE 2026 REPLAY ENGINE — Pass 86 (2026-05-15)
 * Fetches Brady Liberatore's 2026 MLB start log, computes starts-based rolling
 * windows, weekly DLR snapshots, an April settlement, and optionally refreshes
 * games/matthew_liberatore-2026.json.
 *
 * Source: MLB Stats API — player 669461, sport_id 1, season 2026.
 * Engine version: P60.
 *
 * Usage:
 *   node scripts/replay-singer-2026.mjs
 *   node scripts/replay-singer-2026.mjs --write-json
 */

import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const WRITE_JSON = process.argv.includes("--write-json")

const PLAYER_ID = "matthew_liberatore"
const MLBAM_ID = 669461
const SEASON = 2026
const ENGINE_VERSION = "P60"
const BASELINE_ERA = 4.40
const BASE_DLR = 48.0
const LARGE_MOVEMENT_THRESHOLD = 2.0

const TEAM_ABBR = {
  108: "LAA", 109: "ARI", 110: "BAL", 111: "BOS", 112: "CHC",
  113: "CIN", 114: "CLE", 115: "COL", 116: "DET", 117: "HOU",
  118: "KC", 119: "LAD", 120: "WSH", 121: "NYM", 133: "ATH",
  134: "PIT", 135: "SD", 136: "SEA", 137: "SF", 138: "STL",
  139: "TB", 140: "TEX", 141: "TOR", 142: "MIN", 143: "PHI",
  144: "ATL", 145: "CWS", 146: "MIA", 147: "NYY", 158: "MIL",
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

function parseIP(ip) {
  const [wholeRaw, outsRaw = "0"] = String(ip).split(".")
  const whole = Number(wholeRaw)
  const outs = Number(outsRaw)
  if (outs > 2) throw new Error(`Invalid baseball IP: ${ip}`)
  return whole + outs / 3
}

function formatBIP(realIp) {
  const outs = Math.round(realIp * 3)
  return Number(`${Math.floor(outs / 3)}.${outs % 3}`)
}

function dlrTier(score) {
  if (score >= 90) return "ELITE"
  if (score >= 80) return "PREMIUM"
  if (score >= 70) return "SOLID"
  if (score >= 60) return "WATCHLIST"
  return "HOLD"
}

function confidenceTier(ip) {
  if (ip >= 60) return 1.0
  if (ip >= 30) return 0.7
  if (ip >= 15) return 0.4
  return 0.2
}

function healthClass(starts) {
  if (starts >= 3) return "FULLY_REACTIVE"
  if (starts >= 1) return "PARTIALLY_REACTIVE"
  return "STATIC_SUPPORTED"
}

function rollingStarts(starts, throughIdx, n) {
  const slice = starts.slice(Math.max(0, throughIdx - n + 1), throughIdx + 1)
  const ip = slice.reduce((s, g) => s + g.ipReal, 0)
  const h = slice.reduce((s, g) => s + g.h, 0)
  const er = slice.reduce((s, g) => s + g.er, 0)
  const bb = slice.reduce((s, g) => s + g.bb, 0)
  const k = slice.reduce((s, g) => s + g.k, 0)
  const hr = slice.reduce((s, g) => s + g.hr, 0)
  return {
    n: slice.length,
    ip,
    bip: formatBIP(ip),
    h, er, bb, k, hr,
    era: ip > 0 ? (er * 9) / ip : null,
    whip: ip > 0 ? (h + bb) / ip : null,
    k9: ip > 0 ? (k * 9) / ip : null,
    bb9: ip > 0 ? (bb * 9) / ip : null,
    hr9: ip > 0 ? (hr * 9) / ip : null,
  }
}

function calcDeltaShort(era, cumIP) {
  if (era == null || Number.isNaN(era)) return { ds: 0, largeMovement: false }
  const capped = Math.max(-0.04, Math.min(0.04, BASELINE_ERA - era))
  const ds = Number((capped * 20 * confidenceTier(cumIP)).toFixed(2))
  return { ds, largeMovement: Math.abs(ds) >= LARGE_MOVEMENT_THRESHOLD }
}

async function fetchStarts() {
  const url = `https://statsapi.mlb.com/api/v1/people/${MLBAM_ID}/stats?stats=gameLog&sportId=1&season=${SEASON}&group=pitching&gameType=R`
  const data = await fetch(url).then(res => {
    if (!res.ok) throw new Error(`MLB Stats API HTTP ${res.status}`)
    return res.json()
  })
  const splits = data?.stats?.[0]?.splits
  if (!Array.isArray(splits)) throw new Error("Unexpected MLB Stats API response shape")
  return splits.map((split, idx) => {
    const st = split.stat ?? {}
    const opp = TEAM_ABBR[split.opponent?.id] ?? split.opponent?.abbreviation ?? split.opponent?.name ?? "UNK"
    const ipReal = parseIP(st.inningsPitched ?? "0.0")
    return {
      g: idx + 1,
      date: split.date,
      opp: split.isHome ? `vs ${opp}` : `@ ${opp}`,
      bip: Number(st.inningsPitched ?? 0),
      ipReal,
      h: st.hits ?? 0,
      r: st.runs ?? 0,
      er: st.earnedRuns ?? 0,
      bb: st.baseOnBalls ?? 0,
      k: st.strikeOuts ?? 0,
      hr: st.homeRuns ?? 0,
      bf: st.battersFaced ?? 0,
      w: st.wins ?? 0,
      l: st.losses ?? 0,
      result: st.wins ? "W" : st.losses ? "L" : "ND",
      week: isoWeekStr(split.date),
    }
  })
}

export function computeReplay(starts) {
  let season = { ip: 0, h: 0, r: 0, er: 0, bb: 0, k: 0, hr: 0, bf: 0, w: 0, l: 0 }
  let weeklyHistoryBuf = []
  const startRows = []
  const weeklyBuckets = {}

  starts.forEach((start, idx) => {
    season.ip += start.ipReal
    for (const key of ["h", "r", "er", "bb", "k", "hr", "bf", "w", "l"]) season[key] += start[key] ?? 0

    const r3 = rollingStarts(starts, idx, 3)
    const r5 = rollingStarts(starts, idx, 5)
    const r7 = rollingStarts(starts, idx, 7)
    const cumERA = season.ip > 0 ? (season.er * 9) / season.ip : null
    const cumWHIP = season.ip > 0 ? (season.h + season.bb) / season.ip : null
    const { ds, largeMovement } = calcDeltaShort(cumERA, season.ip)
    const row = {
      ...start,
      cumIP: season.ip,
      cumBIP: formatBIP(season.ip),
      cumERA,
      cumWHIP,
      cumK9: season.ip > 0 ? (season.k * 9) / season.ip : null,
      r3, r5, r7,
      deltaShort: ds,
      largeMovement,
      conf: confidenceTier(season.ip),
      health: healthClass(idx + 1),
    }
    startRows.push(row)
    if (!weeklyBuckets[start.week]) weeklyBuckets[start.week] = []
    weeklyBuckets[start.week].push(row)
  })

  const weeklyRows = []
  for (const week of Object.keys(weeklyBuckets).sort()) {
    const rows = weeklyBuckets[week]
    const last = rows.at(-1)
    weeklyHistoryBuf = [...weeklyHistoryBuf.slice(-3), last.deltaShort]
    const deltaMonthly = weeklyHistoryBuf.reduce((s, v) => s + v, 0) / weeklyHistoryBuf.length
    const dlr = Math.round((BASE_DLR + deltaMonthly) * 10) / 10
    weeklyRows.push({
      snapshot_week: week,
      dlr_score: dlr,
      dlr_tier: dlrTier(dlr),
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
      competition_level: "MLB",
      large_movement: last.largeMovement,
      meta: {
        close_date: last.date,
        starts: rows.length,
        start_ip: rows.reduce((s, r) => s + r.ipReal, 0),
        start_er: rows.reduce((s, r) => s + r.er, 0),
        start_k: rows.reduce((s, r) => s + r.k, 0),
        cum_ip: last.cumIP,
        cum_era: last.cumERA,
        cum_whip: last.cumWHIP,
        starts3: last.r3,
        starts5: last.r5,
        starts7: last.r7,
      },
    })
  }

  const aprilWeeks = weeklyRows.filter(w => ["2026-W14", "2026-W15", "2026-W16", "2026-W17", "2026-W18"].includes(w.snapshot_week))
  const aprilDeltas = weeklyRows.filter(w => ["2026-W14", "2026-W15", "2026-W16", "2026-W17"].includes(w.snapshot_week))
  const aprilAvgDelta = aprilDeltas.reduce((s, w) => s + w.weekly_delta, 0) / aprilDeltas.length
  const aprilDlr = Math.round((BASE_DLR + aprilAvgDelta) * 10) / 10
  const aprilSettlement = {
    settlement_month: "2026-04",
    dlr_score: aprilDlr,
    dlr_tier: dlrTier(aprilDlr),
    week_count: aprilWeeks.length,
    confidence_level: Number((aprilWeeks.reduce((s, w) => s + w.confidence_level, 0) / aprilWeeks.length).toFixed(3)),
    health_class: "FULLY_REACTIVE",
    weekly_avg_delta: Number(aprilAvgDelta.toFixed(2)),
    monthly_contribution: null,
    weekly_history: weeklyRows.find(w => w.snapshot_week === "2026-W18")?.weekly_history ?? [],
    source: "manual",
    season: SEASON,
  }

  return { startRows, weeklyRows, aprilSettlement, season, final: startRows.at(-1) }
}

function fmt(n, digits = 3) {
  return n == null ? "—" : n.toFixed(digits)
}

const starts = await fetchStarts()
const replay = computeReplay(starts)

console.log("=== LIBERATORE 2026 REPLAY — PASS 80 COMPUTATION OUTPUT ===\n")
console.log(`Dataset: ${starts.length} starts (${starts[0]?.date} – ${starts.at(-1)?.date})`)
console.log("=== TOTALS VERIFICATION ===")
console.log(`IP:${formatBIP(replay.season.ip).toFixed(1)} H:${replay.season.h} R:${replay.season.r} ER:${replay.season.er} BB:${replay.season.bb} K:${replay.season.k} HR:${replay.season.hr} BF:${replay.season.bf}`)
console.log(`W:${replay.season.w} L:${replay.season.l} ERA:${fmt((replay.season.er * 9) / replay.season.ip, 2)} WHIP:${fmt((replay.season.h + replay.season.bb) / replay.season.ip, 3)} K/9:${fmt((replay.season.k * 9) / replay.season.ip, 1)}`)

console.log("\n=== PER-START CASCADE LOG ===")
for (const row of replay.startRows) {
  console.log(`Start ${String(row.g).padStart(2, "0")} | ${row.date} | ${row.opp.padEnd(6)} | IP ${row.bip.toFixed(1)} H ${row.h} ER ${row.er} BB ${row.bb} K ${row.k} HR ${row.hr} | ERA ${fmt(row.cumERA, 2)} WHIP ${fmt(row.cumWHIP, 3)} | ${row.week} Δ ${row.deltaShort >= 0 ? "+" : ""}${row.deltaShort} conf ${row.conf}`)
}

console.log("\n=== WEEKLY SNAPSHOTS ===")
for (const row of replay.weeklyRows) {
  console.log(`${row.snapshot_week}: ${row.meta.starts} start(s), close ${row.meta.close_date}, ERA ${fmt(row.meta.cum_era, 2)}, last3 ERA ${fmt(row.meta.starts3.era, 2)}, Δ ${row.weekly_delta >= 0 ? "+" : ""}${row.weekly_delta}, conf ${row.confidence_level}, DLR ${row.dlr_score} (${row.dlr_tier})`)
}

console.log("\n=== APRIL SETTLEMENT ===")
console.log(`2026-04: dlr=${replay.aprilSettlement.dlr_score} avgΔ=${replay.aprilSettlement.weekly_avg_delta} weeks=${replay.aprilSettlement.week_count} conf=${replay.aprilSettlement.confidence_level}`)

console.log("\n=== FINAL TRACKER STATE ===")
console.log(`G:${starts.length} IP:${formatBIP(replay.season.ip).toFixed(1)} ERA:${fmt((replay.season.er * 9) / replay.season.ip, 2)} WHIP:${fmt((replay.season.h + replay.season.bb) / replay.season.ip, 3)} K:${replay.season.k} HR:${replay.season.hr}`)
console.log(`Starts3 ERA:${fmt(replay.final.r3.era, 2)} WHIP:${fmt(replay.final.r3.whip, 3)} | Starts5 ERA:${fmt(replay.final.r5.era, 2)} WHIP:${fmt(replay.final.r5.whip, 3)} | Starts7 ERA:${fmt(replay.final.r7.era, 2)} WHIP:${fmt(replay.final.r7.whip, 3)}`)
console.log(`Final DLR: ${replay.weeklyRows.at(-1)?.dlr_score} (${replay.weeklyRows.at(-1)?.dlr_tier})`)

if (WRITE_JSON) {
  const out = {
    player_id: PLAYER_ID,
    season: SEASON,
    engine_version: ENGINE_VERSION,
    source: "MLB Stats API gameLog",
    source_url: `https://statsapi.mlb.com/api/v1/people/${MLBAM_ID}/stats?stats=gameLog&sportId=1&season=${SEASON}&group=pitching&gameType=R`,
    replayed_at: new Date().toISOString(),
    totals: { ...replay.season, bip: formatBIP(replay.season.ip) },
    rates: {
      era: Number(((replay.season.er * 9) / replay.season.ip).toFixed(2)),
      whip: Number(((replay.season.h + replay.season.bb) / replay.season.ip).toFixed(3)),
      k9: Number(((replay.season.k * 9) / replay.season.ip).toFixed(1)),
      bb9: Number(((replay.season.bb * 9) / replay.season.ip).toFixed(2)),
      hr9: Number(((replay.season.hr * 9) / replay.season.ip).toFixed(2)),
    },
    starts,
    startRows: replay.startRows,
    weeklyRows: replay.weeklyRows,
    aprilSettlement: replay.aprilSettlement,
  }
  writeFileSync(join(ROOT, "games", "matthew_liberatore-2026.json"), JSON.stringify(out, null, 2) + "\n")
  console.log("\nWrote games/matthew_liberatore-2026.json")
}
