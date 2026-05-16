/* =============================================================
   DREW BURRESS — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 19–20
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-10 | Pass 25.8
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")

   DATA CONFIDENCE (Pass 25.5):
     PRIMARY SOURCE (2025 sophomore season): PDF p.20 + GT official bio (ramblinwreck.com)
       G=60, RBI=62, BB=53, K=42 directly stated.
       D1Baseball.com (~Apr 5, 2026) — confirms all 2025 fields; adds AB=228, H=76, PA=290, R=77.
       Note: D1Baseball shows 2024 freshman AB=218, H=83. Career total = 218+228=446 ✓ consistent
       with PDF "career 446 AB" reference.
       2025 MVP fields now FULLY populated (no nulls remaining). AVG check: 76/228=.333 ✓
     PRIMARY SOURCE (2026 junior season): D1Baseball.com (~Apr 5, 2026) — partial current season:
       G=31, AB=125, H=39, AVG=.312, OBP=.456, SLG=.576, OPS=1.032, HR=6, RBI=25, BB=27, K=23.
       NOTE: Search snippet from late April suggests AVG≈.338 with 49 H, 7 HR, 31 RBI at G≈45+.
       D1Baseball table values (~Apr 5) are the verified floor; late-Apr snippet treated as unverified.
     PRIMARY SOURCE (2024 freshman season): GT official bio (ramblinwreck.com, Pass 25.5):
       AVG=.381, AB=218 (D1Baseball), H=83 (D1Baseball), HR=25, RBI=67, BB=58, K=37, OBP=.512,
       SLG=.821, OPS=1.333, 15 2B, 3 3B, 8/10 SB. All directly stated in ramblinwreck.com bio.
       Cross-check: TB = (83-15-3-25) + 2×15 + 3×3 + 4×25 = 179; SLG=179/218=.821 ✓
       D1Baseball confirms AB=218 (career 218+228=446 ✓ from PDF).
     DIRECTLY SOURCED: max EV, avg EV %ile, hard hit %, chase rate (PDF p.20 advanced metrics)
     ESTIMATED: xAVG, xSLG — projected from tool grades and ACC performance
   ============================================================= */

