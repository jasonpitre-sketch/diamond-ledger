/**
 * Pass 70 — Brady Singer Media (2026-05-14)
 * Moderate MLB media presence — established veteran, not a star.
 * No family pedigree. College-to-MLB career narrative without sustained hype cycle.
 * Currently struggling (5.79 ERA) — media momentum is low.
 */

export const brady_singer_media = {

  /* =========================
     SNAPSHOT — current attention signals
  ========================= */
  snapshot: {
    mentions:        0.55,   // moderate — established MLB name but not marquee
    headlineImpact:  0.50,   // occasional coverage; no sustained beat presence
    highlightFactor: 0.50,   // nothing noteworthy recently given slump
    socialBuzz:      0.45    // below average — struggling pitchers lose social traction
  },

  /* =========================
     SCOUT — structural media signals
  ========================= */
  scout: {
    fanRecognition:   0.55,
    teamVisibility:   0.55,
    interviewPresence: 0.55,
    narrativeStrength: 0.50,  // "volatile career" arc is a story but not a hyped one
    milestoneAttention: 0.45  // no milestone proximity; slump suppresses interest
  },

  /* =========================
     ANALYST — long-term media signals
  ========================= */
  analyst: {
    prospectPedigree:   0.45,  // graduated long ago; draft pedigree no longer active signal
    hypeTrend:          0.35,  // currently declining — slump suppresses any narrative building
    mediaStability:     0.55,  // steady MLB veteran; no dramatic swings in coverage floor
    storyDurability:    0.50,  // mid-rotation starter story has low long-term durability
    breakoutProbability: 0.35, // age 29, past prime development window
    publicMomentum:     0.30,  // struggling = low public momentum
    attentionDecay:     0.55,  // moderate decay risk — not a beat-writer favorite
    confidence:         0.65   // established player; media signals are predictable
  }

}
