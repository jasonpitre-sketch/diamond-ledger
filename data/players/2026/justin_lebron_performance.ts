/* =============================================================
   JUSTIN LEBRON — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 13–14
           rolltide.com official stats (May 10, 2026) — primary 2026 source
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-10 | Pass 25.10
   kind: "hitter"

   CASING RULES (PLAYER_CONTRACT.md):
     avg / AVG  — both present.
     avg  → lowercase: consumed by IntelStack UI display (snap?.avg)
     AVG  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "AVG")

   DATA CONFIDENCE (Pass 25.10):
     PRIMARY SOURCE (2026 current season): rolltide.com official stats (May 10, 2026) — G=50,
       AB=192, H=51, HR=13, RBI=36, BB=24, K=46, AVG=.266, OPS=.902. All directly stated.
       NOTE: OPS on Alabama site is listed as derived from OBP+SLG (stated separately).
       OBP/SLG not captured in this ingestion — set to null. Cross-check: H/AB=51/192=.266 ✓
       SUPERSEDES: PDF p.14 G=49 capture (AVG=.271, OPS=.947) and D1Baseball Apr 30 G=45 capture.
       rolltide.com (official university) is source hierarchy #1. 2026 data lives in season2026 block.
       NOTE: snapshot.year set to "2025" (complete season) per INGESTION_GOLD_STANDARD rule —
       most complete season wins for engine read and IntelStack 2025 row display.
     PRIMARY SOURCE (2025 full season — confirmed): rolltide.com / D1Baseball (May 10, 2026):
       G=59, AB=231, H=73, HR=18, RBI=72, BB=35, K=68, AVG=.316, OPS=1.057. All confirmed.
       NOTE: OPS=1.057 from rolltide.com (OBP+SLG derived); prior file had 1.058 from PDF rounding.
       rolltide.com bio adds 2B=18, 3B=1, HBP=10, SB=17 ("17 in 18 tries"), R=60. All directly stated.
       CONTEXT: Second Team All-American (2025). Cross-check: H/AB=73/231=.316 ✓
     PRIMARY SOURCE (2024 sophomore season): rolltide.com bio (Pass 25.5):
       AVG=.338, AB=216, H=73, 2B=9, HR=12, RBI=37, R=50, BB=20, HBP=16, SB=7. All directly stated.
       Exact bio text: "Posted a .338 (73-216) average with nine doubles and 12 home runs. Added 37
       RBI, 50 runs, 20 walks, 16 hit-by-pitch and seven stolen bases." Cross-check: 73/216=.338 ✓
     ESTIMATED: xAVG, xSLG — projected from tool grades and MLB-level adjustment
   ============================================================= */

