/**
 * Pass 68 — Kade Anderson Market (2026-05-14)
 * Status: PRE_BOWMAN — no Bowman 1st Auto released yet (assumed)
 * Treatment: Projected market values based on draft pedigree + early pro dominance
 * Comparable: Paul Skenes / 2023 #1 pick pre-Bowman trajectory, adjusted for LHP scarcity
 *
 * marketArchetype: "GENERATIONAL"
 *   Frozen 8-archetype registry — #3 overall + CWS MOP + current AA dominance qualifies.
 *   "PRE_BOWMAN_BLUE_CHIP_ARM" does not exist in the frozen registry.
 *   GENERATIONAL is the correct fit for top-3 draft positioning with elite performance pedigree.
 *
 * projectedRelease: Bowman Draft 2025 (likely already in set) or Bowman Chrome 2026
 */

export const kade_anderson_market = {
  marketArchetype: "GENERATIONAL" as const,

  /* =========================
     SNAPSHOT — PRE_BOWMAN, all pricing null
  ========================= */
  rawAvg:  null,
  psa9Avg: null,
  psa10Avg: null,
  projectedRelease: "Bowman Draft 2025 / Bowman Chrome 2026",

  /* =========================
     SCOUT — projected market behavior signals
  ========================= */
  liquidity:  0.85,
  trend:      0.85,   // momentum climbing on AA dominance + fast-track narrative
  volatility: 0.72,
  scarcity:   0.85,   // LHP starter scarcity premium applied
  depth:      0.80,
  stability:  0.70,

  /* =========================
     ANALYST — long-range market projections
  ========================= */
  longTerm:   0.90,   // CWS hero + #3 pick + LHP + current dominance = strong long-term floor
  confidence: 0.55    // PRE_BOWMAN — no live comps to anchor
}
