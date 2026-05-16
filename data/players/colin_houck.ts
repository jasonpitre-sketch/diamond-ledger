import { colin_houck_knowledge } from "./colin_houck_knowledge"
import { colin_houck_performance } from "./colin_houck_performance"
import { colin_houck_media } from "./colin_houck_media"
import { colin_houck_market } from "./colin_houck_market"

export const colin_houck: any = {
  "id": "colin_houck",
  "name": "Colin Houck",
  "fullName": "Colin Houck",
  "team": "Brooklyn Cyclones",
  "organization": "New York Mets",
  "position": "SS",
  "tier": "A+",
  "level": "A+",
  "age": 22,
  "birthdate": "2004-09-30",
  "school": "Parkview HS (GA)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 32,
  "draftOverall": 32,
  "draftBonus": "2.75m",
  "pickValue": "2.61m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.219,
    "H": 25,
    "R": 10,
    "HR": 2,
    "RBI": 10,
    "BB": 8,
    "K": 53,
    "OPS": 0.611
  },
  "pitching": null,
  "tracker": {
    "G": 31,
    "AB": 114,
    "PA": 126,
    "R": 10,
    "H": 25,
    "2B": 7,
    "3B": 0,
    "HR": 2,
    "RBI": 10,
    "BB": 8,
    "K": 53,
    "SB": 2,
    "CS": 1,
    "HBP": 2,
    "SF": 2,
    "AVG": 0.219,
    "OBP": 0.278,
    "SLG": 0.333,
    "OPS": 0.611,
    "lastGame": {
      "g": 31,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Rome Emperors",
      "team": "Brooklyn Cyclones",
      "week": "2026-W20",
      "ab": 4,
      "r": 1,
      "h": 1,
      "d": 1,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 1,
      "sf": 0,
      "tb": 2
    }
  },
  "careerAverages": {
    "AVG": 0.219,
    "OPS": 0.611,
    "H": 25,
    "HR": 2,
    "RBI": 10,
    "BB": 8,
    "K": 53,
    "AB": 114,
    "G": 31,
    "SB": 2
  }
}
colin_houck.knowledge = colin_houck_knowledge
colin_houck.performance = colin_houck_performance
colin_houck.media = colin_houck_media
colin_houck.cardMarket = colin_houck_market
colin_houck.marketArchetype = colin_houck_market.marketArchetype
colin_houck.dlr = { performance: colin_houck_performance, media: colin_houck_media, cardMarket: colin_houck_market }
