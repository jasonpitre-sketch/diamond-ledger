import { kendall_george_knowledge } from "./kendall_george_knowledge"
import { kendall_george_performance } from "./kendall_george_performance"
import { kendall_george_media } from "./kendall_george_media"
import { kendall_george_market } from "./kendall_george_market"

export const kendall_george: any = {
  "id": "kendall_george",
  "name": "Kendall George",
  "fullName": "Kendall George",
  "team": "Tulsa Drillers",
  "organization": "Los Angeles Dodgers",
  "position": "OF",
  "tier": "AA",
  "level": "AA",
  "age": 22,
  "birthdate": "2004-10-29",
  "school": "Atascocita HS (TX)",
  "country": "USA",
  "height": "5' 9\"",
  "weight": 170,
  "bats": "L",
  "throws": "L",
  "draftYear": 2023,
  "draftPick": 36,
  "draftOverall": 36,
  "draftBonus": "1.85m",
  "pickValue": "2.36m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.323,
    "H": 43,
    "R": 35,
    "HR": 0,
    "RBI": 16,
    "BB": 18,
    "K": 27,
    "OPS": 0.81
  },
  "pitching": null,
  "tracker": {
    "G": 33,
    "AB": 133,
    "PA": 153,
    "R": 35,
    "H": 43,
    "2B": 8,
    "3B": 1,
    "HR": 0,
    "RBI": 16,
    "BB": 18,
    "K": 27,
    "SB": 18,
    "CS": 2,
    "HBP": 2,
    "SF": 0,
    "AVG": 0.323,
    "OBP": 0.412,
    "SLG": 0.398,
    "OPS": 0.81,
    "lastGame": {
      "g": 33,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "vs Springfield Cardinals",
      "team": "Tulsa Drillers",
      "week": "2026-W20",
      "ab": 4,
      "r": 1,
      "h": 2,
      "d": 1,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 3
    }
  },
  "careerAverages": {
    "AVG": 0.323,
    "OPS": 0.81,
    "H": 43,
    "HR": 0,
    "RBI": 16,
    "BB": 18,
    "K": 27,
    "AB": 133,
    "G": 33,
    "SB": 18
  }
}
kendall_george.knowledge = kendall_george_knowledge
kendall_george.performance = kendall_george_performance
kendall_george.media = kendall_george_media
kendall_george.cardMarket = kendall_george_market
kendall_george.marketArchetype = kendall_george_market.marketArchetype
kendall_george.dlr = { performance: kendall_george_performance, media: kendall_george_media, cardMarket: kendall_george_market }
