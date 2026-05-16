import { jj_wetherholt_knowledge } from "./jj_wetherholt_knowledge"
import { jj_wetherholt_performance } from "./jj_wetherholt_performance"
import { jj_wetherholt_media } from "./jj_wetherholt_media"
import { jj_wetherholt_market } from "./jj_wetherholt_market"

export const jj_wetherholt: any = {
  "id": "jj_wetherholt",
  "name": "JJ Wetherholt",
  "fullName": "JJ Wetherholt",
  "team": "St. Louis Cardinals",
  "organization": "St. Louis Cardinals",
  "position": "2B",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-09-10",
  "school": "West Virginia (WV)",
  "country": "USA",
  "height": "5' 9\"",
  "weight": 190,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 7,
  "draftOverall": 7,
  "draftBonus": "6.90m",
  "pickValue": "6.82m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.244,
    "H": 40,
    "R": 33,
    "HR": 8,
    "RBI": 22,
    "BB": 22,
    "K": 35,
    "OPS": 0.785
  },
  "pitching": null,
  "tracker": {
    "G": 43,
    "AB": 164,
    "PA": 198,
    "R": 33,
    "H": 40,
    "2B": 5,
    "3B": 0,
    "HR": 8,
    "RBI": 22,
    "BB": 22,
    "K": 35,
    "SB": 5,
    "CS": 0,
    "HBP": 10,
    "SF": 2,
    "AVG": 0.244,
    "OBP": 0.364,
    "SLG": 0.421,
    "OPS": 0.785,
    "lastGame": {
      "g": 43,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "@ Athletics",
      "ab": 3,
      "r": 1,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 1,
      "sf": 0,
      "tb": 0,
      "team": "St. Louis Cardinals",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "AVG": 0.244,
    "OPS": 0.785,
    "H": 40,
    "HR": 8,
    "RBI": 22,
    "BB": 22,
    "K": 35,
    "AB": 164,
    "G": 43,
    "SB": 5
  }
}

jj_wetherholt.knowledge = jj_wetherholt_knowledge
jj_wetherholt.performance = jj_wetherholt_performance
jj_wetherholt.media = jj_wetherholt_media
jj_wetherholt.cardMarket = jj_wetherholt_market
jj_wetherholt.marketArchetype = jj_wetherholt_market.marketArchetype
jj_wetherholt.dlr = { performance: jj_wetherholt_performance, media: jj_wetherholt_media, cardMarket: jj_wetherholt_market }
