import { kevin_mcgonigle_knowledge } from "./kevin_mcgonigle_knowledge"
import { kevin_mcgonigle_performance } from "./kevin_mcgonigle_performance"
import { kevin_mcgonigle_media } from "./kevin_mcgonigle_media"
import { kevin_mcgonigle_market } from "./kevin_mcgonigle_market"

export const kevin_mcgonigle: any = {
  "id": "kevin_mcgonigle",
  "name": "Kevin McGonigle",
  "fullName": "Kevin McGonigle",
  "team": "Detroit Tigers",
  "organization": "Detroit Tigers",
  "position": "SS",
  "tier": "MLB",
  "level": "MLB",
  "age": 22,
  "birthdate": "2004-08-18",
  "school": "Monsignor Bonner HS (PA)",
  "country": "USA",
  "height": "5' 9\"",
  "weight": 187,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 37,
  "draftOverall": 37,
  "draftBonus": "2.85m",
  "pickValue": "2.31m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.291,
    "H": 46,
    "R": 27,
    "HR": 2,
    "RBI": 16,
    "BB": 26,
    "K": 24,
    "OPS": 0.828
  },
  "pitching": null,
  "tracker": {
    "G": 43,
    "AB": 158,
    "PA": 186,
    "R": 27,
    "H": 46,
    "2B": 12,
    "3B": 2,
    "HR": 2,
    "RBI": 16,
    "BB": 26,
    "K": 24,
    "SB": 7,
    "CS": 0,
    "HBP": 2,
    "SF": 0,
    "AVG": 0.291,
    "OBP": 0.398,
    "SLG": 0.43,
    "OPS": 0.828,
    "lastGame": {
      "g": 43,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-15",
      "opp": "vs Toronto Blue Jays",
      "team": "Detroit Tigers",
      "week": "2026-W20",
      "ab": 1,
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
    "AVG": 0.291,
    "OPS": 0.828,
    "H": 46,
    "HR": 2,
    "RBI": 16,
    "BB": 26,
    "K": 24,
    "AB": 158,
    "G": 43,
    "SB": 7
  }
}
kevin_mcgonigle.knowledge = kevin_mcgonigle_knowledge
kevin_mcgonigle.performance = kevin_mcgonigle_performance
kevin_mcgonigle.media = kevin_mcgonigle_media
kevin_mcgonigle.cardMarket = kevin_mcgonigle_market
kevin_mcgonigle.marketArchetype = kevin_mcgonigle_market.marketArchetype
kevin_mcgonigle.dlr = { performance: kevin_mcgonigle_performance, media: kevin_mcgonigle_media, cardMarket: kevin_mcgonigle_market }
