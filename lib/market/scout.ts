import { clamp01 } from "@/data/dlr/dlrConfig"

import type { MarketSnapshot } from "./types"

export type ScoutTier = "VERY_LOW" | "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH"
export type PressureTier = "BULLISH" | "NEUTRAL" | "BEARISH"

export type LegacyMarketInput = {
  psa10Premium?: number | null
  liquidity?: number | null
  trend?: number | null
  scarcity?: number | null
  depth?: number | null
  volatility?: number | null
  longTerm?: number | null
  stability?: number | null
  confidence?: number | null
}

export type MarketScoutRead = {
  liquidity: ScoutTier
  liquidityScore: number
  listingDepth: ScoutTier
  listingDepthScore: number
  listingPressure: PressureTier
  salesVelocity: ScoutTier
  salesVelocityScore: number
  unitsPerWeek: number | null
  popScarcity: ScoutTier
  popScarcityScore: number
  gradingPremium: ScoutTier
  gradingPremiumMultiplier: number | null
  risk: ScoutTier
  riskScore: number
}

export const MARKET_SCOUT_THRESHOLDS = {
  liquidityUnitsPerWeek: {
    veryHigh: 20,
    high: 8,
    moderate: 3,
    low: 1
  },
  listingDepth: {
    veryHigh: 25,
    high: 12,
    moderate: 6,
    low: 3
  },
  gradingPremium: {
    veryHigh: 12,
    high: 6,
    moderate: 3,
    low: 1.8
  },
  pressureRatio: {
    bullish: 1.2,
    bearish: 0.95
  }
} as const

function tierFromScore(score: number): ScoutTier {
  if (score >= 0.85) return "VERY_HIGH"
  if (score >= 0.68) return "HIGH"
  if (score >= 0.45) return "MODERATE"
  if (score >= 0.22) return "LOW"
  return "VERY_LOW"
}

function tierFromThresholds(value: number | null, thresholds: {
  veryHigh: number
  high: number
  moderate: number
  low: number
}): ScoutTier {
  if (value === null) return "VERY_LOW"
  if (value >= thresholds.veryHigh) return "VERY_HIGH"
  if (value >= thresholds.high) return "HIGH"
  if (value >= thresholds.moderate) return "MODERATE"
  if (value >= thresholds.low) return "LOW"
  return "VERY_LOW"
}

function scarcityFromPop(psa10Pop: number | null) {
  if (psa10Pop === null) return { tier: "VERY_LOW" as ScoutTier, score: 0 }
  if (psa10Pop <= 25) return { tier: "VERY_HIGH" as ScoutTier, score: 0.95 }
  if (psa10Pop <= 75) return { tier: "HIGH" as ScoutTier, score: 0.78 }
  if (psa10Pop <= 200) return { tier: "MODERATE" as ScoutTier, score: 0.58 }
  if (psa10Pop <= 500) return { tier: "LOW" as ScoutTier, score: 0.34 }
  return { tier: "VERY_LOW" as ScoutTier, score: 0.12 }
}

function premiumTier(multiplier: number | null) {
  if (multiplier === null) return "VERY_LOW" as ScoutTier
  return tierFromThresholds(multiplier, MARKET_SCOUT_THRESHOLDS.gradingPremium)
}

function pressureFromAskRatio(ratio: number | null): PressureTier {
  if (ratio === null) return "NEUTRAL"
  if (ratio >= MARKET_SCOUT_THRESHOLDS.pressureRatio.bullish) return "BULLISH"
  if (ratio <= MARKET_SCOUT_THRESHOLDS.pressureRatio.bearish) return "BEARISH"
  return "NEUTRAL"
}

export function readUnitsPerWeek(snapshot: MarketSnapshot | null | undefined) {
  const sold90 = snapshot?.volume?.soldLast90
  if (typeof sold90 !== "number" || !Number.isFinite(sold90)) return null

  return sold90 / 12.85
}

export function classifyMarketScoutFromSnapshot(snapshot: MarketSnapshot): MarketScoutRead {
  const unitsPerWeek = readUnitsPerWeek(snapshot)
  const liquidity = tierFromThresholds(
    unitsPerWeek,
    MARKET_SCOUT_THRESHOLDS.liquidityUnitsPerWeek
  )
  const liquidityScore = clamp01((unitsPerWeek ?? 0) / 20)
  const listingDepth = tierFromThresholds(
    snapshot.listings?.activeCount ?? null,
    MARKET_SCOUT_THRESHOLDS.listingDepth
  )
  const listingDepthScore = clamp01((snapshot.listings?.activeCount ?? 0) / 25)
  const popScarcity = scarcityFromPop(snapshot.population?.psa10Count ?? null)
  const gradingPremiumMultiplier =
    snapshot.derived?.psa10ToRawMultiplier ??
    (snapshot.prices.raw?.avg && snapshot.prices.psa10?.avg
      ? snapshot.prices.psa10.avg / snapshot.prices.raw.avg
      : null)
  const volatility = snapshot.derived?.volatility ?? null
  const riskScore = clamp01(
    (volatility ?? 0.5) * 0.55 +
      (1 - snapshot.confidence) * 0.35 +
      (snapshot.derived?.spread ?? 0.5) * 0.1
  )

  return {
    liquidity,
    liquidityScore,
    listingDepth,
    listingDepthScore,
    listingPressure: pressureFromAskRatio(snapshot.listings?.askToSoldRatio ?? null),
    salesVelocity: liquidity,
    salesVelocityScore: liquidityScore,
    unitsPerWeek,
    popScarcity: popScarcity.tier,
    popScarcityScore: popScarcity.score,
    gradingPremium: premiumTier(gradingPremiumMultiplier),
    gradingPremiumMultiplier,
    risk: tierFromScore(riskScore),
    riskScore
  }
}

export function classifyMarketScoutFromLegacy(market: LegacyMarketInput | null | undefined): MarketScoutRead {
  const liquidityScore = clamp01(market?.liquidity ?? 0)
  const listingDepthScore = clamp01(market?.depth ?? 0)
  const scarcityScore = clamp01(market?.scarcity ?? 0)
  const volatility = clamp01(market?.volatility ?? 0.5)
  const confidence = clamp01(market?.confidence ?? 0.5)
  const premium = market?.psa10Premium ?? null
  const riskScore = clamp01(volatility * 0.65 + (1 - confidence) * 0.35)

  return {
    liquidity: tierFromScore(liquidityScore),
    liquidityScore,
    listingDepth: tierFromScore(listingDepthScore),
    listingDepthScore,
    listingPressure:
      (market?.trend ?? 0.5) >= 0.62
        ? "BULLISH"
        : (market?.trend ?? 0.5) <= 0.38
          ? "BEARISH"
          : "NEUTRAL",
    salesVelocity: tierFromScore(liquidityScore),
    salesVelocityScore: liquidityScore,
    unitsPerWeek: null,
    popScarcity: tierFromScore(scarcityScore),
    popScarcityScore: scarcityScore,
    gradingPremium: premiumTier(premium),
    gradingPremiumMultiplier: premium,
    risk: tierFromScore(riskScore),
    riskScore
  }
}

