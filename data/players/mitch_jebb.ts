import { mitch_jebb_knowledge } from "./mitch_jebb_knowledge"
import { mitch_jebb_performance } from "./mitch_jebb_performance"
import { mitch_jebb_media } from "./mitch_jebb_media"
import { mitch_jebb_market } from "./mitch_jebb_market"

export const mitch_jebb: any = {
  "id": "mitch_jebb",
  "name": "Mitch Jebb",
  "fullName": "Mitch Jebb",
  "team": "Indianapolis Indians",
  "organization": "Pittsburgh Pirates",
  "position": "SS",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-05-13",
  "school": "Michigan State (MI)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 185,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 42,
  "draftOverall": 42,
  "draftBonus": "1.65m",
  "pickValue": "2.05m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.273,
    "H": 21,
    "R": 13,
    "HR": 2,
    "RBI": 8,
    "BB": 11,
    "K": 13,
    "OPS": 0.766
  },
  "pitching": null,
  "tracker": {
    "G": 20,
    "AB": 77,
    "PA": 88,
    "R": 13,
    "H": 21,
    "2B": 2,
    "3B": 1,
    "HR": 2,
    "RBI": 8,
    "BB": 11,
    "K": 13,
    "SB": 6,
    "CS": 1,
    "HBP": 0,
    "SF": 0,
    "TB": 31,
    "AVG": 0.273,
    "OBP": 0.364,
    "SLG": 0.403,
    "OPS": 0.766,
    "lastGame": {
      "g": 20,
      "sport": 11,
      "level": "AAA",
      "date": "2026-04-26",
      "opp": "vs St. Paul Saints",
      "team": "Indianapolis Indians",
      "week": "2026-W17",
      "ab": 4,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.273,
    "H": 21,
    "R": 13,
    "HR": 2,
    "RBI": 8,
    "BB": 11,
    "K": 13,
    "OPS": 0.766,
    "AB": 77,
    "G": 20,
    "SB": 6
  }
}
mitch_jebb.knowledge = mitch_jebb_knowledge
mitch_jebb.performance = mitch_jebb_performance
mitch_jebb.media = mitch_jebb_media
mitch_jebb.cardMarket = mitch_jebb_market
mitch_jebb.marketArchetype = mitch_jebb_market.marketArchetype
mitch_jebb.dlr = { performance: mitch_jebb_performance, media: mitch_jebb_media, cardMarket: mitch_jebb_market }
