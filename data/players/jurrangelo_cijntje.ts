import { jurrangelo_cijntje_knowledge } from "./jurrangelo_cijntje_knowledge"
import { jurrangelo_cijntje_performance } from "./jurrangelo_cijntje_performance"
import { jurrangelo_cijntje_media } from "./jurrangelo_cijntje_media"
import { jurrangelo_cijntje_market } from "./jurrangelo_cijntje_market"

export const jurrangelo_cijntje: any = {
  "id": "jurrangelo_cijntje",
  "name": "Jurrangelo Cijntje",
  "fullName": "Jurrangelo Cijntje",
  "team": "Springfield Cardinals",
  "organization": "Seattle Mariners",
  "position": "P",
  "tier": "AA",
  "level": "AA",
  "age": 23,
  "birthdate": "2003-05-31",
  "school": "Mississippi State (MS)",
  "country": "Netherlands",
  "height": "5' 11\"",
  "weight": 200,
  "bats": "S",
  "throws": "S",
  "draftYear": 2024,
  "draftPick": 15,
  "draftOverall": 15,
  "draftBonus": "4.88m",
  "pickValue": "4.88m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 6.03,
    "H": 30,
    "W": null,
    "K": 36,
    "WHIP": 1.5,
    "IP": "31.1"
  },
  "tracker": {
    "G": 7,
    "IP": "31.1",
    "H": 30,
    "ER": 21,
    "BB": 17,
    "K": 36,
    "HR": 6,
    "ERA": 6.03,
    "WHIP": 1.5,
    "lastGame": {
      "g": 7,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-10",
      "opp": "vs Corpus Christi Hooks",
      "team": "Springfield Cardinals",
      "week": "2026-W19",
      "ip": "4.2",
      "outs": 14,
      "h": 7,
      "r": 4,
      "er": 4,
      "bb": 1,
      "k": 7,
      "hr": 0,
      "bf": 22
    }
  },
  "careerAverages": {
    "ERA": 6.03,
    "WHIP": 1.5,
    "K": 36,
    "IP": "31.1"
  }
}
jurrangelo_cijntje.knowledge = jurrangelo_cijntje_knowledge
jurrangelo_cijntje.performance = jurrangelo_cijntje_performance
jurrangelo_cijntje.media = jurrangelo_cijntje_media
jurrangelo_cijntje.cardMarket = jurrangelo_cijntje_market
jurrangelo_cijntje.marketArchetype = jurrangelo_cijntje_market.marketArchetype
jurrangelo_cijntje.dlr = { performance: jurrangelo_cijntje_performance, media: jurrangelo_cijntje_media, cardMarket: jurrangelo_cijntje_market }
