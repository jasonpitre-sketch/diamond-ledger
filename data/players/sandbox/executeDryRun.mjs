/**
 * SANDBOX EXECUTION SCRIPT — NON-PRODUCTION
 * Self-contained dry-run of the 2018 draft cohort migration + enrichment pipeline.
 * Uses inline logic (no TypeScript imports) to produce real statistics.
 * Run with: node data/players/sandbox/executeDryRun.mjs
 */

/* ============================================================
   INLINE COHORT DATA — 2018 Draft
   (alec_bohm and casey_mize represented with their known domain
    status; all others as minimal inline players)
   ============================================================ */

const cohort2018 = [
  // Domain-file players (Tier A) — represented with key domain signals
  { id: "alec_bohm",   name: "Alec Bohm",   team: "PHI", position: "3B",  tier: "MLB", age: 27, draftYear: 2018, draftPick: 3,   bats: "R", throws: "R", __format: "domain",
    knowledge: { bio: { snapshot: { archetype: "solid" } }, scout: { scout: { hit: 55, power: 50, run: 45, arm: 55, field: 50 }, analystScores: { ceiling: 0.65, floor: 0.45 } }, career: { analystScores: { timeline: 0.6 } } },
    performance: { kind: "hitter", snapshot: { AVG: 0.278 }, scout: { kRate: 0.18 }, analyst: { xAVG: 0.265 } },
    media: { snapshot: { mentions: 0.55, headlineImpact: 0.52, highlightFactor: 0.48, socialBuzz: 0.50 }, scout: { fanRecognition: 0.60, teamVisibility: 0.55, interviewPresence: 0.42, narrativeStrength: 0.58, milestoneAttention: 0.50 }, analyst: { prospectPedigree: 0.78, hypeTrend: 0.45, mediaStability: 0.55, storyDurability: 0.52, breakoutProbability: 0.48, publicMomentum: 0.50, attentionDecay: 0.60, confidence: 0.60 } },
    cardMarket: { liquidity: 0.55, trend: 0.48, scarcity: 0.62, depth: 0.50, volatility: 0.45, longTerm: 0.60, stability: 0.55, confidence: 0.58 },
    signals: { tracked: false, heat: null, price: null }
  },
  { id: "casey_mize",  name: "Casey Mize",  team: "DET", position: "RHP", tier: "MLB", age: 28, draftYear: 2018, draftPick: 1,   bats: "R", throws: "R", __format: "domain",
    knowledge: { bio: { snapshot: { archetype: "elite" } }, scout: { scout: { fastball: 65, breaking: 70, offspeed: 60, command: 65, control: 65 }, analystScores: { ceiling: 0.88, floor: 0.55 } }, career: { analystScores: { timeline: 0.7 } } },
    performance: { kind: "pitcher", snapshot: { ERA: 3.90 }, scout: { kPercent: 0.228 }, analyst: { xERA: 3.75 } },
    media: { snapshot: { mentions: 0.46, headlineImpact: 0.50, highlightFactor: 0.36, socialBuzz: 0.41 }, scout: { fanRecognition: 0.58, teamVisibility: 0.48, interviewPresence: 0.44, narrativeStrength: 0.63, milestoneAttention: 0.52 }, analyst: { prospectPedigree: 0.92, hypeTrend: 0.42, mediaStability: 0.39, storyDurability: 0.57, breakoutProbability: 0.53, publicMomentum: 0.41, attentionDecay: 0.68, confidence: 0.58 } },
    cardMarket: { liquidity: 0.62, trend: 0.55, scarcity: 0.78, depth: 0.45, volatility: 0.52, longTerm: 0.72, stability: 0.60, confidence: 0.65 },
    signals: { tracked: false, heat: null, price: null }
  },
  // Minimal inline players (no scouting, no dlr)
  { id: "brady_singer",        name: "Brady Singer",        team: "KC",  position: "RHP", tier: "MLB", age: 29, draftYear: 2018, draftPick: 18,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "nick_madrigal",       name: "Nick Madrigal",       team: "CWS", position: "2B",  tier: "AAA", age: 29, draftYear: 2018, draftPick: 4,   bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "matthew_liberatore",  name: "Matthew Liberatore",  team: "STL", position: "LHP", tier: "MLB", age: 26, draftYear: 2018, draftPick: 16,  bats: "L", throws: "L", signals: { tracked: false, heat: null, price: null } },
  { id: "mason_denaburg",      name: "Mason Denaburg",      team: "WSH", position: "RHP", tier: "A+",  age: 26, draftYear: 2018, draftPick: 27,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "brice_turang",        name: "Brice Turang",        team: "MIL", position: "SS",  tier: "MLB", age: 26, draftYear: 2018, draftPick: 21,  bats: "L", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "trevor_larnach",      name: "Trevor Larnach",      team: "MIN", position: "OF",  tier: "MLB", age: 29, draftYear: 2018, draftPick: 20,  bats: "L", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "bo_naylor",           name: "Bo Naylor",           team: "CLE", position: "C",   tier: "MLB", age: 26, draftYear: 2018, draftPick: 29,  bats: "L", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "xavier_edwards",      name: "Xavier Edwards",      team: "MIA", position: "2B",  tier: "MLB", age: 26, draftYear: 2018, draftPick: 38,  bats: "S", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "jeremy_eierman",      name: "Jeremy Eierman",      team: "OAK", position: "SS",  tier: "AA",  age: 29, draftYear: 2018, draftPick: 70,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "steele_walker",       name: "Steele Walker",       team: "TEX", position: "OF",  tier: "AAA", age: 29, draftYear: 2018, draftPick: 46,  bats: "L", throws: "L", signals: { tracked: false, heat: null, price: null } },
  { id: "jordan_groshans",     name: "Jordan Groshans",     team: "MIA", position: "3B",  tier: "AA",  age: 26, draftYear: 2018, draftPick: 12,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "jameson_hannah",      name: "Jameson Hannah",      team: "OAK", position: "OF",  tier: "AAA", age: 28, draftYear: 2018, draftPick: 50,  bats: "L", throws: "L", signals: { tracked: false, heat: null, price: null } },
  { id: "jt_ginn",             name: "J.T. Ginn",           team: "LAD", position: "RHP", tier: "MLB", age: 26, draftYear: 2018, draftPick: 30,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "will_banfield",       name: "Will Banfield",       team: "MIA", position: "C",   tier: "AAA", age: 26, draftYear: 2018, draftPick: 69,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "tristan_beck",        name: "Tristan Beck",        team: "ATL", position: "RHP", tier: "AAA", age: 29, draftYear: 2018, draftPick: 112, bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "jordyn_adams",        name: "Jordyn Adams",        team: "LAA", position: "OF",  tier: "AA",  age: 26, draftYear: 2018, draftPick: 17,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "nick_schnell",        name: "Nick Schnell",        team: "TB",  position: "OF",  tier: "AAA", age: 26, draftYear: 2018, draftPick: 32,  bats: "L", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "jake_mccarthy",       name: "Jake McCarthy",       team: "ARI", position: "OF",  tier: "MLB", age: 28, draftYear: 2018, draftPick: 39,  bats: "L", throws: "L", signals: { tracked: false, heat: null, price: null } },
  { id: "michael_siani",       name: "Michael Siani",       team: "CIN", position: "OF",  tier: "AAA", age: 26, draftYear: 2018, draftPick: 109, bats: "L", throws: "L", signals: { tracked: false, heat: null, price: null } },
  { id: "alek_thomas",         name: "Alek Thomas",         team: "ARI", position: "OF",  tier: "MLB", age: 25, draftYear: 2018, draftPick: 63,  bats: "L", throws: "L", signals: { tracked: false, heat: null, price: null } },
  { id: "parker_meadows",      name: "Parker Meadows",      team: "DET", position: "OF",  tier: "MLB", age: 26, draftYear: 2018, draftPick: 44,  bats: "L", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "adam_kloffenstein",   name: "Adam Kloffenstein",   team: "STL", position: "RHP", tier: "AAA", age: 25, draftYear: 2018, draftPick: 88,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "sean_hjelle",         name: "Sean Hjelle",         team: "SF",  position: "RHP", tier: "AAA", age: 28, draftYear: 2018, draftPick: 45,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "seth_beer",           name: "Seth Beer",           team: "ARI", position: "1B",  tier: "AA",  age: 29, draftYear: 2018, draftPick: 28,  bats: "L", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "anthony_seigler",     name: "Anthony Seigler",     team: "NYY", position: "C",   tier: "AAA", age: 26, draftYear: 2018, draftPick: 23,  bats: "S", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "lenny_torres",        name: "Lenny Torres Jr.",    team: "CLE", position: "RHP", tier: "AA",  age: 25, draftYear: 2018, draftPick: 41,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "blaine_knight",       name: "Blaine Knight",       team: "BAL", position: "RHP", tier: "AAA", age: 29, draftYear: 2018, draftPick: 87,  bats: "R", throws: "R", signals: { tracked: false, heat: null, price: null } },
  { id: "kris_bubic",          name: "Kris Bubic",          team: "KC",  position: "LHP", tier: "MLB", age: 28, draftYear: 2018, draftPick: 40,  bats: "L", throws: "L", signals: { tracked: false, heat: null, price: null } },
  { id: "griffin_conine",      name: "Griffin Conine",      team: "MIA", position: "OF",  tier: "MLB", age: 28, draftYear: 2018, draftPick: 52,  bats: "L", throws: "R", signals: { tracked: false, heat: null, price: null } },
]

