/* =============================================================
   JACOB LOMBARD — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 17–18
           MaxPreps (April 6, 2026) — partial season batting stats
           Chrome extension / MaxPreps (May 10, 2026) — full 2026 season + 2025 season
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-10 | Pass 25.16
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")

   DATA CONFIDENCE (Pass 25.16 — display fix + MaxPreps career fetch):
     PRIMARY SOURCE (2026 senior season — full): Chrome extension / MaxPreps (May 10, 2026):
       AB=88, H=42, HR=10, RBI=25, BB=24, K=15, AVG=.477, OPS=1.471. All directly stated.
       G not stated in full-season summary. OBP/SLG not stated individually (OPS only).
       Cross-check: H/AB = 42/88 = .4773 ≈ .477 ✓
       NOTE: MaxPreps static HTML (May 10, 2026) still shows Apr 6 partial only (GP=20, AB=61).
       Full season data sourced from prior Chrome extension fetch — retained as verified.
     SNAPSHOT (2025 junior season — Pass 25.16 display fix): Chrome extension / MaxPreps (May 10, 2026):
       PRIMARY ROW: AB=36, H=11, HR=4, RBI=11, BB=14, K=6, AVG=.306, OPS=1.260.
         Cross-check: H/AB = 11/36 = .3056 ≈ .306 ✓
         OBP=.510, SLG=.750 (MaxPreps May 10 static fetch — directly stated).
       SECOND 24-25 ROW (NEW Pass 25.16): GP=22, AB=62, H=16, HR=0, RBI=10, BB=3, K=9,
         HBP=5, AVG=.258, OBP=.333, SLG=.306, OPS=.639 — likely separate school/team entry.
         Both labeled "Var 24-25" on MaxPreps. Primary row (.306 AVG) retained as snapshot.
     MAXPREPS CAREER TOTAL (Pass 25.16 — static fetch): GP=194 across all seasons back to 8th grade:
       H=139, RBI=85, R=137, BB=88, K=89, HBP=31, AVG=.310, OBP=.450, SLG=.477, OPS=.927.
       NOTE: Includes multi-school entries back to 8th grade — not used for careerAverages.
     EARLY CAPTURE (superseded — retained for reference): MaxPreps (April 6, 2026, coach-entered):
       G=20, AVG=.459, PA=79, AB=61, R=34, H=28, RBI=16, 2B=3, 3B=0, HR=7, BB=13, K=6, HBP=5,
       OBP=.582, SLG=.852, OPS=1.434.
     DISPLAY FIX (Pass 25.16): snapshot.year changed "2026"→"2025" to fix IntelStack 2025 row
       showing identical data as 2026 row. Same fix as LeBron/Curiel/Bolemon. 2026 full season
       data moved to season2026 block. Tracker (in root file) unchanged — still feeds 2026 row.
     RECONCILIATION NOTE: MaxPreps HS game stats (.477 AVG full season) DO NOT contradict PDF's
       39% SwStr%. PDF swing/miss was measured at elite showcase events (PG National — top-tier).
       HS regular-season AVG and showcase SwStr% measure different competition contexts — both valid.
     DIRECTLY SOURCED: measurables (60-yd, EV, bat speed, infield velo, SwStr%) from PDF p.17
     CONTEXT: Lombard committed to University of Miami (Oct 2025). Ranked #1 overall 2026 by
       multiple outlets. Profile confirmed active at Gulliver Prep, Class of 2026.
     NOTE: SwStr% concern remains real despite HS batting average — elite showcase competition
       is the relevant context for MLB draft evaluation.
   ============================================================= */

