import { jacob_gonzalez_knowledge } from "./jacob_gonzalez_knowledge"
import { jacob_gonzalez_performance } from "./jacob_gonzalez_performance"
import { jacob_gonzalez_media } from "./jacob_gonzalez_media"
import { jacob_gonzalez_market } from "./jacob_gonzalez_market"

export const jacob_gonzalez: any = {
  "id": "jacob_gonzalez",
  "name": "Jacob Gonzalez",
  "fullName": "Jacob Gonzalez",
  "team": "Charlotte Knights",
  "organization": "Chicago White Sox",
  "position": "SS",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-05-30",
  "school": "Ole Miss (MS)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 205,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 15,
  "draftOverall": 15,
  "draftBonus": "3.90m",
  "pickValue": "4.49m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.288,
    "H": 42,
    "R": 32,
    "HR": 11,
    "RBI": 39,
    "BB": 31,
    "K": 38,
    "OPS": 0.992
  },
  "pitching": null,
  "tracker": {
    "G": 39,
    "AB": 146,
    "PA": 180,
    "R": 32,
    "H": 42,
    "2B": 7,
    "3B": 1,
    "HR": 11,
    "RBI": 39,
    "BB": 31,
    "K": 38,
    "SB": 6,
    "CS": 3,
    "HBP": 2,
    "SF": 1,
    "AVG": 0.288,
    "OBP": 0.417,
    "SLG": 0.575,
    "OPS": 0.992,
    "lastGame": {
      "g": 39,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-13",
      "opp": "vs Norfolk Tides",
      "team": "Charlotte Knights",
      "week": "2026-W20",
      "ab": 5,
      "r": 1,
      "h": 2,
      "d": 0,
      "t": 0,
      "hr": 1,
      "rbi": 3,
      "bb": 0,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 5
    }
  },
  "careerAverages": {
    "AVG": 0.288,
    "OPS": 0.992,
    "H": 42,
    "HR": 11,
    "RBI": 39,
    "BB": 31,
    "K": 38,
    "AB": 146,
    "G": 39,
    "SB": 6
  }
}
jacob_gonzalez.knowledge = jacob_gonzalez_knowledge
jacob_gonzalez.performance = jacob_gonzalez_performance
jacob_gonzalez.media = jacob_gonzalez_media
jacob_gonzalez.cardMarket = jacob_gonzalez_market
jacob_gonzalez.marketArchetype = jacob_gonzalez_market.marketArchetype
jacob_gonzalez.dlr = { performance: jacob_gonzalez_performance, media: jacob_gonzalez_media, cardMarket: jacob_gonzalez_market }
