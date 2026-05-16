import { eli_willits_knowledge } from "./eli_willits_knowledge"
import { eli_willits_performance } from "./eli_willits_performance"
import { eli_willits_media } from "./eli_willits_media"
import { eli_willits_market } from "./eli_willits_market"

export const eli_willits = {
  id: "eli_willits",

  name: "Eli Willits",

  team: "WSH",
  position: "SS",

  tier: "A",
  level: "A",

  age: 18,

  bats: "L",
  throws: "R",

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat: "warm",
    price: "rising"
  },

  /* =========================
     KNOWLEDGE
  ========================= */
  knowledge: eli_willits_knowledge,

  /* =========================
     PERFORMANCE
  ========================= */
  performance: eli_willits_performance,

  /* =========================
     MEDIA
  ========================= */
  media: eli_willits_media,

  /* =========================
     MARKET
  ========================= */
  cardMarket: eli_willits_market,

  /* =========================
     CORE STATS
  ========================= */
  // 🔥 LIVE — 2026 current-season display stats. Updated Pass 57 replay (2026-05-13).
  // Source: scripts/replay-willits-2026.mjs — 32 games verified, Apr 3–May 12.
  hitting: {
    AVG: 0.265,
    H: 36,
    R: 33,
    HR: 4,
    RBI: 21,
    BB: 30,
    K: 38,
    SB: 23,
    OPS: 0.822
  },

  pitching: null,

  // 🔥 LIVE — 2026 current-season totals. AB present = hitter mode.
  // Updated 2026-05-15 via MiLB Stats API (API ID 816113) — 34 games through May 14.
  // Source: statsapi.mlb.com gameLog. All fields API-verified.
  tracker: {
    AB:  136,
    PA:  167,
    G:   34,
    R:   33,
    H:   36,
    "2B": 8,
    "3B": 1,
    HR:  4,
    RBI: 21,
    BB:  30,
    K:   38,
    SB:  23,
    CS:  6,
    AVG: 0.265,
    OBP: 0.395,
    SLG: 0.426,
    OPS: 0.822,
    BABIP: 0.337,

    // SHORT-TERM SIGNALS — display-only, never feed scoring.
    lastGame: { date: "2026-05-14", AB: 4, H: 1, HR: 0, RBI: 1, BB: 0, K: 0, SB: 0 },

    // ROLLING PERIOD DISPLAY — display-only, never feed scoring.
    // Computed from MiLB Stats API gameLog at May 14 cutoff.
    // 7D window : May 8–14 (5 games) — cooling stretch
    // 15D window: Apr 30–May 14 (12 games) — solid contact, speed showing
    // 30D window: Apr 15–May 14 (24 games) — strong baseline, AVG .299
    rolling: {
      days7:  { AB: 20, H: 4,  HR: 0, BB: 3,  K: 5,  SB: 2,  AVG: 0.200, OPS: 0.554 },
      days15: { AB: 47, H: 13, HR: 2, BB: 10, K: 15, SB: 5,  AVG: 0.277, OPS: 0.851 },
      days30: { AB: 97, H: 29, HR: 4, BB: 21, K: 27, SB: 14, AVG: 0.299, OPS: 0.919 }
    },

    mlbAB:  0,
    minorAB: 136,
    everReachedMLBSample: false
  },

  // CAREER / TOTAL — display-only context. NEVER used in scoring.
  // PASS 57 UPDATE: combined MiLB 2025 anchor + 2026 FBG replay (32 games).
  // Formula: career = 2025 MiLB (AB=157) + 2026 FBG replay (AB=128)
  careerAverages: {
    AVG: 0.271,   // 81 H / 293 AB (157 prior + 136 2026)
    OPS: 0.822,   // 2026 season OPS (most recent full season)
    H:   81,      // 45 + 36
    HR:  7,       // 3 + 4
    RBI: 43,      // 22 + 21
    BB:  63,      // 33 + 30
    K:   79,      // 41 + 38
    SB:  46,      // 23 + 23
    AB:  293,     // 157 + 136
    G:   34       // 2026 games through May 14
  },

  // CAREER LINEAGE (Pass 37 + Pass 57) — stage-based developmental history. Display-only.
  // Pass 57 adds 2026 FBG stage: 32 games, Apr 3–May 12 (replay cutoff).
  careerLineage: {
    stages: [
      {
        label: "MiLB",
        hitting: {
          G: null,
          AB: 157,
          H: 45,
          HR: 3,
          RBI: 22,
          BB: 33,
          K: 41,
          SB: 23,
          AVG: 0.287,
          OPS: 0.832,
        }
      },
      {
        label: "FBG 2026",
        hitting: {
          G: 34,
          AB: 136,
          H: 36,
          HR: 4,
          RBI: 21,
          BB: 30,
          K: 38,
          SB: 23,
          AVG: 0.265,
          OPS: 0.822,
        }
      }
    ]
  },

  /* =========================
     DLR (ENGINE LINK)
  ========================= */
  dlr: {
    performance: eli_willits_performance,
    media: eli_willits_media,
    cardMarket: eli_willits_market,
    // PASS 57 REPLAY UPDATE: weeklyHistory populated with W17–W20 deltas.
    // Trailing 4-week window at replay cutoff (May 12). Matches W20 weekly snapshot row.
    // W17=+0.54, W18=+0.61 (peak), W19=-0.51 (cooling), W20=-0.80 (cold game).
    // dlr.score and persistedScore/monthlySettledScore are runtime-hydrated — unchanged.
    weeklyHistory: [+0.54, +0.61, -0.51, -0.80]
  },

  /* =========================
     OBSERVATION TRIAL
  ========================= */
  // 30-day live observation state. Added 2026-05-12 (Pass 56 / Day Zero).
  // See: data/dlr/WILLITS_30_DAY_OBSERVATION.md for full journal.
  observation: {
    state: "30_DAY_OBSERVATION_ACTIVE",
    startDate: "2026-05-12",
    dayZeroBaseline: {
      dlr: null,          // runtime-computed from season_2025 performance data
      anchorSource: "season_2025",
      capturedAt: "2026-05-12T00:00:00Z"
    }
  }
}
