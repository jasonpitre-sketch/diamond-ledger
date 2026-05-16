/**
 * Pass 80 — Brady Singer 2026 MLB Replay (2026-05-15)
 * Source: MLB Stats API gameLog (player 663903, verified through 5/12/2026)
 * 9 starts replayed game-by-game through P60 pitcher cascade.
 * Weekly DLR snapshots W13-W20 written to Supabase tagged engine_version "P60".
 * April monthly settlement included.
 *
 * Pass 70 — Brady Singer Performance (2026-05-14)
 * Source: Baseball Reference career stats + Reds game logs (verified through 5/6/2026)
 * kind: "pitcher"
 *
 * Career path: KC (2020-2024) → CIN (2025-present)
 * 2022 peak: 3.23 ERA, 1.14 WHIP — career-best season
 * 2023 collapse: 5.52 ERA, 1.45 WHIP — yo-yo pattern established
 * 2024 recovery: 3.71 ERA, 1.27 WHIP
 * 2025 anchor: 14-12, 4.03 ERA, 1.24 WHIP (solid first year with CIN)
 * 2026 current: 9 GS, 5.79 ERA, 1.667 WHIP — struggling badly through 5/12/2026
 *
 * NOTE: Career arc is volatile. DLR will read low due to slump.
 * 2025 anchor (4.03) preserves identity floor.
 * Honest read: struggling veteran pitcher in performance valley.
 *
 * DERIVED STATS (2026 snapshot):
 *   MLB API verified: 42.0 IP, 59 H, 28 R, 27 ER, 11 BB, 28 K, 11 HR, 196 BF
 *   kPercent: 28 K / 196 BF × 100 = 14.3% (well below MLB average ~22%)
 *   bbPercent: 11 BB / 196 BF × 100 = 5.6%
 */

export const brady_singer_performance = {

  kind: "pitcher" as const,
  competitionLevel: "MLB",

  /* =========================
     SNAPSHOT — 2026 current (primary scoring layer)
     CIN Reds, through 5/12/2026
  ========================= */
  snapshot: {
    year:       "2026",
    team:       "CIN",
    level:      "MLB",
    league:     "NL",
    parentClub: "CIN",

    W:   2,
    L:   3,
    SV:  0,

    ERA:  5.79,
    era:  5.79,      // dual-key per Pass 17
    RA9:  5.79,      // approximated from ER/IP

    G:   9,
    GS:  9,
    CG:  0,
    SHO: 0,
    IP:  42.0,
    H:   59,
    R:   28,
    ER:  27,
    HR:  11,
    BB:  11,
    IBB: 0,
    K:   28,
    SO:  28,
    HBP: 0,
    WP:  1,
    BF:  196,

    WHIP: 1.667,
    whip: 1.667,     // dual-key per Pass 17
    K9:   6.0,       // 28×9/42 = 6.0
    BB9:  2.36,      // 11×9/42 = 2.36
    HR9:  2.36,
    KBB:  2.55       // 28/11 = 2.55
  },

  /* =========================
     SEASON 2025 — ANCHOR
     CIN Reds, first full year; solid performance
  ========================= */
  season2025: {
    year:   "2025",
    team:   "CIN",
    level:  "MLB",
    league: "NL",

    W:    14,
    L:    12,
    ERA:   4.03,
    era:   4.03,

    G:    32,
    GS:   32,
    CG:   0,
    SHO:  0,
    IP:   170.0,     // DERIVED: ER×9/ERA = 76×9/4.03 ≈ 170
    H:    null,      // not available from source screenshot
    R:    null,
    ER:   76,
    BB:   null,
    K:    null,      // estimated ~159 (8.4 K/9 career rate × 170 IP / 9)

    WHIP: 1.24,
    whip: 1.24,
    K9:   null,
    BB9:  null
  },

  /* =========================
     SEASON 2024 — REFERENCE (recovery year, KC)
  ========================= */
  season2024: {
    year:  "2024",
    team:  "KC",
    level: "MLB",

    W:    9,
    L:    13,
    ERA:  3.71,
    era:  3.71,

    G:    32,
    GS:   32,
    IP:   179.2,     // DERIVED: ER×9/ERA = 74×9/3.71 ≈ 179.2
    ER:   74,
    WHIP: 1.27,
    whip: 1.27,
    K:    null
  },

  /* =========================
     SEASON 2023 — REFERENCE (collapse year, KC)
  ========================= */
  season2023: {
    year:  "2023",
    team:  "KC",
    level: "MLB",

    W:    8,
    L:    11,
    ERA:  5.52,
    era:  5.52,

    G:    29,
    GS:   29,
    IP:   160.0,     // DERIVED: ER×9/ERA = 98×9/5.52 ≈ 159.8 → 160.0
    ER:   98,
    WHIP: 1.45,
    whip: 1.45,
    K:    null
  },

  /* =========================
     SEASON 2022 — REFERENCE (career-best season, KC)
  ========================= */
  season2022: {
    year:  "2022",
    team:  "KC",
    level: "MLB",

    W:    10,
    L:    5,
    ERA:  3.23,
    era:  3.23,

    G:    27,
    GS:   27,
    IP:   153.1,     // DERIVED: ER×9/ERA = 55×9/3.23 ≈ 153.1
    ER:   55,
    WHIP: 1.14,
    whip: 1.14,
    K:    null
  },

  /* =========================
     CAREER — MLB totals
  ========================= */
  career: {
    W:    52,
    L:    59,
    ERA:  4.30,
    era:  4.30,
    G:    168,
    GS:   165,
    SV:   0,
    IP:   897.0,
    K:    836,
    WHIP: 1.326,
    whip: 1.326,
    K9:   8.4,       // 836×9/897 = 8.39
    BB9:  null,
    WAR:  11.8
  },

  /* =========================
     SCOUT — derived from 2026 snapshot
     kPercent and bbPercent in PERCENT (engine reads at PERCENT scale)
     Pass 68 convention: kPercent not kRate; values are whole-number percent
  ========================= */
  scout: {
    kPercent:     14.3,   // PERCENT — 28 K / 196 BF × 100 = 14.3% (well below MLB avg ~22%)
    bbPercent:     5.6,   // PERCENT — 11 BB / 196 BF × 100 = 5.6%
    kMinusBB:      8.7,   // kPercent - bbPercent
    whiff:        null,
    velocity:     null,
    spinRate:     null,
    groundBallPct: null   // historically ~52%; not available from current source
  },

  /* =========================
     ANALYST — normalized 0-1 trend signals
     xERA and xFIP stored as RAW ERA projections (engine normalizes)
     Pass 68 convention: xERA is raw ERA value, not normalized
  ========================= */
  analyst: {
    xERA:           4.80,  // RAW ERA projection — true talent estimate given career arc
    xFIP:           4.50,  // RAW FIP projection
    commandTrend:   0.55,  // BB rate acceptable but not elite (2.36 BB/9)
    velocityTrend:  null,
    swingMissTrend: 0.30,  // K/9 of 6.0 is well below MLB average — strikeout problem
    durabilityTrend: 0.65, // durable; 165 starts in 6 MLB seasons
    consistency:    0.35,  // the volatility issue — yo-yo career; current slump depresses
    injuryTrend:    0.75,  // no significant injury history; healthy frame
    platoonSplits:  null,
    contactTrend:   null
  }

}
