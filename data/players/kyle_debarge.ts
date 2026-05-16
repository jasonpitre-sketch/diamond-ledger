import { kyle_debarge_knowledge } from "./kyle_debarge_knowledge"
import { kyle_debarge_performance } from "./kyle_debarge_performance"
import { kyle_debarge_media } from "./kyle_debarge_media"
import { kyle_debarge_market } from "./kyle_debarge_market"

export const kyle_debarge: any = {
  "id": "kyle_debarge",
  "name": "Kyle DeBarge",
  "fullName": "Kyle DeBarge",
  "team": "Wichita Wind Surge",
  "organization": "Minnesota Twins",
  "position": "SS",
  "tier": "AA",
  "level": "AA",
  "age": 23,
  "birthdate": "2003-07-15",
  "school": "University of Louisiana at Lafayette (LA)",
  "country": "USA",
  "height": "5' 9\"",
  "weight": 175,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 33,
  "draftOverall": 33,
  "draftBonus": "2.40m",
  "pickValue": "2.77m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.183,
    "H": 23,
    "R": 27,
    "HR": 4,
    "RBI": 13,
    "BB": 20,
    "K": 42,
    "OPS": 0.614
  },
  "pitching": null,
  "tracker": {
    "G": 32,
    "AB": 126,
    "PA": 148,
    "R": 27,
    "H": 23,
    "2B": 5,
    "3B": 0,
    "HR": 4,
    "RBI": 13,
    "BB": 20,
    "K": 42,
    "SB": 11,
    "CS": 5,
    "HBP": 1,
    "SF": 1,
    "AVG": 0.183,
    "OBP": 0.297,
    "SLG": 0.317,
    "OPS": 0.614,
    "lastGame": {
      "g": 32,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "@ San Antonio Missions",
      "team": "Wichita Wind Surge",
      "week": "2026-W20",
      "ab": 5,
      "r": 1,
      "h": 3,
      "d": 2,
      "t": 0,
      "hr": 0,
      "rbi": 3,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 5
    }
  },
  "careerAverages": {
    "AVG": 0.183,
    "OPS": 0.614,
    "H": 23,
    "HR": 4,
    "RBI": 13,
    "BB": 20,
    "K": 42,
    "AB": 126,
    "G": 32,
    "SB": 11
  }
}
kyle_debarge.knowledge = kyle_debarge_knowledge
kyle_debarge.performance = kyle_debarge_performance
kyle_debarge.media = kyle_debarge_media
kyle_debarge.cardMarket = kyle_debarge_market
kyle_debarge.marketArchetype = kyle_debarge_market.marketArchetype
kyle_debarge.dlr = { performance: kyle_debarge_performance, media: kyle_debarge_media, cardMarket: kyle_debarge_market }
