export type LayerName = "knowledge" | "performance" | "media" | "market"
export type SubComponent = "snapshot" | "scout" | "analyst"
export type KnowledgePage = "bio" | "scout" | "career"

export type DLRTier = "ELITE" | "PREMIUM" | "SOLID" | "WATCHLIST" | "HOLD"

export type CellId =
  | { layer: "knowledge"; page: KnowledgePage; sub: SubComponent }
  | { layer: "performance"; sub: SubComponent }
  | { layer: "media"; sub: SubComponent }
  | { layer: "market"; sub: SubComponent }

export type KnowledgeSubScores = Record<KnowledgePage, Record<SubComponent, number>>
export type FlatLayerSubScores = Record<SubComponent, number>

export type AllSubScores = {
  knowledge: KnowledgeSubScores
  performance: FlatLayerSubScores
  media: FlatLayerSubScores
  market: FlatLayerSubScores
}

export type DLRComponents = Record<LayerName, number>
export type DLRConfidence = DLRComponents & { overall: number }

export type DLROutput = {
  rating: number
  tier: DLRTier
  components: DLRComponents
  confidence: DLRConfidence
  subScores: AllSubScores
}

export type AnchorConfig = {
  floor: number
  ceiling: number
  direction: 1 | -1
}

export const LAYER_MAX_POINTS: Record<LayerName, number> = {
  knowledge: 18,
  performance: 40,
  media: 18,
  market: 24
}

export const KNOWLEDGE_PAGE_POINTS: Record<
  KnowledgePage,
  Record<SubComponent, number>
> = {
  bio: { snapshot: 1, scout: 2, analyst: 3 },
  scout: { snapshot: 1, scout: 2, analyst: 3 },
  career: { snapshot: 1, scout: 2, analyst: 3 }
}

export const FLAT_LAYER_POINTS: Record<
  Exclude<LayerName, "knowledge">,
  Record<SubComponent, number>
> = {
  performance: { snapshot: 8, scout: 12, analyst: 20 },
  media: { snapshot: 4, scout: 6, analyst: 8 },
  market: { snapshot: 5, scout: 7, analyst: 12 }
}

export const TIER_BREAKS: { tier: DLRTier; min: number }[] = [
  { tier: "ELITE", min: 90 },
  { tier: "PREMIUM", min: 80 },
  { tier: "SOLID", min: 70 },
  { tier: "WATCHLIST", min: 60 },
  { tier: "HOLD", min: 0 }
]

export const HITTER_ANCHORS = {
  AVG: { floor: 0.2, ceiling: 0.36, direction: 1 },
  OPS: { floor: 0.6, ceiling: 1, direction: 1 },
  HR_per_AB: { floor: 0.005, ceiling: 0.075, direction: 1 },
  K_pct: { floor: 30, ceiling: 8, direction: -1 },
  BB_pct: { floor: 3, ceiling: 15, direction: 1 },
  Barrel_pct: { floor: 2, ceiling: 15, direction: 1 },
  HardHit_pct: { floor: 25, ceiling: 55, direction: 1 },
  Avg_EV: { floor: 82, ceiling: 95, direction: 1 },
  xAVG: { floor: 0.23, ceiling: 0.33, direction: 1 },
  xSLG: { floor: 0.35, ceiling: 0.58, direction: 1 }
} satisfies Record<string, AnchorConfig>

export const PITCHER_ANCHORS = {
  ERA: { floor: 6, ceiling: 2, direction: -1 },
  WHIP: { floor: 1.6, ceiling: 0.85, direction: -1 },
  K_pct: { floor: 15, ceiling: 35, direction: 1 },
  BB_pct: { floor: 12, ceiling: 4, direction: -1 },
  K_minus_BB: { floor: 5, ceiling: 25, direction: 1 },
  Whiff_pct: { floor: 18, ceiling: 35, direction: 1 },
  Stuff_plus: { floor: 80, ceiling: 120, direction: 1 },
  xERA: { floor: 5.5, ceiling: 2.5, direction: -1 }
} satisfies Record<string, AnchorConfig>

export const INVERTED_FIELDS: ReadonlySet<string> = new Set([
  "knowledge.bio.scout.risk",
  "knowledge.bio.analyst.injuryIdx",
  "knowledge.bio.analyst.assetRisk",
  "media.analyst.attentionDecay",
  "market.scout.volatility"
])

export function clamp01(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return 0
  return Math.max(0, Math.min(1, value))
}

export function getCellMaxPoints(cell: CellId): number {
  if (cell.layer === "knowledge") {
    return KNOWLEDGE_PAGE_POINTS[cell.page][cell.sub]
  }

  return FLAT_LAYER_POINTS[cell.layer][cell.sub]
}

export function normalizePsa10Premium(raw: number) {
  const cap = 4
  return Math.min(Math.max(raw, 0), cap) / cap
}

export function linearNormalize(
  value: number | null | undefined,
  anchor: AnchorConfig
): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null
  if (anchor.floor === anchor.ceiling) return 0

  return clamp01((value - anchor.floor) / (anchor.ceiling - anchor.floor))
}

export function safeAverage(values: (number | null)[]) {
  const populated = values.filter((value): value is number =>
    value !== null && value !== undefined && !Number.isNaN(value)
  )

  if (populated.length === 0) {
    return { avg: 0, populated: 0, expected: values.length }
  }

  return {
    avg: populated.reduce((sum, value) => sum + value, 0) / populated.length,
    populated: populated.length,
    expected: values.length
  }
}

export function computeKnowledgeLayer(scores: KnowledgeSubScores) {
  let contribution = 0
  const pages: KnowledgePage[] = ["bio", "scout", "career"]
  const subs: SubComponent[] = ["snapshot", "scout", "analyst"]

  for (const page of pages) {
    for (const sub of subs) {
      contribution += clamp01(scores[page][sub]) * KNOWLEDGE_PAGE_POINTS[page][sub]
    }
  }

  return { contribution, score: contribution / LAYER_MAX_POINTS.knowledge }
}

export function computeFlatLayer(
  layer: Exclude<LayerName, "knowledge">,
  scores: FlatLayerSubScores
) {
  let contribution = 0
  const subs: SubComponent[] = ["snapshot", "scout", "analyst"]

  for (const sub of subs) {
    contribution += clamp01(scores[sub]) * FLAT_LAYER_POINTS[layer][sub]
  }

  return { contribution, score: contribution / LAYER_MAX_POINTS[layer] }
}

export function ratingToTier(rating: number): DLRTier {
  for (const { tier, min } of TIER_BREAKS) {
    if (rating >= min) return tier
  }

  return "HOLD"
}

export function composeDLR(
  allSubScores: AllSubScores
): Pick<DLROutput, "rating" | "tier" | "components" | "subScores"> {
  const knowledge = computeKnowledgeLayer(allSubScores.knowledge)
  const performance = computeFlatLayer("performance", allSubScores.performance)
  const media = computeFlatLayer("media", allSubScores.media)
  const market = computeFlatLayer("market", allSubScores.market)
  const total =
    knowledge.contribution +
    performance.contribution +
    media.contribution +
    market.contribution
  const rating = Math.max(0, Math.min(100, Math.round(total)))

  return {
    rating,
    tier: ratingToTier(rating),
    components: {
      knowledge: knowledge.score,
      performance: performance.score,
      media: media.score,
      market: market.score
    },
    subScores: allSubScores
  }
}
