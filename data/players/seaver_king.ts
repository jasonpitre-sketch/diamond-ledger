import { seaver_king_knowledge } from "./seaver_king_knowledge"
import { seaver_king_performance } from "./seaver_king_performance"
import { seaver_king_media } from "./seaver_king_media"
import { seaver_king_market } from "./seaver_king_market"

export const seaver_king: any = {
  "id": "seaver_king",
  "name": "Seaver King",
  "fullName": "Seaver King",
  "team": "Harrisburg Senators",
  "organization": "Washington Nationals",
  "position": "SS",
  "tier": "AA",
  "level": "AA",
  "age": 23,
  "birthdate": "2003-04-25",
  "school": "Wake Forest (NC)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 195,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 10,
  "draftOverall": 10,
  "draftBonus": "5.15m",
  "pickValue": "5.95m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.333,
    "H": 42,
    "R": 29,
    "HR": 5,
    "RBI": 26,
    "BB": 19,
    "K": 28,
    "OPS": 0.995
  },
  "pitching": null,
  "tracker": {
    "G": 32,
    "AB": 126,
    "PA": 149,
    "R": 29,
    "H": 42,
    "2B": 10,
    "3B": 3,
    "HR": 5,
    "RBI": 26,
    "BB": 19,
    "K": 28,
    "SB": 4,
    "CS": 6,
    "HBP": 1,
    "SF": 3,
    "AVG": 0.333,
    "OBP": 0.416,
    "SLG": 0.579,
    "OPS": 0.995,
    "lastGame": {
      "g": 32,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "@ Altoona Curve",
      "ab": 4,
      "r": 0,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1,
      "team": "Harrisburg Senators",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "AVG": 0.333,
    "OPS": 0.995,
    "H": 42,
    "HR": 5,
    "RBI": 26,
    "BB": 19,
    "K": 28,
    "AB": 126,
    "G": 32,
    "SB": 4
  }
}

seaver_king.knowledge = seaver_king_knowledge
seaver_king.performance = seaver_king_performance
seaver_king.media = seaver_king_media
seaver_king.cardMarket = seaver_king_market
seaver_king.marketArchetype = seaver_king_market.marketArchetype
seaver_king.dlr = { performance: seaver_king_performance, media: seaver_king_media, cardMarket: seaver_king_market }
