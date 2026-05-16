/**
 * Pass 81 — Tyler Bremner 2026 High-A Replay (2026-05-15)
 * Source: MiLB Stats API (player 803285, sport 13)
 * 5 starts replayed game-by-game through P60 pitcher cascade
 * Weekly DLR snapshots W14-W19 written to Supabase tagged engine_version "P60"
 * April monthly settlement included
 */
export const tyler_bremner_performance = {
  kind: "pitcher" as const,
  competitionLevel: "A+",

  snapshot: {
    year: "2026",
    team: "Tri-City Dust Devils",
    level: "A+",
    league: "NWL",
    parentClub: "LAA",

    W: 0,
    L: 1,
    ERA: 1.50,
    era: 1.50,
    RA9: 2.00,

    G: 5,
    GS: 5,
    CG: 0,
    SHO: 0,
    SV: 0,

    IP: 18.0,
    H: 14,
    R: 4,
    ER: 3,
    HR: 1,
    BB: 6,
    IBB: 0,
    K: 28,
    SO: 28,
    HBP: 0,
    BF: 70,

    WHIP: 1.111,
    whip: 1.111,
    K9: 14.0,
    BB9: 3.0,
    HR9: 0.5,
    KBB: 4.67
  },

  season2025: {
    year: "2025",
    team: "UC Santa Barbara",
    level: "NCAA",
    W: 5,
    L: 4,
    ERA: 3.49,
    era: 3.49,
    G: 14,
    GS: 14,
    IP: 77.1,
    H: 60,
    R: 32,
    ER: 30,
    HR: 5,
    BB: 19,
    K: 111,
    SO: 111,
    WHIP: 1.02,
    whip: 1.02,
    K9: 12.9,
    BB9: 2.2,
    KBB: 5.84
  },

  scout: {
    kPercent: 40.0,
    bbPercent: 8.6,
    kMinusBB: 31.4,
    whiff: null,
    velocity: null,
    spinRate: null,
    groundBallPct: null
  },

  analyst: {
    xERA: 3.20,
    xFIP: 3.35,
    commandTrend: 0.68,
    velocityTrend: null,
    swingMissTrend: 0.86,
    durabilityTrend: 0.58,
    consistency: 0.74,
    injuryTrend: 0.74,
    platoonSplits: null,
    contactTrend: null
  }
}
