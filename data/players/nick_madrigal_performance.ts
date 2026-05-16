/**
 * Pass 83 — 2026 MiLB Season Replay (2026-05-15)
 * Source: MLB Stats API (sport 11, player 663611)
 * 30 games replayed game-by-game through P60 hitter cascade.
 * Weekly DLR snapshots W13-W20 seeded from Triple-A game logs.
 */
export const nick_madrigal_performance = {
  kind: "hitter",
  competitionLevel: "AAA",

  snapshot: {
    year: "2025",
    team: "LAA",
    g: 53,
    ab: 107,
    r: 13,
    h: 22,
    rbi: 10,
    bb: 7,
    k: 6,
    avg: 0.206,
    AVG: 0.206,
    obp: 0.262,
    slg: 0.252,
    ops: 0.514,
    hr: 0,
    doubles: 5,
    triples: 0,
    sb: 6,
    sbAttempts: 7
  },

  season2025: {
    year: "2025",
    team: "LAA",
    g: 53,
    ab: 107,
    r: 13,
    h: 22,
    rbi: 10,
    bb: 7,
    k: 6,
    avg: 0.206,
    AVG: 0.206,
    obp: 0.262,
    slg: 0.252,
    ops: 0.514,
    hr: 0,
    sb: 6
  },

  season2026: {
    year: "2026",
    team: "SL",
    g: 30,
    ab: 111,
    r: 16,
    h: 30,
    rbi: 16,
    bb: 14,
    k: 6,
    sb: 3,
    avg: 0.270,
    AVG: 0.270,
    obp: 0.351,
    slg: 0.333,
    ops: 0.684,
    hr: 0
  },

  careerLine: {
    g: 309,
    ab: 934,
    r: 97,
    h: 256,
    rbi: 75,
    bb: 38,
    k: 82,
    avg: 0.274,
    hr: 4,
    sb: 20,
    obp: 0.323,
    slg: 0.344,
    ops: 0.667
  },

  scout: {
    kRate: 5.5,
    bbRate: 10.7,
    barrel: 1.8,
    hardHit: 27.0,
    avgEV: 84.5
  },

  analyst: {
    xAVG: 0.265,
    xSLG: 0.335,
    plateDiscTrend: 0.76,
    contactTrend: 0.84,
    injuryTrend: 0.50,
    sprintTrend: 0.54,
    posValue: 0.52,
    consistency: 0.62
  }
}
