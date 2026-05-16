import { wyatt_sanford_knowledge } from "./wyatt_sanford_knowledge"
import { wyatt_sanford_performance } from "./wyatt_sanford_performance"
import { wyatt_sanford_media } from "./wyatt_sanford_media"
import { wyatt_sanford_market } from "./wyatt_sanford_market"

export const wyatt_sanford: any = {
  "id": "wyatt_sanford",
  "name": "Wyatt Sanford",
  "fullName": "Wyatt Sanford",
  "team": "Greensboro Grasshoppers",
  "organization": "Pittsburgh Pirates",
  "position": "SS",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-11-24",
  "school": "Independence HS (TX)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 175,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 47,
  "draftOverall": 47,
  "draftBonus": "2.50m",
  "pickValue": "1.98m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.309,
    "H": 38,
    "R": 32,
    "HR": 6,
    "RBI": 19,
    "BB": 19,
    "K": 53,
    "OPS": 0.975
  },
  "pitching": null,
  "tracker": {
    "G": 32,
    "AB": 123,
    "PA": 149,
    "R": 32,
    "H": 38,
    "2B": 9,
    "3B": 1,
    "HR": 6,
    "RBI": 19,
    "BB": 19,
    "K": 53,
    "SB": 13,
    "CS": 1,
    "HBP": 7,
    "SF": 0,
    "AVG": 0.309,
    "OBP": 0.43,
    "SLG": 0.545,
    "OPS": 0.975,
    "lastGame": {
      "g": 32,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Jersey Shore BlueClaws",
      "team": "Greensboro Grasshoppers",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.309,
    "OPS": 0.975,
    "H": 38,
    "HR": 6,
    "RBI": 19,
    "BB": 19,
    "K": 53,
    "AB": 123,
    "G": 32,
    "SB": 13
  }
}
wyatt_sanford.knowledge = wyatt_sanford_knowledge
wyatt_sanford.performance = wyatt_sanford_performance
wyatt_sanford.media = wyatt_sanford_media
wyatt_sanford.cardMarket = wyatt_sanford_market
wyatt_sanford.marketArchetype = wyatt_sanford_market.marketArchetype
wyatt_sanford.dlr = { performance: wyatt_sanford_performance, media: wyatt_sanford_media, cardMarket: wyatt_sanford_market }
