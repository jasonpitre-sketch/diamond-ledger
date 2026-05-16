/* =============================================================
   JACKSON FLORA — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 11–12
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
     ✓ draft position (Top-6 pick projection)
     ✓ PDF report language (PDF p.12 hobby outlook section)
     ✓ hobby expectation conventions for elite college pitchers
     ✓ HIGH_RISK_ARM archetype behavior profile
       (pitcher health sensitivity = defining market characteristic)

   SOURCE LANGUAGE (PDF p.12 — Sports Card / Hobby Outlook):
     "Flora's elite stuff and dominant numbers will generate strong
      early demand for his 1st Bowman Chrome auto"
     "Top pitching prospects with 100 mph heat and multiple plus
      secondary offerings command a significant collector premium"
     "Expected auto range: $100-$300 at release"
     "Long-term value tied heavily to avoiding major injury in first
      three pro seasons"
     "Investment grade: AA (with A+ risk caveat)"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint of stated "$100-$300" range (PDF p.12)
     psa10Avg: estimated graded premium above stated range
     psa9Avg:  derived from raw + standard grade-tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const jackson_flora_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.12 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   200,   // PROJECTED: midpoint of stated "$100-$300 at release" (PDF p.12)
  psa9Avg:  290,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 480,   // PROJECTED: premium for elite college pitcher; 100 mph velocity commands graded premium

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.65,  // PROJECTED: solid demand — 100 mph pitchers have strong collector base
  trend:      0.70,  // PROJECTED: rising pre-draft — "strong early demand" language (PDF p.12)
  volatility: 0.85,  // PROJECTED: HIGH — "tied heavily to avoiding major injury" (PDF p.12)
                     // injury-sensitive market; one health event reshapes value significantly


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.68,  // PROJECTED: 100 mph arms are scarce; multiple plus secondaries add to premium
  depth:      0.60,  // PROJECTED: collector demand across pitcher specialist and mainstream tiers
  stability:  0.42,  // PROJECTED: LOWER — "A+ risk caveat" explicitly stated (PDF p.12);
                     // head whack mechanical concern adds instability layer


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.68,  // DERIVED: "Investment grade: AA (with A+ risk caveat)" (PDF p.12)
                     // "Long-term value tied heavily to avoiding major injury" — conditional
                     // Pitcher long-term durability is HIGH_RISK_ARM archetype baseline

  confidence: 0.65   // PROJECTED hobby intelligence confidence — strong initial signals from PDF;
                     // significantly tempered by explicit health risk caveat and pitcher development uncertainty.
                     // Confidence increases if arm health confirmed in first professional season.

}
