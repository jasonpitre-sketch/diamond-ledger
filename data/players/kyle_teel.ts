import { kyle_teel_knowledge } from "./kyle_teel_knowledge"
import { kyle_teel_performance } from "./kyle_teel_performance"
import { kyle_teel_media } from "./kyle_teel_media"
import { kyle_teel_market } from "./kyle_teel_market"

export const kyle_teel: any = {
  "id": "kyle_teel",
  "name": "Kyle Teel",
  "fullName": "Kyle Teel",
  "team": "Charlotte Knights",
  "organization": "Chicago White Sox",
  "position": "C",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-02-15",
  "school": "Virginia (VA)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 210,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 14,
  "draftOverall": 14,
  "draftBonus": "4.00m",
  "pickValue": "4.66m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.25,
    "H": 3,
    "R": 2,
    "HR": 1,
    "RBI": 2,
    "BB": 1,
    "K": 3,
    "OPS": 0.808
  },
  "pitching": null,
  "tracker": {
    "G": 3,
    "AB": 12,
    "PA": 13,
    "R": 2,
    "H": 3,
    "2B": 0,
    "3B": 0,
    "HR": 1,
    "RBI": 2,
    "BB": 1,
    "K": 3,
    "SB": 0,
    "CS": 0,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.25,
    "OBP": 0.308,
    "SLG": 0.5,
    "OPS": 0.808,
    "lastGame": {
      "g": 3,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Norfolk Tides",
      "team": "Charlotte Knights",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.25,
    "OPS": 0.808,
    "H": 3,
    "HR": 1,
    "RBI": 2,
    "BB": 1,
    "K": 3,
    "AB": 12,
    "G": 3,
    "SB": 0
  }
}
kyle_teel.knowledge = kyle_teel_knowledge
kyle_teel.performance = kyle_teel_performance
kyle_teel.media = kyle_teel_media
kyle_teel.cardMarket = kyle_teel_market
kyle_teel.marketArchetype = kyle_teel_market.marketArchetype
kyle_teel.dlr = { performance: kyle_teel_performance, media: kyle_teel_media, cardMarket: kyle_teel_market }
