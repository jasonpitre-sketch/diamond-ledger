import { brody_brecht_knowledge } from "./brody_brecht_knowledge"
import { brody_brecht_performance } from "./brody_brecht_performance"
import { brody_brecht_media } from "./brody_brecht_media"
import { brody_brecht_market } from "./brody_brecht_market"

export const brody_brecht: any = {
  "id": "brody_brecht",
  "name": "Brody Brecht",
  "fullName": "Brody Brecht",
  "team": "Spokane Indians",
  "organization": "Colorado Rockies",
  "position": "P",
  "tier": "A+",
  "level": "A+",
  "age": 24,
  "birthdate": "2002-09-27",
  "school": "Iowa (IA)",
  "country": "USA",
  "height": "6' 4\"",
  "weight": 235,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 38,
  "draftOverall": 38,
  "draftBonus": "2.70m",
  "pickValue": "2.45m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 4.91,
    "H": 13,
    "W": null,
    "K": 29,
    "WHIP": 1.309,
    "IP": "18.1"
  },
  "tracker": {
    "G": 6,
    "IP": "18.1",
    "H": 13,
    "ER": 10,
    "BB": 11,
    "K": 29,
    "HR": 0,
    "ERA": 4.91,
    "WHIP": 1.309,
    "lastGame": {
      "g": 6,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-08",
      "opp": "vs Tri-City Dust Devils",
      "team": "Spokane Indians",
      "week": "2026-W19",
      "ip": "4.0",
      "outs": 12,
      "h": 2,
      "r": 0,
      "er": 0,
      "bb": 2,
      "k": 6,
      "hr": 0,
      "bf": 15
    }
  },
  "careerAverages": {
    "ERA": 4.91,
    "WHIP": 1.309,
    "K": 29,
    "IP": "18.1"
  }
}
brody_brecht.knowledge = brody_brecht_knowledge
brody_brecht.performance = brody_brecht_performance
brody_brecht.media = brody_brecht_media
brody_brecht.cardMarket = brody_brecht_market
brody_brecht.marketArchetype = brody_brecht_market.marketArchetype
brody_brecht.dlr = { performance: brody_brecht_performance, media: brody_brecht_media, cardMarket: brody_brecht_market }
