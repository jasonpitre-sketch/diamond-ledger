import { brice_matthews_knowledge } from "./brice_matthews_knowledge"
import { brice_matthews_performance } from "./brice_matthews_performance"
import { brice_matthews_media } from "./brice_matthews_media"
import { brice_matthews_market } from "./brice_matthews_market"

export const brice_matthews: any = {
  "id": "brice_matthews",
  "name": "Brice Matthews",
  "fullName": "Brice Matthews",
  "team": "Houston Astros",
  "organization": "Houston Astros",
  "position": "CF",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-03-16",
  "school": "Nebraska (NE)",
  "country": "USA",
  "height": "5' 10\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 28,
  "draftOverall": 28,
  "draftBonus": "2.48m",
  "pickValue": "2.88m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.196,
    "H": 20,
    "R": 12,
    "HR": 4,
    "RBI": 13,
    "BB": 8,
    "K": 37,
    "OPS": 0.625
  },
  "pitching": null,
  "tracker": {
    "G": 36,
    "AB": 102,
    "PA": 111,
    "R": 12,
    "H": 20,
    "2B": 4,
    "3B": 1,
    "HR": 4,
    "RBI": 13,
    "BB": 8,
    "K": 37,
    "SB": 2,
    "CS": 0,
    "HBP": 0,
    "SF": 1,
    "AVG": 0.196,
    "OBP": 0.252,
    "SLG": 0.373,
    "OPS": 0.625,
    "lastGame": {
      "g": 36,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "vs Seattle Mariners",
      "team": "Houston Astros",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.196,
    "OPS": 0.625,
    "H": 20,
    "HR": 4,
    "RBI": 13,
    "BB": 8,
    "K": 37,
    "AB": 102,
    "G": 36,
    "SB": 2
  }
}
brice_matthews.knowledge = brice_matthews_knowledge
brice_matthews.performance = brice_matthews_performance
brice_matthews.media = brice_matthews_media
brice_matthews.cardMarket = brice_matthews_market
brice_matthews.marketArchetype = brice_matthews_market.marketArchetype
brice_matthews.dlr = { performance: brice_matthews_performance, media: brice_matthews_media, cardMarket: brice_matthews_market }
