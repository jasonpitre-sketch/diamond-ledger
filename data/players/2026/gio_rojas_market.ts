/* =============================================================
   GIO ROJAS — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 23–25
   Generated: 2026-05-09 | Pass 21

   ⚠️  MARKET TYPE: PROJECTED HOBBY INTELLIGENCE
   -----------------------------------------------
   2026 draft players do NOT yet have established Bowman 1st auto markets.
   Bowman 2026 Draft releases late summer/fall 2026 after draft.
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
     ✓ PDF report language (PDF p.25 hobby outlook section)
     ✓ hobby expectation conventions for elite prep LHP
     ✓ HIGH_RISK_ARM archetype behavior profile
       (prep pitcher + 3-5 year timeline + arm health = maximum risk archetype)

   SOURCE LANGUAGE (PDF p.25 — Sports Card / Hobby Outlook):
     "Left-handed pitching prospects with elite velocity are among the
      most sought-after Bowman targets in the hobby"
     "The upper-90s fastball narrative drives speculative collector demand
      well before first-pitch professional"
     "Rojas's 1st Bowman Draft auto should generate strong demand in the
      $60-$180 range"
     "ceiling of a frontline starter driving significant long-term upside"
     "Prep pitching risk is real — three to five year development timeline
      before MLB"
     "but the tools are exceptional"
     "Investment grade: A- (prep arm risk inherent, ceiling is elite)"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint of stated "$60-$180" range (PDF p.25)
     psa10Avg: estimated graded premium with LHP velocity narrative
     psa9Avg:  derived from raw + standard grade-tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const gio_rojas_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.25 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   120,   // PROJECTED: midpoint of stated "$60-$180 range" (PDF p.25)
  psa9Avg:  175,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 320,   // PROJECTED: LHP velocity narrative drives graded premium;
                   // "most sought-after Bowman targets" — graded LHP autos command ceiling premium

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.52,  // PROJECTED: "most sought-after" — LHP with elite velo have dedicated collector base
  trend:      0.68,  // PROJECTED: rising — "upper-90s fastball narrative drives speculative demand"
                     // pre-draft velocity story is an ascending narrative
  volatility: 0.90,  // PROJECTED: VERY HIGH — HIGH_RISK_ARM archetype max; "prep pitching risk is real"
                     // (PDF p.25); 3-5 year timeline = maximum holding risk; injury = sharp correction


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.72,  // PROJECTED: LHP with 98 mph prep velocity is genuinely scarce; collector premium
  depth:      0.55,  // PROJECTED: "speculative collector demand" framing — dedicated LHP velocity pool
  stability:  0.30,  // PROJECTED: VERY LOW — "prep pitching risk is real" (PDF p.25);
                     // 3-5 year development gap = maximum stability risk; any health event collapses confidence


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.68,  // DERIVED: "Investment grade: A- (prep arm risk inherent, ceiling is elite)"
                     // (PDF p.25) — "ceiling is elite" but "risk inherent" explicitly caps grade
                     // HIGH_RISK_ARM archetype long-term durability (0.40 baseline) tempers this

  confidence: 0.55   // PROJECTED hobby intelligence confidence — lowest in pitching tier due to:
                     // prep pitcher (no professional stats), 3-5 year timeline, health uncertainty.
                     // "Upper-90s narrative" is compelling but maximally speculative.
                     // Confidence increases only after professional debut shows healthy arm.

}
