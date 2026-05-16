/* =============================================================
   ROCH CHOLOWSKY — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 3–5
   Generated: 2026-05-08 | Pass 18
   Format: Domain-file (Tier A)

   All tool grades directly sourced from PDF (page 4, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   HITTER tools: hit, power, run, arm, field (20–80 scale)
   DO NOT add pitcher tools.
   ============================================================= */

export const roch_cholowsky_knowledge = {

  age: 21,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'2",
      weight:  "202",
      bats:    "R",
      throws:  "R",
      school:  "UCLA (Junior)"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.82,   // elite power/contact balance — "five-tool" framing, 60 power + 65 hit
      path: 0.90,   // highly polished college elite — advanced beyond junior class
      frame: 0.72,  // athletic standard, 6'2" / 202 lbs — "solid, not projectable"
      ath:  0.82,   // dynamic athlete — elite first-step, 55 run plays up
      proj: 0.72    // moderate physical projection remaining at 21 (college junior)
    },

    scout: {
      birthdate:   "2004",             // DOB year confirmed; exact date not in source
      signBonus:   "~$9.0M",           // slot value, #1 overall per PDF
      archetype:   "five-tool college SS",
      devPath:     "college elite",
      frameScale:  "athletic standard"
    },

    // DERIVED from PDF: "no significant injury history", "high-character, low-maintenance",
    // "most complete college SS in a decade", "unanimous #1"
    analystScores: {
      dev:     0.80,   // accelerated development curve (advanced junior)
      risk:    0.18,   // very low — no injury history, stable, clean off-field
      value:   0.96,   // elite — #1 overall slot, $9M bonus
      org:     0.95,   // highest organizational priority for drafting team
      pedigree:0.98    // first-ever sophomore Brooks Wallace winner, 1st Bruin
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard college draftee options
      injuryIdx:   0.05,  // very low — "no significant injury history to date" (PDF p.3)
      pedigree:    0.98,
      devCurve:    0.85,  // steep positive development — junior already at peak college level
      orgValue:    0.96,  // top priority for any drafting organization
      assetRisk:   0.18,  // minimal asset risk
      longValue:   0.93   // elite long-term franchise value
    }

  },


  /* =========================
     SCOUT (TOOLS)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["contact", "power", "defense"],  // all three highlighted in PDF
      roleType:            ["starter", "franchise"],          // "no credible reason to move off SS"
      physicalProjection:  ["athletic", "solid"],
      riskProfile:         ["very low"]                       // "low-maintenance", clean health
    },

    // DIRECTLY SOURCED from PDF page 4 tool table
    scout: {
      hit:   65,   // SOURCE: "65 HIT" — tool table, PDF p.4
      power: 60,   // SOURCE: "60 POWER" — tool table, PDF p.4
      run:   55,   // SOURCE: "55 RUN" — tool table, PDF p.4
      arm:   60,   // SOURCE: "60 ARM" — tool table, PDF p.4
      field: 65    // SOURCE: "65 FIELD" — tool table, PDF p.4
    },

    // DERIVED from PDF: "most complete college SS in a decade",
    // "no credible reason to move off SS", 9/10 BB ceiling rating, elite production
    analystScores: {
      ceiling:    0.95,  // franchise SS ceiling ("most complete college SS in a decade")
      floor:      0.78,  // high floor — advanced tools guarantee everyday contribution
      roleProb:   0.95,  // near-certain everyday SS ("no credible reason to move him off SS")
      skillTrend: 0.88,  // strong upward — 2025 to 2026 shows continued growth
      volatility: 0.15,  // very low — consistent, injury-free, high-character
      orgFit:     0.92,  // exceptional fit for any org at #1 slot
      riskTrend:  0.12   // declining risk — health + production both trending positive
    },

    analyst: {
      ceiling:    0.95,
      floor:      0.78,
      roleProb:   0.95,
      skillTrend: 0.88,
      volatility: 0.15,
      comparable: "Trea Turner / Corey Seager",  // SOURCE: PDF p.3 — "MLB Comps"
      orgFit:     0.92,
      riskTrend:  0.12
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "#1 overall projected",
      developmentPath:  "college elite fast track",
      orgInvestment:    "very high",
      timelineSignal:   "fast track"   // college advanced → shorter development arc
    },

    scout: {
      collegeStatus:     "college",
      draftPedigree:     "#1 overall",     // SOURCE: PDF p.3 — "Proj. Pick: #1 Overall (White Sox)"
      projectionPath:    "everyday SS franchise player",
      orgCommitment:     "very high",
      topProspectStatus: "#1 overall"
    },

    // DERIVED from PDF: unanimous #1, Brooks Wallace, WAR leader, fast-track college player
    analystScores: {
      timeline: 0.75,   // fast-track — college junior, advanced tools → quicker path
      peak:     0.90,   // elite peak — franchise SS projection
      path:     0.88,   // clear, low-obstacle development path
      org:      0.96,   // highest organizational priority
      value:    0.97,   // near-maximum sustained asset value
      floor:    0.80,   // very high floor — advanced college SS tools guarantee contribution
      ceil:     0.95    // elite ceiling confirmed by production + tools
    },

    analyst: {
      amateurCeiling: 0.98,  // "most complete college SS in a decade" (PDF p.3)
      draftValue:     0.99,  // #1 overall, ~$9M slot — highest possible
      ascentSpeed:    0.82,  // fast — college advanced tools reduce development timeline
      setbacks:       0.05,  // minimal setback risk (clean health, high character)
      recoveryTrack:  0.82,  // strong — if minor setback occurs, recovery path is clear
      orgPatience:    0.90,  // org will invest heavily; patience built into #1 selection
      careerArc:      0.92,  // elite career arc — franchise SS trajectory
      longView:       0.94   // strongest long-term value signal in 2026 draft class
    }

  }

}
