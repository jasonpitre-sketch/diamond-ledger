/* =============================================================
   ERIC BOOTH JR. — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 15–16
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-10 | Pass 25
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")

   DATA CONFIDENCE (Pass 25):
     PRIMARY SOURCE (2026 junior season — current): MaxPreps (March 30, 2026 capture) —
       G=18, AVG=.426, OBP=.632, H=20, RBI=22, R=32. All directly stated.
       NOTE: PDF captured an earlier snapshot (AVG=.467, HR=6, SB=27, 2B=12, 3B=5).
       MaxPreps March 30 is more recent (more games played). Both are partial-season captures.
       PDF AVG=.467 was early-season; MaxPreps .426 is correct current figure (season dilution).
       HR/SB/2B/3B from PDF retained — not contradicted by MaxPreps snippet (those fields absent).
     DERIVED (Pass 25): AB from H/AVG = 20/.426 = 46.9 → 47. Check: 20/47 = .4255 ≈ .426 ✓.
     NOT AVAILABLE: BB, K, SLG, OPS — not in any public source for 2026 prep season.
     ESTIMATED: xAVG, xSLG — projected from tool grades at 17
   ============================================================= */

export const eric_booth_jr_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // HS: lower certainty / higher volatility / compressed DLR floor → maturityConfidence = 0.82
  competitionLevel: "HS",

  /* =========================
     SNAPSHOT (2026 junior prep season)
     Engine reads: AVG only.
     All other fields are display context.
  ========================= */

  snapshot: {
    year:  "2026",          // SOURCE: PDF p.16 "2026 SEASON — OAK GROVE HS (Junior)"
    team:  "Oak Grove HS",

    g:     18,              // SOURCE: MaxPreps (March 30, 2026) — "G: 18" — partial season
                            // NOTE: PDF captured earlier snapshot (fewer games, AVG=.467)

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.426,           // lowercase — IntelStack display: snap?.avg
    AVG:   0.426,           // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                            // SOURCE: MaxPreps (March 30, 2026) — "AVG: .426" — more recent than PDF
                            // NOTE: PDF early capture stated ".467" — superseded by MaxPreps

    obp:   0.632,           // SOURCE: MaxPreps (March 30, 2026) — "OBP: .632" — directly stated
    slg:   null,            // UNAVAILABLE — not stated in MaxPreps snippet or PDF
    ops:   null,            // UNAVAILABLE — not stated in any source

    hr:    6,               // SOURCE: PDF p.16 — "HR: 6" — not contradicted by MaxPreps
    rbi:   22,              // SOURCE: MaxPreps (March 30, 2026) — "RBI: 22" — directly stated
    r:     32,              // SOURCE: MaxPreps (March 30, 2026) — "R: 32" — directly stated
    sb:    27,              // SOURCE: PDF p.16 — "SB: 27" — not contradicted by MaxPreps

    // DISPLAY-ONLY supplemental counting stats
    doubles: 12,            // SOURCE: PDF p.16 — "2B: 12" — not contradicted
    triples: 5,             // SOURCE: PDF p.16 — "3B: 5" — not contradicted

    // MVP SNAPSHOT FIELDS
    ab:    47,              // DERIVED: H / AVG = 20 / .426 = 46.9 → 47 (check: 20/47=.4255≈.426 ✓)
    h:     20,              // SOURCE: MaxPreps (March 30, 2026) — "H: 20" — directly stated
    bb:    null,            // UNAVAILABLE — not in any source; OBP derivation requires HBP/SF assumptions
    k:     null             // UNAVAILABLE — not stated in any public source
  },


  /* =========================
     SCOUT (Statcast-equivalent / measurables)
     Engine reads: kRate
     Prep player — limited Statcast data available.
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    kRate:   null,   // K rate not stated for prep season
    bbRate:  null,   // BB rate not stated for prep season

    // 60-Yard Dash data
    dash60:  6.4,    // SOURCE: PDF p.15 — "60-Yard Dash: ~6.4 seconds (70 grade)"
                     // "70-grade running ability" — "loudest single tool in prep portion of class"

    // No exit velocity data available in source
    avgEV:   null,   // UNAVAILABLE — no Statcast for prep player
    barrel:  null,   // UNAVAILABLE
    hardHit: null    // UNAVAILABLE
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from PDF language.
     xAVG is a PROJECTION at MLB level for a 17-year-old prep player.
     NOTE: Large adjustment factor required for youngest class member.
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for prep player.
    // Derived from: 55 hit tool, .467 prep BA, 17-year-old development baseline.
    // Prep player MLB adjustment is aggressive (typically ~25-30% BA reduction).
    // Byron Buxton career BA ~.230–.250 provides downside comp;
    // Starling Marte ~.285–.305 provides upside comp.
    xAVG:  0.270,   // PROJECTION — very long-range estimate; lowest confidence. Manual review at every level.

    // PROJECTION — derived from 55 power tool (60+ projection), MLB adjustment.
    // Display-only (engine reads xAVG only).
    xSLG:  0.440,   // PROJECTION — not used by scoring engine. Display only.

    // DERIVED from PDF language:

    plateDiscTrend: 0.68,  // "short, compact, old-school swing" suggests natural contact approach;
                           // specific walk data not available — moderate confidence estimate

    contactTrend:   0.78,  // .467 prep season; "consistent as a hitter across varying levels" (PDF p.15)
                           // "low strikeout rates" explicitly noted despite lack of specific data

    injuryTrend:    0.85,  // no injury flags in PDF; multi-sport athlete implies excellent physical durability

    sprintTrend:    0.95,  // 70-grade speed — "explosive acceleration", 27 SB, 5 triples
                           // "creates impact in every aspect of the game through pure athleticism" (PDF p.15)

    posValue:       0.85,  // CF — premium outfield position; "natural center fielder" designation solid
                           // "path to Gold Glove-caliber defense" explicitly stated (PDF p.15)

    consistency:    0.75   // "consistent across varying levels of competition" — multi-level performance
  }

}
