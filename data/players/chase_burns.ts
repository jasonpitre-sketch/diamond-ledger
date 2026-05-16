import { chase_burns_knowledge } from "./chase_burns_knowledge"
import { chase_burns_performance } from "./chase_burns_performance"
import { chase_burns_media } from "./chase_burns_media"
import { chase_burns_market } from "./chase_burns_market"

export const chase_burns: any = {
  "id": "chase_burns",
  "name": "Chase Burns",
  "fullName": "Chase Burns",
  "team": "Cincinnati Reds",
  "organization": "Cincinnati Reds",
  "position": "P",
  "tier": "MLB",
  "level": "MLB",
  "age": 23,
  "birthdate": "2003-01-16",
  "school": "Wake Forest (NC)",
  "country": "Italy",
  "height": "6' 3\"",
  "weight": 210,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 2,
  "draftOverall": 2,
  "draftBonus": "9.25m",
  "pickValue": "9.79m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 1.87,
    "H": 35,
    "W": null,
    "K": 55,
    "WHIP": 1,
    "IP": "53.0"
  },
  "tracker": {
    "G": 9,
    "IP": "53.0",
    "H": 35,
    "ER": 11,
    "BB": 18,
    "K": 55,
    "HR": 6,
    "ERA": 1.87,
    "WHIP": 1,
    "lastGame": {
      "g": 9,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "vs Washington Nationals",
      "ip": "6.0",
      "outs": 18,
      "h": 2,
      "r": 0,
      "er": 0,
      "bb": 2,
      "k": 7,
      "hr": 0,
      "bf": 23,
      "result": "",
      "team": "Cincinnati Reds",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "ERA": 1.87,
    "WHIP": 1,
    "K": 55,
    "IP": "53.0"
  }
}

chase_burns.knowledge = chase_burns_knowledge
chase_burns.performance = chase_burns_performance
chase_burns.media = chase_burns_media
chase_burns.cardMarket = chase_burns_market
chase_burns.marketArchetype = chase_burns_market.marketArchetype
chase_burns.dlr = { performance: chase_burns_performance, media: chase_burns_media, cardMarket: chase_burns_market }
