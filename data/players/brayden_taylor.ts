import { brayden_taylor_knowledge } from "./brayden_taylor_knowledge"
import { brayden_taylor_performance } from "./brayden_taylor_performance"
import { brayden_taylor_media } from "./brayden_taylor_media"
import { brayden_taylor_market } from "./brayden_taylor_market"

export const brayden_taylor: any = {
  "id": "brayden_taylor",
  "name": "Brayden Taylor",
  "fullName": "Brayden Taylor",
  "team": "Montgomery Biscuits",
  "organization": "Tampa Bay Rays",
  "position": "SS",
  "tier": "AA",
  "level": "AA",
  "age": 24,
  "birthdate": "2002-05-22",
  "school": "TCU (TX)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 180,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 19,
  "draftOverall": 19,
  "draftBonus": "3.88m",
  "pickValue": "3.88m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.191,
    "H": 18,
    "R": 11,
    "HR": 4,
    "RBI": 17,
    "BB": 15,
    "K": 21,
    "OPS": 0.694
  },
  "pitching": null,
  "tracker": {
    "G": 28,
    "AB": 94,
    "PA": 110,
    "R": 11,
    "H": 18,
    "2B": 3,
    "3B": 2,
    "HR": 4,
    "RBI": 17,
    "BB": 15,
    "K": 21,
    "SB": 4,
    "CS": 0,
    "HBP": 0,
    "SF": 1,
    "AVG": 0.191,
    "OBP": 0.3,
    "SLG": 0.394,
    "OPS": 0.694,
    "lastGame": {
      "g": 28,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "vs Biloxi Shuckers",
      "team": "Montgomery Biscuits",
      "week": "2026-W20",
      "ab": 4,
      "r": 1,
      "h": 2,
      "d": 0,
      "t": 1,
      "hr": 1,
      "rbi": 4,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 7
    }
  },
  "careerAverages": {
    "AVG": 0.191,
    "OPS": 0.694,
    "H": 18,
    "HR": 4,
    "RBI": 17,
    "BB": 15,
    "K": 21,
    "AB": 94,
    "G": 28,
    "SB": 4
  }
}
brayden_taylor.knowledge = brayden_taylor_knowledge
brayden_taylor.performance = brayden_taylor_performance
brayden_taylor.media = brayden_taylor_media
brayden_taylor.cardMarket = brayden_taylor_market
brayden_taylor.marketArchetype = brayden_taylor_market.marketArchetype
brayden_taylor.dlr = { performance: brayden_taylor_performance, media: brayden_taylor_media, cardMarket: brayden_taylor_market }
