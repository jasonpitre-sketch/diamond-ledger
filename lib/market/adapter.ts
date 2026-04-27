import {
  type CardKey,
  type FetchOptions,
  type MarketAdapter,
  type MarketSnapshot,
  computeConfidence,
  emptySnapshot
} from "./types"

export class MockMarketAdapter implements MarketAdapter {
  readonly source = "mock"

  async fetchSnapshot(cardKey: CardKey, options?: FetchOptions) {
    const window = options?.window ?? 90
    const snap: Omit<MarketSnapshot, "confidence"> = {
      cardKey,
      fetchedAt: new Date(),
      window,
      source: this.source,
      prices: {
        raw: { avg: 25, median: 22, count: 12, low: 15, high: 45 },
        psa9: { avg: 75, median: 70, count: 6, low: 50, high: 110 },
        psa10: { avg: 200, median: 195, count: 4, low: 150, high: 280 }
      },
      volume: { soldLast30: 8, soldLast90: 22, trendDirection: 0.2 },
      listings: { activeCount: 14, avgAskPrice: 32, askToSoldRatio: 1.28 },
      population: { psa10Count: 42, psa9Count: 88, totalGraded: 240 },
      derived: {
        psa10ToRawMultiplier: 8,
        momentum7d: 0.04,
        momentum30d: 0.12,
        volatility: 0.35,
        spread: 0.55
      },
      meta: {
        rawCompCount: 22,
        oldestComp: new Date(Date.now() - 89 * 86400000),
        newestComp: new Date()
      }
    }

    return { ...snap, confidence: computeConfidence(snap) }
  }

  async isHealthy() {
    return true
  }
}

export class CardLadderAdapter implements MarketAdapter {
  readonly source = "cardladder"

  async fetchSnapshot(cardKey: CardKey, options?: FetchOptions) {
    void options

    return emptySnapshot(
      cardKey,
      this.source,
      options?.window ?? 90
    )
  }

  async isHealthy() {
    return false
  }
}

export class EbayBrowseAdapter implements MarketAdapter {
  readonly source = "browse"

  async fetchSnapshot(cardKey: CardKey, options?: FetchOptions) {
    return emptySnapshot(cardKey, this.source, options?.window ?? 90)
  }

  async isHealthy() {
    return false
  }
}

export class EbayMIAdapter implements MarketAdapter {
  readonly source = "ebay-mi"

  async fetchSnapshot(cardKey: CardKey, options?: FetchOptions) {
    return emptySnapshot(cardKey, this.source, options?.window ?? 90)
  }

  async isHealthy() {
    return false
  }
}
