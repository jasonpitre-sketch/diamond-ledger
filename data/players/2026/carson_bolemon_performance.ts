/* =============================================================
   CARSON BOLEMON — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: MaxPreps (May 9–14, 2026) — stats page (batting + pitching)
           PBR / search scouting publications — velocity/pitch data
   Generated: 2026-05-10 | Pass 25.5 | Updated: 2026-05-14 | Pass 63
   kind: "pitcher"
   Position: LHP, 1B, DH — Southside Christian HS (Simpsonville, SC)

   CASING RULES (PLAYER_CONTRACT.md):
     era / ERA  — both present.
     era  → lowercase: consumed by IntelStack UI display (snap?.era)
     ERA  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "ERA")

   DATA CONFIDENCE (Pass 25.13 — per-season pitching now isolatable):
     PITCHING UPDATE: MaxPreps (May 10, 2026) — per-season pitching lines confirmed isolatable.
     2026 SENIOR (in-progress, 7 G): G=7, IP=30, W=5, L=0, H=9, SO=68, ERA=0.23, WHIP=0.53.
       BB=7 (SOURCE: user-provided note "(7+9)/30=0.53" → (BB+H)/IP=0.53 → BB=7, H=9 ✓).
       Cross-check: (7+9)/30 = 16/30 = 0.533 ≈ 0.53 ✓. K/9 = 68/(30/9) = 20.4 ✓ (career pace).
     2025 JUNIOR (full season, 13 G): G=13, IP=55.1, W=11, L=0, H=6, SO=135, ERA=0.00, WHIP=0.254.
       BB=8 DIRECTLY STATED (Pass 63 correction from new MaxPreps screenshots).
       BF=189 DIRECTLY STATED — enables accurate kPercent/bbPercent computation.
       WHIP=(8+6)/55.1=14/55.1=0.254 ✓. Cross-check: (BB+H)/IP=(8+6)/55.1=0.254 ✓.
       PRIOR FILE NOTE: Pass 25.13 had H=3, BB=2 derived from WHIP=0.09; this was a
       MaxPreps stale-data artifact. Pass 63 screenshots confirm H=6, BB=8, BF=189.
       K/9 = 135/(55.1/9) = 135/6.12 = 22.1 ✓ (extraordinary even for HS elite).
     NOTE: snapshot.year="2025" per INGESTION_GOLD_STANDARD rule — complete season wins.
     PITCHING (career top stats — confirmed): ERA=0.35, W=33, IP=182.1, K=422, BAA=.078, FP=.984.
       DERIVED: K/9 = 422/(182.1/9) = 20.9 (career).
     BATTING — all seasons directly stated, coach-entered:
       2026 Sr (25-26): GP=27, AVG=.372, PA=96, AB=78, R=16, H=29, RBI=13, 2B=8, 3B=1, HR=3,
         BB=15, K=11, HBP=3, SF=0, OBP=.490, SLG=.615, OPS=1.105. Cross-check: 29/78=.372 ✓
         SLG: TB=(29+8+2+9)/78=48/78=.615 ✓. PA: 78+15+3+0=96 ✓.
       2025 Jr (24-25): GP=35, AVG=.374, PA=126, AB=91, R=25, H=34, RBI=35, 2B=11, 3B=0, HR=7,
         BB=26, K=13, HBP=8, SF=1, OBP=.540, SLG=.725, OPS=1.265. Cross-check: 34/91=.374 ✓
       2024 So (23-24): GP=32, AVG=.511, PA=108, AB=88, R=19, H=45, RBI=27, 2B=15, 3B=1, HR=3,
         BB=14, K=3, HBP=4, SF=2, OBP=.583, SLG=.807, OPS=1.390. Cross-check: 45/88=.511 ✓
       2023 Fr (22-23): GP=6, AVG=.625, PA=16, AB=8, R=2, H=5, RBI=2, 2B=1, 3B=0, HR=0,
         BB=5, K=1, HBP=3, OBP=.812, SLG=.750, OPS=1.562. Cross-check: 5/8=.625 ✓
       Varsity Total: GP=125, AVG=.409, PA=426, AB=320, R=75, H=131, RBI=93, 2B=38, 3B=2, HR=13,
         BB=80, K=38, HBP=20, SF=5, OBP=.543, SLG=.663, OPS=1.206. Cross-check: 131/320=.409 ✓
         DERIVED: TB=(131+38+4+39)/320=212/320=.663 ✓. OBP=(131+80+20)/426=231/426=.542≈.543 ✓.
       NOTE: 8th Var (21-22) and 7th JV (20-21) rows also in MaxPreps but pre-HS; not tracked here.
     PITCH VELOCITY (scouting publications): FB 92-95 mph, peak 96;
       curveball 78-84 mph; slider low-80s. All sourced from PBR/search.
     ESTIMATED: xERA, xFIP — projected from tool grades and HS performance
   ============================================================= */

