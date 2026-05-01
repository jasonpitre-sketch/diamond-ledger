import { clamp01 } from "@/data/dlr/dlrConfig"

export type MarketGrade = "RAW" | "PSA9" | "PSA10"
export type MarketCompKind = "sold" | "active"
export type MarketSaleType = "auction" | "bin" | "best-offer" | "listing" | "unknown"

export type MarketComp = {
  date: string
  grade: MarketGrade
  price: number
  kind: MarketCompKind
  source: "ebay" | "manual" | "cardladder" | "market-movers" | "other"
  saleType?: MarketSaleType
  title?: string
  url?: string
  confidence?: number
}

export type MarketHistoryInput = {
  cardKey: string
  asOf: string
  comps: MarketComp[]
  notes?: string
}

export type ComputedLegacyMarket = {
  rawAvg: number | null
  psa9Avg: number | null
  psa10Avg: number | null
  psa10Premium: number | null
  liquidity: number
  trend: number
  scarcity: number
  depth: number
  volatility: number
  longTerm: number
  stability: number
  confidence: number
  sold90Count: number
  activeCount: number
  spread: number | null
  source: string
  cardKey: string
  asOf: string
  notes?: string
}

const DAY_MS = 1000 * 60 * 60 * 24

function avg(values: number[]) {
  if (values.length === 0) return null

  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function roundPrice(value: number | null) {
  return value === null ? null : Math.round(value)
}

function byGrade(comps: MarketComp[], grade: MarketGrade) {
  return comps.filter((comp) => comp.grade === grade)
}

function daysBetween(a: Date, b: Date) {
  return Math.round((a.getTime() - b.getTime()) / DAY_MS)
}

function soldWithin(comps: MarketComp[], asOf: Date, days: number) {
  return comps.filter((comp) => {
    if (comp.kind !== "sold") return false

    const date = new Date(comp.date)
    const age = daysBetween(asOf, date)

    return age >= 0 && age <= days
  })
}

function soldBetween(comps: MarketComp[], asOf: Date, minDays: number, maxDays: number) {
  return comps.filter((comp) => {
    if (comp.kind !== "sold") return false

    const date = new Date(comp.date)
    const age = daysBetween(asOf, date)

    return age > minDays && age <= maxDays
  })
}

function coefficientOfVariation(values: number[]) {
  if (values.length < 2) return 0.35

  const mean = avg(values)
  if (!mean) return 0.35

  const variance =
    values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length

  return clamp01(Math.sqrt(variance) / mean)
}

function gradeCoverage(rawAvg: number | null, psa9Avg: number | null, psa10Avg: number | null) {
  return [rawAvg, psa9Avg, psa10Avg].filter((value) => value !== null).length / 3
}

function confidenceFrom(history: MarketHistoryInput, sold90: MarketComp[], active: MarketComp[]) {
  const rawAvg = avg(byGrade(sold90, "RAW").map((comp) => comp.price))
  const psa9Avg = avg(byGrade(sold90, "PSA9").map((comp) => comp.price))
  const psa10Avg = avg(byGrade(sold90, "PSA10").map((comp) => comp.price))
  const compFactor = clamp01(sold90.length / 18)
  const activeFactor = clamp01(active.length / 12)
  const sourceFactor =
    history.comps.filter((comp) => comp.source === "ebay").length / Math.max(1, history.comps.length)

  return clamp01(
    0.42 * compFactor +
      0.2 * activeFactor +
      0.24 * gradeCoverage(rawAvg, psa9Avg, psa10Avg) +
      0.14 * sourceFactor
  )
}

export function computeLegacyMarketFromHistory(history: MarketHistoryInput): ComputedLegacyMarket {
  const asOf = new Date(history.asOf)
  const sold90 = soldWithin(history.comps, asOf, 90)
  const sold30 = soldWithin(history.comps, asOf, 30)
  const prior60 = soldBetween(history.comps, asOf, 30, 90)
  const active = history.comps.filter((comp) => comp.kind === "active")
  const rawAvg = roundPrice(avg(byGrade(sold90, "RAW").map((comp) => comp.price)))
  const psa9Avg = roundPrice(avg(byGrade(sold90, "PSA9").map((comp) => comp.price)))
  const psa10Avg = roundPrice(avg(byGrade(sold90, "PSA10").map((comp) => comp.price)))
  const latestAvg = avg(sold30.map((comp) => comp.price))
  const priorAvg = avg(prior60.map((comp) => comp.price))
  const momentum =
    latestAvg !== null && priorAvg !== null && priorAvg > 0
      ? clamp01(0.5 + (latestAvg - priorAvg) / priorAvg)
      : 0.5
  const volatility = coefficientOfVariation(sold90.map((comp) => comp.price))
  const soldReference = psa9Avg ?? rawAvg ?? psa10Avg
  const activeAvg = avg(active.map((comp) => comp.price))
  const spread =
    activeAvg !== null && soldReference
      ? clamp01(Math.abs(activeAvg - soldReference) / soldReference)
      : null
  const confidence = confidenceFrom(history, sold90, active)
  const premium =
    rawAvg && psa10Avg
      ? Number((psa10Avg / rawAvg).toFixed(2))
      : null

  return {
    rawAvg,
    psa9Avg,
    psa10Avg,
    psa10Premium: premium,
    liquidity: clamp01(sold90.length / 20),
    trend: momentum,
    scarcity: clamp01(0.85 - active.length / 40),
    depth: clamp01(active.length / 18),
    volatility,
    longTerm: clamp01(((premium ?? 2) / 4 + momentum) / 2),
    stability: clamp01((1 - volatility) * 0.72 + (1 - (spread ?? 0.35)) * 0.28),
    confidence,
    sold90Count: sold90.length,
    activeCount: active.length,
    spread,
    source: "market-history",
    cardKey: history.cardKey,
    asOf: history.asOf,
    notes: history.notes
  }
}
