import {
  type AllSubScores,
  type AnchorConfig,
  type DLRConfidence,
  type DLROutput,
  type FlatLayerSubScores,
  type KnowledgeSubScores,
  HITTER_ANCHORS,
  PITCHER_ANCHORS,
  clamp01,
  composeDLR,
  linearNormalize,
  normalizePsa10Premium,
  safeAverage
} from "./dlrConfig"
import { scoreMarketSnapshot } from "@/lib/market/scoring"
import type { MarketSnapshot } from "@/lib/market/types"

type NullableNumber = number | null | undefined
type NullableValue = NullableNumber | string | string[] | null | undefined

type ScoreResult = {
  score: number
  populated: number
  expected: number
}

type PlayerInput = {
  position?: string
  pos?: string
  knowledge?: {
    bio?: {
      snapshot?: Record<string, NullableValue>
      scoutScores?: Record<string, NullableNumber>
      scout?: Record<string, NullableValue>
      analystScores?: Record<string, NullableNumber>
      analyst?: Record<string, NullableValue>
    }
    scout?: {
      snapshot?: Record<string, NullableValue>
      scout?: Record<string, NullableNumber>
      analystScores?: Record<string, NullableNumber>
      analyst?: Record<string, NullableValue>
    }
    career?: {
      snapshot?: Record<string, NullableValue>
      scout?: Record<string, NullableValue>
      analystScores?: Record<string, NullableNumber>
      analyst?: Record<string, NullableValue>
    }
  }
  performance?: {
    kind?: "hitter" | "pitcher"
    snapshot?: Record<string, NullableNumber | string>
    scout?: Record<string, NullableNumber>
    analyst?: Record<string, NullableNumber>
  }
  media?: {
    snapshot?: Record<string, NullableNumber>
    scout?: Record<string, NullableNumber>
    analyst?: Record<string, NullableNumber>
  }
  cardMarket?: Record<string, NullableNumber>
  marketSnapshot?: MarketSnapshot
}

function readNumber(
  source: Record<string, NullableNumber | string> | undefined,
  key: string
): number | null {
  const value = source?.[key]

  return typeof value === "number" && !Number.isNaN(value) ? value : null
}

function scoreFromAlreadyNormalized(
  inputs: { value: NullableNumber; invert?: boolean }[]
): ScoreResult {
  const adjusted = inputs.map(({ value, invert }) => {
    if (value === null || value === undefined || Number.isNaN(value)) return null

    const normalized = clamp01(value)

    return invert ? 1 - normalized : normalized
  })
  const { avg, populated, expected } = safeAverage(adjusted)

  return { score: avg, populated, expected }
}

function scoreFromAnchored(
  inputs: { value: NullableNumber; anchor: AnchorConfig | null }[]
): ScoreResult {
  const normalized = inputs.map(({ value, anchor }) => {
    if (anchor === null) {
      return value === null || value === undefined || Number.isNaN(value)
        ? null
        : clamp01(value)
    }

    return linearNormalize(value, anchor)
  })
  const { avg, populated, expected } = safeAverage(normalized)

  return { score: avg, populated, expected }
}

function scoreCompleteness(values: NullableValue[], fallback = 0) {
  if (values.length === 0) return fallback

  const populated = values.filter((value) => {
    if (Array.isArray(value)) return value.length > 0
    return value !== null && value !== undefined && String(value).trim() !== ""
  }).length

  return populated / values.length
}

function textSignal(value: NullableValue, fallback = 0.55) {
  if (typeof value === "number" && Number.isFinite(value)) return clamp01(value)
  if (Array.isArray(value)) return value.length > 1 ? 0.88 : value.length === 1 ? 0.7 : fallback
  if (value === null || value === undefined) return fallback

  const text = String(value).toLowerCase()

  if (
    text.includes("elite") ||
    text.includes("premium") ||
    text.includes("top 10") ||
    text.includes("very high") ||
    text.includes("1st overall") ||
    text.includes("1-1") ||
    text.includes("impact") ||
    text.includes("ideal") ||
    text.includes("strong")
  ) {
    return 0.9
  }

  if (
    text.includes("high") ||
    text.includes("fast") ||
    text.includes("accelerating") ||
    text.includes("projectable") ||
    text.includes("starter") ||
    text.includes("college") ||
    text.includes("progressing") ||
    text.includes("polished") ||
    text.includes("likely") ||
    text.includes("priority")
  ) {
    return 0.75
  }

  if (
    text.includes("moderate") ||
    text.includes("solid") ||
    text.includes("steady") ||
    text.includes("normal") ||
    text.includes("adequate") ||
    text.includes("balanced") ||
    text.includes("contributor") ||
    text.includes("viable")
  ) {
    return 0.62
  }

  if (
    text.includes("risk") ||
    text.includes("limited") ||
    text.includes("slow") ||
    text.includes("low") ||
    text.includes("raw") ||
    text.includes("volatile") ||
    text.includes("uncertain")
  ) {
    return 0.35
  }

  return fallback
}

