/* =============================================================
   ERIC BOOTH JR. — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 15–16
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
     ✓ draft position (top-10 projection)
     ✓ PDF report language (PDF p.16 hobby outlook section)
     ✓ hobby expectation conventions for elite prep CF prospects
     ✓ ATHLETIC_SPECULATION archetype behavior profile
       (pure athleticism + youth + longest development arc = speculation)

   SOURCE LANGUAGE (PDF p.16 — Sports Card / Hobby Outlook):
     "High-school outfielders with plus speed profiles have a strong
      hobby following — especially when they combine speed with projection"
     "Booth's youth (turns 18 days before the draft), Vanderbilt commit
      leverage, and elite athleticism create compelling collector interest"
     "1st Bowman Draft auto expected in the $50-$120 range at initial
      breaks with long-term upside if tools develop as projected"
     "Investment grade: A- (development dependent)"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   midpoint of stated "$50-$120" range (PDF p.16)
     psa10Avg: estimated graded premium above stated range
     psa9Avg:  derived from raw + standard grade-tier premium convention

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const eric_booth_jr_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.16 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   85,    // PROJECTED: midpoint of stated "$50-$120 at initial breaks" (PDF p.16)
  psa9Avg:  125,   // PROJECTED/ESTIMATED: derived from raw range + grade tier premium
  psa10Avg: 245,   // PROJECTED: youngest first-rounder + 70-grade speed commands developmental premium

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.48,  // PROJECTED: moderate — prep outfielder with plus speed has dedicated collector base
  trend:      0.65,  // PROJECTED: rising — "steadily climbing boards" trajectory driving pre-draft interest
  volatility: 0.82,  // PROJECTED: HIGH — youngest player; longest development arc; pure speculation


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language.
  ========================= */

  scarcity:   0.65,  // PROJECTED: Bowman Draft numbered parallels are scarce; limited print run
  depth:      0.50,  // PROJECTED: prep speed collector base is dedicated but smaller than mainstream
  stability:  0.38,  // PROJECTED: LOWER — "development dependent" explicitly stated (PDF p.16);
                     // youngest player = most speculation-dependent pricing


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.78,  // DERIVED: "Investment grade: A- (development dependent)" (PDF p.16)
                     // "long-term upside if tools develop as projected" — conditional but genuine
                     // Speed/CF combo holds hobby value through development arc (Byron Buxton precedent)

  confidence: 0.58   // PROJECTED hobby intelligence confidence — lowest in class due to youngest age;
                     // "development dependent" framing from PDF caps confidence significantly.
                     // Confidence increases at each professional milestone as tools begin translating.

}