/* ============================================================
   INLINE PIPELINE LOGIC (mirrors TS pipeline without imports)
   ============================================================ */

const PITCHER_POSITIONS = new Set(["P","SP","RP","CP","LHP","RHP","LHRP","RHRP"])
const isPitcher = pos => PITCHER_POSITIONS.has((pos ?? "").toUpperCase().trim())

const NEUTRAL_MEDIA = {
  snapshot: { mentions:0.5, headlineImpact:0.5, highlightFactor:0.5, socialBuzz:0.5 },
  scout:    { fanRecognition:0.5, teamVisibility:0.5, interviewPresence:0.5, narrativeStrength:0.5, milestoneAttention:0.5 },
  analyst:  { prospectPedigree:0.5, hypeTrend:0.5, mediaStability:0.5, storyDurability:0.5, breakoutProbability:0.5, publicMomentum:0.5, attentionDecay:0.5, confidence:0.5 }
}
const NEUTRAL_CARDMARKET = { liquidity:0.5, trend:0.5, scarcity:0.5, depth:0.5, volatility:0.5, longTerm:0.5, stability:0.5, confidence:0.5 }
const NEUTRAL_BIO_SNAP = { archetype:"neutral", developmentPath:"neutral", physicalProjection:"neutral", riskProfile:"neutral" }
const NEUTRAL_BIO_ANALYST = { serviceTime:"neutral", value:"neutral", orgRole:"neutral", development:"neutral", risk:"neutral" }
const NEUTRAL_SCOUT_SNAP = { primaryTool:"neutral", roleType:"neutral" }
const NEUTRAL_SCOUT_ANALYST = { ceiling:0.5, floor:0.5 }
const NEUTRAL_CAREER_SNAP = { draftPedigree:"neutral" }
const NEUTRAL_CAREER_SCOUT = { projectionPath:"neutral" }
const NEUTRAL_CAREER_ANALYST = { timeline:0.5 }

