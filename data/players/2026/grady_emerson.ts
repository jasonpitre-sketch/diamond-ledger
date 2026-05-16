/* =============================================================
   GRADY EMERSON — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 6–8
   Generated: 2026-05-09 | Pass 21 | Updated: 2026-05-14 | Pass 63
   Format: Domain-file (Tier A)

   DRAFT STATUS: Top-3 to Top-5 Projected — #1 HS Prospect (Baseball America)
   Final team pending draft (July 2026). team: "TBD" until signed.

   TRACKER NOTE:
     AB is intentionally not set. Grady is a prep draft player with
     no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro AB.
     The tracker holds 2026 prep senior season stats for display only.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { grady_emerson_knowledge }    from "./grady_emerson_knowledge"
import { grady_emerson_performance }  from "./grady_emerson_performance"
import { grady_emerson_media }        from "./grady_emerson_media"
import { grady_emerson_market }       from "./grady_emerson_market"

export const grady_emerson = {
  id:       "grady_emerson",
  name:     "Grady Emerson",

  // SOURCE: PDF p.6 — "Proj. Pick: Top-3 to Top-5"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "SS",

  tier:     "Draft",
  level:    "Draft",

  age:      18,   // SOURCE: PDF p.6 — "AGE: 18" | DOB: February 21, 2008

  bats:    "L",   // SOURCE: PDF p.6 — "B/T: L/R"
  throws:  "R",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // #1 HS prospect building toward draft — ascending
    price:   "rising"    // top prep hitter; pre-draft Bowman Draft anticipation rising
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     PREMIUM_COLLEGE_BAT: polished hitter profile (applied to prep elite tier).
       stable demand, strong collector trust, moderate volatility.
       Emerson's elite hit tool maps to premium_college_bat collector behavior
       despite being a prep player — the polish and production justify the archetype.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "PREMIUM_COLLEGE_BAT" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   grady_emerson_knowledge,
  performance: grady_emerson_performance,
  media:       grady_emerson_media,
  cardMarket:  grady_emerson_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2026 senior season (PDF p.6)
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    // Primary display — 2025 Argyle junior season (full season, THSB + DRC sources — Pass 25).
    // SOURCE: THSB Dec 2025 (AVG, HR, RBI, SB, R, 2B, 3B) + DRC 2025 All-Area (OPS)
    // NOTE: AB/H/BB are ESTIMATED via OPS+AVG+G derivation (see grady_emerson_performance.ts). K unavailable.
    AVG: 0.351,   // SOURCE: THSB Dec 2025 — ".351" (directly stated)
    H:   35,      // ESTIMATED — derived from AVG × AB (35/100 = .350 ≈ .351 ✓)
    AB:  100,     // ESTIMATED — derived from OPS/AVG/G constraint (G≈33, PA≈132)
    HR:  4,       // SOURCE: THSB Dec 2025 — "4 HR" (directly stated)
    RBI: 25,      // SOURCE: THSB Dec 2025 — "25 RBI" (directly stated)
    BB:  30,      // ESTIMATED — derived from OPS/OBP constraint
    K:   null,    // UNAVAILABLE — not stated in any public source
    OPS: 1.122,   // SOURCE: DRC 2025 All-Area — "1.122 OPS" (directly stated)
    SB:  14       // SOURCE: THSB Dec 2025 — "14 SB" (directly stated)
  },

  pitching: null,

  /* =========================
     TRACKER — 2026 prep senior season display
     AB intentionally absent — pre-draft player has no professional sample.
     sampleConfidence() → 0.6 baseline (no AB/IP = minimum floor, correct behavior).
     SOURCE: PDF p.6 — "2026 SEASON — Fort Worth Christian (Pre-Playoffs)"
  ========================= */
  tracker: {
    // 2026 senior season — MaxPreps primary source (Pass 63 — May 14, 2026)
    G:   28,         // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "GP: 28" (updated from 26)
    AB:  79,         // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "AB: 79" (updated from 76) — feeds 2026 row in IntelStack
    H:   42,         // SOURCE: MaxPreps — "H: 42" — unchanged — feeds 2026 row in IntelStack
    HR:  7,          // SOURCE: MaxPreps — "HR: 7" — unchanged
    RBI: 42,         // SOURCE: MaxPreps — "RBI: 42" — unchanged
    R:   39,         // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "R: 39" (newly added)
    BB:  27,         // SOURCE: MaxPreps (Pass 63, May 14, 2026) — "BB: 27" (updated from 23)
    K:   2,          // SOURCE: MaxPreps — "K: 2" — unchanged
    AVG: 0.532,      // SOURCE: MaxPreps (Pass 63, May 14, 2026) — ".532" (updated from .553)
    OBP: 0.648,      // SOURCE: MaxPreps (Pass 63, May 14, 2026) — ".648" (updated from .653)
    OPS: 1.661,      // DERIVED (Pass 63): OBP+SLG = 0.648+1.013 = 1.661 (updated from 1.706)
    SB:  31,         // SOURCE: PDF p.6 — not in MaxPreps batting table; retained

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — display-only context
     Multi-school career: Argyle HS (Fr/So/Jr) → Fort Worth Christian (Sr/2026).
     careerAverages updated to 2025 Argyle junior season (full season) in Pass 25.
     SOURCE: THSB Dec 2025 + DRC 2025 All-Area. AB/H/BB derived via OPS+AVG+G math.
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    // TOTAL row in IntelStack — updated to 2025 Argyle junior season full season (Pass 25).
    // SOURCE: THSB Dec 2025 (AVG, HR, RBI, SB, R, 2B, 3B) + DRC 2025 All-Area (OPS)
    // NOTE: AB/H/BB are ESTIMATED via OPS+AVG+G derivation. K unavailable.
    AVG: 0.351,   // SOURCE: THSB Dec 2025 — ".351" (directly stated)
    OPS: 1.122,   // SOURCE: DRC 2025 All-Area — "1.122 OPS" (directly stated)
    HR:  4,       // SOURCE: THSB Dec 2025 — "4 HR" (directly stated)
    RBI: 25,      // SOURCE: THSB Dec 2025 — "25 RBI" (directly stated)
    SB:  14,      // SOURCE: THSB Dec 2025 — "14 SB" (directly stated)
    H:   35,      // ESTIMATED — derived from AVG × AB
    AB:  100,     // ESTIMATED — derived from OPS/AVG/G constraint
    BB:  30,      // ESTIMATED — derived from OPS/OBP constraint
    K:   null,    // UNAVAILABLE — not stated in any public source
    G:   33       // SOURCE: THSB Dec 2025 — full 2025 junior season
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
      HR: null,
      RBI: null,
      BB: null,
      K: null,
      SB: null,
      AVG: 0.351,
      OPS: 1.122,
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
    performance: grady_emerson_performance,
    media:       grady_emerson_media,
    cardMarket:  grady_emerson_market
  }

}
