import { colt_emerson_knowledge } from "./colt_emerson_knowledge"
import { colt_emerson_performance } from "./colt_emerson_performance"
import { colt_emerson_media } from "./colt_emerson_media"
import { colt_emerson_market } from "./colt_emerson_market"

export const colt_emerson: any = {
  "id": "colt_emerson",
  "name": "Colt Emerson",
  "fullName": "Colt Emerson",
  "team": "Tacoma Rainiers",
  "organization": "Seattle Mariners",
  "position": "SS",
  "tier": "AAA",
  "level": "AAA",
  "age": 21,
  "birthdate": "2005-07-20",
  "school": "John Glenn HS (OH)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 195,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 22,
  "draftOverall": 22,
  "draftBonus": "3.80m",
  "pickValue": "3.50m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.254,
    "H": 35,
    "R": 24,
    "HR": 7,
    "RBI": 25,
    "BB": 15,
    "K": 43,
    "OPS": 0.813
  },
  "pitching": null,
  "tracker": {
    "G": 36,
    "AB": 138,
    "PA": 158,
    "R": 24,
    "H": 35,
    "2B": 7,
    "3B": 1,
    "HR": 7,
    "RBI": 25,
    "BB": 15,
    "K": 43,
    "SB": 9,
    "CS": 3,
    "HBP": 4,
    "SF": 1,
    "AVG": 0.254,
    "OBP": 0.342,
    "SLG": 0.471,
    "OPS": 0.813,
    "lastGame": {
      "g": 36,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Sugar Land Space Cowboys",
      "team": "Tacoma Rainiers",
      "week": "2026-W20",
      "ab": 2,
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
      "hbp": 1,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.254,
    "OPS": 0.813,
    "H": 35,
    "HR": 7,
    "RBI": 25,
    "BB": 15,
    "K": 43,
    "AB": 138,
    "G": 36,
    "SB": 9
  }
}
colt_emerson.knowledge = colt_emerson_knowledge
colt_emerson.performance = colt_emerson_performance
colt_emerson.media = colt_emerson_media
colt_emerson.cardMarket = colt_emerson_market
colt_emerson.marketArchetype = colt_emerson_market.marketArchetype
colt_emerson.dlr = { performance: colt_emerson_performance, media: colt_emerson_media, cardMarket: colt_emerson_market }
