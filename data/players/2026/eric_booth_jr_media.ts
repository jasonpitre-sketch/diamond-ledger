/* =============================================================
   ERIC BOOTH JR. — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 15–16
   Generated: 2026-05-09 | Pass 21

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.15-16):
     "#6 Overall — MLB Pipeline"
     "Baseball America Top-10"
     "'dynamic power/speed combo center fielder' — Baseball America"
     "Rising All Spring — steadily climbing boards since January"
     "PBR Top-200 Spring Update"
     "fan favorite at national showcases throughout the Southeast"
     "youngest hitter currently ranked inside the first round"
     "turns 18 on July 4 — just weeks before the draft"
   ============================================================= */

export const eric_booth_jr_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.58,  // solid national coverage — "Rising All Spring"; BA, Pipeline, PBR coverage
    headlineImpact:  0.60,  // "youngest hitter in round 1" + July 4 birthday story is compelling
    highlightFactor: 0.72,  // 70-grade speed highlights are highly shareable — showcase videos viral
    socialBuzz:      0.62   // Southeast fan favorite; "dynamic" style generates strong social engagement
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.58,  // known within prospect community; "fan favorite at national showcases"
    teamVisibility:     0.50,  // Oak Grove HS — Mississippi program, regional visibility; not national TV
    interviewPresence:  0.52,  // limited at prep level; Vanderbilt commit story creates some access
    narrativeStrength:  0.72,  // "youngest in round 1 + July 4 birthday + Byron Buxton comp" = strong story
    milestoneAttention: 0.65   // 27 SB, 5 triples in junior season; "Rising All Spring" coverage
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-looking media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.78,  // #6 Pipeline, BA Top-10 — strong prep pedigree; below college elite tier

    hypeTrend:        0.72,  // ASCENDING — "steadily climbing boards since January";
                             // youngest-in-class narrative builds toward draft day

    mediaStability:   0.68,  // prep player — stable within scouting community; breakthrough with national
                             // mainstream required; July 4 birthday story is high-value draft day hook

    storyDurability:  0.72,  // "youngest first-rounder" + July 4 birthday + Vanderbilt leverage sustain
                             // multiple news cycles; development arc creates ongoing storyline for years

    breakoutProbability: 0.78,  // Draft-day top-10 pick announcement = mainstream moment;
                                // 70-grade speed highlight plays are high virality trigger

    publicMomentum:   0.65,  // building steadily — "Rising All Spring" confirms ascending trajectory
                             // Southeast regional profile expanding to national as draft approaches

    attentionDecay:   0.70,  // MODERATE-LOW DECAY — youngest player creates long narrative window;
                             // development arc gives media multiple future catalyst points (every level)

    confidence:       0.70   // good confidence — multiple independent national ranking sources;
                             // prep data is more limited than college but consistent across sources
  }

}
