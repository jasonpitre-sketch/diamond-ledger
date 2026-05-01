import { clamp01 } from "@/data/dlr/dlrConfig"

import type { PressureTier, ScoutTier } from "./scout"

export type MarketWaveState =
  | "EARLY_WAVE"
  | "HEATING"
  | "HYPE_RISK"
  | "SELL_PRESSURE"
  | "RESET"
  | "RE_ENTRY"
  | "BLUE_CHIP"

export type MarketWaveInput = {
  momentum7d?: number | null
  momentum30d?: number | null
  momentum90d?: number | null
  askToSoldRatio?: number | null
  performanceScore: number
  knowledgeScore: number
  mediaScore: number
  marketScore: number
  listingPressure: PressureTier
  volatility?: number | null
  mlbYears?: number | null
  popScarcity?: ScoutTier | null
}

export type MarketWaveProfile = {
  state: MarketWaveState
  label: string
  meaning: string
  pressure: string
  risk: string
}

export const MARKET_WAVE_PROFILES: Record<MarketWaveState, MarketWaveProfile> = {
  HYPE_RISK: {
    state: "HYPE_RISK",
    label: "HYPE RISK",
    meaning: "Price is moving faster than proof.",
    pressure: "Market expectations require continued confirmation.",
    risk: "A strong player can still be a poor entry if the move is already priced in."
  },
  SELL_PRESSURE: {
    state: "SELL_PRESSURE",
    label: "SELL PRESSURE",
    meaning: "Price action is weakening while the market is still carrying prior hype.",
    pressure: "Sellers may begin repricing if follow-through fades.",
    risk: "Late buyers can absorb the correction."
  },
  RE_ENTRY: {
    state: "RE_ENTRY",
    label: "RE-ENTRY",
    meaning: "Price has corrected but short-term signal is improving.",
    pressure: "Fresh confirmation can restart demand.",
    risk: "The turn still needs proof."
  },
  RESET: {
    state: "RESET",
    label: "RESET",
    meaning: "The market has corrected and is searching for support.",
    pressure: "Price needs a new baseball or demand catalyst.",
    risk: "Cheaper does not automatically mean mispriced."
  },
  HEATING: {
    state: "HEATING",
    label: "HEATING",
    meaning: "Attention and market momentum are building together.",
    pressure: "Buyers are entering before the story fully matures.",
    risk: "Momentum can flip quickly if performance fails to confirm."
  },
  BLUE_CHIP: {
    state: "BLUE_CHIP",
    label: "BLUE CHIP",
    meaning: "Established performance and lower volatility are supporting demand.",
    pressure: "Demand is less dependent on one short-term spike.",
    risk: "Upside tends to be steadier, not always explosive."
  },
  EARLY_WAVE: {
    state: "EARLY_WAVE",
    label: "EARLY WAVE",
    meaning: "The story is forming before the market is fully active.",
    pressure: "Attention can move quickly once a catalyst appears.",
    risk: "Most value is still narrative-driven."
  }
}

function isScarceEnough(tier: ScoutTier | null | undefined) {
  return tier === "MODERATE" || tier === "HIGH" || tier === "VERY_HIGH"
}

export function detectMarketWave(input: MarketWaveInput): MarketWaveProfile {
  const momentum7d = input.momentum7d ?? 0
  const momentum30d = input.momentum30d ?? 0
  const momentum90d = input.momentum90d ?? 0
  const askToSoldRatio = input.askToSoldRatio ?? 1
  const performance = clamp01(input.performanceScore)
  const knowledge = clamp01(input.knowledgeScore)
  const media = clamp01(input.mediaScore)
  const market = clamp01(input.marketScore)
  const fundamentals = performance * 0.7 + knowledge * 0.3
  const hype = media * 0.4 + market * 0.6

  if (
    momentum30d >= 0.2 &&
    media >= 0.75 &&
    askToSoldRatio >= 1.3 &&
    hype > fundamentals + 0.2
  ) {
    return MARKET_WAVE_PROFILES.HYPE_RISK
  }

  if (
    momentum7d <= -0.05 &&
    askToSoldRatio < 1 &&
    input.listingPressure === "BEARISH"
  ) {
    return MARKET_WAVE_PROFILES.SELL_PRESSURE
  }

  if (momentum90d < -0.1 && momentum7d >= 0.03 && fundamentals >= 0.55) {
    return MARKET_WAVE_PROFILES.RE_ENTRY
  }

  if (momentum90d >= -0.2 && momentum90d <= -0.05 && Math.abs(momentum7d) <= 0.03) {
    return MARKET_WAVE_PROFILES.RESET
  }

  if (
    momentum30d >= 0.1 &&
    media >= 0.6 &&
    askToSoldRatio >= 1.1 &&
    fundamentals >= hype - 0.1
  ) {
    return MARKET_WAVE_PROFILES.HEATING
  }

  if (
    performance >= 0.7 &&
    (input.mlbYears ?? 0) >= 3 &&
    (input.volatility ?? 1) <= 0.3 &&
    Math.abs(momentum30d) <= 0.1
  ) {
    return MARKET_WAVE_PROFILES.BLUE_CHIP
  }

  if (
    momentum30d < 0.05 &&
    media < 0.5 &&
    performance > 0.6 &&
    isScarceEnough(input.popScarcity)
  ) {
    return MARKET_WAVE_PROFILES.EARLY_WAVE
  }

  return MARKET_WAVE_PROFILES.EARLY_WAVE
}

