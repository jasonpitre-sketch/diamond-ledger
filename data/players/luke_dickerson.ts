import { luke_dickerson_knowledge } from "./luke_dickerson_knowledge"
import { luke_dickerson_performance } from "./luke_dickerson_performance"
import { luke_dickerson_media } from "./luke_dickerson_media"
import { luke_dickerson_market } from "./luke_dickerson_market"

export const luke_dickerson: any = {
  "id": "luke_dickerson",
  "name": "Luke Dickerson",
  "fullName": "Luke Dickerson",
  "team": "Fredericksburg Nationals",
  "organization": "Washington Nationals",
  "position": "SS",
  "tier": "A",
  "level": "A",
  "age": 21,
  "birthdate": "2005-08-09",
  "school": "Morris Knolls HS (NJ)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 197,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 44,
  "draftOverall": 44,
  "draftBonus": "3.80m",
  "pickValue": "2.12m",
  "competitionLevel": "A",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.252,
    "H": 33,
    "R": 28,
    "HR": 4,
    "RBI": 26,
    "BB": 26,
    "K": 43,
    "OPS": 0.829
  },
  "pitching": null,
  "tracker": {
    "G": 33,
    "AB": 131,
    "PA": 159,
    "R": 28,
    "H": 33,
    "2B": 11,
    "3B": 2,
    "HR": 4,
    "RBI": 26,
    "BB": 26,
    "K": 43,
    "SB": 6,
    "CS": 3,
    "HBP": 0,
    "SF": 2,
    "AVG": 0.252,
    "OBP": 0.371,
    "SLG": 0.458,
    "OPS": 0.829,
    "lastGame": {
      "g": 33,
      "sport": 14,
      "level": "A",
      "date": "2026-05-13",
      "opp": "vs Salem RidgeYaks",
      "team": "Fredericksburg Nationals",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.252,
    "OPS": 0.829,
    "H": 33,
    "HR": 4,
    "RBI": 26,
    "BB": 26,
    "K": 43,
    "AB": 131,
    "G": 33,
    "SB": 6
  }
}
luke_dickerson.knowledge = luke_dickerson_knowledge
luke_dickerson.performance = luke_dickerson_performance
luke_dickerson.media = luke_dickerson_media
luke_dickerson.cardMarket = luke_dickerson_market
luke_dickerson.marketArchetype = luke_dickerson_market.marketArchetype
luke_dickerson.dlr = { performance: luke_dickerson_performance, media: luke_dickerson_media, cardMarket: luke_dickerson_market }
