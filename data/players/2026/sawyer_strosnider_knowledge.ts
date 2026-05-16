/* =============================================================
   SAWYER STROSNIDER — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 21–22
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   All tool grades directly sourced from PDF (page 21, tool table).
   Analyst scores derived from PDF language per ENRICHMENT_RULES.md.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   HITTER tools: hit, power, run, arm, field (20–80 scale)
   ============================================================= */

export const sawyer_strosnider_knowledge = {

  age: 20,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'2\"",
      weight:  "200",
      bats:    "L",
      throws:  "L",
      school:  "Texas Christian University (Sophomore)"
    },

    // DERIVED: 0–1 normalized scores from PDF profile language
    scoutScores: {
      arch: 0.80,   // "rare combination of raw power and elite speed" — TOOLSY_UPSIDE profile
      path: 0.78,   // TCU — Big 12 elite program; "one of the most remarkable freshman seasons in Big 12 history"
      frame: 0.82,  // 6'2" / 200 lbs — "larger frame" for a runner; "double-plus raw power" frame
      ath:  0.82,   // plus runner despite 6'2" frame; "10 triples in single freshman season"
      proj: 0.72    // physical projection remaining at 20; college sophomore — solid development still possible
    },

    scout: {
      birthdate:   "2006",             // DOB year derived from age 20; exact date not in source
      signBonus:   "~$4.5–5.5M",       // SOURCE: derived from top-15 slot per PDF p.21
      archetype:   "power/speed OF — historic freshman season",
      devPath:     "TCU Big 12 — sophomore confirmation in progress",
      frameScale:  "athletic standard with power projection"
    },

    // DERIVED from PDF: "only 4th player since 2002 to record 10+ HR, 2B, 3B, SB in single season",
    // Big 12 Freshman of Year, "one of the most remarkable freshman seasons in recent Big 12 history"
    analystScores: {
      dev:      0.80,   // exceptional freshman development; sophomore confirmation is the current test
      risk:     0.32,   // low-moderate — "plate discipline is development area"; power/speed are elite
      value:    0.78,   // top-15 slot — strong
      org:      0.80,   // high org priority — power/speed combination is premium value profile
      pedigree: 0.82    // Big 12 Freshman of Year 2025; "only 4th player since 2002" in 4-category season
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     3,     // standard college draftee options
      injuryIdx:   0.10,  // low — no injury flags; full freshman workload
      pedigree:    0.82,
      devCurve:    0.80,  // steep positive — freshman record → sophomore confirmation in progress
      orgValue:    0.80,  // power/speed OF is broad-market premium value
      assetRisk:   0.32,  // low-moderate — swing decisions are development item, not fundamental flaw
      longValue:   0.82   // strong long-term value — power/speed ages well in modern game
    }

  },


  /* =========================
     SCOUT (TOOLS)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["power", "run"],              // "double-plus raw power" and "plus runner"
      roleType:            ["starter", "premium"],        // RF long-term; "solidly average to above-average" in CF
      physicalProjection:  ["athletic", "filling out"],   // 6'2" / 200 — developing power frame
      riskProfile:         ["moderate"]                   // swing decisions are development area
    },

    // DIRECTLY SOURCED from PDF page 21 tool table
    scout: {
      hit:   50,   // SOURCE: "50 HIT" — tool table, PDF p.21; "swing decisions — development area"
      power: 65,   // SOURCE: "65 POWER" — "double-plus raw power"; "pull-side power exceptional"
      run:   60,   // SOURCE: "60 RUN" — "genuine plus runner" despite 6'2" frame; 10 triples in 1 season
      field: 55,   // SOURCE: "55 FIELD" — "average to above-average in right field" (PDF p.21)
      arm:   60    // SOURCE: "60 ARM" — "plus arm — legitimate weapon in outfield" (PDF p.21)
    },

    // DERIVED from PDF: historic 4-category freshman season, Big 12 Freshman of Year,
    // "double-plus raw power", "plus arm", plate discipline is development area
    analystScores: {
      ceiling:    0.85,  // "8/10 ceiling" — Jesse Winker / Cody Bellinger hybrid ceiling
      floor:      0.65,  // floor — power/speed combination guarantees some contribution; swing decisions gate
      roleProb:   0.80,  // high probability of everyday role — power/speed OF with plus arm
      skillTrend: 0.80,  // strong upward — "Big 12 Freshman of Year"; sophomore confirmation pending
      volatility: 0.40,  // moderate — "can be overly aggressive early in counts against premium velocity"
      orgFit:     0.82,  // premium fit — power/speed with plus arm is broad-market value profile
      riskTrend:  0.35   // declining risk — sophomore showing whether freshman was real; early signs positive
    },

    analyst: {
      ceiling:    0.85,
      floor:      0.65,
      roleProb:   0.80,
      skillTrend: 0.80,
      volatility: 0.40,
      comparable: "Jesse Winker / Cody Bellinger hybrid",  // SOURCE: PDF p.21 — "MLB Comps"
      orgFit:     0.82,
      riskTrend:  0.35
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "Top-15 projected (#9 overall per PDF positioning)",
      developmentPath:  "TCU Big 12 — sophomore follow-up to historic freshman",
      orgInvestment:    "high",
      timelineSignal:   "fast track conditional"   // college sophomore + historic production → faster path
    },

    scout: {
      collegeStatus:     "college",
      draftPedigree:     "Top-15",    // SOURCE: PDF p.21 — "Proj. Pick: Top-15"
      projectionPath:    "everyday RF/CF — power/speed combination impact player",
      orgCommitment:     "high",
      topProspectStatus: "Big 12 Freshman of Year 2025; Top-10 multiple outlets"
    },

    // DERIVED from PDF: "only 4th player since 2002" in historic 4-category season,
    // Big 12 Freshman of Year, "rare combination of raw power and elite speed"
    analystScores: {
      timeline: 0.72,   // fast-track conditional — college sophomore; swing decisions are gating factor
      peak:     0.85,   // Cody Bellinger-type peak — power/speed RF/CF with plus arm
      path:     0.78,   // clear path — power/speed combination is high-value regardless of development area
      org:      0.80,   // high priority for broad range of organizations
      value:    0.82,   // strong sustained asset value
      floor:    0.62,   // floor gated by swing decision development
      ceil:     0.85    // elite ceiling confirmed by historic freshman production
    },

    analyst: {
      amateurCeiling: 0.85,  // "only 4th player since 2002 at D1 level" to hit 10+ HR/2B/3B/SB (PDF p.21)
      draftValue:     0.80,  // top-15 slot — strong
      ascentSpeed:    0.78,  // good — college sophomore with elite tools on two fronts
      setbacks:       0.25,  // low — swing decisions are addressable development item
      recoveryTrack:  0.80,  // strong — power/speed foundation is durable even if swing improves slowly
      orgPatience:    0.78,  // orgs invest in patience for power/speed profiles; expectations are reasonable
      careerArc:      0.82,  // excellent career arc — power/speed OF ages well
      longView:       0.82   // strong long-term value — "double-plus raw power" holds through career
    }

  }

}
