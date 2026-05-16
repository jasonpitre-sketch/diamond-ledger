/* =============================================================
   JACKSON FLORA — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 11–12
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   DRAFT STATUS: Top-6 Projected — #1 Pitcher in 2026 Draft Class
   Final team pending draft (July 2026). team: "TBD" until signed.

   TRACKER NOTE:
     IP is set for pitcher mode. Flora is a pre-draft player with
     no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro IP.
     The tracker holds 2026 UCSB season stats for display only.
     AB intentionally absent — pitcher mode driven by IP field.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { jackson_flora_knowledge }    from "./jackson_flora_knowledge"
import { jackson_flora_performance }  from "./jackson_flora_performance"
import { jackson_flora_media }        from "./jackson_flora_media"
import { jackson_flora_market }       from "./jackson_flora_market"

export const jackson_flora = {
  id:       "jackson_flora",
  name:     "Jackson Flora",

  // SOURCE: PDF p.11 — "MLB Projection: Top-6 Pick | Top Pitching Prospect"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "RHP",

  tier:     "Draft",
  level:    "Draft",

  age:      20,   // SOURCE: PDF p.11 — "AGE: 20"

  bats:    "R",   // SOURCE: PDF p.11 — "B/T: R/R"
  throws:  "R",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // 100 mph velocity + D1 historic dominance — ascending
    price:   "rising"    // top pitching prospect; pre-draft Bowman Chrome anticipation strong
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     HIGH_RISK_ARM: elite power arm with health sensitivity.
       Strong collector demand on dominant starts; sharp correction risk on injury news.
       "Long-term value tied heavily to avoiding major injury" (PDF p.12).
       Mechanical concern (head whack) is priced into archetype behavior.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "HIGH_RISK_ARM" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   jackson_flora_knowledge,
  performance: jackson_flora_performance,
  media:       jackson_flora_media,
  cardMarket:  jackson_flora_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2026 UCSB season (PDF p.12)
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: null,

  pitching: {
    ERA:  1.50,   // 2026 UCSB season
    W:    4,
    L:    0,
    IP:   24.0,
    K:    28,
    BB:   7,
    WHIP: 1.00
  },

  /* =========================
     TRACKER — 2026 UCSB season display
     IP present → pitcher mode for sampleConfidence().
     SOURCE: PDF p.12 — "2026 SEASON — UCSB (Through Mid-May)"
  ========================= */
  tracker: {
    IP:   24.0,      // SOURCE: PDF p.12 — pitcher mode trigger
    G:    null,      // games not stated separately
    W:    4,         // SOURCE: PDF p.12
    L:    0,         // SOURCE: PDF p.12
    ERA:  1.50,      // SOURCE: PDF p.12
    WHIP: 1.00,      // SOURCE: PDF p.12
    SO:   28,        // SOURCE: PDF p.12

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — display-only context
     Based on 2026 season (most recent data in source).
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    ERA:  1.50,
    W:    4,
    L:    0,
    IP:   24.0,
    SO:   28,
    WHIP: 1.00
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
  {
    label: "HS",
    pitching: {
      G: null,
      GS: null,
      IP: 24.0,
      W: 4,
      L: 0,
      ERA: 1.5,
      WHIP: 1.0,
      SO: 28,
      BB: null,
      K9: null,
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
    performance: jackson_flora_performance,
    media:       jackson_flora_media,
    cardMarket:  jackson_flora_market
  }

}
