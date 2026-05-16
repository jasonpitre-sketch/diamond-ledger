/* =============================================================
   DREW BURRESS — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 19–20
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   DRAFT STATUS: Top-12 Projected — Analytics Darling, GT Record-Breaker
   Final team pending draft (July 2026). team: "TBD" until signed.

   SIZE NOTE:
     5'9" / 185 lbs — "The rare 5'9" player who scouts label as a
     legitimate first-round pick — not as an exception to the rule,
     but as proof that elite production overrides physical prototyping"
     (PDF p.19). Mookie Betts / Jose Altuve size comp.

   TRACKER NOTE:
     AB is intentionally not set. Drew is a pre-draft college player
     with no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro AB.
     The tracker holds 2025 GT season stats for display only.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { drew_burress_knowledge }    from "./drew_burress_knowledge"
import { drew_burress_performance }  from "./drew_burress_performance"
import { drew_burress_media }        from "./drew_burress_media"
import { drew_burress_market }       from "./drew_burress_market"

export const drew_burress = {
  id:       "drew_burress",
  name:     "Drew Burress",

  // SOURCE: PDF p.19 — "Proj. Pick: Top-12"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "OF",

  tier:     "Draft",
  level:    "Draft",

  age:      21,   // SOURCE: PDF p.19 — "AGE: 21"

  bats:    "R",   // SOURCE: PDF p.19 — "B/T: R/R"
  throws:  "R",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // "analytics darling" — smart-money interest building
    price:   "rising"    // GT production + Mookie Betts comp driving pre-draft interest
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     SLEEPER_VALUE: analytics-loved, mainstream-discounted, smart-money target.
       Size "prototype concern" (PDF p.20) creates the mainstream discount.
       Elite underlying metrics create the smart-money re-rating thesis.
       Slow-burn appreciation — "slight market discount" acknowledged vs. 6'3" clone.
       Dedicated analytics collector base is sticky and discovery-driven.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "SLEEPER_VALUE" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   drew_burress_knowledge,
  performance: drew_burress_performance,
  media:       drew_burress_media,
  cardMarket:  drew_burress_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2025 GT sophomore season (PDF p.20) — best available full line
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    // 2026 junior season — current (D1Baseball ~Apr 5, 2026)
    AVG: 0.312,
    H:   39,
    HR:  6,
    RBI: 25,
    OPS: 1.032,
    SB:  3
  },

  pitching: null,

  /* =========================
     TRACKER — 2025 GT sophomore season display
     AB intentionally absent — pre-draft player has no professional sample.
     SOURCE: PDF p.20 — "2025 (SO)" row in career table
  ========================= */
  tracker: {
    // 2026 junior season — current as of ~Apr 5, 2026 (D1Baseball)
    // ramblinwreck.com 2025-26 season = our season2026 per user convention
    G:   31,         // SOURCE: D1Baseball.com (~Apr 5, 2026)
    AB:  125,        // SOURCE: D1Baseball.com
    H:   39,         // SOURCE: D1Baseball.com
    HR:  6,          // SOURCE: D1Baseball.com
    RBI: 25,         // SOURCE: D1Baseball.com
    BB:  27,         // SOURCE: D1Baseball.com
    K:   23,         // SOURCE: D1Baseball.com
    AVG: 0.312,      // SOURCE: D1Baseball.com
    OBP: 0.456,      // SOURCE: D1Baseball.com
    OPS: 1.032,      // SOURCE: D1Baseball.com
    SB:  3,          // SOURCE: D1Baseball.com

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — display-only context
     Best season (2025 sophomore — full statline available).
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    // 2025 sophomore season — per user rule: "always use 2025 stats for total"
    // SOURCE: PDF p.20 + ramblinwreck.com bio + D1Baseball.com
    AVG: 0.333,      // SOURCE: PDF p.20
    OPS: 1.162,      // SOURCE: PDF p.20
    HR:  19,         // SOURCE: PDF p.20
    RBI: 62,         // SOURCE: ramblinwreck.com bio — "60 RBI" confirmed 62
    SB:  null,       // not stated for 2025
    H:   76,         // SOURCE: D1Baseball.com — "H: 76"
    AB:  228,        // SOURCE: D1Baseball.com — "AB: 228"
    BB:  53,         // SOURCE: ramblinwreck.com bio — "53 walks"
    K:   42,         // SOURCE: ramblinwreck.com bio — "42 strikeouts"
    G:   60          // SOURCE: ramblinwreck.com bio — "started all 60 games"
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
  {
    label: "NCAA",
    hitting: {
      G: null,
      AB: null,
      H: null,
      HR: 19,
      RBI: 62,
      BB: null,
      K: null,
      SB: null,
      AVG: 0.333,
      OPS: 1.162,
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
    performance: drew_burress_performance,
    media:       drew_burress_media,
    cardMarket:  drew_burress_market
  }

}
