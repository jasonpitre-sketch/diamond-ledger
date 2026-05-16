export const brice_turang_knowledge = {

  age: 26,
  mlbGames: 486,

  /* =========================
  BIO
  ========================= */

  bio: {

    snapshot: {
      height: "6'0\"",
      weight: "190",
      bats: "L",
      throws: "R",
      school: "Santiago HS (CA)"
    },

    scoutScores: {
      arch: .74,
      path: .78,
      frame: .66,
      ath: .90,
      proj: .76
    },

    scout: {
      birthdate: "1999-11-21",
      signBonus: "3.41M",
      archetype: "speed-defense middle infielder",
      devPath: "high school first rounder",
      frameScale: "lean athletic"
    },

    analystScores: {
      dev: .84,
      risk: .30,
      value: .82,
      org: .88,
      pedigree: .82
    },

    analyst: {
      serviceTime: 2.045,
      options: 0,
      injuryIdx: .84,
      pedigree: .82,
      devCurve: .86,
      orgValue: .88,
      assetRisk: .30,
      longValue: .82
    }

  },

  /* =========================
  SCOUT
  ========================= */

  scout: {

    snapshot: {
      primaryTool: ["speed", "defense", "contact"],
      roleType: ["starter"],
      physicalProjection: ["stable"],
      riskProfile: ["low"]
    },

    scout: {
      hit: 60,
      power: 45,
      run: 70,
      arm: 55,
      field: 70
    },

    analystScores: {
      ceiling: .74,
      floor: .72,
      roleProb: .88,
      skillTrend: .82,
      volatility: .34,
      orgFit: .88,
      riskTrend: .30
    },

    analyst: {
      ceiling: .74,
      floor: .72,
      roleProb: .88,
      skillTrend: .82,
      volatility: .34,
      comparable: "Andres Gimenez",
      orgFit: .88,
      riskTrend: .30
    }

  },

  /* =========================
  CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree: "first round pick",
      developmentPath: "high school bat",
      orgInvestment: "high",
      timelineSignal: "regular MLB role"
    },

    scout: {
      collegeStatus: "high school",
      draftPedigree: "round 1",
      projectionPath: "up-the-middle regular",
      orgCommitment: "high",
      topProspectStatus: "top 100"
    },

    analystScores: {
      timeline: .80,
      peak: .76,
      path: .82,
      org: .88,
      value: .82,
      floor: .78,
      ceil: .74
    },

    analyst: {
      amateurCeiling: .82,
      draftValue: .80,
      ascentSpeed: .76,
      setbacks: .28,
      recoveryTrack: .80,
      orgPatience: .88,
      careerArc: .82,
      longView: .82
    }

  }

}
