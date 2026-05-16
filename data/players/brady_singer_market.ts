/**
 * Pass 70 — Brady Singer Market (2026-05-14)
 * Status: LIVE MARKET — 2018 Bowman Draft 1st Auto (real card, real comps)
 * Treatment: Established veteran card market; real transactional data available
 *
 * marketArchetype: "POLISHED_ARM"
 *   Describes card market personality (collector behavior), NOT on-field volatility.
 *   Frozen 8 registry: POLISHED_ARM is the correct fit for established mid-rotation MLB starter.
 *   "ESTABLISHED_VETERAN_VOLATILE" does not exist in the frozen registry.
 *   On-field yo-yo pattern is captured in performance/analyst layers, not archetype.
 *   POLISHED_ARM: steady demand, dedicated pitcher collector base, no explosive hype cycles.
 *
 * Card: 2018 Bowman Draft 1st Autograph (chrome)
 * Comparable market tier: mid-round 2018 draft class pitchers
 * NOTE: Pricing estimates below are approximate. Verify vs. eBay sold / 130point.com
 *       for "Brady Singer 2018 Bowman Draft Auto" before reporting live values.
 */

export const brady_singer_market = {
  marketArchetype: "POLISHED_ARM" as const,

  /* =========================
     SNAPSHOT — live market estimates
     NOTE: Approximate values — career volatility creates instability in auto market
  ========================= */
  rawAvg:   12,    // ESTIMATED: ~$8-15 range for raw 2018 Bowman Draft auto
  psa9Avg:  30,    // ESTIMATED: ~$25-40 for PSA 9
  psa10Avg: 75,    // ESTIMATED: ~$60-90 for PSA 10

  /* =========================
     SCOUT — market structure
  ========================= */
  liquidity:  0.52,
  trend:      0.38,    // declining — current slump suppresses card demand
  volatility: 0.55,    // moderate-high; career volatility maps to card price swings

  scarcity:  0.45,     // multiple sets, broad availability
  depth:     0.55,
  stability: 0.50,     // wobbles with his ERA narrative

  /* =========================
     ANALYST — long-range market read
  ========================= */
  longTerm:   0.45,    // volatile career = volatile long-term card value
  confidence: 0.65     // real card, real comps available — higher confidence than PRE_BOWMAN
}