export const justin_lebron_performance = {
  kind: "hitter",   // REQUIRED — hitter role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // NCAA: strong certainty / established track record → maturityConfidence = 0.94
  competitionLevel: "NCAA",

  /* =========================
     SNAPSHOT (2025 sophomore season — complete, full)
     Engine reads: AVG only.
     SOURCE: rolltide.com / D1Baseball (May 10, 2026).
     INGESTION_GOLD_STANDARD: snapshot = most complete season.
     2025 (59 GP, finished) is more complete than 2026 in-progress (50 GP).
     NOTE: snapshot.year="2025" → IntelStack reads this block for the 2025 row.
     2026 current data lives in season2026 block below.
  ========================= */

  snapshot: {
    year:  "2025",        // SOURCE: rolltide.com / D1Baseball — full 59-game sophomore season
    team:  "Alabama",

    g:     59,            // SOURCE: D1Baseball / rolltide.com — "G: 59" — Second Team All-American

    // DUAL KEY — see PLAYER_CONTRACT.md Known Issues (resolved Pass 17 pattern)
    avg:   0.316,         // lowercase — IntelStack display: snap?.avg
    AVG:   0.316,         // uppercase — calculateDLR: readNumber(snapshot, "AVG") ← ENGINE
                          // SOURCE: rolltide.com / D1Baseball — "AVG: .316" (check: 73/231=.316 ✓)

    obp:   0.421,         // SOURCE: D1Baseball / PDF — "OBP: .421" — confirmed
    slg:   0.636,         // SOURCE: D1Baseball / PDF — "SLG: .636" — confirmed
    ops:   1.057,         // SOURCE: rolltide.com — DERIVED from OBP+SLG (.421+.636=1.057)

    hr:    18,            // SOURCE: D1Baseball / PDF — "HR: 18"
    rbi:   72,            // SOURCE: D1Baseball — "RBI: 72" — directly stated
    sb:    17,            // SOURCE: rolltide.com bio — "17 stolen bases in 18 tries"

    bbPct: null,          // not stated as percentage
    kPct:  null,          // not stated as percentage

    // MVP SNAPSHOT FIELDS — all directly stated
    ab:    231,           // SOURCE: D1Baseball — "AB: 231" — directly stated
    h:     73,            // SOURCE: D1Baseball — "H: 73" — directly stated (check: 73/231=.316 ✓)
    bb:    35,            // SOURCE: D1Baseball — "BB: 35" — directly stated
    k:     68             // SOURCE: D1Baseball — "K: 68" — directly stated
  },


  /* =========================
     SEASON 2026 (junior season — in-progress, through May 10, 2026)
     SOURCE: rolltide.com official stats (May 10, 2026).
     Feeds: tracker block in justin_lebron.ts → 2026 row in IntelStack panel.
     NOTE: snapshot above (2025 sophomore) is the engine-read primary field.
     NOTE: OBP/SLG available on rolltide.com but not captured — only OPS stated here.
  ========================= */
  season2026: {
    year:  "2026",
    team:  "Alabama",

    g:     50,            // SOURCE: rolltide.com (May 10, 2026) — "GP: 50"

    avg:   0.266,         // lowercase — display alias
    AVG:   0.266,         // uppercase — engine alias (engine reads snapshot, not season2026)
                          // SOURCE: rolltide.com (May 10, 2026) — "AVG: .266" (check: 51/192=.266 ✓)

    obp:   null,          // UNAVAILABLE — not captured; available on rolltide.com
    slg:   null,          // UNAVAILABLE — same reason
    ops:   0.902,         // SOURCE: rolltide.com (May 10, 2026) — DERIVED from OBP+SLG on Alabama site

    ab:    192,           // SOURCE: rolltide.com (May 10, 2026) — "AB: 192" — directly stated
    h:     51,            // SOURCE: rolltide.com (May 10, 2026) — "H: 51" — directly stated
    hr:    13,            // SOURCE: rolltide.com (May 10, 2026) — "HR: 13" — directly stated
    rbi:   36,            // SOURCE: rolltide.com (May 10, 2026) — "RBI: 36" — directly stated
    bb:    24,            // SOURCE: rolltide.com (May 10, 2026) — "BB: 24" — directly stated
    k:     46,            // SOURCE: rolltide.com (May 10, 2026) — "K: 46" — directly stated

    sb:    null,          // not stated in 2026 stat line
    errors: 17            // SOURCE: PDF p.14 — "Errors: 17" — evaluator concern flag (stale; G=49 capture)
  },


  /* =========================
     SEASON 2025 (sophomore season — full, complete — SUPPLEMENTAL)
     NOTE: Core 2025 stats are now in snapshot block above (snapshot.year="2025").
     This block retains supplemental display fields not in snapshot:
       pa, wrc, r, doubles, triples, hbp — all directly stated from sources.
     SOURCE: D1Baseball (~Apr 30, 2026) + rolltide.com bio (Pass 25.5).
  ========================= */
  season2025: {
    year:  "2025",
    team:  "Alabama",

    g:     59,            // SOURCE: rolltide.com / D1Baseball — "G: 59" — Second Team All-American (2025)
    pa:    281,           // SOURCE: D1Baseball (~Apr 30, 2026) — "PA: 281" — directly stated

    avg:   0.316,         // SOURCE: rolltide.com (May 10, 2026) — "AVG: .316" (check: 73/231=.316 ✓)
    obp:   0.421,         // SOURCE: D1Baseball / PDF — "OBP: .421" — confirmed
    slg:   0.636,         // SOURCE: D1Baseball / PDF — "SLG: .636" — confirmed
    ops:   1.057,         // SOURCE: rolltide.com (May 10, 2026) — DERIVED from OBP+SLG (= .421+.636=1.057)
                          // NOTE: Prior file had 1.058 — rounding artifact from PDF; corrected to 1.057

    ab:    231,           // SOURCE: D1Baseball.com (~Apr 30, 2026) — "AB: 231" — directly stated
    h:     73,            // SOURCE: D1Baseball.com (~Apr 30, 2026) — "H: 73" — directly stated
                          // Check: 73/231 = .316 ✓ consistent with AVG
    hr:    18,            // SOURCE: PDF p.14 — "HR: 18" / D1Baseball confirmed
    rbi:   72,            // SOURCE: D1Baseball.com (~Apr 30, 2026) — "RBI: 72" — directly stated
    bb:    35,            // SOURCE: D1Baseball.com (~Apr 30, 2026) — "BB: 35" — directly stated
    k:     68,            // SOURCE: D1Baseball.com (~Apr 30, 2026) — "K: 68" — directly stated
    sb:    17,            // SOURCE: rolltide.com bio — "17 stolen bases in 18 tries" — directly stated
    r:     60,            // SOURCE: D1Baseball.com / rolltide.com — "60 runs scored" — directly stated
    wrc:   127,           // SOURCE: PDF p.14 — "wRC+: 127" (display only)

    // Pass 25.5: rolltide.com bio adds directly stated supplemental fields
    doubles: 18,          // SOURCE: rolltide.com bio — "18 doubles" — directly stated
    triples: 1,           // SOURCE: rolltide.com bio — "1 triple" — directly stated
    hbp:   10             // SOURCE: rolltide.com bio — "10 hit-by-pitch" — directly stated
  },


  /* =========================
     SEASON 2024 (sophomore season — full, verified)
     SOURCE: rolltide.com official bio (Pass 25.5) — all fields directly stated.
     Exact bio text: "Posted a .338 (73-216) average with nine doubles and 12 home runs.
     Added 37 RBI, 50 runs, 20 walks, 16 hit-by-pitch and seven stolen bases."
     Cross-check: H/AB = 73/216 = .3380 ≈ .338 ✓
  ========================= */
  season2024: {
    year:  "2024",
    team:  "Alabama",

    avg:   0.338,         // SOURCE: rolltide.com bio — ".338 (73-216) average" — directly stated
    ab:    216,           // SOURCE: rolltide.com bio — "(73-216)" — directly stated
    h:     73,            // SOURCE: rolltide.com bio — "(73-216)" — directly stated
                          // Check: 73/216 = .338 ✓

    doubles: 9,           // SOURCE: rolltide.com bio — "nine doubles" — directly stated
    triples: null,        // not stated
    hr:    12,            // SOURCE: rolltide.com bio — "12 home runs" — directly stated
    rbi:   37,            // SOURCE: rolltide.com bio — "37 RBI" — directly stated
    r:     50,            // SOURCE: rolltide.com bio — "50 runs" — directly stated
    bb:    20,            // SOURCE: rolltide.com bio — "20 walks" — directly stated
    hbp:   16,            // SOURCE: rolltide.com bio — "16 hit-by-pitch" — directly stated
    sb:    7,             // SOURCE: rolltide.com bio — "seven stolen bases" — directly stated

    obp:   null,          // not stated in bio text
    slg:   null,          // not stated in bio text
    ops:   null           // not stated in bio text
  },


  /* =========================
     SCOUT (2025 season — best available full data)
     Engine reads: kRate
     TAXONOMY: Hitter Taxonomy A (FROZEN) — hardHit / barrel / kRate / bbRate / avgEV
     DO NOT introduce alternate hitter metric keys without updating PERFORMANCE_SCOUT_TAXONOMY.md
  ========================= */

  scout: {
    // NOTE: 2025 full season counting stats moved to season2025 block (Pass 25).
    // Scout layer retains rate stats per PERFORMANCE_SCOUT_TAXONOMY.md.

    kRate:   24.2,       // SOURCE: PDF p.14 — "K%: 24.2%" in 2025 — "primary concern" for evaluators
    bbRate:  12.5,       // SOURCE: PDF p.14 — "BB%: 12.5%" in 2025 — "above average, indicates genuine discipline"

    avgEV:   null,       // UNAVAILABLE — no Statcast for college player
    barrel:  null,       // UNAVAILABLE
    hardHit: null        // UNAVAILABLE
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xAVG
     All 0–1 normalized trend fields derived from PDF language.
     xAVG is a PROJECTION (no official MLB Statcast for college player).
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for college player.
    // Derived from: 50 hit tool, .271 junior BA (regression from .316 sophomore),
    // 24.2% K% confirmed concern, adjusted for MLB-level pitching.
    // Bo Bichette / Willy Adames comp profiles project ~.260–.285 at MLB.
    xAVG:  0.258,   // PROJECTION — contact tool risk reflected in projection. Manual review post-debut.

    // PROJECTION — derived from 60 power tool, .549 junior SLG, MLB adjustment.
    // Display-only (engine reads xAVG only).
    xSLG:  0.460,   // PROJECTION — not used by scoring engine. Display only.

    // DERIVED from PDF language:

    plateDiscTrend: 0.70,  // "12.5% BB% indicates genuine plate discipline" — above average
                           // walk rate is positive signal counterbalancing K% concern

    contactTrend:   0.48,  // DECLINING — .316 (2025) → .271 (2026) regression; "contact rates
                           // against premium velocity" remain "elevated concern" (PDF p.13)

    injuryTrend:    0.82,  // no injury flags in PDF; 17 errors reflect reliability not physical

    sprintTrend:    0.78,  // 60-grade runner; "17-for-18 SB attempts in 2025" confirms plus speed
                           // first step and lateral movement are genuine plus tools

    posValue:       0.80,  // SS — premium positional value; "no reason to move him off shortstop"
                           // "outstanding lateral movement" — defensive tools are legitimate

    consistency:    0.52   // DECLINING — sophomore peak (.316/.421/.636) → junior regression (.271/.398/.549);
                           // 17-error season adds to inconsistency signal
  }

}
