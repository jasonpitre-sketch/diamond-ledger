import { aidan_miller_knowledge } from "./aidan_miller_knowledge"
import { aidan_miller_performance } from "./aidan_miller_performance"
import { aidan_miller_media } from "./aidan_miller_media"
import { aidan_miller_market } from "./aidan_miller_market"

export const aidan_miller: any = {
  "id": "aidan_miller",
  "name": "Aidan Miller",
  "fullName": "Aidan Miller",
  "team": "Lehigh Valley IronPigs",
  "organization": "Philadelphia Phillies",
  "position": "SS",
  "tier": "AAA",
  "level": "AAA",
  "age": 22,
  "birthdate": "2004-06-09",
  "school": "J.W. Mitchell HS (FL)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 205,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 27,
  "draftOverall": 27,
  "draftBonus": "3.10m",
  "pickValue": "2.97m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0,
    "H": 0,
    "R": 0,
    "HR": 0,
    "RBI": 0,
    "BB": 0,
    "K": 0,
    "OPS": 0
  },
  "pitching": null,
  "tracker": {
    "G": 0,
    "AB": 0,
    "PA": 0,
    "R": 0,
    "H": 0,
    "2B": 0,
    "3B": 0,
    "HR": 0,
    "RBI": 0,
    "BB": 0,
    "K": 0,
    "SB": 0,
    "CS": 0,
    "HBP": 0,
    "SF": 0,
    "AVG": 0,
    "OBP": 0,
    "SLG": 0,
    "OPS": 0,
    "lastGame": null
  },
  "careerAverages": {
    "AVG": 0,
    "OPS": 0,
    "H": 0,
    "HR": 0,
    "RBI": 0,
    "BB": 0,
    "K": 0,
    "AB": 0,
    "G": 0,
    "SB": 0
  }
}
aidan_miller.knowledge = aidan_miller_knowledge
aidan_miller.performance = aidan_miller_performance
aidan_miller.media = aidan_miller_media
aidan_miller.cardMarket = aidan_miller_market
aidan_miller.marketArchetype = aidan_miller_market.marketArchetype
aidan_miller.dlr = { performance: aidan_miller_performance, media: aidan_miller_media, cardMarket: aidan_miller_market }