function normalizeGrade(value: NullableNumber) {
  if (value === null || value === undefined || Number.isNaN(value)) return null

  return clamp01(value / 80)
}

function scoreKnowledge(player: PlayerInput) {
  const knowledge = player.knowledge
  const bio = knowledge?.bio
  const scout = knowledge?.scout
  const career = knowledge?.career

  const bioSnapshot = scoreFromAlreadyNormalized([
    { value: scoreCompleteness([
      bio?.snapshot?.height,
      bio?.snapshot?.weight,
      bio?.snapshot?.bats,
      bio?.snapshot?.throws,
      bio?.snapshot?.school
    ], null) },
    { value: readNumber(bio?.scoutScores, "path") },
    { value: readNumber(bio?.analystScores, "pedigree") }
  ])
  const bioScout = scoreFromAlreadyNormalized([
    { value: readNumber(bio?.scoutScores, "arch") },
    { value: readNumber(bio?.scoutScores, "path") },
    { value: readNumber(bio?.scoutScores, "frame") },
    { value: readNumber(bio?.scoutScores, "ath") },
    { value: readNumber(bio?.scoutScores, "proj") }
  ])
  const bioAnalyst = scoreFromAlreadyNormalized([
    { value: readNumber(bio?.analystScores, "dev") },
    { value: readNumber(bio?.analystScores, "risk"), invert: true },
    { value: readNumber(bio?.analystScores, "value") },
    { value: readNumber(bio?.analystScores, "org") },
    { value: readNumber(bio?.analystScores, "pedigree") },
    { value: typeof bio?.analyst?.injuryIdx === "number" ? bio.analyst.injuryIdx : null, invert: true },
    { value: typeof bio?.analyst?.assetRisk === "number" ? bio.analyst.assetRisk : null, invert: true },
    { value: typeof bio?.analyst?.longValue === "number" ? bio.analyst.longValue : null }
  ])

  const scoutSnapshot = scoreFromAlreadyNormalized([
    { value: textSignal(scout?.snapshot?.primaryTool) },
    { value: textSignal(scout?.snapshot?.roleType) },
    { value: textSignal(scout?.snapshot?.physicalProjection) },
    { value: textSignal(scout?.snapshot?.riskProfile) }
  ])
  const tools = scout?.scout
  const scoutScout = scoreFromAlreadyNormalized([
    { value: normalizeGrade(readNumber(tools, "hit")) },
    { value: normalizeGrade(readNumber(tools, "power")) },
    { value: normalizeGrade(readNumber(tools, "run")) },
    { value: normalizeGrade(readNumber(tools, "arm")) },
    { value: normalizeGrade(readNumber(tools, "field")) },
    { value: normalizeGrade(readNumber(tools, "fastball")) },
    { value: normalizeGrade(readNumber(tools, "slider")) },
    { value: normalizeGrade(readNumber(tools, "splitter")) },
    { value: normalizeGrade(readNumber(tools, "command")) },
    { value: normalizeGrade(readNumber(tools, "overallFV")) }
  ])
  const scoutAnalyst = scoreFromAlreadyNormalized([
    { value: readNumber(scout?.analystScores, "ceiling") },
    { value: readNumber(scout?.analystScores, "floor") },
    { value: readNumber(scout?.analystScores, "roleProb") },
    { value: readNumber(scout?.analystScores, "skillTrend") },
    { value: readNumber(scout?.analystScores, "volatility"), invert: true },
    { value: readNumber(scout?.analystScores, "orgFit") },
    { value: readNumber(scout?.analystScores, "riskTrend"), invert: true },
    { value: typeof scout?.analyst?.ceiling === "number" ? scout.analyst.ceiling : null },
    { value: typeof scout?.analyst?.orgFit === "number" ? scout.analyst.orgFit : null }
  ])

  const careerSnapshot = scoreFromAlreadyNormalized([
    { value: textSignal(career?.snapshot?.draftPedigree) },
    { value: textSignal(career?.snapshot?.developmentPath) },
    { value: textSignal(career?.snapshot?.orgInvestment) },
    { value: textSignal(career?.snapshot?.timelineSignal) }
  ])
  const careerScout = scoreFromAlreadyNormalized([
    { value: textSignal(career?.scout?.collegeStatus) },
    { value: textSignal(career?.scout?.draftPedigree) },
    { value: textSignal(career?.scout?.projectionPath) },
    { value: textSignal(career?.scout?.orgCommitment) },
    { value: textSignal(career?.scout?.topProspectStatus) }
  ])
  const careerAnalyst = scoreFromAlreadyNormalized([
    { value: readNumber(career?.analystScores, "timeline") },
    { value: readNumber(career?.analystScores, "peak") },
    { value: readNumber(career?.analystScores, "path") },
    { value: readNumber(career?.analystScores, "org") },
    { value: readNumber(career?.analystScores, "value") },
    { value: readNumber(career?.analystScores, "floor") },
    { value: readNumber(career?.analystScores, "ceil") },
    { value: typeof career?.analyst?.setbacks === "number" ? career.analyst.setbacks : null, invert: true },
    { value: typeof career?.analyst?.longView === "number" ? career.analyst.longView : null }
  ])

  const scores: KnowledgeSubScores = {
    bio: {
      snapshot: bioSnapshot.score,
      scout: bioScout.score,
      analyst: bioAnalyst.score
    },
    scout: {
      snapshot: scoutSnapshot.score,
      scout: scoutScout.score,
      analyst: scoutAnalyst.score
    },
    career: {
      snapshot: careerSnapshot.score,
      scout: careerScout.score,
      analyst: careerAnalyst.score
    }
  }
  const populated =
    bioSnapshot.populated +
    bioScout.populated +
    bioAnalyst.populated +
    scoutSnapshot.populated +
    scoutScout.populated +
    scoutAnalyst.populated +
    careerSnapshot.populated +
    careerScout.populated +
    careerAnalyst.populated
  const expected =
    bioSnapshot.expected +
    bioScout.expected +
    bioAnalyst.expected +
    scoutSnapshot.expected +
    scoutScout.expected +
    scoutAnalyst.expected +
    careerSnapshot.expected +
    careerScout.expected +
    careerAnalyst.expected

  return {
    scores,
    confidence: expected === 0 ? 0 : populated / expected
  }
}

