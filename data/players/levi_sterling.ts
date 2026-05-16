import { levi_sterling_knowledge } from "./levi_sterling_knowledge"
import { levi_sterling_performance } from "./levi_sterling_performance"
import { levi_sterling_media } from "./levi_sterling_media"
import { levi_sterling_market } from "./levi_sterling_market"

export const levi_sterling: any = {
  "id": "levi_sterling",
  "name": "Levi Sterling",
  "fullName": "Levi Sterling",
  "team": "Bradenton Marauders",
  "organization": "Pittsburgh Pirates",
  "position": "P",
  "tier": "A",
  "level": "A",
  "age": 20,
  "birthdate": "2006-09-02",
  "school": "Notre Dame HS (CA)",
  "country": "USA",
  "height": "6' 5\"",
  "weight": 202,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 37,
  "draftOverall": 37,
  "draftBonus": "2.51m",
  "pickValue": "2.51m",
  "competitionLevel": "A",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 4.78,
    "H": 23,
    "W": null,
    "K": 30,
    "WHIP": 1.329,
    "IP": "26.1"
  },
  "tracker": {
    "G": 6,
    "IP": "26.1",
    "H": 23,
    "ER": 14,
    "BB": 12,
    "K": 30,
    "HR": 5,
    "ERA": 4.78,
    "WHIP": 1.329,
    "lastGame": {
      "g": 6,
      "sport": 14,
      "level": "A",
      "date": "2026-05-10",
      "opp": "@ Dunedin Blue Jays",
      "team": "Bradenton Marauders",
      "week": "2026-W19",
      "ip": "5.0",
      "outs": 15,
      "h": 7,
      "r": 5,
      "er": 5,
      "bb": 1,
      "k": 5,
      "hr": 1,
      "bf": 23
    }
  },
  "careerAverages": {
    "ERA": 4.78,
    "WHIP": 1.329,
    "K": 30,
    "IP": "26.1"
  }
}
levi_sterling.knowledge = levi_sterling_knowledge
levi_sterling.performance = levi_sterling_performance
levi_sterling.media = levi_sterling_media
levi_sterling.cardMarket = levi_sterling_market
levi_sterling.marketArchetype = levi_sterling_market.marketArchetype
levi_sterling.dlr = { performance: levi_sterling_performance, media: levi_sterling_media, cardMarket: levi_sterling_market }
