import { nick_madrigal_knowledge } from "./nick_madrigal_knowledge"
import { nick_madrigal_performance } from "./nick_madrigal_performance"
import { nick_madrigal_media } from "./nick_madrigal_media"
import { nick_madrigal_market } from "./nick_madrigal_market"

export const nick_madrigal = {
  id: "nick_madrigal",
  name: "Nick Madrigal",
  fullName: "Nicklaus M. Madrigal",

  team: "SL",
  parentClub: "LAA",
  position: "3B",
  jerseyNumber: 2,

  tier: "AAA",
  level: "AAA",

  age: 29,
  birthdate: "1997-03-05",
  birthplace: "Sacramento, CA",
  college: "Oregon State",

  height: "5'7\"",
  weight: 175,
  bats: "R",
  throws: "R",

  draftYear: 2018,
  draftRound: 1,
  draftOverall: 4,
  draftTeam: "CWS",

  competitionLevel: "AAA",
  marketArchetype: nick_madrigal_market.marketArchetype,
  requiresDualDomain: false,

  signals: {
    tracked: true,
    heat: "warm",
    price: null
  },

  knowledge: nick_madrigal_knowledge,
  performance: nick_madrigal_performance,
  media: nick_madrigal_media,
  cardMarket: nick_madrigal_market,

  hitting: {
    AVG: 0.270,
    H: 30,
    R: 16,
    HR: 0,
    RBI: 16,
    BB: 14,
    K: 6,
    OPS: 0.684
  },

  pitching: null,

  tracker: {
    AB: 111,
    PA: 131,
    G: 30,
    R: 16,
    H: 30,
    "2B": 5,
    "3B": 1,
    HR: 0,
    RBI: 16,
    BB: 14,
    K: 6,
    SB: 3,
    CS: 0,
    HBP: 2,
    SF: 4,
    AVG: 0.270,
    OBP: 0.351,
    SLG: 0.333,
    OPS: 0.684,

    lastGame: {
      date: "2026-05-14",
      opp: "vs ELP",
      AB: 3,
      H: 0,
      HR: 0,
      RBI: 0,
      BB: 1,
      K: 0,
      R: 1,
      SB: 0
    },

    rolling: {
      days7: { AB: 12, H: 5, HR: 0, RBI: 1, BB: 1, K: 0, SB: 1, AVG: 0.417, OPS: 0.917 },
      days15: { AB: 39, H: 14, HR: 0, RBI: 5, BB: 5, K: 1, SB: 2, AVG: 0.359, OPS: 0.845 },
      days30: { AB: 75, H: 22, HR: 0, RBI: 10, BB: 8, K: 3, SB: 3, AVG: 0.293, OPS: 0.734 }
    },

    mlbAB: 934,
    minorAB: 111,
    everReachedMLBSample: true
  },

  careerAverages: {
    AVG: 0.274,
    OPS: 0.667,
    H: 256,
    HR: 4,
    RBI: 75,
    BB: 38,
    K: 82,
    AB: 934,
    G: 309,
    SB: 20
  },

  careerLineage: {
    "2020": { team: "CWS", level: "MLB", G: 29, AVG: 0.340, OPS: 0.745, note: "MLB debut contact surge" },
    "2021": { team: "CWS/CHC", level: "MLB", G: 54, AVG: 0.305, OPS: 0.774, note: "Trade year, hamstring setback" },
    "2022": { team: "CHC", level: "MLB", G: 59, AVG: 0.249, OPS: 0.588, note: "Return from injury" },
    "2023": { team: "CHC", level: "MLB", G: 92, AVG: 0.263, OPS: 0.663, note: "utility infield role" },
    "2024": { team: "CHC", level: "MLB", G: 62, AVG: 0.221, OPS: 0.572, note: "role compressed" },
    "2025": { team: "LAA", level: "MLB", G: 53, AVG: 0.206, OPS: 0.514, note: "depth infielder" },
    "2026": { team: "SL", level: "AAA", G: 30, AVG: 0.270, OPS: 0.684, status: "in-season", note: "Triple-A contact rebound through May 14" }
  },

  dlr: {
    performance: nick_madrigal_performance,
    media: nick_madrigal_media,
    cardMarket: nick_madrigal_market
  }
}
