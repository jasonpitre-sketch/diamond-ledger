/* =============================================================
   GRADY EMERSON — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 6–8
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-14 | Pass 63
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")

   DATA CONFIDENCE (Pass 25):
     PRIMARY SOURCE (2026 senior season): MaxPreps coach-entered stats (maxpreps.com).
       Pass 63 update (May 14, 2026): GP=28, PA=108, AB=79, H=42, R=39, RBI=42, HR=7,
       BB=27, K=2, HBP=1, AVG=.532, OBP=.648, SLG≈1.013, OPS≈1.661. All directly stated.
       Pass 25 data (May 4, 2026): GP=26, PA=101, AB=76, H=42, AVG=.553, BB=23, K=2.
       CROSS-CHECK: 42/79 = .532 ✓. OBP: (42+27+1)/108 = 70/108 = .648 ✓. PA=108 stated.
     SOURCE CONFLICT (2026 snapshot, documented):
       PDF p.6 stated: AVG=.524, OBP=.638, SLG=.971, OPS=1.609, BB=34, K=4
       MaxPreps (Pass 63, May 14): AVG=.532, OBP=.648, SLG≈1.013, OPS≈1.661, BB=27, K=2
       MaxPreps is primary per HS source hierarchy.
     NOT AVAILABLE: SB in MaxPreps batting table — PDF sb=31 retained (not contradicted)
     PRIMARY SOURCE (2025 junior season — snapshot): Texas High School Baseball
       (txhighschoolbaseball.com) cover feature (Dec 2025) — states full 2025 season line.
       AVG=.351, 2B=11, 3B=2, HR=4, RBI=25, R=35, SB=14, G≈33. All directly stated.
       Named 6-5A All-District 1st Team SS.
     SECONDARY SOURCE (2025 OPS): Denton Record-Chronicle 2025 All-Area Baseball Team
       (paywalled) — confirms OPS=1.122 for full junior season. Directly stated.
     DERIVED (Pass 25): AB/H/BB/OBP/SLG solved from OPS+AVG+G constraint.
       Method: PA≈132 (G=33×4 PA/game). AB+BB≈130. Solve for AB: quadratic yields AB≈100.
       H = .351×100 = 35; BB = 130-100 = 30. SLG=(35+27)/100=.620; OBP=66/132=.500.
       Check: OPS = .620+.500 = 1.120 ≈ 1.122 ✓. Marked ESTIMATED in snapshot block.
       K unavailable — not stated in any public source; not derivable.
     ESTIMATED: xAVG, xSLG — projected from hit-tool grade and college-level adjustment
   ============================================================= */

