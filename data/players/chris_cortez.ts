import { chris_cortez_knowledge } from "./chris_cortez_knowledge"
import { chris_cortez_performance } from "./chris_cortez_performance"
import { chris_cortez_media } from "./chris_cortez_media"
import { chris_cortez_market } from "./chris_cortez_market"

export const chris_cortez: any = {
  "id": "chris_cortez",
  "name": "Chris Cortez",
  "fullName": "Chris Cortez",
  "team": "Rocket City Trash Pandas",
  "organization": "Los Angeles Angels",
  "position": "P",
  "tier": "AA",
  "level": "AA",
  "age": 24,
  "birthdate": "2002-10-06",
  "school": "Texas A&M (TX)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 210,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 45,
  "draftOverall": 45,
  "draftBonus": "1.60m",
  "pickValue": "2.07m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 3.8,
    "H": 13,
    "W": null,
    "K": 16,
    "WHIP": 1.875,
    "IP": "21.1"
  },
  "tracker": {
    "G": 9,
    "IP": "21.1",
    "H": 13,
    "ER": 9,
    "BB": 27,
    "K": 16,
    "HR": 1,
    "ERA": 3.8,
    "WHIP": 1.875,
    "lastGame": {
      "g": 9,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "@ Birmingham Barons",
      "team": "Rocket City Trash Pandas",
      "week": "2026-W20",
      "ip": "1.0",
      "outs": 3,
      "h": 0,
      "r": 0,
      "er": 0,
      "bb": 0,
      "k": 1,
      "hr": 0,
      "bf": 3
    }
  },
  "careerAverages": {
    "ERA": 3.8,
    "WHIP": 1.875,
    "K": 16,
    "IP": "21.1"
  }
}
chris_cortez.knowledge = chris_cortez_knowledge
chris_cortez.performance = chris_cortez_performance
chris_cortez.media = chris_cortez_media
chris_cortez.cardMarket = chris_cortez_market
chris_cortez.marketArchetype = chris_cortez_market.marketArchetype
chris_cortez.dlr = { performance: chris_cortez_performance, media: chris_cortez_media, cardMarket: chris_cortez_market }
