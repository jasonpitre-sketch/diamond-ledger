import { caleb_lomavita_knowledge } from "./caleb_lomavita_knowledge"
import { caleb_lomavita_performance } from "./caleb_lomavita_performance"
import { caleb_lomavita_media } from "./caleb_lomavita_media"
import { caleb_lomavita_market } from "./caleb_lomavita_market"

export const caleb_lomavita: any = {
  "id": "caleb_lomavita",
  "name": "Caleb Lomavita",
  "fullName": "Caleb Lomavita",
  "team": "Harrisburg Senators",
  "organization": "Washington Nationals",
  "position": "C",
  "tier": "AA",
  "level": "AA",
  "age": 24,
  "birthdate": "2002-11-18",
  "school": "California (CA)",
  "country": "USA",
  "height": "5' 10\"",
  "weight": 200,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 39,
  "draftOverall": 39,
  "draftBonus": "2.33m",
  "pickValue": "2.40m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.209,
    "H": 18,
    "R": 11,
    "HR": 3,
    "RBI": 11,
    "BB": 13,
    "K": 20,
    "OPS": 0.719
  },
  "pitching": null,
  "tracker": {
    "G": 24,
    "AB": 86,
    "PA": 102,
    "R": 11,
    "H": 18,
    "2B": 5,
    "3B": 1,
    "HR": 3,
    "RBI": 11,
    "BB": 13,
    "K": 20,
    "SB": 0,
    "CS": 0,
    "HBP": 2,
    "SF": 1,
    "AVG": 0.209,
    "OBP": 0.324,
    "SLG": 0.395,
    "OPS": 0.719,
    "lastGame": {
      "g": 24,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "@ Altoona Curve",
      "team": "Harrisburg Senators",
      "week": "2026-W20",
      "ab": 2,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.209,
    "OPS": 0.719,
    "H": 18,
    "HR": 3,
    "RBI": 11,
    "BB": 13,
    "K": 20,
    "AB": 86,
    "G": 24,
    "SB": 0
  }
}
caleb_lomavita.knowledge = caleb_lomavita_knowledge
caleb_lomavita.performance = caleb_lomavita_performance
caleb_lomavita.media = caleb_lomavita_media
caleb_lomavita.cardMarket = caleb_lomavita_market
caleb_lomavita.marketArchetype = caleb_lomavita_market.marketArchetype
caleb_lomavita.dlr = { performance: caleb_lomavita_performance, media: caleb_lomavita_media, cardMarket: caleb_lomavita_market }
