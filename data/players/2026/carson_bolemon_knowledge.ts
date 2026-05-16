/* =============================================================
   CARSON BOLEMON — KNOWLEDGE DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence / PBR scouting reports
           MaxPreps career data (May 14, 2026)
   Generated: 2026-05-14 | Pass 63
   Format: Domain-file (Tier A)

   All pitch grades sourced from PBR scouting language / draft publications.
   Analyst scores derived from performance profile and scouting language.
   Fields marked ESTIMATE or DERIVED are interpretations, not
   directly stated numbers.

   PITCHER tools: fastball, breaking, offspeed, command, control (20–80 scale)
   NOTE: Bolemon is a DUAL-DOMAIN player (LHP + DH/1B). This knowledge
   file covers the pitching/scout knowledge layer. Batting knowledge
   is implicit in the performance domain (requiresDualDomain: true).
   ============================================================= */

export const carson_bolemon_knowledge = {

  age: 19,
  mlbGames: 0,   // pre-draft — no MLB service time

  /* =========================
     BIO
  ========================= */

  bio: {

    snapshot: {
      height:  "6'3\"",            // SOURCE: PBR scouting — estimated projectable HS frame
      weight:  "195",              // SOURCE: PBR scouting — lean, projectable build
      bats:    "R",
      throws:  "L",
      school:  "Southside Christian HS (Senior)"
    },

    // DERIVED: 0–1 normalized scores from scouting profile language
    scoutScores: {
      arch:  0.88,  // elite HS LHP archetype — "phenom arm" designation across draft boards;
                    // 92-96 FB + deep curveball at HS level is exceptionally rare;
                    // dual-domain (LHP + bat) adds distinct market identity
      path:  0.80,  // HS senior with advanced arm profile; Southside Christian is elite HS program;
                    // PBR / Perfect Game visibility confirms broad scouting exposure
      frame: 0.78,  // 6'3" / 195 lbs — projectable HS frame; adding pro strength expected;
                    // "lean and projectable" is ideal LHP frame language
      ath:   0.72,  // coordinated athlete; LH bat at DH/1B indicates above-average athleticism;
                    // arm-speed and delivery mechanics cited as clean in available sources
      proj:  0.85   // HIGHEST projection score — HS pitching arms with 92-96 FB at 19 carry
                    // maximum physical projection; professional strength development expected
    },

    scout: {
      birthdate:   "2007",               // DOB year derived from age 19; exact date not in source
      signBonus:   "~$5.0M",             // ESTIMATED slot value — pick #7 (2026 draft, BAL)
      archetype:   "HS phenom LHP — three-pitch starter",
      devPath:     "HS elite — power arm, command-first profile",
      frameScale:  "projectable frame"
    },

    // DERIVED from career performance and scouting language:
    // ERA=0.00 (2025 full season), career W=33, career K=422, career BAA=.078
    analystScores: {
      dev:      0.82,   // strong development arc — ERA=0.00 junior season; 3-pitch mix developing;
                        // DH batting role (career .411 AVG) shows exceptional two-way development
      risk:     0.45,   // moderate — HS arm inherently carries development risk; no pro sample;
                        // command profile (WHIP=0.254 corrected) mitigates but doesn't eliminate risk
      value:    0.82,   // pick #7 value — high by HS standards; $5M projected slot signal
      org:      0.85,   // high organizational priority for BAL — targeting elite HS arm in top-10
      pedigree: 0.84    // career 33 W / 422 K / BAA=.078 at HS level is historically elite production
    },

    analyst: {
      serviceTime: 0,     // pre-draft
      options:     4,     // HS draftees receive 4 options (college = 3)
      injuryIdx:   0.28,  // MODERATE — HS pitcher baseline risk; high-workload career (182.1 IP);
                          // no specific injury flags in available sources but career volume is notable
      pedigree:    0.84,
      devCurve:    0.80,  // strong positive development — command-first HS arm with velocity upside
      orgValue:    0.85,  // BAL top-10 pick — high-priority asset in organizational development plan
      assetRisk:   0.45,  // moderate — HS arms carry inherent path uncertainty; command mitigates
      longValue:   0.82   // strong long-term value if arm health maintained; LHP command profile ages well
    }

  },


  /* =========================
     SCOUT (TOOLS — PITCHER)
  ========================= */

  scout: {

    snapshot: {
      primaryTool:         ["fastball", "curveball"],          // 92-96 FB + elite deep curve — two weapons
      roleType:            ["starter"],                          // 3-pitch mix and command = starter projection
      physicalProjection:  ["projectable", "velocity"],          // 6'3" / 195 lbs + HS arm = velo upside
      riskProfile:         ["moderate"]                          // HS arm development baseline risk
    },

    // SOURCED from PBR / scouting publications and career performance data
    scout: {
      fastball: 60,   // SOURCE: PBR / scouting — "FB: 92-95 mph, peaks 96" — solid-plus FB at 19;
                      // LH angle adds separating value; arm-speed projects for additional velocity
      breaking: 65,   // SOURCE: PBR / scouting — "curveball 78-84 mph, great depth" — true plus offering;
                      // career K/9=20.9 at HS confirms breaking ball is dominant separator
      offspeed: 50,   // SOURCE: PBR / scouting — "harder slider low-80s" as third pitch;
                      // changeup not documented in available sources; slider at 50 is functional
      command:  65,   // DERIVED from career performance: ERA=0.00 (2025), career BAA=.078, career W=33;
                      // BB=8 in 55.1 IP (2025) = 1.3 BB/9 — elite command for HS level;
                      // WHIP=0.254 still dominant despite Pass 63 correction from stale 0.09
      control:  null  // not separately graded; command covers this
    },

    // DERIVED from career production and scouting language:
    analystScores: {
      ceiling:    0.85,  // high ceiling — LHP with 92-96 FB, plus curve, command — starter upside;
                         // projection adds 2-4 mph potential; No. 2-3 starter ceiling if path is clean
      floor:      0.60,  // floor gated by HS development uncertainty — command profile is positive anchor;
                         // "three-pitch HS LHP" with command reads as above mid-rotation floor
      roleProb:   0.78,  // strong probability of starting role — command, 3-pitch mix, ideal LHP profile
      skillTrend: 0.82,  // strong upward — velocity range expanding; curve depth developing across seasons;
                         // dual-domain batting production (.411 career AVG) confirms elite athleticism
      volatility: 0.42,  // moderate — HS development path inherently variable; command profile stabilizes
      orgFit:     0.84,  // premium fit — BAL selecting LHP command arm in top-10 = defined org need
      riskTrend:  0.40   // moderate and stable — no injury flags, clean mechanics reported; arm health is key
    },

    analyst: {
      ceiling:    0.85,
      floor:      0.60,
      roleProb:   0.78,
      skillTrend: 0.82,
      volatility: 0.42,
      comparable: "Carlos Rodón / Sean Manaea",   // DERIVED: elite HS LHP → power-command profile comps
                                                   // Rodón: HS → draft → LHP frontline; Manaea: LH command arm
      orgFit:     0.84,
      riskTrend:  0.40
    }

  },


  /* =========================
     CAREER
  ========================= */

  career: {

    snapshot: {
      draftPedigree:    "#7 overall projected (BAL)",
      developmentPath:  "HS elite fast track — LHP command arm",
      orgInvestment:    "very high",
      timelineSignal:   "standard HS"   // HS arms typically 3-5 year development arc
    },

    scout: {
      collegeStatus:     "HS",              // HS senior — no college commitment
      draftPedigree:     "#7 overall",      // SOURCE: playersDraft2026 — draftPick: 7, team: BAL
      projectionPath:    "starting pitcher — No. 2-3 rotation projection",
      orgCommitment:     "very high",
      topProspectStatus: "top-10 HS arm in 2026 draft class"
    },

    // DERIVED from career performance and draft position:
    analystScores: {
      timeline: 0.60,   // standard HS timeline — 3-5 years to MLB; command profile may accelerate
      peak:     0.85,   // frontline starter peak — LHP command profile with FB/CB/SL at 19 has high ceiling
      path:     0.72,   // clear developmental path if arm health maintained; HS to pro development is long
      org:      0.85,   // BAL organizational investment — top-10 pick = maximum development resources
      value:    0.82,   // strong sustained asset value — LHP scarcity premium at top of rotation
      floor:    0.62,   // floor gated by HS development — command talent anchors the floor above average
      ceil:     0.85    // elite ceiling confirmed by HS production + velocity range + LH profile
    },

    analyst: {
      amateurCeiling: 0.88,  // career ERA=0.00 junior season, career K/9=20.9, career BAA=.078 (HS)
      draftValue:     0.82,  // #7 overall, ~$5M slot — high value signal for HS arm
      ascentSpeed:    0.62,  // standard HS arc — command profile may accelerate relative to peers
      setbacks:       0.35,  // moderate — HS arm risk is persistent; career 182.1 IP is high for HS
      recoveryTrack:  0.72,  // clean mechanics + command profile = positive recovery baseline
      orgPatience:    0.88,  // BAL will invest heavily in top-10 HS arm development; patience built in
      careerArc:      0.80,  // strong career arc — LHP frontline projection with elite command foundation
      longView:       0.78   // strong long-term signal — LHP command arms have favorable aging curve
    }

  }

}