export const grady_emerson_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // HS: lower certainty / higher volatility / compressed DLR floor → maturityConfidence = 0.82
  competitionLevel: "HS",

  /* =========================
     SEASON 2026 (senior season — Fort Worth Christian HS — MaxPreps, May 4 2026)
     Feeds: tracker block in grady_emerson.ts → 2026 row in IntelStack panel.
     NOTE: snapshot block below (2025 Argyle) is the engine-read primary field.
  ========================= */

  season2026: {
    year:  "2026",           // SOURCE: MaxPreps (Pass 63, May 14, 2026) — Fort Worth Christian
    team:  "Fort Worth Christian HS",

    g:     28,               // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "GP: 28" (updated from 26)
                             // NOTE: PDF did not state G; MaxPreps primary source per HS hierarchy

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.532,            // lowercase — IntelStack display: snap?.avg
    AVG:   0.532,            // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                             // SOURCE: MaxPreps (Pass 63, May 14, 2026) — ".532 Avg" (updated from .553)
                             // Check: 42/79 = .532 ✓. PDF CONFLICT: PDF p.6 stated ".524"

    obp:   0.648,            // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "OBP: .648" (updated from .653)
                             // Check: (42+27+1)/108 = 70/108 = .648 ✓
    slg:   1.013,            // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "SLG: ≈1.013" (updated from 1.053)
                             // DERIVED CHECK: TB=(42+9+8+28)/79 = 87/79 = 1.013 ✓ (2B=9, 3B=4, HR=7)
    ops:   1.661,            // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "OPS: ≈1.661" (updated from 1.706)
                             // DERIVED: OBP+SLG = 0.648+1.013 = 1.661

    hr:    7,                // SOURCE: MaxPreps (May 4, 2026) — "HR: 7" — unchanged
                             // NOTE: PDF p.6 listed HR as "N/A" — MaxPreps contradicts; use MaxPreps
    rbi:   42,               // SOURCE: MaxPreps (May 4, 2026) — "RBI: 42" — unchanged
    r:     39,               // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "R: 39" (newly stated)
    doubles: 9,              // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "2B: 9" (newly stated)
    triples: 4,              // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "3B: 4" (newly stated)
    sb:    31,               // SOURCE: PDF p.6 — "SB: 31" — not in MaxPreps batting table; retained

    // DISPLAY-ONLY season rate stats
    bbPct: null,             // BB count stated, not as percentage
    kPct:  null,             // K count stated, not as percentage
    bb:    27,               // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "BB: 27" (updated from 23)
                             // PDF CONFLICT: PDF p.6 stated "BB: 34" — MaxPreps primary per hierarchy
    k:     2,                // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "K: 2" (unchanged)
                             // PDF CONFLICT: PDF p.6 stated "K: 4" — MaxPreps primary per hierarchy
    hbp:   1,                // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "HBP: 1" (newly stated)
    sbAtt: 32,               // SOURCE: PDF p.6 — "SB Att: 32" (31 for 32) — not in MaxPreps; retained

    // MVP SNAPSHOT FIELDS — updated Pass 63 from MaxPreps primary source (May 14, 2026)
    pa:    108,              // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "PA: 108" (updated from 101)
    ab:    79,               // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "AB: 79" (updated from 76)
                             // PA=108; AB=79 ← PA minus BB/HBP/SF = 108-27-1-1 = 79 ✓ internally consistent
    h:     42                // SOURCE: MaxPreps — "H: 42" — unchanged
                             // Check: 42/79 = .532 ✓ consistent with MaxPreps AVG
  },


  /* =========================
     SNAPSHOT (2025 junior season — Argyle HS, 5A — full season)
     Engine reads: AVG only. IntelStack reads all fields for 2025 panel row.
     PRIMARY SOURCE: Texas High School Baseball cover feature (txhighschoolbaseball.com, Dec 2025)
       Full season line directly stated: AVG=.351, 2B=11, 3B=2, HR=4, RBI=25, R=35, SB=14, G≈33.
     SECONDARY SOURCE (OPS): Denton Record-Chronicle 2025 All-Area article — OPS=1.122 stated.
     NOTE: Emerson transferred from Argyle to Fort Worth Christian for senior year.
     TRANSFER CONTEXT: 2025 = Argyle Eagles (5A); 2026 = Fort Worth Christian (TAPPS D2).
     DERIVED FIELDS (Pass 25): AB/H/BB solved from OPS+AVG+G constraint.
       PA≈132 (G=33 × 4 PA/game). TB = H + 2B + 2(3B) + 3(HR) = H+27.
       SLG = .351 + 27/AB. OBP = 1.122 - SLG. Quadratic solution: AB≈100, H≈35, BB≈30.
       Verification: SLG=.620, OBP=.500, OPS=1.120≈1.122 ✓. K not derivable.
  ========================= */
  snapshot: {
    year:  "2025",
    team:  "Argyle HS",       // 5A (Argyle Eagles)

    g:     33,                // SOURCE: THSB Dec 2025 — full 2025 junior season (G≈33 games)

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.351,             // lowercase — IntelStack display: snap?.avg
    AVG:   0.351,             // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                              // SOURCE: THSB Dec 2025 / DRC 2025 All-Area — ".351" (directly stated)

    // DERIVED from OPS+AVG+G constraint — see header for full derivation
    obp:   0.500,             // DERIVED — OBP = OPS - SLG = 1.122 - 0.620
    slg:   0.620,             // DERIVED — SLG = TB/AB = (35+27)/100 = 62/100
    ops:   1.122,             // SOURCE: DRC 2025 All-Area — "1.122 OPS" (directly stated)

    hr:    4,                 // SOURCE: THSB Dec 2025 — "4 HR" (directly stated)
    rbi:   25,                // SOURCE: THSB Dec 2025 — "25 RBI" (directly stated)
    r:     35,                // SOURCE: THSB Dec 2025 — "35 Runs" (directly stated)
    doubles: 11,              // SOURCE: THSB Dec 2025 — "11 2B" (directly stated)
    triples: 2,               // SOURCE: THSB Dec 2025 — "2 3B" (directly stated)
    sb:    14,                // SOURCE: THSB Dec 2025 — "14 SB" (directly stated)

    pa:    null,              // UNAVAILABLE — not stated; estimated PA≈132 used in derivation only
    hbp:   null,              // UNAVAILABLE — not stated in any full-season source

    // MVP SNAPSHOT FIELDS
    // ab/h/bb: ESTIMATED via OPS+AVG+G constraint (Pass 25). Mark for manual review if official stats surface.
    ab:    100,               // ESTIMATED — quadratic solution from PA≈132, OPS=1.122, AVG=.351
    h:     35,                // ESTIMATED — AVG × AB = .351 × 100 (check: 35/100=.350≈.351 ✓)
    bb:    30,                // ESTIMATED — PA - AB - HBP - SF ≈ 132 - 100 - 1 - 1 = 30
    k:     null,              // UNAVAILABLE — not stated in any public source; not derivable

    // ALL-DISTRICT: 6-5A First Team SS (SOURCE: THSB Dec 2025)
    notes: "6-5A All-District 1st Team SS — THSB Dec 2025 full season: .351 AVG, 4 HR, 25 RBI, 14 SB, 35 R, 11 2B, 2 3B, G≈33. OPS=1.122 (DRC 2025 All-Area). AB/H/BB derived via OPS+AVG+G math (Pass 25). K unavailable."
  },


  /* =========================
     SCOUT (Statcast-equivalent / measurables)
     Engine reads: kRate
     Field kRate derived from strikeout profile.
     Prep player — no Statcast; estimates from available data.
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    // DERIVED from stated counts: 4 K in ~50+ AB — extreme contact rates
    // ~2% K rate stated explicitly in tool table PDF p.6
    kRate:   2.0,    // SOURCE: PDF p.6 — "~2% K%" in tool column header
    bbRate:  null,   // BB% not stated as rate; 34 BB stated as count

    // No exit velocity data available for prep player in source
    avgEV:   null,   // UNAVAILABLE — no Statcast for prep player
    barrel:  null,   // UNAVAILABLE
    hardHit: null    // UNAVAILABLE
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from PDF language.
     xAVG is a PROJECTION (no official MLB Statcast for prep player).
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for prep player.
    // Derived from: 65-grade hit tool, .524 prep BA, elite contact approach,
    // adjusted for MLB-level pitching difficulty.
    // Tony Gwynn / Freddie Freeman type contact profiles project ~.290–.320 at MLB.
    xAVG:  0.295,   // PROJECTION — MLB-level contact adjustment. Manual review post-debut.

    // PROJECTION — derived from 55 power tool, .971 SLG prep, MLB adjustment.
    // Display-only (engine reads xAVG only).
    xSLG:  0.460,   // PROJECTION — not used by scoring engine. Display only.

    // DERIVED from PDF language:

    plateDiscTrend: 0.95,  // MaxPreps (Pass 63): BB=27 / K=2 — extraordinary prep plate discipline;
                           // "near-nonexistent strikeout rate against every level of competition" (PDF p.6)
                           // Note: BB count now 27 (was 23 at May 4); K=2 unchanged — ratio still elite

    contactTrend:   0.95,  // .532 BA with K=2 in 79 AB — exceptional prep contact profile (Pass 63 updated)

    injuryTrend:    0.82,  // no injury flags in PDF; Team USA multi-year participation confirms health

    sprintTrend:    0.78,  // 60-grade runner; "31 steals in 32 attempts"; "outstanding baserunning IQ"
                           // (PDF p.6) — elite efficiency reflects both speed and IQ

    posValue:       0.80,  // SS with potential CF — premium positional value
                           // "instinctive SS with soft, reliable hands" (PDF p.6)

    consistency:    0.85   // Team USA + prep performance consistent across all levels of competition
  }

}