function isPitcher(player: PlayerInput) {
  const position = (player.position ?? player.pos ?? "").toUpperCase()

  return (
    player.performance?.kind === "pitcher" ||
    ["P", "SP", "RP", "RHP", "LHP"].includes(position)
  )
}

function scorePerformance(player: PlayerInput) {
  const performance = player.performance
  const snapshotData = performance?.snapshot
  const scoutData = performance?.scout
  const analystData = performance?.analyst
  let snapshot: ScoreResult
  let scout: ScoreResult
  let analyst: ScoreResult

  if (isPitcher(player)) {
    snapshot = scoreFromAnchored([
      { value: readNumber(snapshotData, "era"), anchor: PITCHER_ANCHORS.ERA },
      { value: readNumber(snapshotData, "whip"), anchor: PITCHER_ANCHORS.WHIP }
    ])
    scout = scoreFromAnchored([
      { value: readNumber(scoutData, "kPercent"), anchor: PITCHER_ANCHORS.K_pct },
      { value: readNumber(scoutData, "bbPercent"), anchor: PITCHER_ANCHORS.BB_pct },
      { value: readNumber(scoutData, "kMinusBB"), anchor: PITCHER_ANCHORS.K_minus_BB },
      { value: readNumber(scoutData, "whiff"), anchor: PITCHER_ANCHORS.Whiff_pct }
    ])
    analyst = scoreFromAnchored([
      { value: readNumber(analystData, "xERA"), anchor: PITCHER_ANCHORS.xERA },
      { value: readNumber(analystData, "stuffPlus"), anchor: PITCHER_ANCHORS.Stuff_plus },
      { value: readNumber(analystData, "pitchMixGrade"), anchor: null },
      { value: readNumber(analystData, "veloTrend"), anchor: null },
      { value: readNumber(analystData, "commandTrend"), anchor: null },
      { value: readNumber(analystData, "injuryTrend"), anchor: null },
      { value: readNumber(analystData, "roleStability"), anchor: null }
    ])
  } else {
    const ab = readNumber(snapshotData, "ab")
    const hr = readNumber(snapshotData, "hr")
    const hrPerAB = ab !== null && hr !== null && ab > 0 ? hr / ab : null

    snapshot = scoreFromAnchored([
      { value: readNumber(snapshotData, "avg"), anchor: HITTER_ANCHORS.AVG },
      { value: readNumber(snapshotData, "ops"), anchor: HITTER_ANCHORS.OPS },
      { value: hrPerAB, anchor: HITTER_ANCHORS.HR_per_AB }
    ])
    scout = scoreFromAnchored([
      { value: readNumber(scoutData, "kRate"), anchor: HITTER_ANCHORS.K_pct },
      { value: readNumber(scoutData, "bbRate"), anchor: HITTER_ANCHORS.BB_pct },
      { value: readNumber(scoutData, "barrel"), anchor: HITTER_ANCHORS.Barrel_pct },
      { value: readNumber(scoutData, "hardHit"), anchor: HITTER_ANCHORS.HardHit_pct },
      { value: readNumber(scoutData, "avgEV"), anchor: HITTER_ANCHORS.Avg_EV }
    ])
    analyst = scoreFromAnchored([
      { value: readNumber(analystData, "xAVG"), anchor: HITTER_ANCHORS.xAVG },
      { value: readNumber(analystData, "xSLG"), anchor: HITTER_ANCHORS.xSLG },
      { value: readNumber(analystData, "plateDiscTrend"), anchor: null },
      { value: readNumber(analystData, "contactTrend"), anchor: null },
      { value: readNumber(analystData, "injuryTrend"), anchor: null },
      { value: readNumber(analystData, "sprintTrend"), anchor: null },
      { value: readNumber(analystData, "posValue"), anchor: null },
      { value: readNumber(analystData, "consistency"), anchor: null }
    ])
  }

  return {
    scores: {
      snapshot: snapshot.score,
      scout: scout.score,
      analyst: analyst.score
    } satisfies FlatLayerSubScores,
    confidence:
      (snapshot.populated + scout.populated + analyst.populated) /
      Math.max(1, snapshot.expected + scout.expected + analyst.expected)
  }
}

