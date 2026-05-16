/* =============================================================
   VAHN LACKEY — MEDIA DOMAIN FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 9–10
   Generated: 2026-05-09 | Pass 21

   All values are 0–1 pre-normalized floats.
   No physical stats. All values derived from PDF media/marketing
   section language.

   SOURCE LANGUAGE (PDF p.9-10):
     "Georgia Tech catcher legacy — Varitek, Wieters, Bart, Parada"
     "best defensive catcher in this class"
     "total package"
     "Named top catcher in ACC"
     "Team USA selection"
     "offensive explosion elevated him from safe mid-first-round
      pick to a legitimate top-5 candidate"
     "Georgia Tech pedigree — following Parada's successful 2022
      Bowman performance — gives collectors a familiar narrative"
   ============================================================= */

export const vahn_lackey_media = {

  /* =========================
     SNAPSHOT (short-term buzz)
     Reflects current national coverage velocity.
  ========================= */

  snapshot: {
    mentions:        0.62,  // solid national coverage — ACC, MLB Pipeline, catcher-specific outlets
    headlineImpact:  0.60,  // GT catcher legacy stories; offensive explosion news cycle
    highlightFactor: 0.55,  // catching highlights (pop times, framing) are niche; less viral than hitting
    socialBuzz:      0.52   // strong within catching/scouting community; below mainstream baseball buzz
  },


  /* =========================
     SCOUT (visibility base)
     Measures platform depth and recognition depth.
  ========================= */

  scout: {
    fanRecognition:     0.55,  // catchers have dedicated follower base but less mainstream awareness
    teamVisibility:     0.72,  // Georgia Tech ACC platform — good conference TV presence
    interviewPresence:  0.58,  // GT catcher legacy generates interview demand from prospect media
    narrativeStrength:  0.72,  // "latest in extraordinary GT catcher line" — Varitek/Wieters/Bart/Parada
    milestoneAttention: 0.68   // "9 SB in 47 games — almost unheard of for a catcher"; ACC All-Conference
  },


  /* =========================
     ANALYST (long-cycle media)
     Measures narrative durability and forward-looking media value.
  ========================= */

  analyst: {
    prospectPedigree: 0.82,  // #3 overall projected — top catcher in class; strong pedigree signal

    hypeTrend:        0.65,  // building — "elevated from safe mid-first-round pick to top-5 candidate"
                             // offensive explosion drove significant re-rating attention cycle

    mediaStability:   0.72,  // GT catcher legacy provides durable narrative base;
                             // catchers are steady media subjects (not as volatile as toolsy bats)

    storyDurability:  0.72,  // "GT catcher lineage" sustains through draft and pro debut;
                             // comparisons to Parada/Bart provide ongoing reference hooks

    breakoutProbability: 0.72,  // offensive explosion was in-season breakout; Bowman card = next catalyst

    publicMomentum:   0.60,  // steady build within scouting community; catching specialty limits
                             // mainstream crossover relative to SS/OF prospects

    attentionDecay:   0.70,  // MODERATE-LOW DECAY — GT legacy + elite defensive profile sustain through debut;
                             // catching positional value keeps analyst attention stable

    confidence:       0.75   // good confidence in media signals — GT program provides consistent validation;
                             // scouting community consensus around defensive profile is strong
  }

}
