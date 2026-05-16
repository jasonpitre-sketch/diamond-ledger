import { chase_davis_knowledge } from "./chase_davis_knowledge"
import { chase_davis_performance } from "./chase_davis_performance"
import { chase_davis_media } from "./chase_davis_media"
import { chase_davis_market } from "./chase_davis_market"

export const chase_davis: any = {
  "id": "chase_davis",
  "name": "Chase Davis",
  "fullName": "Chase Davis",
  "team": "Springfield Cardinals",
  "organization": "St. Louis Cardinals",
  "position": "OF",
  "tier": "AA",
  "level": "AA",
  "age": 25,
  "birthdate": "2001-12-05",
  "school": "Arizona (AZ)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 216,
  "bats": "L",
  "throws": "L",
  "draftYear": 2023,
  "draftPick": 21,
  "draftOverall": 21,
  "draftBonus": "3.62m",
  "pickValue": "3.62m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.222,
    "H": 24,
    "R": 20,
    "HR": 6,
    "RBI": 22,
    "BB": 25,
    "K": 37,
    "OPS": 0.794
  },
  "pitching": null,
  "tracker": {
    "G": 30,
    "AB": 108,
    "PA": 133,
    "R": 20,
    "H": 24,
    "2B": 4,
    "3B": 0,
    "HR": 6,
    "RBI": 22,
    "BB": 25,
    "K": 37,
    "SB": 6,
    "CS": 1,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.222,
    "OBP": 0.368,
    "SLG": 0.426,
    "OPS": 0.794,
    "lastGame": {
      "g": 30,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "@ Tulsa Drillers",
      "team": "Springfield Cardinals",
      "week": "2026-W20",
      "ab": 4,
      "r": 2,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 0,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.222,
    "OPS": 0.794,
    "H": 24,
    "HR": 6,
    "RBI": 22,
    "BB": 25,
    "K": 37,
    "AB": 108,
    "G": 30,
    "SB": 6
  }
}
chase_davis.knowledge = chase_davis_knowledge
chase_davis.performance = chase_davis_performance
chase_davis.media = chase_davis_media
chase_davis.cardMarket = chase_davis_market
chase_davis.marketArchetype = chase_davis_market.marketArchetype
chase_davis.dlr = { performance: chase_davis_performance, media: chase_davis_media, cardMarket: chase_davis_market }