function scoreMedia(player: PlayerInput) {
  const media = player.media
  const snapshotData = media?.snapshot
  const scoutData = media?.scout
  const analystData = media?.analyst
  const snapshot = scoreFromAlreadyNormalized([
    { value: readNumber(snapshotData, "mentions") },
    { value: readNumber(snapshotData, "headlineImpact") },
    { value: readNumber(snapshotData, "highlightFactor") },
    { value: readNumber(snapshotData, "socialBuzz") }
  ])
  const scout = scoreFromAlreadyNormalized([
    { value: readNumber(scoutData, "fanRecognition") },
    { value: readNumber(scoutData, "teamVisibility") },
    { value: readNumber(scoutData, "interviewPresence") },
    { value: readNumber(scoutData, "narrativeStrength") },
    { value: readNumber(scoutData, "milestoneAttention") }
  ])
  const analyst = scoreFromAlreadyNormalized([
    { value: readNumber(analystData, "prospectPedigree") },
    { value: readNumber(analystData, "hypeTrend") },
    { value: readNumber(analystData, "mediaStability") },
    { value: readNumber(analystData, "storyDurability") },
    { value: readNumber(analystData, "breakoutProbability") },
    { value: readNumber(analystData, "publicMomentum") },
    { value: readNumber(analystData, "attentionDecay"), invert: true }
  ])

  return {
    scores: {
      snapshot: snapshot.score,
      scout: scout.score,
      analyst: analyst.score
    } satisfies FlatLayerSubScores,
    confidence:
      (snapshot.populated + scout.populated + analyst.populated) /
      Math.max(1, snapshot.expected + scout.expected + analyst.expected)
  }
}

function scoreMarket(player: PlayerInput) {
  if (player.marketSnapshot) {
    return {
      scores: scoreMarketSnapshot(player.marketSnapshot),
      confidence: player.marketSnapshot.confidence
    }
  }

  const market = player.cardMarket
  const psa10Premium = readNumber(market, "psa10Premium")
  const snapshot = scoreFromAlreadyNormalized([
    { value: psa10Premium === null ? null : normalizePsa10Premium(psa10Premium) },
    { value: readNumber(market, "liquidity") },
    { value: readNumber(market, "trend") }
  ])
  const scout = scoreFromAlreadyNormalized([
    { value: readNumber(market, "scarcity") },
    { value: readNumber(market, "depth") },
    { value: readNumber(market, "volatility"), invert: true }
  ])
  const analyst = scoreFromAlreadyNormalized([
    { value: readNumber(market, "longTerm") },
    { value: readNumber(market, "stability") },
    { value: readNumber(market, "confidence") }
  ])

  return {
    scores: {
      snapshot: snapshot.score,
      scout: scout.score,
      analyst: analyst.score
    } satisfies FlatLayerSubScores,
    confidence:
      (snapshot.populated + scout.populated + analyst.populated) /
      Math.max(1, snapshot.expected + scout.expected + analyst.expected)
  }
}

export function calculateDLR(player: unknown): DLROutput {
  const input = player as PlayerInput
  const knowledge = scoreKnowledge(input)
  const performance = scorePerformance(input)
  const media = scoreMedia(input)
  const market = scoreMarket(input)
  const subScores: AllSubScores = {
    knowledge: knowledge.scores,
    performance: performance.scores,
    media: media.scores,
    market: market.scores
  }
  const composed = composeDLR(subScores)
  const confidence: DLRConfidence = {
    knowledge: knowledge.confidence,
    performance: performance.confidence,
    media: media.confidence,
    market: market.confidence,
    overall:
      (knowledge.confidence * 18 +
        performance.confidence * 40 +
        media.confidence * 18 +
        market.confidence * 24) /
      100
  }

  return {
    ...composed,
    confidence
  }
}
