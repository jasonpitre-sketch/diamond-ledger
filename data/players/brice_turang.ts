import { brice_turang_knowledge } from "./brice_turang_knowledge"
import { brice_turang_performance } from "./brice_turang_performance"
import { brice_turang_media } from "./brice_turang_media"
import { brice_turang_market } from "./brice_turang_market"

export const brice_turang = {
  id: "brice_turang",
  name: "Brice Turang",
  fullName: "Brice Craig Turang",

  team: "MIL",
  parentClub: "MIL",
  position: "2B",
  jerseyNumber: 2,

  tier: "MLB",
  level: "MLB",

  age: 26,
  birthdate: "1999-11-21",
  birthplace: "Corona, CA",
  highSchool: "Santiago HS (CA)",

  height: "6'0\"",
  weight: 190,
  bats: "L",
  throws: "R",

  draftYear: 2018,
  draftRound: 1,
  draftOverall: 21,
  draftTeam: "MIL",

  competitionLevel: "MLB",
  marketArchetype: brice_turang_market.marketArchetype,
  requiresDualDomain: false,

  signals: {
    tracked: true,
    heat: "hot",
    price: null
  },

  knowledge: brice_turang_knowledge,
  performance: brice_turang_performance,
  media: brice_turang_media,
  cardMarket: brice_turang_market,

  hitting: {
    AVG: 0.298,
    H: 42,
    R: 33,
    HR: 6,
    RBI: 27,
    BB: 31,
    K: 35,
    OPS: 0.933
  },

  pitching: null,

  // LIVE — 2026 current-season totals.
  // Updated 2026-05-15 via MLB Stats API (API ID 668930) — 38 games through May 14.
  tracker: {
    AB: 141,
    PA: 175,
    G: 38,
    R: 33,
    H: 42,
    "2B": 10,
    "3B": 1,
    HR: 6,
    RBI: 27,
    BB: 31,
    K: 35,
    SB: 8,
    CS: 2,
    HBP: 0,
    SF: 1,
    AVG: 0.298,
    OBP: 0.422,
    SLG: 0.511,
    OPS: 0.933,

    lastGame: {
      date: "2026-05-14",
      opp: "vs SD",
      AB: 2,
      H: 1,
      HR: 0,
      RBI: 1,
      BB: 2,
      K: 1,
      R: 2,
      SB: 0
    },

    rolling: {
      days7: { AB: 23, H: 6, HR: 1, RBI: 5, BB: 2, K: 5, SB: 1, AVG: 0.261, OPS: 0.798 },
      days15: { AB: 44, H: 15, HR: 3, RBI: 8, BB: 9, K: 8, SB: 2, AVG: 0.341, OPS: 0.997 },
      days30: { AB: 95, H: 27, HR: 4, RBI: 19, BB: 20, K: 22, SB: 4, AVG: 0.284, OPS: 0.862 }
    },

    mlbAB: 1688,
    minorAB: null,
    everReachedMLBSample: true
  },

  careerAverages: {
    AVG: 0.261,
    OPS: 0.712,
    H: 440,
    HR: 37,
    RBI: 199,
    BB: 185,
    K: 384,
    AB: 1688,
    G: 486,
    SB: 108
  },

  careerLineage: {
    "2023": { team: "MIL", level: "MLB", G: 137, AVG: 0.218, OPS: 0.585, SB: 26, note: "MLB debut season" },
    "2024": { team: "MIL", level: "MLB", G: 155, AVG: 0.254, OPS: 0.665, SB: 50, note: "Gold Glove and Platinum Glove season" },
    "2025": { team: "MIL", level: "MLB", G: 156, AVG: 0.288, OPS: 0.794, HR: 18, SB: 24, note: "Offensive breakout anchor" },
    "2026": { team: "MIL", level: "MLB", G: 38, AVG: 0.298, OPS: 0.933, HR: 6, SB: 8, status: "in-season", note: "Breakout consolidating through May 14" }
  },

  dlr: {
    performance: brice_turang_performance,
    media: brice_turang_media,
    cardMarket: brice_turang_market
  }
}
