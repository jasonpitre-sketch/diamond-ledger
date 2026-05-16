import { wyatt_langford_knowledge } from "./wyatt_langford_knowledge"
import { wyatt_langford_performance } from "./wyatt_langford_performance"
import { wyatt_langford_media } from "./wyatt_langford_media"
import { wyatt_langford_market } from "./wyatt_langford_market"

export const wyatt_langford: any = {
  "id": "wyatt_langford",
  "name": "Wyatt Langford",
  "fullName": "Wyatt Langford",
  "team": "Texas Rangers",
  "organization": "Texas Rangers",
  "position": "LF",
  "tier": "MLB",
  "level": "MLB",
  "age": 25,
  "birthdate": "2001-11-15",
  "school": "Florida (FL)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 225,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 4,
  "draftOverall": 4,
  "draftBonus": "8.00m",
  "pickValue": "7.70m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.237,
    "H": 19,
    "R": 9,
    "HR": 1,
    "RBI": 4,
    "BB": 4,
    "K": 19,
    "OPS": 0.636
  },
  "pitching": null,
  "tracker": {
    "G": 20,
    "AB": 80,
    "PA": 84,
    "R": 9,
    "H": 19,
    "2B": 3,
    "3B": 2,
    "HR": 1,
    "RBI": 4,
    "BB": 4,
    "K": 19,
    "SB": 3,
    "CS": 0,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.237,
    "OBP": 0.274,
    "SLG": 0.362,
    "OPS": 0.636,
    "lastGame": {
      "g": 20,
      "sport": 1,
      "level": "MLB",
      "date": "2026-04-21",
      "opp": "vs Pittsburgh Pirates",
      "team": "Texas Rangers",
      "week": "2026-W17",
      "ab": 1,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 1,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.237,
    "OPS": 0.636,
    "H": 19,
    "HR": 1,
    "RBI": 4,
    "BB": 4,
    "K": 19,
    "AB": 80,
    "G": 20,
    "SB": 3
  }
}
wyatt_langford.knowledge = wyatt_langford_knowledge
wyatt_langford.performance = wyatt_langford_performance
wyatt_langford.media = wyatt_langford_media
wyatt_langford.cardMarket = wyatt_langford_market
wyatt_langford.marketArchetype = wyatt_langford_market.marketArchetype
wyatt_langford.dlr = { performance: wyatt_langford_performance, media: wyatt_langford_media, cardMarket: wyatt_langford_market }
