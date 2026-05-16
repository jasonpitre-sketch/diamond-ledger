/* =============================================================
   JACOB LOMBARD — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 17–18
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
     ✓ draft position (top-12 projection)
     ✓ PDF report language (PDF p.18 hobby outlook section)
     ✓ hobby expectation conventions for polarizing high-ceiling prep SS
     ✓ HYPE_MONSTER archetype behavior profile
       (maximum polarization = maximum hype-driven volatility)

   SOURCE LANGUAGE (PDF p.18 — Sports Card / Hobby Outlook):
     "High-ceiling, high-risk profiles are hobby catnip"
     "family pedigree, elite tools, and the drama of his contact question
      create a compelling collector narrative"
     "1st Bowman Draft auto projects to strong initial demand ($60-$180)
      driven by tool hype"
     "long-term value heavily contingent on whether the contact rates
      improve in pro ball"
     "baseball family angle — father and older brother both drafted —
      is a unique multi-card collector play"
     "Investment grade: B+ (volatile, speculative)"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint of stated "$60-$180" range (PDF p.18)
     psa10Avg: estimated graded premium with tool-hype consideration
     psa9Avg:  derived from raw + standard grade-tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const jacob_lombard_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.18 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   120,   // PROJECTED: midpoint of stated "$60-$180" range (PDF p.18)
  psa9Avg:  180,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 360,   // PROJECTED: HYPE_MONSTER archetype inflates graded premium;
                   // "tool hype" + "baseball family" creates strong graded demand

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.72,  // PROJECTED: "hobby catnip" language — polarizing profiles create strong collector pools
  trend:      0.78,  // PROJECTED: rising on hype — Wander Franco comp + baseball family drives demand
  volatility: 0.92,  // PROJECTED: EXTREME — "volatile, speculative" explicitly stated (PDF p.18);
                     // HYPE_MONSTER archetype is maximum volatility profile


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.72,  // PROJECTED: numbered parallels are scarce; "unique multi-card collector play"
                     // baseball family angle adds multi-parallel collector demand
  depth:      0.65,  // PROJECTED: hype-driven collector pools are wider but shallower than stable prospects
  stability:  0.28,  // PROJECTED: VERY LOW — "volatile, speculative" (PDF p.18); contact question =
                     // "long-term value heavily contingent" on development; maximum instability


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.55,  // DERIVED: "Investment grade: B+ (volatile, speculative)" (PDF p.18)
                     // LOWEST long-term grade in class — "heavily contingent" on contact development
                     // HYPE_MONSTER archetype long-term durability is 0.30 by design

  confidence: 0.55   // PROJECTED hobby intelligence confidence — "volatile, speculative" framing from PDF
                     // caps confidence; hype is real but contingent; BB+ investment grade reflects this.
                     // Confidence swings violently on first professional contact rates data.

}
