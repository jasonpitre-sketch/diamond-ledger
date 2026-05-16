/* =============================================================
   DEREK CURIEL — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: lsusports.net official stats (May 10, 2026) — primary statistical source
           D1Baseball.com (May 10, 2026) — supplemental (superseded by lsusports.net)
   Generated: 2026-05-10 | Pass 25.5 | Updated: 2026-05-10 | Pass 25.12
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")

   DATA CONFIDENCE (Pass 25.12):
     PRIMARY SOURCE (2026 sophomore season): lsusports.net (May 10, 2026) — current season:
       G=52, AB=208, H=72, HR=6, RBI=44, BB=30, K=37, AVG=.346, OPS=.942. All directly stated.
       Cross-check: H/AB = 72/208 = .3461 ≈ .346 ✓
       SOURCE CONFLICT RESOLVED: D1Baseball had H=71 (AVG=.341, OPS=.933). lsusports.net official
       university source has H=72 (AVG=.346, OPS=.942). lsusports.net wins per source hierarchy #1.
       OBP/SLG not stated in user-provided table — nulled (old D1Baseball values inconsistent
       with new OPS=.942; available on lsusports.net but not captured this pass).
     PRIMARY SOURCE (2025 freshman season): lsusports.net (May 10, 2026) — confirmed full season:
       G=68, AB=258, H=89, HR=7, RBI=55, BB=53, K=56, AVG=.345, OPS=.990. All confirmed.
       D1Baseball.com supplemental fields retained: PA=323, OBP=.470, SLG=.519, R=67, HBP=9,
       2B=20, 3B=2, SB=3, CS=3. Cross-check: H/AB = 89/258 = .3450 ≈ .345 ✓
     CAREER TOTAL (2 seasons): lsusports.net (May 10, 2026) — 120 GP:
       AB=466, H=161, HR=13, RBI=99, BB=83, K=93, AVG=.345, OPS=.969. Cross-check: 161/466=.345 ✓
     CONTEXT: 2025 First Team All-American. 2025 D1Baseball National Freshman of the Year.
       LSU won 2025 CWS National Championship. Curiel started all 68 games in 2025 (62 LF, 3 CF, 3 DH).
       NOTE: snapshot.year="2025" per INGESTION_GOLD_STANDARD rule — complete season wins.
     ESTIMATED: xAVG, xSLG — projected from tool grades and college performance
   ============================================================= */