function fillNeutral(existing, neutral) {
  if (!existing) return { ...neutral }
  const result = { ...existing }
  for (const [k, v] of Object.entries(neutral)) {
    if (result[k] == null) result[k] = v
  }
  return result
}

function enrichPlayerInline(player) {
  const scaffolded = []
  let media = player.media
  let cardMarket = player.cardMarket
  let knowledge = player.knowledge

  // Media enrichment
  if (!media) { media = JSON.parse(JSON.stringify(NEUTRAL_MEDIA)); scaffolded.push("media") }
  else {
    media = {
      snapshot: fillNeutral(media.snapshot, NEUTRAL_MEDIA.snapshot),
      scout:    fillNeutral(media.scout, NEUTRAL_MEDIA.scout),
      analyst:  fillNeutral(media.analyst, NEUTRAL_MEDIA.analyst),
    }
  }

  // CardMarket enrichment
  if (!cardMarket) { cardMarket = { ...NEUTRAL_CARDMARKET }; scaffolded.push("cardMarket") }
  else {
    cardMarket = { ...NEUTRAL_CARDMARKET, ...cardMarket }
  }

  // Knowledge enrichment (bio + career scaffolding; never touch scout.scout)
  if (!knowledge) knowledge = {}
  const bio = knowledge.bio ?? {}
  const scout = knowledge.scout ?? {}
  const career = knowledge.career ?? {}
  knowledge = {
    bio: {
      ...bio,
      snapshot: fillNeutral(bio.snapshot, NEUTRAL_BIO_SNAP),
      analyst:  fillNeutral(bio.analyst, NEUTRAL_BIO_ANALYST),
    },
    scout: {
      ...scout,
      snapshot: fillNeutral(scout.snapshot, NEUTRAL_SCOUT_SNAP),
      analystScores: fillNeutral(scout.analystScores, NEUTRAL_SCOUT_ANALYST),
      scout: scout.scout, // real tool grades — never overwritten
    },
    career: {
      ...career,
      snapshot:      fillNeutral(career.snapshot, NEUTRAL_CAREER_SNAP),
      scout:         fillNeutral(career.scout, NEUTRAL_CAREER_SCOUT),
      analystScores: fillNeutral(career.analystScores, NEUTRAL_CAREER_ANALYST),
    }
  }
  if (!player.knowledge) scaffolded.push("knowledge.bio", "knowledge.career")

  return { ...player, media, cardMarket, knowledge, __scaffolded: scaffolded }
}

