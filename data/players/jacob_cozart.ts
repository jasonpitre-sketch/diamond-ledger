import { jacob_cozart_knowledge } from "./jacob_cozart_knowledge"
import { jacob_cozart_performance } from "./jacob_cozart_performance"
import { jacob_cozart_media } from "./jacob_cozart_media"
import { jacob_cozart_market } from "./jacob_cozart_market"

export const jacob_cozart: any = {
  "id": "jacob_cozart",
  "name": "Jacob Cozart",
  "fullName": "Jacob Cozart",
  "team": "Akron RubberDucks",
  "organization": "San Francisco Giants",
  "position": "C",
  "tier": "AA",
  "level": "AA",
  "age": 23,
  "birthdate": "2003-01-09",
  "school": "NC State (NC)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 214,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 48,
  "draftOverall": 48,
  "draftBonus": "2.05m",
  "pickValue": "1.94m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.229,
    "H": 22,
    "R": 10,
    "HR": 2,
    "RBI": 11,
    "BB": 14,
    "K": 28,
    "OPS": 0.66
  },
  "pitching": null,
  "tracker": {
    "G": 28,
    "AB": 96,
    "PA": 113,
    "R": 10,
    "H": 22,
    "2B": 4,
    "3B": 0,
    "HR": 2,
    "RBI": 11,
    "BB": 14,
    "K": 28,
    "SB": 1,
    "CS": 1,
    "HBP": 1,
    "SF": 2,
    "AVG": 0.229,
    "OBP": 0.327,
    "SLG": 0.333,
    "OPS": 0.66,
    "lastGame": {
      "g": 28,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "vs Chesapeake Baysox",
      "team": "Akron RubberDucks",
      "week": "2026-W20",
      "ab": 0,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.229,
    "OPS": 0.66,
    "H": 22,
    "HR": 2,
    "RBI": 11,
    "BB": 14,
    "K": 28,
    "AB": 96,
    "G": 28,
    "SB": 1
  }
}
jacob_cozart.knowledge = jacob_cozart_knowledge
jacob_cozart.performance = jacob_cozart_performance
jacob_cozart.media = jacob_cozart_media
jacob_cozart.cardMarket = jacob_cozart_market
jacob_cozart.marketArchetype = jacob_cozart_market.marketArchetype
jacob_cozart.dlr = { performance: jacob_cozart_performance, media: jacob_cozart_media, cardMarket: jacob_cozart_market }
