import { ty_floyd_knowledge } from "./ty_floyd_knowledge"
import { ty_floyd_performance } from "./ty_floyd_performance"
import { ty_floyd_media } from "./ty_floyd_media"
import { ty_floyd_market } from "./ty_floyd_market"

export const ty_floyd: any = {
  "id": "ty_floyd",
  "name": "Ty Floyd",
  "fullName": "Ty Floyd",
  "team": "Daytona Tortugas",
  "organization": "Cincinnati Reds",
  "position": "P",
  "tier": "Rookie",
  "level": "Rookie",
  "age": 25,
  "birthdate": "2001-08-28",
  "school": "LSU (LA)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 200,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 38,
  "draftOverall": 38,
  "draftBonus": "2.10m",
  "pickValue": "2.26m",
  "competitionLevel": "Rookie",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 0,
    "H": 1,
    "W": null,
    "K": 4,
    "WHIP": 0.333,
    "IP": "3.0"
  },
  "tracker": {
    "G": 1,
    "IP": "3.0",
    "H": 1,
    "ER": 0,
    "BB": 0,
    "K": 4,
    "HR": 0,
    "ERA": 0,
    "WHIP": 0.333,
    "lastGame": {
      "g": 1,
      "sport": 16,
      "level": "Rookie",
      "date": "2026-05-12",
      "opp": "@ ACL White Sox",
      "team": "ACL Reds",
      "week": "2026-W20",
      "ip": "3.0",
      "outs": 9,
      "h": 1,
      "r": 0,
      "er": 0,
      "bb": 0,
      "k": 4,
      "hr": 0,
      "bf": 10
    }
  },
  "careerAverages": {
    "ERA": 0,
    "WHIP": 0.333,
    "K": 4,
    "IP": "3.0"
  }
}
ty_floyd.knowledge = ty_floyd_knowledge
ty_floyd.performance = ty_floyd_performance
ty_floyd.media = ty_floyd_media
ty_floyd.cardMarket = ty_floyd_market
ty_floyd.marketArchetype = ty_floyd_market.marketArchetype
ty_floyd.dlr = { performance: ty_floyd_performance, media: ty_floyd_media, cardMarket: ty_floyd_market }
