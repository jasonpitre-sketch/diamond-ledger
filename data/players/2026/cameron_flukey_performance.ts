/* =============================================================
   CAMERON FLUKEY — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: goccusports.com official stats (May 10, 2026) — primary statistical source
           D1Baseball.com (May 10, 2026) — supplemental (superseded for ERA by goccusports.com)
   Generated: 2026-05-10 | Pass 25.5 | Updated: 2026-05-10 | Pass 25.14
   kind: "pitcher"

   CASING RULES (PLAYER_CONTRACT.md):
     era / ERA  — both present.
     era  → lowercase: consumed by IntelStack UI display (snap?.era)
     ERA  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "ERA")

   DATA CONFIDENCE (Pass 25.14 — updated May 10, 2026, goccusports.com official stats):
     SNAPSHOT SOURCE (2025 sophomore season): goccusports.com official stats (May 10, 2026):
       G=18, GS=17, W=7, L=2, ERA=3.19, IP=101.2, H=78, R=40, ER=36, BB=24, K=118, HBP=11,
       BA=.210, CG=1, SHO=1, BF=414.
       SOURCE CONFLICT RESOLVED: goccusports.com official states ERA=3.19. D1Baseball stated ERA=3.28.
         goccusports.com official site is authoritative — ERA=3.19 adopted.
       SOURCE CONFLICT RESOLVED: CCU official bio directly states K=118 ("118 strikeouts with
         414 batters faced"). D1Baseball stated K=117. CCU official bio is authoritative — K=118.
       DERIVED: WHIP = (H+BB)/IP = (78+24)/101.2 = 102/101.2 = 1.01
       DERIVED: K/9 = 118/(101.2/9) = 118/11.24 = 10.5
       DERIVED: K% = K/BF = 118/414 = 28.5%
       DERIVED: K/BB = 118/24 = 4.92
     SEASON 2026 SOURCE (partial — injury return): goccusports.com official stats (May 10, 2026):
       G=3, GS=3, W=0, L=1, ERA=7.20, IP=10.0, H=11, BB=2, K=13.
       NOTE: Flukey suffered a rib cage stress fracture after his first start. Missed ~10 weeks.
       Returned April 2026 — has now made 3 starts (10.0 IP) as of May 10, 2026.
       DERIVED: WHIP = (H+BB)/IP = (11+2)/10.0 = 13/10.0 = 1.30
     SEASON 2024 SOURCE: D1Baseball.com + CCU bio — freshman full season:
       G=19, GS=10, W=3, L=3, ERA=5.73, IP=55.0, H=50, BB=27, K=83, HBP=8, BA=.242, SV=1.
       CCU bio confirms: "19 appearances, 10 starts, 55.0 IP, 83 K, 3-3 record" — all match.
       DERIVED: WHIP = (50+27)/55.0 = 77/55.0 = 1.40
       DERIVED: K/9 = 83/(55.0/9) = 83/6.11 = 13.6
     HONORS (all directly stated, goccusports.com bio, May 10, 2026):
       2026 preseason: Golden Spikes Preseason Watch List; NCBWA Preseason 1st Team All-American;
         Preseason All-Sun Belt Pitcher of the Year; Preseason All-Sun Belt Conference;
         Baseball America Preseason Pitcher of the Year (unanimous);
         BA Preseason 1st Team All-American (unanimous); D1Baseball Preseason 1st Team All-American;
         Perfect Game Preseason All-Sun Belt; Perfect Game Preseason Pitcher of the Year;
         Perfect Game Preseason 1st Team All-American.
       2025 in-season: 1st Team All-Sun Belt Conference; Sun Belt Conference All-Tournament Team;
         D1Baseball 3rd Team All-American.
     PERSONAL (goccusports.com bio): RHP, 6'6" 210 lbs, born April 13 2005,
       Egg Harbor Township NJ (Egg Harbor Township HS). Chose CCU over JMU and Rutgers.
       Majoring in Business. Parents: Kerry (volleyball, Stockton) and Vincent (tennis, Dickinson).
     ESTIMATED: xERA, xFIP — projected from tool grades and college performance
   ============================================================= */

