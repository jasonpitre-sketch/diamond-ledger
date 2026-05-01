import { clamp01, type DLRComponents, type FlatLayerSubScores } from "@/data/dlr/dlrConfig"

import type { LegacyMarketInput, MarketScoutRead } from "./scout"
import { classifyMarketScoutFromLegacy } from "./scout"
import { detectMarketWave, type MarketWaveProfile } from "./wave"
import { classifyValueRead, type MarketValueRead } from "./valueRead"

export type MarketActionLabel = "BUY" | "HOLD" | "SELL"
export type MarketActionStrength = "WEAK" | "MODERATE" | "STRONG" | "CONVICTION"
export type MarketActionHorizon = "SHORT" | "MEDIUM" | "LONG"

export type MarketAction = {
  action: MarketActionLabel
  strength: MarketActionStrength
  edge: number
  confidence: number
  horizon: MarketActionHorizon
  reasoning: string
  riskFlags: string[]
}

export type MarketDecisionInput = {
  market: LegacyMarketInput | null | undefined
  components: Partial<DLRComponents>
  marketScores?: Partial<FlatLayerSubScores> | null
  mlbYears?: number | null
}

export type MarketDecision = {
  scout: MarketScoutRead
  wave: MarketWaveProfile
  valueRead: MarketValueRead
  action: MarketAction
  dlrImpact: {
    pointsContributed: number
    ofMaxPossible: 24
    cellBreakdown: {
      snapshot: number
      scout: number
      analyst: number
    }
  }
}

const STRONG_ACTION_MIN_CONFIDENCE = 0.65

function actionStrength(edge: number): MarketActionStrength {
  const abs = Math.abs(edge)
  if (abs >= 0.3) return "CONVICTION"
  if (abs >= 0.18) return "STRONG"
  if (abs >= 0.08) return "MODERATE"
  return "WEAK"
}

function capStrengthForConfidence(
  strength: MarketActionStrength,
  confidence: number
): MarketActionStrength {
  if (confidence >= STRONG_ACTION_MIN_CONFIDENCE) return strength
  if (strength === "CONVICTION" || strength === "STRONG") return "MODERATE"

  return strength
}

function chooseAction(edge: number, riskScore: number): MarketActionLabel {
  if (edge >= 0.08 && riskScore < 0.72) return "BUY"
  if (edge <= -0.08 || riskScore >= 0.78) return "SELL"
  return "HOLD"
}

function chooseHorizon(waveState: string): MarketActionHorizon {
  if (waveState === "HYPE_RISK" || waveState === "SELL_PRESSURE") return "SHORT"
  if (waveState === "BLUE_CHIP") return "LONG"
  return "MEDIUM"
}

function actionReason(action: MarketActionLabel, wave: MarketWaveProfile, valueRead: MarketValueRead) {
  if (action === "BUY") {
    return `${wave.label}: ${valueRead.toLowerCase().replace(/_/g, " ")} setup with market risk still monitored.`
  }

  if (action === "SELL") {
    return `${wave.label}: current pricing risk is ahead of the supported signal.`
  }

  return `${wave.label}: market and fundamentals are close enough to stay patient.`
}

function riskFlags(market: LegacyMarketInput | null | undefined, scout: MarketScoutRead) {
  const flags: string[] = []

  if ((market?.confidence ?? 0) < 0.5) flags.push("thin-data")
  if ((market?.volatility ?? 0) >= 0.65) flags.push("volatility")
  if (scout.liquidity === "VERY_LOW" || scout.liquidity === "LOW") flags.push("liquidity")
  if (scout.listingPressure === "BEARISH") flags.push("sell-pressure")

  return flags
}

export function computeMarketDlrImpact(scores: Partial<FlatLayerSubScores> | null | undefined) {
  const snapshot = clamp01(scores?.snapshot ?? 0) * 5
  const scout = clamp01(scores?.scout ?? 0) * 7
  const analyst = clamp01(scores?.analyst ?? 0) * 12

  return {
    pointsContributed: snapshot + scout + analyst,
    ofMaxPossible: 24 as const,
    cellBreakdown: {
      snapshot,
      scout,
      analyst
    }
  }
}

export function buildMarketDecision(input: MarketDecisionInput): MarketDecision {
  const market = input.market
  const scout = classifyMarketScoutFromLegacy(market)
  const marketScore =
    input.components.market ??
    ((market?.trend ?? 0.5) + (market?.longTerm ?? 0.5) + (market?.stability ?? 0.5)) / 3
  const value = classifyValueRead({
    performanceScore: input.components.performance ?? 0.5,
    knowledgeScore: input.components.knowledge ?? 0.5,
    mediaScore: input.components.media ?? 0.5,
    marketHypeScore: marketScore
  })
  const wave = detectMarketWave({
    momentum7d: null,
    momentum30d: (market?.trend ?? 0.5) - 0.5,
    momentum90d: (market?.longTerm ?? 0.5) - 0.5,
    askToSoldRatio: null,
    performanceScore: input.components.performance ?? 0.5,
    knowledgeScore: input.components.knowledge ?? 0.5,
    mediaScore: input.components.media ?? 0.5,
    marketScore,
    listingPressure: scout.listingPressure,
    volatility: market?.volatility ?? null,
    mlbYears: input.mlbYears ?? 0,
    popScarcity: scout.popScarcity
  })
  const confidence = clamp01(market?.confidence ?? 0.35)
  const baseStrength = actionStrength(value.edge)
  const action: MarketActionLabel = chooseAction(value.edge, scout.riskScore)
  const strength = capStrengthForConfidence(baseStrength, confidence)

  return {
    scout,
    wave,
    valueRead: value.valueRead,
    action: {
      action,
      strength,
      edge: value.edge,
      confidence,
      horizon: chooseHorizon(wave.state),
      reasoning: actionReason(action, wave, value.valueRead),
      riskFlags: riskFlags(market, scout)
    },
    dlrImpact: computeMarketDlrImpact(input.marketScores)
  }
}
