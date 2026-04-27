export const eli_willits_knowledge = {

  age: 18,
  mlbGames: 0,

  /* =========================
  BIO
  ========================= */

  bio:{
    snapshot:{
      height:"6'1",
      weight:"180",
      bats:"S",
      throws:"R",
      school:"Fort Cobb-Broxton HS"
    },

    /* NEW: engine layer */
    scoutScores:{
      arch:.58,     // balanced (contact/speed mix)
      path:.65,     // progressing (advanced HS)
      frame:.45,    // lean/projectable
      ath:.72,      // dynamic
      proj:.82      // high projection
    },

    scout:{
      birthdate:"2007-12-09",
      signBonus:"8.2M",
      archetype:"athletic contact SS",
      devPath:"high school advanced",
      frameScale:"projectable lean"
    },

    /* NEW: engine layer */
    analystScores:{
      dev:.72,        // accelerating
      risk:.42,       // moderate-low
      value:.82,      // strong
      org:.85,        // priority
      pedigree:.92
    },

    analyst:{
      serviceTime:0,
      options:3,
      injuryIdx:.08,
      pedigree:.92,
      devCurve:.78,
      orgValue:.85,
      assetRisk:.42,
      longValue:.81
    }
  },



  /* =========================
  SCOUT (TOOLS)
  ========================= */

  scout:{
    snapshot:{

      primaryTool:["contact","speed"],

      roleType:["starter","impact"],

      physicalProjection:["projectable"],

      riskProfile:["moderate"]

    },

    scout:{
      hit:60,
      power:50,
      run:60,
      arm:55,
      field:55
    },

    /* NEW: engine layer */
    analystScores:{
      ceiling:.82,       // impact → fringe franchise
      floor:.58,         // contributor
      roleProb:.74,      // plausible → likely
      skillTrend:.72,    // improving
      volatility:.48,    // moderate
      orgFit:.86,        // ideal leaning
      riskTrend:.44      // steady
    },

    analyst:{
      ceiling:.82,
      floor:.58,
      roleProb:.74,
      skillTrend:.62,
      volatility:.48,
      comparable:"Dansby Swanson",
      orgFit:.86,
      riskTrend:.44
    }
  },



  /* =========================
  CAREER
  ========================= */

  career:{
    snapshot:{
      draftPedigree:"1st overall",
      developmentPath:"prep elite",
      orgInvestment:"high",
      timelineSignal:"fast track"
    },

    scout:{
      collegeStatus:"HS",
      draftPedigree:"1-1",
      projectionPath:"everyday SS",
      orgCommitment:"very high",
      topProspectStatus:"top 10 overall"
    },

    /* NEW: engine layer */
    analystScores:{
      timeline:.48,   // fast → normal edge
      peak:.65,       // mid → late leaning
      path:.58,       // volatile (prospect)
      org:.86,        // accelerated
      value:.88,      // sustained → elite
      floor:.55,      // contributor
      ceil:.82        // likely → max edge
    },

    analyst:{
      amateurCeiling:.88,
      draftValue:.91,
      ascentSpeed:.63,
      setbacks:.18,
      recoveryTrack:.72,
      orgPatience:.84,
      careerArc:.79,
      longView:.83
    }
  }

}