/* =============================================================
   ROCH CHOLOWSKY — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 4–5
   Generated: 2026-05-08 | Pass 18
   Updated:   2026-05-14 | Pass 64 — PERFORMANCE REFRESH
     snapshot promoted to 2026 junior season (51 GP through ~5/10);
     2025 sophomore season preserved as season2025 anchor;
     scout kRate/bbRate updated to 2026 rates;
     xAVG/xSLG bumped for improved K/BB balance + power spike (21 HR);
     careerAverages and tracker updated in roch_cholowsky.ts separately.
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")
     All other fields follow PLAYER_CONTRACT.md naming.

   DATA CONFIDENCE (Pass 64 refresh):
     DIRECTLY SOURCED (2026): GP=51, AB=198, H=67, R=69, 2B=10, 3B=0, HR=21, RBI=59,
       BB=29, HBP=22, K=31, SB=1, GDP=5, AVG=.338, OBP=.463, SLG=.707, OPS=1.170
       SOURCE: UCLA Athletics official stats page (uclabruins.com) — Pass 64 verified.
       PA derived: AB(198)+BB(29)+HBP(22) = 249.
     DIRECTLY SOURCED (2025): unchanged from Pass 23.5 authoritative stat line.
     ESTIMATED: barrel, hardHit (same as Pass 18 — no new Statcast data source).
     PROJECTION: xAVG=.305 (updated from .300 — improved K% 12.4 + power spike 21 HR);
       xSLG=.500 (updated from .490 — .707 SLG college at 2026 level).
     DERIVED: kRate=12.4% (31/249 PA), bbRate=11.6% (29/249 PA), ISO=.369 (.707-.338).
   ============================================================= */

