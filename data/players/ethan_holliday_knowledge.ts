export const ethan_holliday_knowledge = {

  age: 19,
  mlbGames: 0,

  /* =========================
  BIO
  ========================= */

  bio: {
    snapshot: {
      height: "6'2\"",
      weight: "210",
      bats: "L",
      throws: "R",
      school: "Fresno Grizzlies (A, COL)",
      hometown: "Tucson, AZ",
      state: "AZ",
      hsTeam: "Stillwater HS (OK)",
      // ─── DLR SCORING: categorical strings read by calculateDLR.scoreKnowledge (bioScout path) ───
      archetype:          "power",          // power-bat SS profile
      developmentPath:    "fast track",     // #4 overall, pro debut at 18
      physicalProjection: "projectable",    // 6'2 / 210 lbs — plus strength, still filling out
      riskProfile:        "moderate"        // youth + K rate, offset by elite pedigree
    },

    /* NEW: engine layer */
    scoutScores: {
      arch: 0.85,   // power-bat SS — premier archetype
      path: 0.80,   // fast-tracking through A-ball
      frame: 0.75,  // 6'2 / 210 — physical, strong, still projectable
      ath:  0.75,   // solid athleticism for SS
      proj: 0.90    // elite pedigree + pick #4 = maximum projection confidence
    },

    scout: {
      birthdate:    "2007-02-23",
      signBonus:    null,
      archetype:    "POWER_BAT_SS",
      devPath:      "FAST_TRACK_BLUE_CHIP",
      frameScale:   "PHYSICAL_PROJECTABLE"
    },

    /* NEW: engine layer */
    analystScores: {
      dev:      0.85,   // accelerating — ISO doubled in one pro season
      risk:     0.55,   // moderate — youth + K rate (29.8%) are real concerns
      value:    0.92,   // elite asset value — #4 pick with live power
      org:      0.65,   // COL system not historically strong in player dev
      pedigree: 0.95    // son of Matt (7x All-Star), brother of Jackson (MLB) — maximum
    },

    analyst: {
      serviceTime: 0,
      options:     4,
      injuryIdx:   0.95,   // no documented injuries
      pedigree:    0.95,   // elite bloodline: Matt Holliday / Jackson Holliday
      devCurve:    0.85,   // power surge (ISO .141→.268) tracking ahead of schedule
      orgValue:    0.65,   // COL org value — tempered by developmental history
      assetRisk:   0.55,   // youth and K rate are real; not alarming at 19
      longValue:   0.92,   // blue-chip ceiling; long-term asset
      // ─── DLR SCORING: categorical strings read by calculateDLR.scoreKnowledge (bioAnalyst path) ───
      value:       "elite",         // asset value 0.92 → elite
      orgRole:     "cornerstone",   // #4 pick / top prospect in system
      development: "accelerating",  // power surge confirms accelerating arc
      risk:        "moderate"       // K rate concern; youth; offset by pedigree
    }
  },



  /* =========================
  SCOUT (TOOLS)
  ========================= */

  scout: {
    snapshot: {
      primaryTool:         ["Power", "Hit", "Arm"],
      roleType:            ["Everyday SS", "Power Bat"],
      physicalProjection:  ["6'2 / 210 lbs frame", "Plus strength", "Athletic"],
      riskProfile:         ["High K rate", "Young for level"]
    },

    scout: {
      hit:       55,
      power:     65,
      run:       45,
      arm:       60,
      field:     55,
      overallFV: 60
    },

    /* NEW: engine layer */
    analystScores: {
      ceiling:    0.90,   // legitimate franchise-level ceiling
      floor:      0.55,   // contributor floor — K rate is the floor risk
      roleProb:   0.75,   // likely everyday SS if contact develops
      skillTrend: 0.80,   // power surge = real skill trend
      volatility: 0.55,   // moderate — youth creates variance
      orgFit:     0.65,   // COL system fit — developmental concern
      riskTrend:  0.55    // K rate elevated; BABIP normalized; stable risk arc
    },

    analyst: {
      ceiling:    0.90,
      floor:      0.55,
      roleProb:   0.75,
      skillTrend: 0.80,
      volatility: 0.55,
      orgFit:     0.65,
      riskTrend:  0.55,
      comparable: "Corey Seager / Anthony Volpe power profile"
    }
  },



  /* =========================
  CAREER
  ========================= */

  career: {
    snapshot: {
      draftPedigree:    "1st round, #4 overall (2025)",
      developmentPath:  "A-ball debut, on track",
      orgInvestment:    "Top prospect in COL system",
      timelineSignal:   "ETA 2027–2028"
    },

    scout: {
      collegeStatus:      "N/A — HS draftee",
      draftPedigree:      "1.4 — Elite",
      projectionPath:     "FAST_TRACK",
      orgCommitment:      "Cornerstone",
      topProspectStatus:  "Top-10 in MiLB"
    },

    /* NEW: engine layer */
    analystScores: {
      timeline: 0.85,   // fast track — on schedule vs. #4 pick expectation
      peak:     0.90,   // franchise-level peak potential
      path:     0.85,   // clear development path through COL system
      org:      0.65,   // COL developmental history tempers confidence
      value:    0.92,   // sustained elite asset value
      floor:    0.55,   // K rate is the floor risk
      ceil:     0.90    // 60 FV ceiling with legitimate upside
    },

    analyst: {
      amateurCeiling:  0.95,   // elite prep bat — maximum amateur ceiling
      draftValue:      0.95,   // #4 overall + power production = elite draft ROI
      ascentSpeed:     0.80,   // power surge suggests above-average ascent speed
      setbacks:        0.20,   // low setback probability — no injury history
      recoveryTrack:   0.85,   // strong recovery baseline given pedigree
      orgPatience:     0.85,   // #4 pick gets every developmental opportunity
      careerArc:       "Power SS w/ pedigree — franchise ceiling, legitimate floor risk",
      longView:        0.92
    }
  },

  /* =========================
  FAMILY PEDIGREE
  ========================= */
  family: {
    father: "Matt Holliday (MLB, 7x All-Star, 2 World Series rings)",
    brother: "Jackson Holliday (BAL, MLB)",
    uncle:   "Josh Holliday (Oklahoma State HC)"
  }

}
