/* =============================================================
   JACOB LOMBARD — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 17–18
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   DRAFT STATUS: Top-12 Projected — "Most Polarizing" Prospect in 2026 Class
   Final team pending draft (July 2026). team: "TBD" until signed.

   BLOODLINE NOTE:
     Father: George Lombard Sr. — 2nd Rd 1994, 6-yr MLB, Tigers bench coach
     Brother: George Lombard Jr. — Yankees 2023 1st Rd, Top-100 Prospect
     Jacob is tracking to be drafted higher than both (PDF p.17).

   TRACKER NOTE:
     AB is intentionally not set for professional sample. Jacob is a prep senior draft player
     with no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro AB.
     Tracker populated Pass 25.9 with full 2026 HS season from Chrome extension / MaxPreps (May 10, 2026).
     G not stated in MaxPreps full-season summary.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { jacob_lombard_knowledge }    from "./jacob_lombard_knowledge"
import { jacob_lombard_performance }  from "./jacob_lombard_performance"
import { jacob_lombard_media }        from "./jacob_lombard_media"
import { jacob_lombard_market }       from "./jacob_lombard_market"

export const jacob_lombard = {
  id:       "jacob_lombard",
  name:     "Jacob Lombard",

  // SOURCE: PDF p.17 — "Proj. Pick: Top-12"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "SS",

  tier:     "Draft",
  level:    "Draft",

  age:      18,   // SOURCE: PDF p.17 — "AGE: 18"

  bats:    "R",   // SOURCE: PDF p.17 — "B/T: R/R"
  throws:  "R",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // "most polarizing" + baseball family = sustained hype signal
    price:   "rising"    // Wander Franco ceiling comp; HYPE_MONSTER archetype pre-draft build
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     HYPE_MONSTER: maximum polarization, tool-driven hype, violent swings.
       "Hobby catnip" explicitly stated in PDF (p.18).
       "Baseball family" multi-card collector angle is unique in class.
       "Volatile, speculative" investment grade from PDF confirms archetype.
       Correction risk highest in class — hype without contact translates badly.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "HYPE_MONSTER" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   jacob_lombard_knowledge,
  performance: jacob_lombard_performance,
  media:       jacob_lombard_media,
  cardMarket:  jacob_lombard_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: Measurables available; season statline not in PDF source
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    // 2026 senior season — full (Chrome extension / MaxPreps, May 10, 2026)
    AVG: 0.477,   // SOURCE: MaxPreps (May 10, 2026) — "AVG: .477"
    H:   42,      // SOURCE: MaxPreps (May 10, 2026) — "H: 42"
    HR:  10,      // SOURCE: MaxPreps (May 10, 2026) — "HR: 10"
    RBI: 25,      // SOURCE: MaxPreps (May 10, 2026) — "RBI: 25"
    OPS: 1.471,   // SOURCE: MaxPreps (May 10, 2026) — "OPS: 1.471"
    SB:  null     // not stated
  },

  pitching: null,

  /* =========================
     TRACKER — measurables-based; season stats not available
     AB intentionally absent — pre-draft player has no professional sample.
     Season AVG, HR, etc. not stated in source PDF for Lombard.
  ========================= */
  tracker: {
    // 2026 senior season — full (Chrome extension / MaxPreps, May 10, 2026)
    // G not stated in MaxPreps full-season summary.
    G:   null,            // UNAVAILABLE — not stated in full-season summary
    AB:  88,              // SOURCE: MaxPreps (May 10, 2026) — "AB: 88"
    H:   42,              // SOURCE: MaxPreps (May 10, 2026) — "H: 42"
    HR:  10,              // SOURCE: MaxPreps (May 10, 2026) — "HR: 10"
    RBI: 25,              // SOURCE: MaxPreps (May 10, 2026) — "RBI: 25"
    BB:  24,              // SOURCE: MaxPreps (May 10, 2026) — "BB: 24"
    K:   15,              // SOURCE: MaxPreps (May 10, 2026) — "K: 15"
    AVG: 0.477,           // SOURCE: MaxPreps (May 10, 2026) — "AVG: .477"
    OBP: null,            // UNAVAILABLE — not stated in full-season summary
    OPS: 1.471,           // SOURCE: MaxPreps (May 10, 2026) — "OPS: 1.471"
    SB:  null,            // not stated

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — 2025 junior season (most recent complete prior season)
     SOURCE: MaxPreps (May 10, 2026) static fetch — OBP/SLG/R/2B now available.
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    AVG: 0.306,   // SOURCE: MaxPreps — "AVG: .306" (2025 junior season, 14 GP)
    OBP: 0.510,   // SOURCE: MaxPreps (May 10, 2026) static fetch — "OBP: .510"
    SLG: 0.750,   // SOURCE: MaxPreps (May 10, 2026) static fetch — "SLG: .750"
    OPS: 1.260,   // SOURCE: MaxPreps — "OPS: 1.260"
    HR:  4,       // SOURCE: MaxPreps — "HR: 4"
    RBI: 11,      // SOURCE: MaxPreps — "RBI: 11"
    H:   11,      // SOURCE: MaxPreps — "H: 11"
    AB:  36,      // SOURCE: MaxPreps — "AB: 36"
    BB:  14,      // SOURCE: MaxPreps — "BB: 14"
    K:   6,       // SOURCE: MaxPreps — "K: 6"
    G:   14,      // SOURCE: MaxPreps (May 10, 2026) static fetch — "GP: 14"
    SB:  null     // not stated
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
  {
    label: "HS",
    hitting: {
      G: null,
      AB: null,
      H: null,
      HR: 4,
      RBI: 11,
      BB: null,
      K: null,
      SB: null,
      AVG: 0.306,
      OPS: 1.26,
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
    performance: jacob_lombard_performance,
    media:       jacob_lombard_media,
    cardMarket:  jacob_lombard_market
  }

}
