import { slade_caldwell_knowledge } from "./slade_caldwell_knowledge"
import { slade_caldwell_performance } from "./slade_caldwell_performance"
import { slade_caldwell_media } from "./slade_caldwell_media"
import { slade_caldwell_market } from "./slade_caldwell_market"

export const slade_caldwell: any = {
  "id": "slade_caldwell",
  "name": "Slade Caldwell",
  "fullName": "Slade Caldwell",
  "team": "Hillsboro Hops",
  "organization": "Arizona Diamondbacks",
  "position": "OF",
  "tier": "A+",
  "level": "A+",
  "age": 20,
  "birthdate": "2006-06-18",
  "school": "Valley View HS (AR)",
  "country": "USA",
  "height": "5' 9\"",
  "weight": 182,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 29,
  "draftOverall": 29,
  "draftBonus": "3.09m",
  "pickValue": "3.05m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.179,
    "H": 19,
    "R": 17,
    "HR": 0,
    "RBI": 10,
    "BB": 32,
    "K": 43,
    "OPS": 0.614
  },
  "pitching": null,
  "tracker": {
    "G": 33,
    "AB": 106,
    "PA": 146,
    "R": 17,
    "H": 19,
    "2B": 4,
    "3B": 0,
    "HR": 0,
    "RBI": 10,
    "BB": 32,
    "K": 43,
    "SB": 9,
    "CS": 1,
    "HBP": 7,
    "SF": 1,
    "AVG": 0.179,
    "OBP": 0.397,
    "SLG": 0.217,
    "OPS": 0.614,
    "lastGame": {
      "g": 33,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "vs Spokane Indians",
      "team": "Hillsboro Hops",
      "week": "2026-W20",
      "ab": 5,
      "r": 0,
      "h": 2,
      "d": 1,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 3
    }
  },
  "careerAverages": {
    "AVG": 0.179,
    "OPS": 0.614,
    "H": 19,
    "HR": 0,
    "RBI": 10,
    "BB": 32,
    "K": 43,
    "AB": 106,
    "G": 33,
    "SB": 9
  }
}
slade_caldwell.knowledge = slade_caldwell_knowledge
slade_caldwell.performance = slade_caldwell_performance
slade_caldwell.media = slade_caldwell_media
slade_caldwell.cardMarket = slade_caldwell_market
slade_caldwell.marketArchetype = slade_caldwell_market.marketArchetype
slade_caldwell.dlr = { performance: slade_caldwell_performance, media: slade_caldwell_media, cardMarket: slade_caldwell_market }
