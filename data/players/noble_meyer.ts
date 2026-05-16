import { noble_meyer_knowledge } from "./noble_meyer_knowledge"
import { noble_meyer_performance } from "./noble_meyer_performance"
import { noble_meyer_media } from "./noble_meyer_media"
import { noble_meyer_market } from "./noble_meyer_market"

export const noble_meyer: any = {
  "id": "noble_meyer",
  "name": "Noble Meyer",
  "fullName": "Noble Meyer",
  "team": "Beloit Sky Carp",
  "organization": "Miami Marlins",
  "position": "P",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-01-10",
  "school": "Jesuit HS (OR)",
  "country": "USA",
  "height": "6' 5\"",
  "weight": 185,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 10,
  "draftOverall": 10,
  "draftBonus": "4.50m",
  "pickValue": "5.48m",
  "competitionLevel": "A+",
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
noble_meyer.knowledge = noble_meyer_knowledge
noble_meyer.performance = noble_meyer_performance
noble_meyer.media = noble_meyer_media
noble_meyer.cardMarket = noble_meyer_market
noble_meyer.marketArchetype = noble_meyer_market.marketArchetype
noble_meyer.dlr = { performance: noble_meyer_performance, media: noble_meyer_media, cardMarket: noble_meyer_market }
