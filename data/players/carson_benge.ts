import { carson_benge_knowledge } from "./carson_benge_knowledge"
import { carson_benge_performance } from "./carson_benge_performance"
import { carson_benge_media } from "./carson_benge_media"
import { carson_benge_market } from "./carson_benge_market"

export const carson_benge: any = {
  "id": "carson_benge",
  "name": "Carson Benge",
  "fullName": "Carson Benge",
  "team": "New York Mets",
  "organization": "New York Mets",
  "position": "RF",
  "tier": "MLB",
  "level": "MLB",
  "age": 23,
  "birthdate": "2003-01-20",
  "school": "Oklahoma State (OK)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 184,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 19,
  "draftOverall": 19,
  "draftBonus": "4.00m",
  "pickValue": "4.22m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.237,
    "H": 31,
    "R": 17,
    "HR": 3,
    "RBI": 13,
    "BB": 11,
    "K": 30,
    "OPS": 0.64
  },
  "pitching": null,
  "tracker": {
    "G": 40,
    "AB": 131,
    "PA": 142,
    "R": 17,
    "H": 31,
    "2B": 5,
    "3B": 0,
    "HR": 3,
    "RBI": 13,
    "BB": 11,
    "K": 30,
    "SB": 8,
    "CS": 1,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.237,
    "OBP": 0.296,
    "SLG": 0.344,
    "OPS": 0.64,
    "lastGame": {
      "g": 40,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "vs Detroit Tigers",
      "team": "New York Mets",
      "week": "2026-W20",
      "ab": 5,
      "r": 1,
      "h": 2,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 0,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 2
    }
  },
  "careerAverages": {
    "AVG": 0.237,
    "OPS": 0.64,
    "H": 31,
    "HR": 3,
    "RBI": 13,
    "BB": 11,
    "K": 30,
    "AB": 131,
    "G": 40,
    "SB": 8
  }
}
carson_benge.knowledge = carson_benge_knowledge
carson_benge.performance = carson_benge_performance
carson_benge.media = carson_benge_media
carson_benge.cardMarket = carson_benge_market
carson_benge.marketArchetype = carson_benge_market.marketArchetype
carson_benge.dlr = { performance: carson_benge_performance, media: carson_benge_media, cardMarket: carson_benge_market }
