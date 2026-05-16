import { kash_mayfield_knowledge } from "./kash_mayfield_knowledge"
import { kash_mayfield_performance } from "./kash_mayfield_performance"
import { kash_mayfield_media } from "./kash_mayfield_media"
import { kash_mayfield_market } from "./kash_mayfield_market"

export const kash_mayfield: any = {
  "id": "kash_mayfield",
  "name": "Kash Mayfield",
  "fullName": "Kash Mayfield",
  "team": "Fort Wayne TinCaps",
  "organization": "San Diego Padres",
  "position": "P",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-02-08",
  "school": "Elk City HS (OK)",
  "country": "USA",
  "height": "6' 4\"",
  "weight": 200,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 25,
  "draftOverall": 25,
  "draftBonus": "3.44m",
  "pickValue": "3.44m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 1.82,
    "H": 8,
    "W": null,
    "K": 26,
    "WHIP": 0.851,
    "IP": "24.2"
  },
  "tracker": {
    "G": 6,
    "IP": "24.2",
    "H": 8,
    "ER": 5,
    "BB": 13,
    "K": 26,
    "HR": 1,
    "ERA": 1.82,
    "WHIP": 0.851,
    "lastGame": {
      "g": 6,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-08",
      "opp": "vs Beloit Sky Carp",
      "team": "Fort Wayne TinCaps",
      "week": "2026-W19",
      "ip": "5.0",
      "outs": 15,
      "h": 1,
      "r": 0,
      "er": 0,
      "bb": 1,
      "k": 3,
      "hr": 0,
      "bf": 16
    }
  },
  "careerAverages": {
    "ERA": 1.82,
    "WHIP": 0.851,
    "K": 26,
    "IP": "24.2"
  }
}
kash_mayfield.knowledge = kash_mayfield_knowledge
kash_mayfield.performance = kash_mayfield_performance
kash_mayfield.media = kash_mayfield_media
kash_mayfield.cardMarket = kash_mayfield_market
kash_mayfield.marketArchetype = kash_mayfield_market.marketArchetype
kash_mayfield.dlr = { performance: kash_mayfield_performance, media: kash_mayfield_media, cardMarket: kash_mayfield_market }
