import { brock_wilken_knowledge } from "./brock_wilken_knowledge"
import { brock_wilken_performance } from "./brock_wilken_performance"
import { brock_wilken_media } from "./brock_wilken_media"
import { brock_wilken_market } from "./brock_wilken_market"

export const brock_wilken: any = {
  "id": "brock_wilken",
  "name": "Brock Wilken",
  "fullName": "Brock Wilken",
  "team": "Nashville Sounds",
  "organization": "Milwaukee Brewers",
  "position": "3B",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-06-17",
  "school": "Wake Forest (NC)",
  "country": "USA",
  "height": "6' 4\"",
  "weight": 237,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 18,
  "draftOverall": 18,
  "draftBonus": "3.15m",
  "pickValue": "4.02m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.188,
    "H": 25,
    "R": 17,
    "HR": 2,
    "RBI": 25,
    "BB": 28,
    "K": 47,
    "OPS": 0.656
  },
  "pitching": null,
  "tracker": {
    "G": 40,
    "AB": 133,
    "PA": 166,
    "R": 17,
    "H": 25,
    "2B": 9,
    "3B": 2,
    "HR": 2,
    "RBI": 25,
    "BB": 28,
    "K": 47,
    "SB": 4,
    "CS": 0,
    "HBP": 1,
    "SF": 4,
    "AVG": 0.188,
    "OBP": 0.325,
    "SLG": 0.331,
    "OPS": 0.656,
    "lastGame": {
      "g": 40,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Iowa Cubs",
      "team": "Nashville Sounds",
      "week": "2026-W20",
      "ab": 3,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 1,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 1,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.188,
    "OPS": 0.656,
    "H": 25,
    "HR": 2,
    "RBI": 25,
    "BB": 28,
    "K": 47,
    "AB": 133,
    "G": 40,
    "SB": 4
  }
}
brock_wilken.knowledge = brock_wilken_knowledge
brock_wilken.performance = brock_wilken_performance
brock_wilken.media = brock_wilken_media
brock_wilken.cardMarket = brock_wilken_market
brock_wilken.marketArchetype = brock_wilken_market.marketArchetype
brock_wilken.dlr = { performance: brock_wilken_performance, media: brock_wilken_media, cardMarket: brock_wilken_market }