/* ---- Inline DLR scorer (mirrors calculateDLR.ts logic) ---- */

function clamp01(v) { return Math.max(0, Math.min(1, v ?? 0)) }

function safeAvg(arr) {
  const valid = arr.filter(v => v !== null && v !== undefined && !isNaN(v))
  if (!valid.length) return { avg: 0.5, populated: 0, expected: arr.length }
  return { avg: valid.reduce((a,b) => a+b, 0) / valid.length, populated: valid.length, expected: arr.length }
}

// Anchor configs from dlrConfig (approximated for scoring simulation)
const ANCHORS = {
  AVG:     { low: 0.220, high: 0.300 },
  ERA:     { low: 5.50,  high: 2.50, invert: true },
  K_pct_h: { low: 0.30,  high: 0.15, invert: true }, // kRate hitter
  K_pct_p: { low: 0.10,  high: 0.28 },               // kPercent pitcher
  xAVG:    { low: 0.220, high: 0.290 },
  xERA:    { low: 5.50,  high: 2.50, invert: true },
}

function linearNorm(v, anchor) {
  if (v === null || v === undefined || isNaN(v)) return null
  const { low, high, invert } = anchor
  const norm = (v - low) / (high - low)
  return clamp01(invert ? 1 - norm : norm)
}

function scoreBioCat(v) {
  if (!v) return 0.5
  const s = String(v).toLowerCase()
  if (["elite","premium","priority","established"].includes(s)) return 1
  if (["strong","durable","accelerating"].includes(s)) return 0.85
  if (["solid","balanced","steady","viable","mid"].includes(s)) return 0.65
  if (["moderate","progressing","neutral"].includes(s)) return 0.5
  if (["raw","limited","uncertain"].includes(s)) return 0.3
  return 0.5
}

function textSignalScore(v) {
  if (!v) return null
  const s = String(v).toLowerCase()
  const map = {
    elite:0.95,premium:0.9,strong:0.8,solid:0.65,moderate:0.5,neutral:0.5,
    limited:0.3,raw:0.25,uncertain:0.3,rising:0.75,trending:0.7,declining:0.25
  }
  return map[s] ?? 0.5
}

