import { braylon_doughty_knowledge } from "./braylon_doughty_knowledge"
import { braylon_doughty_performance } from "./braylon_doughty_performance"
import { braylon_doughty_media } from "./braylon_doughty_media"
import { braylon_doughty_market } from "./braylon_doughty_market"

export const braylon_doughty: any = {
  "id": "braylon_doughty",
  "name": "Braylon Doughty",
  "fullName": "Braylon Doughty",
  "team": "Lake County Captains",
  "organization": "Cleveland Guardians",
  "position": "P",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-12-07",
  "school": "Chaparral HS (CA)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 203,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 36,
  "draftOverall": 36,
  "draftBonus": "2.57m",
  "pickValue": "2.57m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 3.13,
    "H": 24,
    "W": null,
    "K": 24,
    "WHIP": 1.348,
    "IP": "23.0"
  },
  "tracker": {
    "G": 7,
    "IP": "23.0",
    "H": 24,
    "ER": 8,
    "BB": 7,
    "K": 24,
    "HR": 4,
    "ERA": 3.13,
    "WHIP": 1.348,
    "lastGame": {
      "g": 7,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Dayton Dragons",
      "team": "Lake County Captains",
      "week": "2026-W20",
      "ip": "4.2",
      "outs": 14,
      "h": 4,
      "r": 3,
      "er": 1,
      "bb": 2,
      "k": 4,
      "hr": 2,
      "bf": 19
    }
  },
  "careerAverages": {
    "ERA": 3.13,
    "WHIP": 1.348,
    "K": 24,
    "IP": "23.0"
  }
}
braylon_doughty.knowledge = braylon_doughty_knowledge
braylon_doughty.performance = braylon_doughty_performance
braylon_doughty.media = braylon_doughty_media
braylon_doughty.cardMarket = braylon_doughty_market
braylon_doughty.marketArchetype = braylon_doughty_market.marketArchetype
braylon_doughty.dlr = { performance: braylon_doughty_performance, media: braylon_doughty_media, cardMarket: braylon_doughty_market }
