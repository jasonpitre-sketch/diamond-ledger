import { kellon_lindsey_knowledge } from "./kellon_lindsey_knowledge"
import { kellon_lindsey_performance } from "./kellon_lindsey_performance"
import { kellon_lindsey_media } from "./kellon_lindsey_media"
import { kellon_lindsey_market } from "./kellon_lindsey_market"

export const kellon_lindsey: any = {
  "id": "kellon_lindsey",
  "name": "Kellon Lindsey",
  "fullName": "Kellon Lindsey",
  "team": "Ontario Tower Buzzers",
  "organization": "Los Angeles Dodgers",
  "position": "SS",
  "tier": "A",
  "level": "A",
  "age": 21,
  "birthdate": "2005-09-21",
  "school": "Hardee HS (FL)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 175,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 23,
  "draftOverall": 23,
  "draftBonus": "3.30m",
  "pickValue": "3.68m",
  "competitionLevel": "A",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.5,
    "H": 2,
    "R": 0,
    "HR": 0,
    "RBI": 0,
    "BB": 0,
    "K": 0,
    "OPS": 1.5
  },
  "pitching": null,
  "tracker": {
    "G": 1,
    "AB": 4,
    "PA": 4,
    "R": 0,
    "H": 2,
    "2B": 0,
    "3B": 1,
    "HR": 0,
    "RBI": 0,
    "BB": 0,
    "K": 0,
    "SB": 0,
    "CS": 0,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.5,
    "OBP": 0.5,
    "SLG": 1,
    "OPS": 1.5,
    "lastGame": {
      "g": 1,
      "sport": 14,
      "level": "A",
      "date": "2026-05-13",
      "opp": "vs San Jose Giants",
      "team": "Ontario Tower Buzzers",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 2,
      "d": 0,
      "t": 1,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 4
    }
  },
  "careerAverages": {
    "AVG": 0.5,
    "OPS": 1.5,
    "H": 2,
    "HR": 0,
    "RBI": 0,
    "BB": 0,
    "K": 0,
    "AB": 4,
    "G": 1,
    "SB": 0
  }
}
kellon_lindsey.knowledge = kellon_lindsey_knowledge
kellon_lindsey.performance = kellon_lindsey_performance
kellon_lindsey.media = kellon_lindsey_media
kellon_lindsey.cardMarket = kellon_lindsey_market
kellon_lindsey.marketArchetype = kellon_lindsey_market.marketArchetype
kellon_lindsey.dlr = { performance: kellon_lindsey_performance, media: kellon_lindsey_media, cardMarket: kellon_lindsey_market }
