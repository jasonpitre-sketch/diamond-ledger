import { malcolm_moore_knowledge } from "./malcolm_moore_knowledge"
import { malcolm_moore_performance } from "./malcolm_moore_performance"
import { malcolm_moore_media } from "./malcolm_moore_media"
import { malcolm_moore_market } from "./malcolm_moore_market"

export const malcolm_moore: any = {
  "id": "malcolm_moore",
  "name": "Malcolm Moore",
  "fullName": "Malcolm Moore",
  "team": "Hub City Spartanburgers",
  "organization": "Texas Rangers",
  "position": "C",
  "tier": "A+",
  "level": "A+",
  "age": 23,
  "birthdate": "2003-07-31",
  "school": "Stanford (CA)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 216,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 30,
  "draftOverall": 30,
  "draftBonus": "3.00m",
  "pickValue": "2.97m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.274,
    "H": 26,
    "R": 16,
    "HR": 3,
    "RBI": 16,
    "BB": 11,
    "K": 23,
    "OPS": 0.836
  },
  "pitching": null,
  "tracker": {
    "G": 25,
    "AB": 95,
    "PA": 110,
    "R": 16,
    "H": 26,
    "2B": 9,
    "3B": 0,
    "HR": 3,
    "RBI": 16,
    "BB": 11,
    "K": 23,
    "SB": 0,
    "CS": 0,
    "HBP": 4,
    "SF": 0,
    "AVG": 0.274,
    "OBP": 0.373,
    "SLG": 0.463,
    "OPS": 0.836,
    "lastGame": {
      "g": 25,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Asheville Tourists",
      "team": "Hub City Spartanburgers",
      "week": "2026-W20",
      "ab": 5,
      "r": 1,
      "h": 2,
      "d": 2,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 1,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 4
    }
  },
  "careerAverages": {
    "AVG": 0.274,
    "OPS": 0.836,
    "H": 26,
    "HR": 3,
    "RBI": 16,
    "BB": 11,
    "K": 23,
    "AB": 95,
    "G": 25,
    "SB": 0
  }
}
malcolm_moore.knowledge = malcolm_moore_knowledge
malcolm_moore.performance = malcolm_moore_performance
malcolm_moore.media = malcolm_moore_media
malcolm_moore.cardMarket = malcolm_moore_market
malcolm_moore.marketArchetype = malcolm_moore_market.marketArchetype
malcolm_moore.dlr = { performance: malcolm_moore_performance, media: malcolm_moore_media, cardMarket: malcolm_moore_market }
