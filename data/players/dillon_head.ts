import { dillon_head_knowledge } from "./dillon_head_knowledge"
import { dillon_head_performance } from "./dillon_head_performance"
import { dillon_head_media } from "./dillon_head_media"
import { dillon_head_market } from "./dillon_head_market"

export const dillon_head: any = {
  "id": "dillon_head",
  "name": "Dillon Head",
  "fullName": "Dillon Head",
  "team": "Beloit Sky Carp",
  "organization": "San Diego Padres",
  "position": "CF",
  "tier": "A+",
  "level": "A+",
  "age": 22,
  "birthdate": "2004-10-11",
  "school": "Homewood Flossmoor HS (IL)",
  "country": "USA",
  "height": "5' 10\"",
  "weight": 185,
  "bats": "L",
  "throws": "L",
  "draftYear": 2023,
  "draftPick": 25,
  "draftOverall": 25,
  "draftBonus": "2.80m",
  "pickValue": "3.17m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.073,
    "H": 3,
    "R": 3,
    "HR": 0,
    "RBI": 3,
    "BB": 5,
    "K": 11,
    "OPS": 0.272
  },
  "pitching": null,
  "tracker": {
    "G": 12,
    "AB": 41,
    "PA": 46,
    "R": 3,
    "H": 3,
    "2B": 1,
    "3B": 0,
    "HR": 0,
    "RBI": 3,
    "BB": 5,
    "K": 11,
    "SB": 1,
    "CS": 0,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.073,
    "OBP": 0.174,
    "SLG": 0.098,
    "OPS": 0.272,
    "lastGame": {
      "g": 12,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "vs Peoria Chiefs",
      "team": "Beloit Sky Carp",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 0,
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
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.073,
    "OPS": 0.272,
    "H": 3,
    "HR": 0,
    "RBI": 3,
    "BB": 5,
    "K": 11,
    "AB": 41,
    "G": 12,
    "SB": 1
  }
}
dillon_head.knowledge = dillon_head_knowledge
dillon_head.performance = dillon_head_performance
dillon_head.media = dillon_head_media
dillon_head.cardMarket = dillon_head_market
dillon_head.marketArchetype = dillon_head_market.marketArchetype
dillon_head.dlr = { performance: dillon_head_performance, media: dillon_head_media, cardMarket: dillon_head_market }
