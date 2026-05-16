import { paul_skenes_knowledge } from "./paul_skenes_knowledge"
import { paul_skenes_performance } from "./paul_skenes_performance"
import { paul_skenes_media } from "./paul_skenes_media"
import { paul_skenes_market } from "./paul_skenes_market"

export const paul_skenes: any = {
  "id": "paul_skenes",
  "name": "Paul Skenes",
  "fullName": "Paul Skenes",
  "team": "Pittsburgh Pirates",
  "organization": "Pittsburgh Pirates",
  "position": "P",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-05-29",
  "school": "LSU (LA)",
  "country": "USA",
  "height": "6' 6\"",
  "weight": 260,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 1,
  "draftOverall": 1,
  "draftBonus": "9.20m",
  "pickValue": "9.72m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 1.98,
    "H": 25,
    "W": null,
    "K": 56,
    "WHIP": 0.64,
    "IP": "50.0"
  },
  "tracker": {
    "G": 9,
    "IP": "50.0",
    "H": 25,
    "ER": 11,
    "BB": 7,
    "K": 56,
    "HR": 4,
    "ERA": 1.98,
    "WHIP": 0.64,
    "lastGame": {
      "g": 9,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-12",
      "opp": "vs Colorado Rockies",
      "team": "Pittsburgh Pirates",
      "week": "2026-W20",
      "ip": "8.0",
      "outs": 24,
      "h": 2,
      "r": 0,
      "er": 0,
      "bb": 0,
      "k": 10,
      "hr": 0,
      "bf": 26
    }
  },
  "careerAverages": {
    "ERA": 1.98,
    "WHIP": 0.64,
    "K": 56,
    "IP": "50.0"
  }
}
paul_skenes.knowledge = paul_skenes_knowledge
paul_skenes.performance = paul_skenes_performance
paul_skenes.media = paul_skenes_media
paul_skenes.cardMarket = paul_skenes_market
paul_skenes.marketArchetype = paul_skenes_market.marketArchetype
paul_skenes.dlr = { performance: paul_skenes_performance, media: paul_skenes_media, cardMarket: paul_skenes_market }
