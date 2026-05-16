/* =============================================================
   JACKSON FLORA — PERFORMANCE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 11–12
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-10 | Pass 25
   kind: "pitcher"

   CASING RULES (PLAYER_CONTRACT.md):
     era / ERA  — both present.
     era  → lowercase: consumed by IntelStack UI display (snap?.era)
     ERA  → uppercase: consumed by calculateDLR engine readNumber(snapshot, "ERA")

   DATA CONFIDENCE (Pass 25):
     PRIMARY SOURCE (2026 current season): D1Baseball.com (May 10, 2026) — full current season line:
       W=9, L=0, ERA=1.15, APP=13, GS=13, IP=78.1, H=48, BB=28, K=103, BAA=.173.
       Significant update from PDF mid-March partial (4-0, 1.50 ERA, 24 IP, 28 K, 7 BB).
       DERIVED: WHIP = (H+BB)/IP = (48+28)/78.1 = 76/78.1 = 0.97. K/BB = 103/28 = 3.68. K/9 = 11.9.
     PRIMARY SOURCE (2025 historic season): PDF p.12 — ERA=0.73 (#1 in D1), WHIP=0.80, K/9=10.5+,
       BAA=.190, OPS Against=.440. Retained from original ingestion.
       SOURCE CONFLICT NOTE: D1Baseball.com shows 2025 season ERA=3.60, IP=75, K=86 for this player.
       This conflicts materially with PDF. PDF is retained as primary per ingestion hierarchy.
       D1Baseball data may reflect a different year label or player record. Flag for manual review.
     ESTIMATED: xERA — projected from pitch grades and college performance adjustment
   ============================================================= */

