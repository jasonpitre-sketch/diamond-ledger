/* =============================================================
   DREW BURRESS — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 19–20
   Generated: 2026-05-09 | Pass 21

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.19-20):
     "#8 Overall" per PDF positioning
     "Georgia Tech platform give him strong visibility in the hobby"
     "GT Freshman HR Record (2024)"
     "GT Program Record — OA (2024)"
     "ACC: #1 Extra-Base Hits (2025)"
     "ACC: #1 Doubles (2025)"
     "ACC: #2 Home Runs (2025)"
     "Small players who slug are hobby darlings — the Mookie Betts
      comparison gets collectors excited"
     "His underlying metrics are off the charts"
     "When I see 113 mph EV, 17% walk rate, 94th-percentile chase rate
      from a college bat, I don't care about the height"
   ============================================================= */

export const drew_burress_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.62,  // strong national coverage — GT platform, ACC records, analytics coverage
    headlineImpact:  0.62,  // GT freshman HR record, ACC doubles leader — production headlines
    highlightFactor: 0.60,  // shorter player who slugs = compelling highlight content; 113 mph EV plays
    socialBuzz:      0.58   // "Mookie Betts comp" drives collector social engagement; analytics community strong
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.60,  // strong within analytics/prospect community; "size" story crossover potential
    teamVisibility:     0.72,  // Georgia Tech ACC platform — solid national TV presence; same as Lackey
    interviewPresence:  0.62,  // GT production story creates strong media access; "size story" is compelling
    narrativeStrength:  0.75,  // "5'9" with Mookie Betts comp + record-breaking production" = strong narrative
    milestoneAttention: 0.78   // GT freshman HR record, GT program OA record, ACC doubles leader —
                               // three distinct milestone achievements across two seasons
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-looking media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.80,  // strong pedigree — GT record-breaker, ACC elite, top-12 draft pick
                             // "analytics darling" framing sustains within prospect media community

    hypeTrend:        0.72,  // steady ascending — "production overrides prototyping" narrative is building;
                             // each new advanced metric confirmation drives analytics community attention

    mediaStability:   0.75,  // HIGH STABILITY for SLEEPER_VALUE archetype — "GT platform gives strong
                             // visibility"; production-based story is stable (not hype-dependent)

    storyDurability:  0.78,  // "small player who slugs" is uniquely durable narrative — Mookie Betts
                             // remains active reference; size + production combo sustains long-term

    breakoutProbability: 0.72,  // analytics-driven breakout — MLB.com, FanGraphs likely strong coverage;
                                // "underlying numbers off the charts" makes him easy analytics story

    publicMomentum:   0.65,  // building within analytics community; mainstream crossover requires
                             // pro performance; Mookie Betts comp is the mainstream trigger

    attentionDecay:   0.72,  // MODERATE-LOW DECAY — production-based stories decay slower than hype stories;
                             // "analytics darling" community is sticky and re-validates consistently

    confidence:       0.78   // high confidence — production metrics are verifiable, multi-source confirmed;
                             // GT ACC context provides strong signal quality
  }

}
