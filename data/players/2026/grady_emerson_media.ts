/* =============================================================
   GRADY EMERSON — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 7–8
   Generated: 2026-05-09 | Pass 21

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.7-8):
     "#1 HS Prospect — Baseball America"
     "significant national coverage from Baseball America, MLB.com video
      features, and USA Baseball profile pieces"
     "compelling national narrative — small-town Texas kid mentored
      by former big leaguer Rusty Greer"
     "Texas commit provides leverage for aggressive bonus negotiation
      — itself generates media attention around draft day"
     "first-ever USA Baseball player to represent national program
      on both the 15U and 18U national teams"
     "#2 overall on MLB Pipeline"
   ============================================================= */

export const grady_emerson_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.72,  // strong national coverage — BA, MLB.com, USA Baseball; below #1 overall Roch
    headlineImpact:  0.70,  // "#1 HS Prospect" stories; Team USA gold medal narrative; Texas commit
    highlightFactor: 0.75,  // showcase highlights, Team USA footage, Fort Worth Christian coverage
    socialBuzz:      0.62   // Texas prep market + national baseball community; strong regional signal
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.68,  // nationally known as top prep player — crossover awareness in hobby
    teamVisibility:     0.62,  // Fort Worth Christian — strong Texas prep circuit; not a national TV platform
    interviewPresence:  0.65,  // "advanced mental approach" cited; USA Baseball profile pieces
    narrativeStrength:  0.80,  // "small-town Texas kid mentored by Rusty Greer" — compelling human story
    milestoneAttention: 0.78   // first dual 15U/18U USA Baseball rep in program history — unique milestone
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-looking media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.88,  // #1 HS prospect BA, #2 overall Pipeline — top-tier pedigree signal

    hypeTrend:        0.75,  // building toward draft; Texas commit leverage adds draft-day attention cycle;
                             // below college player Roch but top of prep class hype

    mediaStability:   0.78,  // "relaxed demeanor", clean image, elite performance = stable narrative base;
                             // Rusty Greer mentorship adds durability to the story

    storyDurability:  0.80,  // "first dual USA Baseball 15U/18U rep" + Texas narrative sustains
                             // across multiple news cycles through draft and signing

    breakoutProbability: 0.80,  // already national story; draft day pick-2 to pick-5 announcement
                                // guarantees mainstream baseball coverage

    publicMomentum:   0.72,  // Texas prep market + national draft build; bonus negotiation drama adds cycle

    attentionDecay:   0.75,  // MODERATE DECAY — prep player development arc is longer; national attention
                             // may soften post-draft before professional arrival creates next catalyst

    confidence:       0.78   // good confidence in media signals; multiple independent source types
                             // (national rankings, USA Baseball, area scout quotes, prep production)
  }

}
