import { sean_sullivan_knowledge } from "./sean_sullivan_knowledge"
import { sean_sullivan_performance } from "./sean_sullivan_performance"
import { sean_sullivan_media } from "./sean_sullivan_media"
import { sean_sullivan_market } from "./sean_sullivan_market"

export const sean_sullivan: any = {
  "id": "sean_sullivan",
  "name": "Sean Sullivan",
  "fullName": "Sean Sullivan",
  "team": "Albuquerque Isotopes",
  "organization": "Colorado Rockies",
  "position": "P",
  "tier": "AAA",
  "level": "AAA",
  "age": 23,
  "birthdate": "2002-07-22",
  "school": "Wake Forest (NC)",
  "country": "USA",
  "height": "6' 4\"",
  "weight": 200,
  "bats": "R",
  "throws": "L",
  "draftYear": 2023,
  "draftPick": 46,
  "draftOverall": 46,
  "draftBonus": "1.70m",
  "pickValue": "1.87m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 5.08,
    "WHIP": 1.538,
    "K": 32,
    "IP": "39.0"
  },
  "tracker": {
    "G": 8,
    "IP": "39.0",
    "outs": 117,
    "H": 44,
    "R": 27,
    "ER": 22,
    "BB": 16,
    "K": 32,
    "HR": 6,
    "ERA": 5.08,
    "WHIP": 1.538,
    "K9": 7.4,
    "lastGame": {
      "g": 8,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-13",
      "opp": "vs Oklahoma City Comets",
      "team": "Albuquerque Isotopes",
      "week": "2026-W20",
      "ip": "6.0",
      "outs": 18,
      "h": 5,
      "r": 2,
      "er": 1,
      "bb": 1,
      "so": 3,
      "hr": 1
    }
  },
  "careerAverages": {
    "ERA": 5.08,
    "WHIP": 1.538,
    "K": 32,
    "IP": "39.0",
    "G": 8
  }
}
sean_sullivan.knowledge = sean_sullivan_knowledge
sean_sullivan.performance = sean_sullivan_performance
sean_sullivan.media = sean_sullivan_media
sean_sullivan.cardMarket = sean_sullivan_market
sean_sullivan.marketArchetype = sean_sullivan_market.marketArchetype
sean_sullivan.dlr = { performance: sean_sullivan_performance, media: sean_sullivan_media, cardMarket: sean_sullivan_market }
