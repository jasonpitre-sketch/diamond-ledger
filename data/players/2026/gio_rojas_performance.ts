/* =============================================================
   GIO ROJAS — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 23–25
           MaxPreps (May 9, 2026) — career pitching totals + batting DH stats
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-10 | Pass 25.5
   kind: "pitcher"
   Personal: 6'4" 185 lbs, Senior 2026, #12 LHP DH, Stoneman Douglas HS (Parkland FL)

   CASING RULES (PLAYER_CONTRACT.md):
     era / ERA  — both present.
     era  → lowercase: consumed by IntelStack UI display (snap?.era)
     ERA  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "ERA")

   DATA CONFIDENCE (Pass 25.6 — full MaxPreps pitching table ingested from screenshot, May 10 2026):
     SOURCE: MaxPreps (May 9, 2026, coach-entered, screenshot verified — all three pitching tables).
     2026 SENIOR (25-26): ERA=0.64, W=10, L=1, W%=.909, APP=12, GS=2, IP=66, H=30, R=14, ER=6,
       BB=15, K=112, BF=251, HBP=11, OBA=.133, OBP=.223.
       DERIVED: WHIP=(30+15)/66=0.68. K/9=112/7.333=15.3. K/BB=112/15=7.47.
       NOTE: 2026 season IS isolatable from screenshot — prior null entries corrected.
     2025 JUNIOR (24-25): ERA=0.72, W=13, L=0, W%=1.000, APP=14, GS=0, IP=68, H=35, R=8, ER=7,
       BB=16, K=120, BF=258, HBP=8, OBA=.150, OBP=.229.
       SOURCE CONFLICT RESOLVED: Scouting publications stated W=12; MaxPreps coach-entered W=13.
       MaxPreps is authoritative. W corrected 12→13.
       DERIVED: WHIP=(35+16)/68=0.75. K/9=120/7.556=15.9.
     2024 SOPHOMORE (23-24): ERA=0.66, W=4, L=0, W%=1.000, APP=5, GS=1, CG=1, SHO=1, IP=21.1,
       H=7, R=3, ER=2, BB=3, K=41, BF=77, HBP=1, OBP=.143.
       DERIVED: WHIP=(7+3)/21.1=0.47. K/9=41/2.344=17.5.
     VARSITY TOTALS: ERA=0.68, W=27, L=1, W%=.964, APP=31, GS=3, CG=1, SHO=1, IP=155.1,
       H=72, R=25, ER=15, BB=34, K=273, BF=586, BAA=.135, FP=.958. All directly stated.
       DERIVED: WHIP=(72+34)/155.1=0.68. Career K/9=15.8.
     BATTING SOURCE (all DH role, MaxPreps May 9 2026, coach-entered):
       2026 Sr: GP=25, AVG=.338, PA=77, AB=68, R=12, H=23, HR=5, RBI=24, BB=8, K=23, HBP=1.
       2025 Jr: GP=33, AVG=.375, PA=115, AB=88, R=24, H=33, HR=2, RBI=32, BB=20, K=15, HBP=5.
       2024 So: GP=20, AVG=.333, PA=42, AB=27, R=9, H=9, HR=0, RBI=5, BB=11, K=8, HBP=3.
       Career:  GP=78, AVG=.355, PA=234, AB=183, R=45, H=65, RBI=61, 2B=9, HR=7, BB=39, K=46.
     PRIOR-YEAR SCOUT BASELINE (pitchers — INGESTION_GOLD_STANDARD.md):
       2025 season: K=120, BB=16, BF=258 (directly stated — supersedes prior estimate of 255).
       kPercent  = 120/258 x 100 = 46.5% — elite HS strikeout rate
       bbPercent = 16/258 x 100 = 6.2% — solid command for prep arm
       kMinusBB  = 46.5 - 6.2 = 40.3% — exceptional differential
   ============================================================= */