export const roch_cholowsky_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // NCAA: strong certainty / established track record → maturityConfidence = 0.94
  competitionLevel: "NCAA",

  /* =========================
     SNAPSHOT (2026 junior season — promoted Pass 64)
     Engine reads: AVG only.
     All other fields are display context.

     Pass 64 decision: 2026 partial season (51 GP, 198 AB) now has sufficient
     sample depth (trust=0.97 at AB≥160) to serve as primary snapshot.
     2025 full season preserved as season2025 anchor for lifecycle display.
  ========================= */

  snapshot: {
    year:  "2026",        // Pass 64 — promoted from season2026 to primary snapshot
    team:  "UCLA",

    g:     51,            // SOURCE: UCLA stats page — "GP: 51" (Pass 64 refresh, ~5/10/2026)
    pa:    249,           // DERIVED: AB(198)+BB(29)+HBP(22)=249

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.338,         // lowercase — IntelStack display: snap?.avg
    AVG:   0.338,         // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                          // SOURCE: UCLA stats page — "BA: .338" (Pass 64 refresh)

    obp:   0.463,         // SOURCE: UCLA stats page — "OBP: .463"
    slg:   0.707,         // SOURCE: UCLA stats page — "SLG: .707"
    ops:   1.170,         // SOURCE: UCLA stats page — "OPS: 1.170"

    hr:    21,            // SOURCE: UCLA stats page — "HR: 21"
    rbi:   59,            // SOURCE: UCLA stats page — "RBI: 59"
    sb:    1,             // SOURCE: UCLA stats page — "SB: 1"
    r:     69,            // SOURCE: UCLA stats page — "R: 69"

    // DISPLAY-ONLY season rate stats — engine does not read these
    bbPct: 11.6,          // DERIVED: 29 BB / 249 PA = 11.65% (Pass 64)
    kPct:  12.4,          // DERIVED: 31 K / 249 PA = 12.45% (Pass 64)
    iso:   0.369,         // DERIVED: SLG(.707) − AVG(.338) = .369 (Pass 64) ✓

    // MVP SNAPSHOT FIELDS
    ab:    198,           // SOURCE: UCLA stats page — "AB: 198" (Pass 64)
    h:     67,            // SOURCE: UCLA stats page — "H: 67" (Pass 64)
                          // Cross-check: 67/198 = .3384 ≈ .338 ✓
    bb:    29,            // SOURCE: UCLA stats page — "BB: 29"
    k:     31,            // SOURCE: UCLA stats page — "K: 31"
    hbp:   22,            // SOURCE: UCLA stats page — "HBP: 22"
    doubles: 10,          // SOURCE: UCLA stats page — "2B: 10"
    triples: 0,           // SOURCE: UCLA stats page — "3B: 0"
    gdp:   5              // SOURCE: UCLA stats page — "GDP: 5"
  },

  /* =========================
     SEASON 2025 (sophomore season — anchor)
     Preserved from Pass 18 / Pass 23.5 for lifecycle display.
     Not used as primary snapshot (engine reads snapshot block above).
     Full 2025 season: 66 GP (including postseason), PA=324, AB=252.
  ========================= */
  season2025: {
    year:  "2025",
    team:  "UCLA",
    // SOURCE: Pass 23.5 authoritative stat line + UCLA Athletics bio (full season)
    // Full line: GP=66, PA=324, AB=252, H=89, R=?, 2B=?, HR=23, RBI=74,
    //            BB=45, K=30, SB=7, BA=.353, OBP=.480, SLG=.710, OPS=1.190

    g:     66,            // SOURCE: UCLA Athletics official bio — "started all 66 games"
    pa:    324,           // SOURCE: Pass 23.5 authoritative stat line

    avg:   0.353,         // SOURCE: PDF p.4 — "BA: .353"
    AVG:   0.353,         // engine alias — display only here (engine reads snapshot)
    obp:   0.480,         // SOURCE: PDF p.4 — "OBP: .480"
    slg:   0.710,         // SOURCE: PDF p.4 — "SLG: .710"
    ops:   1.190,         // SOURCE: PDF p.4 — "OPS: 1.190"

    ab:    252,           // SOURCE: Pass 23.5 authoritative stat line — "AB=252"
    h:     89,            // SOURCE: UCLA Athletics official bio — "Led UCLA in hits (89)"
    hr:    23,            // SOURCE: PDF p.4 — "HR: 23"
    rbi:   74,            // SOURCE: PDF p.4 — "RBI: 74"
    sb:    7,             // SOURCE: PDF p.4 — "SB: 7"
    bb:    45,            // SOURCE: Pass 23.5 authoritative stat line — "BB=45"
    k:     30,            // SOURCE: Pass 23.5 authoritative stat line — "K=30"

    bbPct: 13.2,          // SOURCE: PDF p.4 — "BB%: 13.2%"
    kPct:  14.1,          // SOURCE: PDF p.4 — "K%: 14.1%"
    iso:   0.357,         // SOURCE: PDF p.4 — "ISO: .357"
    war:   6.49           // SOURCE: PDF p.4 — "WAR: 6.49" — D1 WAR leader
  },


  /* =========================
     SCOUT (Statcast-equivalent)
     Engine reads: kRate
     Field kRate sourced directly from K% season stat.
     avgEV sourced from stated EV range.
     barrel, hardHit are ESTIMATES — see comments.
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    // Pass 64 refresh — kRate/bbRate updated to 2026 season rates.
    // avgEV, barrel, hardHit unchanged — no new EV source data.
    kRate:   12.4,   // DERIVED: 31 K / 249 PA = 12.45% (Pass 64). Was 14.1% (2025 PDF).
                     // Engine key: kRate. Improvement reflects 2026 elite BB/K balance.
    bbRate:  11.6,   // DERIVED: 29 BB / 249 PA = 11.65% (Pass 64). Was 13.2% (2025 PDF).
                     // Note: both kRate and bbRate declined slightly vs 2025, but the
                     // exceptional K≈BB balance is maintained (ratio: 31K/29BB ≈ 1.07).

    // SOURCED from PDF p.4: "exit velocity readings consistently sit in the 108-112 mph range"
    // Unchanged from Pass 18 — no new EV data source available.
    avgEV:   110.0,  // ESTIMATED midpoint of 108–112 mph stated range (PDF p.4)

    // ESTIMATED from EV profile — not explicitly stated in source.
    // Mark for manual review when MLB Statcast data becomes available post-debut.
    barrel:  13.0,   // ESTIMATED — derived from EV range; not directly stated
    hardHit: 52.0    // ESTIMATED — derived from EV range; not directly stated
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from PDF language.
     xAVG, xSLG are PROJECTIONS (no official MLB Statcast for college player).
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for college player.
    // Pass 64 update: xAVG bumped from .300 to .305.
    // Rationale: 2026 K% improvement (12.4% vs 14.1%) + power spike (21 HR in 51 GP)
    // suggest contact quality is strengthening, not regressing despite AVG dip.
    // Trea Turner career xAVG ~.290–.310 provides comp anchoring.
    xAVG:  0.305,   // PROJECTION — updated Pass 64. Manual review post-debut.

    // PROJECTION — derived from 60 power tool, .707 SLG college, MLB adjustment.
    // Pass 64 update: bumped from .490 to .500 (21 HR in 51 GP is historically elite output).
    // Display-only (engine reads xAVG only).
    xSLG:  0.500,   // PROJECTION — updated Pass 64. Not used by scoring engine. Display only.

    // DERIVED from source language + 2026 rate stats (Pass 64):
    plateDiscTrend: 0.88,  // Maintained: BB≈K ratio in 2026 (29BB/31K = 1.07) still
                           // elite even as raw rate% declined slightly from 2025.

    contactTrend:   0.84,  // Slightly up from 0.82: .353/.338 three-year consistency band
                           // maintained while power output climbed (21→23 HR trajectory).
                           // Contact quality trending positive despite AVG normalization.

    injuryTrend:    0.88,  // Unchanged — "no significant injury history to date" (PDF p.3)

    sprintTrend:    0.65,  // Unchanged — 55 run grade + elite first-step instincts.
                           // 2026 SB=1 reflects team usage/caution, not speed decline.

    posValue:       0.90,  // Unchanged — premium SS; "no credible reason to move him off SS"

    consistency:    0.86   // Slightly up from 0.85: .353 (2025) / .338 (2026 through 51 GP)
                           // — three-season elite band confirmed; power spike adds to profile.
  }

}
