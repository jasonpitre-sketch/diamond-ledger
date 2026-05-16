import { blake_burke_knowledge } from "./blake_burke_knowledge"
import { blake_burke_performance } from "./blake_burke_performance"
import { blake_burke_media } from "./blake_burke_media"
import { blake_burke_market } from "./blake_burke_market"

export const blake_burke: any = {
  "id": "blake_burke",
  "name": "Blake Burke",
  "fullName": "Blake Burke",
  "team": "Biloxi Shuckers",
  "organization": "Milwaukee Brewers",
  "position": "1B",
  "tier": "AA",
  "level": "AA",
  "age": 23,
  "birthdate": "2003-06-11",
  "school": "Tennessee (TN)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 236,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 34,
  "draftOverall": 34,
  "draftBonus": "2.10m",
  "pickValue": "2.70m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.255,
    "H": 36,
    "R": 26,
    "HR": 11,
    "RBI": 26,
    "BB": 16,
    "K": 40,
    "OPS": 0.9
  },
  "pitching": null,
  "tracker": {
    "G": 35,
    "AB": 141,
    "PA": 159,
    "R": 26,
    "H": 36,
    "2B": 8,
    "3B": 1,
    "HR": 11,
    "RBI": 26,
    "BB": 16,
    "K": 40,
    "SB": 12,
    "CS": 2,
    "HBP": 2,
    "SF": 0,
    "AVG": 0.255,
    "OBP": 0.34,
    "SLG": 0.56,
    "OPS": 0.9,
    "lastGame": {
      "g": 35,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "@ Montgomery Biscuits",
      "team": "Biloxi Shuckers",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 3,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 3
    }
  },
  "careerAverages": {
    "AVG": 0.255,
    "OPS": 0.9,
    "H": 36,
    "HR": 11,
    "RBI": 26,
    "BB": 16,
    "K": 40,
    "AB": 141,
    "G": 35,
    "SB": 12
  }
}
blake_burke.knowledge = blake_burke_knowledge
blake_burke.performance = blake_burke_performance
blake_burke.media = blake_burke_media
blake_burke.cardMarket = blake_burke_market
blake_burke.marketArchetype = blake_burke_market.marketArchetype
blake_burke.dlr = { performance: blake_burke_performance, media: blake_burke_media, cardMarket: blake_burke_market }
