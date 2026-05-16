/* =============================================================
   JUSTIN LEBRON — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 13–14
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   DRAFT STATUS: #5-15 Range Projected — Former Consensus #1 Overall
   Final team pending draft (July 2026). team: "TBD" until signed.

   TRACKER NOTE:
     AB is intentionally not set. Justin is a pre-draft college player
     with no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro AB.
     The tracker holds 2026 Alabama season stats for display only.
     Pass 25.10: Updated with rolltide.com official stats (May 10, 2026) — G=50.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { justin_lebron_knowledge }    from "./justin_lebron_knowledge"
import { justin_lebron_performance }  from "./justin_lebron_performance"
import { justin_lebron_media }        from "./justin_lebron_media"
import { justin_lebron_market }       from "./justin_lebron_market"

export const justin_lebron = {
  id:       "justin_lebron",
  name:     "Justin Lebron",

  // SOURCE: PDF p.13 — "Proj. Pick: #5-15 range"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "SS",

  tier:     "Draft",
  level:    "Draft",

  age:      21,   // SOURCE: PDF p.13 — "AGE: 21"

  bats:    "R",   // SOURCE: PDF p.13 — "B/T: R/R"
  throws:  "R",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "neutral",   // sliding from #1 — debate between tools believers and production-first scouts
    price:   "flat"       // "priced conservatively at release" (PDF p.14); tool ceiling vs. bat concern
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     TOOLSY_UPSIDE: four-tool profile with contact question.
       High volatility — tools believers vs. production-first scouts creates wild swings.
       "Compelling speculative buy" framing (PDF p.14) matches archetype.
       Former #1 pedigree provides durable narrative floor.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "TOOLSY_UPSIDE" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   justin_lebron_knowledge,
  performance: justin_lebron_performance,
  media:       justin_lebron_media,
  cardMarket:  justin_lebron_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2026 Alabama season — rolltide.com (May 10, 2026) — current reference
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    // 2026 junior season — rolltide.com (May 10, 2026)
    AVG: 0.266,   // SOURCE: rolltide.com (May 10, 2026) — G=50
    H:   51,      // SOURCE: rolltide.com (May 10, 2026)
    HR:  13,      // SOURCE: rolltide.com (May 10, 2026)
    RBI: 36,      // SOURCE: rolltide.com (May 10, 2026)
    OPS: 0.902,   // SOURCE: rolltide.com (May 10, 2026)
    SB:  null     // not stated in 2026 stat line
  },

  pitching: null,

  /* =========================
     TRACKER — 2026 Alabama season display
     AB intentionally absent — pre-draft player has no professional sample.
     SOURCE: rolltide.com official stats (May 10, 2026) — "G: 50"
  ========================= */
  tracker: {
    // 2026 junior season — rolltide.com (May 10, 2026)
    G:   50,          // SOURCE: rolltide.com (May 10, 2026) — "GP: 50"
    AB:  192,         // SOURCE: rolltide.com (May 10, 2026)
    H:   51,          // SOURCE: rolltide.com (May 10, 2026)
    HR:  13,          // SOURCE: rolltide.com (May 10, 2026)
    RBI: 36,          // SOURCE: rolltide.com (May 10, 2026)
    BB:  24,          // SOURCE: rolltide.com (May 10, 2026)
    K:   46,          // SOURCE: rolltide.com (May 10, 2026)
    AVG: 0.266,       // SOURCE: rolltide.com (May 10, 2026)
    OBP: null,        // UNAVAILABLE — not captured (available on rolltide.com; OBP+SLG=OPS on site)
    OPS: 0.902,       // SOURCE: rolltide.com (May 10, 2026) — derived from OBP+SLG on Alabama site
    SB:  null,        // not stated in 2026 stat line

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
    // Career total (3 seasons: 2024 + 2025 + 2026 partial) — rolltide.com (May 10, 2026)
    // SOURCE: rolltide.com official career totals — 168 GP
    // Cross-check: H/AB = 201/643 = .313 ✓
    AVG: 0.313,   // SOURCE: rolltide.com — "AVG: .313"
    OPS: 0.981,   // SOURCE: rolltide.com — "OPS: .981" (career total)
    HR:  42,      // SOURCE: rolltide.com — "HR: 42"
    RBI: 146,     // SOURCE: rolltide.com — "RBI: 146"
    SB:  null,    // not stated in career total line
    H:   201,     // SOURCE: rolltide.com — "H: 201"
    AB:  643,     // SOURCE: rolltide.com — "AB: 643"
    BB:  78,      // SOURCE: rolltide.com — "BB: 78"
    K:   167,     // SOURCE: rolltide.com — "K: 167"
    G:   168      // SOURCE: rolltide.com — "168 GP"
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
  {
    label: "NCAA",
    hitting: {
      G: 168,
      AB: 643,
      H: 201,
      HR: 42,
      RBI: 142,
      BB: null,
      K: null,
      SB: null,
      AVG: 0.313,
      OPS: 0.981,
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
    performance: justin_lebron_performance,
    media:       justin_lebron_media,
    cardMarket:  justin_lebron_market
  }

}
