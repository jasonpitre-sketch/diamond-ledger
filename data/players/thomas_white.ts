import { thomas_white_knowledge } from "./thomas_white_knowledge"
import { thomas_white_performance } from "./thomas_white_performance"
import { thomas_white_media } from "./thomas_white_media"
import { thomas_white_market } from "./thomas_white_market"

export const thomas_white: any = {
  "id": "thomas_white",
  "name": "Thomas White",
  "fullName": "Thomas White",
  "team": "Jacksonville Jumbo Shrimp",
  "organization": "Miami Marlins",
  "position": "P",
  "tier": "AAA",
  "level": "AAA",
  "age": 22,
  "birthdate": "2004-09-29",
  "school": "Phillips Academy (MA)",
  "country": "USA",
  "height": "6' 5\"",
  "weight": 240,
  "bats": "L",
  "throws": "L",
  "draftYear": 2023,
  "draftPick": 35,
  "draftOverall": 35,
  "draftBonus": "4.10m",
  "pickValue": "2.42m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 4.01,
    "H": 21,
    "W": null,
    "K": 35,
    "WHIP": 1.459,
    "IP": "24.2"
  },
  "tracker": {
    "G": 7,
    "IP": "24.2",
    "H": 21,
    "ER": 11,
    "BB": 15,
    "K": 35,
    "HR": 4,
    "ERA": 4.01,
    "WHIP": 1.459,
    "lastGame": {
      "g": 7,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "@ Memphis Redbirds",
      "team": "Jacksonville Jumbo Shrimp",
      "week": "2026-W20",
      "ip": "4.0",
      "outs": 12,
      "h": 7,
      "r": 4,
      "er": 4,
      "bb": 2,
      "k": 3,
      "hr": 2,
      "bf": 19
    }
  },
  "careerAverages": {
    "ERA": 4.01,
    "WHIP": 1.459,
    "K": 35,
    "IP": "24.2"
  }
}
thomas_white.knowledge = thomas_white_knowledge
thomas_white.performance = thomas_white_performance
thomas_white.media = thomas_white_media
thomas_white.cardMarket = thomas_white_market
thomas_white.marketArchetype = thomas_white_market.marketArchetype
thomas_white.dlr = { performance: thomas_white_performance, media: thomas_white_media, cardMarket: thomas_white_market }
