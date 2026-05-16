/* =============================================================
   ERIC BOOTH JR. — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 15–16
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   DRAFT STATUS: Top-10 Projected — Youngest Hitter in Round 1
   DOB July 4, 2008 — turns 18 days before draft (July 2026).
   Final team pending draft (July 2026). team: "TBD" until signed.

   TRACKER NOTE:
     AB is intentionally not set. Eric is a prep junior draft player
     with no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro AB.
     The tracker holds 2026 prep junior season stats for display only.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { eric_booth_jr_knowledge }    from "./eric_booth_jr_knowledge"
import { eric_booth_jr_performance }  from "./eric_booth_jr_performance"
import { eric_booth_jr_media }        from "./eric_booth_jr_media"
import { eric_booth_jr_market }       from "./eric_booth_jr_market"

export const eric_booth_jr = {
  id:       "eric_booth_jr",
  name:     "Eric Booth Jr.",

  // SOURCE: PDF p.15 — "Proj. Pick: Top-10 (youngest hitter)"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "CF",

  tier:     "Draft",
  level:    "Draft",

  age:      17,   // SOURCE: PDF p.15 — "AGE: 17 (turns 18 July 4 — weeks before draft)"

  bats:    "L",   // SOURCE: PDF p.15 — "B/T: L/L"
  throws:  "L",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // "Rising All Spring — steadily climbing boards since January" (PDF p.16)
    price:   "rising"    // youngest first-rounder; 70-grade speed narrative ascending
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     ATHLETIC_SPECULATION: pure athleticism projection with longest development arc.
       Youngest player in class = maximum speculation component.
       "Development dependent" framing (PDF p.16) matches archetype exactly.
       70-grade speed is breakout-event sensitive — one viral showcase = spike.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "ATHLETIC_SPECULATION" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   eric_booth_jr_knowledge,
  performance: eric_booth_jr_performance,
  media:       eric_booth_jr_media,
  cardMarket:  eric_booth_jr_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2026 prep junior season (PDF p.16)
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    AVG: 0.467,   // 2026 junior prep season
    H:   null,
    HR:  6,
    RBI: null,
    OPS: null,    // not stated for prep season
    SB:  27
  },

  pitching: null,

  /* =========================
     TRACKER — 2026 prep junior season display
     AB intentionally absent — pre-draft player has no professional sample.
     SOURCE: PDF p.16 — "2026 SEASON — OAK GROVE HS (Junior)"
  ========================= */
  tracker: {
    G:   null,       // not stated
    HR:  6,          // SOURCE: PDF p.16
    RBI: null,       // not stated
    BB:  null,       // not stated
    K:   null,       // not stated
    AVG: 0.467,      // SOURCE: PDF p.16
    OBP: null,       // not stated
    OPS: null,       // not stated
    SB:  27,         // SOURCE: PDF p.16

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — display-only context
     Based on 2026 junior season (only data available in source).
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    AVG: 0.467,
    OPS: null,
    HR:  6,
    RBI: null,
    SB:  27,
    H:   null,
    AB:  null,
    BB:  null,
    K:   null,
    G:   null
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
      HR: 6,
      RBI: null,
      BB: null,
      K: null,
      SB: 27,
      AVG: 0.467,
      OPS: null,
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
    performance: eric_booth_jr_performance,
    media:       eric_booth_jr_media,
    cardMarket:  eric_booth_jr_market
  }

}
