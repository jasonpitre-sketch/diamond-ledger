/* =============================================================
   ROCH CHOLOWSKY — MARKET DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Page 5
   Generated: 2026-05-08 | Pass 18

   ⚠️  MARKET TYPE: PROJECTED HOBBY INTELLIGENCE
   -----------------------------------------------
   2026 draft players do NOT yet have established Bowman 1st auto markets.
   Bowman 2026 releases May 13, 2026. No live market exists at time of writing.

   This file contains PROJECTED market intelligence only.
   It does NOT contain and must NOT be confused with:
     ✗ sold eBay listings
     ✗ PSA population data
     ✗ Card Ladder comps
     ✗ live transactional data
     ✗ marketSnapshot objects (those activate only post-Bowman release)

   All values are derived from:
     ✓ draft position (#1 overall projection)
     ✓ PDF report language (PDF p.5 hobby outlook section)
     ✓ hobby expectation conventions for #1 overall picks
     ✓ comparable prospect hype tiers (Bobby Witt Jr. 2019 cited in PDF)

   Future live market activation: wire eBay adapter → marketSnapshot
   after Bowman 2026 release. See ENRICHMENT_RULES.md and ENGINE_FREEZE.md.

   ARCHITECTURE NOTE:
     calculateDLR.ts scoreMarket() reads ONLY player.marketSnapshot.
     If marketSnapshot is absent, the engine returns neutral {0.5, 0.5, 0.5}.
     These cardMarket fields are display-layer only — they do NOT feed
     DLR scoring. Market DLR = 12/24 neutral until marketSnapshot is wired.

   SOURCE LANGUAGE (PDF p.5 — Sports Card / Hobby Outlook):
     "1st Bowman Chrome Autograph is projected to be the most sought-after
      card in the product at release"
     "raw Bowman Autos expected to open in the $150-$400 range at breaks"
     "PSA 10 graded examples likely commanding premiums of $500+ if he goes #1"
     "Hobby investors drawing direct comparisons to Bobby Witt Jr. 2019 Bowman auto trajectory"
     "Long-term investment grade: AAA"
     "marquee name" in 2026 Bowman (releasing May 13, 2026)
     "pre-draft hype driving early BGS/PSA submission demand"
     "highest-upside targets: Gold (/50) and Superfractor (1/1)"

   PROJECTED PRICE INTELLIGENCE:
     rawAvg:   conservative midpoint of projected "$150–$400 opening range" (PDF p.5)
     psa10Avg: conservative floor of projected "$500+ if he goes #1" (PDF p.5)
     psa9Avg:  estimated projection — not explicitly stated in source; derived
               from raw range + standard grade-tier premium convention

   VOLATILITY NOTE:
     High volatility explicitly flagged in PDF — pick position dependent,
     pre-draft hype. Stability reflects pre-signing uncertainty.
   ============================================================= */

export const roch_cholowsky_market = {

  /* =========================
     SNAPSHOT (projected pricing layer)
     Projected opening price intelligence derived from PDF p.5 report language.
     NOT live data. NOT sold comps. NOT eBay history.
  ========================= */

  rawAvg:   200,    // PROJECTED: conservative midpoint of "$150-$400 opening range" (PDF p.5)
  psa9Avg:  280,    // PROJECTED/ESTIMATED: not explicitly stated; derived from raw range + grade tier premium
  psa10Avg: 500,    // PROJECTED: conservative floor of "$500+ if he goes #1" (PDF p.5)

  // Projected demand signal fields (0–1) — hobby anticipation, not transactional confirmation
  liquidity:  0.85,  // PROJECTED: strong demand anticipated; marquee Bowman; #1 pick collector interest
  trend:      0.88,  // PROJECTED: rising — "Bobby Witt Jr. 2019 Bowman auto trajectory" comp (PDF p.5)
  volatility: 0.78,  // PROJECTED: HIGH — explicitly flagged in PDF: pick-position dependent, pre-draft hype


  /* =========================
     SCOUT (projected structure layer)
     Hobby structural outlook derived from PDF report language and #1 pick conventions.
  ========================= */

  scarcity:   0.75,  // PROJECTED: numbered parallels (Gold /50, Superfractor 1/1) are highly scarce;
                     // base Chrome auto less scarce but strong anticipated demand offsets
  depth:      0.72,  // PROJECTED: anticipated collector demand across multiple price points — raw to graded
  stability:  0.52,  // PROJECTED LOWER: pre-draft uncertainty; "hold until after draft and signing" (PDF p.5);
                     // projected stability will improve significantly post-signing


  /* =========================
     ANALYST (projected long-term read)
     Long-term investment outlook derived from PDF report language.
  ========================= */

  longTerm:   0.90,  // DERIVED: "Long-term investment grade: AAA" (PDF p.5)
                     // Highest hobby investment grade designation; directly stated

  confidence: 0.82   // PROJECTED hobby intelligence confidence — strong signals from PDF;
                     // tempered by pre-draft timing and absence of live transactional data.
                     // Expected to reach 0.90+ once live marketSnapshot activated post-Bowman release.

}
