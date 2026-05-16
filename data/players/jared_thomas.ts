import { jared_thomas_knowledge } from "./jared_thomas_knowledge"
import { jared_thomas_performance } from "./jared_thomas_performance"
import { jared_thomas_media } from "./jared_thomas_media"
import { jared_thomas_market } from "./jared_thomas_market"

export const jared_thomas: any = {
  "id": "jared_thomas",
  "name": "Jared Thomas",
  "fullName": "Jared Thomas",
  "team": "Hartford Yard Goats",
  "organization": "Colorado Rockies",
  "position": "OF",
  "tier": "AA",
  "level": "AA",
  "age": 23,
  "birthdate": "2003-07-01",
  "school": "Texas (TX)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 185,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 42,
  "draftOverall": 42,
  "draftBonus": "2.00m",
  "pickValue": "2.22m",
  "competitionLevel": "AA",
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
jared_thomas.knowledge = jared_thomas_knowledge
jared_thomas.performance = jared_thomas_performance
jared_thomas.media = jared_thomas_media
jared_thomas.cardMarket = jared_thomas_market
jared_thomas.marketArchetype = jared_thomas_market.marketArchetype
jared_thomas.dlr = { performance: jared_thomas_performance, media: jared_thomas_media, cardMarket: jared_thomas_market }
