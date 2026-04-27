import type { FlatLayerSubScores } from "@/data/dlr/dlrConfig"
import { clamp01 } from "@/data/dlr/dlrConfig"

import type { CohortStats, MarketSnapshot } from "./types"

type NormalizedCardMarket = {
  psa10Premium: number | null
  liquidity: number | null
  trend: number | null
  scarcity: number | null
  depth: number | null
  volatility: number | null
  longTerm: number | null
  stability: number | null
  confidence: number | null
}

function avg(values: Array<number | null | undefined>) {
  const populated = values.filter((value): value is number =>
    typeof value === "number" && Number.isFinite(value)
  )

  if (populated.length === 0) return 0

  return populated.reduce((sum, value) => sum + value, 0) / populated.length
}

function anchor(value: number | null | undefined, floor: number, ceiling: number) {
  if (typeof value !== "number" || !Number.isFinite(value) || floor === ceiling) {
    return null
  }

  return clamp01((value - floor) / (ceiling - floor))
}

function invert(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? 1 - clamp01(value) : null
}

export function normalizeMarketSnapshot(
  snapshot: MarketSnapshot,
  cohortStats?: CohortStats
): NormalizedCardMarket {
  const rawAvg = snapshot.prices.raw?.avg ?? null
  const psa10Avg = snapshot.prices.psa10?.avg ?? null
  const sold90 = snapshot.volume?.soldLast90 ?? null
  const activeCount = snapshot.listings?.activeCount ?? null
  const psa10Pop = snapshot.population?.psa10Count ?? null
  const psa10Premium =
    snapshot.derived?.psa10ToRawMultiplier ??
    (rawAvg && psa10Avg ? psa10Avg / rawAvg : null)

  return {
    psa10Premium:
      typeof psa10Premium === "number" ? clamp01(psa10Premium / 4) : null,
    liquidity:
      sold90 !== null
        ? cohortStats?.percentileRank("sold_90d", sold90) ?? anchor(sold90, 0, 40)
        : null,
    trend: avg([
      anchor(snapshot.derived?.momentum7d, -0.2, 0.25),
      anchor(snapshot.derived?.momentum30d, -0.35, 0.5),
      anchor(snapshot.volume?.trendDirection, -1, 1)
    ]),
    scarcity:
      psa10Pop !== null
        ? invert(cohortStats?.percentileRank("psa10_pop", psa10Pop) ?? anchor(psa10Pop, 0, 500))
        : null,
    depth:
      activeCount !== null
        ? cohortStats?.percentileRank("active_count", activeCount) ?? anchor(activeCount, 0, 50)
        : null,
    volatility: snapshot.derived?.volatility ?? null,
    longTerm: avg([
      psa10Avg !== null
        ? cohortStats?.percentileRank("psa10_avg", psa10Avg) ?? anchor(psa10Avg, 0, 500)
        : null,
      rawAvg !== null
        ? cohortStats?.percentileRank("raw_avg", rawAvg) ?? anchor(rawAvg, 0, 100)
        : null,
      anchor(snapshot.derived?.momentum30d, -0.35, 0.5)
    ]),
    stability: avg([
      invert(snapshot.derived?.volatility),
      invert(snapshot.derived?.spread),
      snapshot.listings?.askToSoldRatio
        ? anchor(1 / snapshot.listings.askToSoldRatio, 0.5, 1.1)
        : null
    ]),
    confidence: snapshot.confidence
  }
}

export function scoreMarketSnapshot(
  snapshot: MarketSnapshot,
  cohortStats?: CohortStats
): FlatLayerSubScores {
  const market = normalizeMarketSnapshot(snapshot, cohortStats)

  return {
    snapshot: avg([market.psa10Premium, market.liquidity, market.trend]),
    scout: avg([market.scarcity, market.depth, invert(market.volatility)]),
    analyst: avg([market.longTerm, market.stability, market.confidence])
  }
}
