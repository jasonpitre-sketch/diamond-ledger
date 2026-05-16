/* =============================================================
   CARSON BOLEMON — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence / hobby conventions
   Generated: 2026-05-14 | Pass 63

   ⚠️  MARKET TYPE: PROJECTED HOBBY INTELLIGENCE
   -----------------------------------------------
   2026 draft players do NOT yet have established Bowman 1st auto markets.
   Bowman 2026 releases May 13, 2026 (Chrome). Bowman Draft later in 2026.
   No live market exists at time of writing.

   This file contains PROJECTED market intelligence only.
   It does NOT contain and must NOT be confused with:
     ✗ sold eBay listings
     ✗ PSA population data
     ✗ Card Ladder comps
     ✗ live transactional data
     ✗ marketSnapshot objects (those activate only post-Bowman release)

   All values are derived from:
     ✓ draft position (#7 overall — BAL)
     ✓ scouting profile language (LHP phenom, career ERA=0.00)
     ✓ hobby expectation conventions for elite HS pitching arms
     ✓ HIGH_RISK_ARM archetype behavior profile
       (HS arm development risk = defining market characteristic)
     ✓ dual-domain premium (LHP + .411 career batting — rare collector narrative)

   PRE-BOWMAN NOTE:
     Bolemon will appear in Bowman 2026 (Chrome, released May 13, 2026)
     and Bowman Draft (late 2026) as an anticipated HS arm inclusion.
     The dual-domain identity (LHP + DH batting) may create card product
     treatment that differs from single-role HS pitching prospects.
     marketArchetype: "HIGH_RISK_ARM" — HS development risk is the defining
     market characteristic for top-10 HS arms, despite elite command profile.

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint estimate for top-10 HS arm at Bowman release
     psa10Avg: estimated graded premium — HS arms with high ceiling generate graded demand
     psa9Avg:  derived from raw + standard grade-tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const carson_bolemon_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from draft position and profile.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   120,   // PROJECTED: top-10 HS arm at Bowman release; dual-domain adds premium vs. single-role;
                   // LHP scarcity premium elevates HS arm above average HS hitter at same draft slot
  psa9Avg:  185,   // PROJECTED/ESTIMATED: derived from raw range + standard grade-tier premium
  psa10Avg: 320,   // PROJECTED: HS phenom LHP with elite command profile; dual-domain premium baked in;
                   // graded ceiling demand driven by "career ERA=0.00" narrative and LHP collector appeal

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.60,  // PROJECTED: solid HS arm collector base; LHP scarcity drives targeted demand;
                     // dual-domain identity (batting + pitching) creates broader collector interest
  trend:      0.68,  // PROJECTED: building toward draft; top-10 HS arm narrative drives pre-draft interest;
                     // dual-domain story differentiates from single-role HS pitchers
  volatility: 0.82,  // PROJECTED: HIGH — HS arm development is inherently volatile;
                     // injury risk, role uncertainty, and development path create market sensitivity;
                     // dual-domain adds complexity: pitcher or two-way player in pro ball?


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from draft position and profile.
  ========================= */

  scarcity:   0.72,  // PROJECTED: elite HS LHP arms are extremely scarce; command profile at 19 adds premium;
                     // dual-domain rarity (LHP + .411 bat) creates truly unique collector identity
  depth:      0.58,  // PROJECTED: dedicated LHP collector segment + dual-domain crossover interest;
                     // HS arm depth is narrower than college arms at similar draft slot
  stability:  0.40,  // PROJECTED: LOWER — HS arm development uncertainty;
                     // HIGH_RISK_ARM archetype baseline: long development arc + health sensitivity


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from profile and hobby conventions.
  ========================= */

  longTerm:   0.72,  // DERIVED: strong long-term ceiling if development holds — LHP command arm;
                     // dual-domain narrative adds sustained media / collector interest layer;
                     // conditional on pro role clarity (pitcher or two-way?); "BAL investment" is positive signal

  confidence: 0.62   // PROJECTED hobby intelligence confidence — draft position and profile provide solid anchor;
                     // significantly tempered by HS development uncertainty and pitcher health risk;
                     // dual-domain adds upside variance in both directions (positive if two-way confirmed)

}
