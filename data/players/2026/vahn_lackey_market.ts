/* =============================================================
   VAHN LACKEY — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 9–10
   Generated: 2026-05-09 | Pass 21

   ⚠️  MARKET TYPE: PROJECTED HOBBY INTELLIGENCE
   -----------------------------------------------
   2026 draft players do NOT yet have established Bowman 1st auto markets.
   Bowman 2026 releases May 13, 2026 (Chrome). Bowman Draft releases
   late summer/fall 2026.
   No live market exists at time of writing.

   This file contains PROJECTED market intelligence only.
   It does NOT contain and must NOT be confused with:
     ✗ sold eBay listings
     ✗ PSA population data
     ✗ Card Ladder comps
     ✗ live transactional data
     ✗ marketSnapshot objects (those activate only post-Bowman release)

   All values are derived from:
     ✓ draft position (#3 overall projection)
     ✓ PDF report language (PDF p.10 hobby outlook section)
     ✓ hobby expectation conventions for elite college catchers
     ✓ SLEEPER_VALUE archetype behavior profile
       (catchers are niche — dedicated but smaller collector base)

   SOURCE LANGUAGE (PDF p.10 — Sports Card / Hobby Outlook):
     "Catchers with elite defensive profiles and offensive upside
      generate strong hobby interest"
     "Georgia Tech pedigree — following Parada's successful 2022
      Bowman performance — gives collectors a familiar narrative"
     "Bowman auto should perform well in the $80-$200 range at release"
     "upside tied to his offensive development arc in pro ball"
     "GT catcher legacy adds a compelling collector angle"
     "Investment grade: AA"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint of stated "$80-$200" range (PDF p.10)
     psa10Avg: estimated graded premium above stated range
     psa9Avg:  derived from raw + grade tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const vahn_lackey_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.10 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   140,   // PROJECTED: midpoint of stated "$80-$200 range at release" (PDF p.10)
  psa9Avg:  195,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 340,   // PROJECTED: estimated graded premium — catcher + GT legacy commands solid premium

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.52,  // PROJECTED: niche but dedicated — catchers have smaller collector pools
  trend:      0.62,  // PROJECTED: rising on offensive emergence; "elevated to top-5 candidate" drives interest
  volatility: 0.48,  // PROJECTED: LOWER — catcher profile is stable; less volatile than toolsy bats


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.62,  // PROJECTED: numbered parallels scarce; base autos have limited print run
  depth:      0.55,  // PROJECTED: GT catcher legacy creates multi-generational collector angle
  stability:  0.65,  // PROJECTED: "familiar narrative" — Parada comp provides price floor reference


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.75,  // DERIVED: "Investment grade: AA" (PDF p.10)
                     // Catchers hold value through career — positional premium sustains

  confidence: 0.68   // PROJECTED hobby intelligence confidence — solid signals from PDF;
                     // catcher market is predictable (smaller but stable);
                     // Parada 2022 Bowman provides recent comparable reference.
                     // Confidence increases as offensive arc confirms in pro ball.

}
