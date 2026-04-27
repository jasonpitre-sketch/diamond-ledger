export type CardKey = string
export type MarketWindow = 30 | 60 | 90

export type PriceBucket = {
  avg: number
  median: number
  count: number
  low: number
  high: number
}

export type GradeBuckets = {
  raw: PriceBucket | null
  psa9: PriceBucket | null
  psa10: PriceBucket | null
  bgs95?: PriceBucket | null
  sgc10?: PriceBucket | null
}

export type VolumeData = {
  soldLast30: number | null
  soldLast90: number | null
  trendDirection: number | null
}

export type ListingsData = {
  activeCount: number | null
  avgAskPrice: number | null
  askToSoldRatio: number | null
}

export type PopulationData = {
  psa10Count: number | null
  psa9Count: number | null
  totalGraded: number | null
}

export type DerivedMetrics = {
  psa10ToRawMultiplier: number | null
  momentum7d: number | null
  momentum30d: number | null
  volatility: number | null
  spread: number | null
}

export type SnapshotMeta = {
  rawCompCount: number
  oldestComp: Date | null
  newestComp: Date | null
  notes?: string
}

export type MarketSnapshot = {
  cardKey: CardKey
  fetchedAt: Date
  window: MarketWindow
  source: string
  prices: GradeBuckets
  volume: VolumeData | null
  listings: ListingsData | null
  population: PopulationData | null
  derived: DerivedMetrics | null
  confidence: number
  meta: SnapshotMeta
}

export type FetchOptions = {
  window?: MarketWindow
  forceRefresh?: boolean
}

export interface CardResolver {
  resolve(playerId: string): CardKey | null
  resolveBatch(playerIds: string[]): Record<string, CardKey | null>
}

export interface MarketAdapter {
  readonly source: string
  fetchSnapshot(cardKey: CardKey, options?: FetchOptions): Promise<MarketSnapshot | null>
  fetchBatch?(
    cardKeys: CardKey[],
    options?: FetchOptions
  ): Promise<Record<CardKey, MarketSnapshot | null>>
  isHealthy(): Promise<boolean>
}

export const SOURCE_TRUST: Record<string, number> = {
  "ebay-mi": 1,
  cardladder: 0.85,
  browse: 0.5,
  user: 0.7,
  merged: 0.95,
  mock: 0.8
}

export function getSourceTrust(source: string) {
  return SOURCE_TRUST[source] ?? 0.5
}

export function computeConfidence(snap: Omit<MarketSnapshot, "confidence">) {
  const compFactor = Math.min(1, snap.meta.rawCompCount / 20)
  const freshnessFactor = (() => {
    if (!snap.meta.newestComp) return 0

    const ageDays =
      (snap.fetchedAt.getTime() - snap.meta.newestComp.getTime()) /
      (1000 * 60 * 60 * 24)

    if (ageDays < 0) return 1

    return Math.max(0, 1 - ageDays / snap.window)
  })()
  const gradeCoverage = (() => {
    let count = 0
    if (snap.prices.raw) count += 1
    if (snap.prices.psa9) count += 1
    if (snap.prices.psa10) count += 1

    return count / 3
  })()
  const sourceTrust = getSourceTrust(snap.source)

  return Math.max(
    0,
    Math.min(
      1,
      0.4 * compFactor +
        0.3 * freshnessFactor +
        0.2 * gradeCoverage +
        0.1 * sourceTrust
    )
  )
}

export function emptySnapshot(
  cardKey: CardKey,
  source: string,
  window: MarketWindow = 90
): MarketSnapshot {
  const now = new Date()

  return {
    cardKey,
    fetchedAt: now,
    window,
    source,
    prices: { raw: null, psa9: null, psa10: null },
    volume: null,
    listings: null,
    population: null,
    derived: null,
    confidence: 0,
    meta: {
      rawCompCount: 0,
      oldestComp: null,
      newestComp: null,
      notes: "no comps found"
    }
  }
}

export type CohortField =
  | "raw_avg"
  | "psa10_avg"
  | "sold_90d"
  | "active_count"
  | "psa10_pop"

export interface CohortStats {
  percentileRank(field: CohortField, value: number): number
}
