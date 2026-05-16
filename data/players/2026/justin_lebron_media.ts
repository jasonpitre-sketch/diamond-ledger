/* =============================================================
   JUSTIN LEBRON — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 13–14
   Generated: 2026-05-09 | Pass 21

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.13-14):
     "one of the most fascinating narratives in the 2026 draft class"
     "former unanimous #1 overall"
     "SEC All-Conference 2025"
     "Multiple Mock Draft Top-5"
     "Rangers, Marlins, Pirates all linked"
     "sliding draft stock from former #1 to likely #5-10 creates
      interesting hobby dynamics"
     "high-risk, high-reward investment profile"
   ============================================================= */

export const justin_lebron_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.68,  // strong national coverage — "fascinating narrative", multiple mock draft links
    headlineImpact:  0.62,  // "former #1 slides to #5-10" is active story; sliding stock drives news
    highlightFactor: 0.72,  // elite tools create compelling highlight content — arm, speed, raw power plays
    socialBuzz:      0.65   // draft debate fuel — "can go from top-5 to outside top-20" creates engagement
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.68,  // "former unanimous #1" — widely known within prospect community nationally
    teamVisibility:     0.72,  // Alabama SEC — national TV games, high program visibility
    interviewPresence:  0.65,  // Florida native; Alabama program generates media access
    narrativeStrength:  0.80,  // "fascinating narrative" — former #1 sliding creates ongoing media hook;
                               // multiple team links (Rangers, Marlins, Pirates) add daily story fuel
    milestoneAttention: 0.68   // 18 HR sophomore, SEC All-Conference 2025; junior regression also gets coverage
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-calling media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.85,  // "former unanimous #1 overall" — pedigree signal remains elite
                             // current ranking (#5) doesn't fully erase the pedigree premium

    hypeTrend:        0.58,  // DECLINING from peak — "sliding stock" narrative is actively downward;
                             // tools-vs-results debate creates sustained but lower-intensity hype

    mediaStability:   0.55,  // LOWER — sliding stock creates volatile coverage tone;
                             // "could go anywhere from top-5 to outside top-20" = unstable narrative

    storyDurability:  0.75,  // "most fascinating narratives in class" — even declining stock sustains
                             // analyst attention; tools debate will follow through pro career

    breakoutProbability: 0.75,  // high probability of a dramatic breakout moment at pro level;
                                // tools profile = one great start away from market re-rating

    publicMomentum:   0.60,  // DECLINING from peak — sliding stock hurts momentum;
                             // tools argument keeps it from collapsing entirely

    attentionDecay:   0.60,  // MODERATE DECAY — stock slide creates attention softening;
                             // "re-rating" events will be the next catalyst if/when they occur

    confidence:       0.72   // good confidence in signals — multiple independent sources validate tools;
                             // production regression is real and documented in sourced data
  }

}