export const jackson_flora_performance = {
  kind: "pitcher",   // REQUIRED — pitcher role declaration (PLAYER_CONTRACT.md)

  // MATURITY CONFIDENCE — Pass 24 competition-context weighting.
  // NCAA: strong certainty / established track record → maturityConfidence = 0.94
  competitionLevel: "NCAA",

  /* =========================
     SNAPSHOT (2026 season — primary reference)
     Engine reads: ERA only.
     All other fields are display context.
  ========================= */

  snapshot: {
    year:  "2026",        // SOURCE: D1Baseball.com (May 10, 2026) — current 2026 season
    team:  "UC Santa Barbara",

    // DUAL KEY
    era:   1.15,          // lowercase — IntelStack display: snap?.era
    ERA:   1.15,          // uppercase — calculateDLR: readNumber(snapshot, "ERA") ← ENGINE
                          // SOURCE: D1Baseball.com (May 10, 2026) — "ERA: 1.15"
                          // NOTE: PDF mid-March partial stated 1.50 — updated to current

    whip:  0.97,          // DERIVED: (H+BB)/IP = (48+28)/78.1 = 76/78.1 = 0.974 ≈ 0.97
    WHIP:  0.97,          // NOTE: PDF partial stated 1.00 (from 7 BB + 17 H in 24 IP ≈ 1.00)

    ip:    78.1,          // SOURCE: D1Baseball.com — "IP: 78.1" — directly stated
    IP:    78.1,

    so:    103,           // SOURCE: D1Baseball.com — "K: 103" — directly stated
    K:     103,

    bb:    28,            // SOURCE: D1Baseball.com — "BB: 28" — directly stated
    BB:    28,

    w:     9,             // SOURCE: D1Baseball.com — "W: 9" — directly stated
    W:     9,

    l:     0,             // SOURCE: D1Baseball.com — "L: 0" — directly stated
    L:     0,

    baa:   0.173,         // SOURCE: D1Baseball.com — "BAA: .173" — directly stated

    // MVP PITCHER FIELDS — now populated Pass 25
    g:     13,            // SOURCE: D1Baseball.com — "APP: 13" (GS: 13) — directly stated
    h:     48,            // SOURCE: D1Baseball.com — "H: 48" — directly stated

    // DISPLAY-ONLY rate stats — DERIVED from confirmed totals
    k9:    11.9,          // DERIVED: K/IP×9 = 103/(78.1/9) = 103/8.68 = 11.87 ≈ 11.9
    K9:    11.9,
    bb9:   3.2,           // DERIVED: BB/IP×9 = 28/(78.1/9) = 28/8.68 = 3.23 ≈ 3.2
    kbb:   3.68           // DERIVED: K/BB = 103/28 = 3.68 (PDF partial had 4.00 at 28K/7BB)
  },


  /* =========================
     SCOUT (2025 historic season — additional reference)
     D1 historic numbers from 2025 season used as scout layer.
     Engine reads: kRate (if mapped from K/9).
  ========================= */

  scout: {
    // 2025 SEASON REFERENCE — D1 HISTORIC
    // SOURCE: PDF p.12 — "2025 SEASON — NCAA D1 HISTORIC NUMBERS"
    era2025:    0.73,    // SOURCE: PDF p.12 — "#1 ERA in D1" in 2025
    whip2025:   0.80,    // SOURCE: PDF p.12 — "~0.80 WHIP" in 2025
    k9_2025:    10.5,    // SOURCE: PDF p.12 — "10.5+ K/9" in 2025
    baa2025:    0.190,   // SOURCE: PDF p.12 — ".190 BAA" in 2025
    opsAgainst: 0.440,   // SOURCE: PDF p.12 — ".440 OPS Against — #1 in D1" in 2025

    // Pitch velocity data from PDF p.11
    fbVelo:     100,     // SOURCE: PDF p.11 — "mid-to-upper 90s, clocked at 100+ mph"
    fbVeloLow:  96,      // SOURCE: PDF p.11 — "sits comfortably in mid-to-upper 90s"
    sliderVelo: 87,      // SOURCE: PDF p.11 — "86-89 mph with tight two-plane break"
    sweeperVelo: 79,     // SOURCE: PDF p.11 — "78-81 mph range with pronounced horizontal sweep"
    changeVelo:  87,     // SOURCE: PDF p.11 — "upper 80s with excellent arm-side fade"

    kRate:  null         // K rate as percentage not stated; K/9 used as proxy
  },


  /* =========================
     ANALYST (xStats + trend signals)
     Engine reads: xERA (via ERA field)
     All 0–1 normalized trend fields derived from PDF language.
     xERA is a PROJECTION (no official MLB Statcast for college player).
  ========================= */

  analyst: {
    // PROJECTION — no official Statcast for college player.
    // Derived from: 65 FB, 60 CU, 55+ slider, 55 command, D1 historic production.
    // MLB adjustment for college-to-pro translation (typically ERA doubles to triples).
    // Logan Gilbert comp projects ~3.00–3.80 ERA range.
    xERA:  3.20,   // PROJECTION — MLB-level adjustment. Manual review post-debut.

    // PROJECTION — display-only
    xFIP:  3.40,   // PROJECTION — estimated from pitch quality and command profile

    // DERIVED from PDF language:

    commandTrend:   0.80,  // "K/BB ratio of 4.00 reflects genuine plus-command projection" (PDF p.12)
                           // above-average for age and size; consistent across two D1 seasons

    stuffTrend:     0.90,  // "historically dominant" — 0.73 ERA, .440 OPS Against in 2025
                           // changeup emergence as third weapon dramatically elevated projection

    injuryTrend:    0.65,  // "7/10 health" rating from PDF p.11 — head whack noted; pitcher baseline risk
                           // "has not materially affected command or health to date" — cautious positive

    durabilityTrend: 0.75, // D1 starter workload managed well; UCSB usage suggests org confidence in arm

    pitchMixTrend:  0.88,  // four-pitch mix with multiple plus offerings — "genuine tunneling advantage"
                           // changeup emergence from two-pitch to three-plus is significant development

    consistency:    0.82   // 2025 historic → 2026 continued dominance; cross-season consistency is elite
  }

}
