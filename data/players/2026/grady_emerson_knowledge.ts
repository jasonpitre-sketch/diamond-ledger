/* =============================================================
   GRADY EMERSON — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 6–8
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All tool grades directly sourced from PDF (page 6, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   HITTER tools: hit, power, run, arm, field (20–80 scale)
   ============================================================= */

export const grady_emerson_knowledge = {

  age: 18,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'2\"",
      weight:  "180",
      bats:    "L",
      throws:  "R",
      school:  "Fort Worth Christian HS (TX) — Senior"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.88,   // "best pure hitter in the entire 2026 class regardless of level" — elite hit-tool archetype
      path: 0.72,   // prep elite — Team USA dual-team, mentored by former big leaguer Rusty Greer
      frame: 0.62,  // 6'2" / 180 lbs — physical projection remaining at 18, not yet filled out
      ath:  0.78,   // elite baserunning IQ, 31 SB in 32 attempts, plus run tool
      proj: 0.82    // significant physical projection remaining — "still physically maturing at 18" (PDF p.6)
    },

    scout: {
      birthdate:   "2008-02-21",          // SOURCE: PDF p.6 — "DOB: February 21, 2008"
      signBonus:   "~$7.5M",              // SOURCE: PDF p.6 — "Slot ~$7.5M"
      archetype:   "elite prep SS — pure hitter",
      devPath:     "prep elite — Team USA",
      frameScale:  "projectable frame"
    },

    // DERIVED from PDF: "relaxed demeanor in high-leverage situations", Team USA gold medal,
    // "near-nonexistent strikeout rate", "best pure hitter in the 2026 class regardless of level"
    analystScores: {
      dev:      0.78,   // advanced for prep — national showcases, Team USA, mentorship from Greer
      risk:     0.28,   // moderate — prep risk inherent; elite character, but pre-pro
      value:    0.88,   // #2 overall projected, ~$7.5M slot — very high draft value
      org:      0.85,   // high org priority — top prep position player
      pedigree: 0.90    // first dual 15U/18U USA Baseball rep in program history; #1 HS prospect BA
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard prep draftee options
      injuryIdx:   0.10,  // low — no injury flags in PDF; Team USA participation implies clean health
      pedigree:    0.90,
      devCurve:    0.75,  // prep standard — longer development arc than college player
      orgValue:    0.88,  // very high org priority
      assetRisk:   0.30,  // moderate — prep risk inherent but tool quality is elite
      longValue:   0.88   // strong long-term franchise value if hit tool translates
    }

  },


  /* =========================
     SCOUT (TOOLS)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["hit", "speed"],              // "best pure hitter in class", 70-grade hit potential
      roleType:            ["starter", "premium"],        // projects as everyday SS or CF
      physicalProjection:  ["projectable", "maturing"],   // 6'2" / 180 — still growing
      riskProfile:         ["moderate"]                   // prep standard; character and tools elite
    },

    // DIRECTLY SOURCED from PDF page 6 tool table
    scout: {
      hit:   65,   // SOURCE: "65+" — tool table, PDF p.6 ("70 grade potential" per quote)
      power: 55,   // SOURCE: "55" — raw power; "55-60 with projection for plus power" (PDF p.6)
      run:   60,   // SOURCE: "60 RUN" — 31 SB in 32 attempts; plus runner
      field: 55,   // SOURCE: "55 FIELD" — "instinctive SS with soft, reliable hands" (PDF p.6)
      arm:   55    // SOURCE: "55 ARM" — consistent with PDF table positioning
    },

    // DERIVED from PDF: "70 grade potential" hit tool, "best pure hitter in entire 2026 class",
    // .524/.638/.971 with 34 BB / 4 K, "near-nonexistent strikeout rate"
    analystScores: {
      ceiling:    0.90,  // elite hit-tool ceiling — "best pure hitter regardless of level" (PDF p.6)
      floor:      0.72,  // solid floor — hit tool guarantees offensive contribution
      roleProb:   0.80,  // strong chance at everyday SS but prep timeline clouds certainty
      skillTrend: 0.85,  // upward — "makes in-game adjustments", Team USA performance
      volatility: 0.28,  // low for prep — character, approach, and tool quality all elite
      orgFit:     0.85,  // premium fit for any org needing top-of-order offensive talent
      riskTrend:  0.25   // low — clean health, elite character, no red flags
    },

    analyst: {
      ceiling:    0.90,
      floor:      0.72,
      roleProb:   0.80,
      skillTrend: 0.85,
      volatility: 0.28,
      comparable: "Ozzie Smith bat / Freddie Freeman swing",  // SOURCE: PDF p.6 — "MLB Comps"
      orgFit:     0.85,
      riskTrend:  0.25
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "#2 overall projected (MLB Pipeline)",
      developmentPath:  "prep elite — Team USA dual team",
      orgInvestment:    "very high",
      timelineSignal:   "standard prep"   // prep player — longer arc than college
    },

    scout: {
      collegeStatus:     "prep",
      draftPedigree:     "Top-3 to Top-5",   // SOURCE: PDF p.6 — "Proj. Pick: Top-3 to Top-5"
      projectionPath:    "everyday SS or CF — premium offensive player",
      orgCommitment:     "very high",
      topProspectStatus: "#1 HS Prospect (Baseball America)"
    },

    // DERIVED from PDF: #1 HS prospect BA, first dual 15U/18U USA Baseball rep,
    // mentored by Rusty Greer, UT commit provides leverage
    analystScores: {
      timeline: 0.52,   // standard prep — longer path than college player
      peak:     0.88,   // elite peak — "best pure hitter in class" with plus speed
      path:     0.75,   // clear path — tools elite, but development road is longer for prep
      org:      0.85,   // very high org priority at top-3 slot
      value:    0.88,   // near-elite sustained asset value
      floor:    0.68,   // solid floor — elite hit tool provides offensive guarantee
      ceil:     0.90    // elite ceiling confirmed by hit-tool grade and production
    },

    analyst: {
      amateurCeiling: 0.90,  // "best pure hitter in entire 2026 class regardless of level" (PDF p.6)
      draftValue:     0.88,  // Top-3 to Top-5 slot — very high
      ascentSpeed:    0.55,  // standard prep — longer development timeline expected
      setbacks:       0.15,  // low setback risk — health clean, character elite
      recoveryTrack:  0.75,  // solid recovery path if minor development setback
      orgPatience:    0.85,  // org will invest — top-5 selections require patience
      careerArc:      0.85,  // strong career arc — elite hit tool is highest-translatable skill
      longView:       0.88   // strong long-term value — hit tool is most durable skill set
    }

  }

}
