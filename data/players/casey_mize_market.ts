/**
 * Pass 71 — Casey Mize Market (2026-05-14)
 * Status: LIVE MARKET — 2018 Bowman Draft 1st Auto (real card, real comps)
 * Treatment: Established 2018 cohort card market; real transactional data via market_history
 *
 * marketArchetype: "HIGH_RISK_ARM"
 *   Describes card market personality (collector behavior), NOT on-field volatility.
 *   Frozen 8 registry: HIGH_RISK_ARM is the correct fit for Tommy John returnee on IL.
 *   Collector psychology = injury-sensitive; high ceiling when healthy creates speculative demand.
 *   "RE_ENTRY_VETERAN" does NOT exist in the frozen 8-archetype registry.
 *   On-field excellence (2.90 ERA in 2026) creates upside narrative, IL suppresses it.
 *
 * Card: 2018 Bowman Draft 1st Autograph (chrome)
 * Source: computeLegacyMarketFromHistory — eBay sold + active comps from casey_mize_market_history
 * NOTE: Pricing estimates below are market-history derived. Verify vs. eBay sold / 130point.com
 *       for "Casey Mize 2018 Bowman Draft Auto" before reporting live values.
 */

import { computeLegacyMarketFromHistory } from "@/lib/market/history"

import { casey_mize_market_history } from "./casey_mize_market_history"

const _computed = computeLegacyMarketFromHistory(casey_mize_market_history)

export const casey_mize_market = {
  marketArchetype: "HIGH_RISK_ARM" as const,
  ..._computed,
}
