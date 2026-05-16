import { ben_hess_knowledge } from "./ben_hess_knowledge"
import { ben_hess_performance } from "./ben_hess_performance"
import { ben_hess_media } from "./ben_hess_media"
import { ben_hess_market } from "./ben_hess_market"

export const ben_hess: any = {
  "id": "ben_hess",
  "name": "Ben Hess",
  "fullName": "Ben Hess",
  "team": "Somerset Patriots",
  "organization": "New York Yankees",
  "position": "P",
  "tier": "AA",
  "level": "AA",
  "age": 24,
  "birthdate": "2002-09-03",
  "school": "Alabama (AL)",
  "country": "USA",
  "height": "6' 5\"",
  "weight": 255,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 26,
  "draftOverall": 26,
  "draftBonus": "2.75m",
  "pickValue": "3.33m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 4,
    "H": 8,
    "W": null,
    "K": 15,
    "WHIP": 1.778,
    "IP": "9.0"
  },
  "tracker": {
    "G": 3,
    "IP": "9.0",
    "H": 8,
    "ER": 4,
    "BB": 8,
    "K": 15,
    "HR": 1,
    "ERA": 4,
    "WHIP": 1.778,
    "lastGame": {
      "g": 3,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "vs Binghamton Rumble Ponies",
      "team": "Somerset Patriots",
      "week": "2026-W20",
      "ip": "1.1",
      "outs": 4,
      "h": 3,
      "r": 1,
      "er": 1,
      "bb": 0,
      "k": 1,
      "hr": 0,
      "bf": 7
    }
  },
  "careerAverages": {
    "ERA": 4,
    "WHIP": 1.778,
    "K": 15,
    "IP": "9.0"
  }
}
ben_hess.knowledge = ben_hess_knowledge
ben_hess.performance = ben_hess_performance
ben_hess.media = ben_hess_media
ben_hess.cardMarket = ben_hess_market
ben_hess.marketArchetype = ben_hess_market.marketArchetype
ben_hess.dlr = { performance: ben_hess_performance, media: ben_hess_media, cardMarket: ben_hess_market }
