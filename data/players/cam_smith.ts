import { cam_smith_knowledge } from "./cam_smith_knowledge"
import { cam_smith_performance } from "./cam_smith_performance"
import { cam_smith_media } from "./cam_smith_media"
import { cam_smith_market } from "./cam_smith_market"

export const cam_smith: any = {
  "id": "cam_smith",
  "name": "Cam Smith",
  "fullName": "Cam Smith",
  "team": "Houston Astros",
  "organization": "Houston Astros",
  "position": "RF",
  "tier": "MLB",
  "level": "MLB",
  "age": 23,
  "birthdate": "2003-02-22",
  "school": "Florida State (FL)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 224,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 14,
  "draftOverall": 14,
  "draftBonus": "5.07m",
  "pickValue": "5.07m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.203,
    "H": 30,
    "R": 18,
    "HR": 4,
    "RBI": 17,
    "BB": 18,
    "K": 48,
    "OPS": 0.618
  },
  "pitching": null,
  "tracker": {
    "G": 44,
    "AB": 148,
    "PA": 170,
    "R": 18,
    "H": 30,
    "2B": 6,
    "3B": 0,
    "HR": 4,
    "RBI": 17,
    "BB": 18,
    "K": 48,
    "SB": 6,
    "CS": 1,
    "HBP": 2,
    "SF": 2,
    "AVG": 0.203,
    "OBP": 0.294,
    "SLG": 0.324,
    "OPS": 0.618,
    "lastGame": {
      "g": 44,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "vs Seattle Mariners",
      "team": "Houston Astros",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.203,
    "OPS": 0.618,
    "H": 30,
    "HR": 4,
    "RBI": 17,
    "BB": 18,
    "K": 48,
    "AB": 148,
    "G": 44,
    "SB": 6
  }
}
cam_smith.knowledge = cam_smith_knowledge
cam_smith.performance = cam_smith_performance
cam_smith.media = cam_smith_media
cam_smith.cardMarket = cam_smith_market
cam_smith.marketArchetype = cam_smith_market.marketArchetype
cam_smith.dlr = { performance: cam_smith_performance, media: cam_smith_media, cardMarket: cam_smith_market }
