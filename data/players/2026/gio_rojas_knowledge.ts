/* =============================================================
   GIO ROJAS — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 23–25
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All pitch grades directly sourced from PDF (page 23, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   PITCHER tools: fastball, breaking, offspeed, command, control (20–80 scale)
   ============================================================= */

export const gio_rojas_knowledge = {

  age: 18,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'4\"",
      weight:  "190",
      bats:    "R",
      throws:  "L",
      school:  "Stoneman Douglas HS (Parkland, FL) — Senior"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.88,   // "#1 prep pitcher in 2026 class" — elite pitching archetype
      path: 0.78,   // Stoneman Douglas HS — elite FL prep program; "deep community resonance"
      frame: 0.85,  // 6'4" / 190 lbs — "projectable frame", "still physically maturing at 18"
      ath:  0.78,   // "athletic, repeatable delivery"; "clean mechanics" cited as secondary calling card
      proj: 0.90    // "projection for 96-100 mph in professional settings is considered realistic" (PDF p.23)
    },

    scout: {
      birthdate:   "2008",             // DOB year derived from age 18; exact date not in source
      signBonus:   "~$4.5–5.5M",       // SOURCE: derived from top-15 slot; no college commit (Stoneman Douglas)
      archetype:   "#1 prep pitcher — elite velo, 3-pitch starter projection",
      devPath:     "prep elite — Stoneman Douglas, Florida elite pipeline",
      frameScale:  "projectable — significant velocity upside remaining"
    },

    // DERIVED from PDF: "#1 Prep Pitcher — MLB Pipeline", "fastball touches 98 as HS senior",
    // "three-pitch mix separates him from two-pitch prep arms", Miami-area Marlins interest
    analystScores: {
      dev:      0.75,   // advanced for prep — "advanced command for a prep arm" cited
      risk:     0.48,   // moderate-high — prep pitcher; 3-5 year development timeline; health inherent
      value:    0.78,   // top-15 slot — strong; prep pitcher discount vs. college arms
      org:      0.82,   // high org priority for arms-focused organizations; frontline arm ceiling
      pedigree: 0.82    // "#1 Prep Pitcher MLB Pipeline", "#10 Overall MLB Pipeline", BA Top-15 (PDF p.23)
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard prep draftee options
      injuryIdx:   0.25,  // MODERATE — prep pitcher health baseline; arm not yet tested at professional level
      pedigree:    0.82,
      devCurve:    0.70,  // advanced command for prep age; prep pitchers have longest development curves
      orgValue:    0.82,  // very high for arms-focused orgs; frontline LHP scarcity adds premium
      assetRisk:   0.50,  // HIGH — prep pitcher + 3-5 year timeline + arm health = elevated asset risk
      longValue:   0.80   // strong if health holds — "frontline arm" ceiling with Stoneman Douglas platform
    }

  },


  /* =========================
     SCOUT (TOOLS — PITCHER)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["fastball", "slider"],        // 65 FB, 55-60 slider — two weapons at prep level
      roleType:            ["starter"],                   // "three-pitch mix strengthens starter projection"
      physicalProjection:  ["projectable", "velocity"],   // "96-100 mph in professional settings is realistic"
      riskProfile:         ["high"]                       // prep pitcher + health + 3-5 year timeline
    },

    // DIRECTLY SOURCED from PDF page 23-24 tool table
    scout: {
      fastball: 65,   // SOURCE: "65 FASTBALL" — 93-97 mph, touches 98; "extraordinary for prep lefthander"
      breaking: 58,   // SOURCE: "55-60 SLIDER" — "low-80s with significant horizontal sweep" (PDF p.23)
      offspeed: 45,   // SOURCE: "45+ CHANGEUP" — "currently grades as average but projects to above-average"
      command:  50,   // SOURCE: "50 COMMAND" — "advanced for a prep arm"; "throws strikes with all three"
      control:  null  // not separately graded from command
    },

    // DERIVED from PDF: "fastball sitting 93-97, touching 98", "plus low-80s slider",
    // "clean mechanics with athletic, repeatable delivery", "9/10 ceiling" (PDF p.24)
    analystScores: {
      ceiling:    0.90,  // "9/10 ceiling" — frontline starter projection; No. 2-3 starter (PDF p.23)
      floor:      0.45,  // floor gated by arm health and 3-5 year prep development timeline
      roleProb:   0.65,  // lower than college arms — prep development attrition is real
      skillTrend: 0.82,  // strong upward — "fastball climbs into mid-90s, slider becomes true weapon" by 2024
      volatility: 0.60,  // high — "high" health risk, prep timeline, all development uncertainties
      orgFit:     0.80,  // premium fit for arms-focused orgs; LHP upside adds premium
      riskTrend:  0.55   // elevated — prep pitcher health risk is persistent across development
    },

    analyst: {
      ceiling:    0.90,
      floor:      0.45,
      roleProb:   0.65,
      skillTrend: 0.82,
      volatility: 0.60,
      comparable: "Matt Krook / Patrick Sandoval early comp",  // SOURCE: PDF p.23 — "MLB Comps"
      orgFit:     0.80,
      riskTrend:  0.55
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "#10 overall (MLB Pipeline) — #1 prep pitcher",
      developmentPath:  "prep elite — Stoneman Douglas, Florida → professional development",
      orgInvestment:    "very high for arms-focused organizations",
      timelineSignal:   "long development"   // prep pitcher; 3-5 year realistic timeline to MLB
    },

    scout: {
      collegeStatus:     "prep",
      draftPedigree:     "Top-15",    // SOURCE: PDF p.23 — "Draft Projection: Top-15"
      projectionPath:    "frontline LHP starter — No. 2-3 rotation ceiling",
      orgCommitment:     "very high for the right org",
      topProspectStatus: "#1 Prep Pitcher MLB Pipeline; #10 Overall MLB Pipeline"
    },

    // DERIVED from PDF: 93-97 FB touching 98, plus slider, developing CU, advanced mechanics,
    // "if the command develops, you're looking at a frontline arm" (PDF p.23)
    analystScores: {
      timeline: 0.38,   // long development — prep pitcher; 3-5 year realistic MLB ETA from source
      peak:     0.90,   // "9/10 ceiling" — frontline LHP starter peak is maximum for pitching prospect
      path:     0.55,   // path is long and contingency-dependent — prep arm development attrition
      org:      0.82,   // very high priority for the right arm-focused organization
      value:    0.78,   // sustained value if health holds — LHP frontline arms command premium
      floor:    0.40,   // very low floor — prep pitcher without injury guarantee
      ceil:     0.90    // elite ceiling — "96-100 mph professional realistic" + plus slider = frontline
    },

    analyst: {
      amateurCeiling: 0.90,  // "frontline arm" — "if command develops, you're looking at a frontline arm"
                              // national scout (PDF p.23)
      draftValue:     0.80,  // top-15 slot; #10 Pipeline — strong for prep arm
      ascentSpeed:    0.40,  // slowest ascent in class — prep pitcher; 3-5 year minimum timeline
      setbacks:       0.50,  // moderate-high — prep pitcher health rate is the baseline concern
      recoveryTrack:  0.68,  // "highly coachable" equivalent — "clean mechanics, repeatable delivery"
      orgPatience:    0.90,  // orgs select prep pitchers knowing patience is required; maximum investment
      careerArc:      0.82,  // elite career arc if health and command both develop
      longView:       0.80   // strong long-term value — LHP frontline arms are the scarcest asset in baseball
    }

  }

}
