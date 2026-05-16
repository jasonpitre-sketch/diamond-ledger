/* =============================================================
   GIO ROJAS — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 23–25
   Generated: 2026-05-09 | Pass 21

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.23-25):
     "#1 Prep Pitcher — MLB Pipeline"
     "#10 Overall — MLB Pipeline"
     "Baseball America — Top 100"
     "'Will the Lightning-Armed Lefty Be the First 2026 Prep Arm
      Drafted?' — Baseball America"
     "multiple MLB Pipeline features"
     "Stoneman Douglas HS — deep community resonance"
     "Miami-area market proximity (Marlins projected interest at pick 14)
      adds a compelling local narrative"
     "Left-handed pitching prospects with elite velocity are among the
      most sought-after Bowman targets in the hobby"
   ============================================================= */

export const gio_rojas_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.65,  // strong national coverage — BA feature article, Pipeline features, #1 prep pitcher
    headlineImpact:  0.68,  // "98 mph lefty from Stoneman Douglas" — compelling dual-identity headline
    highlightFactor: 0.65,  // pitcher highlights; upper-90s velocity clips are attention-grabbing
    socialBuzz:      0.60   // Florida + national velocity narrative; Stoneman Douglas name recognition helps
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.62,  // "#1 prep pitcher" nationally — known within prospect community
    teamVisibility:     0.58,  // Stoneman Douglas HS — prominent FL program with national resonance
    interviewPresence:  0.60,  // prep pitcher profile pieces; BA feature article confirms media access
    narrativeStrength:  0.82,  // "98 mph prep lefty from Stoneman Douglas" = uniquely durable dual story;
                               // velocity + school name = two independent hooks reinforcing each other
    milestoneAttention: 0.75   // "#1 Prep Pitcher Pipeline", "#10 Overall", BA Top-100 — clean milestone stack
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-looking media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.82,  // #1 prep pitcher, #10 overall — strong pedigree signal at prep pitcher level

    hypeTrend:        0.72,  // building — "first 2026 prep arm drafted?" narrative drives pre-draft attention;
                             // velocity narrative builds through draft week

    mediaStability:   0.58,  // LOWER — "HIGH" health risk explicitly noted (PDF p.24) creates narrative
                             // vulnerability; prep pitcher = 3-5 year timeline before meaningful results
                             // Stoneman Douglas name provides institutional stability floor

    storyDurability:  0.80,  // "Stoneman Douglas" name carries significant community and narrative weight;
                             // 98 mph lefty is always-fresh media hook; velocity development story sustains
                             // as he progresses through professional levels

    breakoutProbability: 0.72,  // draft-day pick announcement is the first media peak;
                                // pro debut is 3-5 years away — very long horizon for next catalyst
                                // LHP with 98 mph = always a compelling narrative event

    publicMomentum:   0.62,  // building within prospect community; mainstream crossover requires
                             // professional performance; "Will the Lightning-Armed Lefty...?" drives interest

    attentionDecay:   0.55,  // HIGHER DECAY — prep pitcher with 3-5 year timeline has longest attention gap;
                             // velocity needs professional validation to sustain mainstream narrative
                             // Stoneman Douglas institutional connection provides some decay resistance

    confidence:       0.68   // good confidence — multiple national sources confirm pedigree;
                             // prep pitcher uncertainty (health, timeline) tempers signal confidence
  }

}
