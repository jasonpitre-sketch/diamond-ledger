/* =============================================================
   ETHAN HOLLIDAY — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2025 Draft Intelligence / hobby conventions
   Generated: 2026-05-14 | Pass 67

   ⚠️  MARKET TYPE: PROJECTED HOBBY INTELLIGENCE — PRE-BOWMAN
   -----------------------------------------------------------
   Ethan Holliday does NOT yet have an established Bowman 1st auto market
   as of 2026-05-14. Bowman 2025 (Chrome) released in late 2025; whether
   Holliday's 1st auto appeared and at what market levels is unconfirmed.
   Bowman Draft (late 2025) is the primary 1st auto product for 2025 draftees.

   This file contains PROJECTED market intelligence only.
   It does NOT contain and must NOT be confused with:
     ✗ sold eBay listings
     ✗ PSA population data
     ✗ Card Ladder comps
     ✗ live transactional data
     ✗ marketSnapshot objects (those activate only post-Bowman confirmation)

   All values are derived from:
     ✓ Draft position (#4 overall, COL) — blue-chip positioning
     ✓ Family pedigree (son of Matt Holliday, brother of Jackson Holliday)
     ✓ Pro production (6 HR, .895 OPS through 27 G in 2026)
     ✓ GENERATIONAL archetype behavior profile
       (top-5 pick + elite pedigree = maximum collector gravity)
     ✓ Comparable: Jackson Holliday's pre-debut Bowman trajectory (premium tier)

   ARCHETYPE NOTE:
     marketArchetype: "GENERATIONAL"
     Pick #4 overall + son of Matt (7x All-Star) + brother of Jackson (BAL) =
     historic draft positioning with maximum collector gravity. The frozen
     archetype registry (data/market/marketArchetypes.ts) requires one of 8
     established archetypes. GENERATIONAL is the correct fit — this is the
     maximum archetype, reserved for top-5 picks with blue-chip narrative depth.

   PRE-BOWMAN PRICING NOTE:
     rawAvg, psa9Avg, psa10Avg are PROJECTED estimates. Jackson Holliday's
     Bowman auto trajectory provides the nearest comparable: premium brother
     narrative + top-pick positioning = elevated initial market vs. comparables.

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.
   ============================================================= */

export const ethan_holliday_market = {

  /* Market archetype — required at both file and composite root */
  marketArchetype: "GENERATIONAL" as const,

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from draft position and pedigree.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   null,    // PRE-BOWMAN: no confirmed raw comp baseline established
  psa9Avg:  null,    // PRE-BOWMAN: no graded comp baseline established
  psa10Avg: null,    // PRE-BOWMAN: no graded comp baseline established
                     // NOTE: When Bowman Draft 2025 release is confirmed, these
                     // should be populated with live eBay comp data.

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.85,  // PROJECTED: GENERATIONAL archetype = maximum collector depth;
                     // "son of Matt / brother of Jackson" creates instant national demand
  trend:      0.80,  // PROJECTED: upward trend driven by 2026 power surge (.895 OPS) and
                     // family narrative building toward MLB debut expectations
  volatility: 0.72,  // PROJECTED: elevated — pedigree creates premium, but youth and
                     // development arc create real swing risk at A-ball stage


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from draft position and profile.
  ========================= */

  scarcity:   0.80,  // PROJECTED: Bowman 1st auto of top-5 picks with elite family pedigree
                     // is inherently scarce; Jackson Holliday comp suggests premium tier
  depth:      0.85,  // PROJECTED: GENERATIONAL archetype drives broad collector engagement;
                     // crossover appeal (baseball fans + dynasty collectors + pedigree collectors)
  stability:  0.65,  // PROJECTED: pedigree provides stability floor; youth and A-ball stage
                     // create meaningful development uncertainty vs. college-level comparables


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from profile and hobby conventions.
  ========================= */

  longTerm:   0.85,  // DERIVED: elite long-term outlook — family name is permanent collector floor;
                     // if production continues, Jackson Holliday comp suggests significant appreciation;
                     // blue-chip floor backed by pedigree + pick position + real 2026 power

  confidence: 0.55   // PROJECTED hobby intelligence confidence — pedigree and pick position provide
                     // strong narrative anchor; tempered by PRE-BOWMAN status (no live comps to
                     // verify projected pricing), A-ball development uncertainty, and COL org variables

}
