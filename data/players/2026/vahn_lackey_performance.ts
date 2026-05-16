/* =============================================================
   VAHN LACKEY — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 9–10
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-10 | Pass 25
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")

   DATA CONFIDENCE (Pass 25):
     PRIMARY SOURCE (2026 current season): D1Baseball.com (May 10, 2026) — full current season
       line confirmed: G=48, PA=221, AB=174, H=64, AVG=.368, OBP=.489, SLG=.690, OPS=1.178,
       HR=13, RBI=55, BB=40, K=31, SB=10. All directly stated. No update needed from prior file.
     PRIMARY SOURCE (2025 sophomore season): D1Baseball.com (May 10, 2026) — full season line
       added Pass 25: G=60, PA=266, AB=222, H=77, AVG=.347, OBP=.421, SLG=.500, OPS=.921,
       HR=6, RBI=42, BB=25, K=38, SB=18. All directly stated.
     DIRECTLY SOURCED: Defensive metrics (pop time, framing rates) — PDF p.9
     ESTIMATED: xAVG, xSLG — projected from tool grades and college performance
   ============================================================= */

export const vahn_lackey_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // NCAA: strong certainty / established track record → maturityConfidence = 0.94
  competitionLevel: "NCAA",

  /* =========================
     SNAPSHOT (2026 season — updated to current totals)
     Engine reads: AVG only.
     All other fields are display context.
     NOTE: PDF p.9 captured 47 games. D1Baseball.com stats table (May 10, 2026)
     reflects 48 games with updated slash line and full counting stats.
  ========================= */

  snapshot: {
    year:  "2026",        // SOURCE: PDF p.9 "2026 SEASON — Georgia Tech"
    team:  "Georgia Tech",

    g:     48,            // SOURCE: D1Baseball.com stats table (May 10, 2026) — "48 GP"
                          // NOTE: PDF p.9 captured 47 games; updated to current

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.368,         // lowercase — IntelStack display: snap?.avg
    AVG:   0.368,         // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                          // SOURCE: D1Baseball.com — ".368 BA" (PDF p.9 stated .371 at 47 games)

    obp:   0.489,         // SOURCE: D1Baseball.com — "OBP: .489"
    slg:   0.690,         // SOURCE: D1Baseball.com — "SLG: .690"
    ops:   1.178,         // SOURCE: D1Baseball.com — "OPS: 1.178"

    hr:    13,            // SOURCE: D1Baseball.com — "HR: 13" (PDF p.9 had 12 at 47 games)
    rbi:   55,            // SOURCE: D1Baseball.com — "RBI: 55"
    sb:    10,            // SOURCE: D1Baseball.com — "SB: 10" (PDF p.9 had 9)

    bbPct: null,          // not stated as percentage in source
    kPct:  null,          // not stated as percentage in source

    // MVP SNAPSHOT FIELDS — populated from D1Baseball.com stats table (May 10, 2026)
    ab:    174,           // SOURCE: D1Baseball.com — "AB: 174"
    h:     64,            // SOURCE: D1Baseball.com — "H: 64"
    bb:    40,            // SOURCE: D1Baseball.com — "BB: 40"
    k:     31             // SOURCE: D1Baseball.com — "K: 31"
  },


  /* =========================
     SEASON 2025 (sophomore season — full, complete)
     SOURCE: D1Baseball.com (May 10, 2026) — full prior season line.
     All fields directly stated. Added Pass 25.
  ========================= */
  season2025: {
    year:  "2025",
    team:  "Georgia Tech",

    g:     60,            // SOURCE: D1Baseball.com (May 10, 2026) — "G: 60"
    pa:    266,           // SOURCE: D1Baseball.com — "PA: 266"

    avg:   0.347,         // SOURCE: D1Baseball.com — "AVG: .347"
    obp:   0.421,         // SOURCE: D1Baseball.com — "OBP: .421"
    slg:   0.500,         // SOURCE: D1Baseball.com — "SLG: .500"
    ops:   0.921,         // SOURCE: D1Baseball.com — "OPS: .921"

    ab:    222,           // SOURCE: D1Baseball.com — "AB: 222"
    h:     77,            // SOURCE: D1Baseball.com — "H: 77" (check: 77/222 = .347 ✓)
    hr:    6,             // SOURCE: D1Baseball.com — "HR: 6"
    rbi:   42,            // SOURCE: D1Baseball.com — "RBI: 42"
    bb:    25,            // SOURCE: D1Baseball.com — "BB: 25"
    k:     38,            // SOURCE: D1Baseball.com — "K: 38"
    sb:    18,            // SOURCE: D1Baseball.com — "SB: 18"

    r:     45,            // SOURCE: D1Baseball.com — "R: 45"
    doubles: 14,          // SOURCE: D1Baseball.com — "2B: 14"
    triples: 1,           // SOURCE: D1Baseball.com — "3B: 1"
    cs:    3,             // SOURCE: D1Baseball.com — "CS: 3"
    hbp:   8              // SOURCE: D1Baseball.com — "HBP: 8"
  },


  /* =========================
     SCOUT (Statcast-equivalent / defensive metrics)
     Engine reads: kRate
     Defensive metrics directly sourced from 2025 combined data.
     Pop time and framing are primary scout-layer distinguishers for catcher.
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    kRate:   null,   // not stated in source PDF
    bbRate:  null,   // not stated in source PDF

    // SOURCED from PDF p.9: "max exit velocity of 112.7 mph"
    avgEV:   null,   // average EV not stated; max stated
    maxEV:   112.7,  // SOURCE: PDF p.9 — "Max EV: 112.7 mph" — "genuine plus raw power" (PDF p.9)
    barrel:  null,   // UNAVAILABLE
    hardHit: null,   // UNAVAILABLE

    // CATCHER-SPECIFIC DEFENSIVE METRICS
    // DIRECTLY SOURCED from PDF p.9 — "DEFENSIVE METRICS (2025 Combined — NCAA / CCBL / Team USA)"
    popTime:        1.83,   // SOURCE: PDF p.9 — "Avg Pop Time: 1.83 sec" — "elite tier — mid-1.7s recorded"
    framingPct:     12.1,   // SOURCE: PDF p.9 — "Strike Framing %: 12.1% of all true balls"
    closeZoneFrame: 56.7    // SOURCE: PDF p.9 — "Close Zone Framing: 56.7% — pitches <1 ball outside zone"
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from PDF language.
     xAVG is a PROJECTION (no official MLB Statcast for college player).
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for college player.
    // Derived from: 55 hit tool, .371 BA sophomore season, college-level adjustment.
    // Joey Bart / Adley Rutschman comp profiles project ~.250–.280 at MLB.
    xAVG:  0.265,   // PROJECTION — MLB-level contact adjustment. Manual review post-debut.

    // PROJECTION — derived from 60 power tool, .682 SLG, MLB adjustment.
    // Display-only (engine reads xAVG only).
    xSLG:  0.480,   // PROJECTION — not used by scoring engine. Display only.

    // DERIVED from PDF language:

    plateDiscTrend: 0.68,  // BB=40 in 48 games (~18% BB rate) — disciplined approach confirmed by counting stats

    contactTrend:   0.75,  // .371 sophomore season; offensive emergence answered evaluator questions

    injuryTrend:    0.80,  // no injury flags in PDF; catching is physically demanding but clean health implied

    sprintTrend:    0.72,  // 9 SB in 47 games — "almost unheard of for a catcher" (PDF p.9)
                           // movement profile "more reminiscent of an outfielder" confirms outlier athleticism

    posValue:       0.95,  // Elite catcher — highest defensive positional value in baseball
                           // "best defensive catcher in this class" (PDF p.9)

    consistency:    0.80   // sophomore offensive explosion builds on established defensive reputation
  }

}
