/* =============================================================
   MARKET ENRICHER — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   enrichMarket(player) fills absent cardMarket fields with
   neutral 0.5 defaults for display purposes.

   IMPORTANT SCOPE BOUNDARY:
   calculateDLR.ts reads player.marketSnapshot — NOT player.cardMarket.
   cardMarket enrichment is DISPLAY-ONLY and does NOT affect DLR scores.

   FORBIDDEN: This enricher never creates marketSnapshot (requires live
   eBay data). Never invents price points (rawAvg, psa9Avg, psa10Avg).

   See ENRICHMENT_RULES.md §3 for safe/forbidden market enrichment.
   See ENGINE_FREEZE.md for system boundaries.
   ============================================================= */

import type { Player, LegacyCardMarket } from "@/data/types/player"

/* =========================
   OUTPUT TYPE
========================= */

export type EnrichMarketResult = {
  /** The (possibly enriched) cardMarket object */
  cardMarket: LegacyCardMarket
  /** Sub-paths that were scaffolded */
  scaffolded: string[]
}

/* =========================
   NEUTRAL SCAFFOLD DEFAULTS
========================= */

/**
 * Neutral cardMarket scaffold — 0–1 signal fields only.
 *
 * Price fields (rawAvg, psa9Avg, psa10Avg) are intentionally absent —
 * there is no safe fabricated price. Only 0–1 signal fields are scaffolded.
 *
 * NOTE: These fields are NOT read by calculateDLR(). They are used by
 * UI components that render cardMarket data directly (display layer).
 */
const NEUTRAL_CARD_MARKET_SIGNALS: Partial<LegacyCardMarket> = {
  liquidity:   0.5,
  trend:       0.5,
  scarcity:    0.5,
  depth:       0.5,
  volatility:  0.5,
  longTerm:    0.5,
  stability:   0.5,
  confidence:  0.5,
} as const

/** Signal fields that are safe to scaffold */
const SCAFFOLDABLE_FIELDS = Object.keys(NEUTRAL_CARD_MARKET_SIGNALS) as Array<keyof typeof NEUTRAL_CARD_MARKET_SIGNALS>

/* =========================
   ENRICHER
========================= */

/**
 * Enriches the cardMarket layer by filling absent 0–1 signal fields
 * with neutral 0.5 defaults.
 *
 * Display-layer enrichment only — does NOT affect DLR scoring.
 *
 * - If cardMarket is entirely absent: inject neutral signal scaffold.
 * - If cardMarket is present but missing some signal fields: fill gaps.
 * - Price fields (rawAvg, psa9Avg, psa10Avg) are never scaffolded.
 * - Existing non-null values are NEVER overwritten.
 */
export function enrichMarket(player: Player): EnrichMarketResult {
  const existing = player.cardMarket ?? {}
  const scaffolded: string[] = []
  const result: LegacyCardMarket = { ...existing }

  let anyInjected = false

  for (const field of SCAFFOLDABLE_FIELDS) {
    if (result[field] == null) {
      (result as Record<string, unknown>)[field] = NEUTRAL_CARD_MARKET_SIGNALS[field]
      anyInjected = true
    }
  }

  if (anyInjected) {
    const wasEmpty = Object.keys(existing).length === 0
    scaffolded.push(wasEmpty ? "cardMarket" : "cardMarket.partial")
  }

  if (scaffolded.length === 0) {
    return { cardMarket: existing, scaffolded: [] }
  }

  return { cardMarket: result, scaffolded }
}
