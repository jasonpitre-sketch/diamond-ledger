/* =============================================================
   DREW BURRESS — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 19–20
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All tool grades directly sourced from PDF (page 19, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   HITTER tools: hit, power, run, arm, field (20–80 scale)
   ============================================================= */

export const drew_burress_knowledge = {

  age: 21,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "5'9\"",
      weight:  "185",
      bats:    "R",
      throws:  "R",
      school:  "Georgia Tech (Sophomore)"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.80,   // "rare 5'9" player scouts label as legitimate first-round pick" — elite production archetype
      path: 0.82,   // Georgia Tech — elite ACC program; same program as Lackey (GT catcher legacy)
      frame: 0.52,  // 5'9" / 185 lbs — "prototype concern" acknowledged; Mookie Betts size comp
      ath:  0.72,   // "instincts and route running praised"; "solid-average runner"; 10 outfield assists
      proj: 0.55    // limited physical projection at 21; what you see is largely what you get
    },

    scout: {
      birthdate:   "2005",             // DOB year derived from age 21; exact date not in source
      signBonus:   "~$5.0–6.0M",       // SOURCE: derived from top-12 slot per PDF p.19
      archetype:   "analytics darling — elite production, undersized masher",
      devPath:     "Georgia Tech college — ACC elite production",
      frameScale:  "undersized with elite production metrics"
    },

    // DERIVED from PDF: "production overrides physical prototyping", GT freshman HR record (25),
    // "most dominant offensive performances in recent ACC history", Mookie Betts comp
    analystScores: {
      dev:      0.82,   // elite development pace — sophomore adds to freshman record; consistent growth
      risk:     0.30,   // low — "production overrides prototyping"; metrics are elite and verifiable
      value:    0.80,   // top-12 slot — strong; prototype concern creates slight discount vs. 6'2" clone
      org:      0.82,   // analytics-focused orgs love this profile; traditional orgs may discount size
      pedigree: 0.82    // GT freshman HR record, ACC doubles leader, #1 extra-base hits — elite production
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard college draftee options
      injuryIdx:   0.10,  // low — no injury flags; "big leg kick" is mechanical not health concern
      pedigree:    0.82,
      devCurve:    0.85,  // steep development — freshman HR record, sophomore confirms progression
      orgValue:    0.82,  // very high for analytics orgs; production speaks across all organizational types
      assetRisk:   0.30,  // low — metrics are elite; physical concern is the only discount factor
      longValue:   0.82   // strong long-term value — "underlying numbers are off the charts" (PDF p.19)
    }

  },


  /* =========================
     SCOUT (TOOLS)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["power", "hit"],              // 60 power, 55 hit — production profile
      roleType:            ["starter"],                   // CF now, corner projection long-term
      physicalProjection:  ["undersized", "physical"],    // 5'9" — limited projection; elite output
      riskProfile:         ["low"]                        // "elite production overrides physical prototyping"
    },

    // DIRECTLY SOURCED from PDF page 19 tool table
    scout: {
      hit:   55,   // SOURCE: "55 HIT" — tool table, PDF p.19; "above-average contact rates despite mechanical quirk"
      power: 60,   // SOURCE: "60 POWER" — "grades at 60 from multiple outlets" (PDF p.19); 113.5 mph max EV
      run:   55,   // SOURCE: "55 RUN" — "solid-average runner (not a burner)" (PDF p.19)
      field: 55,   // SOURCE: "55 FIELD" — "instincts and route running praised"; CF now, corner long-term
      arm:   60    // SOURCE: "60 ARM" — "10 outfield assists in 2024 — GT program record" (PDF p.19)
    },

    // DERIVED from PDF: 113.5 mph max EV, 98th-percentile avg EV, 51% hard hit, 17% walk rate,
    // 94th-percentile chase rate, 44 HR in 2 seasons (GT record pace), more walks than strikeouts
    analystScores: {
      ceiling:    0.85,  // "8/10 ceiling" — Mookie Betts comp ceiling; undersized masher peak
      floor:      0.72,  // high floor — "underlying numbers are off the charts" (PDF p.19); metrics are durable
      roleProb:   0.85,  // very high probability of everyday role — production is definitive argument
      skillTrend: 0.88,  // strong upward — sophomore confirms freshman; two-year progression is elite
      volatility: 0.28,  // low — "metrics not small-school numbers — elite metrics against ACC pitching"
      orgFit:     0.88,  // premium fit for analytics orgs; production-based argument works broadly
      riskTrend:  0.22   // declining risk — sophomore confirmation eliminates "one-year wonder" question
    },

    analyst: {
      ceiling:    0.85,
      floor:      0.72,
      roleProb:   0.85,
      skillTrend: 0.88,
      volatility: 0.28,
      comparable: "Mookie Betts / Jose Altuve size comp",  // SOURCE: PDF p.19 — "MLB Comps"
      orgFit:     0.88,
      riskTrend:  0.22
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "Top-12 projected (#8 overall per PDF)",
      developmentPath:  "Georgia Tech — ACC elite college production",
      orgInvestment:    "high",
      timelineSignal:   "fast track conditional"   // elite production + college junior-adjacent → faster path
    },

    scout: {
      collegeStatus:     "college",
      draftPedigree:     "Top-12",    // SOURCE: PDF p.19 — "Proj. Pick: Top-12"
      projectionPath:    "everyday CF/corner OF — elite production bat",
      orgCommitment:     "high for analytics-focused orgs",
      topProspectStatus: "#8 overall per PDF; GT career HR pace record"
    },

    // DERIVED from PDF: GT freshman HR record (25), sophomore: 19 HR + 23 2B, ACC leader multiple cats,
    // "most dominant offensive performances in recent ACC history", Mookie Betts comp
    analystScores: {
      timeline: 0.72,   // fast-track eligible — college sophomore with elite production and approach
      peak:     0.85,   // Mookie Betts peak — undersized masher with plus approach = durable career peak
      path:     0.82,   // clear path — production eliminates most development uncertainty
      org:      0.82,   // high priority for analytics orgs; production-based case is strong across board
      value:    0.85,   // strong sustained asset value — "underlying numbers off the charts" (PDF p.19)
      floor:    0.72,   // very high floor — elite metrics guarantee offensive contribution
      ceil:     0.85    // elite ceiling confirmed by two-year D1 production pace
    },

    analyst: {
      amateurCeiling: 0.85,  // "When I see 113 mph EV, 17% walk rate, 94th-percentile chase rate from
                              // a college bat, I don't care about the height" — national scout (PDF p.19)
      draftValue:     0.82,  // top-12 slot — slight discount vs. comparable 6'2" player (acknowledged in PDF)
      ascentSpeed:    0.80,  // fast — college sophomore, elite production, fast-track eligible
      setbacks:       0.20,  // low setback risk — production is verifiable and elite
      recoveryTrack:  0.82,  // strong — "big leg kick" is coachable; approach is elite foundation
      orgPatience:    0.78,  // analytics orgs are less patient (expectation of fast translation)
      careerArc:      0.85,  // excellent career arc — Mookie Betts comp implies very long peak
      longView:       0.85   // strong long-term value — approach-based players age well
    }

  }

}
