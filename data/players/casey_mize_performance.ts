export const casey_mize_performance = {
  kind: "pitcher",

  snapshot: {
    year: "2025",
    g: 28,
    ip: 149.0,
    wL: "14-6",
    w: 14,
    l: 6,
    so: 139,
    h: 153,
    bb: 36,
    hr: 21,
    soBb: 3.86,
    whip: 1.27,
    era: 3.87,    // lowercase — preserved for IntelStack display (snap?.era)
    ERA: 3.87,    // uppercase — required by calculateDLR: readNumber(snapshot, "ERA")
    hrAllowed: 21
  },

  scout: {
    kPercent: 24.8,
    bbPercent: 6.1,
    kMinusBB: 18.7,
    avgEV: 89.4,
    whiff: 27.2
  },

  analyst: {
    xERA: 3.65,
    stuffPlus: 102,
    pitchMixGrade: 0.58,
    veloTrend: 0.55,
    commandTrend: 0.61,
    injuryTrend: 0.63,
    roleStability: 0.78,
    war: 2.4
  }
}
