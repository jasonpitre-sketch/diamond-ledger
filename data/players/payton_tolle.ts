import { payton_tolle_knowledge } from "./payton_tolle_knowledge"
import { payton_tolle_performance } from "./payton_tolle_performance"
import { payton_tolle_media } from "./payton_tolle_media"
import { payton_tolle_market } from "./payton_tolle_market"

export const payton_tolle: any = {
  "id": "payton_tolle",
  "name": "Payton Tolle",
  "fullName": "Payton Tolle",
  "team": "Boston Red Sox",
  "organization": "Boston Red Sox",
  "position": "P",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-11-01",
  "school": "TCU (TX)",
  "country": "USA",
  "height": "6' 6\"",
  "weight": 250,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 50,
  "draftOverall": 50,
  "draftBonus": "2.00m",
  "pickValue": "1.85m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 2.87,
    "H": 26,
    "W": null,
    "K": 46,
    "WHIP": 0.956,
    "IP": "37.2"
  },
  "tracker": {
    "G": 7,
    "IP": "37.2",
    "H": 26,
    "ER": 12,
    "BB": 10,
    "K": 46,
    "HR": 3,
    "ERA": 2.87,
    "WHIP": 0.956,
    "lastGame": {
      "g": 7,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-10",
      "opp": "vs Tampa Bay Rays",
      "team": "Boston Red Sox",
      "week": "2026-W19",
      "ip": "5.0",
      "outs": 15,
      "h": 7,
      "r": 3,
      "er": 3,
      "bb": 0,
      "k": 4,
      "hr": 1,
      "bf": 20
    }
  },
  "careerAverages": {
    "ERA": 2.87,
    "WHIP": 0.956,
    "K": 46,
    "IP": "37.2"
  }
}
payton_tolle.knowledge = payton_tolle_knowledge
payton_tolle.performance = payton_tolle_performance
payton_tolle.media = payton_tolle_media
payton_tolle.cardMarket = payton_tolle_market
payton_tolle.marketArchetype = payton_tolle_market.marketArchetype
payton_tolle.dlr = { performance: payton_tolle_performance, media: payton_tolle_media, cardMarket: payton_tolle_market }
