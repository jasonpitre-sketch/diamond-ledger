import { kemp_alderman_knowledge } from "./kemp_alderman_knowledge"
import { kemp_alderman_performance } from "./kemp_alderman_performance"
import { kemp_alderman_media } from "./kemp_alderman_media"
import { kemp_alderman_market } from "./kemp_alderman_market"

export const kemp_alderman: any = {
  "id": "kemp_alderman",
  "name": "Kemp Alderman",
  "fullName": "Kemp Alderman",
  "team": "Jacksonville Jumbo Shrimp",
  "organization": "Miami Marlins",
  "position": "OF",
  "tier": "AAA",
  "level": "AAA",
  "age": 23,
  "birthdate": "2002-08-20",
  "school": "Ole Miss (MS)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 235,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 47,
  "draftOverall": 47,
  "draftBonus": "1.40m",
  "pickValue": "1.83m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.308,
    "H": 44,
    "R": 27,
    "HR": 7,
    "RBI": 20,
    "BB": 13,
    "K": 51,
    "OPS": 0.889
  },
  "pitching": null,
  "tracker": {
    "G": 38,
    "AB": 143,
    "PA": 161,
    "R": 27,
    "H": 44,
    "2B": 5,
    "3B": 1,
    "HR": 7,
    "RBI": 20,
    "BB": 13,
    "K": 51,
    "SB": 5,
    "CS": 1,
    "HBP": 5,
    "SF": 0,
    "TB": 72,
    "AVG": 0.308,
    "OBP": 0.385,
    "SLG": 0.503,
    "OPS": 0.889,
    "lastGame": {
      "g": 38,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "@ Memphis Redbirds",
      "team": "Jacksonville Jumbo Shrimp",
      "week": "2026-W20",
      "ab": 5,
      "r": 0,
      "h": 4,
      "d": 1,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 5
    }
  },
  "careerAverages": {
    "AVG": 0.308,
    "H": 44,
    "R": 27,
    "HR": 7,
    "RBI": 20,
    "BB": 13,
    "K": 51,
    "OPS": 0.889,
    "AB": 143,
    "G": 38,
    "SB": 5
  }
}
kemp_alderman.knowledge = kemp_alderman_knowledge
kemp_alderman.performance = kemp_alderman_performance
kemp_alderman.media = kemp_alderman_media
kemp_alderman.cardMarket = kemp_alderman_market
kemp_alderman.marketArchetype = kemp_alderman_market.marketArchetype
kemp_alderman.dlr = { performance: kemp_alderman_performance, media: kemp_alderman_media, cardMarket: kemp_alderman_market }
