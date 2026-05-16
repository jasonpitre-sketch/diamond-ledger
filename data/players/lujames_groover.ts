import { lujames_groover_knowledge } from "./lujames_groover_knowledge"
import { lujames_groover_performance } from "./lujames_groover_performance"
import { lujames_groover_media } from "./lujames_groover_media"
import { lujames_groover_market } from "./lujames_groover_market"

export const lujames_groover: any = {
  "id": "lujames_groover",
  "name": "LuJames Groover",
  "fullName": "LuJames Groover",
  "team": "Reno Aces",
  "organization": "Arizona Diamondbacks",
  "position": "3B",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-04-16",
  "school": "NC State (NC)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 212,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 48,
  "draftOverall": 48,
  "draftBonus": "1.78m",
  "pickValue": "1.78m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.312,
    "H": 48,
    "R": 26,
    "HR": 1,
    "RBI": 32,
    "BB": 29,
    "K": 30,
    "OPS": 0.831
  },
  "pitching": null,
  "tracker": {
    "G": 41,
    "AB": 154,
    "PA": 190,
    "R": 26,
    "H": 48,
    "2B": 11,
    "3B": 1,
    "HR": 1,
    "RBI": 32,
    "BB": 29,
    "K": 30,
    "SB": 1,
    "CS": 0,
    "HBP": 2,
    "SF": 5,
    "TB": 64,
    "AVG": 0.312,
    "OBP": 0.416,
    "SLG": 0.416,
    "OPS": 0.831,
    "lastGame": {
      "g": 41,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Las Vegas Aviators",
      "team": "Reno Aces",
      "week": "2026-W20",
      "ab": 4,
      "r": 1,
      "h": 1,
      "d": 1,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 2
    }
  },
  "careerAverages": {
    "AVG": 0.312,
    "H": 48,
    "R": 26,
    "HR": 1,
    "RBI": 32,
    "BB": 29,
    "K": 30,
    "OPS": 0.831,
    "AB": 154,
    "G": 41,
    "SB": 1
  }
}
lujames_groover.knowledge = lujames_groover_knowledge
lujames_groover.performance = lujames_groover_performance
lujames_groover.media = lujames_groover_media
lujames_groover.cardMarket = lujames_groover_market
lujames_groover.marketArchetype = lujames_groover_market.marketArchetype
lujames_groover.dlr = { performance: lujames_groover_performance, media: lujames_groover_media, cardMarket: lujames_groover_market }
