/**
 * Pass 77 — 2026 AA Season Replay (2026-05-15)
 * Source: MiLB Stats API (player 807739, sport 12)
 * 6 starts replayed game-by-game through P60 pitcher cascade
 * Weekly DLR snapshots (W14-W19) written to Supabase tagged engine_version "P60"
 * April monthly settlement included (4 starts, ERA 0.482, avgΔ +0.20)
 * Tracker rolling windows seeded from real per-start computation
 * Final DLR: 76.5 (SOLID) — hot cache updated
 *
 * Pass 68 — Kade Anderson Performance (2026-05-14)
 * Source: Baseball Reference Register Pitching + Sports-Reference bio
 *
 * 2024: LSU freshman, mixed role (4-2, 3.99 ERA, 13.9 K/9, 38.1 IP)
 * 2025 anchor: LSU sophomore, full-time ace (12-1, 3.18 ERA, 180 K in 119.0 IP)
 *   ** 2025 CWS Most Outstanding Player — LSU national champion **
 * 2026 current: AA Arkansas debut (3-0, 0.60 ERA, 0.667 WHIP, 14.1 K/9 in 30.0 IP)
 * Career: 187.1 IP, 2.93 ERA, 13.7 K/9, 1.089 WHIP across 3 seasons
 *
 * Fast-track narrative: skipped A-ball entirely.
 * Lean build (6'2"/179) is the primary durability question.
 * LHP scarcity premium applies.
 *
 * UNIT CONVENTIONS:
 *   kPercent / bbPercent: stored as PERCENT (44.3, 4.7) — matches PITCHER_ANCHORS.K_pct (floor:15, ceiling:35)
 *   xERA: raw ERA projection value — engine normalizes against PITCHER_ANCHORS.xERA (floor:5.5, ceiling:2.5)
 *   ERA / WHIP: dual-keyed (era + ERA, whip + WHIP) per Pass 17
 */

export const kade_anderson_performance = {
  kind: "pitcher",

  /* =========================
     SNAPSHOT — 2026 current season (AA Arkansas Travelers, through 2026-05-14)
     PRIMARY SCORING LAYER
  ========================= */
  snapshot: {
    year:       "2026",
    team:       "Arkansas Travelers",
    level:      "AA",
    league:     "TL",
    parentClub: "SEA",

    W:   3,
    L:   0,
    ERA: 0.60,   // uppercase — calculateDLR: readNumber(snapshot, "ERA")
    era: 0.60,   // lowercase — IntelStack display
    RA9: 0.60,

    G:    6,
    GS:   6,
    CG:   0,
    SHO:  0,
    SV:   0,

    IP:  30.0,
    H:   15,
    R:    2,
    ER:   2,
    HR:   1,

    BB:   5,
    IBB:  0,
    K:   47,
    SO:  47,
    HBP:  1,
    WP:   0,
    BF:  106,

    WHIP: 0.667,  // uppercase — calculateDLR
    whip: 0.667,  // lowercase — display
    K9:   14.1,
    BB9:   1.5,
    HR9:   0.3,
    KBB:   9.40   // K/BB ratio (47/5)
  },

  /* =========================
     SEASON 2025 — LSU sophomore (CWS Champion ace)
     ANCHOR SEASON — primary baseline for delta computation
  ========================= */
  season2025: {
    year:     "2025",
    team:     "LSU",
    level:    "NCAA",

    W:   12,
    L:    1,
    ERA:  3.18,
    era:  3.18,
    RA9:  3.33,

    G:   19,
    GS:  19,
    CG:   2,
    SHO:  2,
    SV:   0,

    IP:  119.0,
    H:    91,
    R:    44,
    ER:   42,
    HR:   16,

    BB:   35,
    IBB:   0,
    K:   180,
    SO:  180,
    HBP:   5,
    WP:    5,
    BF:  481,

    WHIP: 1.059,
    whip: 1.059,
    K9:   13.6,
    BB9:   2.6,
    HR9:   1.2,
    KBB:   5.14,

    accolade: "2025 CWS Most Outstanding Player"
  },

  /* =========================
     SEASON 2024 — LSU freshman (mixed role, reference only)
     HISTORICAL BASELINE — NOT anchor
  ========================= */
  season2024: {
    year:    "2024",
    team:    "LSU",
    level:   "NCAA",

    W:   4,
    L:   2,
    ERA: 3.99,
    era: 3.99,
    RA9: 5.17,

    G:   18,
    GS:   9,   // mixed role — started roughly half
    CG:   0,
    SHO:  0,

    IP:  38.1,
    H:   38,
    R:   22,
    ER:  17,
    HR:   3,

    BB:  20,
    IBB:  1,
    K:   59,
    SO:  59,
    HBP:  7,
    WP:   6,
    BF:  174,

    WHIP: 1.513,
    whip: 1.513,
    K9:   13.9,
    BB9:   4.7,
    HR9:   0.7,
    KBB:   2.95
  },

  /* =========================
     CAREER — cumulative all levels through 2026-05-14
     3 seasons (2024 NCAA + 2025 NCAA + 2026 AA)
  ========================= */
  career: {
    W:   19,
    L:    3,
    ERA:  2.93,
    era:  2.93,

    G:   43,
    GS:  34,

    IP:  187.1,
    H:   144,
    R:    68,
    ER:   61,
    HR:   20,

    BB:  60,
    K:   286,
    SO:  286,

    WHIP: 1.089,
    whip: 1.089,
    K9:   13.7
  },

  /* =========================
     SCOUT — derived rates (2026 AA season)
     No Statcast at AA — counting-stat derivations only
     UNIT: kPercent + bbPercent stored as PERCENT to match PITCHER_ANCHORS.K_pct {floor:15, ceiling:35}
  ========================= */
  scout: {
    kPercent:   44.3,   // 47 K / 106 BF = 44.3% — off-the-charts elite; above 35% ceiling → clamps to 1.0
    bbPercent:   4.7,   // 5 BB / 106 BF = 4.7% — elite control; well inside ceiling of 4%
    kMinusBB:   39.6,   // kPercent − bbPercent = 39.6% — historically elite for any professional pitcher
    whiff:      null,   // Statcast not available at AA
    velocity:   null,   // velocity not reported for 2026 AA starts
    spinRate:   null,
    groundBallPct: null
  },

  /* =========================
     ANALYST — normalized trend signals + projections
     xERA stored as RAW ERA value — engine normalizes against PITCHER_ANCHORS.xERA {floor:5.5, ceiling:2.5}
  ========================= */
  analyst: {
    xERA:           2.80,  // raw ERA projection — regression-adjusted from 0.60 actual; elite floor
                           // normalizes: (5.5-2.8)/(5.5-2.5) = 2.7/3.0 = 0.90 score
    xFIP:           3.00,  // estimated from K/BB peripherals — HR-normalized projection
    commandTrend:   0.95,  // BB/9 dropped from 4.7 (2024) → 2.6 (2025) → 1.5 (2026 AA) — trajectory is elite
    velocityTrend:  null,
    swingMissTrend: 0.95,  // K/9 14.1 at AA — sustained elite swing-miss rate
    durabilityTrend: 0.75, // lean build (6'2"/179); only 30 IP at AA — durability still scaling
    consistency:    0.90,  // 6 dominant starts; small sample but consistent output
    injuryTrend:    0.85,  // no documented injury history; standard monitoring for lean LHP
    platoonSplits:  null,  // LHP advantage assumed but no data yet
    contactTrend:   null   // pitcher — N/A
  }
}
