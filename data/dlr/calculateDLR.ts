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
import {
  detectPlayerRole,
  readRoleToolGrades,
  textSignalScore
} from "./signalEngine"
import { scoreKnowledgeBio } from "./knowledge/bioRules"
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

function scoreKnowledge(player: PlayerInput) {
  const knowledge = player.knowledge
  const bio = knowledge?.bio
  const scout = knowledge?.scout
  const career = knowledge?.career
  const role = detectPlayerRole(player)
  const bioScores = scoreKnowledgeBio({ bio })

  const bioSnapshot = bioScores.snapshot
  const bioScout = bioScores.scout
  const bioAnalyst = bioScores.analyst

  const scoutSnapshot = scoreFromAlreadyNormalized([
    { value: textSignalScore(scout?.snapshot?.primaryTool) },
    { value: textSignalScore(scout?.snapshot?.roleType) },
    { value: textSignalScore(scout?.snapshot?.physicalProjection) },
    { value: textSignalScore(scout?.snapshot?.riskProfile) }
  ])
  const tools = scout?.scout
  const scoutScout = scoreFromAlreadyNormalized(
    readRoleToolGrades(tools, role).map(({ normalized }) => ({ value: normalized }))
  )
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
    { value: textSignalScore(career?.snapshot?.draftPedigree) },
    { value: textSignalScore(career?.snapshot?.developmentPath) },
    { value: textSignalScore(career?.snapshot?.orgInvestment) },
    { value: textSignalScore(career?.snapshot?.timelineSignal) }
  ])
  const careerScout = scoreFromAlreadyNormalized([
    { value: textSignalScore(career?.scout?.collegeStatus) },
    { value: textSignalScore(career?.scout?.draftPedigree) },
    { value: textSignalScore(career?.scout?.projectionPath) },
    { value: textSignalScore(career?.scout?.orgCommitment) },
    { value: textSignalScore(career?.scout?.topProspectStatus) }
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
  return detectPlayerRole(player) === "pitcher"
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
