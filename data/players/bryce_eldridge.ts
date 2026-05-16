import { bryce_eldridge_knowledge } from "./bryce_eldridge_knowledge"
import { bryce_eldridge_performance } from "./bryce_eldridge_performance"
import { bryce_eldridge_media } from "./bryce_eldridge_media"
import { bryce_eldridge_market } from "./bryce_eldridge_market"

export const bryce_eldridge: any = {
  "id": "bryce_eldridge",
  "name": "Bryce Eldridge",
  "fullName": "Bryce Eldridge",
  "team": "San Francisco Giants",
  "organization": "San Francisco Giants",
  "position": "DH",
  "tier": "MLB",
  "level": "MLB",
  "age": 22,
  "birthdate": "2004-10-20",
  "school": "James Madison HS (VA)",
  "country": "USA",
  "height": "6' 7\"",
  "weight": 251,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 16,
  "draftOverall": 16,
  "draftBonus": "4.00m",
  "pickValue": "4.33m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.296,
    "H": 40,
    "R": 26,
    "HR": 6,
    "RBI": 23,
    "BB": 22,
    "K": 50,
    "OPS": 0.88
  },
  "pitching": null,
  "tracker": {
    "G": 37,
    "AB": 135,
    "PA": 160,
    "R": 26,
    "H": 40,
    "2B": 6,
    "3B": 0,
    "HR": 6,
    "RBI": 23,
    "BB": 22,
    "K": 50,
    "SB": 0,
    "CS": 0,
    "HBP": 3,
    "SF": 0,
    "AVG": 0.296,
    "OBP": 0.406,
    "SLG": 0.474,
    "OPS": 0.88,
    "lastGame": {
      "g": 37,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-13",
      "opp": "@ Los Angeles Dodgers",
      "team": "San Francisco Giants",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 3,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.296,
    "OPS": 0.88,
    "H": 40,
    "HR": 6,
    "RBI": 23,
    "BB": 22,
    "K": 50,
    "AB": 135,
    "G": 37,
    "SB": 0
  }
}
bryce_eldridge.knowledge = bryce_eldridge_knowledge
bryce_eldridge.performance = bryce_eldridge_performance
bryce_eldridge.media = bryce_eldridge_media
bryce_eldridge.cardMarket = bryce_eldridge_market
bryce_eldridge.marketArchetype = bryce_eldridge_market.marketArchetype
bryce_eldridge.dlr = { performance: bryce_eldridge_performance, media: bryce_eldridge_media, cardMarket: bryce_eldridge_market }
