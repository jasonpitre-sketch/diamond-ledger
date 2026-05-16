/**
 * Pass 79 — 2026 MLB Season Replay (2026-05-15)
 * Source: MLB Stats API (sport 1, player 668930)
 * 38 games replayed game-by-game through P60 hitter cascade
 * Weekly DLR snapshots W13-W20 written to Supabase tagged engine_version "P60"
 * April monthly settlement included
 * Tracker rolling windows seeded from real per-game computation
 *
 * Narrative arc: Gold/Platinum Glove regular becoming a complete offensive
 * contributor — .298 / .422 / .511 with 6 HR, 8 SB, and 31 BB through May 14.
 *
 * Second full MLB hitter replay in production.
 */
export const brice_turang_performance = {
  kind: "hitter",
  competitionLevel: "MLB",

  /* =========================
     SNAPSHOT (2025 season anchor)
     Engine reads: AVG only. All other fields display context.
  ========================= */
  snapshot: {
    year: "2025",
    team: "MIL",

    g: 156,
    ab: 584,
    r: 97,
    h: 168,
    rbi: 81,
    bb: 66,
    k: 150,

    avg: 0.288,
    AVG: 0.288,
    obp: 0.359,
    slg: 0.435,
    ops: 0.794,

    hr: 18,
    doubles: 28,
    triples: 2,
    sb: 24,
    sbAttempts: 32
  },

  season2025: {
    year: "2025",
    team: "MIL",
    g: 156,
    ab: 584,
    r: 97,
    h: 168,
    rbi: 81,
    bb: 66,
    k: 150,
    avg: 0.288,
    AVG: 0.288,
    obp: 0.359,
    slg: 0.435,
    ops: 0.794,
    hr: 18,
    sb: 24
  },

  season2026: {
    year: "2026",
    team: "MIL",
    g: 38,
    ab: 141,
    r: 33,
    h: 42,
    rbi: 27,
    bb: 31,
    k: 35,
    sb: 8,
    avg: 0.298,
    AVG: 0.298,
    obp: 0.422,
    slg: 0.511,
    ops: 0.933,
    hr: 6
  },

  careerLine: {
    g: 486,
    ab: 1688,
    r: 248,
    h: 440,
    rbi: 199,
    bb: 185,
    k: 384,
    avg: 0.261,
    hr: 37,
    sb: 108,
    obp: 0.331,
    slg: 0.381,
    ops: 0.712
  },

  /* =========================
     SCOUT (prior-year static layer)
  ========================= */
  scout: {
    kRate: 22.8,
    bbRate: 10.0,
    barrel: 5.2,
    hardHit: 35.0,
    avgEV: 87.0
  },

  /* =========================
     ANALYST (trend signals)
  ========================= */
  analyst: {
    xAVG: 0.275,
    xSLG: 0.430,
    plateDiscTrend: 0.82,
    contactTrend: 0.70,
    injuryTrend: 0.84,
    sprintTrend: 0.88,
    posValue: 0.82,
    consistency: 0.76
  }
}
