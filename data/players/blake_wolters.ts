import { blake_wolters_knowledge } from "./blake_wolters_knowledge"
import { blake_wolters_performance } from "./blake_wolters_performance"
import { blake_wolters_media } from "./blake_wolters_media"
import { blake_wolters_market } from "./blake_wolters_market"

export const blake_wolters: any = {
  "id": "blake_wolters",
  "name": "Blake Wolters",
  "fullName": "Blake Wolters",
  "team": "Quad Cities River Bandits",
  "organization": "Kansas City Royals",
  "position": "P",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2004-10-25",
  "school": "Mahomet-Seymour HS (IL)",
  "country": "USA",
  "height": "6' 4\"",
  "weight": 210,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 44,
  "draftOverall": 44,
  "draftBonus": "2.80m",
  "pickValue": "1.95m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 1.48,
    "WHIP": 1.088,
    "K": 37,
    "IP": "30.1"
  },
  "tracker": {
    "G": 7,
    "IP": "30.1",
    "outs": 91,
    "H": 19,
    "R": 17,
    "ER": 5,
    "BB": 14,
    "K": 37,
    "HR": 4,
    "ERA": 1.48,
    "WHIP": 1.088,
    "K9": 11,
    "lastGame": {
      "g": 7,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-13",
      "opp": "@ Lansing Lugnuts",
      "team": "Quad Cities River Bandits",
      "week": "2026-W20",
      "ip": "3.0",
      "outs": 9,
      "h": 3,
      "r": 4,
      "er": 0,
      "bb": 1,
      "so": 4,
      "hr": 0
    }
  },
  "careerAverages": {
    "ERA": 1.48,
    "WHIP": 1.088,
    "K": 37,
    "IP": "30.1",
    "G": 7
  }
}
blake_wolters.knowledge = blake_wolters_knowledge
blake_wolters.performance = blake_wolters_performance
blake_wolters.media = blake_wolters_media
blake_wolters.cardMarket = blake_wolters_market
blake_wolters.marketArchetype = blake_wolters_market.marketArchetype
blake_wolters.dlr = { performance: blake_wolters_performance, media: blake_wolters_media, cardMarket: blake_wolters_market }