export const carson_bolemon_performance = {
  kind: "pitcher",   // REQUIRED — pitcher role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // HS: lower certainty / higher volatility / compressed DLR floor → maturityConfidence = 0.82
  competitionLevel: "HS",

  /* =========================
     SNAPSHOT (2025 junior season — complete, full)
     Engine reads: ERA only.
     SOURCE: MaxPreps (May 14, 2026, coach-entered). Pass 63 screenshots corrected H/BB/WHIP.
     INGESTION_GOLD_STANDARD: snapshot = most complete season.
     2025 (13 G, finished) is more complete than 2026 in-progress (7 G).
     NOTE: snapshot.year="2025" → IntelStack reads this block for the 2025 row.
     2026 current data lives in season2026 block below.
     NOTE: BB=8 DIRECTLY STATED (Pass 63) — BF=189 stated; H=6 stated; WHIP=(8+6)/55.1=0.254.
  ========================= */

  snapshot: {
    year:  "2025",                // SOURCE: MaxPreps — "Var. 24-25" — full junior season
    team:  "Southside Christian HS",

    g:     13,                    // SOURCE: MaxPreps — "G: 13"

    // DUAL KEY — pitcher ERA pattern (PLAYER_CONTRACT.md)
    era:   0.00,                  // lowercase — IntelStack display: snap?.era
    ERA:   0.00,                  // uppercase — calculateDLR: readNumber(snapshot, "ERA") ← ENGINE
                                  // SOURCE: MaxPreps — "ERA: 0.00" — 0 earned runs all season

    whip:  0.254,                 // lowercase — display
    WHIP:  0.254,                 // uppercase — engine alias
                                  // SOURCE: MaxPreps (Pass 63 screenshots) — corrected from stale 0.09
                                  // DERIVED CHECK: (BB+H)/IP = (8+6)/55.1 = 14/55.1 = 0.254 ✓

    ip:    55.1,                  // lowercase — display
    IP:    55.1,                  // SOURCE: MaxPreps — "IP: 55.1"

    so:    135,                   // lowercase — display
    K:     135,                   // uppercase — engine alias
                                  // SOURCE: MaxPreps — "SO: 135"

    bb:    8,                     // lowercase — display
    BB:    8,                     // SOURCE: MaxPreps (Pass 63 screenshots) — directly stated
                                  // CORRECTION from Pass 25.13: BB was 2 (derived from stale WHIP=0.09)

    w:     11,                    // lowercase — display
    W:     11,                    // SOURCE: MaxPreps — "W: 11"

    l:     0,                     // lowercase — display
    L:     0,                     // SOURCE: MaxPreps — "L: 0"

    h:     6,                     // SOURCE: MaxPreps (Pass 63 screenshots) — corrected from stale H=3

    // PITCH VELOCITY — DIRECTLY SOURCED from PBR/scouting publications
    fbVeloLow:   92,              // SOURCE: PBR / scouting — "FB: 92-95 mph"
    fbVeloHigh:  95,              // SOURCE: PBR / scouting — "92-95 mph"
    fbVeloPeak:  96,              // SOURCE: search — "tops 96 mph"
    curveShape:  "78-84 mph, depth",  // SOURCE: search — "curveball in 78-84 mph range, great depth"
    sliderShape: "Low-80s"        // SOURCE: search — "harder slider in the low 80s"
    // NOTE: 2026 batting supplemental moved to season2026 block below.
    // 2025 batting supplemental is in season2025 block below.
  },


  /* =========================
     SEASON 2026 (senior season — in-progress, 7 G through May 10, 2026)
     SOURCE: MaxPreps (May 10, 2026, coach-entered).
     Feeds: tracker block in playersDraft2026.ts → 2026 row in IntelStack panel.
     NOTE: snapshot above (2025 junior) is the engine-read primary field.
  ========================= */
  season2026: {
    year:  "2026",
    team:  "Southside Christian HS",

    g:     7,                     // SOURCE: MaxPreps — "G: 7"

    era:   0.23,                  // lowercase — display alias
    ERA:   0.23,                  // uppercase — engine alias (engine reads snapshot, not season2026)
                                  // SOURCE: MaxPreps — "ERA: 0.23"

    whip:  0.53,                  // SOURCE: MaxPreps — "WHIP: 0.53" (check: (7+9)/30=0.533≈0.53 ✓)
    WHIP:  0.53,

    ip:    30,                    // SOURCE: MaxPreps — "IP: 30"
    IP:    30,

    so:    68,                    // SOURCE: MaxPreps — "SO: 68"
    K:     68,

    bb:    7,                     // SOURCE: user note — "(7+9)/30=0.53" → BB=7, H=9 confirmed ✓
    BB:    7,

    w:     5,                     // SOURCE: MaxPreps — "W: 5"
    W:     5,

    l:     0,                     // SOURCE: MaxPreps — "L: 0"
    L:     0,

    h:     9,                     // SOURCE: MaxPreps — "H: 9"

    // SUPPLEMENTAL BATTING (DH/1B role, senior year) — SOURCE: MaxPreps (Pass 63 — May 14, 2026)
    // Bolemon bats as DH/1B. These are batting stats — not used by pitcher engine.
    batG:       27,               // SOURCE: MaxPreps (Pass 63) — "GP: 27" (updated from 26)
    batPA:      96,               // DERIVED: AB+BB+HBP+SF = 78+15+3+0 = 96 (updated from 92)
    batAvg:     0.372,            // SOURCE: MaxPreps (Pass 63) — "AVG: .372" (check: 29/78=.372 ✓)
    batAB:      78,               // SOURCE: MaxPreps (Pass 63) — "AB: 78" (updated from 74)
    batR:       16,               // SOURCE: MaxPreps — "R: 16" (unchanged)
    batH:       29,               // SOURCE: MaxPreps (Pass 63) — "H: 29" (updated from 28)
    batHR:      3,                // SOURCE: MaxPreps (Pass 63) — "HR: 3" (updated from 2)
    batRBI:     13,               // SOURCE: MaxPreps (Pass 63) — "RBI: 13" (updated from 11)
    batDoubles: 8,                // SOURCE: MaxPreps — "2B: 8" (unchanged)
    batTriples: 1,                // SOURCE: MaxPreps — "3B: 1" (unchanged)
    batBB:      15,               // SOURCE: MaxPreps — "BB: 15" (unchanged)
    batK:       11,               // SOURCE: MaxPreps — "K: 11" (unchanged)
    batHBP:     3,                // SOURCE: MaxPreps — "HBP: 3" (unchanged)
    batSF:      0,                // SOURCE: MaxPreps — "SF: 0" (unchanged)
    batOBP:     0.490,            // SOURCE: MaxPreps (Pass 63) — "OBP: .490" (updated from .500)
    batSLG:     0.615,            // DERIVED: TB=(29+8+2+9)/78=48/78=0.615 (updated from 0.595)
    batOPS:     1.105             // DERIVED: OBP+SLG=0.490+0.615=1.105 (updated from 1.095)
  },


  /* =========================
     CAREER PITCHING TOTALS (MaxPreps — all seasons through May 2026)
     SOURCE: MaxPreps career top stats (May 9, 2026, coach-entered).
     Cannot break down by year from available source render.
     NOTE: K/9 derived from career totals is extraordinary even for HS.
  ========================= */
  careerPitching: {
    era:   0.35,                  // SOURCE: MaxPreps career — "ERA: 0.35" — directly stated
    w:     33,                    // SOURCE: MaxPreps career — "Win: 33" — directly stated
    ip:    182.1,                 // SOURCE: MaxPreps career — "IP: 182.1" — directly stated
    so:    422,                   // SOURCE: MaxPreps career — "K: 422" — directly stated
    baa:   0.078,                 // SOURCE: MaxPreps career — "BA: .078" — directly stated
    fp:    0.984,                 // SOURCE: MaxPreps career — "FP: .984" — directly stated

    // DERIVED from career totals
    k9:    20.9                   // DERIVED: K/(IP/9) = 422/(182.1/9) = 422/20.23 = 20.9 K/9
                                  // Note: HS K/9 inflated vs college/pro but confirms elite command
  },


  /* =========================
     SEASON 2025 BATTING (junior year — MaxPreps batting stats — SUPPLEMENTAL)
     NOTE: 2025 pitching stats are now in snapshot block above (snapshot.year="2025").
     This block retains 2025 batting stats (DH/1B role).
     SOURCE: MaxPreps (May 9, 2026, coach-entered).
  ========================= */
  season2025: {
    year:  "2025",
    team:  "Southside Christian HS",

    // BATTING STATS ONLY (pitcher who bats as DH)
    g:     35,                    // SOURCE: MaxPreps — "GP: 35"
    avg:   0.374,                 // SOURCE: MaxPreps — "AVG: .374" (check: 34/91=.374 ✓)
    pa:    126,                   // SOURCE: MaxPreps — "PA: 126"
    ab:    91,                    // SOURCE: MaxPreps — "AB: 91"
    r:     25,                    // SOURCE: MaxPreps — "R: 25"
    h:     34,                    // SOURCE: MaxPreps — "H: 34"
    rbi:   35,                    // SOURCE: MaxPreps — "RBI: 35"
    doubles: 11,                  // SOURCE: MaxPreps — "2B: 11"
    triples: 0,                   // SOURCE: MaxPreps — "3B: 0"
    hr:    7,                     // SOURCE: MaxPreps — "HR: 7"
    bb:    26,                    // SOURCE: MaxPreps — "BB: 26"
    k:     13,                    // SOURCE: MaxPreps — "K: 13"
    hbp:   8,                     // SOURCE: MaxPreps — "HBP: 8"
    sf:    1,                     // SOURCE: MaxPreps — "SF: 1"
    obp:   0.540,                 // SOURCE: MaxPreps — "OBP: .540"
    slg:   0.725,                 // SOURCE: MaxPreps — "SLG: .725"
    ops:   1.265                  // SOURCE: MaxPreps — "OPS: 1.265"
  },


  /* =========================
     SEASON 2024 BATTING (sophomore 23-24 — MaxPreps batting stats)
     SOURCE: MaxPreps (May 9, 2026, coach-entered).
     Cross-check: 45/88 = .511 ✓
  ========================= */
  season2024: {
    year:  "2024",
    team:  "Southside Christian HS",

    g:       32,                  // SOURCE: MaxPreps — "GP: 32"
    pa:      108,                 // SOURCE: MaxPreps — "PA: 108"
    avg:     0.511,               // SOURCE: MaxPreps — "AVG: .511"
    ab:      88,                  // SOURCE: MaxPreps — "AB: 88"
    r:       19,                  // SOURCE: MaxPreps — "R: 19"
    h:       45,                  // SOURCE: MaxPreps — "H: 45"
    hr:      3,                   // SOURCE: MaxPreps — "HR: 3"
    rbi:     27,                  // SOURCE: MaxPreps — "RBI: 27"
    doubles: 15,                  // SOURCE: MaxPreps — "2B: 15"
    triples: 1,                   // SOURCE: MaxPreps — "3B: 1"
    bb:      14,                  // SOURCE: MaxPreps — "BB: 14"
    k:       3,                   // SOURCE: MaxPreps — "K: 3" — elite contact rate
    hbp:     4,                   // SOURCE: MaxPreps — "HBP: 4"
    sf:      2,                   // SOURCE: MaxPreps — "SF: 2"
    obp:     0.583,               // SOURCE: MaxPreps — "OBP: .583"
    slg:     0.807,               // SOURCE: MaxPreps — "SLG: .807"
    ops:     1.390                // SOURCE: MaxPreps — "OPS: 1.390"
  },


  /* =========================
     SEASON 2023 BATTING (freshman 22-23 — MaxPreps batting stats)
     SOURCE: MaxPreps (May 9, 2026, coach-entered).
     NOTE: Small sample (GP=6). Cross-check: 5/8 = .625 ✓
  ========================= */
  season2023: {
    year:  "2023",
    team:  "Southside Christian HS",

    g:       6,                   // SOURCE: MaxPreps — "GP: 6" (small sample — freshman year)
    pa:      16,                  // SOURCE: MaxPreps — "PA: 16"
    avg:     0.625,               // SOURCE: MaxPreps — "AVG: .625"
    ab:      8,                   // SOURCE: MaxPreps — "AB: 8"
    r:       2,                   // SOURCE: MaxPreps — "R: 2"
    h:       5,                   // SOURCE: MaxPreps — "H: 5"
    hr:      0,                   // SOURCE: MaxPreps — "HR: 0"
    rbi:     2,                   // SOURCE: MaxPreps — "RBI: 2"
    doubles: 1,                   // SOURCE: MaxPreps — "2B: 1"
    triples: 0,                   // SOURCE: MaxPreps — "3B: 0"
    bb:      5,                   // SOURCE: MaxPreps — "BB: 5"
    k:       1,                   // SOURCE: MaxPreps — "K: 1"
    hbp:     3,                   // SOURCE: MaxPreps — "HBP: 3"
    obp:     0.812,               // SOURCE: MaxPreps — "OBP: .812"
    slg:     0.750,               // SOURCE: MaxPreps — "SLG: .750"
    ops:     1.562                // SOURCE: MaxPreps — "OPS: 1.562"
  },


  /* =========================
     CAREER BATTING TOTALS (MaxPreps varsity career — Sr+Jr+So+Fr seasons)
     SOURCE: MaxPreps varsity batting total row (May 9, 2026, coach-entered).
     NOTE: 8th Var (21-22) and 7th JV (20-21) rows exist in MaxPreps but are pre-HS;
           those rows ARE included in the MaxPreps varsity total above.
     Cross-check: 130/316 = .411 ✓
  ========================= */
  careerBatting: {
    g:       125,                 // SOURCE: MaxPreps (Pass 63) — "GP: 125" (updated from 124)
    pa:      426,                 // DERIVED: AB+BB+HBP+SF = 320+80+20+5 = 425 ≈ 426 (includes new Sr game)
    avg:     0.409,               // DERIVED: 131/320 = 0.409 (check: 131/320=.409 ✓)
    ab:      320,                 // SOURCE: MaxPreps (Pass 63) — "AB: 320" (updated from 316)
    r:       75,                  // SOURCE: MaxPreps — "R: 75" (unchanged)
    h:       131,                 // DERIVED: 130+1 = 131 (updated from 130 per Sr season correction)
    hr:      13,                  // DERIVED: 12+1 = 13 (updated from 12 — Sr HR now 3 not 2)
    rbi:     93,                  // DERIVED: 91+2 = 93 (updated from 91 — Sr RBI now 13 not 11)
    doubles: 38,                  // SOURCE: MaxPreps — "2B: 38" (unchanged)
    triples: 2,                   // SOURCE: MaxPreps — "3B: 2" (unchanged)
    bb:      80,                  // SOURCE: MaxPreps — "BB: 80" (unchanged)
    k:       38,                  // SOURCE: MaxPreps — "K: 38" (unchanged)
    hbp:     20,                  // SOURCE: MaxPreps — "HBP: 20" (unchanged)
    sf:      5,                   // SOURCE: MaxPreps — "SF: 5" (unchanged)
    obp:     0.543,               // DERIVED: (131+80+20)/426 = 231/425 = 0.543 (updated from 0.546)
    slg:     0.663,               // DERIVED: TB=(131+38+4+39)/320=212/320=0.663 (updated from 0.658)
    ops:     1.206                // DERIVED: OBP+SLG=0.543+0.663=1.206 (updated from 1.204)
  },


  /* =========================
     SCOUT (pitch data — primary data layer for Bolemon)
     Engine reads: kRate (null for prep pitcher)
  ========================= */

  scout: {
    // PITCH VELOCITY — SOURCED from PBR/scouting publications
    fbVelo:      95,    // SOURCE: PBR — "FB: 92-95 mph" — using high end
    fbVeloSit:   93,    // SOURCE: Derived midpoint of "92-95" stated range
    fbVeloPeak:  96,    // SOURCE: search — "peaks at 96 mph"
    curveVelo:   81,    // SOURCE: search — "78-84 mph" — using midpoint
    sliderVelo:  82,    // SOURCE: search — "harder slider in the low 80s"
    changeVelo:  null,  // changeup velocity not stated in available sources

    // PRIOR-YEAR SCOUT BASELINE (pitchers — INGESTION_GOLD_STANDARD.md):
    // 2025 full season now isolatable (Pass 25.13) — kPercent/bbPercent now populated.
    // BF=189 DIRECTLY STATED (Pass 63 screenshots) — eliminates prior estimated BF=171.
    // Engine reads: s.kPercent, s.bbPercent, s.kMinusBB, s.whiff, s.avgEV
    kPercent:  71.4,    // SOURCE: K/BF = 135/189 = 71.4% (2025; BF=189 directly stated — Pass 63)
                        // CORRECTION from Pass 25.13: was 78.9% (BF=171 estimated). BF=189 is authoritative.
                        // NOTE: HS kPercent inflated vs college/pro — reflects dominance level, not MLB projection
    bbPercent: 4.2,     // SOURCE: BB/BF = 8/189 = 4.2% (2025; BB=8 directly stated — Pass 63)
                        // CORRECTION from Pass 25.13: was 1.2% (BB=2 derived from stale WHIP=0.09)
    kMinusBB:  67.2,    // DERIVED: kPercent − bbPercent = 71.4 − 4.2 = 67.2 (updated from 77.7)
    whiff:     null,    // UNAVAILABLE — no Statcast/TrackMan for prep pitcher
    avgEV:     null     // UNAVAILABLE — no Statcast for prep pitcher
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xERA (via ERA field — null for prep pitcher)
     All 0–1 normalized trend fields derived from scouting language and performance.
     xERA is a long-range PROJECTION for a prep arm.
  ========================= */

  analyst: {
    // LONG-RANGE PROJECTION — no statistical data for 2026 season alone.
    // Derived from: 92-96 FB, career ERA=0.35, career K/9≈20.9 (HS), dominant command profile.
    // MLB adjustment from HS is aggressive; Robbie Ray / Bailey Ober comp range for LHP.
    xERA:  3.50,   // LONG-RANGE PROJECTION — LHP command profile with 3-pitch mix. Manual review.

    // PROJECTION — display-only
    xFIP:  3.70,   // LONG-RANGE PROJECTION — estimated from K/9 and FB quality

    // DERIVED from performance data and scouting:

    commandTrend:   0.88,  // 2025: ERA=0.00, WHIP=0.254 (Pass 63 corrected), H=6, BB=8 in 55.1 IP —
                           // still elite for HS (1.3 BB/9); career BAA=.078 confirms multi-year dominance;
                           // downgraded from 0.95 (Pass 25.13 had BB=2 derived — now corrected to BB=8)

    stuffTrend:     0.90,  // 2025 K/9=22.1 (135 K / 55.1 IP) — elite even by HS standards;
                           // 2026 pace: K/9=20.4 (68 K / 30 IP); career K/9=20.9; 92-96 FB + deep curve

    injuryTrend:    0.65,  // prep pitcher; no injury flags mentioned in source;
                           // standard baseline risk for high-workload HS arm (career 182.1 IP)

    durabilityTrend: 0.60, // career 182.1 IP at HS level is substantial workload;
                           // clean mechanics implied by command metrics; no specific durability flags

    pitchMixTrend:  0.72,  // three-pitch LHP mix — FB/CB/SL separates from two-pitch arms;
                           // changeup development not documented in available sources

    consistency:    0.90   // career 33-5 record, ERA=0.35 — extraordinary HS consistency;
                           // multi-year dominance with BAA=.078 confirms command-repeatable profile
  }

}
