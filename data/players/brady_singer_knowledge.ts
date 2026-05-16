/**
 * Pass 70 — Brady Singer Knowledge (2026-05-14)
 * RHP / SP / CIN Reds — 2018 R1 #18 overall (KC) from Univ. of Florida
 * Declined 2015 R2 TOR offer (HS). 6-year MLB veteran. Volatile mid-rotation arm.
 */

export const brady_singer_knowledge = {

  age: 29,
  mlbGames: 168,

  /* =========================
     BIO SUB-PAGE
  ========================= */
  bio: {
    snapshot: {
      height:    "6'5\"",
      weight:    215,
      bats:      "R",
      throws:    "R",
      school:    "Cincinnati Reds (MLB)",
      hometown:  "Leesburg, FL",
      state:     "FL",
      college:   "Univ. of Florida",
      hsTeam:    "Eustis HS (FL)",
      archetype: "mid-rotation sinker/slider RHP",
      developmentPath: "college → MLB debut 2020 → traded to CIN 2025",
      physicalProjection: "power build, durable 6'5 frame",
      riskProfile: "high year-to-year volatility; no major injury history"
    },

    scoutScores: {
      arch: 0.70,
      path: 0.65,
      frame: 0.75,
      ath:  0.65,
      proj: 0.60
    },

    scout: {
      birthdate:   "1996-08-04",
      signBonus:   null,
      archetype:   "MID_ROTATION_RHP",
      devPath:     "ESTABLISHED_VETERAN",
      frameScale:  "POWER_BUILD"
    },

    analystScores: {
      dev:      0.60,
      risk:     0.55,
      value:    0.55,
      org:      0.65,
      pedigree: 0.65
    },

    analyst: {
      serviceTime:  6,          // 2020–2025 = 6 full MLB seasons; options exhausted
      options:      0,
      injuryIdx:    0.75,       // no major injury history; durable frame
      pedigree:     0.65,
      devCurve:     0.55,       // identity settled; limited further development ceiling
      orgValue:     0.65,
      assetRisk:    0.55,
      longValue:    0.55,
      value:        "mid-rotation arm",
      orgRole:      "innings consumer",
      development:  "plateau",
      risk:         "high volatility — career yo-yo pattern established"
    }
  },

  /* =========================
     SCOUT SUB-PAGE
  ========================= */
  scout: {
    snapshot: {
      primaryTool:         ["Sinker", "Slider", "Command"],
      roleType:            ["#3/4 Starter", "Innings eater"],
      physicalProjection:  ["6'5\" / 215 lbs durable frame", "Repeatable mechanics"],
      riskProfile:         ["High volatility year-to-year", "Limited K upside (K/9 ~8.4 career)"]
    },

    scout: {
      fastball:   55,
      slider:     60,
      changeup:   45,
      command:    55,
      overallFV:  50
    },

    analystScores: {
      ceiling:    0.65,
      floor:      0.55,
      roleProb:   0.85,
      skillTrend: 0.45,     // declining in 2026; K rate below career average
      volatility: 0.75,     // high — career yo-yo pattern
      orgFit:     0.65,
      riskTrend:  0.55
    },

    analyst: {
      ceiling:    0.65,
      floor:      0.55,
      roleProb:   0.85,
      skillTrend: 0.45,
      volatility: 0.75,
      orgFit:     0.65,
      riskTrend:  0.55,
      comparable: "Kyle Hendricks / soft-contact RHP with sinker emphasis — groundball-first profile"
    }
  },

  /* =========================
     CAREER SUB-PAGE
  ========================= */
  career: {
    snapshot: {
      draftPedigree:      "1st round, #18 overall (2018, KC) from Univ. of Florida",
      priorDraft:         "2015 R2 TOR (Eustis HS) — declined to attend Florida",
      developmentPath:    "MLB debut 2020, traded to CIN after 2024 season",
      orgInvestment:      "Mid-rotation arm",
      timelineSignal:     "In prime years (age 29)"
    },

    scout: {
      collegeStatus:       "Drafted from Florida — declined 2015 Toronto R2 offer",
      draftPedigree:       "1.18 — Solid; strong college track record at UF",
      projectionPath:      "MID_ROTATION_ARM",
      orgCommitment:       "Innings consumer",
      topProspectStatus:   "Veteran — no prospect status"
    },

    analystScores: {
      timeline: 0.70,
      peak:     0.55,
      path:     0.55,
      org:      0.65,
      value:    0.55,
      floor:    0.55,
      ceil:     0.65
    },

    analyst: {
      amateurCeiling:  0.70,
      draftValue:      0.65,
      ascentSpeed:     0.65,
      setbacks:        0.55,
      recoveryTrack:   0.55,
      orgPatience:     0.60,
      careerArc:       "Volatile mid-rotation starter — yo-yo career arc (3.23 peak / 5.52 collapse / 3.71 recovery / 4.03 CIN year / 5.79 current slump)",
      longView:        0.55
    }
  }

}
