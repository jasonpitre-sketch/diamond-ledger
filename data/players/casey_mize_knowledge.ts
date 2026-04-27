export const casey_mize_knowledge = {

  age: 28,
  mlbGames: 120,

  /* =========================
  BIO
  ========================= */

  bio:{

    snapshot:{
      height:"6'3",
      weight:"215",
      bats:"R",
      throws:"R",
      school:"Auburn"
    },

    /* NEW: numeric layer for engine */
    scoutScores:{
      arch:.62,     // balanced
      path:.82,     // polished leaning
      frame:.74,    // solid/durable
      ath:.52,      // adequate
      proj:.38      // moderate (no longer high)
    },

    scout:{
      birthdate:"1997-05-01",
      signBonus:"7.5M",
      archetype:"command split ace",
      devPath:"college polished",
      frameScale:"solid durable"
    },

    /* NEW: numeric layer for engine */
    analystScores:{
      dev:.45,        // steady
      risk:.48,       // moderate
      value:.78,      // strong
      org:.80,        // priority
      pedigree:.91
    },

    analyst:{
      serviceTime:4.062,
      options:0,
      injuryIdx:.42,
      pedigree:.91,
      devCurve:.64,
      orgValue:.72,
      assetRisk:.48,
      longValue:.69
    }

  },



  /* =========================
  SCOUT (TOOLS)
  ========================= */

  scout:{

    snapshot:{

      primaryTool:[
        "movement",
        "command"
      ],

      roleType:[
        "starter"
      ],

      physicalProjection:[
        "solid"
      ],

      riskProfile:[
        "moderate"
      ]

    },

    scout:{
      fastball:60,
      slider:55,
      splitter:70,
      command:65,
      overallFV:60
    },

    /* NEW: numeric layer for engine */
    analystScores:{
      ceiling:.78,
      floor:.55,
      roleProb:.71,
      skillTrend:.58,
      volatility:.52,
      orgFit:.80,
      riskTrend:.49
    },

    analyst:{
      ceiling:.78,
      floor:.55,
      roleProb:.71,
      skillTrend:.58,
      volatility:.52,
      comparable:"Kevin Gausman",
      orgFit:.80,
      riskTrend:.49
    }

  },



  /* =========================
  CAREER
  ========================= */

  career:{

    snapshot:{
      draftPedigree:"1st overall",
      developmentPath:"college ace",
      orgInvestment:"high",
      timelineSignal:"fast track"
    },

    scout:{
      collegeStatus:"college",
      draftPedigree:"1-1",
      projectionPath:"frontline starter",
      orgCommitment:"high",
      topProspectStatus:"top 10 overall"
    },

    /* NEW: numeric layer for engine */
    analystScores:{
      timeline:.60,   // normal (not fast anymore)
      peak:.58,       // mid
      path:.52,       // volatile leaning
      org:.80,        // steady / strong org backing
      value:.82,      // sustained/strong
      floor:.78,      // core
      ceil:.56        // likely (not max)
    },

    analyst:{
      amateurCeiling:.89,
      draftValue:.90,
      ascentSpeed:.71,
      setbacks:.36,
      recoveryTrack:.66,
      orgPatience:.78,
      careerArc:.68,
      longView:.72
    }

  }

}