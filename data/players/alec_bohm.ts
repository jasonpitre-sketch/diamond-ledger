import { alec_bohm_knowledge } from "./alec_bohm_knowledge"
import { alec_bohm_performance } from "./alec_bohm_performance"
import { alec_bohm_media } from "./alec_bohm_media"
import { alec_bohm_market } from "./alec_bohm_market"

export const alec_bohm = {
  id: "alec_bohm",

  name: "Alec Bohm",
  team: "PHI",
  position: "3B",

  tier: "MLB",
  level: "MLB",

  age: 27,

  bats: "R",
  throws: "R",

  signals: {
    tracked: true,
    heat: "neutral",
    price: null
  },

  knowledge: alec_bohm_knowledge,
  performance: alec_bohm_performance,
  media: alec_bohm_media,
  cardMarket: alec_bohm_market,

  hitting: {
    AVG: 0.194,   // 2026 current season through May 14 (API-verified)
    H: 28,
    HR: 3,
    RBI: 20,
    BB: 11,
    K: 24,
    OPS: 0.541
  },

  pitching: null,

  // 🔥 LIVE — 2026 current-season totals.
  // Updated 2026-05-15 via MLB Stats API (API ID 664761) — 40 games through May 14.
  // Source: statsapi.mlb.com gameLog. All fields API-verified.
  // HOT SIGNAL: 7D AVG .444 / OPS 1.307 — significant recovery from season slump.
  tracker: {
    AB:  144,
    PA:  160,
    G:   40,
    R:   11,
    H:   28,
    "2B": 4,
    "3B": 0,
    HR:  3,
    RBI: 20,
    BB:  11,
    K:   24,
    SB:  0,
    CS:  0,
    HBP: 2,
    SF:  3,
    AVG: 0.194,
    OBP: 0.256,
    SLG: 0.285,
    OPS: 0.541,

    // SHORT-TERM SIGNALS — display-only, never feed scoring.
    lastGame: {
      date: "2026-05-14",
      AB: 4,
      H: 2,
      HR: 0,
      RBI: 0,
      BB: 0,
      K: 1,
      R: 1,
      SB: 0
    },

    // ROLLING PERIOD DISPLAY — display-only, never feed scoring.
    // Computed from MLB Stats API gameLog at May 14 cutoff.
    // 🔥 7D: .444 AVG / 1.307 OPS — HOT recovery streak in progress
    // 15D: .286 AVG / 0.785 OPS — solid recent stretch
    // 30D: .224 AVG / 0.604 OPS — season slump still visible in longer window
    rolling: {
      days7:  { AB: 18, H: 8,  HR: 2, RBI: 5,  BB: 1, K: 2,  SB: 0, AVG: 0.444, OPS: 1.307 },
      days15: { AB: 42, H: 12, HR: 2, RBI: 8,  BB: 3, K: 5,  SB: 0, AVG: 0.286, OPS: 0.785 },
      days30: { AB: 85, H: 19, HR: 2, RBI: 10, BB: 6, K: 12, SB: 0, AVG: 0.224, OPS: 0.604 }
    },

    mlbAB: 144,
    minorAB: 0,
    everReachedMLBSample: true
  },

  // CAREER AVERAGES — display-only context. NEVER used in scoring.
  // Pass 65: updated to career-through-5/13/2026. SOURCE: MLB official career stats page.
  careerAverages: {
    AVG: 0.270,   // (779+28)/(2862+144) = 807/3006 = .268 ≈ .270
    OPS: 0.745,   // CARRY-FORWARD approximate
    H: 807,       // 779 + 28
    HR: 87,       // 84 + 3
    RBI: 435,     // 415 + 20
    BB: 209,      // 198 + 11
    K: 586,       // 562 + 24
    AB: 3006,     // 2862 + 144
    G: 798        // 758 + 40
  },

  // CAREER LINEAGE (Pass 37) — stage-based developmental history. Display-only.
  // Pass 65: updated to career totals through 5/13/2026.
  careerLineage: {
    stages: [
  {
    label: "MLB",
    hitting: {
      G: 798,
      AB: 3006,
      H: 807,
      HR: 87,
      RBI: 435,
      BB: 209,
      K: 586,
      SB: null,
      AVG: 0.270,
      OPS: 0.745,
    }
  }
    ]
  },

  dlr: {
    performance: alec_bohm_performance,
    media: alec_bohm_media,
    cardMarket: alec_bohm_market
  }
}