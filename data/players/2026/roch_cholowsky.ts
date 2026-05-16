/* =============================================================
   ROCH CHOLOWSKY — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 3–5
   Generated: 2026-05-08 | Pass 18
   Format: Domain-file (Tier A) — Golden Template

   DRAFT STATUS: #1 Overall Projected — Chicago White Sox
   Final team pending draft (July 2026). team: "TBD" until signed.

   TRACKER NOTE:
     AB is intentionally not set. Roch is a pre-draft player with
     no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro AB.
     The tracker holds 2026 college season stats for display only.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired. See ENGINE_FREEZE.md.

   See ROCH_GOLDEN_TEMPLATE_REPORT.md for full audit.
   ============================================================= */

import { roch_cholowsky_knowledge }    from "./roch_cholowsky_knowledge"
import { roch_cholowsky_performance }  from "./roch_cholowsky_performance"
import { roch_cholowsky_media }        from "./roch_cholowsky_media"
import { roch_cholowsky_market }       from "./roch_cholowsky_market"

export const roch_cholowsky = {
  id:       "roch_cholowsky",
  name:     "Roch Cholowsky",

  // SOURCE: PDF p.3 — "Proj. Pick: #1 Overall (White Sox)"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "SS",

  tier:     "Draft",
  level:    "Draft",

  age:      21,   // SOURCE: PDF p.3 — "AGE: 21"

  bats:    "R",   // SOURCE: PDF p.3 — "B/T: R/R"
  throws:  "R",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // consensus #1 pre-draft — heat is ascending
    price:   "rising"    // market comps to Bobby Witt Jr. trajectory; pre-draft rising
  },

  /* =========================
     MARKET ARCHETYPE (Pass 20)
     Pre-Bowman market personality — projected hobby intelligence only.
     PREMIUM_COLLEGE_BAT: polished college hitter profile.
       stable demand, strong collector trust, moderate volatility,
       strong Bowman floor. Lower correction risk vs. toolsy archetypes.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "PREMIUM_COLLEGE_BAT" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   roch_cholowsky_knowledge,
  performance: roch_cholowsky_performance,
  media:       roch_cholowsky_media,
  cardMarket:  roch_cholowsky_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2025 sophomore season (PDF p.4)
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    AVG: 0.353,   // 2025 sophomore season
    H:   89,      // SOURCE: UCLA Athletics official bio — confirmed Pass 23; 2025 full season
    AB:  252,     // SOURCE: Pass 23.5 authoritative stat line — "AB=252"
    HR:  23,
    RBI: 74,
    BB:  45,      // SOURCE: Pass 23.5 authoritative stat line — "BB=45"
    K:   30,      // SOURCE: Pass 23.5 authoritative stat line — "K=30"
    OPS: 1.190,
    SB:  7
  },

  pitching: null,

  /* =========================
     TRACKER — 2026 college season display
     AB intentionally absent — pre-draft player has no professional sample.
     sampleConfidence() → 0.6 baseline (no AB/IP = minimum floor, correct behavior).
     All stats are 2026 NCAA season through mid-May.
     SOURCE: PDF p.4 — "2026 SEASON (JUNIOR — NCAA, through mid-May)"
  ========================= */
  tracker: {
    // PA not set — would trigger sampleConfidence incorrectly
    // AB not set at root — see TRACKER NOTE above; pre-draft player has no professional sample
    // 2026 junior season — UCLA official stats page (uclabruins.com)
    // Pass 64 refresh (2026-05-14): GP=51, PA=249, AB=198, H=67, R=69, 2B=10, 3B=0, HR=21,
    //   RBI=59, BB=29, HBP=22, K=31, SB=1, GDP=5, AVG=.338, OBP=.463, SLG=.707, OPS=1.170
    G:   51,        // SOURCE: UCLA stats page — "GP: 51" (Pass 64)
    AB:  198,       // SOURCE: UCLA stats page — "AB: 198" — feeds 2026 row in IntelStack
    H:   67,        // SOURCE: UCLA stats page — "H: 67" — feeds 2026 row in IntelStack
    HR:  21,        // SOURCE: UCLA stats page — "HR: 21" (Pass 64; was 18)
    RBI: 59,        // SOURCE: UCLA stats page — "RBI: 59" (Pass 64; was 55)
    BB:  29,        // SOURCE: UCLA stats page — "BB: 29"
    K:   31,        // SOURCE: UCLA stats page — "K: 31" (Pass 64; was 28)
    AVG: 0.338,     // SOURCE: UCLA stats page — "BA: .338" (Pass 64; was .335)
    OBP: 0.463,     // SOURCE: UCLA stats page — "OBP: .463" (Pass 64; was .465)
    OPS: 1.170,     // SOURCE: UCLA stats page — "OPS: 1.170" (Pass 64; was 1.141)

    // No short-term game-level data available in source
    lastGame: null,
    last7:    null,

    // No rolling windows available for college season
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — display-only context
     Based on 2025 full season (only complete NCAA season available).
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    // Pass 64 refresh — career totals through ~5/10/2026 (UCLA official stats page).
    // SOURCE: UCLA Athletics career stats page — confirmed Pass 64.
    // Includes Freshman (2024) + Sophomore 2025 + Junior 2026 (through 5/10/2026).
    AVG: 0.335,   // DIRECTLY SOURCED: career BA=.335 through 5/10/2026
    OBP: 0.451,   // DIRECTLY SOURCED: career OBP=.451
    SLG: 0.645,   // DIRECTLY SOURCED: career SLG=.645
    OPS: 1.096,   // DIRECTLY SOURCED: career OPS=1.096
    HR:  52,      // DIRECTLY SOURCED: career HR=52
    RBI: 166,     // DIRECTLY SOURCED: career RBI=166
    H:   217,     // DIRECTLY SOURCED: career H=217
    AB:  648,     // DIRECTLY SOURCED: career AB=648
    BB:  98,      // DIRECTLY SOURCED: career BB=98
    K:   95,      // DIRECTLY SOURCED: career K=95
    SB:  8,       // DERIVED: 2025 SB=7 + 2026 SB=1 = 8 (freshman SB data not explicitly provided)
    G:   169,     // DIRECTLY SOURCED: career GP=169
    doubles: 41,  // DIRECTLY SOURCED: career 2B=41
    triples:  2,  // DIRECTLY SOURCED: career 3B=2
    hbp:     51   // DIRECTLY SOURCED: career HBP=51
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  // Pass 64: updated to career totals through 5/10/2026 (UCLA official stats page).
  careerLineage: {
    stages: [
  {
    label: "NCAA",
    hitting: {
      G:   169,
      AB:  648,
      H:   217,
      HR:  52,
      RBI: 166,
      BB:  98,
      K:   95,
      SB:  8,
      AVG: 0.335,
      OPS: 1.096,
    }
  }
    ]
  },

  /* =========================
     DLR ENGINE LINK
     Legacy backrefs — per PLAYER_CONTRACT.md DLR Field Rules.
     calculateDLR() reads domain layers directly, not from dlr.*.
     These backrefs are for compatibility only.
  ========================= */
  dlr: {
    performance: roch_cholowsky_performance,
    media:       roch_cholowsky_media,
    cardMarket:  roch_cholowsky_market
  }

}
