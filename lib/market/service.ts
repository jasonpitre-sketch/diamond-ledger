import type {
  CardKey,
  CardResolver,
  FetchOptions,
  MarketAdapter,
  MarketSnapshot
} from "./types"

type CacheEntry = {
  snapshot: MarketSnapshot | null
  fetchedAt: number
}

export class MarketDataService {
  private cache = new Map<string, CacheEntry>()

  constructor(
    private readonly adapter: MarketAdapter,
    private readonly resolver?: CardResolver,
    private readonly ttlMs = 1000 * 60 * 60 * 6
  ) {}

  async fetchCardSnapshot(cardKey: CardKey, options?: FetchOptions) {
    const cacheKey = `${this.adapter.source}:${cardKey}:${options?.window ?? 90}`
    const cached = this.cache.get(cacheKey)

    if (
      cached &&
      !options?.forceRefresh &&
      Date.now() - cached.fetchedAt < this.ttlMs
    ) {
      return cached.snapshot
    }

    const snapshot = await this.adapter.fetchSnapshot(cardKey, options)
    this.cache.set(cacheKey, { snapshot, fetchedAt: Date.now() })

    return snapshot
  }

  async fetchPlayerSnapshot(playerId: string, options?: FetchOptions) {
    const cardKey = this.resolver?.resolve(playerId)

    if (!cardKey) return null

    return this.fetchCardSnapshot(cardKey, options)
  }

  async isHealthy() {
    return this.adapter.isHealthy()
  }
}
