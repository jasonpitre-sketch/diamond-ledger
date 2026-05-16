import { cam_caminiti_knowledge } from "./cam_caminiti_knowledge"
import { cam_caminiti_performance } from "./cam_caminiti_performance"
import { cam_caminiti_media } from "./cam_caminiti_media"
import { cam_caminiti_market } from "./cam_caminiti_market"

export const cam_caminiti: any = {
  "id": "cam_caminiti",
  "name": "Cam Caminiti",
  "fullName": "Cam Caminiti",
  "team": "Rome Emperors",
  "organization": "Atlanta Braves",
  "position": "P",
  "tier": "A+",
  "level": "A+",
  "age": 20,
  "birthdate": "2006-08-08",
  "school": "Saguaro HS (AZ)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 195,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 24,
  "draftOverall": 24,
  "draftBonus": "3.56m",
  "pickValue": "3.56m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 5.34,
    "H": 34,
    "W": null,
    "K": 35,
    "WHIP": 1.406,
    "IP": "32.0"
  },
  "tracker": {
    "G": 7,
    "IP": "32.0",
    "H": 34,
    "ER": 19,
    "BB": 11,
    "K": 35,
    "HR": 3,
    "ERA": 5.34,
    "WHIP": 1.406,
    "lastGame": {
      "g": 7,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-09",
      "opp": "@ Asheville Tourists",
      "team": "Rome Emperors",
      "week": "2026-W19",
      "ip": "3.0",
      "outs": 9,
      "h": 6,
      "r": 7,
      "er": 4,
      "bb": 2,
      "k": 3,
      "hr": 2,
      "bf": 18
    }
  },
  "careerAverages": {
    "ERA": 5.34,
    "WHIP": 1.406,
    "K": 35,
    "IP": "32.0"
  }
}
cam_caminiti.knowledge = cam_caminiti_knowledge
cam_caminiti.performance = cam_caminiti_performance
cam_caminiti.media = cam_caminiti_media
cam_caminiti.cardMarket = cam_caminiti_market
cam_caminiti.marketArchetype = cam_caminiti_market.marketArchetype
cam_caminiti.dlr = { performance: cam_caminiti_performance, media: cam_caminiti_media, cardMarket: cam_caminiti_market }
