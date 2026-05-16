/* =============================================================
   MARKET ARCHETYPE REGISTRY — FROZEN (2026-05-08)
   -------------------------------------------------------------
   Authoritative registry of pre-Bowman market personality archetypes.

   ⚠️  THIS IS PROJECTED MARKET INTELLIGENCE
       NOT LIVE TRANSACTIONAL DATA

   These archetypes describe HOBBY BEHAVIOR PERSONALITY — how a
   collector market is expected to behave around a prospect class,
   based on draft position, pedigree, tool profile, and media strength.

   They do NOT contain:
     ✗ sold eBay listings
     ✗ PSA population data
     ✗ Card Ladder comps
     ✗ live transactional data
     ✗ marketSnapshot objects

   FROZEN ARCHETYPE LIST (8 total — DO NOT ADD MORE):
     1. GENERATIONAL
     2. PREMIUM_COLLEGE_BAT
     3. TOOLSY_UPSIDE
     4. ATHLETIC_SPECULATION
     5. POLISHED_ARM
     6. HIGH_RISK_ARM
     7. SLEEPER_VALUE
     8. HYPE_MONSTER

   ARCHITECTURE NOTE:
     These archetypes feed projectedMarket.ts (display-layer only).
     They do NOT feed calculateDLR.ts or scoreMarketSnapshot().
     DLR market layer remains neutral (12/24) until a live
     marketSnapshot is wired post-Bowman release.

   PRE-BOWMAN ACTIVATION RULE:
     All archetypes are PRE_BOWMAN mode by default.
     Live blending activates ONLY after Bowman release (see marketLifecycle.ts).
     No fake comps. No fabricated transactional signals.

   DO NOT DUPLICATE. DO NOT MODIFY SCORING WEIGHTS.
   ============================================================= */

/* =========================
   TYPES
========================= */

/**
 * Frozen set of 8 market personality archetypes.
 * DO NOT ADD MORE without a full pass review.
 */
export type MarketArchetypeName =
  | "GENERATIONAL"
  | "PREMIUM_COLLEGE_BAT"
  | "TOOLSY_UPSIDE"
  | "ATHLETIC_SPECULATION"
  | "POLISHED_ARM"
  | "HIGH_RISK_ARM"
  | "SLEEPER_VALUE"
  | "HYPE_MONSTER"

/**
 * Market personality profile — all fields normalized 0–1.
 *
 * DISPLAY LAYER ONLY — these values are NOT DLR scoring inputs.
 * They describe projected hobby collector behavior, not transactional data.
 */
export type MarketArchetypeProfile = {
  /** Expected collector liquidity bias. High = easier to buy/sell quickly. */
  liquidityBias: number

  /** Expected price swing sensitivity. High = larger projected swings. */
  volatilityBias: number

  /** Sensitivity to media events (draft position, signing, debut). */
  hypeSensitivity: number

  /** Projected Bowman 1st auto premium strength vs. base chrome. */
  bowmanPremium: number

  /** Likelihood of meaningful price correction post-hype peak. */
  correctionRisk: number

  /** How stable projected confidence readings are over time. */
  confidenceStability: number

  /** How quickly wave momentum is expected to build at catalyst events. */
  waveAcceleration: number

  /** Long-term collector durability. High = blue-chip floor potential. */
  longTermDurability: number
}

/* =========================
   ARCHETYPE REGISTRY
========================= */

/**
 * MARKET_ARCHETYPES — authoritative 8-archetype registry.
 *
 * ⚠️  PRE-BOWMAN MARKET INTELLIGENCE ONLY.
 *     All values are projected hobby behavior biases, NOT live market data.
 *
 * Guidance source: draft position conventions, hobby expectation tiers,
 * comparable prospect trajectories, collector psychology profiles.
 */
