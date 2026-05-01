import { clamp01 } from "../dlrConfig"

export type MarketWaveState =
  | "EARLY_WAVE"
  | "HEATING"
  | "HYPE_RISK"
  | "SELL_PRESSURE"
  | "RESET"
  | "RE_ENTRY"
  | "BLUE_CHIP"

export type MarketWaveInput = {
  performanceTrend?: number | null
  mediaMomentum?: number | null
  priceMomentum?: number | null
  volatility?: number | null
  proofLevel?: number | null
  blueChipScore?: number | null
}

export type MarketWaveProfile = {
  state: MarketWaveState
  label: string
  shortLabel: string
  meaning: string
  pressure: string
  risk: string
  centerSignal: string
}

export const MARKET_WAVE_PROFILES: Record<MarketWaveState, MarketWaveProfile> = {
  EARLY_WAVE: {
    state: "EARLY_WAVE",
    label: "EARLY WAVE",
    shortLabel: "EARLY",
    meaning: "Narrative is forming before proof is complete.",
    pressure: "Attention can move faster than the baseball record.",
    risk: "Most value is still story-driven.",
    centerSignal: "WAVE: EARLY WAVE"
  },
  HEATING: {
    state: "HEATING",
    label: "HEATING",
    shortLabel: "HEATING",
    meaning: "Attention and price are rising together.",
    pressure: "Momentum is building and fresh buyers may enter.",
    risk: "The window can turn quickly if performance cools.",
    centerSignal: "WAVE: HEATING"
  },
  HYPE_RISK: {
    state: "HYPE_RISK",
    label: "HYPE RISK",
    shortLabel: "RISK",
    meaning: "Price is moving faster than proof.",
    pressure: "The market is demanding continued confirmation.",
    risk: "A good player can still be a bad buy if the move is already priced in.",
    centerSignal: "WAVE: HYPE RISK"
  },
  SELL_PRESSURE: {
    state: "SELL_PRESSURE",
    label: "SELL PRESSURE",
    shortLabel: "SELL",
    meaning: "Performance or attention is cooling while price still carries hype.",
    pressure: "Weak follow-through can force repricing.",
    risk: "Late buyers may absorb the correction.",
    centerSignal: "WAVE: SELL PRESSURE"
  },
  RESET: {
    state: "RESET",
    label: "RESET",
    shortLabel: "RESET",
    meaning: "Market has corrected and the story is being repriced.",
    pressure: "Price needs a new baseball reason to turn higher.",
    risk: "A cheaper card is not automatically a stronger setup.",
    centerSignal: "WAVE: RESET"
  },
  RE_ENTRY: {
    state: "RE_ENTRY",
    label: "RE-ENTRY",
    shortLabel: "RE-ENTRY",
    meaning: "Price has cooled but proof signals are improving.",
    pressure: "A small performance spark can restart demand.",
    risk: "The turn still needs confirmation.",
    centerSignal: "WAVE: RE-ENTRY"
  },
  BLUE_CHIP: {
    state: "BLUE_CHIP",
    label: "BLUE CHIP",
    shortLabel: "BLUE",
    meaning: "Multi-season trust is supporting the asset.",
    pressure: "Demand is less dependent on one hot stretch.",
    risk: "Upside may be steadier, not as explosive as early-wave flips.",
    centerSignal: "WAVE: BLUE CHIP"
  }
}

function readSignal(value: number | null | undefined, fallback = 0.5) {
  return clamp01(value ?? fallback)
}

export function getMarketWaveProfile(state: MarketWaveState) {
  return MARKET_WAVE_PROFILES[state]
}

export function evaluateMarketWave(input: MarketWaveInput): MarketWaveProfile {
  const performance = readSignal(input.performanceTrend)
  const media = readSignal(input.mediaMomentum)
  const price = readSignal(input.priceMomentum)
  const volatility = readSignal(input.volatility)
  const proof = readSignal(input.proofLevel)
  const blueChip = readSignal(input.blueChipScore, 0)

  const highPrice = price >= 0.72
  const highMedia = media >= 0.68
  const highPerformance = performance >= 0.66
  const lowPerformance = performance <= 0.38
  const lowPrice = price <= 0.38
  const lowProof = proof <= 0.42
  const strongProof = proof >= 0.72
  const volatile = volatility >= 0.66

  if (blueChip >= 0.78 && strongProof) {
    return MARKET_WAVE_PROFILES.BLUE_CHIP
  }

  if (highPrice && (lowProof || price - performance >= 0.2 || price - proof >= 0.22)) {
    return MARKET_WAVE_PROFILES.HYPE_RISK
  }

  if ((highPrice || highMedia) && lowPerformance && volatile) {
    return MARKET_WAVE_PROFILES.SELL_PRESSURE
  }

  if (lowPrice && highPerformance && proof >= 0.48) {
    return MARKET_WAVE_PROFILES.RE_ENTRY
  }

  if (lowPrice && (media <= 0.45 || performance <= 0.48)) {
    return MARKET_WAVE_PROFILES.RESET
  }

  if ((highPrice || highMedia) && highPerformance) {
    return MARKET_WAVE_PROFILES.HEATING
  }

  return MARKET_WAVE_PROFILES.EARLY_WAVE
}