function calcDLR(player) {
  const pos = player.position ?? player.pos ?? ""
  const pitch = isPitcher(pos)
  const k = player.knowledge ?? {}
  const p = player.performance ?? {}
  const m = player.media ?? {}

  // Knowledge
  const bio = k.bio ?? {}
  const bioSnapInputs = [bio.snapshot?.archetype, bio.snapshot?.developmentPath, bio.snapshot?.physicalProjection, bio.snapshot?.riskProfile].filter(Boolean)
  const bioSnap = bioSnapInputs.length ? bioSnapInputs.reduce((s,v)=>s+scoreBioCat(v),0)/bioSnapInputs.length : 0.3
  const bioAnaInputs = [bio.analyst?.serviceTime, bio.analyst?.value, bio.analyst?.orgRole, bio.analyst?.development, bio.analyst?.risk].filter(Boolean)
  const bioAna = bioAnaInputs.length ? bioAnaInputs.reduce((s,v)=>s+scoreBioCat(v),0)/bioAnaInputs.length : 0.3

  const scoutSnap = safeAvg([textSignalScore(k.scout?.snapshot?.primaryTool), textSignalScore(k.scout?.snapshot?.roleType)]).avg
  const toolGrades = k.scout?.scout ? Object.values(k.scout.scout).filter(v => typeof v === 'number' && v > 0) : []
  const scoutScout = toolGrades.length ? toolGrades.reduce((s,v)=>s+(v-20)/60, 0)/toolGrades.length : 0.5
  const scoutAna = safeAvg([k.scout?.analystScores?.ceiling, k.scout?.analystScores?.floor]).avg

  const carSnap = safeAvg([textSignalScore(k.career?.snapshot?.draftPedigree)]).avg
  const carScout = safeAvg([textSignalScore(k.career?.scout?.projectionPath)]).avg
  const carAna = safeAvg([k.career?.analystScores?.timeline]).avg

  // Knowledge layer points (18 max): bio 1+2+3=6, scout 1+2+3=6, career 1+2+3=6
  const kBio   = (bioSnap * 1 + bioSnap * 2 + bioAna * 3) / 6 * 18 / 3
  const kScout = (scoutSnap * 1 + scoutScout * 2 + scoutAna * 3) / 6 * 18 / 3
  const kCar   = (carSnap * 1 + carScout * 2 + carAna * 3) / 6 * 18 / 3
  const kScore = (kBio + kScout + kCar)

  // Performance layer (40 max)
  const snapScore = pitch
    ? safeAvg([linearNorm(p.snapshot?.ERA, ANCHORS.ERA)]).avg
    : safeAvg([linearNorm(p.snapshot?.AVG, ANCHORS.AVG)]).avg
  const scoutScore = pitch
    ? safeAvg([linearNorm(p.scout?.kPercent, ANCHORS.K_pct_p)]).avg
    : safeAvg([linearNorm(p.scout?.kRate, ANCHORS.K_pct_h)]).avg
  const analystScore = pitch
    ? safeAvg([linearNorm(p.analyst?.xERA, ANCHORS.xERA)]).avg
    : safeAvg([linearNorm(p.analyst?.xAVG, ANCHORS.xAVG)]).avg
  const pScoreNorm = (snapScore * 8 + scoutScore * 12 + analystScore * 20) / 40
  const pScore = pScoreNorm * 40

  // Media layer (18 max)
  const mSnap = safeAvg([m.snapshot?.mentions, m.snapshot?.headlineImpact, m.snapshot?.highlightFactor, m.snapshot?.socialBuzz]).avg
  const mScout = safeAvg([m.scout?.fanRecognition, m.scout?.teamVisibility, m.scout?.interviewPresence, m.scout?.narrativeStrength, m.scout?.milestoneAttention]).avg
  const mAna = safeAvg([m.analyst?.prospectPedigree, m.analyst?.hypeTrend, m.analyst?.mediaStability, m.analyst?.storyDurability, m.analyst?.breakoutProbability, m.analyst?.publicMomentum, m.analyst?.attentionDecay, m.analyst?.confidence]).avg
  const mScore = (mSnap * 4 + mScout * 6 + mAna * 8) / 18 * 18

  // Market (24 max) — no marketSnapshot, all neutral → 0.5 * 24 = 12
  const marketScore = 12

  const totalScore = Math.round(kScore + pScore + mScore + marketScore)

  // Confidence (simplified)
  const perfFields = [p.snapshot?.AVG ?? p.snapshot?.ERA, p.scout?.kRate ?? p.scout?.kPercent, p.analyst?.xAVG ?? p.analyst?.xERA]
  const perfPop = perfFields.filter(v => v !== null && v !== undefined).length
  const perfConf = (perfPop / 3) * 0.6 // 0.6 sample floor
  const mediaConf = (Object.keys(m.snapshot ?? {}).length + Object.keys(m.scout ?? {}).length + Object.keys(m.analyst ?? {}).length) / 17
  const knowledgeConf = (bioSnapInputs.length + bioAnaInputs.length) / 9
  const overallConf = (knowledgeConf + perfConf + mediaConf + 0.5) / 4

  return { score: Math.max(0, Math.min(100, totalScore)), confidence: overallConf }
}