export const MARKET_ARCHETYPES: Record<MarketArchetypeName, MarketArchetypeProfile> = {

  /* ------------------------------------------------------------------
     GENERATIONAL
     Profile: Extreme collector gravity. Historic draft positioning.
     Comparable: Bobby Witt Jr. 2019, Wander Franco 2021 trajectories.
     Expected: maximum Bowman premium, durable long-term floor,
     some correction risk due to sky-high expectations.
  ------------------------------------------------------------------ */
  GENERATIONAL: {
    liquidityBias:       0.97,  // near-instant market depth at every grade
    volatilityBias:      0.72,  // high — generational hype creates swing risk
    hypeSensitivity:     0.98,  // every media event moves the market
    bowmanPremium:       0.97,  // top-end Bowman auto premium anticipated
    correctionRisk:      0.68,  // expectations so high that any miss corrects hard
    confidenceStability: 0.60,  // pre-signing uncertainty tempers stability
    waveAcceleration:    0.95,  // wave builds explosively at every catalyst
    longTermDurability:  0.90   // blue-chip floor if they reach ceiling
  },

  /* ------------------------------------------------------------------
     PREMIUM_COLLEGE_BAT
     Profile: Polished hitting prospect with strong pedigree signal.
     Comparable: Andrew Vaughn, Spencer Torkelson early hobby arcs.
     Expected: stable demand, trust-based collector base, moderate
     volatility relative to toolsy or speculative archetypes.
  ------------------------------------------------------------------ */
  PREMIUM_COLLEGE_BAT: {
    liquidityBias:       0.82,  // strong market depth — collectors trust the profile
    volatilityBias:      0.55,  // moderate — polished profile reduces swing risk
    hypeSensitivity:     0.78,  // responds to draft news / signing but not violently
    bowmanPremium:       0.84,  // strong Bowman floor — college bats grade well
    correctionRisk:      0.42,  // lower correction risk — realistic expectations
    confidenceStability: 0.72,  // stability good — known college production base
    waveAcceleration:    0.72,  // wave builds steadily not explosively
    longTermDurability:  0.82   // strong long-term floor if bat translates
  },

  /* ------------------------------------------------------------------
     TOOLSY_UPSIDE
     Profile: Tools-over-production prospect. High ceiling, raw profile.
     Expected: explosive hype at catalysts, larger wave movements,
     higher correction risk when tools don't immediately translate.
  ------------------------------------------------------------------ */
  TOOLSY_UPSIDE: {
    liquidityBias:       0.72,  // good liquidity — upside drives collector interest
    volatilityBias:      0.82,  // high — production gaps create swing risk
    hypeSensitivity:     0.88,  // heavily media-driven; each tool showcase moves market
    bowmanPremium:       0.76,  // decent Bowman premium — upside story is compelling
    correctionRisk:      0.72,  // significant — raw tools don't always confirm
    confidenceStability: 0.48,  // lower stability — projection-dependent confidence
    waveAcceleration:    0.85,  // wave can spike fast on tool showcase events
    longTermDurability:  0.65   // dependent on development arc follow-through
  },

  /* ------------------------------------------------------------------
     ATHLETIC_SPECULATION
     Profile: Pure athleticism projection. Position/tool uncertainty.
     Expected: confidence instability, projection-driven pricing,
     breakout-sensitive — one standout moment reshapes the market.
  ------------------------------------------------------------------ */
  ATHLETIC_SPECULATION: {
    liquidityBias:       0.55,  // moderate — speculation pools are smaller
    volatilityBias:      0.88,  // very high — pure projection equals high swing risk
    hypeSensitivity:     0.82,  // breakout-event sensitive
    bowmanPremium:       0.58,  // below-average — uncertainty discounts Bowman value
    correctionRisk:      0.82,  // high — speculation corrects hard on disappointment
    confidenceStability: 0.32,  // low stability — confidence depends on next event
    waveAcceleration:    0.78,  // can spike fast but lacks durable momentum
    longTermDurability:  0.48   // long-term outlook uncertain — position/tool dependent
  },

  /* ------------------------------------------------------------------
     POLISHED_ARM
     Profile: Command-first pitcher with reliable floor, lower hype.
     Expected: steady demand, lower volatility, less media-driven.
     Comparable: steady mid-rotation starters with early MLB paths.
  ------------------------------------------------------------------ */
  POLISHED_ARM: {
    liquidityBias:       0.68,  // solid — pitchers have dedicated collector base
    volatilityBias:      0.38,  // low — steady profile reduces swing risk
    hypeSensitivity:     0.52,  // below average — pitchers less media-driven
    bowmanPremium:       0.72,  // reasonable Bowman premium — command floors hold
    correctionRisk:      0.30,  // lower correction risk — realistic floor expectations
    confidenceStability: 0.78,  // strong stability — known command profile
    waveAcceleration:    0.48,  // slow-building wave — less explosive than bats
    longTermDurability:  0.75   // good durability if command translates to MLB
  },

  /* ------------------------------------------------------------------
     HIGH_RISK_ARM
     Profile: Power arm with injury/command concerns. Volatile profile.
     Expected: high volatility, wave-sensitive, confidence instability.
     Injury news = sharp correction. Dominant start = spike.
  ------------------------------------------------------------------ */
  HIGH_RISK_ARM: {
    liquidityBias:       0.58,  // moderate — risk profile limits depth
    volatilityBias:      0.92,  // very high — injury sensitivity maximizes swings
    hypeSensitivity:     0.75,  // responds to health/command events sharply
    bowmanPremium:       0.62,  // modest — ceiling is tantalizing but risk is priced in
    correctionRisk:      0.88,  // very high — injury risk = hard correction potential
    confidenceStability: 0.25,  // very low — one health event reshapes confidence
    waveAcceleration:    0.72,  // wave can spike on dominant outings
    longTermDurability:  0.40   // durability highly path-dependent
  },

  /* ------------------------------------------------------------------
     SLEEPER_VALUE
     Profile: Under-the-radar prospect. Low initial hype, value collector.
     Expected: slow-burn appreciation, small but dedicated collector base.
     Wave builds gradually — catalyst-dependent re-rating potential.
  ------------------------------------------------------------------ */
  SLEEPER_VALUE: {
    liquidityBias:       0.32,  // low — limited collector depth initially
    volatilityBias:      0.42,  // moderate — lower expectations reduce swing violence
    hypeSensitivity:     0.45,  // below average — not heavily media-driven
    bowmanPremium:       0.48,  // modest Bowman premium — not a marquee name
    correctionRisk:      0.35,  // low — low expectations limit downside
    confidenceStability: 0.62,  // reasonable — quiet market is stable market
    waveAcceleration:    0.38,  // slow to build; needs re-rating catalyst
    longTermDurability:  0.68   // value collectors are sticky — slow burn holds
  },

  /* ------------------------------------------------------------------
     HYPE_MONSTER
     Profile: Maximum media / social buzz, not necessarily tools-driven.
     Expected: violent wave acceleration, heavy correction danger.
     One narrative event = explosive move in either direction.
  ------------------------------------------------------------------ */
  HYPE_MONSTER: {
    liquidityBias:       0.88,  // very high — hype creates massive collector pools
    volatilityBias:      0.95,  // extreme — hype-driven pricing is maximally volatile
    hypeSensitivity:     0.98,  // maximum — this archetype is entirely media-driven
    bowmanPremium:       0.88,  // very high Bowman premium — hype inflates everything
    correctionRisk:      0.92,  // extreme — hype without substance corrects violently
    confidenceStability: 0.22,  // very low — confidence collapses when hype fades
    waveAcceleration:    0.98,  // maximum — wave builds almost instantly
    longTermDurability:  0.30   // low durability — hype fades without baseball backing
  }

}

/* =========================
   HELPERS
========================= */

/**
 * Returns the archetype profile for a given name.
 * Returns null for unknown names — never throws.
 */
export function getArchetypeProfile(
  name: MarketArchetypeName | string | null | undefined
): MarketArchetypeProfile | null {
  if (!name) return null
  return MARKET_ARCHETYPES[name as MarketArchetypeName] ?? null
}

/**
 * Returns a human-readable label for an archetype name.
 * Safe to call with unknown input — returns "Unknown" as fallback.
 */
export function archetypeLabel(name: MarketArchetypeName | string | null | undefined): string {
  const LABELS: Record<MarketArchetypeName, string> = {
    GENERATIONAL:         "Generational",
    PREMIUM_COLLEGE_BAT:  "Premium College Bat",
    TOOLSY_UPSIDE:        "Toolsy Upside",
    ATHLETIC_SPECULATION: "Athletic Speculation",
    POLISHED_ARM:         "Polished Arm",
    HIGH_RISK_ARM:        "High-Risk Arm",
    SLEEPER_VALUE:        "Sleeper Value",
    HYPE_MONSTER:         "Hype Monster"
  }

  if (!name) return "Unknown"
  return LABELS[name as MarketArchetypeName] ?? "Unknown"
}
