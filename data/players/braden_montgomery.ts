import { braden_montgomery_knowledge } from "./braden_montgomery_knowledge"
import { braden_montgomery_performance } from "./braden_montgomery_performance"
import { braden_montgomery_media } from "./braden_montgomery_media"
import { braden_montgomery_market } from "./braden_montgomery_market"

export const braden_montgomery: any = {
  "id": "braden_montgomery",
  "name": "Braden Montgomery",
  "fullName": "Braden Montgomery",
  "team": "Charlotte Knights",
  "organization": "Chicago White Sox",
  "position": "OF",
  "tier": "AAA",
  "level": "AAA",
  "age": 23,
  "birthdate": "2003-04-16",
  "school": "Texas A&M (TX)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 220,
  "bats": "S",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 12,
  "draftOverall": 12,
  "draftBonus": "5.00m",
  "pickValue": "5.48m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.309,
    "H": 42,
    "R": 28,
    "HR": 7,
    "RBI": 25,
    "BB": 24,
    "K": 44,
    "OPS": 0.972
  },
  "pitching": null,
  "tracker": {
    "G": 36,
    "AB": 136,
    "PA": 167,
    "R": 28,
    "H": 42,
    "2B": 7,
    "3B": 3,
    "HR": 7,
    "RBI": 25,
    "BB": 24,
    "K": 44,
    "SB": 3,
    "CS": 2,
    "HBP": 3,
    "SF": 4,
    "AVG": 0.309,
    "OBP": 0.413,
    "SLG": 0.559,
    "OPS": 0.972,
    "lastGame": {
      "g": 36,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Norfolk Tides",
      "team": "Charlotte Knights",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 3,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 1,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 3
    }
  },
  "careerAverages": {
    "AVG": 0.309,
    "OPS": 0.972,
    "H": 42,
    "HR": 7,
    "RBI": 25,
    "BB": 24,
    "K": 44,
    "AB": 136,
    "G": 36,
    "SB": 3
  }
}
braden_montgomery.knowledge = braden_montgomery_knowledge
braden_montgomery.performance = braden_montgomery_performance
braden_montgomery.media = braden_montgomery_media
braden_montgomery.cardMarket = braden_montgomery_market
braden_montgomery.marketArchetype = braden_montgomery_market.marketArchetype
braden_montgomery.dlr = { performance: braden_montgomery_performance, media: braden_montgomery_media, cardMarket: braden_montgomery_market }
