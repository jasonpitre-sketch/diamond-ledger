import { braylon_payne_knowledge } from "./braylon_payne_knowledge"
import { braylon_payne_performance } from "./braylon_payne_performance"
import { braylon_payne_media } from "./braylon_payne_media"
import { braylon_payne_market } from "./braylon_payne_market"

export const braylon_payne: any = {
  "id": "braylon_payne",
  "name": "Braylon Payne",
  "fullName": "Braylon Payne",
  "team": "Wisconsin Timber Rattlers",
  "organization": "Milwaukee Brewers",
  "position": "OF",
  "tier": "A+",
  "level": "A+",
  "age": 20,
  "birthdate": "2006-08-14",
  "school": "Elkins HS (TX)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 186,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 17,
  "draftOverall": 17,
  "draftBonus": "3.44m",
  "pickValue": "4.53m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.279,
    "H": 29,
    "R": 23,
    "HR": 7,
    "RBI": 15,
    "BB": 18,
    "K": 32,
    "OPS": 0.948
  },
  "pitching": null,
  "tracker": {
    "G": 27,
    "AB": 104,
    "PA": 123,
    "R": 23,
    "H": 29,
    "2B": 8,
    "3B": 0,
    "HR": 7,
    "RBI": 15,
    "BB": 18,
    "K": 32,
    "SB": 9,
    "CS": 3,
    "HBP": 1,
    "SF": 0,
    "AVG": 0.279,
    "OBP": 0.39,
    "SLG": 0.558,
    "OPS": 0.948,
    "lastGame": {
      "g": 27,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "vs South Bend Cubs",
      "team": "Wisconsin Timber Rattlers",
      "week": "2026-W20",
      "ab": 5,
      "r": 2,
      "h": 3,
      "d": 0,
      "t": 0,
      "hr": 1,
      "rbi": 1,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 6
    }
  },
  "careerAverages": {
    "AVG": 0.279,
    "OPS": 0.948,
    "H": 29,
    "HR": 7,
    "RBI": 15,
    "BB": 18,
    "K": 32,
    "AB": 104,
    "G": 27,
    "SB": 9
  }
}
braylon_payne.knowledge = braylon_payne_knowledge
braylon_payne.performance = braylon_payne_performance
braylon_payne.media = braylon_payne_media
braylon_payne.cardMarket = braylon_payne_market
braylon_payne.marketArchetype = braylon_payne_market.marketArchetype
braylon_payne.dlr = { performance: braylon_payne_performance, media: braylon_payne_media, cardMarket: braylon_payne_market }
