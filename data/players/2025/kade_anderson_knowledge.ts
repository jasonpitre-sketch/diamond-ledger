/**
 * Pass 68 — Kade Anderson Knowledge (2026-05-14)
 * Source: Baseball Reference + Sports-Reference bio
 *
 * LHP, SP — 2025 R1 #3 overall (SEA) from LSU
 * 2025 CWS Most Outstanding Player — LSU national champion ace
 * Pro debut: AA Arkansas Travelers (SEA) — skipped A-ball entirely
 * Fast-track narrative: dominance at every level, elite K/BB profile
 */

export const kade_anderson_knowledge = {
  age: 21,
  mlbGames: 0,

  bio: {
    snapshot: {
      height:              "6'2\"",
      weight:              179,
      bats:                "L",
      throws:              "L",
      school:              "Arkansas Travelers (AA, SEA)",
      hometown:            "Slidell, LA",
      state:               "LA",
      college:             "LSU (Baton Rouge, LA)",
      archetype:           "strikeout starter",
      developmentPath:     "fast track",
      physicalProjection:  "athletic lean",
      riskProfile:         "moderate"   // lean build durability concern; otherwise low risk
    },
    scoutScores: {
      arch: 0.85,
      path: 0.95,   // fast-track — skipped A-ball, AA dominance
      frame: 0.70,  // lean 6'2"/179 — durability question mark
      ath:   0.80,
      proj:  0.90
    },
    scout: {
      birthdate:   "2004-07-06",
      signBonus:   null,
      archetype:   "LHP_STRIKEOUT_STARTER",
      devPath:     "FAST_TRACK_BLUE_CHIP",
      frameScale:  "ATHLETIC_LEAN"
    },
    analystScores: {
      dev:      0.95,  // dominant at every level; fast-track confirmed
      risk:     0.45,  // lean build is the primary concern; no injury history
      value:    0.92,
      org:      0.78,  // SEA has elite pitching development infrastructure
      pedigree: 0.95   // CWS MOP + #3 overall — bloodlines of excellence
    },
    analyst: {
      serviceTime:   0,
      options:       4,
      injuryIdx:     0.85,
      pedigree:      0.95,   // CWS MOP — 2025 national champion ace
      devCurve:      0.95,   // fastest development curve on 2025 draft class
      orgValue:      0.78,   // SEA pitching development reputation adds value
      assetRisk:     0.45,
      longValue:     0.92,
      value:         "elite",
      orgRole:       "cornerstone",
      development:   "accelerating",
      risk:          "moderate"
    }
  },

  scout: {
    snapshot: {
      primaryTool:         ["Fastball", "Slider", "Command"],
      roleType:            ["#2 Starter", "Strike-throwing ace"],
      physicalProjection:  ["6'2 / 179 lbs lean frame", "Repeatable mechanics", "Athletic"],
      riskProfile:         ["Lean build durability", "TJ risk profile typical for amateur arm"]
    },
    scout: {
      fastball:   60,
      slider:     65,
      changeup:   55,
      command:    60,
      overallFV:  60
    },
    analystScores: {
      ceiling:    0.92,
      floor:      0.65,
      roleProb:   0.85,
      skillTrend: 0.95,
      volatility: 0.45,
      orgFit:     0.78,
      riskTrend:  0.45
    },
    analyst: {
      ceiling:    0.92,
      floor:      0.65,
      roleProb:   0.85,
      skillTrend: 0.95,
      volatility: 0.45,
      orgFit:     0.78,
      riskTrend:  0.45,
      comparable: "Chris Sale / Cole Ragans LHP strikeout profile"
    }
  },

  career: {
    snapshot: {
      draftPedigree:    "1st round, #3 overall (2025)",
      developmentPath:  "Skipped A-ball — straight to AA",
      orgInvestment:    "Mariners top prospect",
      timelineSignal:   "ETA 2027"
    },
    scout: {
      collegeStatus:     "Drafted from LSU (2025 CWS Champion)",
      draftPedigree:     "1.3 — Elite",
      projectionPath:    "FAST_TRACK",
      orgCommitment:     "Cornerstone arm",
      topProspectStatus: "Top-15 in MiLB"
    },
    analystScores: {
      timeline: 0.90,
      peak:     0.92,
      path:     0.95,
      org:      0.78,
      value:    0.92,
      floor:    0.65,
      ceil:     0.92
    },
    analyst: {
      amateurCeiling:  0.95,
      draftValue:      0.95,
      ascentSpeed:     0.95,  // fastest ascent on 2025 class — AA at 21 out of the gate
      setbacks:        0.20,
      recoveryTrack:   0.85,
      orgPatience:     0.85,
      careerArc:       "CWS hero → fast-track AA dominance → potential MLB ETA 2027",
      longView:        0.92
    }
  }
}
