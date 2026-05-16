import { ethan_holliday_knowledge } from "./ethan_holliday_knowledge"
import { ethan_holliday_performance } from "./ethan_holliday_performance"
import { ethan_holliday_media } from "./ethan_holliday_media"
import { ethan_holliday_market } from "./ethan_holliday_market"

export const ethan_holliday = {
  id:          "ethan_holliday",
  name:        "Ethan Holliday",
  fullName:    "Ethan Smith Holliday",

  team:        "FRE",
  parentClub:  "COL",
  position:    "SS",
  jerseyNumber: 7,

  tier:  "A",
  level: "A",

  age:       19,
  birthdate: "2007-02-23",
  birthplace: "Tucson, AZ",
  highSchool: "Stillwater HS (OK)",

  height: "6'2\"",
  weight: 210,
  bats:   "L",
  throws: "R",

  draftYear:    2025,
  draftRound:   1,
  draftOverall: 4,
  draftTeam:    "COL",

  competitionLevel: "MiLB",

  /* =========================
     MARKET ARCHETYPE
     Added Pass 20.6 pattern — required for PRE_BOWMAN branch activation
     Must appear at composite root AND inside cardMarket
  ========================= */
  marketArchetype: ethan_holliday_market.marketArchetype,

  requiresDualDomain: false,

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "neutral",
    price:   null
  },

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   ethan_holliday_knowledge,
  performance: ethan_holliday_performance,
  media:       ethan_holliday_media,
  cardMarket:  ethan_holliday_market,

  /* =========================
     CORE STATS (display layer — matches performance.snapshot)
  ========================= */
  hitting: {
    AVG: 0.257,
    H:   26,
    R:   22,
    HR:  7,
    RBI: 26,
    BB:  18,
    K:   37,
    SB:  1,
    OPS: 0.934
  },

  pitching: null,

  /* =========================
     TRACKER — 2026 in-season totals (through 2026-05-14)
     Rolling windows populated from game log
  ========================= */
  tracker: {
    AB:  101,
    PA:  126,
    G:   28,
    R:   22,
    H:   26,
    "2B": 4,
    "3B": 2,
    HR:  7,
    RBI: 26,
    BB:  18,
    K:   37,
    SO:  37,
    SB:  1,
    CS:  1,
    HBP: 5,
    SF:  2,
    AVG: 0.257,
    OBP: 0.389,
    SLG: 0.545,
    OPS: 0.934,
    BABIP: 0.322,

    lastGame: {
      date: "2026-05-14",
      AB:   4,
      H:    2,
      HR:   1,
      RBI:  2,
      BB:   0,
      K:    1,
      SB:   0
    },

    rolling: {
      days7: {
        AB:  18, H: 3, HR: 1, BB: 0, K: 8,
        AVG: 0.167, OPS: 0.500
      },
      days15: {
        AB:  40, H: 12, HR: 4, BB: 3, K: 17,
        AVG: 0.300, OPS: 1.074
      },
      days30: {
        AB:  70, H: 19, HR: 6, BB: 13, K: 25,
        AVG: 0.271, OPS: 1.029
      }
    },

    mlbAB:                0,
    minorAB:              172,  // Career MiLB ABs (46 G: 71 in 2025 + 101 in 2026)
    everReachedMLBSample: false
  },

  /* =========================
     CAREER AVERAGES — cumulative MiLB through 2026-05-14
     46 G / 172 AB career line
  ========================= */
  careerAverages: {
    GP:  46,
    AB:  172,
    R:   36,
    H:   43,
    "2B": 8,
    "3B": 2,
    HR:  9,
    RBI: 32,
    BB:  30,
    K:   70,
    SB:  1,
    AVG: 0.250,
    OBP: 0.376,
    SLG: 0.477,
    OPS: 0.853
  },

  /* =========================
     CAREER LINEAGE — season-by-season professional arc
  ========================= */
  careerLineage: {
    "2025": { team: "FRE", level: "A",  GP: 18, AB: 71,  AVG: 0.239, OPS: 0.737 },
    "2026": { team: "FRE", level: "A",  GP: 28, AB: 101, AVG: 0.257, OPS: 0.934, status: "in-season" }
  },

  /* =========================
     FAMILY PEDIGREE
  ========================= */
  family: {
    father: "Matt Holliday (MLB, 7x All-Star, 2 World Series rings)",
    brother: "Jackson Holliday (BAL, MLB)",
    uncle:   "Josh Holliday (Oklahoma State HC)"
  },

  /* =========================
     DLR — populated on first ingestion
  ========================= */
  dlr: {}
}
