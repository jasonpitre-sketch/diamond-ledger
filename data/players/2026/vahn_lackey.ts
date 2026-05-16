/* =============================================================
   VAHN LACKEY — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 9–10
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   DRAFT STATUS: #3 Overall Projected (Twins per mock)
   Final team pending draft (July 2026). team: "TBD" until signed.

   TRACKER NOTE:
     AB is intentionally not set. Vahn is a pre-draft college player
     with no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro AB.
     The tracker holds 2026 Georgia Tech season stats for display only.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { vahn_lackey_knowledge }    from "./vahn_lackey_knowledge"
import { vahn_lackey_performance }  from "./vahn_lackey_performance"
import { vahn_lackey_media }        from "./vahn_lackey_media"
import { vahn_lackey_market }       from "./vahn_lackey_market"

export const vahn_lackey = {
  id:       "vahn_lackey",
  name:     "Vahn Lackey",

  // SOURCE: PDF p.9 — "Proj. Pick: #3 (Twins per mock)"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "C",

  tier:     "Draft",
  level:    "Draft",

  age:      20,   // SOURCE: PDF p.9 — "AGE: 20"

  bats:    "R",   // SOURCE: PDF p.9 — "B/T: R/R"
  throws:  "R",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // offensive explosion elevated from mid-first to top-5
    price:   "rising"    // GT catcher legacy + offensive emergence drives pre-draft interest
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     SLEEPER_VALUE: niche defensive-specialist profile with dedicated collector base.
       Catchers are smart-money hobby targets — smaller pool, stable demand,
       lower volatility than toolsy archetypes. GT catcher legacy adds
       durable floor. Offensive emergence creates re-rating upside potential.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "SLEEPER_VALUE" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   vahn_lackey_knowledge,
  performance: vahn_lackey_performance,
  media:       vahn_lackey_media,
  cardMarket:  vahn_lackey_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2026 Georgia Tech season (PDF p.9)
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    AVG: 0.371,   // 2026 sophomore season
    H:   null,
    HR:  12,
    RBI: null,
    OPS: 1.173,
    SB:  9
  },

  pitching: null,

  /* =========================
     TRACKER — 2026 Georgia Tech season display
     AB intentionally absent — pre-draft player has no professional sample.
     SOURCE: PDF p.9 — "2026 SEASON — GEORGIA TECH (47 Games)"
  ========================= */
  tracker: {
    G:   47,         // SOURCE: PDF p.9
    HR:  12,         // SOURCE: PDF p.9
    RBI: null,       // not stated
    BB:  null,       // not stated
    K:   null,       // not stated
    AVG: 0.371,      // SOURCE: PDF p.9
    OBP: 0.491,      // SOURCE: PDF p.9
    OPS: 1.173,      // SOURCE: PDF p.9
    SB:  9,          // SOURCE: PDF p.9

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — display-only context
     Based on 2026 season (most complete offensive season in source).
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    AVG: 0.371,
    OPS: 1.173,
    HR:  12,
    RBI: null,
    SB:  9,
    H:   null,
    AB:  null,
    BB:  null,
    K:   null,
    G:   47
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
  {
    label: "HS",
    hitting: {
      G: 47,
      AB: null,
      H: null,
      HR: 12,
      RBI: null,
      BB: null,
      K: null,
      SB: 9,
      AVG: 0.371,
      OPS: 1.173,
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
    performance: vahn_lackey_performance,
    media:       vahn_lackey_media,
    cardMarket:  vahn_lackey_market
  }

}
