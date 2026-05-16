/* =============================================================
   CARSON BOLEMON — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: MaxPreps (May 14, 2026) / PBR scouting publications
           Diamond Ledger 2026 Draft Intelligence
   Generated: 2026-05-14 | Pass 63
   Format: Domain-file (Tier A)

   DRAFT STATUS: #7 Overall Projected — Baltimore Orioles
   Final team pending draft (July 2026). team: "BAL" per mock draft projection.

   TRACKER NOTE:
     IP is set for pitcher mode. Bolemon is a pre-draft HS pitcher with
     no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro IP.
     The tracker reflects 2026 senior pitching data (7 G, in-progress).

   DUAL-DOMAIN NOTE (Pass 36 / Pass 63):
     Bolemon is a true two-way prep player — LHP + DH/1B.
     Primary domain: pitching (LHP — engine reads performance)
     Secondary domain: hitting (DH — batting stats present in performance season2026 bat* fields)
     2026 Sr batting: .372 AVG / 3 HR / 13 RBI / .490 OBP (MaxPreps, May 14, 2026)
     Career batting: .409 AVG / 13 HR / 93 RBI across 125 varsity games
     requiresDualDomain: true gates BATS context switching for this player.
     See data/dlr/DUAL_DOMAIN_RULES.md.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { carson_bolemon_knowledge }    from "./carson_bolemon_knowledge"
import { carson_bolemon_performance }  from "./carson_bolemon_performance"
import { carson_bolemon_media }        from "./carson_bolemon_media"
import { carson_bolemon_market }       from "./carson_bolemon_market"

export const carson_bolemon = {
  id:       "carson_bolemon",
  name:     "Carson Bolemon",

  // SOURCE: playersDraft2026 — draftPick: 7, team: BAL
  // team set to "BAL" per current mock draft projection — pending draft (July 2026)
  team:     "BAL",
  position: "LHP",

  tier:     "Draft",
  level:    "Draft",

  age:      19,   // SOURCE: playersDraft2026 — age: 19

  bats:    "R",   // SOURCE: MaxPreps / PBR — "B/T: R/L"
  throws:  "L",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "neutral",   // top-10 HS arm building toward draft
    price:   "flat"       // pre-Bowman; hobby interest building but not yet spiking
  },

  /* =========================
     MARKET ARCHETYPE (Pass 63)
     Pre-Bowman market personality — projected hobby intelligence only.
     HIGH_RISK_ARM: HS arm development uncertainty = defining market characteristic.
       Despite elite command profile (career ERA=0.35, career K/9=20.9), HS pitching arms
       in top-10 carry inherent development risk — long timeline, arm health sensitivity.
       Dual-domain identity (LHP + .409 career batting AVG) adds collector premium above
       single-role HS arms but does not override the HIGH_RISK_ARM baseline archetype.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "HIGH_RISK_ARM" as const,

  /* =========================
     DUAL-DOMAIN FLAG (Pass 36 / Pass 63)
     Primary domain: pitching (LHP — engine reads performance)
     Secondary domain: hitting (DH/1B — batting stats in performance season2026 bat* fields)
     DH batting stats: career .409 AVG; 2026 Sr: .372 AVG / 3 HR / 13 RBI / .490 OBP
     requiresDualDomain: true gates BATS context switching for this player.
     See data/dlr/DUAL_DOMAIN_RULES.md.
  ========================= */
  requiresDualDomain: true,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   carson_bolemon_knowledge,
  performance: carson_bolemon_performance,
  media:       carson_bolemon_media,
  cardMarket:  carson_bolemon_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2026 senior batting — MaxPreps (May 14, 2026); pitching — snapshot 2025 Jr
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    // 2026 senior batting — SOURCE: MaxPreps (May 14, 2026 — Pass 63 updated)
    AVG: 0.372,   // SOURCE: MaxPreps — ".372 AVG" (check: 29/78=.372 ✓)
    H:   29,      // SOURCE: MaxPreps — "H: 29"
    AB:  78,      // SOURCE: MaxPreps — "AB: 78"
    HR:  3,       // SOURCE: MaxPreps — "HR: 3"
    RBI: 13,      // SOURCE: MaxPreps — "RBI: 13"
    BB:  15,      // SOURCE: MaxPreps — "BB: 15"
    K:   11,      // SOURCE: MaxPreps — "K: 11"
    SB:  null,    // UNAVAILABLE — pitcher DH; SB not relevant to pitching primary profile
    OPS: 1.105    // DERIVED: OBP+SLG = 0.490+0.615 = 1.105
  },

  pitching: {
    // 2025 junior season — snapshot (most complete season per INGESTION_GOLD_STANDARD)
    ERA:  0.00,   // SOURCE: MaxPreps — "ERA: 0.00" — 0 earned runs in 55.1 IP
    W:    11,     // SOURCE: MaxPreps — "W: 11"
    L:    0,      // SOURCE: MaxPreps — "L: 0"
    IP:   55.1,   // SOURCE: MaxPreps — "IP: 55.1"
    K:    135,    // SOURCE: MaxPreps — "SO: 135"
    BB:   8,      // SOURCE: MaxPreps (Pass 63 corrected) — "BB: 8"
    WHIP: 0.254   // DERIVED (Pass 63): (8+6)/55.1 = 0.254
  },

  /* =========================
     TRACKER — 2026 senior season pitching (in-progress)
     SOURCE: MaxPreps (May 10, 2026, coach-entered) — 7 G through May 10.
     IP set for pitcher mode. Batting DH stats in performance.season2026 bat* fields.
     sampleConfidence() → 0.6 baseline (no professional sample — correct behavior).
  ========================= */
  tracker: {
    // SOURCE: MaxPreps (May 10, 2026) — "25-26 Sr." pitching row
    IP:   30,     // SOURCE: MaxPreps — "IP: 30"
    G:    7,      // SOURCE: MaxPreps — "G: 7"
    W:    5,      // SOURCE: MaxPreps — "W: 5"
    L:    0,      // SOURCE: MaxPreps — "L: 0"
    ERA:  0.23,   // SOURCE: MaxPreps — "ERA: 0.23"
    WHIP: 0.53,   // SOURCE: MaxPreps — "WHIP: 0.53" (check: (7+9)/30=0.53 ✓)
    SO:   68,     // SOURCE: MaxPreps — "SO: 68"

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — display-only context
     SOURCE: MaxPreps career pitching totals (May 14, 2026).
     Uses career pitching totals for TOTAL row in IntelStack panel.
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    ERA:  0.35,    // SOURCE: MaxPreps career — "ERA: 0.35"
    W:    33,      // SOURCE: MaxPreps career — "Win: 33"
    L:    null,    // UNAVAILABLE — not surfaced in MaxPreps top stats
    IP:   182.1,   // SOURCE: MaxPreps career — "IP: 182.1"
    SO:   422,     // SOURCE: MaxPreps career — "K: 422"
    WHIP: null     // UNAVAILABLE — not stated in career top stats
  },

  // CAREER LINEAGE (Pass 37 / Pass 63) — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
  {
    label: "HS",
    pitching: {
      G:    null,           // UNAVAILABLE — career game count not separately stated from MaxPreps cumulative
      GS:   null,           // UNAVAILABLE
      IP:   182.1,          // SOURCE: MaxPreps career — "IP: 182.1"
      W:    33,             // SOURCE: MaxPreps career — "Win: 33"
      L:    null,           // UNAVAILABLE
      ERA:  0.35,           // SOURCE: MaxPreps career — "ERA: 0.35"
      WHIP: null,           // UNAVAILABLE in career top stats
      SO:   422,            // SOURCE: MaxPreps career — "K: 422"
      BB:   null,           // UNAVAILABLE in career top stats
      K9:   20.9            // DERIVED: 422/(182.1/9) = 20.9
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
    performance: carson_bolemon_performance,
    media:       carson_bolemon_media,
    cardMarket:  carson_bolemon_market
  }

}
