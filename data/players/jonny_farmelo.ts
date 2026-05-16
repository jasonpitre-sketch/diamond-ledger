import { jonny_farmelo_knowledge } from "./jonny_farmelo_knowledge"
import { jonny_farmelo_performance } from "./jonny_farmelo_performance"
import { jonny_farmelo_media } from "./jonny_farmelo_media"
import { jonny_farmelo_market } from "./jonny_farmelo_market"

export const jonny_farmelo: any = {
  "id": "jonny_farmelo",
  "name": "Jonny Farmelo",
  "fullName": "Jonny Farmelo",
  "team": "Everett AquaSox",
  "organization": "Seattle Mariners",
  "position": "OF",
  "tier": "A+",
  "level": "A+",
  "age": 22,
  "birthdate": "2004-09-09",
  "school": "Westfield HS (VA)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 205,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 29,
  "draftOverall": 29,
  "draftBonus": "3.20m",
  "pickValue": "2.80m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.208,
    "H": 27,
    "R": 24,
    "HR": 3,
    "RBI": 12,
    "BB": 25,
    "K": 45,
    "OPS": 0.704
  },
  "pitching": null,
  "tracker": {
    "G": 33,
    "AB": 130,
    "PA": 158,
    "R": 24,
    "H": 27,
    "2B": 7,
    "3B": 2,
    "HR": 3,
    "RBI": 12,
    "BB": 25,
    "K": 45,
    "SB": 7,
    "CS": 5,
    "HBP": 2,
    "SF": 1,
    "AVG": 0.208,
    "OBP": 0.342,
    "SLG": 0.362,
    "OPS": 0.704,
    "lastGame": {
      "g": 33,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Vancouver Canadians",
      "team": "Everett AquaSox",
      "week": "2026-W20",
      "ab": 5,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 3,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.208,
    "OPS": 0.704,
    "H": 27,
    "HR": 3,
    "RBI": 12,
    "BB": 25,
    "K": 45,
    "AB": 130,
    "G": 33,
    "SB": 7
  }
}
jonny_farmelo.knowledge = jonny_farmelo_knowledge
jonny_farmelo.performance = jonny_farmelo_performance
jonny_farmelo.media = jonny_farmelo_media
jonny_farmelo.cardMarket = jonny_farmelo_market
jonny_farmelo.marketArchetype = jonny_farmelo_market.marketArchetype
jonny_farmelo.dlr = { performance: jonny_farmelo_performance, media: jonny_farmelo_media, cardMarket: jonny_farmelo_market }
