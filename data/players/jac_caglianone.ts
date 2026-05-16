import { jac_caglianone_knowledge } from "./jac_caglianone_knowledge"
import { jac_caglianone_performance } from "./jac_caglianone_performance"
import { jac_caglianone_media } from "./jac_caglianone_media"
import { jac_caglianone_market } from "./jac_caglianone_market"

export const jac_caglianone: any = {
  "id": "jac_caglianone",
  "name": "Jac Caglianone",
  "fullName": "Jac Caglianone",
  "team": "Kansas City Royals",
  "organization": "Kansas City Royals",
  "position": "RF",
  "tier": "MLB",
  "level": "MLB",
  "age": 23,
  "birthdate": "2003-02-09",
  "school": "Florida (FL)",
  "country": "USA",
  "height": "6' 4\"",
  "weight": 250,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 6,
  "draftOverall": 6,
  "draftBonus": "7.50m",
  "pickValue": "7.21m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.234,
    "H": 30,
    "R": 17,
    "HR": 4,
    "RBI": 8,
    "BB": 11,
    "K": 42,
    "OPS": 0.703
  },
  "pitching": null,
  "tracker": {
    "G": 40,
    "AB": 128,
    "PA": 141,
    "R": 17,
    "H": 30,
    "2B": 7,
    "3B": 1,
    "HR": 4,
    "RBI": 8,
    "BB": 11,
    "K": 42,
    "SB": 0,
    "CS": 1,
    "HBP": 2,
    "SF": 0,
    "AVG": 0.234,
    "OBP": 0.305,
    "SLG": 0.398,
    "OPS": 0.703,
    "lastGame": {
      "g": 40,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "@ Chicago White Sox",
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
      "tb": 0,
      "team": "Kansas City Royals",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "AVG": 0.234,
    "OPS": 0.703,
    "H": 30,
    "HR": 4,
    "RBI": 8,
    "BB": 11,
    "K": 42,
    "AB": 128,
    "G": 40,
    "SB": 0
  }
}

jac_caglianone.knowledge = jac_caglianone_knowledge
jac_caglianone.performance = jac_caglianone_performance
jac_caglianone.media = jac_caglianone_media
jac_caglianone.cardMarket = jac_caglianone_market
jac_caglianone.marketArchetype = jac_caglianone_market.marketArchetype
jac_caglianone.dlr = { performance: jac_caglianone_performance, media: jac_caglianone_media, cardMarket: jac_caglianone_market }
