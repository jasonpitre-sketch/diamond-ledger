/* =============================================================
   JACKSON FLORA — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 11–12
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All pitch grades directly sourced from PDF (page 11, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   PITCHER tools: fastball, breaking, offspeed, command, control (20–80 scale)
   ============================================================= */

export const jackson_flora_knowledge = {

  age: 20,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'5\"",
      weight:  "205",
      bats:    "R",
      throws:  "R",
      school:  "UC Santa Barbara (Junior)"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.85,   // "#1 pitcher in 2026 class" — elite pitching archetype
      path: 0.82,   // UCSB junior — D1 production elite; "historically dominant numbers across two seasons"
      frame: 0.80,  // 6'5" / 205 lbs — "long, lean frame projects for continued velocity development"
      ath:  0.72,   // "highly coachable and intellectually engaged with the craft of pitching"
      proj: 0.78    // "projects for continued velocity development as he adds professional strength" (PDF p.11)
    },

    scout: {
      birthdate:   "2006",             // DOB year derived from age 20; exact date not in source
      signBonus:   "~$7.0M+",          // SOURCE: PDF p.11 — "Top pitching prospect — Top-6 slot"
      archetype:   "#1 pitcher — four-pitch starter",
      devPath:     "college elite — D1 historic production",
      frameScale:  "projectable frame"
    },

    // DERIVED from PDF: "historically dominant numbers", "0.73 ERA D1 leader", "highly coachable",
    // "changeup transformed him from two-pitch thrower into legitimate starter projection"
    analystScores: {
      dev:      0.85,   // exceptional development — changeup emergence as go-to weapon sophomore → junior
      risk:     0.35,   // moderate — "head whack in delivery" flagged; pitching injury risk inherent
      value:    0.86,   // Top-6 slot — #1 pitcher in class
      org:      0.88,   // top org priority for any team needing frontline arm
      pedigree: 0.85    // D1 ERA leader (0.73), D1 OPS Against leader (.440) — historic production
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard college draftee options
      injuryIdx:   0.22,  // MODERATE — pitcher health flag; "7/10 health" rating in PDF; head whack noted
      pedigree:    0.85,
      devCurve:    0.88,  // steep development — D1 historic performance across two seasons
      orgValue:    0.88,  // top org priority — frontline arm scarcity premium
      assetRisk:   0.35,  // moderate — pitcher arm health is the defining risk factor
      longValue:   0.80   // strong if health holds — "No. 2-3 starter ceiling" confirmed by production
    }

  },


  /* =========================
     SCOUT (TOOLS — PITCHER)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["fastball", "changeup"],     // mid-90s to 100+, upper-80s fade — two weapons
      roleType:            ["starter"],                   // "legitimate starter projection" (PDF p.11)
      physicalProjection:  ["projectable", "velocity"],   // "continued velocity development" expected
      riskProfile:         ["moderate"]                   // head whack; pitcher injury baseline; "7/10 health"
    },

    // DIRECTLY SOURCED from PDF page 11 tool table
    scout: {
      fastball: 65,   // SOURCE: PDF p.11 — "65 FASTBALL" — mid-90s to 100+, elite carry and ride
      breaking: 55,   // SOURCE: PDF p.11 — "55+ SLIDER/SWEEPER" — two distinct slider shapes
      offspeed: 60,   // SOURCE: PDF p.11 — "60 CHANGEUP" — "go-to weapon", arm-side fade and tumble
      command:  55,   // SOURCE: PDF p.11 — "55 COMMAND" — K/BB 4.00 in 2026; "above-average for age"
      control:  null  // not separately graded; command covers this
    },

    // DERIVED from PDF: "historically dominant numbers", 0.73 ERA D1, 4-pitch mix,
    // "genuinely tunneling advantage" from dual slider shapes
    analystScores: {
      ceiling:    0.88,  // "No. 2-3 starter ceiling" confirmed by stuff and production (PDF p.11)
      floor:      0.65,  // floor gated by health — "7/10 health" rating is real concern
      roleProb:   0.80,  // high probability of starter role if health holds
      skillTrend: 0.88,  // strong upward — changeup emergence dramatically elevated profile
      volatility: 0.40,  // moderate — mechanical concern (head whack) and pitcher health
      orgFit:     0.85,  // premium fit — teams needing frontline arm invest heavily here
      riskTrend:  0.42   // higher than hitter profile — pitcher development risk is persistent
    },

    analyst: {
      ceiling:    0.88,
      floor:      0.65,
      roleProb:   0.80,
      skillTrend: 0.88,
      volatility: 0.40,
      comparable: "Logan Gilbert / Taj Bradley",  // SOURCE: PDF p.11 — "MLB Comps"
      orgFit:     0.85,
      riskTrend:  0.42
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "#4 overall, #1 pitcher (multiple draft boards)",
      developmentPath:  "college elite — UCSB junior, D1 historic performer",
      orgInvestment:    "very high",
      timelineSignal:   "fast track conditional"   // college junior + elite stuff → faster if healthy
    },

    scout: {
      collegeStatus:     "college",
      draftPedigree:     "Top-6 overall",   // SOURCE: PDF p.11 — "MLB Projection: Top-6 Pick"
      projectionPath:    "frontline starter — No. 2-3 rotation",
      orgCommitment:     "very high",
      topProspectStatus: "#1 pitcher in 2026 draft class"
    },

    // DERIVED from PDF: historic D1 numbers (0.73 ERA, .440 OPS Against),
    // "4-pitch mix with multiple above-average-to-plus offerings", "highly coachable"
    analystScores: {
      timeline: 0.70,   // fast-track conditional — college junior, elite stuff; arm health is gating factor
      peak:     0.88,   // frontline starter peak — "draw clear lines to what big names in sport are doing"
      path:     0.75,   // clear path if healthy — head whack is addressable; D1 production validates stuff
      org:      0.88,   // highest org priority — frontline arm scarcity drives aggressive investment
      value:    0.88,   // near-maximum value for pitching asset if health holds
      floor:    0.60,   // floor gated by pitcher health — arm injury = significant floor reduction
      ceil:     0.88    // elite ceiling confirmed by historic D1 production + 4-pitch mix
    },

    analyst: {
      amateurCeiling: 0.88,  // "potential is through the roof" — area scout quoted (PDF p.11)
      draftValue:     0.88,  // Top-6 slot, #1 pitcher — very high
      ascentSpeed:    0.80,  // good — college junior, elite tools, fast-track eligible if healthy
      setbacks:       0.35,  // moderate — pitcher health flag real; head whack mechanical concern
      recoveryTrack:  0.72,  // solid recovery path — "highly coachable" + clean arm action
      orgPatience:    0.82,  // org will invest; pitcher development requires patience
      careerArc:      0.82,  // elite career arc if health holds — historic D1 production is predictive
      longView:       0.78   // strong but health-contingent — pitcher long-term value always gated by arm
    }

  }

}
