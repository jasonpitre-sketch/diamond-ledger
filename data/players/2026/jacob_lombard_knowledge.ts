/* =============================================================
   JACOB LOMBARD — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 17–18
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All tool grades directly sourced from PDF (page 17, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   HITTER tools: hit, power, run, arm, field (20–80 scale)
   ============================================================= */

export const jacob_lombard_knowledge = {

  age: 18,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'3\"",
      weight:  "185",
      bats:    "R",
      throws:  "R",
      school:  "Gulliver Prep (Miami, FL) — Senior"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.85,   // "most fascinating and polarizing prospect in 2026 class" — elite upside archetype
      path: 0.88,   // bloodline pedigree — father George Sr. (MLB), brother George Jr. (Yankees 2023 1st Rd)
      frame: 0.82,  // 6'3" / 185 lbs — "built to stick at SS long-term"; athletic standard with projection
      ath:  0.92,   // 6.11s 60-yard dash (2nd fastest at PG National 2025 among 226 runners)
      proj: 0.78    // physical projection remaining at 18; frame still developing
    },

    scout: {
      birthdate:   "2008",             // DOB year derived from age 18; exact date not in source
      signBonus:   "~$5.0–6.0M",       // SOURCE: derived from top-12 slot; Miami commit provides leverage
      archetype:   "elite-tools SS — swing/miss risk, bloodline pedigree",
      devPath:     "prep elite — multi-sport athlete, baseball family",
      frameScale:  "pro-standard frame"
    },

    // DERIVED from PDF: "son of George Lombard Sr.", "brother George Lombard Jr. Yankees 2023 1st Rd",
    // "most fascinating prospect in class", "could go anywhere from top-5 to outside top-20"
    analystScores: {
      dev:      0.78,   // "immersed in professional baseball culture", "advanced understanding beyond years"
      risk:     0.48,   // moderate-high — 39% swing/miss rate across two summers is real risk
      value:    0.78,   // top-12 slot; Miami commit leverage; polarizing = wide draft range
      org:      0.78,   // high for ceiling-first orgs; polarizing for contact-first orgs
      pedigree: 0.92    // highest possible prep pedigree — father MLB, brother 2023 Yankees 1st Rd (PDF p.17)
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard prep draftee options
      injuryIdx:   0.08,  // low — no injury flags; multi-sport elite athlete implies durability
      pedigree:    0.92,
      devCurve:    0.72,  // advanced understanding of game; contact rate is the development question
      orgValue:    0.78,  // premium for ceiling-first orgs; discount for contact-first orgs
      assetRisk:   0.48,  // moderate-high — 39% swing/miss is the defining risk; bloodline is de-risker
      longValue:   0.78   // "superstar or what could have been" — long-term value is binary (PDF p.17)
    }

  },


  /* =========================
     SCOUT (TOOLS)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["run", "power", "field"],    // 65 run, 60 power, elite SS defense
      roleType:            ["starter"],                   // "impact player" regardless of contact; "built to stick at SS"
      physicalProjection:  ["athletic", "projectable"],   // "body control to make plays from multiple angles"
      riskProfile:         ["high"]                       // "39% swing/miss — the defining concern" (PDF p.17)
    },

    // DIRECTLY SOURCED from PDF page 17 tool table
    scout: {
      hit:   45,   // SOURCE: "45 HIT" — tool table, PDF p.17; "HIGH SWING&MISS" notation in tool table
      power: 60,   // SOURCE: "60 POWER" — "Pipeline grades his raw power at 60" (PDF p.17); 106.8 mph EV
      run:   65,   // SOURCE: "65 RUN" — "6.11 sec 60-yard dash"; 2nd fastest at PG National 2025
      field: 60,   // SOURCE: "60 FIELD" — "elite shortstop defense"; range, hands, footwork all grade
      arm:   55    // SOURCE: "55 ARM" — "77 mph infield velocity — above average" (PDF p.17)
    },

    // DERIVED from PDF: 6.11s 60-yd (elite), 81.9 mph bat speed, 106.8 mph EV,
    // "38-39% swing/miss across two tracked summers", 77 mph infield velocity
    analystScores: {
      ceiling:    0.92,  // "9/10 ceiling" (PDF p.17); "Wander Franco ceiling" comp — elite
      floor:      0.45,  // floor constrained by 45 hit tool — "what could have been" is explicit risk
      roleProb:   0.65,  // below average for top-12 — contact question is real gating factor
      skillTrend: 0.68,  // positive tools trend; contact rate has not improved across two summers
      volatility: 0.65,  // "could go anywhere from top-5 to outside top-20" (PDF p.17) — explicit volatility
      orgFit:     0.72,  // polarizing — ceiling-first orgs love it; contact-first orgs discount heavily
      riskTrend:  0.65   // elevated risk — swing/miss hasn't improved across two tracked summers
    },

    analyst: {
      ceiling:    0.92,
      floor:      0.45,
      roleProb:   0.65,
      skillTrend: 0.68,
      volatility: 0.65,
      comparable: "Wander Franco ceiling / high-variance profile",  // SOURCE: PDF p.17 — "MLB Comps"
      orgFit:     0.72,
      riskTrend:  0.65
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "Top-12 — could be top-5 or outside top-20 (widest range in class)",
      developmentPath:  "prep elite — multi-sport athlete, professional baseball family",
      orgInvestment:    "high for the right org",
      timelineSignal:   "standard prep"   // prep senior — longer arc than college
    },

    scout: {
      collegeStatus:     "prep",
      draftPedigree:     "Top-12",   // SOURCE: PDF p.17 — "Proj. Pick: Top-12"
      projectionPath:    "everyday SS — superstar ceiling; contact development is key gating factor",
      orgCommitment:     "high for ceiling-first organizations",
      topProspectStatus: "#7 overall MLB Pipeline — #1 SS in Florida"
    },

    // DERIVED from PDF: father George Sr. ML bench coach, brother George Jr. Yankees top-100,
    // "legitimate chance to be drafted higher than both of them", Wander Franco ceiling comp
    analystScores: {
      timeline: 0.50,   // standard prep — longer arc; contact development is the key speed variable
      peak:     0.92,   // "Wander Franco ceiling" — near-maximum prep prospect peak
      path:     0.55,   // path is clouded — contact question is the defining development challenge
      org:      0.78,   // high for ceiling-first orgs; discounted broadly due to swing/miss
      value:    0.75,   // sustained value if contact develops; limited if it doesn't
      floor:    0.42,   // lowest floor in elite tier — "what could have been" is explicit scenario
      ceil:     0.92    // highest ceiling in class outside Roch — "Wander Franco ceiling" (PDF p.17)
    },

    analyst: {
      amateurCeiling: 0.92,  // "9/10 ceiling" — "loudest tools in the class" (PDF p.17)
      draftValue:     0.78,  // top-12 slot; wide range reflects polarizing evaluation
      ascentSpeed:    0.55,  // contact development is unpredictable; ascent speed is tool-dependent
      setbacks:       0.48,  // moderate — swing/miss across two summers is persistent signal
      recoveryTrack:  0.72,  // "pro coaching can improve contact rate" is the investment thesis (PDF p.17)
      orgPatience:    0.82,  // ceiling-first orgs select on patience; professional baseball family = advantage
      careerArc:      0.78,  // elite arc if contact unlocks; "what could have been" if it doesn't
      longView:       0.72   // long-term value is most binary in the class — extreme bimodal outcomes
    }

  }

}
