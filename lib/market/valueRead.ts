import { clamp01 } from "@/data/dlr/dlrConfig"

export type MarketValueRead =
  | "DEEPLY_UNDERVALUED"
  | "UNDERVALUED"
  | "FAIR"
  | "OVERVALUED"
  | "DEEPLY_OVERVALUED"

export type MarketValueInput = {
  performanceScore: number
  knowledgeScore: number
  mediaScore: number
  marketHypeScore: number
}

export function computeFundamentalsScore(input: Pick<MarketValueInput, "performanceScore" | "knowledgeScore">) {
  return clamp01(input.performanceScore) * 0.7 + clamp01(input.knowledgeScore) * 0.3
}

export function computeHypeScore(input: Pick<MarketValueInput, "mediaScore" | "marketHypeScore">) {
  return clamp01(input.mediaScore) * 0.4 + clamp01(input.marketHypeScore) * 0.6
}

export function classifyValueRead(input: MarketValueInput) {
  const fundamentals = computeFundamentalsScore(input)
  const hype = computeHypeScore(input)
  const edge = fundamentals - hype
  let valueRead: MarketValueRead = "FAIR"

  if (edge > 0.25) valueRead = "DEEPLY_UNDERVALUED"
  else if (edge > 0.1) valueRead = "UNDERVALUED"
  else if (edge < -0.25) valueRead = "DEEPLY_OVERVALUED"
  else if (edge < -0.1) valueRead = "OVERVALUED"

  return {
    valueRead,
    edge,
    fundamentals,
    hype
  }
}

