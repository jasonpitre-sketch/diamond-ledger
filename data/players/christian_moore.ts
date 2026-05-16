import { christian_moore_knowledge } from "./christian_moore_knowledge"
import { christian_moore_performance } from "./christian_moore_performance"
import { christian_moore_media } from "./christian_moore_media"
import { christian_moore_market } from "./christian_moore_market"

export const christian_moore: any = {
  "id": "christian_moore",
  "name": "Christian Moore",
  "fullName": "Christian Moore",
  "team": "Salt Lake Bees",
  "organization": "Los Angeles Angels",
  "position": "2B",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-10-21",
  "school": "Tennessee (TN)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 210,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 8,
  "draftOverall": 8,
  "draftBonus": "5.00m",
  "pickValue": "6.50m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.232,
    "H": 19,
    "R": 23,
    "HR": 2,
    "RBI": 15,
    "BB": 29,
    "K": 26,
    "OPS": 0.885
  },
  "pitching": null,
  "tracker": {
    "G": 23,
    "AB": 82,
    "PA": 113,
    "R": 23,
    "H": 19,
    "2B": 6,
    "3B": 3,
    "HR": 2,
    "RBI": 15,
    "BB": 29,
    "K": 26,
    "SB": 4,
    "CS": 3,
    "HBP": 1,
    "SF": 1,
    "AVG": 0.232,
    "OBP": 0.434,
    "SLG": 0.451,
    "OPS": 0.885,
    "lastGame": {
      "g": 23,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-13",
      "opp": "vs El Paso Chihuahuas",
      "ab": 5,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1,
      "team": "Salt Lake Bees",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "AVG": 0.232,
    "OPS": 0.885,
    "H": 19,
    "HR": 2,
    "RBI": 15,
    "BB": 29,
    "K": 26,
    "AB": 82,
    "G": 23,
    "SB": 4
  }
}

christian_moore.knowledge = christian_moore_knowledge
christian_moore.performance = christian_moore_performance
christian_moore.media = christian_moore_media
christian_moore.cardMarket = christian_moore_market
christian_moore.marketArchetype = christian_moore_market.marketArchetype
christian_moore.dlr = { performance: christian_moore_performance, media: christian_moore_media, cardMarket: christian_moore_market }
