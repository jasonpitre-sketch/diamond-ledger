/* =============================================================
   GRADY EMERSON — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 7–8
   Generated: 2026-05-09 | Pass 21

   ⚠️  MARKET TYPE: PROJECTED HOBBY INTELLIGENCE
   -----------------------------------------------
   2026 draft players do NOT yet have established Bowman 1st auto markets.
   Bowman 2026 Draft releases late summer / fall 2026 after draft.
   No live market exists at time of writing.

   This file contains PROJECTED market intelligence only.
   It does NOT contain and must NOT be confused with:
     ✗ sold eBay listings
     ✗ PSA population data
     ✗ Card Ladder comps
     ✗ live transactional data
     ✗ marketSnapshot objects (those activate only post-Bowman release)

   All values are derived from:
     ✓ draft position (Top-3 to Top-5 projection)
     ✓ PDF report language (PDF p.7-8 hobby outlook section)
     ✓ hobby expectation conventions for top prep hitters
     ✓ PREMIUM_COLLEGE_BAT archetype behavior profile
     NOTE: Emerson is prep, not college — but his polished hit-tool
     profile maps cleanly to PREMIUM_COLLEGE_BAT archetype behavior.

   SOURCE LANGUAGE (PDF p.7-8 — Sports Card / Hobby Outlook):
     "1st Bowman auto will be one of the most hunted cards in 2026
      Bowman Draft (releasing late summer/fall 2026 after draft)"
     "Prep players carry more long-term upside in the hobby given
      the development arc storyline"
     "Investment grade: AA+, with AAA ceiling if he reaches an MLB
      roster ahead of schedule"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   conservative estimate for top-3 prep hitter Bowman auto
     psa10Avg: estimated premium for graded example
     psa9Avg:  derived from raw + standard grade-tier premium convention
     No explicit price range stated in PDF — estimates from archetype tier

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     If marketSnapshot is absent, the engine returns neutral {0.5, 0.5, 0.5}.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const grady_emerson_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   130,   // PROJECTED: top prep hitter — estimated opening range $80-$180 (prep below college #1)
  psa9Avg:  185,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 320,   // PROJECTED: premium for top prep hitter; graded example with strong demand

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.72,  // PROJECTED: strong demand anticipated — #1 prep hitter collector profile
  trend:      0.75,  // PROJECTED: rising — "most hunted cards in Bowman Draft" language (PDF p.7)
  volatility: 0.62,  // PROJECTED: MODERATE — prep market is less volatile than college #1 at Bowman Chrome


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.70,  // PROJECTED: numbered parallels are highly scarce; Bowman Draft has smaller print runs
  depth:      0.65,  // PROJECTED: collector demand across prep specialist and mainstream tiers
  stability:  0.58,  // PROJECTED: pre-draft uncertainty; prep development timeline adds instability risk


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.85,  // DERIVED: "Investment grade: AA+, with AAA ceiling" (PDF p.7)
                     // Prep hit-tool prospects hold value through development arc

  confidence: 0.72   // PROJECTED hobby intelligence confidence — good signals from PDF;
                     // tempered by pre-draft timing and prep development uncertainty.
                     // Confidence increases significantly post-debut.

}