export const jacob_lombard_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // HS: lower certainty / higher volatility / compressed DLR floor → maturityConfidence = 0.82
  competitionLevel: "HS",

  /* =========================
     SNAPSHOT (2025 junior prep season — Pass 25.16 display fix)
     Engine reads: AVG only.
     SOURCE: Chrome extension / MaxPreps (May 10, 2026).
     DISPLAY FIX: snapshot.year changed "2026"→"2025" so IntelStack 2025 row shows
       prior-year data instead of duplicating 2026 row. Same fix as LeBron/Curiel/Bolemon.
     NOTE: This is the 14 GP/.306 row (Var 24-25). See DATA CONFIDENCE for second 24-25 row.
     NOTE: OBP=.510, SLG=.750 now available from MaxPreps static fetch (May 10, 2026).
  ========================= */

  snapshot: {
    year:  "2025",          // 2024-25 junior season at Gulliver Prep (display fix — was "2026")
    team:  "Gulliver Prep",

    g:     14,              // SOURCE: MaxPreps (May 10, 2026) static fetch — "GP: 14"

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.306,           // lowercase — IntelStack display: snap?.avg
    AVG:   0.306,           // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                            // SOURCE: MaxPreps — "AVG: .306" (check: 11/36=.306 ✓)

    obp:   0.510,           // SOURCE: MaxPreps (May 10, 2026) static fetch — "OBP: .510"
    slg:   0.750,           // SOURCE: MaxPreps (May 10, 2026) static fetch — "SLG: .750"
    ops:   1.260,           // SOURCE: MaxPreps — "OPS: 1.260"

    hr:    4,               // SOURCE: MaxPreps — "HR: 4"
    rbi:   11,              // SOURCE: MaxPreps — "RBI: 11"
    r:     15,              // SOURCE: MaxPreps (May 10, 2026) static fetch — "R: 15"
    sb:    null,            // not stated

    doubles: 4,             // SOURCE: MaxPreps (May 10, 2026) static fetch — "2B: 4"
    triples: 0,             // SOURCE: MaxPreps (May 10, 2026) static fetch — "3B: 0"

    // MVP SNAPSHOT FIELDS
    ab:    36,              // SOURCE: MaxPreps — "AB: 36" — directly stated
    h:     11,              // SOURCE: MaxPreps — "H: 11" — directly stated
    bb:    14,              // SOURCE: MaxPreps — "BB: 14" — directly stated
    k:     6,               // SOURCE: MaxPreps — "K: 6" — directly stated

    // SUPPLEMENTAL
    pa:    51,              // SOURCE: MaxPreps (May 10, 2026) static fetch — "PA: 51"
    hbp:   1                // SOURCE: MaxPreps (May 10, 2026) static fetch — "HBP: 1"
  },


  /* =========================
     SEASON 2026 (senior season — full, 2025-26)
     SOURCE: Chrome extension / MaxPreps (May 10, 2026) — full season line.
     NOTE: MaxPreps static HTML still shows Apr 6 partial only (GP=20, AB=61, AVG=.459).
           Full season data from prior Chrome extension fetch (AB=88, .477).
     NOTE: OBP/SLG not captured in full-season summary (Apr 6 partial: OBP=.582, SLG=.852).
     Feeds: tracker block in jacob_lombard.ts → 2026 row in IntelStack panel.
  ========================= */
  season2026: {
    year:  "2026",
    team:  "Gulliver Prep",

    g:     null,            // UNAVAILABLE — not stated in full-season summary

    avg:   0.477,           // SOURCE: MaxPreps Chrome ext (May 10, 2026) — "AVG: .477" (42/88=.477 ✓)
    AVG:   0.477,
    obp:   null,            // UNAVAILABLE — full season OBP not captured (Apr 6 partial was .582)
    slg:   null,            // UNAVAILABLE — full season SLG not captured (Apr 6 partial was .852)
    ops:   1.471,           // SOURCE: MaxPreps Chrome ext (May 10, 2026) — "OPS: 1.471"

    ab:    88,              // SOURCE: MaxPreps Chrome ext (May 10, 2026) — "AB: 88"
    h:     42,              // SOURCE: MaxPreps Chrome ext (May 10, 2026) — "H: 42"
    hr:    10,              // SOURCE: MaxPreps Chrome ext (May 10, 2026) — "HR: 10"
    rbi:   25,              // SOURCE: MaxPreps Chrome ext (May 10, 2026) — "RBI: 25"
    bb:    24,              // SOURCE: MaxPreps Chrome ext (May 10, 2026) — "BB: 24"
    k:     15               // SOURCE: MaxPreps Chrome ext (May 10, 2026) — "K: 15"
  },


  /* =========================
     SEASON 2025 (junior season — SUPPLEMENTAL)
     NOTE: Core 2025 stats now in snapshot block above (snapshot.year="2025").
     This block retains fields not in snapshot: pa, r, hbp, doubles, triples — all from MaxPreps.
     SOURCE: MaxPreps (May 10, 2026) static fetch — confirms all fields.
     Cross-check: H/AB = 11/36 = .306 ✓
  ========================= */
  season2025: {
    year:  "2025",
    team:  "Gulliver Prep",

    g:     14,              // SOURCE: MaxPreps (May 10, 2026) static — "GP: 14"
    pa:    51,              // SOURCE: MaxPreps (May 10, 2026) static — "PA: 51"

    avg:   0.306,           // SOURCE: MaxPreps — "AVG: .306" (check: 11/36=.306 ✓)
    obp:   0.510,           // SOURCE: MaxPreps (May 10, 2026) static — "OBP: .510"
    slg:   0.750,           // SOURCE: MaxPreps (May 10, 2026) static — "SLG: .750"
    ops:   1.260,           // SOURCE: MaxPreps — "OPS: 1.260"

    ab:    36,              // SOURCE: MaxPreps — "AB: 36"
    h:     11,              // SOURCE: MaxPreps — "H: 11"
    hr:    4,               // SOURCE: MaxPreps — "HR: 4"
    rbi:   11,              // SOURCE: MaxPreps — "RBI: 11"
    bb:    14,              // SOURCE: MaxPreps — "BB: 14"
    k:     6,               // SOURCE: MaxPreps — "K: 6"
    r:     15,              // SOURCE: MaxPreps (May 10, 2026) static — "R: 15"
    doubles: 4,             // SOURCE: MaxPreps (May 10, 2026) static — "2B: 4"
    triples: 0,             // SOURCE: MaxPreps (May 10, 2026) static — "3B: 0"
    hbp:   1                // SOURCE: MaxPreps (May 10, 2026) static — "HBP: 1"
  },


  /* =========================
     SCOUT (measurables — primary data layer for Lombard)
     All values DIRECTLY SOURCED from PDF p.17-18 measurables table.
     Engine reads: kRate
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    // DIRECTLY SOURCED from PDF p.17 — "MEASURABLES & METRICS"
    dash60:       6.11,   // SOURCE: PDF p.17 — "60-Yard Dash: 6.11 sec — Elite (2nd fastest at PG National 2025)"
    exitVelo:     106.8,  // SOURCE: PDF p.17 — "Exit Velocity: 106.8 mph — Plus raw power"
    batSpeed:     81.9,   // SOURCE: PDF p.17 — "Bat Speed: 81.9 mph — Plus bat speed"
    infieldVelo:  77,     // SOURCE: PDF p.17 — "Infield Velocity: 77 mph — Above average arm"

    // DIRECTLY SOURCED from PDF p.17
    swStr:        39.0,   // SOURCE: PDF p.17 — "Summer SwStr%: ~39% — Risk factor tracked across two summers"
                          // IMPORTANT: Measured at elite showcase events (PG National), NOT HS regular season.
                          // This is the defining concern in Lombard's draft evaluation.

    // PRIOR-YEAR BASELINE (hitters — INGESTION_GOLD_STANDARD.md):
    // 2025 full season dictates 2026 scout starting values.
    // PA not directly stated; estimated as AB+BB=50 (minimum, excludes HBP/SF if any).
    // Engine reads: s.kRate, s.bbRate
    kRate:        12.0,   // ESTIMATED: K/PA = 6/50 = 12.0% (2025 season; PA=AB+BB=36+14=50 minimum)
                          // WAS: 39.0 — showcase SwStr% proxy (INVALID for INGESTION_GOLD_STANDARD kRate rule)
                          // NOTE: 12% K rate from HS season is markedly better than showcase context suggests.
    bbRate:       28.0,   // ESTIMATED: BB/PA = 14/50 = 28.0% (2025 season; PA=50 minimum — elite walk rate)
    avgEV:        null,   // average EV not stated; max stated (106.8 is a swing max, not average)
    barrel:       null,   // UNAVAILABLE
    hardHit:      null    // UNAVAILABLE
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from PDF language + MaxPreps data.
     xAVG is a PROJECTION — confidence is lowest in class given HS competition level.
     NOTE: HS AVG=.459 does not override showcase SwStr% concern for MLB projection.
  ========================= */

  analyst: {
    // PROJECTION — MLB-level projection based on tool grades.
    // Derived from: 45 hit tool, 39% showcase swing/miss, 60 power, 65 speed.
    // HS AVG=.459 confirms bat-to-ball in prep context; showcase SwStr%=39% remains
    // the primary translation risk at MLB level where premium velocity is constant.
    // Wander Franco pre-draft projection (contact concern, elite tools) provides comp.
    xAVG:  0.252,   // PROJECTION — low confidence; contact risk against premium velocity at MLB level.
                    // Nudged slightly from 0.245 on basis of MaxPreps HS batting data (partial signal).
                    // Manual review post-debut. Upside: .290+ if pro coaching improves contact.

    // PROJECTION — derived from 60 power tool, 106.8 mph EV, MLB adjustment.
    // Power grades well — slugging ceiling is real if bat-to-ball improves.
    xSLG:  0.460,   // PROJECTION — not used by scoring engine. Display only.

    // DERIVED from PDF language + MaxPreps data:

    plateDiscTrend: 0.47,  // "aggressive approach"; showcase 39% swing/miss implies below-average discipline;
                           // BUT MaxPreps shows BB=13 in 20 HS games — some walk ability present;
                           // HS walk rate does not translate directly; concern maintained

    contactTrend:   0.40,  // "39% swing/miss ACROSS TWO SUMMERS" at showcase level — not improving;
                           // HS AVG=.459 shows bat-to-ball vs HS competition; showcase concern unchanged;
                           // "elevated velocity — particularly high fastballs — has given him trouble" (PDF p.17)

    injuryTrend:    0.85,  // multi-sport athlete, soccer championships, no injury flags; elite durability

    sprintTrend:    0.92,  // 65-grade runner; "6.11s — 2nd fastest at PG National among 226 runners"
                           // "legitimate plus-plus runner who creates impact on bases and in field"

    posValue:       0.82,  // SS — "built to stick at shortstop long-term"; elite defensive tools confirmed
                           // "elite shortstop defense" is the tool floor

    consistency:    0.45   // Power/speed tools consistent positively; contact inconsistency remains
                           // the defining risk; HS season partially positive signal but insufficient sample
  }

}