export const gio_rojas_performance = {
  kind: "pitcher",   // REQUIRED — pitcher role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // HS: lower certainty / higher volatility / compressed DLR floor → maturityConfidence = 0.82
  competitionLevel: "HS",

  /* =========================
     SNAPSHOT (2025 junior season — most complete season, full statline)
     Per INGESTION_GOLD_STANDARD.md: snapshot = most complete season.
     2025 junior season is the dominant complete season with full statline.
     2026 senior season stats are not isolatable from career cumulative (MaxPreps render).
     Engine reads: ERA only. ERA=0.72 feeds calculateDLR performance layer.
     SOURCE: Multiple verified scouting publications (Prep Baseball Report, search-confirmed).
  ========================= */

  snapshot: {
    year:  "2025",
    team:  "Stoneman Douglas HS",

    // DUAL KEY — ERA
    era:   0.72,          // lowercase — IntelStack display: snap?.era
    ERA:   0.72,          // uppercase — calculateDLR: readNumber(snapshot, "ERA") ← ENGINE
                          // SOURCE: Multiple publications — "ERA: 0.72" — directly stated

    // DUAL KEY — full pitcher MVP fields
    ip:    68.0,          // SOURCE: MaxPreps — "IP: 68"
    IP:    68.0,
    w:     13,            // SOURCE: MaxPreps — "W: 13" (corrected from scouting pub W=12)
    W:     13,
    l:     0,             // SOURCE: MaxPreps — "L: 0"
    L:     0,
    so:    120,           // SOURCE: MaxPreps — "K: 120"
    K:     120,
    bb:    16,            // SOURCE: MaxPreps — "BB: 16"
    BB:    16,
    h:     35,            // SOURCE: MaxPreps — "H: 35"
    g:     14,            // SOURCE: MaxPreps — "APP: 14"
    gs:    0,             // SOURCE: MaxPreps — "GS: 0"
    bf:    258,           // SOURCE: MaxPreps — "BF: 258" — directly stated
    hbp:   8,             // SOURCE: MaxPreps — "HBP: 8"
    er:    7,             // SOURCE: MaxPreps — "ER: 7"
    r:     8,             // SOURCE: MaxPreps — "R: 8"
    oba:   0.150,         // SOURCE: MaxPreps — "OBA: .150"
    obp:   0.229,         // SOURCE: MaxPreps — "OBP: .229"

    // DERIVED from confirmed totals
    whip:  0.75,          // DERIVED: (H+BB)/IP = (35+16)/68 = 51/68 = 0.75
    WHIP:  0.75,
    k9:    15.9,          // DERIVED: K/(IP/9) = 120/7.556 = 15.87 ≈ 15.9
    K9:    15.9,
    kbb:   7.50,          // DERIVED: K/BB = 120/16 = 7.50

    // DISPLAY-ONLY velocity data (from PDF p.25)
    fbVeloLow:   93,        // SOURCE: PDF p.25 — "FB Velocity: 93-97 mph"
    fbVeloHigh:  97,        // SOURCE: PDF p.25 — "93-97 mph"
    fbVeloPeak:  98,        // SOURCE: PDF p.25 — "Peak: 98 mph"
    sliderShape: "Low-80s, plus sweep",  // SOURCE: PDF p.25
    commandNote: "Advanced for prep"     // SOURCE: PDF p.25 — "Command: Advanced for prep"
  },


  /* =========================
     SEASON 2026 (senior season — pitching not isolatable; batting DH stats available)
     NOTE: MaxPreps renders career cumulative for pitching only — cannot isolate 2026 season alone.
     Pitching fields remain null. Batting DH stats ARE available (MaxPreps GP=25 row).
     SOURCE (batting): MaxPreps (May 9, 2026, coach-entered).
  ========================= */
  season2026: {
    year:  "2026",
    team:  "Stoneman Douglas HS",

    // PITCHING — SOURCE: MaxPreps (May 9, 2026, coach-entered, screenshot verified)
    // All fields directly stated from the 25-26 Sr. row of MaxPreps pitching tables.
    era:   0.64,            // SOURCE: MaxPreps — "ERA: 0.64"
    ERA:   0.64,
    ip:    66.0,            // SOURCE: MaxPreps — "IP: 66"
    IP:    66.0,
    w:     10,              // SOURCE: MaxPreps — "W: 10"
    W:     10,
    l:     1,               // SOURCE: MaxPreps — "L: 1"
    L:     1,
    so:    112,             // SOURCE: MaxPreps — "K: 112"
    K:     112,
    bb:    15,              // SOURCE: MaxPreps — "BB: 15"
    BB:    15,
    h:     30,              // SOURCE: MaxPreps — "H: 30"
    g:     12,              // SOURCE: MaxPreps — "APP: 12"
    gs:    2,               // SOURCE: MaxPreps — "GS: 2"
    bf:    251,             // SOURCE: MaxPreps — "BF: 251"
    hbp:   11,              // SOURCE: MaxPreps — "HBP: 11"
    er:    6,               // SOURCE: MaxPreps — "ER: 6"
    r:     14,              // SOURCE: MaxPreps — "R: 14"
    hr:    2,               // SOURCE: MaxPreps — "HR: 2"
    oba:   0.133,           // SOURCE: MaxPreps — "OBA: .133"
    obp:   0.223,           // SOURCE: MaxPreps — "OBP: .223"

    // DERIVED from confirmed inputs
    whip:  0.68,            // DERIVED: (H+BB)/IP = (30+15)/66 = 45/66 = 0.682 ≈ 0.68
    WHIP:  0.68,
    k9:    15.3,            // DERIVED: K/(IP/9) = 112/7.333 = 15.27 ≈ 15.3
    K9:    15.3,
    kbb:   7.47,            // DERIVED: K/BB = 112/15 = 7.47

    // SUPPLEMENTAL BATTING (DH role, senior year) — SOURCE: MaxPreps (May 9, 2026)
    // Rojas also bats as DH. These are batting stats only — not used by pitcher engine.
    batG:       25,               // SOURCE: MaxPreps — "GP: 25"
    batPA:      77,               // SOURCE: MaxPreps — "PA: 77"
    batAvg:     0.338,            // SOURCE: MaxPreps — "AVG: .338" (check: 23/68=.338 ✓)
    batAB:      68,               // SOURCE: MaxPreps — "AB: 68"
    batR:       12,               // SOURCE: MaxPreps — "R: 12"
    batH:       23,               // SOURCE: MaxPreps — "H: 23"
    batHR:      5,                // SOURCE: MaxPreps — "HR: 5"
    batRBI:     24,               // SOURCE: MaxPreps — "RBI: 24"
    batBB:      8,                // SOURCE: MaxPreps — "BB: 8"
    batK:       23,               // SOURCE: MaxPreps — "K: 23"
    batHBP:     1,                // SOURCE: MaxPreps — "HBP: 1"
    batOBP:     0.416,            // SOURCE: MaxPreps — "OBP: .416"
    batSLG:     0.574,            // SOURCE: MaxPreps — "SLG: .574"
    batOPS:     0.990             // SOURCE: MaxPreps — "OPS: .990"
  },


  /* =========================
     CAREER PITCHING TOTALS (MaxPreps — all seasons through May 2026)
     SOURCE: MaxPreps career top stats (May 9, 2026, coach-entered).
     Cannot break down by year from available source render.
     NOTE: Pass 25 search estimates (W=17, IP≈93.1, K=169) were partial; these are full career.
     DERIVED: K/9 = 273/(155.1/9) = 273/17.23 = 15.8 — matches 2025 junior K/9=15.9 ✓
  ========================= */
  careerPitching: {
    // SOURCE: MaxPreps varsity totals row (May 9, 2026, screenshot verified)
    era:   0.68,                  // SOURCE: MaxPreps — "ERA: 0.68"
    w:     27,                    // SOURCE: MaxPreps — "W: 27"
    l:     1,                     // SOURCE: MaxPreps — "L: 1" (corrected from prior L=0 estimate)
    ip:    155.1,                 // SOURCE: MaxPreps — "IP: 155.1"
    so:    273,                   // SOURCE: MaxPreps — "K: 273"
    h:     72,                    // SOURCE: MaxPreps — "H: 72"
    r:     25,                    // SOURCE: MaxPreps — "R: 25"
    er:    15,                    // SOURCE: MaxPreps — "ER: 15"
    bb:    34,                    // SOURCE: MaxPreps — "BB: 34"
    bf:    586,                   // SOURCE: MaxPreps — "BF: 586"
    g:     31,                    // SOURCE: MaxPreps — "APP: 31"
    gs:    3,                     // SOURCE: MaxPreps — "GS: 3"
    cg:    1,                     // SOURCE: MaxPreps — "CG: 1"
    sho:   1,                     // SOURCE: MaxPreps — "SHO: 1"
    baa:   0.135,                 // SOURCE: MaxPreps — "BAA: .135"
    fp:    0.958,                 // SOURCE: MaxPreps — "FP: .958"

    // DERIVED from career totals
    whip:  0.68,                  // DERIVED: (H+BB)/IP = (72+34)/155.1 = 106/155.1 = 0.683 ≈ 0.68
    k9:    15.8                   // DERIVED: K/(IP/9) = 273/17.233 = 15.84 ≈ 15.8
  },


  /* =========================
     SEASON 2024 PITCHING (sophomore 23-24 — full season)
     SOURCE: MaxPreps (May 9, 2026, screenshot verified — So. 23-24 pitching row).
     All fields directly stated.
  ========================= */
  season2024: {
    year:  "2024",
    team:  "Stoneman Douglas HS",

    era:   0.66,                  // SOURCE: MaxPreps — "ERA: 0.66"
    w:     4,                     // SOURCE: MaxPreps — "W: 4"
    l:     0,                     // SOURCE: MaxPreps — "L: 0"
    g:     5,                     // SOURCE: MaxPreps — "APP: 5"
    gs:    1,                     // SOURCE: MaxPreps — "GS: 1"
    cg:    1,                     // SOURCE: MaxPreps — "CG: 1"
    sho:   1,                     // SOURCE: MaxPreps — "SHO: 1"

    ip:    21.1,                  // SOURCE: MaxPreps — "IP: 21.1"
    h:     7,                     // SOURCE: MaxPreps — "H: 7"
    r:     3,                     // SOURCE: MaxPreps — "R: 3"
    er:    2,                     // SOURCE: MaxPreps — "ER: 2"
    bb:    3,                     // SOURCE: MaxPreps — "BB: 3"
    so:    41,                    // SOURCE: MaxPreps — "K: 41"
    bf:    77,                    // SOURCE: MaxPreps — "BF: 77"
    hbp:   1,                     // SOURCE: MaxPreps — "HBP: 1"
    obp:   0.143,                 // SOURCE: MaxPreps — "OBP: .143"

    // DERIVED from confirmed inputs
    whip:  0.47,                  // DERIVED: (H+BB)/IP = (7+3)/21.1 = 10/21.1 = 0.474 ≈ 0.47
    k9:    17.5                   // DERIVED: K/(IP/9) = 41/2.344 = 17.49 ≈ 17.5
  },


  /* =========================
     SEASON 2025 BATTING (junior year — DH role, MaxPreps batting stats)
     NOTE: Pitching stats for 2025 are in snapshot block above.
     Batting as DH in 2025 provides additional two-way context.
     SOURCE: MaxPreps (May 9, 2026, coach-entered).
  ========================= */
  season2025Batting: {
    year:  "2025",
    team:  "Stoneman Douglas HS",

    g:     33,                    // SOURCE: MaxPreps — "GP: 33"
    pa:    115,                   // SOURCE: MaxPreps — "PA: 115"
    avg:   0.375,                 // SOURCE: MaxPreps — "AVG: .375" (check: 33/88=.375 ✓)
    ab:    88,                    // SOURCE: MaxPreps — "AB: 88"
    r:     24,                    // SOURCE: MaxPreps — "R: 24"
    h:     33,                    // SOURCE: MaxPreps — "H: 33"
    hr:    2,                     // SOURCE: MaxPreps — "HR: 2"
    rbi:   32,                    // SOURCE: MaxPreps — "RBI: 32"
    bb:    20,                    // SOURCE: MaxPreps — "BB: 20"
    k:     15,                    // SOURCE: MaxPreps — "K: 15"
    hbp:   5,                     // SOURCE: MaxPreps — "HBP: 5"
    sf:    2,                     // SOURCE: MaxPreps — "SF: 2"
    obp:   0.504,                 // SOURCE: MaxPreps — "OBP: .504"
    slg:   0.534,                 // SOURCE: MaxPreps — "SLG: .534"
    ops:   1.038                  // SOURCE: MaxPreps — "OPS: 1.038"
  },


  /* =========================
     SEASON 2024 BATTING (sophomore year — DH role, MaxPreps batting stats)
     SOURCE: MaxPreps (May 9, 2026, coach-entered).
  ========================= */
  season2024Batting: {
    year:  "2024",
    team:  "Stoneman Douglas HS",

    g:     20,                    // SOURCE: MaxPreps — "GP: 20"
    pa:    42,                    // SOURCE: MaxPreps — "PA: 42"
    avg:   0.333,                 // SOURCE: MaxPreps — "AVG: .333" (check: 9/27=.333 ✓)
    ab:    27,                    // SOURCE: MaxPreps — "AB: 27"
    r:     9,                     // SOURCE: MaxPreps — "R: 9"
    h:     9,                     // SOURCE: MaxPreps — "H: 9"
    hr:    0,                     // SOURCE: MaxPreps — "HR: 0"
    rbi:   5,                     // SOURCE: MaxPreps — "RBI: 5"
    doubles: 0,                   // SOURCE: MaxPreps — "2B: 0"
    triples: 0,                   // SOURCE: MaxPreps — "3B: 0"
    bb:    11,                    // SOURCE: MaxPreps — "BB: 11"
    k:     8,                     // SOURCE: MaxPreps — "K: 8"
    hbp:   3,                     // SOURCE: MaxPreps — "HBP: 3"
    sf:    1,                     // SOURCE: MaxPreps — "SF: 1"
    obp:   0.548,                 // SOURCE: MaxPreps — "OBP: .548"
    slg:   0.333,                 // SOURCE: MaxPreps — "SLG: .333"
    ops:   0.881                  // SOURCE: MaxPreps — "OPS: .881"
  },


  /* =========================
     CAREER BATTING TOTALS (MaxPreps varsity total — all seasons through May 2026)
     SOURCE: MaxPreps varsity career batting line (May 9, 2026, coach-entered).
     Covers: sophomore (2024) + junior (2025) + senior (2026) seasons.
     Cross-check: 65/183 = .355 ✓
  ========================= */
  careerBatting: {
    g:     78,                    // SOURCE: MaxPreps — "GP: 78"
    pa:    234,                   // SOURCE: MaxPreps — "PA: 234"
    avg:   0.355,                 // SOURCE: MaxPreps — "AVG: .355"
    ab:    183,                   // SOURCE: MaxPreps — "AB: 183"
    r:     45,                    // SOURCE: MaxPreps — "R: 45"
    h:     65,                    // SOURCE: MaxPreps — "H: 65"
    hr:    7,                     // SOURCE: MaxPreps — "HR: 7"
    rbi:   61,                    // SOURCE: MaxPreps — "RBI: 61"
    doubles: 9,                   // SOURCE: MaxPreps — "2B: 9"
    triples: 0,                   // SOURCE: MaxPreps — "3B: 0"
    bb:    39,                    // SOURCE: MaxPreps — "BB: 39"
    k:     46,                    // SOURCE: MaxPreps — "K: 46"
    hbp:   9,                     // SOURCE: MaxPreps — "HBP: 9"
    sf:    3,                     // SOURCE: MaxPreps — "SF: 3"
    obp:   0.483,                 // SOURCE: MaxPreps — "OBP: .483"
    slg:   0.519,                 // SOURCE: MaxPreps — "SLG: .519"
    ops:   1.002                  // SOURCE: MaxPreps — "OPS: 1.002"
  },


  /* =========================
     SCOUT (pitch data — primary data layer for Rojas)
     All velocity data DIRECTLY SOURCED from PDF p.23-25.
     Engine reads: kRate (null for prep pitcher)
  ========================= */

  scout: {
    // PRIOR-YEAR BASELINE RULE (pitchers — INGESTION_GOLD_STANDARD.md):
    // 2025 full season dictates 2026 scout starting values. Update annually.
    // Engine reads: s.kPercent, s.bbPercent, s.kMinusBB, s.whiff, s.avgEV
    // 2025: K=120, BB=16, IP=68.0. Estimated BF≈255 (outs=204 + H=35 + BB=16).
    kPercent:  46.5,  // DERIVED: K/BF = 120/258 = 46.5% (2025) — BF=258 directly stated MaxPreps
    bbPercent:  6.2,  // DERIVED: BB/BF = 16/258 = 6.2% (2025) — solid prep command
    kMinusBB:  40.3,  // DERIVED: (K-BB)/BF = 104/258 = 40.3% (2025) — elite differential

    whiff:     null,  // UNAVAILABLE — no Statcast/TrackMan for prep pitcher
    avgEV:     null,  // UNAVAILABLE — no Statcast for prep pitcher

    // PITCH VELOCITY DATA — DIRECTLY SOURCED from PDF p.23-25
    // Supporting display fields (not read by scoring engine)
    fbVelo:       97,    // SOURCE: PDF p.25 — "93-97, touches 98" — using high end; "sitting" mid-range
    fbVeloSit:    95,    // SOURCE: Derived midpoint of "93-97" stated range
    fbVeloPeak:   98,    // SOURCE: PDF p.25 — "Peak: 98 mph"
    sliderVelo:   82,    // SOURCE: PDF p.23 — "low-80s slider with significant horizontal sweep"
    changeVelo:   null,  // changeup velocity not stated; "feel for a changeup" noted

    // PITCH QUALITY GRADES — DIRECTLY SOURCED from PDF p.24 tool table
    fbGrade:      65,    // SOURCE: PDF p.24 — "65 FASTBALL" directly from tool table
    sliderGrade:  58,    // SOURCE: PDF p.24 — "55-60 SLIDER" — midpoint used
    changeGrade:  45,    // SOURCE: PDF p.24 — "45+ CHANGEUP" — current grade
    commandGrade: 50     // SOURCE: PDF p.24 — "50 COMMAND" — "advanced for prep arm"
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xERA (via ERA field — null for prep pitcher)
     All 0–1 normalized trend fields derived from PDF language.
     xERA is a long-range PROJECTION for a prep arm with 3-5 year timeline.
  ========================= */

  analyst: {
    // LONG-RANGE PROJECTION — no statistical data for prep pitcher.
    // Derived from: 65 FB, 55-60 slider, 45+ CU, 50 command, 18 years old.
    // Professional starting ERA projection for tools profile: ~3.50–4.50 range.
    // Patrick Sandoval career ERA provides comp anchoring (~3.50–3.80).
    xERA:  3.80,   // LONG-RANGE PROJECTION — lowest confidence in class. Manual review at every level.

    // PROJECTION — display-only
    xFIP:  3.90,   // LONG-RANGE PROJECTION — estimated from tool grades

    // DERIVED from PDF language:

    commandTrend:   0.72,  // "advanced for a prep arm" — "throws strikes with all three pitches" (PDF p.23)
                           // "manipulate velocity and location within counts" — elite prep command signal

    stuffTrend:     0.88,  // "fastball climbs into mid-90s" → "touches 98" by senior year
                           // "slider becomes true weapon" by 2024; "natural ride" on fastball

    injuryTrend:    0.62,  // "HIGH" health projection risk — prep pitcher; not yet professionally tested
                           // no injury flags in PDF but baseline prep pitcher arm risk is real

    durabilityTrend: 0.60, // prep pitcher durability is unknown; clean mechanics are positive signal
                           // "athletic, repeatable delivery" reduces mechanical health risk

    pitchMixTrend:  0.78,  // "three-pitch mix separates him from two-pitch prep arms" — key differentiator
                           // changeup development is the path from elite prospect to frontline starter

    consistency:    0.75   // consistent velocity development across 2022-2026; "climbing boards since sophomore"
  }

}
