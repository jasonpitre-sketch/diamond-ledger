import { josh_knoth_knowledge } from "./josh_knoth_knowledge"
import { josh_knoth_performance } from "./josh_knoth_performance"
import { josh_knoth_media } from "./josh_knoth_media"
import { josh_knoth_market } from "./josh_knoth_market"

export const josh_knoth: any = {
  "id": "josh_knoth",
  "name": "Josh Knoth",
  "fullName": "Josh Knoth",
  "team": "ACL Brewers",
  "organization": "Milwaukee Brewers",
  "position": "P",
  "tier": "Rookie",
  "level": "Rookie",
  "age": 21,
  "birthdate": "2005-08-10",
  "school": "Patchogue Medford HS (NY)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 33,
  "draftOverall": 33,
  "draftBonus": "2.00m",
  "pickValue": "2.54m",
  "competitionLevel": "Rookie",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 4.5,
    "H": 4,
    "W": null,
    "K": 8,
    "WHIP": 1.333,
    "IP": "6.0"
  },
  "tracker": {
    "G": 3,
    "IP": "6.0",
    "H": 4,
    "ER": 3,
    "BB": 4,
    "K": 8,
    "HR": 0,
    "ERA": 4.5,
    "WHIP": 1.333,
    "lastGame": {
      "g": 3,
      "sport": 16,
      "level": "Rookie",
      "date": "2026-05-14",
      "opp": "@ ACL Rangers",
      "team": "ACL Brewers",
      "week": "2026-W20",
      "ip": "2.1",
      "outs": 7,
      "h": 3,
      "r": 2,
      "er": 2,
      "bb": 1,
      "k": 3,
      "hr": 0,
      "bf": 11
    }
  },
  "careerAverages": {
    "ERA": 4.5,
    "WHIP": 1.333,
    "K": 8,
    "IP": "6.0"
  }
}
josh_knoth.knowledge = josh_knoth_knowledge
josh_knoth.performance = josh_knoth_performance
josh_knoth.media = josh_knoth_media
josh_knoth.cardMarket = josh_knoth_market
josh_knoth.marketArchetype = josh_knoth_market.marketArchetype
josh_knoth.dlr = { performance: josh_knoth_performance, media: josh_knoth_media, cardMarket: josh_knoth_market }
