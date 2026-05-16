import { ryan_lasko_knowledge } from "./ryan_lasko_knowledge"
import { ryan_lasko_performance } from "./ryan_lasko_performance"
import { ryan_lasko_media } from "./ryan_lasko_media"
import { ryan_lasko_market } from "./ryan_lasko_market"

export const ryan_lasko: any = {
  "id": "ryan_lasko",
  "name": "Ryan Lasko",
  "fullName": "Ryan Lasko",
  "team": "Midland RockHounds",
  "organization": "Oakland Athletics",
  "position": "OF",
  "tier": "AA",
  "level": "AA",
  "age": 23,
  "birthdate": "2002-06-24",
  "school": "Rutgers (NJ)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 41,
  "draftOverall": 41,
  "draftBonus": "1.70m",
  "pickValue": "2.09m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.195,
    "H": 23,
    "R": 17,
    "HR": 3,
    "RBI": 17,
    "BB": 6,
    "K": 41,
    "OPS": 0.603
  },
  "pitching": null,
  "tracker": {
    "G": 34,
    "AB": 118,
    "PA": 129,
    "R": 17,
    "H": 23,
    "2B": 5,
    "3B": 2,
    "HR": 3,
    "RBI": 17,
    "BB": 6,
    "K": 41,
    "SB": 2,
    "CS": 2,
    "HBP": 4,
    "SF": 1,
    "TB": 41,
    "AVG": 0.195,
    "OBP": 0.256,
    "SLG": 0.347,
    "OPS": 0.603,
    "lastGame": {
      "g": 34,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "vs Frisco RoughRiders",
      "team": "Midland RockHounds",
      "week": "2026-W20",
      "ab": 3,
      "r": 0,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 1,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.195,
    "H": 23,
    "R": 17,
    "HR": 3,
    "RBI": 17,
    "BB": 6,
    "K": 41,
    "OPS": 0.603,
    "AB": 118,
    "G": 34,
    "SB": 2
  }
}
ryan_lasko.knowledge = ryan_lasko_knowledge
ryan_lasko.performance = ryan_lasko_performance
ryan_lasko.media = ryan_lasko_media
ryan_lasko.cardMarket = ryan_lasko_market
ryan_lasko.marketArchetype = ryan_lasko_market.marketArchetype
ryan_lasko.dlr = { performance: ryan_lasko_performance, media: ryan_lasko_media, cardMarket: ryan_lasko_market }
