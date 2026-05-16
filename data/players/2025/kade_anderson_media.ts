/**
 * Pass 68 — Kade Anderson Media (2026-05-14)
 * CWS MOP + #3 overall pick + fast-track AA dominance = elevated media baseline
 * narrativeStrength 0.90: "CWS hero → fast-track AA dominance" arc is genuinely compelling
 */

export const kade_anderson_media = {

  /* =========================
     SNAPSHOT — current attention signals
  ========================= */
  snapshot: {
    mentions:        0.75,
    headlineImpact:  0.75,
    highlightFactor: 0.82,
    socialBuzz:      0.72
  },

  /* =========================
     SCOUT — medium-term media presence
  ========================= */
  scout: {
    fanRecognition:    0.75,
    teamVisibility:    0.65,
    interviewPresence: 0.70,
    narrativeStrength: 0.90,  // CWS MOP + #3 overall + fast-track = durable narrative
    milestoneAttention: 0.85
  },

  /* =========================
     ANALYST — projected media trajectory
  ========================= */
  analyst: {
    prospectPedigree:    0.90,  // top-15 MiLB
    hypeTrend:           0.85,  // currently dominating; attention climbing
    mediaStability:      0.75,
    storyDurability:     0.85,  // CWS narrative is permanent; AA dominance is present-tense
    breakoutProbability: 0.80,
    publicMomentum:      0.85,
    attentionDecay:      0.25,
    confidence:          0.85
  }
}
