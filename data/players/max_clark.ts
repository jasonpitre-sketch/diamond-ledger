import { max_clark_knowledge } from "./max_clark_knowledge"
import { max_clark_performance } from "./max_clark_performance"
import { max_clark_media } from "./max_clark_media"
import { max_clark_market } from "./max_clark_market"

export const max_clark: any = {
  "id": "max_clark",
  "name": "Max Clark",
  "fullName": "Max Clark",
  "team": "Toledo Mud Hens",
  "organization": "Detroit Tigers",
  "position": "OF",
  "tier": "AAA",
  "level": "AAA",
  "age": 22,
  "birthdate": "2004-12-21",
  "school": "Franklin Community HS (IN)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 205,
  "bats": "L",
  "throws": "L",
  "draftYear": 2023,
  "draftPick": 3,
  "draftOverall": 3,
  "draftBonus": "7.70m",
  "pickValue": "8.34m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.261,
    "H": 40,
    "R": 25,
    "HR": 1,
    "RBI": 15,
    "BB": 17,
    "K": 27,
    "OPS": 0.69
  },
  "pitching": null,
  "tracker": {
    "G": 37,
    "AB": 153,
    "PA": 172,
    "R": 25,
    "H": 40,
    "2B": 10,
    "3B": 1,
    "HR": 1,
    "RBI": 15,
    "BB": 17,
    "K": 27,
    "SB": 10,
    "CS": 1,
    "HBP": 0,
    "SF": 2,
    "AVG": 0.261,
    "OBP": 0.331,
    "SLG": 0.359,
    "OPS": 0.69,
    "lastGame": {
      "g": 37,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "@ Omaha Storm Chasers",
      "team": "Toledo Mud Hens",
      "week": "2026-W20",
      "ab": 6,
      "r": 0,
      "h": 1,
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
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.261,
    "OPS": 0.69,
    "H": 40,
    "HR": 1,
    "RBI": 15,
    "BB": 17,
    "K": 27,
    "AB": 153,
    "G": 37,
    "SB": 10
  }
}
max_clark.knowledge = max_clark_knowledge
max_clark.performance = max_clark_performance
max_clark.media = max_clark_media
max_clark.cardMarket = max_clark_market
max_clark.marketArchetype = max_clark_market.marketArchetype
max_clark.dlr = { performance: max_clark_performance, media: max_clark_media, cardMarket: max_clark_market }
