import { rhett_lowder_knowledge } from "./rhett_lowder_knowledge"
import { rhett_lowder_performance } from "./rhett_lowder_performance"
import { rhett_lowder_media } from "./rhett_lowder_media"
import { rhett_lowder_market } from "./rhett_lowder_market"

export const rhett_lowder: any = {
  "id": "rhett_lowder",
  "name": "Rhett Lowder",
  "fullName": "Rhett Lowder",
  "team": "Cincinnati Reds",
  "organization": "Cincinnati Reds",
  "position": "P",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-03-08",
  "school": "Wake Forest (NC)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 200,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 7,
  "draftOverall": 7,
  "draftBonus": "5.70m",
  "pickValue": "6.28m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 5.4,
    "H": 36,
    "W": null,
    "K": 27,
    "WHIP": 1.409,
    "IP": "38.1"
  },
  "tracker": {
    "G": 8,
    "IP": "38.1",
    "H": 36,
    "ER": 23,
    "BB": 18,
    "K": 27,
    "HR": 2,
    "ERA": 5.4,
    "WHIP": 1.409,
    "lastGame": {
      "g": 8,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-07",
      "opp": "@ Chicago Cubs",
      "team": "Cincinnati Reds",
      "week": "2026-W19",
      "ip": "3.0",
      "outs": 9,
      "h": 1,
      "r": 3,
      "er": 3,
      "bb": 4,
      "k": 1,
      "hr": 1,
      "bf": 13
    }
  },
  "careerAverages": {
    "ERA": 5.4,
    "WHIP": 1.409,
    "K": 27,
    "IP": "38.1"
  }
}
rhett_lowder.knowledge = rhett_lowder_knowledge
rhett_lowder.performance = rhett_lowder_performance
rhett_lowder.media = rhett_lowder_media
rhett_lowder.cardMarket = rhett_lowder_market
rhett_lowder.marketArchetype = rhett_lowder_market.marketArchetype
rhett_lowder.dlr = { performance: rhett_lowder_performance, media: rhett_lowder_media, cardMarket: rhett_lowder_market }