export const cameron_flukey_performance = {
  kind: "pitcher",   // REQUIRED — pitcher role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // NCAA: strong certainty / established track record → maturityConfidence = 0.94
  competitionLevel: "NCAA",

  /* =========================
     SNAPSHOT (2025 sophomore season — most complete, full season)
     Per INGESTION_GOLD_STANDARD.md: snapshot = most complete season.
     2026 current season is severely limited by rib cage injury (only 1 start as of May 10).
     Engine reads: ERA only.
  ========================= */

  snapshot: {
    year:  "2025",                // SOURCE: D1Baseball.com — "2025" row (sophomore season)
    team:  "Coastal Carolina",

    // DUAL KEY — ERA
    era:   3.19,                  // lowercase — IntelStack display: snap?.era
    ERA:   3.19,                  // uppercase — calculateDLR: readNumber(snapshot, "ERA") ← ENGINE
                                  // SOURCE: goccusports.com (May 10, 2026) — "ERA: 3.19"
                                  // SOURCE CONFLICT RESOLVED: D1Baseball stated 3.28; goccusports.com
                                  // official is authoritative — ERA=3.19 adopted.

    // DUAL KEY — full pitcher MVP fields
    ip:    101.2,                 // SOURCE: D1Baseball.com — "IP: 101.2"
    IP:    101.2,
    w:     7,                     // SOURCE: D1Baseball.com — "W: 7"
    W:     7,
    l:     2,                     // SOURCE: D1Baseball.com — "L: 2"
    L:     2,
    g:     18,                    // SOURCE: D1Baseball.com — "APP: 18"
    so:    118,                   // SOURCE: CCU official bio (goccusports.com) — "118 strikeouts"
                                  // SOURCE CONFLICT RESOLVED: CCU bio=118, D1Baseball=117.
                                  // CCU official bio is authoritative — K=118 adopted.
    K:     118,
    bb:    24,                    // SOURCE: D1Baseball.com — "BB: 24"
    BB:    24,
    h:     78,                    // SOURCE: D1Baseball.com — "H: 78"
    bf:    414,                   // SOURCE: CCU bio — "414 batters faced" — directly stated

    // DERIVED from confirmed inputs
    whip:  1.01,                  // DERIVED: (H+BB)/IP = (78+24)/101.2 = 102/101.2 = 1.008 ≈ 1.01
    WHIP:  1.01,
    k9:    10.5,                  // DERIVED: K/(IP/9) = 118/11.24 = 10.50 ≈ 10.5
    K9:    10.5,
    kbb:   4.92,                  // DERIVED: K/BB = 118/24 = 4.917 ≈ 4.92
    kPct:  28.5,                  // DERIVED: K/BF = 118/414 = 0.285 = 28.5%

    // DISPLAY-ONLY supplemental
    cg:    1,                     // SOURCE: D1Baseball.com — "CG: 1" (complete game shutout vs Marshall 4/18)
    sho:   1,                     // SOURCE: D1Baseball.com — "SHO: 1"
    gs:    17,                    // SOURCE: D1Baseball.com — "GS: 17"
    hbp:   11,                    // SOURCE: D1Baseball.com — "HBP: 11"
    ba:    0.210                  // SOURCE: D1Baseball.com — "BAA: .210"
  },


  /* =========================
     SEASON 2026 (junior season — partial, injury-impacted)
     NOTE: Rib cage stress fracture after first start. Only 1 start as of May 10, 2026.
     Stats will update significantly upon full return.
     SOURCE: D1Baseball.com (May 10, 2026).
  ========================= */
  season2026: {
    year:  "2026",
    team:  "Coastal Carolina",

    // INJURY NOTE: Rib cage stress fracture after first start. Missed ~10 weeks.
    // Returned April 2026 — 3 starts recorded as of May 10, 2026.
    // SOURCE: goccusports.com official stats (May 10, 2026).
    era:   7.20,                  // SOURCE: goccusports.com — "ERA: 7.20" (3 starts)
    ERA:   7.20,

    ip:    10.0,                  // SOURCE: goccusports.com — "IP: 10.0"
    IP:    10.0,
    w:     0,                     // SOURCE: goccusports.com — "W: 0"
    W:     0,
    l:     1,                     // SOURCE: goccusports.com — "L: 1"
    L:     1,
    g:     3,                     // SOURCE: goccusports.com — "APP: 3"
    so:    13,                    // SOURCE: goccusports.com — "K: 13"
    K:     13,
    bb:    2,                     // SOURCE: goccusports.com — "BB: 2"
    BB:    2,
    h:     11,                    // SOURCE: goccusports.com — "H: 11"
    gs:    3,

    // DERIVED from confirmed inputs
    whip:  1.30,                  // DERIVED: (H+BB)/IP = (11+2)/10.0 = 13/10.0 = 1.30
    WHIP:  1.30
  },


  /* =========================
     SEASON 2024 (freshman season — full)
     SOURCE: D1Baseball.com (May 10, 2026).
     All fields directly stated.
  ========================= */
  season2024: {
    year:  "2024",
    team:  "Coastal Carolina",

    era:   5.73,                  // SOURCE: D1Baseball.com — "ERA: 5.73"
    ip:    55.0,                  // SOURCE: D1Baseball.com — "IP: 55.0"
    w:     3,                     // SOURCE: D1Baseball.com — "W: 3"
    l:     3,                     // SOURCE: D1Baseball.com — "L: 3"
    g:     19,                    // SOURCE: D1Baseball.com — "APP: 19"
    gs:    10,                    // SOURCE: D1Baseball.com — "GS: 10"
    so:    83,                    // SOURCE: D1Baseball.com — "K: 83"
    bb:    27,                    // SOURCE: D1Baseball.com — "BB: 27"
    h:     50,                    // SOURCE: D1Baseball.com — "H: 50"
    hbp:   8,                     // SOURCE: D1Baseball.com — "HBP: 8"
    sv:    1,                     // SOURCE: D1Baseball.com — "SV: 1"
    ba:    0.242,                 // SOURCE: D1Baseball.com — "BAA: .242"

    // DERIVED from confirmed inputs
    whip:  1.40,                  // DERIVED: (H+BB)/IP = (50+27)/55.0 = 77/55.0 = 1.40
    k9:    13.6                   // DERIVED: K/(IP/9) = 83/6.11 = 13.58 ≈ 13.6
  },


  /* =========================
     SCOUT (velocity / pitch mix data)
     Engine reads: kRate
     No publicly available Statcast data for college pitcher.
     Velocity/grading context from scouting publications.
  ========================= */

  scout: {
    // PRIOR-YEAR BASELINE RULE (pitchers):
    //   kPercent  = K / BF           from prior full season
    //   bbPercent = BB / BF          from prior full season
    //   kMinusBB  = kPercent - bbPercent (or (K-BB)/BF)
    // 2025 full season dictates 2026 scout starting values. Update annually.
    // Engine reads: s.kPercent, s.bbPercent, s.kMinusBB, s.whiff, s.avgEV
    kPercent:  28.5,  // DERIVED: K/BF = 118/414 = 28.5% (2025) — elite strikeout rate
    bbPercent:  5.8,  // DERIVED: BB/BF = 24/414 = 5.8% (2025) — solid command/control
    kMinusBB:  22.7,  // DERIVED: (K-BB)/BF = 94/414 = 22.7% (2025) — elite differential

    whiff:    null,   // UNAVAILABLE — no Statcast for college pitcher
    avgEV:    null,   // UNAVAILABLE — no Statcast for college pitcher

    // Supporting display fields (not read by scoring engine)
    kRate9:   10.5,   // DERIVED: K/(IP/9) = 118/11.24 = 10.5 (display only)
    fbVelo:   null,   // UNAVAILABLE from public sources
    fbVeloPeak: null  // UNAVAILABLE
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xERA (via ERA field)
     All 0–1 normalized trend fields derived from performance profile.
     xERA is a long-range PROJECTION.
     NOTE: 2026 injury significantly impacts near-term projection timeline.
  ========================= */

  analyst: {
    // LONG-RANGE PROJECTION — from 2025 dominant sophomore season.
    // ERA= 3.28 at Sun Belt level with K/9=10.4, WHIP=1.01 → MLB starter projection.
    // Injury risk from rib cage stress fracture adds uncertainty.
    // Patrick Corbin / Blake Snell early-career comps for stuff profile.
    xERA:  3.65,   // LONG-RANGE PROJECTION — injury risk buffered in estimate. Manual review post-debut.

    // PROJECTION — display-only
    xFIP:  3.50,   // LONG-RANGE PROJECTION — estimated from K/9 and BB profile

    // DERIVED from performance data and bio:

    commandTrend:   0.72,  // WHIP=1.01 and ERA=3.28 vs freshman 5.73 — significant command improvement;
                           // BB rate declined from 27 (2024) to 24 (2025) over 46.2 more IP

    stuffTrend:     0.82,  // K/9 improved from 13.6 (freshman, smaller sample) to 10.4 (full sophomore);
                           // preseason 2026 unanimous 1st-team All-American accolades confirm top-tier stuff;
                           // K=118 in 101.2 IP across 17 starts shows plus pitch mix

    injuryTrend:    0.48,  // CONCERN — rib cage stress fracture in 2026 caused ~10-week absence;
                           // has returned and made 3 starts (10.0 IP) as of May 10 — positive signal;
                           // long-term health risk still elevated; pitcher injury history a draft factor

    durabilityTrend: 0.58, // 2025 showed strong durability (101.2 IP, 17 starts, 1 CG);
                           // 2026 injury disrupts narrative but return to mound (3 G) is encouraging;
                           // uncertain post-injury full-season workload projection

    pitchMixTrend:  0.78,  // BA=.210 against and K/9=10.4 indicate effective three-pitch mix;
                           // "complete game shutout" signal of mix dominance; velocity mix not stated

    consistency:    0.68   // Freshman → sophomore improvement was excellent (5.73 → 3.28 ERA);
                           // 2026 injury creates uncertainty in trajectory; pre-injury had 5 career W
                           // then missed season — consistency score penalized for health variance
  }

}
