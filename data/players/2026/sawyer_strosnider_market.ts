/* =============================================================
   SAWYER STROSNIDER — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 21–22
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
     ✓ draft position (top-15 projection)
     ✓ PDF report language (PDF p.22 hobby outlook section)
     ✓ hobby expectation conventions for left-handed power/speed OF
     ✓ TOOLSY_UPSIDE archetype behavior profile
       (power/speed combo + swing questions = volatile but exciting collector profile)

   SOURCE LANGUAGE (PDF p.22 — Sports Card / Hobby Outlook):
     "Left-handed power hitters who can run are always in demand in
      the hobby"
     "Strosnider's historic freshman campaign and Big 12 Freshman of Year
      recognition will drive initial Bowman card demand"
     "His raw power upside is the primary hobby narrative"
     "Expected auto range: $50-$130"
     "Investment grade: A- (with strong upside if sophomore confirms tools)"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint of stated "$50-$130" range (PDF p.22)
     psa10Avg: estimated graded premium with power narrative consideration
     psa9Avg:  derived from raw + standard grade-tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const sawyer_strosnider_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.22 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   90,    // PROJECTED: midpoint of stated "$50-$130" range (PDF p.22)
  psa9Avg:  135,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 270,   // PROJECTED: left-handed power + historic freshman = solid graded demand

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.62,  // PROJECTED: "always in demand" — left-handed power hitters have broad collector base
  trend:      0.70,  // PROJECTED: rising — historic freshman recognition drives pre-draft interest
  volatility: 0.78,  // PROJECTED: HIGH — TOOLSY_UPSIDE archetype; "strong upside if sophomore confirms"
                     // conditional language reflects swing-decisions development uncertainty


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.65,  // PROJECTED: top-15 pick Bowman autos have limited print; power narrative creates demand
  depth:      0.60,  // PROJECTED: "always in demand" language indicates broad collector depth
  stability:  0.52,  // PROJECTED: "if sophomore confirms tools" language = conditional stability;
                     // TOOLSY_UPSIDE stability bias (0.48) is the baseline


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.75,  // DERIVED: "Investment grade: A- (with strong upside if sophomore confirms tools)"
                     // (PDF p.22) — "strong upside" is explicitly conditional on development confirmation
                     // Left-handed power OF holds well long-term in the hobby

  confidence: 0.68   // PROJECTED hobby intelligence confidence — "strong upside if sophomore confirms"
                     // creates conditional framing; freshman is real but single-season data tempers confidence.
                     // Confidence increases significantly if sophomore confirms freshman was not anomaly.

}
