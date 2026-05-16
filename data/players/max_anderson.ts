import { max_anderson_knowledge } from "./max_anderson_knowledge"
import { max_anderson_performance } from "./max_anderson_performance"
import { max_anderson_media } from "./max_anderson_media"
import { max_anderson_market } from "./max_anderson_market"

export const max_anderson: any = {
  "id": "max_anderson",
  "name": "Max Anderson",
  "fullName": "Max Anderson",
  "team": "Toledo Mud Hens",
  "organization": "Detroit Tigers",
  "position": "2B",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-02-28",
  "school": "Nebraska (NE)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 215,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 45,
  "draftOverall": 45,
  "draftBonus": "1.43m",
  "pickValue": "1.91m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.383,
    "H": 18,
    "R": 10,
    "HR": 4,
    "RBI": 12,
    "BB": 3,
    "K": 10,
    "OPS": 1.093
  },
  "pitching": null,
  "tracker": {
    "G": 13,
    "AB": 47,
    "PA": 51,
    "R": 10,
    "H": 18,
    "2B": 2,
    "3B": 0,
    "HR": 4,
    "RBI": 12,
    "BB": 3,
    "K": 10,
    "SB": 1,
    "CS": 0,
    "HBP": 0,
    "SF": 1,
    "TB": 32,
    "AVG": 0.383,
    "OBP": 0.412,
    "SLG": 0.681,
    "OPS": 1.093,
    "lastGame": {
      "g": 13,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-13",
      "opp": "@ Omaha Storm Chasers",
      "team": "Toledo Mud Hens",
      "week": "2026-W20",
      "ab": 5,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 1,
      "rbi": 1,
      "bb": 0,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 4
    }
  },
  "careerAverages": {
    "AVG": 0.383,
    "H": 18,
    "R": 10,
    "HR": 4,
    "RBI": 12,
    "BB": 3,
    "K": 10,
    "OPS": 1.093,
    "AB": 47,
    "G": 13,
    "SB": 1
  }
}
max_anderson.knowledge = max_anderson_knowledge
max_anderson.performance = max_anderson_performance
max_anderson.media = max_anderson_media
max_anderson.cardMarket = max_anderson_market
max_anderson.marketArchetype = max_anderson_market.marketArchetype
max_anderson.dlr = { performance: max_anderson_performance, media: max_anderson_media, cardMarket: max_anderson_market }
