/* =============================================================
   DREW BURRESS — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 19–20
   Generated: 2026-05-09 | Pass 21

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
     ✓ draft position (top-12 projection)
     ✓ PDF report language (PDF p.20 hobby outlook section)
     ✓ hobby expectation conventions for undersized elite college hitters
     ✓ SLEEPER_VALUE archetype behavior profile
       (analytics-loved, undersized = mainstream discount, smart-money target)

   SOURCE LANGUAGE (PDF p.20 — Sports Card / Hobby Outlook):
     "Small players who slug are hobby darlings — the Mookie Betts
      comparison gets collectors excited"
     "Burress's elite underlying metrics and Georgia Tech platform give
      him strong visibility in the hobby"
     "1st Bowman Chrome auto projects to $80-$200 at release given
      his production"
     "physical prototype concern (5'9") creates slight market discount
      vs. what a 6'3" player with identical stats would command"
     "Investment grade: A-"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint of stated "$80-$200" range (PDF p.20)
     psa10Avg: estimated graded premium with Mookie Betts comp consideration
     psa9Avg:  derived from raw + standard grade-tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const drew_burress_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.20 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   140,   // PROJECTED: midpoint of stated "$80-$200 at release" (PDF p.20)
  psa9Avg:  200,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 375,   // PROJECTED: Mookie Betts comp drives collector imagination; graded premium above base

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.52,  // PROJECTED: "hobby darlings" for those who find the profile; SLEEPER_VALUE pool is smaller
  trend:      0.68,  // PROJECTED: rising — "strong visibility" from GT platform + elite metrics building
  volatility: 0.42,  // PROJECTED: LOWER — production-based story is stable; "slight discount" vs. prototype
                     // SLEEPER_VALUE archetype has below-average volatility by design


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.60,  // PROJECTED: GT Bowman autos have established demand pool; not the rarest profile
  depth:      0.58,  // PROJECTED: analytics collectors are dedicated; "GT platform gives strong visibility"
  stability:  0.65,  // PROJECTED: production-based pricing is more stable than hype-based;
                     // "slight market discount" acknowledged but stable vs. volatility archetypes


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.78,  // DERIVED: "Investment grade: A-" (PDF p.20)
                     // Strong long-term value — "Mookie Betts comparison gets collectors excited"
                     // SLEEPER_VALUE archetype: slow burn that holds for sticky value collectors

  confidence: 0.72   // PROJECTED hobby intelligence confidence — "strong visibility" language from PDF;
                     // production metrics are elite and verifiable; slight size discount is known quantity.
                     // Smart-money positioning: high confidence within dedicated analytics collector base.

}
