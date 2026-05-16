import { trey_yesavage_knowledge } from "./trey_yesavage_knowledge"
import { trey_yesavage_performance } from "./trey_yesavage_performance"
import { trey_yesavage_media } from "./trey_yesavage_media"
import { trey_yesavage_market } from "./trey_yesavage_market"

export const trey_yesavage: any = {
  "id": "trey_yesavage",
  "name": "Trey Yesavage",
  "fullName": "Trey Yesavage",
  "team": "Toronto Blue Jays",
  "organization": "Toronto Blue Jays",
  "position": "P",
  "tier": "MLB",
  "level": "MLB",
  "age": 23,
  "birthdate": "2003-07-28",
  "school": "East Carolina (NC)",
  "country": "USA",
  "height": "6' 4\"",
  "weight": 225,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 20,
  "draftOverall": 20,
  "draftBonus": "4.18m",
  "pickValue": "4.07m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 3.91,
    "H": 27,
    "W": null,
    "K": 31,
    "WHIP": 1.539,
    "IP": "25.1"
  },
  "tracker": {
    "G": 7,
    "IP": "25.1",
    "H": 27,
    "ER": 11,
    "BB": 12,
    "K": 31,
    "HR": 3,
    "ERA": 3.91,
    "WHIP": 1.539,
    "lastGame": {
      "g": 7,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-09",
      "opp": "vs Los Angeles Angels",
      "team": "Toronto Blue Jays",
      "week": "2026-W19",
      "ip": "4.0",
      "outs": 12,
      "h": 4,
      "r": 0,
      "er": 0,
      "bb": 2,
      "k": 6,
      "hr": 0,
      "bf": 17
    }
  },
  "careerAverages": {
    "ERA": 3.91,
    "WHIP": 1.539,
    "K": 31,
    "IP": "25.1"
  }
}
trey_yesavage.knowledge = trey_yesavage_knowledge
trey_yesavage.performance = trey_yesavage_performance
trey_yesavage.media = trey_yesavage_media
trey_yesavage.cardMarket = trey_yesavage_market
trey_yesavage.marketArchetype = trey_yesavage_market.marketArchetype
trey_yesavage.dlr = { performance: trey_yesavage_performance, media: trey_yesavage_media, cardMarket: trey_yesavage_market }
