import { adrian_santana_knowledge } from "./adrian_santana_knowledge"
import { adrian_santana_performance } from "./adrian_santana_performance"
import { adrian_santana_media } from "./adrian_santana_media"
import { adrian_santana_market } from "./adrian_santana_market"

export const adrian_santana: any = {
  "id": "adrian_santana",
  "name": "Adrian Santana",
  "fullName": "Adrian Santana",
  "team": "Bowling Green Hot Rods",
  "organization": "Tampa Bay Rays",
  "position": "SS",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-07-18",
  "school": "Doral Academy (FL)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 155,
  "bats": "S",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 31,
  "draftOverall": 31,
  "draftBonus": "2.00m",
  "pickValue": "2.67m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.27,
    "H": 31,
    "R": 18,
    "HR": 1,
    "RBI": 7,
    "BB": 8,
    "K": 16,
    "OPS": 0.67
  },
  "pitching": null,
  "tracker": {
    "G": 29,
    "AB": 115,
    "PA": 127,
    "R": 18,
    "H": 31,
    "2B": 5,
    "3B": 0,
    "HR": 1,
    "RBI": 7,
    "BB": 8,
    "K": 16,
    "SB": 9,
    "CS": 5,
    "HBP": 3,
    "SF": 1,
    "AVG": 0.27,
    "OBP": 0.331,
    "SLG": 0.339,
    "OPS": 0.67,
    "lastGame": {
      "g": 29,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Greenville Drive",
      "team": "Bowling Green Hot Rods",
      "week": "2026-W20",
      "ab": 5,
      "r": 0,
      "h": 1,
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
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.27,
    "OPS": 0.67,
    "H": 31,
    "HR": 1,
    "RBI": 7,
    "BB": 8,
    "K": 16,
    "AB": 115,
    "G": 29,
    "SB": 9
  }
}
adrian_santana.knowledge = adrian_santana_knowledge
adrian_santana.performance = adrian_santana_performance
adrian_santana.media = adrian_santana_media
adrian_santana.cardMarket = adrian_santana_market
adrian_santana.marketArchetype = adrian_santana_market.marketArchetype
adrian_santana.dlr = { performance: adrian_santana_performance, media: adrian_santana_media, cardMarket: adrian_santana_market }
