import { kade_anderson_knowledge } from "./kade_anderson_knowledge"
import { kade_anderson_performance } from "./kade_anderson_performance"
import { kade_anderson_media } from "./kade_anderson_media"
import { kade_anderson_market } from "./kade_anderson_market"

export const kade_anderson = {
  id:           "kade_anderson",
  name:         "Kade Anderson",
  fullName:     "Kade Anderson",

  team:         "ARK",
  parentClub:   "SEA",
  position:     "SP",
  jerseyNumber: null,

  tier:  "AA",
  level: "AA",

  age:        21,
  birthdate:  "2004-07-06",
  birthplace: "Slidell, LA",
  college:    "LSU",

  height: "6'2\"",
  weight: 179,
  bats:   "L",
  throws: "L",

  draftYear:    2025,
  draftRound:   1,
  draftOverall: 3,
  draftTeam:    "SEA",

  competitionLevel: "MiLB",

  /* =========================
     MARKET ARCHETYPE
     Required at composite root AND inside cardMarket (Pass 20.6 pattern)
  ========================= */
  marketArchetype: kade_anderson_market.marketArchetype,

  requiresDualDomain: false,

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "elite",   // currently dominant — 0.60 ERA in 6 AA starts
    price:   null
  },

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:  kade_anderson_knowledge,
  performance: kade_anderson_performance,
  media:      kade_anderson_media,
  cardMarket: kade_anderson_market,

  /* =========================
     CORE STATS (pitching display layer — matches performance.snapshot)
  ========================= */
  hitting:  null,

  pitching: {
    ERA:  0.60,
    W:    3,
    L:    0,
    IP:   30.0,
    K:    47,
    BB:   5,
    WHIP: 0.667,
    K9:   14.1
  },

  /* =========================
     TRACKER — 2026 in-season totals (through 2026-05-14 screenshot)
     Pitcher tracker — appearance-based rolling windows (starts3/5/7)
  ========================= */
  tracker: {
    G:   6,
    GS:  6,
    W:   3,
    L:   0,
    SV:  0,

    IP:  30.0,
    H:   15,
    R:    2,
    ER:   2,
    HR:   1,
    BB:   5,
    K:   47,
    SO:  47,
    HBP:  1,
    BF:  106,

    ERA:  0.60,
    WHIP: 0.667,
    K9:   14.1,
    BB9:   1.5,
    HR9:   0.3,
    KBB:   9.40,

    // Pass 77 — 2026-05-08 (S6 vs Tulsa). H/BF estimated from season WHIP distribution.
    lastGame: {
      date:   "2026-05-08",
      opp:    "vs Tulsa",
      IP:     5.2,
      H:      3,
      R:      1,
      ER:     1,
      BB:     1,
      K:      9,
      HR:     0,
      BF:     19,
      result: "W"
    },

    // Pass 77 — seeded from 6-start 2026 AA season replay (2026-05-15)
    // All values computed by scripts/replay-anderson-2026.mjs from real MiLB Stats API data.
    // starts7 = all 6 available starts (fewer than 7 exist)
    rolling: {
      starts3: { IP: 16.0, ERA: 0.56, WHIP: 0.563, K: 25, BB: 1, K9: 14.1, BB9: 0.6 },
      starts5: { IP: 26.0, ERA: 0.69, WHIP: 0.654, K: 41, BB: 4, K9: 14.2, BB9: 1.4 },
      starts7: { IP: 30.0, ERA: 0.60, WHIP: 0.667, K: 47, BB: 5, K9: 14.1, BB9: 1.5 }
    },

    mlbIP:    0,
    minorIP:  30.0,
    collegeIP: 157.1,  // 38.1 (2024) + 119.0 (2025) = 157.1 collegiate IP
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — cumulative all levels through 2026-05-14
     3 seasons (2024 NCAA + 2025 NCAA + 2026 AA)
  ========================= */
  careerAverages: {
    G:    43,
    GS:   34,
    W:    19,
    L:     3,
    IP:   187.1,
    H:    144,
    R:     68,
    ER:    61,
    BB:    60,
    K:    286,
    ERA:   2.93,
    WHIP:  1.089,
    K9:   13.7
  },

  /* =========================
     CAREER LINEAGE — season-by-season arc
  ========================= */
  careerLineage: {
    "2024": { team: "LSU",                 level: "NCAA", W: 4,  L: 1, ERA: 3.99, IP: 38.1,  role: "mixed" },
    "2025": { team: "LSU",                 level: "NCAA", W: 12, L: 1, ERA: 3.18, IP: 119.0, role: "ace", accolade: "CWS MOP" },
    "2026": { team: "Arkansas Travelers",  level: "AA",   W: 3,  L: 0, ERA: 0.60, IP: 30.0,  status: "in-season", note: "Skipped A-ball" }
  },

  /* =========================
     DLR — populated on first ingestion
  ========================= */
  dlr: {}
}
