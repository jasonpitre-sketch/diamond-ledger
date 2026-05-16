import { bo_naylor_knowledge } from "./bo_naylor_knowledge"
import { bo_naylor_performance } from "./bo_naylor_performance"
import { bo_naylor_media } from "./bo_naylor_media"
import { bo_naylor_market } from "./bo_naylor_market"

export const bo_naylor = {
  id: "bo_naylor",
  name: "Bo Naylor",
  fullName: "Noah-Gibson Naylor",
  team: "CLE",
  parentClub: "CLE",
  position: "C",
  jerseyNumber: 23,
  tier: "MLB",
  level: "MLB",
  age: 26,
  birthdate: "2000-02-21",
  birthplace: "Mississauga, ON",
  highSchool: "St. Joan of Arc HS (ON)",
  height: "5'9\"",
  weight: 205,
  bats: "L",
  throws: "R",
  draftYear: 2018,
  draftRound: 1,
  draftOverall: 29,
  draftTeam: "CLE",
  competitionLevel: "MLB",
  marketArchetype: bo_naylor_market.marketArchetype,
  requiresDualDomain: false,
  signals: { tracked: true, heat: "cold", price: null },
  knowledge: bo_naylor_knowledge,
  performance: bo_naylor_performance,
  media: bo_naylor_media,
  cardMarket: bo_naylor_market,
  hitting: { AVG: 0.143, H: 12, R: 4, HR: 2, RBI: 7, BB: 6, K: 21, OPS: 0.438 },
  pitching: null,
  tracker: {
    AB: 84, PA: 90, G: 28, R: 4, H: 12, "2B": 2, "3B": 0, HR: 2, RBI: 7, BB: 6, K: 21, SB: 0, CS: 0, HBP: 0, SF: 0,
    AVG: 0.143, OBP: 0.200, SLG: 0.238, OPS: 0.438,
    lastGame: { date: "2026-05-07", opp: "@ KC", AB: 5, H: 2, HR: 1, RBI: 3, BB: 0, K: 1, R: 1, SB: 0 },
    rolling: {
      days7: { AB: 16, H: 4, HR: 1, RBI: 4, BB: 1, K: 3, SB: 0, AVG: 0.250, OPS: 0.794 },
      days15: { AB: 36, H: 6, HR: 1, RBI: 4, BB: 3, K: 8, SB: 0, AVG: 0.167, OPS: 0.494 },
      days30: { AB: 76, H: 11, HR: 2, RBI: 6, BB: 6, K: 20, SB: 0, AVG: 0.145, OPS: 0.466 }
    },
    mlbAB: 1003,
    minorAB: null,
    everReachedMLBSample: true
  },
  careerAverages: { AVG: 0.199, OPS: 0.651, H: 200, HR: 40, RBI: 125, BB: 110, K: 300, AB: 1003, G: 346, SB: 12 },
  careerLineage: {
    "2022": { team: "CLE", level: "MLB", G: 5, AVG: 0.000, OPS: 0.000, note: "MLB debut" },
    "2023": { team: "CLE", level: "MLB", G: 67, AVG: 0.237, OPS: 0.809, note: "power breakout glimpse" },
    "2024": { team: "CLE", level: "MLB", G: 123, AVG: 0.201, OPS: 0.631, note: "regular catcher workload" },
    "2025": { team: "CLE", level: "MLB", G: 123, AVG: 0.195, OPS: 0.661, note: "power with contact risk" },
    "2026": { team: "CLE", level: "MLB", G: 28, AVG: 0.143, OPS: 0.438, status: "in-season", note: "cold start through May 7" }
  },
  dlr: { performance: bo_naylor_performance, media: bo_naylor_media, cardMarket: bo_naylor_market }
}
