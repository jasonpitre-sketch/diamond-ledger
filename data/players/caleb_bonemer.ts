import { caleb_bonemer_knowledge } from "./caleb_bonemer_knowledge"
import { caleb_bonemer_performance } from "./caleb_bonemer_performance"
import { caleb_bonemer_media } from "./caleb_bonemer_media"
import { caleb_bonemer_market } from "./caleb_bonemer_market"

export const caleb_bonemer: any = {
  "id": "caleb_bonemer",
  "name": "Caleb Bonemer",
  "fullName": "Caleb Bonemer",
  "team": "Winston-Salem Dash",
  "organization": "Chicago White Sox",
  "position": "SS",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-10-05",
  "school": "Okemos HS (MI)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 195,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 43,
  "draftOverall": 43,
  "draftBonus": "3.00m",
  "pickValue": "2.17m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.268,
    "H": 34,
    "R": 32,
    "HR": 13,
    "RBI": 31,
    "BB": 25,
    "K": 53,
    "OPS": 1.068
  },
  "pitching": null,
  "tracker": {
    "G": 35,
    "AB": 127,
    "PA": 162,
    "R": 32,
    "H": 34,
    "2B": 10,
    "3B": 0,
    "HR": 13,
    "RBI": 31,
    "BB": 25,
    "K": 53,
    "SB": 3,
    "CS": 2,
    "HBP": 8,
    "SF": 2,
    "AVG": 0.268,
    "OBP": 0.414,
    "SLG": 0.654,
    "OPS": 1.068,
    "lastGame": {
      "g": 35,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "vs Wilmington Blue Rocks",
      "team": "Winston-Salem Dash",
      "week": "2026-W20",
      "ab": 3,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 2,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.268,
    "OPS": 1.068,
    "H": 34,
    "HR": 13,
    "RBI": 31,
    "BB": 25,
    "K": 53,
    "AB": 127,
    "G": 35,
    "SB": 3
  }
}
caleb_bonemer.knowledge = caleb_bonemer_knowledge
caleb_bonemer.performance = caleb_bonemer_performance
caleb_bonemer.media = caleb_bonemer_media
caleb_bonemer.cardMarket = caleb_bonemer_market
caleb_bonemer.marketArchetype = caleb_bonemer_market.marketArchetype
caleb_bonemer.dlr = { performance: caleb_bonemer_performance, media: caleb_bonemer_media, cardMarket: caleb_bonemer_market }
