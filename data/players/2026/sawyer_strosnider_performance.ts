/* =============================================================
   SAWYER STROSNIDER — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: gofrogs.com official stats (May 10, 2026) — primary statistical source
           D1Baseball.com (May 10, 2026) — supplemental (superseded for 2026 line by gofrogs.com)
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-10 | Pass 25.15
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")

   DATA CONFIDENCE (Pass 25.15 — updated May 10, 2026, gofrogs.com official stats):
     PRIMARY SOURCE (2025 freshman season): PDF p.22 — AVG, OBP, SLG, OPS, HR, 2B, 3B, SB.
       TCU official bio (gofrogs.com, fetched May 10 2026) — G=56, H=77, AB=220, RBI=51, R=52
       (all directly stated in bio text). NOTE: gofrogs.com Stats tab is JavaScript-rendered;
       static HTML fetch returns bio text only, not the interactive stat table/dropdown.
       Stat table values cross-confirmed via D1Baseball.com.
       D1Baseball.com (May 10, 2026) — confirms all 2025 fields; adds BB=20, K=47, PA=251.
       2025 MVP fields FULLY populated. R=52 from gofrogs.com bio ("ranked second with 52 runs scored").
     PRIMARY SOURCE (2026 sophomore season): gofrogs.com official stats (May 10, 2026):
       AB=179, H=48, HR=13, RBI=47, BB=43, K=43, AVG=.268, OBP=.413, SLG=.587, OPS=1.000.
       SOURCE CONFLICT RESOLVED: D1Baseball had AB=180, AVG=.267, OBP=.411, SLG=.583, OPS=.995.
       gofrogs.com official university source is authoritative — 2026 line corrected.
       Cross-check: H/AB = 48/179 = .2681 ≈ .268 ✓. OBP+SLG = .413+.587 = 1.000 ✓.
       G=49 retained from D1Baseball (not captured in gofrogs.com table this pass).
     CAREER TOTAL (2 seasons): gofrogs.com official stats (May 10, 2026):
       AB=399, H=125, HR=24, RBI=98, BB=63, K=90, AVG=.313, OBP=.417, SLG=.622, OPS=1.039.
       VERIFY: H=48+77=125 ✓ HR=13+11=24 ✓ RBI=47+51=98 ✓ BB=43+20=63 ✓ K=43+47=90 ✓
               AB=179+220=399 ✓ AVG=125/399=.3133≈.313 ✓ OBP+SLG=.417+.622=1.039 ✓
     ESTIMATED: xAVG, xSLG — projected from tool grades and Big 12 performance
   ============================================================= */