export const derek_curiel_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // NCAA: strong certainty / established track record → maturityConfidence = 0.94
  competitionLevel: "NCAA",

  /* =========================
     SNAPSHOT (2025 freshman season — complete, full)
     Engine reads: AVG only.
     SOURCE: lsusports.net / D1Baseball.com (May 10, 2026).
     INGESTION_GOLD_STANDARD: snapshot = most complete season.
     2025 (68 GP, finished) is more complete than 2026 in-progress (52 GP).
     NOTE: snapshot.year="2025" → IntelStack reads this block for the 2025 row.
     2026 current data lives in season2026 block below.
  ========================= */

  snapshot: {
    year:  "2025",        // SOURCE: lsusports.net — full 68-game freshman season
    team:  "LSU",

    g:     68,            // SOURCE: lsusports.net — "G: 68" (started all 68: 62 LF, 3 CF, 3 DH)

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.345,         // lowercase — IntelStack display: snap?.avg
    AVG:   0.345,         // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                          // SOURCE: lsusports.net — "AVG: .345" (check: 89/258 = .345 ✓)

    obp:   0.470,         // SOURCE: D1Baseball.com — "OBP: .470" — confirmed
    slg:   0.519,         // SOURCE: D1Baseball.com — "SLG: .519" — confirmed
    ops:   0.990,         // SOURCE: lsusports.net — "OPS: .990"

    hr:    7,             // SOURCE: lsusports.net — "HR: 7"
    rbi:   55,            // SOURCE: lsusports.net — "RBI: 55"
    sb:    3,             // SOURCE: D1Baseball.com — "SB: 3"

    // MVP SNAPSHOT FIELDS — all directly stated
    ab:    258,           // SOURCE: lsusports.net — "AB: 258" — directly stated
    h:     89,            // SOURCE: lsusports.net — "H: 89" — directly stated (check: 89/258=.345 ✓)
    bb:    53,            // SOURCE: lsusports.net — "BB: 53" — directly stated
    k:     56             // SOURCE: lsusports.net — "K: 56" — directly stated
  },


  /* =========================
     SEASON 2026 (sophomore season — in-progress, through May 10, 2026)
     SOURCE: lsusports.net official stats (May 10, 2026).
     Feeds: tracker block in playersDraft2026.ts → 2026 row in IntelStack panel.
     NOTE: snapshot above (2025 freshman) is the engine-read primary field.
     NOTE: OBP/SLG not captured — available on lsusports.net, inconsistent with new OPS anyway.
     SOURCE CONFLICT: D1Baseball had H=71/AVG=.341. lsusports.net (official) has H=72/AVG=.346.
  ========================= */
  season2026: {
    year:  "2026",
    team:  "LSU",

    g:     52,            // SOURCE: lsusports.net (May 10, 2026) — "G: 52"

    avg:   0.346,         // lowercase — display alias
    AVG:   0.346,         // uppercase — engine alias (engine reads snapshot, not season2026)
                          // SOURCE: lsusports.net (May 10, 2026) — "AVG: .346" (check: 72/208=.346 ✓)

    obp:   null,          // UNAVAILABLE — not captured; D1Baseball .419 inconsistent with new OPS=.942
    slg:   null,          // UNAVAILABLE — same reason
    ops:   0.942,         // SOURCE: lsusports.net (May 10, 2026) — "OPS: .942"

    ab:    208,           // SOURCE: lsusports.net (May 10, 2026) — "AB: 208" — directly stated
    h:     72,            // SOURCE: lsusports.net (May 10, 2026) — "H: 72" — directly stated
    hr:    6,             // SOURCE: lsusports.net (May 10, 2026) — "HR: 6" — directly stated
    rbi:   44,            // SOURCE: lsusports.net (May 10, 2026) — "RBI: 44" — directly stated
    bb:    30,            // SOURCE: lsusports.net (May 10, 2026) — "BB: 30" — directly stated
    k:     37,            // SOURCE: lsusports.net (May 10, 2026) — "K: 37" — directly stated
    sb:    12             // SOURCE: D1Baseball.com — "SB: 12" (not in lsusports.net table)
  },


  /* =========================
     SEASON 2025 (freshman season — full, complete — SUPPLEMENTAL)
     NOTE: Core 2025 stats are now in snapshot block above (snapshot.year="2025").
     This block retains supplemental display fields not in snapshot:
       pa, r, cs, hbp, doubles, triples — all directly stated from D1Baseball.
     SOURCE: D1Baseball.com (May 10, 2026) — supplemental fields confirmed.
     CONTEXT: First Team All-American. D1Baseball National Freshman of the Year.
     LSU won 2025 CWS National Championship.
  ========================= */
  season2025: {
    year:  "2025",
    team:  "LSU",

    g:     68,            // SOURCE: D1Baseball.com / lsusports.net — "G: 68" (started all 68: 62 LF, 3 CF, 3 DH)
    pa:    323,           // SOURCE: D1Baseball.com — "PA: 323"

    avg:   0.345,         // SOURCE: D1Baseball.com — "AVG: .345" (check: 89/258 = .345 ✓)
    obp:   0.470,         // SOURCE: D1Baseball.com — "OBP: .470"
    slg:   0.519,         // SOURCE: D1Baseball.com — "SLG: .519"
    ops:   0.990,         // SOURCE: D1Baseball.com — "OPS: .990"

    ab:    258,           // SOURCE: D1Baseball.com — "AB: 258"
    h:     89,            // SOURCE: D1Baseball.com — "H: 89"
    hr:    7,             // SOURCE: D1Baseball.com — "HR: 7"
    rbi:   55,            // SOURCE: D1Baseball.com — "RBI: 55"
    bb:    53,            // SOURCE: D1Baseball.com — "BB: 53"
    k:     56,            // SOURCE: D1Baseball.com — "K: 56"
    sb:    3,             // SOURCE: D1Baseball.com — "SB: 3"
    cs:    3,             // SOURCE: D1Baseball.com — "CS: 3"
    r:     67,            // SOURCE: D1Baseball.com — "R: 67"
    hbp:   9,             // SOURCE: D1Baseball.com — "HBP: 9"
    doubles: 20,          // SOURCE: D1Baseball.com — "2B: 20"
    triples: 2            // SOURCE: D1Baseball.com — "3B: 2"
  },


  /* =========================
     SCOUT (Statcast-equivalent / measurables)
     Engine reads: kRate
     No public Statcast available for college player.
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    // PRIOR-YEAR BASELINE (hitters — INGESTION_GOLD_STANDARD.md):
    // 2025 full season PA=323 dictates 2026 scout starting values.
    // Engine reads: s.kRate, s.bbRate
    kRate:   17.3,   // DERIVED: K/PA = 56/323 = 17.3% (2025 full season)
    bbRate:  16.4,   // DERIVED: BB/PA = 53/323 = 16.4% (2025) — elite walk rate, D1Baseball POTY context

    avgEV:   null,   // UNAVAILABLE — no Statcast for college player
    barrel:  null,   // UNAVAILABLE
    hardHit: null    // UNAVAILABLE
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from performance profile.
     xAVG is a PROJECTION (no official MLB Statcast for college player).
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for college player.
    // Derived from: 50-55 hit tool, .341–.345 two-year college average, MLB-level adjustment.
    // DJ LeMahieu / Brendan Rodgers comp range (~.275–.295 MLB contact profile).
    xAVG:  0.278,   // PROJECTION — strong two-season consistency. Manual review post-debut.

    // PROJECTION — derived from power tool, .514–.519 college SLG, MLB adjustment.
    // Display-only (engine reads xAVG only).
    xSLG:  0.430,   // PROJECTION — not used by scoring engine. Display only.

    // DERIVED from performance data:

    plateDiscTrend: 0.72,  // BB=53 in 68 games (2025 freshman) — above-average approach confirmed;
                           // BB=30 in 52 games (2026) maintains discipline profile

    contactTrend:   0.76,  // .345 → .346 across two seasons — elite contact consistency;
                           // sophomore holds at nearly identical rate, slightly higher; confirms tool

    injuryTrend:    0.88,  // No injury flags; full 68-game workload as freshman; clean health profile

    sprintTrend:    0.65,  // SB=12 in 52 games (sophomore) vs SB=3 freshman — developing steal profile;
                           // position moved LF→CF sophomore implies athletic profile improvement

    posValue:       0.72,  // CF/LF outfielder — above-average positional value; CF slot strengthens case

    consistency:    0.82   // One of most consistent two-year college hitters in 2026 class;
                           // freshman National POTY → sophomore holdout confirms tool translation
  }

}
