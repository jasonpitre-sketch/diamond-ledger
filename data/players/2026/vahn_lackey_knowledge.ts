/* =============================================================
   VAHN LACKEY — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 9–10
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All tool grades directly sourced from PDF (page 9, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   HITTER tools: hit, power, run, arm, field (20–80 scale)
   ============================================================= */

export const vahn_lackey_knowledge = {

  age: 20,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'2\"",
      weight:  "215",
      bats:    "R",
      throws:  "R",
      school:  "Georgia Tech (Sophomore)"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.72,   // elite defensive catcher with offensive emergence — "total package" framing
      path: 0.82,   // Georgia Tech legacy — Varitek, Wieters, Bart, Parada lineage
      frame: 0.78,  // 6'2" / 215 lbs — ideal catcher build; "significantly more athletic than predecessors"
      ath:  0.85,   // "movement profile more reminiscent of an outfielder than a traditional backstop"
      proj: 0.65    // limited physical projection remaining — already plus-athletic college sophomore
    },

    scout: {
      birthdate:   "2006",             // DOB year derived from age 20 at draft; exact date not in source
      signBonus:   "~$7.0M",           // SOURCE: PDF p.9 — "Slot ~$7M"
      archetype:   "elite defensive catcher — total package",
      devPath:     "Georgia Tech legacy catcher",
      frameScale:  "pro-ready frame"
    },

    // DERIVED from PDF: "best defensive catcher in this class", "most athletic GT catcher ever",
    // follows Varitek/Wieters/Bart/Parada, offensive explosion answered evaluator questions
    analystScores: {
      dev:      0.75,   // accelerated at college level — sophomore offensive emergence
      risk:     0.22,   // low — elite defense is floor; offensive development de-risks profile
      value:    0.86,   // Top-5 slot (~$7M) — very high draft value
      org:      0.88,   // elite org priority for any team needing franchise catcher
      pedigree: 0.88    // Georgia Tech catcher lineage — "latest in extraordinary line" (PDF p.9)
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard college draftee options
      injuryIdx:   0.08,  // low — catching is physically demanding but no injury flags in PDF
      pedigree:    0.88,
      devCurve:    0.80,  // accelerated — sophomore offensive explosion elevates profile
      orgValue:    0.88,  // franchise catcher — highest positional org value tier
      assetRisk:   0.22,  // very low — elite defense guarantees major-league floor regardless of bat
      longValue:   0.88   // strong long-term value — catchers age differently but floor is elite
    }

  },


  /* =========================
     SCOUT (TOOLS)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["arm", "field"],              // pop time 1.83s, elite framing — defense is foundation
      roleType:            ["starter", "franchise"],      // "total package" — no reason to move off C
      physicalProjection:  ["pro-ready", "athletic"],     // already elite athlete at 20
      riskProfile:         ["low"]                        // defense guarantees floor; offense is upside
    },

    // DIRECTLY SOURCED from PDF page 9 tool table
    scout: {
      hit:   55,   // SOURCE: "55 HIT" — tool table, PDF p.9; offensive emergence elevating this grade
      power: 60,   // SOURCE: "60 POWER" — "genuine plus raw power", 112.7 mph max EV (PDF p.9)
      run:   50,   // SOURCE: "50 RUN" — "9 SB in 47 games — almost unheard of for a catcher" (PDF p.9)
      field: 70,   // SOURCE: "70 FIELD" — elite framing, blocking, game-calling; best defensive C in class
      arm:   70    // SOURCE: "70 ARM" — 1.83s avg pop time, mid-1.7s recorded; elite by any measure
    },

    // DERIVED from PDF: "best defensive catcher in this class", 1.83s pop time elite tier,
    // 12.1% framing rate, 56.7% close-zone framing, 9 SB in 47 games
    analystScores: {
      ceiling:    0.88,  // "total package" ceiling — best defensive C + offensive emergence
      floor:      0.82,  // elite floor — defense alone guarantees everyday MLB catcher role
      roleProb:   0.95,  // near-certain everyday catcher — positional value is definitive
      skillTrend: 0.85,  // strong upward — sophomore offensive explosion confirmed development
      volatility: 0.18,  // very low — defensive foundation is stable, offense is confirmed upside
      orgFit:     0.90,  // premium fit — any team needing franchise catcher
      riskTrend:  0.15   // declining risk — offense answered, defense confirmed at elite level
    },

    analyst: {
      ceiling:    0.88,
      floor:      0.82,
      roleProb:   0.95,
      skillTrend: 0.85,
      volatility: 0.18,
      comparable: "Joey Bart / Adley Rutschman",  // SOURCE: PDF p.9 — "MLB Comps"
      orgFit:     0.90,
      riskTrend:  0.15
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "#3 overall projected (Twins per mock)",
      developmentPath:  "Georgia Tech legacy — college fast track",
      orgInvestment:    "very high",
      timelineSignal:   "fast track"   // college sophomore + elite defense → quicker path
    },

    scout: {
      collegeStatus:     "college",
      draftPedigree:     "#3 overall",    // SOURCE: PDF p.9 — "Proj. Pick: #3 (Twins per mock)"
      projectionPath:    "everyday MLB catcher — franchise backstop",
      orgCommitment:     "very high",
      topProspectStatus: "#3 overall — top catcher in draft class"
    },

    // DERIVED from PDF: GT legacy (follows Varitek/Wieters/Bart/Parada), "total package",
    // sophomore offensive explosion, elite defensive metrics validated at multiple venues
    analystScores: {
      timeline: 0.72,   // fast-track — college sophomore, elite defense reduces development uncertainty
      peak:     0.88,   // elite peak — franchise catcher projection
      path:     0.85,   // clear path — defensive certainty reduces development risk
      org:      0.88,   // franchise catcher = highest positional priority
      value:    0.90,   // near-maximum sustained asset value — catchers command premium
      floor:    0.80,   // very high floor — elite defense guarantees contribution
      ceil:     0.88    // elite ceiling confirmed by defense + offensive emergence
    },

    analyst: {
      amateurCeiling: 0.88,  // "total package" — best defensive catcher in class + offensive emergence
      draftValue:     0.88,  // #3 overall, ~$7M slot — very high
      ascentSpeed:    0.78,  // good — college sophomore with elite tools on both sides
      setbacks:       0.08,  // minimal setback risk (elite defense = durable floor)
      recoveryTrack:  0.80,  // strong — if minor offensive setback, defense carries
      orgPatience:    0.85,  // org will invest; catchers require patience in development
      careerArc:      0.88,  // elite career arc — franchise catcher with offensive upside
      longView:       0.86   // strong long-term value — GT catcher lineage holds well
    }

  }

}