function getEnrichmentTier(player) {
  const hasTools = !!(player.knowledge?.scout?.scout && Object.values(player.knowledge.scout.scout).some(v => typeof v === 'number' && v > 0))
  const hasPerf = !!(player.performance?.snapshot && Object.values(player.performance.snapshot).some(v => v !== null && v !== undefined))
  const mediaAllNeutral = (() => {
    const m = player.media
    if (!m) return true
    const all = [...Object.values(m.snapshot ?? {}), ...Object.values(m.scout ?? {}), ...Object.values(m.analyst ?? {})]
    return all.every(v => v === 0.5)
  })()
  const hasRealMedia = !mediaAllNeutral
  const hasMarket = !!(player.cardMarket && Object.values(player.cardMarket).some(v => v !== null && v !== undefined && v !== 0.5))

  if (hasPerf && hasRealMedia && (hasMarket || hasTools)) return "A"
  if (hasTools || hasPerf) return "B"
  return "C"
}

/* ============================================================
   EXECUTE PIPELINE
   ============================================================ */

let domainCount = 0, minimalCount = 0, legacyCount = 0
let enrichedCount = 0, failedCount = 0
const dlrScores = []
const tiers = { A: 0, B: 0, C: 0 }
const completenessValues = []
const playerResults = []
const missingDomainCounts = {}

for (const source of cohort2018) {
  const format = source.__format === "domain" ? "domain"
    : source.scouting ? "legacy"
    : "minimal"

  if (format === "domain") domainCount++
  else if (format === "legacy") legacyCount++
  else minimalCount++

  let enriched
  const issues = []

  try {
    enriched = enrichPlayerInline(source)
    enrichedCount++
  } catch(e) {
    failedCount++
    issues.push({ severity: "error", message: e.message })
    continue
  }

  const dlr = calcDLR(enriched)
  const tier = getEnrichmentTier(enriched)
  tiers[tier]++
  dlrScores.push(dlr.score)

  // Completeness: 5 slots
  let pop = 0
  const tools = enriched.knowledge?.scout?.scout
  if (tools && Object.values(tools).some(v => typeof v === 'number' && v > 0)) pop++
  if (enriched.knowledge?.career?.analystScores || enriched.knowledge?.bio) pop++
  if (enriched.performance?.snapshot && Object.values(enriched.performance.snapshot).some(v => v != null)) pop++
  const mediaAllNeutral = !enriched.media ? true : (() => { const all = [...Object.values(enriched.media?.snapshot ?? {}), ...Object.values(enriched.media?.scout ?? {}), ...Object.values(enriched.media?.analyst ?? {})]; return all.every(v => v === 0.5) })()
  if (!mediaAllNeutral) pop++
  const marketSub = enriched.cardMarket && Object.values(enriched.cardMarket).some(v => v !== null && v !== undefined && v !== 0.5)
  if (marketSub) pop++
  const completeness = pop / 5
  completenessValues.push(completeness)

  const missing = []
  if (!enriched.knowledge?.scout?.scout || !Object.values(enriched.knowledge.scout.scout).some(v => typeof v === 'number' && v > 0)) missing.push("knowledge.tools")
  if (!enriched.performance?.snapshot) missing.push("performance")
  if (mediaAllNeutral) missing.push("media.substantive")
  if (!marketSub) missing.push("cardMarket.substantive")
  for (const d of missing) {
    missingDomainCounts[d] = (missingDomainCounts[d] ?? 0) + 1
  }

  playerResults.push({ id: source.id, name: source.name, format, tier, dlrScore: dlr.score, confidence: dlr.confidence, completeness, scaffolded: enriched.__scaffolded, missing })
}

