/* =============================================================
   JACOB LOMBARD — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 17–18
   Generated: 2026-05-09 | Pass 21

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.17-18):
     "most fascinating prospect in 2026 class — and certainly the
      most polarizing"
     "baseball family angle — father and older brother both drafted
      — is a unique multi-card collector play"
     "#7 Overall — MLB Pipeline"
     "#1 SS in Florida (Perfect Game)"
     "High-ceiling, high-risk profiles are hobby catnip"
     "drama of his contact question create a compelling collector narrative"
     "2nd-fastest 60 time among 226 runners at PG National 2025"
     "Multiple State Championships in Soccer — Gulliver Prep"
   ============================================================= */

export const jacob_lombard_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.65,  // strong national coverage — "most polarizing" framing drives ongoing attention
    headlineImpact:  0.68,  // "Lombard bloodline" + "39% swing/miss" debate generates recurring headlines
    highlightFactor: 0.78,  // 6.11s 60-yard dash + elite speed highlights are highly shareable; PG showcase
    socialBuzz:      0.72   // "most polarizing" profile drives social debate; baseball family angle viral
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.68,  // nationally known within prospect community — "most polarizing" drives awareness
    teamVisibility:     0.60,  // Gulliver Prep Miami — strong Florida prep circuit; not major national TV
    interviewPresence:  0.70,  // baseball family background generates strong media access and narrative
    narrativeStrength:  0.90,  // "father (MLB bench coach) + brother (Yankees 1st Rd) + him top-12" = elite story
                               // "most fascinating prospect in class" is a durable media hook
    milestoneAttention: 0.78   // 2nd-fastest 60 at PG National (226 runners), soccer state championships,
                               // #1 SS Florida — milestone stack is compelling
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-looking media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.82,  // #7 Pipeline, #1 SS Florida, "most polarizing" framing — strong pedigree signal

    hypeTrend:        0.80,  // "most fascinating and polarizing" — HYPE_MONSTER archetype core behavior;
                             // Wander Franco ceiling comp drives maximum collector imagination

    mediaStability:   0.40,  // LOWER — "could go anywhere from top-5 to outside top-20" creates volatile
                             // media environment; contact question creates ongoing negative news risk

    storyDurability:  0.88,  // "baseball family" angle is uniquely durable — father coaching, brother in
                             // Yankees system; multi-generational narrative sustains for years

    breakoutProbability: 0.82,  // "hobby catnip" framing per PDF — polarizing profiles spike on breakthrough;
                                // one great start = market-moving narrative event

    publicMomentum:   0.72,  // active hype — "most fascinating", Wander Franco comp, elite measurables;
                             // "multi-card collector play" from baseball family drives collector attention

    attentionDecay:   0.65,  // MODERATE DECAY — "high-risk" narrative can sustain or collapse depending on
                             // first professional results; "the drama" is the hook, which requires renewal

    confidence:       0.68   // moderate confidence — "most polarizing" means media signals are mixed;
                             // hype is real but contact concern creates ongoing narrative volatility
  }

}
