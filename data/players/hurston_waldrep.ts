import { hurston_waldrep_knowledge } from "./hurston_waldrep_knowledge"
import { hurston_waldrep_performance } from "./hurston_waldrep_performance"
import { hurston_waldrep_media } from "./hurston_waldrep_media"
import { hurston_waldrep_market } from "./hurston_waldrep_market"

export const hurston_waldrep: any = {
  "id": "hurston_waldrep",
  "name": "Hurston Waldrep",
  "fullName": "Hurston Waldrep",
  "team": "Atlanta Braves",
  "organization": "Atlanta Braves",
  "position": "P",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-03-01",
  "school": "Florida (FL)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 210,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 24,
  "draftOverall": 24,
  "draftBonus": "3.00m",
  "pickValue": "3.27m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 0,
    "H": 0,
    "W": null,
    "K": 0,
    "WHIP": 0,
    "IP": "0.0"
  },
  "tracker": {
    "G": 0,
    "IP": "0.0",
    "H": 0,
    "ER": 0,
    "BB": 0,
    "K": 0,
    "HR": 0,
    "ERA": 0,
    "WHIP": 0,
    "lastGame": null
  },
  "careerAverages": {
    "ERA": 0,
    "WHIP": 0,
    "K": 0,
    "IP": "0.0"
  }
}
hurston_waldrep.knowledge = hurston_waldrep_knowledge
hurston_waldrep.performance = hurston_waldrep_performance
hurston_waldrep.media = hurston_waldrep_media
hurston_waldrep.cardMarket = hurston_waldrep_market
hurston_waldrep.marketArchetype = hurston_waldrep_market.marketArchetype
hurston_waldrep.dlr = { performance: hurston_waldrep_performance, media: hurston_waldrep_media, cardMarket: hurston_waldrep_market }
