// P60-DIAG: Manual DLR computation for Eli Willits
// Pure JS, no TypeScript imports needed
// Implements the exact same math as calculateDLR.ts

// ─── CONSTANTS (from dlrConfig.ts) ──────────────────────────────────────────
const LAYER_MAX_POINTS = { knowledge: 18, performance: 40, media: 18, market: 24 }
const KNOWLEDGE_PAGE_POINTS = {
  bio:    { snapshot: 1, scout: 2, analyst: 3 },
  scout:  { snapshot: 1, scout: 2, analyst: 3 },
  career: { snapshot: 1, scout: 2, analyst: 3 }
}
const FLAT_LAYER_POINTS = {
  performance: { snapshot: 8, scout: 12, analyst: 20 },
  media:       { snapshot: 4, scout: 6,  analyst: 8  },
  market:      { snapshot: 5, scout: 7,  analyst: 12 }
}
const HITTER_ANCHORS = {
  AVG:  { floor: 0.2,   ceiling: 0.36,  direction:  1 },
  K_pct:{ floor: 30,    ceiling: 8,     direction: -1 },
  xAVG: { floor: 0.23,  ceiling: 0.33,  direction:  1 }
}

// ─── SIGNAL MAP (from signalEngine.ts) ──────────────────────────────────────
const SIGNAL_BUCKET = { low: 0.03, mid: 0.06, high: 0.10 }
const SIGNAL_MAP = {
  low: 0.03, limited: 0.03, bench: 0.03, risk: 0.03, risky: 0.03,
  raw: 0.03, volatile: 0.03, uncertain: 0.03, slow: 0.03,
  moderate: 0.06, mid: 0.06, solid: 0.06, starter: 0.06, average: 0.06,
  steady: 0.06, balanced: 0.06, contributor: 0.06, viable: 0.06, normal: 0.06,
  high: 0.10, impact: 0.10, elite: 0.10, premium: 0.10, strong: 0.10,
  ideal: 0.10, priority: 0.10, accelerating: 0.10, projectable: 0.10,
  polished: 0.10, likely: 0.10, "top 10": 0.10, "very high": 0.10,
  "1st overall": 0.10, "1-1": 0.10
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function clamp01(v) {
  if (v === null || v === undefined || isNaN(v)) return 0
  return Math.max(0, Math.min(1, v))
}

function linearNormalize(value, anchor) {
  if (value === null || value === undefined || isNaN(value)) return null
  return clamp01((value - anchor.floor) / (anchor.ceiling - anchor.floor))
}

function safeAverage(values) {
  const valid = values.filter(v => typeof v === 'number' && !isNaN(v))
  if (valid.length === 0) return { avg: 0, populated: 0, expected: values.length }
  return {
    avg: valid.reduce((s, v) => s + v, 0) / valid.length,
    populated: valid.length,
    expected: values.length
  }
}

function safeAverageArray(arr) {
  if (!arr.length) return 0.5
  return arr.reduce((s, v) => s + v, 0) / arr.length
}

function textSignalValue(value) {
  if (typeof value === 'number' && isFinite(value)) {
    return clamp01(value) * SIGNAL_BUCKET.high
  }
  if (Array.isArray(value)) {
    const mapped = value.map(item => textSignalValue(item)).filter(s => s !== null)
    if (mapped.length === 0) return null
    return mapped.reduce((s, x) => s + x, 0) / mapped.length
  }
  if (value === null || value === undefined) return null
  const text = String(value).toLowerCase()
  const match = Object.entries(SIGNAL_MAP)
    .sort(([l], [r]) => r.length - l.length)
    .find(([label]) => text.includes(label))
  return match?.[1] ?? null
}

function textSignalScore(value, fallback = 0.55) {
  const sv = textSignalValue(value)
  return sv === null ? fallback : sv / SIGNAL_BUCKET.high
}

function normalizeToolGrade(grade) {
  if (grade === null || grade === undefined || isNaN(grade)) return null
  return clamp01((grade - 20) / 60)
}

function readNumber(source, key) {
  const v = source?.[key]
  return typeof v === 'number' && !isNaN(v) ? v : null
}

function scoreFromAlreadyNormalized(inputs) {
  const adjusted = inputs.map(({ value, invert }) => {
    if (value === null || value === undefined || isNaN(value)) return null
    const n = clamp01(value)
    return invert ? 1 - n : n
  })
  return safeAverage(adjusted)
}

function scoreFromAnchored(inputs) {
  const normalized = inputs.map(({ value, anchor }) => {
    if (anchor === null) return value == null ? null : clamp01(value)
    return linearNormalize(value, anchor)
  })
  return safeAverage(normalized)
}

// ─── BLEND ENGINE (from playerBridge.ts) ─────────────────────────────────────
const SNAPSHOT_WEIGHTS = { d7: 0.20, d15: 0.30, d30: 0.50 }
const SCOUT_WEIGHTS    = { d7: 0.15, d15: 0.30, d30: 0.55 }
const ANALYST_WEIGHTS  = { d7: 0.10, d15: 0.20, d30: 0.70 }

function num(v) { return typeof v === 'number' && isFinite(v) ? v : null }

function blendStat(d7, d15, d30, weights) {
  const v7 = num(d7), v15 = num(d15), v30 = num(d30)
  const pts = []
  if (v7  !== null) pts.push({ val: v7,  w: weights.d7  })
  if (v15 !== null) pts.push({ val: v15, w: weights.d15 })
  if (v30 !== null) pts.push({ val: v30, w: weights.d30 })
  if (pts.length === 0) return null
  const total = pts.reduce((s, p) => s + p.w, 0)
  return pts.reduce((s, p) => s + p.val * (p.w / total), 0)
}

function safeRate(n, d) {
  const nv = num(n), dv = num(d)
  if (nv === null || dv === null || dv < 1) return null
  return nv / dv
}

// ─── CONFIDENCE (from confidence.ts) ─────────────────────────────────────────
function abConfidence(ab) {
  if (ab >= 220) return 1
  if (ab >= 160) return 0.97
  if (ab >= 120) return 0.94
  if (ab >= 80)  return 0.90
  if (ab >= 50)  return 0.86
  if (ab >= 30)  return 0.80
  if (ab >= 15)  return 0.72
  return 0.6
}

function maturityConfidence(level) {
  const l = (level ?? '').toUpperCase().trim()
  if (l === 'MLB')  return 1.0
  if (l === 'MILB') return 0.97
  if (l === 'NCAA') return 0.94
  if (l === 'HS')   return 0.82
  return 0.88
}

// ─── ROLE TOOL GRADES ────────────────────────────────────────────────────────
const HITTER_TOOLS = [
  { key: 'hit',   aliases: ['hit'] },
  { key: 'power', aliases: ['power'] },
  { key: 'run',   aliases: ['run', 'speed'] },
  { key: 'arm',   aliases: ['arm'] },
  { key: 'field', aliases: ['field', 'fielding'] }
]

function readRoleToolGrades(tools, isHitter) {
  const set = isHitter ? HITTER_TOOLS : []
  return set.map(({ key, aliases }) => {
    const raw = aliases.map(a => tools?.[a]).find(v => typeof v === 'number' && !isNaN(v))
    return { key, value: typeof raw === 'number' ? raw : null, normalized: normalizeToolGrade(raw) }
  })
}

// ─── ELI WILLITS DATA (from source files) ───────────────────────────────────
const player = {
  id: "eli_willits",
  position: "SS",
  performance: {
    kind: "hitter",
    // competitionLevel: undefined — not in file
    snapshot: { AVG: 0.300 },
    scout: { kRate: 14.2, bbRate: 13.4, barrel: 9.1, hardHit: 44.8, avgEV: 90.6 },
    analyst: { xAVG: 0.292, xSLG: 0.487 }
  },
  media: {
    snapshot: { mentions: 0.62, headlineImpact: 0.65, highlightFactor: 0.58, socialBuzz: 0.64 },
    scout: { fanRecognition: 0.58, teamVisibility: 0.62, interviewPresence: 0.55, narrativeStrength: 0.72, milestoneAttention: 0.60 },
    analyst: { prospectPedigree: 0.80, hypeTrend: 0.70, mediaStability: 0.60, storyDurability: 0.68, breakoutProbability: 0.68, publicMomentum: 0.65, attentionDecay: 0.42, confidence: 0.65 }
  },
  tracker: {
    AB: 128, PA: 158, G: 32,
    AVG: 0.258, OBP: 0.392, OPS: 0.814,
    rolling: {
      days7:  { AB: 21, H: 3,  K: 8,  AVG: 0.143, OPS: 0.536 },
      days15: { AB: 47, H: 12, K: 17, AVG: 0.255, OPS: 0.801 },
      days30: { AB: 92, H: 28, K: 26, AVG: 0.304, OPS: 0.959 }
    }
  },
  knowledge: {
    bio: {
      snapshot: { height: "6'1", weight: "180", bats: "S", throws: "R", school: "Fort Cobb-Broxton HS" },
      scout: { birthdate: "2007-12-09", signBonus: "8.2M", archetype: "athletic contact SS", devPath: "high school advanced", frameScale: "projectable lean" },
      scoutScores: { arch: 0.58, path: 0.65, frame: 0.45, ath: 0.72, proj: 0.82 },
      analystScores: { dev: 0.72, risk: 0.42, value: 0.82, org: 0.85, pedigree: 0.92 },
      analyst: { serviceTime: 0, options: 3, injuryIdx: 0.08, pedigree: 0.92, devCurve: 0.78, orgValue: 0.85, assetRisk: 0.42, longValue: 0.81 }
    },
    scout: {
      snapshot: { primaryTool: ["contact", "speed"], roleType: ["starter", "impact"] },
      scout: { hit: 60, power: 50, run: 60, arm: 55, field: 55 },
      analystScores: { ceiling: 0.82, floor: 0.58, roleProb: 0.74, skillTrend: 0.72, volatility: 0.48, orgFit: 0.86, riskTrend: 0.44 },
      analyst: { ceiling: 0.82, floor: 0.58, roleProb: 0.74, skillTrend: 0.62, volatility: 0.48, comparable: "Dansby Swanson", orgFit: 0.86, riskTrend: 0.44 }
    },
    career: {
      snapshot: { draftPedigree: "1st overall", developmentPath: "prep elite", orgInvestment: "high", timelineSignal: "fast track" },
      scout: { collegeStatus: "HS", draftPedigree: "1-1", projectionPath: "everyday SS", orgCommitment: "very high", topProspectStatus: "top 10 overall" },
      analystScores: { timeline: 0.48, peak: 0.65, path: 0.58, org: 0.86, value: 0.88, floor: 0.55, ceil: 0.82 },
      analyst: { amateurCeiling: 0.88, draftValue: 0.91, ascentSpeed: 0.63, setbacks: 0.18, recoveryTrack: 0.72, orgPatience: 0.84, careerArc: 0.79, longView: 0.83 }
    }
  }
  // NOTE: no marketSnapshot → market defaults to 0.5/0.5/0.5
}

// ─── COMPUTE ─────────────────────────────────────────────────────────────────

const isHitter = player.performance?.kind !== 'pitcher'
const role = 'hitter'

// --- BLEND ---
const rolling = player.tracker?.rolling
const r7 = rolling?.days7 ?? null
const r15 = rolling?.days15 ?? null
const r30 = rolling?.days30 ?? null

const snapshotAVG = blendStat(r7?.AVG, r15?.AVG, r30?.AVG, SNAPSHOT_WEIGHTS)
const scoutKRate  = blendStat(safeRate(r7?.K, r7?.AB), safeRate(r15?.K, r15?.AB), safeRate(r30?.K, r30?.AB), SCOUT_WEIGHTS)
const analystAVG  = blendStat(r7?.AVG, r15?.AVG, r30?.AVG, ANALYST_WEIGHTS)

console.log("\n═══ BLEND RESULTS ═══")
console.log(`  snapshotAVG:  ${snapshotAVG?.toFixed(4)} (from rolling: 7D=${r7?.AVG}, 15D=${r15?.AVG}, 30D=${r30?.AVG})`)
console.log(`  scoutKRate:   ${scoutKRate?.toFixed(4)} (K/AB fractions: 7D=${safeRate(r7?.K,r7?.AB)?.toFixed(3)}, 15D=${safeRate(r15?.K,r15?.AB)?.toFixed(3)}, 30D=${safeRate(r30?.K,r30?.AB)?.toFixed(3)})`)
console.log(`  analystAVG:   ${analystAVG?.toFixed(4)}`)
console.log(`  staticAVG (performance.snapshot.AVG): ${player.performance.snapshot.AVG}`)
console.log(`  staticKRate  (performance.scout.kRate): ${player.performance.scout.kRate}`)
console.log(`  staticXAVG  (performance.analyst.xAVG): ${player.performance.analyst.xAVG}`)

// --- PERFORMANCE SCORING ---
const perfP = player.performance
const maturity = maturityConfidence(perfP?.competitionLevel)

// Snapshot: blended AVG ?? static AVG
const snapInput = snapshotAVG ?? readNumber(perfP?.snapshot, "AVG")
const snapNorm  = linearNormalize(snapInput, HITTER_ANCHORS.AVG)
const perf_snap = snapNorm

// Scout: blended kRate ?? static kRate
const scoutInput = scoutKRate ?? readNumber(perfP?.scout, "kRate")
const scoutNorm  = linearNormalize(scoutInput, HITTER_ANCHORS.K_pct)
const perf_scout = scoutNorm

// Analyst: blended analystAVG ?? static xAVG
const analystInput = analystAVG ?? readNumber(perfP?.analyst, "xAVG")
const analystNorm  = linearNormalize(analystInput, HITTER_ANCHORS.xAVG)
const perf_analyst = analystNorm

console.log("\n═══ PERFORMANCE LAYER ═══")
console.log(`  maturity (competitionLevel='${perfP?.competitionLevel}'): ${maturity}`)
console.log(`  Snapshot: input=${snapInput?.toFixed(4)} → norm=${snapNorm?.toFixed(4)} → ×maturity=${(snapNorm*maturity).toFixed(4)}`)
console.log(`    (anchor AVG: floor=${HITTER_ANCHORS.AVG.floor}, ceiling=${HITTER_ANCHORS.AVG.ceiling})`)
console.log(`  Scout: input=${scoutInput?.toFixed(4)} → norm=${scoutNorm?.toFixed(4)} → ×maturity=${(scoutNorm*maturity).toFixed(4)}`)
console.log(`    (anchor K_pct: floor=${HITTER_ANCHORS.K_pct.floor}, ceiling=${HITTER_ANCHORS.K_pct.ceiling})`)
console.log(`    NOTE: scoutInput is ${scoutKRate !== null ? 'blended K/AB fraction' : 'static kRate %'} — unit check needed`)
console.log(`  Analyst: input=${analystInput?.toFixed(4)} → norm=${analystNorm?.toFixed(4)} → ×maturity=${(analystNorm*maturity).toFixed(4)}`)
console.log(`    (anchor xAVG: floor=${HITTER_ANCHORS.xAVG.floor}, ceiling=${HITTER_ANCHORS.xAVG.ceiling})`)

const perfScores = {
  snapshot: (perf_snap ?? 0) * maturity,
  scout:    (perf_scout ?? 0) * maturity,
  analyst:  (perf_analyst ?? 0) * maturity
}

const trust = abConfidence(player.tracker?.AB ?? 0)
const perfDataComp = ((snapInput !== null ? 1 : 0) + (scoutInput !== null ? 1 : 0) + (analystInput !== null ? 1 : 0)) / 3
const perfConf = perfDataComp * trust * maturity

const perfContrib = perfScores.snapshot * 8 + perfScores.scout * 12 + perfScores.analyst * 20
console.log(`  Scores: snap=${perfScores.snapshot.toFixed(4)}, scout=${perfScores.scout.toFixed(4)}, analyst=${perfScores.analyst.toFixed(4)}`)
console.log(`  Contribution: ${perfScores.snapshot.toFixed(4)}×8 + ${perfScores.scout.toFixed(4)}×12 + ${perfScores.analyst.toFixed(4)}×20`)
console.log(`    = ${(perfScores.snapshot*8).toFixed(3)} + ${(perfScores.scout*12).toFixed(3)} + ${(perfScores.analyst*20).toFixed(3)} = ${perfContrib.toFixed(3)}`)
console.log(`  Confidence: dataComp=${perfDataComp.toFixed(3)} × trust=${trust} × maturity=${maturity} = ${perfConf.toFixed(4)}`)

// --- KNOWLEDGE SCORING ---
const k = player.knowledge
const bio = k?.bio
const scout = k?.scout
const career = k?.career

// bioSnapshot
const bioSnapshotScore = bio ? 0.8 : 0.3
const bioSnapshotPop = bio ? 1 : 0

// bioScout — looks at bio.snapshot.archetype etc (NOT bio.scout!)
const bioScoutInputs = [
  bio?.snapshot?.archetype,
  bio?.snapshot?.developmentPath,
  bio?.snapshot?.physicalProjection,
  bio?.snapshot?.riskProfile
].filter(Boolean)
const bioScoutScore = safeAverageArray(bioScoutInputs.map(v => {
  // scoreBioCategorical
  if (!v) return 0.5
  const s = String(v).toLowerCase()
  if (["elite","premium","priority","established"].includes(s)) return 1
  if (["strong","durable","accelerating"].includes(s)) return 0.85
  if (["solid","balanced","steady","viable","mid"].includes(s)) return 0.65
  if (["moderate","progressing","neutral"].includes(s)) return 0.5
  if (["raw","limited","uncertain"].includes(s)) return 0.3
  if (["low","fragile","high"].includes(s)) return 0.2
  return 0.5
}))
const bioScoutPop = bioScoutInputs.length

// bioAnalyst — looks at bio.analyst.serviceTime/value/orgRole/development/risk
const bioAnalystInputs = [
  bio?.analyst?.serviceTime,
  bio?.analyst?.value,
  bio?.analyst?.orgRole,
  bio?.analyst?.development,
  bio?.analyst?.risk
].filter(Boolean)  // 0 is falsy! serviceTime=0 gets filtered
const bioAnalystScore = safeAverageArray(bioAnalystInputs.map(v => {
  if (!v) return 0.5
  const s = String(v).toLowerCase()
  if (["elite","premium","priority","established"].includes(s)) return 1
  if (["strong","durable","accelerating"].includes(s)) return 0.85
  if (["solid","balanced","steady","viable","mid"].includes(s)) return 0.65
  if (["moderate","progressing","neutral"].includes(s)) return 0.5
  if (["raw","limited","uncertain"].includes(s)) return 0.3
  if (["low","fragile","high"].includes(s)) return 0.2
  return 0.5
}))
const bioAnalystPop = bioAnalystInputs.length

const kConf = (bioSnapshotPop + bioScoutPop + bioAnalystPop) / (1 + 4 + 5)

console.log("\n═══ KNOWLEDGE LAYER ═══")
console.log(`  bioSnapshot: score=${bioSnapshotScore}, pop=${bioSnapshotPop}/1`)
console.log(`  bioScout: inputs found=[${bioScoutInputs.map(v=>`"${v}"`).join(",")}], score=${bioScoutScore}, pop=${bioScoutPop}/4`)
console.log(`    NOTE: looked at bio.snapshot.{archetype,developmentPath,physicalProjection,riskProfile}`)
console.log(`    bio.snapshot keys: ${Object.keys(bio?.snapshot??{}).join(",")}`)
console.log(`  bioAnalyst: inputs found=[${bioAnalystInputs.join(",")}], score=${bioAnalystScore}, pop=${bioAnalystPop}/5`)
console.log(`    NOTE: looked at bio.analyst.{serviceTime,value,orgRole,development,risk}`)
console.log(`    bio.analyst.serviceTime=${bio?.analyst?.serviceTime} (0 = falsy, filtered out)`)
console.log(`  Knowledge confidence: (${bioSnapshotPop}+${bioScoutPop}+${bioAnalystPop})/(1+4+5) = ${kConf.toFixed(4)}`)

// scout snapshot
const scoutSnapScore = scoreFromAlreadyNormalized([
  { value: textSignalScore(scout?.snapshot?.primaryTool) },
  { value: textSignalScore(scout?.snapshot?.roleType) }
])
console.log(`\n  scoutSnapshot:`)
console.log(`    primaryTool=${JSON.stringify(scout?.snapshot?.primaryTool)} → textSignalScore=${textSignalScore(scout?.snapshot?.primaryTool).toFixed(4)}`)
console.log(`    roleType=${JSON.stringify(scout?.snapshot?.roleType)} → textSignalScore=${textSignalScore(scout?.snapshot?.roleType).toFixed(4)}`)
console.log(`    avg score=${scoutSnapScore.avg.toFixed(4)}`)

// scout scout (tool grades)
const toolGrades = readRoleToolGrades(scout?.scout, true)
const scoutScoutScore = scoreFromAlreadyNormalized(toolGrades.map(({normalized}) => ({ value: normalized })))
console.log(`  scoutScout: tools=${toolGrades.map(g=>`${g.key}=${g.value}→${g.normalized?.toFixed(3)}`).join(", ")}`)
console.log(`    avg score=${scoutScoutScore.avg.toFixed(4)}`)

// scout analyst
const scoutAnalystScore = scoreFromAlreadyNormalized([
  { value: readNumber(scout?.analystScores, "ceiling") },
  { value: readNumber(scout?.analystScores, "floor") }
])
console.log(`  scoutAnalyst: ceiling=${readNumber(scout?.analystScores,"ceiling")}, floor=${readNumber(scout?.analystScores,"floor")} → avg=${scoutAnalystScore.avg.toFixed(4)}`)

// career snapshot
const careerSnapScore = scoreFromAlreadyNormalized([
  { value: textSignalScore(career?.snapshot?.draftPedigree) }
])
console.log(`  careerSnapshot: draftPedigree="${career?.snapshot?.draftPedigree}" → ${textSignalScore(career?.snapshot?.draftPedigree).toFixed(4)} → score=${careerSnapScore.avg.toFixed(4)}`)

// career scout
const careerScoutScore = scoreFromAlreadyNormalized([
  { value: textSignalScore(career?.scout?.projectionPath) }
])
console.log(`  careerScout: projectionPath="${career?.scout?.projectionPath}" → ${textSignalScore(career?.scout?.projectionPath).toFixed(4)} → score=${careerScoutScore.avg.toFixed(4)}`)

// career analyst
const careerAnalystScore = scoreFromAlreadyNormalized([
  { value: readNumber(career?.analystScores, "timeline") }
])
console.log(`  careerAnalyst: timeline=${readNumber(career?.analystScores,"timeline")} → score=${careerAnalystScore.avg.toFixed(4)}`)

const kScores = {
  bio:    { snapshot: bioSnapshotScore,       scout: bioScoutScore,       analyst: bioAnalystScore },
  scout:  { snapshot: scoutSnapScore.avg,     scout: scoutScoutScore.avg, analyst: scoutAnalystScore.avg },
  career: { snapshot: careerSnapScore.avg,    scout: careerScoutScore.avg, analyst: careerAnalystScore.avg }
}

let kContrib = 0
for (const page of ['bio','scout','career']) {
  for (const sub of ['snapshot','scout','analyst']) {
    kContrib += clamp01(kScores[page][sub]) * KNOWLEDGE_PAGE_POINTS[page][sub]
  }
}
const kComponent = kContrib / LAYER_MAX_POINTS.knowledge
console.log(`\n  Scores breakdown:`)
for (const page of ['bio','scout','career']) {
  for (const sub of ['snapshot','scout','analyst']) {
    const s = kScores[page][sub]
    const m = KNOWLEDGE_PAGE_POINTS[page][sub]
    console.log(`    ${page.padEnd(8)} / ${sub.padEnd(10)}: ${s.toFixed(4)} × ${m} = ${(clamp01(s)*m).toFixed(3)}`)
  }
}
console.log(`  Knowledge contribution: ${kContrib.toFixed(3)} / ${LAYER_MAX_POINTS.knowledge} (component: ${kComponent.toFixed(4)})`)

// --- MEDIA SCORING ---
const m = player.media
const mSnap = scoreFromAlreadyNormalized([
  { value: m?.snapshot?.mentions }, { value: m?.snapshot?.headlineImpact },
  { value: m?.snapshot?.highlightFactor }, { value: m?.snapshot?.socialBuzz }
])
const mScout = scoreFromAlreadyNormalized([
  { value: m?.scout?.fanRecognition }, { value: m?.scout?.teamVisibility },
  { value: m?.scout?.interviewPresence }, { value: m?.scout?.narrativeStrength },
  { value: m?.scout?.milestoneAttention }
])
const mAnalyst = scoreFromAlreadyNormalized([
  { value: m?.analyst?.prospectPedigree }, { value: m?.analyst?.hypeTrend },
  { value: m?.analyst?.mediaStability }, { value: m?.analyst?.storyDurability },
  { value: m?.analyst?.breakoutProbability }, { value: m?.analyst?.publicMomentum },
  { value: m?.analyst?.attentionDecay }, { value: m?.analyst?.confidence }
])

const mContrib = mSnap.avg * 4 + mScout.avg * 6 + mAnalyst.avg * 8
const mComponent = mContrib / LAYER_MAX_POINTS.media
const mConf = (mSnap.populated + mScout.populated + mAnalyst.populated) / (mSnap.expected + mScout.expected + mAnalyst.expected)
console.log("\n═══ MEDIA LAYER ═══")
console.log(`  snapshot: avg=${mSnap.avg.toFixed(4)} × 4 = ${(mSnap.avg*4).toFixed(3)}`)
console.log(`  scout:    avg=${mScout.avg.toFixed(4)} × 6 = ${(mScout.avg*6).toFixed(3)}`)
console.log(`  analyst:  avg=${mAnalyst.avg.toFixed(4)} × 8 = ${(mAnalyst.avg*8).toFixed(3)}`)
console.log(`  Contribution: ${mContrib.toFixed(3)} / ${LAYER_MAX_POINTS.media} (component: ${mComponent.toFixed(4)})`)

// --- MARKET SCORING ---
// No marketSnapshot → defaults 0.5/0.5/0.5
const mkScores = { snapshot: 0.5, scout: 0.5, analyst: 0.5 }
const mkContrib = 0.5*5 + 0.5*7 + 0.5*12
const mkComponent = mkContrib / LAYER_MAX_POINTS.market
console.log("\n═══ MARKET LAYER ═══")
console.log(`  No marketSnapshot → all 0.5 defaults`)
console.log(`  Contribution: ${mkContrib.toFixed(3)} / ${LAYER_MAX_POINTS.market} (component: ${mkComponent.toFixed(4)})`)

// --- FINAL TOTAL ---
const total = kContrib + perfContrib + mContrib + mkContrib
const rating = Math.max(0, Math.min(100, Math.round(total * 10) / 10))
console.log("\n╔══════════════════════════════════════════════════════════╗")
console.log("║  FINAL RESULT                                            ║")
console.log("╚══════════════════════════════════════════════════════════╝")
console.log(`  Knowledge:    ${kContrib.toFixed(3)} / 18`)
console.log(`  Performance:  ${perfContrib.toFixed(3)} / 40`)
console.log(`  Media:        ${mContrib.toFixed(3)} / 18`)
console.log(`  Market:       ${mkContrib.toFixed(3)} / 24`)
console.log(`  Raw total:    ${total.toFixed(3)} / 100`)
console.log(`  RATING (1dp): ${rating}`)
console.log(``)
console.log(`  Vault shows:  17.0`)
console.log(`  Match:        ${rating === 17.0 ? 'YES ✓' : 'NO — DISCREPANCY FOUND'}`)

// --- TASK 3: What if hydration were wired? ---
console.log("\n═══ TASK 3: HYDRATION ANALYSIS ═══")
console.log("  calculateDLR does NOT read player.dlr.persistedScore")
console.log("  calculateDLR does NOT read player.dlr.monthlySettledScore")
console.log("  applyPersistedDLR writes to player.dlr.persistedScore")
console.log("  → These are consumed by calculateDLRMovement(), NOT calculateDLR()")
console.log("  → Injecting persistedScore=50 changes ZERO in the composition")
console.log(`  → Hydrated result would be identical: ${rating}`)
console.log("  → The vault's DLR number cannot be fixed by wiring hydration alone")

// --- TASK 4 SUMMARY ---
console.log("\n═══ TASK 4: VAULT READ PATH TRACE ═══")
console.log("  app/vault/page.tsx")
console.log("    'use client' — Server-side functions cannot run here")
console.log("    imports eli_willits via playersDraft2025 (spread as ...eli_willits)")
console.log("    selectedPlayer = dataset.find(p => p.id === selectedPlayerId)")
console.log("    dlrResult = useMemo(() => calculateDLR(selectedPlayer)) at line 144")
console.log("    dlr = dlrResult?.rating ?? 0")
console.log("    <HeroVault dlr={dlr} /> at line 387")
console.log("")
console.log("    fetchPersistedDLR:     NOT CALLED")
console.log("    fetchMonthlySettlement: NOT CALLED")
console.log("    applyPersistedDLR:     NOT CALLED")
console.log("    applyMonthlySettlement: NOT CALLED")
console.log("")
console.log("  CRITICAL: hydrateDLR.ts is SERVER-SIDE ONLY (documented)")
console.log("  page.tsx is 'use client' — hydration functions cannot be called from it")
console.log("  There is NO useEffect, server action, or RSC layer bridging the gap")

// ─── SIGNATURE ANALYSIS: WHAT PRODUCES 17.0? ─────────────────────────────────
console.log("\n╔══════════════════════════════════════════════════════════╗")
console.log("║  17.0 SIGNATURE ANALYSIS                                 ║")
console.log("╚══════════════════════════════════════════════════════════╝")

// Compute what an empty player would score
const emptyKnowledge = 
  0.3*1 + 0.5*2 + 0.5*3 +   // bio: no bio → 0.3, no scout inputs → 0.5, no analyst inputs → 0.5
  0.55*1 + 0*2 + 0*3 +       // scout: fallback 0.55, tools=0, analyst=0  
  0.55*1 + 0.55*2 + 0*3      // career: fallback 0.55, fallback 0.55, no timeline → 0
const emptyPerf = 0           // no data → 0 × all weights
const emptyMedia = 0          // no data → 0 × all weights
const emptyMarket = 12.0      // 0.5×5 + 0.5×7 + 0.5×12 = 12 (market defaults)

console.log(`  Empty player knowledge: ${emptyKnowledge.toFixed(3)}`)
console.log(`  Empty player performance: ${emptyPerf}`)
console.log(`  Empty player media: ${emptyMedia}`)  
console.log(`  Empty player market (defaults): ${emptyMarket}`)
console.log(`  Empty player TOTAL: ${(emptyKnowledge + emptyPerf + emptyMedia + emptyMarket).toFixed(1)}`)
console.log("")
console.log(`  17.0 IS the exact empty-player floor score.`)
console.log(`  Full Willits data scores: 55.7`)
console.log(`  Difference: 38.7 points unaccounted for`)
console.log("")
console.log("  CONCLUSION: calculateDLR is receiving a player object WITHOUT")
console.log("  knowledge/performance/media/tracker data.")
console.log("")
console.log("  Possible causes:")
console.log("  1. A different player (not eli_willits) is selected in the vault")
console.log("  2. playersDraft2025 is exporting eli_willits WITHOUT its nested data")
console.log("  3. The player object loses its nested data during React state transitions")
console.log("  4. There's a different eli_willits-shaped object without full data")
