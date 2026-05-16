import { owen_hall_knowledge } from "./owen_hall_knowledge"
import { owen_hall_performance } from "./owen_hall_performance"
import { owen_hall_media } from "./owen_hall_media"
import { owen_hall_market } from "./owen_hall_market"

export const owen_hall: any = {
  "id": "owen_hall",
  "name": "Owen Hall",
  "fullName": "Owen Hall",
  "team": "FCL Tigers",
  "organization": "Baltimore Orioles",
  "position": "P",
  "tier": "Rookie",
  "level": "Rookie",
  "age": 21,
  "birthdate": "2005-11-14",
  "school": "Edmond North HS (OK)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 185,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 49,
  "draftOverall": 49,
  "draftBonus": "1.75m",
  "pickValue": "1.89m",
  "competitionLevel": "Rookie",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 5.4,
    "H": 3,
    "W": null,
    "K": 9,
    "WHIP": 1.6,
    "IP": "5.0"
  },
  "tracker": {
    "G": 2,
    "IP": "5.0",
    "H": 3,
    "ER": 3,
    "BB": 5,
    "K": 9,
    "HR": 1,
    "ERA": 5.4,
    "WHIP": 1.6,
    "lastGame": {
      "g": 2,
      "sport": 16,
      "level": "Rookie",
      "date": "2026-05-09",
      "opp": "@ FCL Phillies",
      "team": "FCL Tigers",
      "week": "2026-W19",
      "ip": "2.1",
      "outs": 7,
      "h": 2,
      "r": 2,
      "er": 2,
      "bb": 3,
      "k": 5,
      "hr": 0,
      "bf": 12
    }
  },
  "careerAverages": {
    "ERA": 5.4,
    "WHIP": 1.6,
    "K": 9,
    "IP": "5.0"
  }
}
owen_hall.knowledge = owen_hall_knowledge
owen_hall.performance = owen_hall_performance
owen_hall.media = owen_hall_media
owen_hall.cardMarket = owen_hall_market
owen_hall.marketArchetype = owen_hall_market.marketArchetype
owen_hall.dlr = { performance: owen_hall_performance, media: owen_hall_media, cardMarket: owen_hall_market }