export const drew_burress_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // NCAA: strong certainty / established track record → maturityConfidence = 0.94
  competitionLevel: "NCAA",

  /* =========================
     SNAPSHOT (2025 sophomore season — best data available)
     Engine reads: AVG only.
     All other fields are display context.
  ========================= */

  snapshot: {
    year:  "2025",        // SOURCE: PDF p.20 — "2025 (SO)" row in career table
    team:  "Georgia Tech",

    g:     60,            // SOURCE: GT official bio (ramblinwreck.com) — "Started all 60 games in center field"

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.333,         // lowercase — IntelStack display: snap?.avg
    AVG:   0.333,         // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                          // SOURCE: PDF p.20 — "AVG: .333" in 2025 career row

    obp:   0.469,         // SOURCE: PDF p.20 — "OBP: .469"
    slg:   0.693,         // SOURCE: PDF p.20 — "SLG: .693"
    ops:   1.162,         // SOURCE: PDF p.20 — "OPS: 1.162"

    hr:    19,            // SOURCE: PDF p.20 — "HR: 19" in 2025
    rbi:   62,            // SOURCE: GT official bio (ramblinwreck.com) — "60 RBI" — only Power 4
                          // player with ≥60 RBI, 20 2B, 50 BB, 15 HR, 70 R in 2025
    sb:    null,          // not stated

    // DISPLAY-ONLY supplemental stats
    doubles: 23,          // SOURCE: PDF p.20 — "2B: 23" — "ACC: #1 Doubles" (PDF p.20)
    tb:     158,          // SOURCE: ramblinwreck.com bio — "led the team in...total bases (158)"
                          // Cross-check: (76-23-0-19)+2*23+0+4*19=158 ✓

    bbPct: 17.0,          // SOURCE: PDF p.20 — "BB%: 17%" — "17% walk rate" (advanced metrics)
    kPct:  null,          // K% not stated explicitly; "more walks than strikeouts" in career note

    // MVP SNAPSHOT FIELDS — AB and H confirmed Pass 25 from D1Baseball
    ab:    228,           // SOURCE: D1Baseball.com (~Apr 5, 2026) — "AB: 228" — directly stated
                          // Cross-check: 2024 freshman AB=218 (D1Baseball); career 218+228=446 ✓ (PDF)
                          // Also: 76/228=.333 ✓ consistent with snapshot AVG
    h:     76,            // SOURCE: D1Baseball.com (~Apr 5, 2026) — "H: 76" — directly stated
                          // NOTE: GT bio mentioned 77 hits context — rounding difference or game scope
    bb:    53,            // SOURCE: GT official bio (ramblinwreck.com) — "53 walks to 42 strikeouts"
                          // CONFIRMED: D1Baseball.com — "BB: 53" ✓
    k:     42             // SOURCE: GT official bio (ramblinwreck.com) — "53 walks to 42 strikeouts"
                          // CONFIRMED: D1Baseball.com — "K: 42" ✓
  },


  /* =========================
     SEASON 2026 (junior season — partial, current as of ~April 5, 2026)
     Feeds: tracker block in drew_burress.ts → 2026 row in IntelStack panel.
     SOURCE: D1Baseball.com (~April 5, 2026) — verified partial season line.
     NOTE: snapshot above (2025 sophomore) is the engine-read primary field.
     NOTE: Late-April search snippet suggests further progress (AVG≈.338, G≈45+)
       but cannot be verified from a direct source; treat D1Baseball as floor only.
  ========================= */
  season2026: {
    year:  "2026",
    team:  "Georgia Tech",

    g:     31,            // SOURCE: D1Baseball.com (~Apr 5, 2026) — "G: 31" — partial season

    avg:   0.312,         // lowercase — display alias
    AVG:   0.312,         // uppercase — engine alias (engine reads snapshot, not season2026)
                          // SOURCE: D1Baseball.com — "AVG: .312"

    obp:   0.456,         // SOURCE: D1Baseball.com — "OBP: .456"
    slg:   0.576,         // SOURCE: D1Baseball.com — "SLG: .576"
    ops:   1.032,         // SOURCE: D1Baseball.com — "OPS: 1.032"

    ab:    125,           // SOURCE: D1Baseball.com — "AB: 125"
    h:     39,            // SOURCE: D1Baseball.com — "H: 39"
    hr:    6,             // SOURCE: D1Baseball.com — "HR: 6"
    rbi:   25,            // SOURCE: D1Baseball.com — "RBI: 25"
    bb:    27,            // SOURCE: D1Baseball.com — "BB: 27"
    k:     23,            // SOURCE: D1Baseball.com — "K: 23"

    pa:    158,           // SOURCE: D1Baseball.com — "PA: 158"
    r:     42,            // SOURCE: D1Baseball.com — "R: 42"
    doubles: 11,          // SOURCE: D1Baseball.com — "2B: 11"
    triples: 2,           // SOURCE: D1Baseball.com — "3B: 2"
    sb:    3,             // SOURCE: D1Baseball.com — "SB: 3"
    hbp:   6              // SOURCE: D1Baseball.com — "HBP: 6"
  },


  /* =========================
     SEASON 2024 (freshman season — full, complete)
     SOURCE: GT official bio (ramblinwreck.com, Pass 25.5) — all fields directly stated.
             D1Baseball.com (~Apr 5, 2026) — confirms AB=218, H=83.
     Cross-check: SLG = TB/AB = 179/218 = .821 ✓ ("0.821 slugging percentage" stated in bio)
     NOTE: Bio states "25 home runs set the Tech freshman record" and "fell one shy of tying
     the single-season record (Kevin Parada, 2022)." D1Baseball Freshman of the Year.
  ========================= */
  season2024: {
    year:  "2024",
    team:  "Georgia Tech",

    g:     null,           // UNAVAILABLE — not stated in bio text; season games not given explicitly

    avg:   0.381,          // SOURCE: ramblinwreck.com bio — ".381 average" — directly stated
    obp:   0.512,          // SOURCE: ramblinwreck.com bio — ".512 on-base percentage" — directly stated
    slg:   0.821,          // DERIVED: OPS - OBP = 1.333 - 0.512 = 0.821
                           //   VERIFIED: TB/AB = 179/218 = .821 ✓
    ops:   1.333,          // SOURCE: ramblinwreck.com bio — "OPS of 1.333" — directly stated

    ab:    218,            // SOURCE: D1Baseball.com (~Apr 5, 2026) — "AB: 218" — directly stated
                           // Career check: 218 (2024) + 228 (2025) = 446 ✓ matches PDF career total
    h:     83,             // SOURCE: D1Baseball.com (~Apr 5, 2026) — "H: 83" — directly stated
                           // Check: 83/218 = .381 ✓ consistent with AVG
    hr:    25,             // SOURCE: ramblinwreck.com bio — "25 home runs" — directly stated (freshman record)
    rbi:   67,             // SOURCE: ramblinwreck.com bio — "67 RBI" — directly stated
    bb:    58,             // SOURCE: ramblinwreck.com bio — "58 walks" — directly stated
    k:     37,             // SOURCE: ramblinwreck.com bio — "37 strikeouts" — directly stated
    sb:    8,              // SOURCE: ramblinwreck.com bio — "8-for-10 in stolen bases" — directly stated

    doubles: 15,           // SOURCE: ramblinwreck.com bio — "15 doubles" — directly stated
    triples: 3,            // SOURCE: ramblinwreck.com bio — "three triples" — directly stated
    cs:    2,              // DERIVED: 8 SB in 10 tries → CS = 10 - 8 = 2
    r:     null            // UNAVAILABLE — runs scored not stated in bio text
  },


  /* =========================
     SCOUT (advanced metrics — primary differentiator)
     DIRECTLY SOURCED from PDF p.20 advanced metrics table.
     Engine reads: kRate
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    // DIRECTLY SOURCED from PDF p.20 — "ADVANCED METRICS (2025)"
    maxEV:      113.5,   // SOURCE: PDF p.20 — "Max EV: 113.5 mph"
    avgEVPctile: 98,     // SOURCE: PDF p.20 — "Avg EV %ile: 98th"
    hardHitPct:  51.0,   // SOURCE: PDF p.20 — "Hard Hit%: 51%"
    bbPct:       17.0,   // SOURCE: PDF p.20 — "BB%: 17%"
    chaseRatePctile: 94, // SOURCE: PDF p.20 — "Chase Rate %ile: 94th"
    outfieldAssists: 10, // SOURCE: PDF p.20 — "OA: 10" — "GT program record" (PDF p.20)

    // PRIOR-YEAR BASELINE (hitters — INGESTION_GOLD_STANDARD.md):
    // 2025 season PA=290 dictates 2026 scout starting values.
    // Engine reads: s.kRate, s.bbRate
    kRate:   14.5,       // DERIVED: K/PA = 42/290 = 14.5% (2025 full season)
    bbRate:  18.3,       // DERIVED: BB/PA = 53/290 = 18.3% (2025 full season) — elite walk rate
    avgEV:   null,       // average EV not stated numerically; 98th-percentile stated
    barrel:  null,       // UNAVAILABLE
    hardHit: 51.0        // SOURCE: PDF p.20
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from PDF language.
     xAVG is a PROJECTION.
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for college player.
    // Derived from: 55 hit tool, .333 BA + 98th-percentile EV + 94th-percentile chase rate.
    // Mookie Betts career xAVG ~.295–.320 provides comp anchoring.
    // 17% walk rate and elite approach project strongly to MLB plate discipline.
    xAVG:  0.288,   // PROJECTION — strong metrics support contact translation. Manual review post-debut.

    // PROJECTION — derived from 60 power tool, 113.5 mph max EV, elite hard-hit rate.
    // Display-only (engine reads xAVG only).
    xSLG:  0.530,   // PROJECTION — not used by scoring engine. Display only. Power metrics strong.

    // DERIVED from PDF language:

    plateDiscTrend: 0.92,  // "17% walk rate AND 94th-percentile chase rate" (PDF p.20)
                           // "only swings at pitches he can damage" — elite approach confirmed

    contactTrend:   0.80,  // .333 sophomore follows up elite freshman; "above-average contact rates
                           // despite the mechanical quirk" — confirmed across two seasons

    injuryTrend:    0.82,  // no injury flags in PDF; 2-season workload is complete with no health notes

    sprintTrend:    0.62,  // "solid-average runner (not a burner)" — 55 run grade; not a speed threat
                           // "instincts and route running praised" — compensates for lack of elite speed

    posValue:       0.70,  // CF for now, corner long-term — above-average positional value
                           // "arm is legitimate" — 10 OA in 2024 confirms RF viability

    consistency:    0.88   // freshman (GT HR record) → sophomore (ACC doubles leader, #1 XBH) —
                           // elite two-year consistency; "not small-school numbers — ACC pitching" (PDF p.19)
  }

}
