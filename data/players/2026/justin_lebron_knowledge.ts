/* =============================================================
   JUSTIN LEBRON — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 13–14
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All tool grades directly sourced from PDF (page 13, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   HITTER tools: hit, power, run, arm, field (20–80 scale)
   ============================================================= */

export const justin_lebron_knowledge = {

  age: 21,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'2\"",
      weight:  "180",
      bats:    "R",
      throws:  "R",
      school:  "Alabama (Junior)"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.75,   // "four-tool player" — legitimate 60-grade tools on 4 of 5; hit tool is debate
      path: 0.80,   // SEC junior — "dominant high school SS", unanimous former #1 overall
      frame: 0.70,  // 6'2" / 180 lbs — athletic standard for SS; some physical projection remaining
      ath:  0.82,   // "quick first step, outstanding lateral movement, plus-plus arm, body control"
      proj: 0.65    // "some physical projection remaining" — athletic frame but SEC-tested
    },

    scout: {
      birthdate:   "2005",             // DOB year derived from age 21; exact date not in source
      signBonus:   "~$5.5–7.0M",       // SOURCE: derived from pick 5-15 range per PDF p.13
      archetype:   "four-tool SS — tools-over-production debate",
      devPath:     "former #1 overall — Alabama SEC",
      frameScale:  "athletic standard"
    },

    // DERIVED from PDF: "legitimate shot at four 60-grade tools", "former unanimous #1",
    // "fascinating narrative in 2026 class", "sliding stock" from #1 to #5-10
    analystScores: {
      dev:      0.70,   // strong development base; junior regression is the central question
      risk:     0.42,   // moderate-high — contact concerns, 17-error junior season, stock sliding
      value:    0.80,   // pick 5-15 range — solid but reduced from former #1 expectation
      org:      0.80,   // high org interest for tools-over-production targeting teams
      pedigree: 0.85    // "former unanimous #1 overall" — pedigree highest possible for non-#1 pick
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard college draftee options
      injuryIdx:   0.12,  // low — no injury flags; 17 errors reflect reliability not injury
      pedigree:    0.85,
      devCurve:    0.65,  // junior regression clouds development curve; 2025 sophomore was elite
      orgValue:    0.78,  // high for tools-first orgs; sliding stock reduces universal demand
      assetRisk:   0.45,  // moderate — contact holes are real; "17-error season" adds floor concern
      longValue:   0.78   // strong if bat unlocks; four 60-grade tools is rare asset
    }

  },


  /* =========================
     SCOUT (TOOLS)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["power", "arm", "run", "field"],  // legitimate 60-grade on four tools
      roleType:            ["starter"],                         // "impact player regardless of offensive warts"
      physicalProjection:  ["athletic", "solid"],
      riskProfile:         ["moderate-high"]                   // "tools-versus-results debate" — central narrative
    },

    // DIRECTLY SOURCED from PDF page 13 tool table
    scout: {
      hit:   50,   // SOURCE: "50 HIT" — tool table, PDF p.13; "hit tool has been source of evaluator concern"
      power: 60,   // SOURCE: "60 POWER" — "genuine power to all fields", 18 HR sophomore (PDF p.13)
      run:   60,   // SOURCE: "60 RUN" — "17-for-18 stolen base attempts in 2025" (PDF p.13)
      field: 60,   // SOURCE: "60 FIELD" — "quick first step, outstanding lateral movement" (PDF p.13)
      arm:   60    // SOURCE: "60 ARM" — "plus-plus arm" stated; consistent field/arm grade pair
    },

    // DERIVED from PDF: four 60-grade tools confirmed by national scout, 17-error season concern,
    // 24.2% K% 2025, sliding from #1 to #5-10, "tools-over-production argument"
    analystScores: {
      ceiling:    0.88,  // "impact player regardless of offensive warts" — four 60-grade tools ceiling
      floor:      0.55,  // floor limited by contact questions — 50 hit tool is gating risk
      roleProb:   0.72,  // solid probability of starter role; contact development is the gating factor
      skillTrend: 0.60,  // DECLINING from 2025 high — junior regression is real; 17 errors added
      volatility: 0.55,  // moderate-high — "could go anywhere from top-5 to outside top-20" (PDF p.13)
      orgFit:     0.75,  // strong for tools-first organizations; polarizing for analytics-heavy orgs
      riskTrend:  0.55   // INCREASING risk trend — junior regression, error total, contact concerns
    },

    analyst: {
      ceiling:    0.88,
      floor:      0.55,
      roleProb:   0.72,
      skillTrend: 0.60,
      volatility: 0.55,
      comparable: "Bo Bichette / Willy Adames",  // SOURCE: PDF p.13 — "MLB Comps"
      orgFit:     0.75,
      riskTrend:  0.55
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "#5-15 range (former consensus #1 overall)",
      developmentPath:  "Alabama junior — SEC elite with production debate",
      orgInvestment:    "high",
      timelineSignal:   "conditional"   // contact development is the key gating factor
    },

    scout: {
      collegeStatus:     "college",
      draftPedigree:     "Pick 5-15",   // SOURCE: PDF p.13 — "Proj. Pick: #5-15 range"
      projectionPath:    "everyday SS — impact player if hit tool develops",
      orgCommitment:     "high for tools-first orgs",
      topProspectStatus: "former unanimous #1 overall — now #5 per most boards"
    },

    // DERIVED from PDF: "most fascinating narratives in 2026 class", former #1 to #5-10,
    // "tools are legitimate", 2025 was elite (.316/.421/.636, 18 HR), junior regression
    analystScores: {
      timeline: 0.68,   // college junior — standard professional development timeline
      peak:     0.85,   // elite peak if contact unlocks — four 60-grade tools = All-Star SS floor
      path:     0.62,   // path clouded by contact question — development risk is real
      org:      0.78,   // high priority for the right org; polarizing across the board
      value:    0.78,   // solid sustained value if tools translate
      floor:    0.52,   // floor is real concern — 50 hit tool limits guaranteed contribution
      ceil:     0.88    // elite ceiling — "impact player regardless" per national scout (PDF p.13)
    },

    analyst: {
      amateurCeiling: 0.88,  // "60 power, 60 arm, 60 run, 60 field — impact player" (PDF p.13)
      draftValue:     0.80,  // pick 5-15 slot — strong but below former #1 expectation
      ascentSpeed:    0.65,  // development-dependent — contact tool is the speed limiter
      setbacks:       0.45,  // moderate — junior regression is a real setback signal
      recoveryTrack:  0.72,  // "could go anywhere" — strong recovery potential if pro coaching unlocks bat
      orgPatience:    0.75,  // tools-first orgs invest in patience; analytics orgs less willing
      careerArc:      0.78,  // strong career arc if contact develops; limited if it doesn't
      longView:       0.75   // long-term value tied tightly to contact rate development in pro ball
    }

  }

}
