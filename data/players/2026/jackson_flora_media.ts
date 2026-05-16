/* =============================================================
   JACKSON FLORA — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 11–12
   Generated: 2026-05-09 | Pass 21

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.11-12):
     "#3 Overall — Baseball America"
     "#1 pitcher in draft class"
     "historically dominant numbers across two seasons"
     "0.73 ERA — led all of NCAA Division I"
     "potential is through the roof"
     "Big West Pitcher of Year 2025/26"
     "Triple-digit fastball" — 100+ mph recorded
     "multiple consecutive dominant starts — Big West shutout streak"
   ============================================================= */

export const jackson_flora_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.72,  // strong national coverage — #1 pitcher narrative drives Baseball America,
                            // MLB Pipeline, FanGraphs, Big West media
    headlineImpact:  0.70,  // "0.73 ERA led all of D1" — elite headline narrative; 100 mph velocity
    highlightFactor: 0.68,  // pitcher highlights are less viral than bat; Big West shutout streak notable
    socialBuzz:      0.62   // California + national prospect buzz; velocity narrative drives social engagement
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.65,  // #1 pitcher nationally — known within prospect community broadly
    teamVisibility:     0.60,  // UCSB — regional program, not major national TV platform; Big West
    interviewPresence:  0.62,  // "highly coachable", area scout quotes in PDF suggest media access
    narrativeStrength:  0.75,  // "0.73 ERA" + "100 mph fastball" + "historically dominant" = strong narrative
    milestoneAttention: 0.78   // #1 ERA in D1, #1 OPS Against in D1 — statistical milestones are compelling
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-looking media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.85,  // #3 overall BA, #1 pitcher in class — top-tier pitching pedigree signal

    hypeTrend:        0.72,  // building — "potential is through the roof" language; 100 mph velocity story
                             // changeup emergence narrative creates sustained analyst attention

    mediaStability:   0.68,  // "highly coachable" clean image; UCSB platform limits national reach
                             // pitcher health flag (7/10) is moderate stability risk

    storyDurability:  0.72,  // "historically dominant" D1 numbers sustain across pre-draft window;
                             // 100 mph velocity is always-fresh narrative hook for media

    breakoutProbability: 0.78,  // already broken out at D1 level; draft-day top-6 pick = next catalyst
                                // pro debut will be heavily covered as "100 mph right-hander" narrative

    publicMomentum:   0.65,  // building within scouting community; UCSB platform limits mainstream crossover
                             // velocity story can break through — "100 mph" drives casual baseball fan attention

    attentionDecay:   0.60,  // MODERATE DECAY RISK — pitcher development arc is long; health concern creates
                             // volatility in attention; minor injury = sharp narrative shift

    confidence:       0.72   // good confidence in media signals — multiple independent validation sources;
                             // historic D1 numbers are verifiable and compelling
  }

}
