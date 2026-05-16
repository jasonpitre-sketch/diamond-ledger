import { nolan_schanuel_knowledge } from "./nolan_schanuel_knowledge"
import { nolan_schanuel_performance } from "./nolan_schanuel_performance"
import { nolan_schanuel_media } from "./nolan_schanuel_media"
import { nolan_schanuel_market } from "./nolan_schanuel_market"

export const nolan_schanuel: any = {
  "id": "nolan_schanuel",
  "name": "Nolan Schanuel",
  "fullName": "Nolan Schanuel",
  "team": "Los Angeles Angels",
  "organization": "Los Angeles Angels",
  "position": "1B",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-02-14",
  "school": "Florida Atlantic (FL)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 220,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 11,
  "draftOverall": 11,
  "draftBonus": "5.25m",
  "pickValue": "5.25m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.261,
    "H": 41,
    "R": 14,
    "HR": 3,
    "RBI": 20,
    "BB": 11,
    "K": 28,
    "OPS": 0.692
  },
  "pitching": null,
  "tracker": {
    "G": 40,
    "AB": 157,
    "PA": 171,
    "R": 14,
    "H": 41,
    "2B": 10,
    "3B": 0,
    "HR": 3,
    "RBI": 20,
    "BB": 11,
    "K": 28,
    "SB": 0,
    "CS": 1,
    "HBP": 1,
    "SF": 2,
    "AVG": 0.261,
    "OBP": 0.31,
    "SLG": 0.382,
    "OPS": 0.692,
    "lastGame": {
      "g": 40,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-12",
      "opp": "@ Cleveland Guardians",
      "team": "Los Angeles Angels",
      "week": "2026-W20",
      "ab": 5,
      "r": 0,
      "h": 2,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 2
    }
  },
  "careerAverages": {
    "AVG": 0.261,
    "OPS": 0.692,
    "H": 41,
    "HR": 3,
    "RBI": 20,
    "BB": 11,
    "K": 28,
    "AB": 157,
    "G": 40,
    "SB": 0
  }
}
nolan_schanuel.knowledge = nolan_schanuel_knowledge
nolan_schanuel.performance = nolan_schanuel_performance
nolan_schanuel.media = nolan_schanuel_media
nolan_schanuel.cardMarket = nolan_schanuel_market
nolan_schanuel.marketArchetype = nolan_schanuel_market.marketArchetype
nolan_schanuel.dlr = { performance: nolan_schanuel_performance, media: nolan_schanuel_media, cardMarket: nolan_schanuel_market }
