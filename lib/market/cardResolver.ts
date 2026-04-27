import type { CardKey, CardResolver } from "./types"

const PLAYER_CARD_KEYS: Record<string, CardKey> = {
  eli_willits: "2025-bowman-chrome-1st-eli-willits",
  casey_mize: "2018-bowman-chrome-1st-casey-mize"
}

export class StaticCardResolver implements CardResolver {
  resolve(playerId: string) {
    return PLAYER_CARD_KEYS[playerId] ?? null
  }

  resolveBatch(playerIds: string[]) {
    return Object.fromEntries(
      playerIds.map((playerId) => [playerId, this.resolve(playerId)])
    )
  }
}
