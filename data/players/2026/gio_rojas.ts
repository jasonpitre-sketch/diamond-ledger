/* =============================================================
   GIO ROJAS — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 23–25
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   DRAFT STATUS: Top-15 Projected — #1 Prep Pitcher in 2026 Draft Class
   Final team pending draft (July 2026). team: "TBD" until signed.

   STONEMAN DOUGLAS NOTE:
     Parkland, FL — "deep community resonance" (PDF p.25).
     School carries significant national name recognition.
     Miami-area market proximity — Marlins linked at pick 14 (PDF p.25).

   TRACKER NOTE:
     IP is set for pitcher mode. Gio is a pre-draft prep pitcher with
     no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro IP.
     No stat line available for prep pitcher — tracker reflects null.
     AB intentionally absent — pitcher mode.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { gio_rojas_knowledge }    from "./gio_rojas_knowledge"
import { gio_rojas_performance }  from "./gio_rojas_performance"
import { gio_rojas_media }        from "./gio_rojas_media"
import { gio_rojas_market }       from "./gio_rojas_market"

export const gio_rojas = {
  id:       "gio_rojas",
  name:     "Gio Rojas",

  // SOURCE: PDF p.23 — "Draft Projection: Top-15 (various mock drafts)"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "LHP",

  tier:     "Draft",
  level:    "Draft",

  age:      18,   // SOURCE: PDF p.23 — "AGE: 18"

  bats:    "R",   // SOURCE: PDF p.23 — "B/T: R/L"
  throws:  "L",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // "#1 prep pitcher" + 98 mph velocity narrative ascending
    price:   "rising"    // "upper-90s fastball drives speculative demand" (PDF p.25)
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     HIGH_RISK_ARM: elite LHP velocity with maximum development uncertainty.
       "Prep pitching risk is real — three to five year development timeline" (PDF p.25).
       98 mph lefty ceiling is "most sought-after Bowman target" — but health is the gate.
       Sharp correction risk on any injury news; spike potential on velocity confirmation.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "HIGH_RISK_ARM" as const,

  /* =========================
     DUAL-DOMAIN FLAG (Pass 36)
     Gio Rojas is a true two-way prep player.
     Primary domain: pitching (LHP — engine reads performance)
     Secondary domain: hitting (DH — batting stats present in performance snapshot bat* fields)
     DH batting stats: career .355 AVG, 2026 Sr: .338 AVG / 5 HR / 24 RBI
     dualDomainPerformance will be populated when hitting domain ingestion is complete.
     requiresDualDomain: true gates BATS context switching for this player.
     See data/dlr/DUAL_DOMAIN_RULES.md.
  ========================= */
  requiresDualDomain: true,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   gio_rojas_knowledge,
  performance: gio_rojas_performance,
  media:       gio_rojas_media,
  cardMarket:  gio_rojas_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: Velocity/pitch data only — no season statline for prep pitcher
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: null,

  pitching: {
    // 2025 junior season — snapshot (most complete season per gold standard)
    ERA:  0.72,   // SOURCE: Multiple scouting publications — "ERA: 0.72"
    W:    12,     // SOURCE: Multiple scouting publications — "W: 12"
    L:    0,      // SOURCE: Multiple scouting publications — "L: 0"
    IP:   68.0,   // SOURCE: Multiple scouting publications — "IP: 68.0"
    K:    120,    // SOURCE: Multiple scouting publications — "K: 120"
    BB:   16,     // SOURCE: Multiple scouting publications — "BB: 16"
    WHIP: 0.75    // DERIVED: (H+BB)/IP = (35+16)/68 = 51/68 = 0.75
  },

  /* =========================
     TRACKER — 2026 senior season pitching
     IP null — 2026 season stats not isolatable from career cumulative in MaxPreps.
     NOTE: Batting DH stats (G=25, AVG=.338) are in performance.snapshot bat* fields.
  ========================= */
  tracker: {
    // SOURCE: MaxPreps (May 9, 2026, screenshot verified) — 25-26 Sr. pitching row
    IP:   66.0,      // SOURCE: MaxPreps — "IP: 66"
    G:    12,        // SOURCE: MaxPreps — "APP: 12"
    W:    10,        // SOURCE: MaxPreps — "W: 10"
    L:    1,         // SOURCE: MaxPreps — "L: 1"
    ERA:  0.64,      // SOURCE: MaxPreps — "ERA: 0.64"
    WHIP: 0.68,      // DERIVED: (H+BB)/IP = (30+15)/66 = 0.68
    SO:   112,       // SOURCE: MaxPreps — "K: 112"

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — display-only context
     SOURCE: MaxPreps career pitching totals (May 9, 2026).
     Uses career totals for TOTAL row in IntelStack panel.
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    // SOURCE: MaxPreps varsity totals (May 9, 2026, screenshot verified)
    ERA:  0.68,   // SOURCE: MaxPreps — "ERA: 0.68"
    W:    27,     // SOURCE: MaxPreps — "W: 27"
    L:    1,      // SOURCE: MaxPreps — "L: 1"
    IP:   155.1,  // SOURCE: MaxPreps — "IP: 155.1"
    SO:   273,    // SOURCE: MaxPreps — "K: 273"
    WHIP: 0.68    // DERIVED: (H+BB)/IP = (72+34)/155.1 = 0.68
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
  {
    label: "HS",
    pitching: {
      G: 31,
      GS: 3,
      IP: 155.1,
      W: 27,
      L: 1,
      ERA: 0.68,
      WHIP: 0.68,
      SO: 273,
      BB: 34,
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
    performance: gio_rojas_performance,
    media:       gio_rojas_media,
    cardMarket:  gio_rojas_market
  }

}
