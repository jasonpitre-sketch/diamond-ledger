export const eli_willits_performance = {
  kind: "hitter",

  snapshot: {
    year: "2025",
    team: "WSH",
    pa: 57,
    g: null,
    ab: 50,
    h: 15,
    doubles: 0,
    triples: 0,
    avg: 0.300,   // lowercase — preserved for IntelStack display (snap?.avg)
    AVG: 0.300,   // uppercase — required by calculateDLR: readNumber(snapshot, "AVG")
    obp: 0.386,
    hr: 0,
    rbi: 5,
    runs: 0,
    bb: 7,
    k: 12,
    slg: 0.300,
    ops: 0.757,
    sb: 2,
    sbAttempts: 2
  },

  scout: {
    kRate: 14.2,
    bbRate: 13.4,
    barrel: 9.1,
    hardHit: 44.8,
    avgEV: 90.6
  },

  analyst: {
    xAVG: 0.292,
    xSLG: 0.487,
    plateDiscTrend: 0.71,
    contactTrend: 0.78,
    injuryTrend: 0.88,
    sprintTrend: 0.74,
    posValue: 0.81,
    consistency: 0.69
  }
}
