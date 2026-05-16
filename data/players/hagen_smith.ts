import { hagen_smith_knowledge } from "./hagen_smith_knowledge"
import { hagen_smith_performance } from "./hagen_smith_performance"
import { hagen_smith_media } from "./hagen_smith_media"
import { hagen_smith_market } from "./hagen_smith_market"

export const hagen_smith: any = {
  "id": "hagen_smith",
  "name": "Hagen Smith",
  "fullName": "Hagen Smith",
  "team": "Charlotte Knights",
  "organization": "Chicago White Sox",
  "position": "P",
  "tier": "AAA",
  "level": "AAA",
  "age": 23,
  "birthdate": "2003-08-19",
  "school": "Arkansas (AR)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 235,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 5,
  "draftOverall": 5,
  "draftBonus": "8.00m",
  "pickValue": "7.76m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 4.1,
    "H": 16,
    "W": null,
    "K": 35,
    "WHIP": 1.291,
    "IP": "26.1"
  },
  "tracker": {
    "G": 8,
    "IP": "26.1",
    "H": 16,
    "ER": 12,
    "BB": 18,
    "K": 35,
    "HR": 2,
    "ERA": 4.1,
    "WHIP": 1.291,
    "lastGame": {
      "g": 8,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-09",
      "opp": "@ Jacksonville Jumbo Shrimp",
      "ip": "4.0",
      "outs": 12,
      "h": 4,
      "r": 6,
      "er": 5,
      "bb": 2,
      "k": 3,
      "hr": 0,
      "bf": 19,
      "result": "",
      "team": "Charlotte Knights",
      "week": "2026-W19"
    }
  },
  "careerAverages": {
    "ERA": 4.1,
    "WHIP": 1.291,
    "K": 35,
    "IP": "26.1"
  }
}

hagen_smith.knowledge = hagen_smith_knowledge
hagen_smith.performance = hagen_smith_performance
hagen_smith.media = hagen_smith_media
hagen_smith.cardMarket = hagen_smith_market
hagen_smith.marketArchetype = hagen_smith_market.marketArchetype
hagen_smith.dlr = { performance: hagen_smith_performance, media: hagen_smith_media, cardMarket: hagen_smith_market }
