import { tommy_white_knowledge } from "./tommy_white_knowledge"
import { tommy_white_performance } from "./tommy_white_performance"
import { tommy_white_media } from "./tommy_white_media"
import { tommy_white_market } from "./tommy_white_market"

export const tommy_white: any = {
  "id": "tommy_white",
  "name": "Tommy White",
  "fullName": "Tommy White",
  "team": "Las Vegas Aviators",
  "organization": "Athletics",
  "position": "3B",
  "tier": "AAA",
  "level": "AAA",
  "age": 23,
  "birthdate": "2003-03-02",
  "school": "LSU (LA)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 220,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 40,
  "draftOverall": 40,
  "draftBonus": "3.00m",
  "pickValue": "2.33m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.313,
    "H": 42,
    "R": 16,
    "HR": 2,
    "RBI": 25,
    "BB": 9,
    "K": 18,
    "OPS": 0.792
  },
  "pitching": null,
  "tracker": {
    "G": 33,
    "AB": 134,
    "PA": 147,
    "R": 16,
    "H": 42,
    "2B": 9,
    "3B": 0,
    "HR": 2,
    "RBI": 25,
    "BB": 9,
    "K": 18,
    "SB": 1,
    "CS": 3,
    "HBP": 3,
    "SF": 1,
    "AVG": 0.313,
    "OBP": 0.367,
    "SLG": 0.425,
    "OPS": 0.792,
    "lastGame": {
      "g": 33,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-13",
      "opp": "@ Reno Aces",
      "team": "Las Vegas Aviators",
      "week": "2026-W20",
      "ab": 5,
      "r": 1,
      "h": 2,
      "d": 1,
      "t": 0,
      "hr": 0,
      "rbi": 2,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 3
    }
  },
  "careerAverages": {
    "AVG": 0.313,
    "OPS": 0.792,
    "H": 42,
    "HR": 2,
    "RBI": 25,
    "BB": 9,
    "K": 18,
    "AB": 134,
    "G": 33,
    "SB": 1
  }
}
tommy_white.knowledge = tommy_white_knowledge
tommy_white.performance = tommy_white_performance
tommy_white.media = tommy_white_media
tommy_white.cardMarket = tommy_white_market
tommy_white.marketArchetype = tommy_white_market.marketArchetype
tommy_white.dlr = { performance: tommy_white_performance, media: tommy_white_media, cardMarket: tommy_white_market }