export const sawyer_strosnider_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // NCAA: strong certainty / established track record → maturityConfidence = 0.94
  competitionLevel: "NCAA",

  /* =========================
     SNAPSHOT (2025 freshman season — full data available)
     Engine reads: AVG only.
     All other fields are display context.
  ========================= */

  snapshot: {
    year:  "2025",        // SOURCE: PDF p.22 "2025 SEASON — TCU (Freshman)"
    team:  "TCU",

    g:     56,            // SOURCE: TCU official bio (gofrogs.com) — "56 games played"

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.350,         // lowercase — IntelStack display: snap?.avg
    AVG:   0.350,         // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                          // SOURCE: PDF p.22 — "AVG: .350"

    obp:   0.420,         // SOURCE: PDF p.22 — "OBP: .420"
    slg:   0.650,         // SOURCE: PDF p.22 — "SLG: .650"
    ops:   1.070,         // SOURCE: PDF p.22 — "OPS: 1.070"

    hr:    11,            // SOURCE: PDF p.22 — "HR: 11"
    rbi:   51,            // SOURCE: TCU official bio (gofrogs.com) — "51 RBIs"
    sb:    10,            // SOURCE: PDF p.22 — "SB: 10"

    // DISPLAY-ONLY supplemental counting stats
    doubles:  13,         // SOURCE: PDF p.22 — "2B: 13"
    triples:  10,         // SOURCE: PDF p.22 — "3B: 10" — reflects elite speed (plus runner)

    bbPct: null,          // BB% not stated; OBP indicates above-average approach
    kPct:  null,          // K% not stated; "swing decisions" is development area

    // MVP SNAPSHOT FIELDS — all populated Pass 25
    ab:    220,           // SOURCE: TCU official bio (gofrogs.com) — sum of directly stated
                          // sub-totals: "36 at-bats (.167) through 11 games" + "71-for-184
                          // over final 45 games" = 36 + 184 = 220 AB total
                          // CONFIRMED: D1Baseball.com (May 10, 2026) — "AB: 220" ✓
    h:     77,            // SOURCE: TCU official bio (gofrogs.com) — "team-leading 77 hits on
                          // the year" — directly stated season total
                          // CONFIRMED: D1Baseball.com (May 10, 2026) — "H: 77" ✓
    r:     52,            // SOURCE: TCU official bio (gofrogs.com) — "ranked second with 52 runs scored" — directly stated
    bb:    20,            // SOURCE: D1Baseball.com (May 10, 2026) — "BB: 20" — directly stated
    k:     47             // SOURCE: D1Baseball.com (May 10, 2026) — "K: 47" — directly stated
  },


  /* =========================
     SEASON 2026 (sophomore season — current, in progress)
     Feeds: tracker block in sawyer_strosnider.ts → 2026 row in IntelStack panel.
     SOURCE: D1Baseball.com (May 10, 2026) — full current season line.
     NOTE: snapshot above (2025 freshman) is the engine-read primary field.
  ========================= */
  season2026: {
    year:  "2026",
    team:  "TCU",

    g:     49,            // SOURCE: D1Baseball.com (May 10, 2026) — "G: 49" (not in gofrogs.com table)
    pa:    231,           // SOURCE: D1Baseball.com (May 10, 2026) — "PA: 231" (not in gofrogs.com table)

    avg:   0.268,         // lowercase — display alias
    AVG:   0.268,         // uppercase — engine alias (engine reads snapshot, not season2026)
                          // SOURCE: gofrogs.com (May 10, 2026) — "AVG: .268" (check: 48/179=.268 ✓)
                          // SOURCE CONFLICT RESOLVED: D1Baseball stated .267; gofrogs.com official wins.

    obp:   0.413,         // SOURCE: gofrogs.com (May 10, 2026) — "OBP: .413"
    slg:   0.587,         // SOURCE: gofrogs.com (May 10, 2026) — "SLG: .587"
    ops:   1.000,         // SOURCE: gofrogs.com (May 10, 2026) — "OPS: 1.000" (check: .413+.587=1.000 ✓)

    ab:    179,           // SOURCE: gofrogs.com (May 10, 2026) — "AB: 179"
                          // SOURCE CONFLICT RESOLVED: D1Baseball stated 180; gofrogs.com official wins.
    h:     48,            // SOURCE: gofrogs.com (May 10, 2026) — "H: 48"
    hr:    13,            // SOURCE: gofrogs.com (May 10, 2026) — "HR: 13"
    rbi:   47,            // SOURCE: gofrogs.com (May 10, 2026) — "RBI: 47"
    bb:    43,            // SOURCE: gofrogs.com (May 10, 2026) — "BB: 43"
    k:     43,            // SOURCE: gofrogs.com (May 10, 2026) — "K: 43"

    r:     53,            // SOURCE: D1Baseball.com — "R: 53"
    doubles: 10,          // SOURCE: D1Baseball.com — "2B: 10"
    triples: 4,           // SOURCE: D1Baseball.com — "3B: 4"
    sb:    11,            // SOURCE: D1Baseball.com — "SB: 11"
    cs:    2,             // SOURCE: D1Baseball.com — "CS: 2"
    hbp:   4              // SOURCE: D1Baseball.com — "HBP: 4"
  },


  /* =========================
     SCOUT (Statcast-equivalent / measurables)
     Engine reads: kRate
     No Statcast available for college player.
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    // DERIVED from 2025 full season (prior-year baseline per scoring convention).
    // 2025 stats dictate scout starting values for 2026 season; update annually.
    kRate:   18.7,   // DERIVED: K/PA = 47/251 = 18.72% (2025 full season)
    bbRate:   8.0,   // DERIVED: BB/PA = 20/251 = 7.97% (2025 full season)

    // No EV/Statcast data available — college player
    avgEV:   null,   // UNAVAILABLE — no Statcast for college player
    barrel:  null,   // UNAVAILABLE
    hardHit: null    // UNAVAILABLE
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from PDF language.
     xAVG is a PROJECTION.
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for college player.
    // Derived from: 50 hit tool, .350 Big 12 freshman BA, swing-decisions development area.
    // Jesse Winker career xAVG ~.265–.290; Cody Bellinger ~.250–.285.
    // Plate discipline development is gating factor.
    xAVG:  0.268,   // PROJECTION — plate discipline development needed for MLB. Manual review post-debut.

    // PROJECTION — derived from 65 power tool, .650 SLG freshman, MLB adjustment.
    // Power grades highest in class — slugging projection is strong.
    xSLG:  0.490,   // PROJECTION — not used by scoring engine. Display only.

    // DERIVED from PDF language:

    plateDiscTrend: 0.55,  // "primary development area is swing decisions" — "overly aggressive
                           // early in counts against premium velocity" (PDF p.21)
                           // OBP .420 is good but swing decisions at MLB level is the question

    contactTrend:   0.68,  // .350 freshman in Big 12 is legitimate; "can maintain above-average contact"
                           // noted; sophomore confirmation pending

    injuryTrend:    0.82,  // no injury flags; full freshman workload completed successfully

    sprintTrend:    0.80,  // "10 triples in single freshman season" — "genuine plus runner" despite 6'2"
                           // "runs quality routes in outfield and takes extra bases with consistency"

    posValue:       0.78,  // RF primary; CF capable — above-average to plus positional value
                           // "plus arm — legitimate weapon in outfield" adds to positional value

    consistency:    0.75   // freshman performance consistent across Big 12 competition;
                           // sophomore confirmation pending — only one season of data
  }

}
