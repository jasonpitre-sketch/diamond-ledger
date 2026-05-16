import { chase_dollander_knowledge } from "./chase_dollander_knowledge"
import { chase_dollander_performance } from "./chase_dollander_performance"
import { chase_dollander_media } from "./chase_dollander_media"
import { chase_dollander_market } from "./chase_dollander_market"

export const chase_dollander: any = {
  "id": "chase_dollander",
  "name": "Chase Dollander",
  "fullName": "Chase Dollander",
  "team": "Colorado Rockies",
  "organization": "Colorado Rockies",
  "position": "P",
  "tier": "MLB",
  "level": "MLB",
  "age": 25,
  "birthdate": "2001-10-26",
  "school": "Tennessee (TN)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 219,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 9,
  "draftOverall": 9,
  "draftBonus": "5.72m",
  "pickValue": "5.72m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 3.89,
    "H": 39,
    "W": null,
    "K": 47,
    "WHIP": 1.295,
    "IP": "44.0"
  },
  "tracker": {
    "G": 10,
    "IP": "44.0",
    "H": 39,
    "ER": 19,
    "BB": 18,
    "K": 47,
    "HR": 6,
    "ERA": 3.89,
    "WHIP": 1.295,
    "lastGame": {
      "g": 10,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "@ Pittsburgh Pirates",
      "team": "Colorado Rockies",
      "week": "2026-W20",
      "ip": "1.0",
      "outs": 3,
      "h": 5,
      "r": 3,
      "er": 3,
      "bb": 1,
      "k": 0,
      "hr": 1,
      "bf": 9
    }
  },
  "careerAverages": {
    "ERA": 3.89,
    "WHIP": 1.295,
    "K": 47,
    "IP": "44.0"
  }
}
chase_dollander.knowledge = chase_dollander_knowledge
chase_dollander.performance = chase_dollander_performance
chase_dollander.media = chase_dollander_media
chase_dollander.cardMarket = chase_dollander_market
chase_dollander.marketArchetype = chase_dollander_market.marketArchetype
chase_dollander.dlr = { performance: chase_dollander_performance, media: chase_dollander_media, cardMarket: chase_dollander_market }