/* ---- Summary stats ---- */
const avgScore = n => n.length ? n.reduce((a,b)=>a+b,0)/n.length : 0
const avgDLR = avgScore(dlrScores)
const minDLR = Math.min(...dlrScores)
const maxDLR = Math.max(...dlrScores)
const avgComp = avgScore(completenessValues)
const medianDLR = [...dlrScores].sort((a,b)=>a-b)[Math.floor(dlrScores.length/2)]

console.log("==============================================================")
console.log("  DIAMOND LEDGER — 2018 DRAFT COHORT DRY RUN RESULTS")
console.log("==============================================================")
console.log()
console.log("PIPELINE SUMMARY")
console.log("  Total players:      ", cohort2018.length)
console.log("  Domain-file format: ", domainCount)
console.log("  Minimal inline:     ", minimalCount)
console.log("  Legacy format:      ", legacyCount)
console.log("  Successfully processed:", enrichedCount)
console.log("  Failed:             ", failedCount)
console.log()
console.log("ENRICHMENT")
console.log("  Average completeness:", (avgComp * 100).toFixed(1) + "%")
console.log("  Tier A players:     ", tiers.A)
console.log("  Tier B players:     ", tiers.B)
console.log("  Tier C players:     ", tiers.C)
console.log()
console.log("DLR SCORES (post-enrichment)")
console.log("  Min DLR:            ", minDLR)
console.log("  Max DLR:            ", maxDLR)
console.log("  Average DLR:        ", avgDLR.toFixed(1))
console.log("  Median DLR:         ", medianDLR)
console.log()
console.log("MISSING DOMAIN COUNTS")
for (const [k, v] of Object.entries(missingDomainCounts).sort((a,b) => b[1]-a[1])) {
  console.log(`  ${k.padEnd(30)} ${v}`)
}
console.log()
console.log("PER-PLAYER DLR TABLE")
console.log("  " + "ID".padEnd(25) + "Format".padEnd(10) + "Tier".padEnd(6) + "DLR".padEnd(8) + "Conf".padEnd(8) + "Compl")
console.log("  " + "-".repeat(65))
for (const r of playerResults.sort((a,b) => b.dlrScore - a.dlrScore)) {
  console.log("  " +
    r.id.padEnd(25) +
    r.format.padEnd(10) +
    r.tier.padEnd(6) +
    String(r.dlrScore).padEnd(8) +
    r.confidence.toFixed(3).padEnd(8) +
    (r.completeness * 100).toFixed(0) + "%"
  )
}
console.log()
console.log("==============================================================")

/* Export as JSON for report generation */
import { writeFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
const __filename = fileURLToPath(import.meta.url)
const __dir = dirname(__filename)
const outputPath = join(__dir, "dryRunOutput.json")
writeFileSync(outputPath, JSON.stringify({ playerResults, summary: {
  total: cohort2018.length, domainCount, minimalCount, legacyCount,
  enrichedCount, failedCount, tiers, avgDLR, minDLR, maxDLR, medianDLR,
  avgCompleteness: avgComp, missingDomainCounts
}}, null, 2))
console.log("Output written to:", outputPath)
