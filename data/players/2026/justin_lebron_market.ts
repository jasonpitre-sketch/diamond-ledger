/* =============================================================
   JUSTIN LEBRON — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 13–14
   Generated: 2026-05-09 | Pass 21

   ⚠️  MARKET TYPE: PROJECTED HOBBY INTELLIGENCE
   -----------------------------------------------
   2026 draft players do NOT yet have established Bowman 1st auto markets.
   No live market exists at time of writing.

   This file contains PROJECTED market intelligence only.
   It does NOT contain and must NOT be confused with:
     ✗ sold eBay listings
     ✗ PSA population data
     ✗ Card Ladder comps
     ✗ live transactional data
     ✗ marketSnapshot objects (those activate only post-Bowman release)

   All values are derived from:
     ✓ draft position (#5-15 range projection)
     ✓ PDF report language (PDF p.14 hobby outlook section)
     ✓ hobby expectation conventions for sliding-stock SS prospects
     ✓ TOOLSY_UPSIDE archetype behavior profile
       (tools-over-production = volatile, hype-driven, ceiling-chaser market)

   SOURCE LANGUAGE (PDF p.14 — Sports Card / Hobby Outlook):
     "sliding draft stock from former #1 to likely #5-10 creates
      interesting hobby dynamics"
     "2026 Bowman auto will be priced conservatively at release given
      positional uncertainty"
     "four-tool ceiling makes him a compelling speculative buy if pro
      coaching unlocks the offensive potential"
     "Expected auto range: $60-$150 at break"
     "High-risk, high-reward investment profile"
     "Grade: A- with upside"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint of stated "$60-$150" range (PDF p.14)
     psa10Avg: estimated graded premium with upside consideration
     psa9Avg:  derived from raw + standard grade-tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const justin_lebron_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.14 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   105,   // PROJECTED: midpoint of stated "$60-$150 at break" (PDF p.14)
  psa9Avg:  155,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 290,   // PROJECTED: upside consideration given "four-tool ceiling" narrative;
                   // "compelling speculative buy" per PDF — graded example commands premium

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.62,  // PROJECTED: solid liquidity — "interesting hobby dynamics" around sliding stock
  trend:      0.55,  // PROJECTED: NEUTRAL-DECLINING — "priced conservatively at release" (PDF p.14);
                     // sliding stock tempers enthusiasm vs. former #1 positioning
  volatility: 0.82,  // PROJECTED: HIGH — "high-risk, high-reward investment profile" (PDF p.14);
                     // tools-vs-results debate creates significant market swing potential


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.68,  // PROJECTED: four-tool SS profile is genuinely scarce; numbered parallels command premium
  depth:      0.55,  // PROJECTED: "speculative buy" framing limits broad collector depth; ceiling-chasers primary
  stability:  0.40,  // PROJECTED: LOWER — "positional uncertainty", sliding stock, tools debate = low stability


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.72,  // DERIVED: "Grade: A- with upside" (PDF p.14) — conditional on bat development
                     // Four 60-grade tools provide compelling long-term narrative if contact improves

  confidence: 0.60   // PROJECTED hobby intelligence confidence — "interesting dynamics" language from PDF;
                     // sliding stock + volatile profile reduces confidence vs. clean ascending prospects.
                     // Confidence increases significantly if early pro performance answers contact question.

}
