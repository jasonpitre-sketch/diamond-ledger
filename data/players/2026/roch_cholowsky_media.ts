/* =============================================================
   ROCH CHOLOWSKY — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Page 5
   Generated: 2026-05-08 | Pass 18

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.5):
     "consensus #1 pick in the 2026 Draft class"
     "substantial national media coverage across MLB.com, Baseball
      America, ESPN, and FanGraphs"
     "featured prominently by MLB Pipeline's prospect team"
     "multiple 'best shortstop in a decade' narrative pieces"
     "clean-cut image, elite performance, and Pac-12 platform
      position him as extremely marketable"
     "strong social media engagement within the baseball community"
     "NIL deals have begun to reflect his draft position"
     "National media will heavily cover his pre-draft process
      throughout May–July 2026"
   ============================================================= */

export const roch_cholowsky_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.88,  // MLB.com, BA, ESPN, FanGraphs, Pipeline — substantial national volume
    headlineImpact:  0.85,  // multiple featured "best SS in a decade" stories; pre-draft lead stories
    highlightFactor: 0.82,  // Brooks Wallace ceremony, Big Ten awards, showcase highlights
    socialBuzz:      0.80   // "strong within baseball community" — NIL deals reinforcing signal
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.82,  // nationally recognized as #1 prospect — high crossover awareness
    teamVisibility:     0.85,  // UCLA Pac-12 platform — national TV games, high program visibility
    interviewPresence:  0.75,  // clean image cited; NIL deals reflect interview demand
    narrativeStrength:  0.92,  // "best shortstop in a decade" + Trea Turner / Corey Seager comps
    milestoneAttention: 0.90   // Brooks Wallace (1st sophomore, 1st Bruin), D1 WAR leader,
                               // Big Ten POY + Defensive POY — milestone stack is exceptional
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-looking media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.98,  // consensus #1 overall — highest tier (just below 1.0 = theoretical max)

    hypeTrend:        0.90,  // building toward draft, on pace for 2nd Brooks Wallace,
                             // White Sox pick-1 speculation driving sustained news cycle

    mediaStability:   0.85,  // "clean-cut image" + consistent performance = stable narrative base;
                             // no controversy, no volatility in coverage tone

    storyDurability:  0.90,  // "best shortstop in a decade" + historical milestones sustain
                             // across multiple news cycles through draft July 2026

    breakoutProbability: 0.92,  // already broken out at college level; #1 overall pick = sustained
                                // mainstream baseball media profile through signing + debut

    publicMomentum:   0.88,  // national pre-draft build with White Sox coverage overlay;
                             // "National media will heavily cover pre-draft process" (PDF p.5)

    attentionDecay:   0.88,  // LOW DECAY RISK — "best SS in a decade" narrative + historical awards
                             // provide durable media hook through debut and early MLB career

    confidence:       0.90   // high confidence in all media signals; supported by multiple
                             // independent source types (awards, performance, national coverage)
  }

}
