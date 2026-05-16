import { tyler_bremner_knowledge } from "./tyler_bremner_knowledge"
import { tyler_bremner_performance } from "./tyler_bremner_performance"
import { tyler_bremner_media } from "./tyler_bremner_media"
import { tyler_bremner_market } from "./tyler_bremner_market"

export const tyler_bremner = {
  id: "tyler_bremner",
  name: "Tyler Bremner",
  fullName: "Tyler Bremner",

  team: "TRI",
  parentClub: "LAA",
  position: "SP",
  jerseyNumber: null,

  tier: "A+",
  level: "A+",

  age: 22,
  birthdate: "2004-04-20",
  birthplace: "San Diego, CA",
  college: "UC Santa Barbara",

  height: "6'2\"",
  weight: 190,
  bats: "R",
  throws: "R",

  draftYear: 2025,
  draftRound: 1,
  draftOverall: 2,
  draftTeam: "LAA",

  competitionLevel: "A+",
  marketArchetype: tyler_bremner_market.marketArchetype,
  requiresDualDomain: false,

  signals: {
    tracked: true,
    heat: "hot",
    price: null
  },

  knowledge: tyler_bremner_knowledge,
  performance: tyler_bremner_performance,
  media: tyler_bremner_media,
  cardMarket: tyler_bremner_market,

  hitting: null,

  pitching: {
    ERA: 1.50,
    W: 0,
    L: 1,
    IP: 18.0,
    K: 28,
    BB: 6,
    WHIP: 1.111,
    K9: 14.0
  },

  tracker: {
    G: 5,
    GS: 5,
    W: 0,
    L: 1,
    SV: 0,
    IP: 18.0,
    H: 14,
    R: 4,
    ER: 3,
    HR: 1,
    BB: 6,
    K: 28,
    SO: 28,
    HBP: 0,
    BF: 70,
    ERA: 1.50,
    WHIP: 1.111,
    K9: 14.0,
    BB9: 3.0,
    HR9: 0.5,
    KBB: 4.67,

    lastGame: {
      date: "2026-05-05",
      opp: "@ Spokane",
      IP: 1.1,
      H: 2,
      R: 1,
      ER: 1,
      BB: 1,
      K: 3,
      HR: 0,
      BF: 7,
      result: "L"
    },

    rolling: {
      starts3: { IP: 11.1, ERA: 2.38, WHIP: 1.235, K: 18, BB: 2, K9: 14.3, BB9: 1.6 },
      starts5: { IP: 18.0, ERA: 1.50, WHIP: 1.111, K: 28, BB: 6, K9: 14.0, BB9: 3.0 },
      starts7: { IP: 18.0, ERA: 1.50, WHIP: 1.111, K: 28, BB: 6, K9: 14.0, BB9: 3.0 }
    },

    mlbIP: 0,
    minorIP: 18.0,
    collegeIP: 77.1,
    everReachedMLBSample: false
  },

  careerAverages: {
    G: 19,
    GS: 19,
    W: 5,
    L: 5,
    IP: 95.1,
    H: 74,
    R: 36,
    ER: 33,
    BB: 25,
    K: 139,
    ERA: 3.11,
    WHIP: 1.038,
    K9: 13.1
  },

  careerLineage: {
    "2025": { team: "UC Santa Barbara", level: "NCAA", W: 5, L: 4, ERA: 3.49, IP: 77.1, K: 111, role: "ace" },
    "2026": { team: "Tri-City Dust Devils", level: "A+", W: 0, L: 1, ERA: 1.50, IP: 18.0, K: 28, status: "in-season", note: "First pro starts after No. 2 overall selection" }
  },

  dlr: {}
}
