/* =============================================================
   SAWYER STROSNIDER — ROOT PLAYER FILE
   -------------------------------------------------------------
   Source: Diamond Ledger 2026 Draft Intelligence PDF, Pages 21–22
   Generated: 2026-05-09 | Pass 21
   Format: Domain-file (Tier A)

   DRAFT STATUS: Top-15 Projected — Big 12 Phenom, Historic Freshman Season
   Final team pending draft (July 2026). team: "TBD" until signed.

   HISTORIC NOTE:
     Only the 4th player since 2002 at the NCAA D1 level to record
     10+ home runs, doubles, triples, AND stolen bases in a single season
     (2025 TCU freshman year). (PDF p.22)

   TRACKER NOTE:
     AB is intentionally not set. Sawyer is a pre-draft college player
     with no professional (MLB/minor) sample. sampleConfidence() defaults
     to 0.6 baseline — correct for a player with no pro AB.
     The tracker holds 2025 TCU freshman season stats for display only.

   DLR NOTE:
     cardMarket fields are display-only (scoreMarket() reads
     marketSnapshot only). Market DLR = neutral 12/24 until a
     live eBay marketSnapshot is wired.
   ============================================================= */

import { sawyer_strosnider_knowledge }    from "./sawyer_strosnider_knowledge"
import { sawyer_strosnider_performance }  from "./sawyer_strosnider_performance"
import { sawyer_strosnider_media }        from "./sawyer_strosnider_media"
import { sawyer_strosnider_market }       from "./sawyer_strosnider_market"

export const sawyer_strosnider = {
  id:       "sawyer_strosnider",
  name:     "Sawyer Strosnider",

  // SOURCE: PDF p.21 — "Proj. Pick: Top-15"
  // team set to "TBD" — final org not confirmed until draft (July 2026)
  team:     "TBD",
  position: "OF",

  tier:     "Draft",
  level:    "Draft",

  age:      20,   // SOURCE: PDF p.21 — "AGE: 20"

  bats:    "L",   // SOURCE: PDF p.21 — "B/T: L/L"
  throws:  "L",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "rising",   // historic freshman season; sophomore building
    price:   "rising"    // left-handed power/speed; "always in demand" collector profile
  },

  /* =========================
     MARKET ARCHETYPE (Pass 21)
     Pre-Bowman market personality — projected hobby intelligence only.
     TOOLSY_UPSIDE: power/speed combination with swing-decisions caveat.
       "Strong upside if sophomore confirms tools" (PDF p.22) is the definitive framing.
       Left-handed power hitters who can run are perennially collector-favored.
       Volatile on development events — sophomore confirmation is the key catalyst.
     Does NOT feed DLR scoring. Display layer only.
     See data/market/marketArchetypes.ts for full profile.
  ========================= */
  marketArchetype: "TOOLSY_UPSIDE" as const,

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   sawyer_strosnider_knowledge,
  performance: sawyer_strosnider_performance,
  media:       sawyer_strosnider_media,
  cardMarket:  sawyer_strosnider_market,

  /* =========================
     CORE STATS (display-only legacy block)
     SOURCE: 2025 TCU freshman season (PDF p.22)
     These are NOT scoring inputs. Engine reads performance domain directly.
  ========================= */
  hitting: {
    AVG: 0.268,   // 2026 current season (gofrogs.com May 10)
    H:   48,
    HR:  13,
    RBI: 47,
    OPS: 1.000,
    SB:  11
  },

  pitching: null,

  /* =========================
     TRACKER — 2026 TCU sophomore season (current, in progress)
     SOURCE: gofrogs.com official stats (May 10, 2026) — primary.
     D1Baseball.com (May 10, 2026) — supplemental (G, PA not in gofrogs.com table).
     SOURCE CONFLICT RESOLVED: D1Baseball AB=180/AVG=.267/OBP=.411/SLG=.583/OPS=.995
       superseded by gofrogs.com AB=179/AVG=.268/OBP=.413/SLG=.587/OPS=1.000.
     Feeds the "2026" row in IntelStack panel.
  ========================= */
  tracker: {
    G:   49,         // SOURCE: D1Baseball.com (May 10, 2026) — "G: 49"
    AB:  179,        // SOURCE: gofrogs.com (May 10, 2026) — "AB: 179"
    H:   48,         // SOURCE: gofrogs.com (May 10, 2026) — "H: 48"
    HR:  13,         // SOURCE: gofrogs.com (May 10, 2026) — "HR: 13"
    RBI: 47,         // SOURCE: gofrogs.com (May 10, 2026) — "RBI: 47"
    BB:  43,         // SOURCE: gofrogs.com (May 10, 2026) — "BB: 43"
    K:   43,         // SOURCE: gofrogs.com (May 10, 2026) — "K: 43"
    AVG: 0.268,      // SOURCE: gofrogs.com (May 10, 2026) — "AVG: .268" (check: 48/179=.268 ✓)
    OBP: 0.413,      // SOURCE: gofrogs.com (May 10, 2026) — "OBP: .413"
    OPS: 1.000,      // SOURCE: gofrogs.com (May 10, 2026) — "OPS: 1.000"
    SB:  11,         // SOURCE: D1Baseball.com — "SB: 11" (not in gofrogs.com table)

    lastGame: null,
    last7:    null,
    rolling: { days7: null, days15: null, days30: null },

    mlbAB:                0,
    minorAB:              0,
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — 2-season career total (2025+2026 partial)
     SOURCE: gofrogs.com official stats (May 10, 2026).
     VERIFY: H=77+48=125 ✓ HR=11+13=24 ✓ RBI=51+47=98 ✓ BB=20+43=63 ✓
             K=47+43=90 ✓ AB=220+179=399 ✓ AVG=125/399=.313 ✓
             OBP+SLG=.417+.622=1.039 ✓
     NEVER used in scoring (PLAYER_CONTRACT.md).
  ========================= */
  careerAverages: {
    AVG: 0.313,      // DERIVED: 125/399 = .3133 ≈ .313 (2-season career)
    OBP: 0.417,      // SOURCE: gofrogs.com (May 10, 2026) — career total
    SLG: 0.622,      // SOURCE: gofrogs.com (May 10, 2026) — career total
    OPS: 1.039,      // SOURCE: gofrogs.com (May 10, 2026) — career total (check: .417+.622=1.039 ✓)
    HR:  24,         // DERIVED: 11+13
    RBI: 98,         // DERIVED: 51+47
    H:   125,        // DERIVED: 77+48
    AB:  399,        // DERIVED: 220+179
    BB:  63,         // DERIVED: 20+43
    K:   90,         // DERIVED: 47+43
    G:   null        // UNAVAILABLE — career G not captured from gofrogs.com this pass
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
  {
    label: "NCAA",
    hitting: {
      G: null,
      AB: 399,
      H: 125,
      HR: 24,
      RBI: 98,
      BB: null,
      K: null,
      SB: null,
      AVG: 0.313,
      OPS: 1.039,
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
    performance: sawyer_strosnider_performance,
    media:       sawyer_strosnider_media,
    cardMarket:  sawyer_strosnider_market
  }

}
