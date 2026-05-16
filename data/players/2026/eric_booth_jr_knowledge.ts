/* =============================================================
   ERIC BOOTH JR. — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 15–16
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All tool grades directly sourced from PDF (page 15, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   HITTER tools: hit, power, run, arm, field (20–80 scale)
   ============================================================= */

export const eric_booth_jr_knowledge = {

  age: 17,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'0\"",
      weight:  "207",
      bats:    "L",
      throws:  "L",
      school:  "Oak Grove HS (Hattiesburg, MS) — Junior"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.80,   // "dynamic power/speed combo center fielder" — Byron Buxton comp profile
      path: 0.65,   // prep junior — youngest in round 1; still developing, Vanderbilt commit
      frame: 0.78,  // 6'0" / 207 lbs — "body that's still growing", "significant projection remaining at 17"
      ath:  0.92,   // 70-grade runner; "explosive acceleration", "powerful and explosive" legs (PDF p.15)
      proj: 0.88    // enormous physical projection — "ceiling on this kid is enormous" (PDF p.15)
    },

    scout: {
      birthdate:   "2008-07-04",      // SOURCE: PDF p.15 — "turns 18 on July 4"
      signBonus:   "~$5.5–6.0M",      // SOURCE: derived from top-10 slot; Vanderbilt commit provides leverage
      archetype:   "power/speed CF — youngest first-rounder",
      devPath:     "prep junior — Vanderbilt commit",
      frameScale:  "projectable — significant growth remaining"
    },

    // DERIVED from PDF: "youngest hitter currently ranked inside the first round",
    // "production and tool grades even more impressive in context" of age 17,
    // Vanderbilt commit leverage, "consistent across varying levels of competition"
    analystScores: {
      dev:      0.68,   // prep junior — earliest stage; tools are ahead of development stage
      risk:     0.38,   // moderate-higher — prep junior; youngest in class; development arc longest
      value:    0.80,   // top-10 slot — strong draft value; Vanderbilt leverage
      org:      0.80,   // high org priority — elite athleticism + development ceiling
      pedigree: 0.78    // "#6 Overall MLB Pipeline", "Baseball America Top-10" — strong but below elite
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard prep draftee options
      injuryIdx:   0.10,  // low — no injury flags; high-level athlete implies clean health
      pedigree:    0.78,
      devCurve:    0.62,  // prep junior — longest development arc in class
      orgValue:    0.80,  // high for athleticism-first organizations
      assetRisk:   0.40,  // moderate — youngest player, prep junior, longest timeline
      longValue:   0.85   // high long-term value — "enormous" ceiling stated explicitly (PDF p.15)
    }

  },


  /* =========================
     SCOUT (TOOLS)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["run", "field"],              // 70-grade speed is the loudest tool
      roleType:            ["starter", "premium"],        // CF starter projection — "Gold Glove-caliber" path
      physicalProjection:  ["projectable", "enormous"],   // 17 years old; "significant projection remaining"
      riskProfile:         ["moderate"]                   // prep junior; youngest in round; standard prep risk
    },

    // DIRECTLY SOURCED from PDF page 15 tool table
    scout: {
      hit:   55,   // SOURCE: "55 HIT" — tool table, PDF p.15; "short, compact, old-school swing"
      power: 55,   // SOURCE: "55 POWER" — "grades at 55 with projection to 60+" (PDF p.15)
      run:   70,   // SOURCE: "70 RUN" — "70-grade running ability" — "the loudest single tool" (PDF p.15)
      field: 55,   // SOURCE: "55 FIELD" — "natural center fielder", "above-average to plus defender"
      arm:   50    // SOURCE: "50 ARM" — "solid-average and accurate" arm (PDF p.15)
    },

    // DERIVED from PDF: 70-grade speed is "loudest single tool in prep portion of class",
    // "explosive acceleration", 27 SB, 5 triples, ".467 with 6 HR, 12 2B, 5 3B"
    analystScores: {
      ceiling:    0.88,  // "ceiling on this kid is enormous" — Byron Buxton comp ceiling (PDF p.15)
      floor:      0.60,  // floor gated by age and development timeline — tools are elite, translation is question
      roleProb:   0.75,  // strong CF projection; youngest player adds uncertainty to timeline
      skillTrend: 0.80,  // upward — "steadily climbing boards since January"; production consistent across levels
      volatility: 0.40,  // moderate for prep — "consistent across varying levels of competition" is positive
      orgFit:     0.80,  // premium fit for athleticism-first, long-horizon organizations
      riskTrend:  0.35   // age-related risk is known quantity; tools are clear and elite
    },

    analyst: {
      ceiling:    0.88,
      floor:      0.60,
      roleProb:   0.75,
      skillTrend: 0.80,
      volatility: 0.40,
      comparable: "Byron Buxton / Starling Marte",  // SOURCE: PDF p.15 — "MLB Comps"
      orgFit:     0.80,
      riskTrend:  0.35
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "#6 overall (MLB Pipeline) — youngest hitter in round 1",
      developmentPath:  "prep junior — longest arc in 2026 class",
      orgInvestment:    "high",
      timelineSignal:   "long development"   // prep junior; youngest player — standard longest-arc
    },

    scout: {
      collegeStatus:     "prep",
      draftPedigree:     "Top-10",      // SOURCE: PDF p.15 — "Proj. Pick: Top-10 (youngest hitter)"
      projectionPath:    "everyday CF — power/speed combination impact player",
      orgCommitment:     "high",
      topProspectStatus: "#6 Overall MLB Pipeline, Baseball America Top-10"
    },

    // DERIVED from PDF: youngest hitter in round 1, Vanderbilt commit leverage,
    // "Rising All Spring — steadily climbing boards since January", 70-grade speed
    analystScores: {
      timeline: 0.40,   // long development — prep junior is longest possible arc
      peak:     0.88,   // "enormous ceiling" explicitly stated — Byron Buxton comp peak
      path:     0.65,   // development path is longest in class; tools are clear
      org:      0.80,   // high priority for orgs with patience for premium athlete investment
      value:    0.82,   // sustained long-term value — power/speed CF tools hold well
      floor:    0.55,   // floor gated by age and development unknowns
      ceil:     0.88    // elite ceiling confirmed by speed grade and youth
    },

    analyst: {
      amateurCeiling: 0.88,  // "ceiling on this kid is enormous if he hits — early signs say he can" (PDF p.15)
      draftValue:     0.80,  // top-10 slot — strong; Vanderbilt commit adds negotiation leverage
      ascentSpeed:    0.42,  // slow — prep junior; standard longest-arc development timeline
      setbacks:       0.30,  // moderate — youngest player; development adversity is expected not alarming
      recoveryTrack:  0.75,  // strong recovery potential — elite athleticism is durable base
      orgPatience:    0.88,  // orgs invest heavily in patience for this profile; selection implies commitment
      careerArc:      0.82,  // excellent career arc if tools translate — power/speed CF ages well
      longView:       0.85   // strongest long-term value comes from CF speed/power combo durability
    }

  }

}
