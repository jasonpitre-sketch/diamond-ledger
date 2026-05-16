import { jacob_wilson_knowledge } from "./jacob_wilson_knowledge"
import { jacob_wilson_performance } from "./jacob_wilson_performance"
import { jacob_wilson_media } from "./jacob_wilson_media"
import { jacob_wilson_market } from "./jacob_wilson_market"

export const jacob_wilson: any = {
  "id": "jacob_wilson",
  "name": "Jacob Wilson",
  "fullName": "Jacob Wilson",
  "team": "Athletics",
  "organization": "Athletics",
  "position": "SS",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-03-30",
  "school": "Grand Canyon University (AZ)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 6,
  "draftOverall": 6,
  "draftBonus": "5.50m",
  "pickValue": "6.63m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.292,
    "H": 47,
    "R": 18,
    "HR": 3,
    "RBI": 19,
    "BB": 5,
    "K": 20,
    "OPS": 0.709
  },
  "pitching": null,
  "tracker": {
    "G": 39,
    "AB": 161,
    "PA": 167,
    "R": 18,
    "H": 47,
    "2B": 8,
    "3B": 0,
    "HR": 3,
    "RBI": 19,
    "BB": 5,
    "K": 20,
    "SB": 2,
    "CS": 0,
    "HBP": 0,
    "SF": 1,
    "AVG": 0.292,
    "OBP": 0.311,
    "SLG": 0.398,
    "OPS": 0.709,
    "lastGame": {
      "g": 39,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-10",
      "opp": "@ Baltimore Orioles",
      "team": "Athletics",
      "week": "2026-W19",
      "ab": 2,
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
    "AVG": 0.292,
    "OPS": 0.709,
    "H": 47,
    "HR": 3,
    "RBI": 19,
    "BB": 5,
    "K": 20,
    "AB": 161,
    "G": 39,
    "SB": 2
  }
}
jacob_wilson.knowledge = jacob_wilson_knowledge
jacob_wilson.performance = jacob_wilson_performance
jacob_wilson.media = jacob_wilson_media
jacob_wilson.cardMarket = jacob_wilson_market
jacob_wilson.marketArchetype = jacob_wilson_market.marketArchetype
jacob_wilson.dlr = { performance: jacob_wilson_performance, media: jacob_wilson_media, cardMarket: jacob_wilson_market }
