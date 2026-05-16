import { ralphy_velazquez_knowledge } from "./ralphy_velazquez_knowledge"
import { ralphy_velazquez_performance } from "./ralphy_velazquez_performance"
import { ralphy_velazquez_media } from "./ralphy_velazquez_media"
import { ralphy_velazquez_market } from "./ralphy_velazquez_market"

export const ralphy_velazquez: any = {
  "id": "ralphy_velazquez",
  "name": "Ralphy Velazquez",
  "fullName": "Ralphy Velazquez",
  "team": "Akron RubberDucks",
  "organization": "Cleveland Guardians",
  "position": "1B",
  "tier": "AA",
  "level": "AA",
  "age": 21,
  "birthdate": "2005-05-28",
  "school": "Huntington Beach HS (CA)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 240,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 23,
  "draftOverall": 23,
  "draftBonus": "2.50m",
  "pickValue": "3.38m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.311,
    "H": 41,
    "R": 20,
    "HR": 5,
    "RBI": 24,
    "BB": 21,
    "K": 28,
    "OPS": 0.921
  },
  "pitching": null,
  "tracker": {
    "G": 33,
    "AB": 132,
    "PA": 155,
    "R": 20,
    "H": 41,
    "2B": 7,
    "3B": 2,
    "HR": 5,
    "RBI": 24,
    "BB": 21,
    "K": 28,
    "SB": 1,
    "CS": 0,
    "HBP": 2,
    "SF": 0,
    "AVG": 0.311,
    "OBP": 0.413,
    "SLG": 0.508,
    "OPS": 0.921,
    "lastGame": {
      "g": 33,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "vs Chesapeake Baysox",
      "team": "Akron RubberDucks",
      "week": "2026-W20",
      "ab": 3,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.311,
    "OPS": 0.921,
    "H": 41,
    "HR": 5,
    "RBI": 24,
    "BB": 21,
    "K": 28,
    "AB": 132,
    "G": 33,
    "SB": 1
  }
}
ralphy_velazquez.knowledge = ralphy_velazquez_knowledge
ralphy_velazquez.performance = ralphy_velazquez_performance
ralphy_velazquez.media = ralphy_velazquez_media
ralphy_velazquez.cardMarket = ralphy_velazquez_market
ralphy_velazquez.marketArchetype = ralphy_velazquez_market.marketArchetype
ralphy_velazquez.dlr = { performance: ralphy_velazquez_performance, media: ralphy_velazquez_media, cardMarket: ralphy_velazquez_market }
