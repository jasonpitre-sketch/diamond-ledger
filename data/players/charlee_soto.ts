import { charlee_soto_knowledge } from "./charlee_soto_knowledge"
import { charlee_soto_performance } from "./charlee_soto_performance"
import { charlee_soto_media } from "./charlee_soto_media"
import { charlee_soto_market } from "./charlee_soto_market"

export const charlee_soto: any = {
  "id": "charlee_soto",
  "name": "Charlee Soto",
  "fullName": "Charlee Soto",
  "team": "Cedar Rapids Kernels",
  "organization": "Minnesota Twins",
  "position": "P",
  "tier": "AAA",
  "level": "AAA",
  "age": 21,
  "birthdate": "2005-08-31",
  "school": "Reborn Christian Academy (FL)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 210,
  "bats": "S",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 34,
  "draftOverall": 34,
  "draftBonus": "2.48m",
  "pickValue": "2.48m",
  "competitionLevel": "AAA",
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
charlee_soto.knowledge = charlee_soto_knowledge
charlee_soto.performance = charlee_soto_performance
charlee_soto.media = charlee_soto_media
charlee_soto.cardMarket = charlee_soto_market
charlee_soto.marketArchetype = charlee_soto_market.marketArchetype
charlee_soto.dlr = { performance: charlee_soto_performance, media: charlee_soto_media, cardMarket: charlee_soto_market }
