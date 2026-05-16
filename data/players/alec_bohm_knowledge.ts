export const alec_bohm_knowledge = {

  age: 27,
  mlbGames: 600,

  /* =========================
  BIO
  ========================= */

  bio:{

    snapshot:{
      height:"6'5",
      weight:"218",
      bats:"R",
      throws:"R",
      school:"Wichita State"
    },

    scoutScores:{
      arch:.68,     // power leaning
      path:.72,     // polished
      frame:.82,    // durable
      ath:.48,      // limited/adequate
      proj:.55      // moderate
    },

    scout:{
      birthdate:"1996-08-03",
      signBonus:"5.85M",
      archetype:"power contact bat",
      devPath:"college bat",
      frameScale:"large durable"
    },

    analystScores:{
      dev:.62,
      risk:.42,
      value:.74,
      org:.78,
      pedigree:.88
    },

    analyst:{
      serviceTime:3.120,
      options:1,
      injuryIdx:.72,
      pedigree:.88,
      devCurve:.66,
      orgValue:.74,
      assetRisk:.42,
      longValue:.70
    }

  },



  /* =========================
  SCOUT
  ========================= */

  scout:{

    snapshot:{
      primaryTool:["contact","power"],
      roleType:["starter"],
      physicalProjection:["solid"],
      riskProfile:["low"]
    },

    scout:{
      hit:60,
      power:55,
      run:40,
      arm:55,
      field:50
    },

    analystScores:{
      ceiling:.72,
      floor:.64,
      roleProb:.85,
      skillTrend:.60,
      volatility:.38,
      orgFit:.78,
      riskTrend:.42
    },

    analyst:{
      ceiling:.72,
      floor:.64,
      roleProb:.85,
      skillTrend:.60,
      volatility:.38,
      comparable:"Rhys Hoskins",
      orgFit:.78,
      riskTrend:.42
    }

  },



  /* =========================
  CAREER
  ========================= */

  career:{

    snapshot:{
      draftPedigree:"top 3 pick",
      developmentPath:"college bat",
      orgInvestment:"high",
      timelineSignal:"fast track"
    },

    scout:{
      collegeStatus:"college",
      draftPedigree:"top 3",
      projectionPath:"middle order bat",
      orgCommitment:"high",
      topProspectStatus:"top 20"
    },

    analystScores:{
      timeline:.72,
      peak:.66,
      path:.60,
      org:.78,
      value:.74,
      floor:.70,
      ceil:.68
    },

    analyst:{
      amateurCeiling:.80,
      draftValue:.85,
      ascentSpeed:.72,
      setbacks:.42,
      recoveryTrack:.68,
      orgPatience:.78,
      careerArc:.70,
      longView:.72
    }

  }

}