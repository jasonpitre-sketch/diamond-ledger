import { david_shields_knowledge } from "./david_shields_knowledge"
import { david_shields_performance } from "./david_shields_performance"
import { david_shields_media } from "./david_shields_media"
import { david_shields_market } from "./david_shields_market"

export const david_shields: any = {
  "id": "david_shields",
  "name": "David Shields",
  "fullName": "David Shields",
  "team": "Quad Cities River Bandits",
  "organization": "Kansas City Royals",
  "position": "P",
  "tier": "A+",
  "level": "A+",
  "age": 20,
  "birthdate": "2006-09-09",
  "school": "Mt. Lebanon HS (PA)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 210,
  "bats": "S",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 41,
  "draftOverall": 41,
  "draftBonus": "2.30m",
  "pickValue": "2.28m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 2.93,
    "H": 22,
    "W": null,
    "K": 36,
    "WHIP": 1.043,
    "IP": "30.2"
  },
  "tracker": {
    "G": 7,
    "IP": "30.2",
    "H": 22,
    "ER": 10,
    "BB": 10,
    "K": 36,
    "HR": 3,
    "ERA": 2.93,
    "WHIP": 1.043,
    "lastGame": {
      "g": 7,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-12",
      "opp": "@ Lansing Lugnuts",
      "team": "Quad Cities River Bandits",
      "week": "2026-W20",
      "ip": "4.0",
      "outs": 12,
      "h": 3,
      "r": 2,
      "er": 2,
      "bb": 1,
      "k": 1,
      "hr": 0,
      "bf": 17
    }
  },
  "careerAverages": {
    "ERA": 2.93,
    "WHIP": 1.043,
    "K": 36,
    "IP": "30.2"
  }
}
david_shields.knowledge = david_shields_knowledge
david_shields.performance = david_shields_performance
david_shields.media = david_shields_media
david_shields.cardMarket = david_shields_market
david_shields.marketArchetype = david_shields_market.marketArchetype
david_shields.dlr = { performance: david_shields_performance, media: david_shields_media, cardMarket: david_shields_market }
