import { ryan_waldschmidt_knowledge } from "./ryan_waldschmidt_knowledge"
import { ryan_waldschmidt_performance } from "./ryan_waldschmidt_performance"
import { ryan_waldschmidt_media } from "./ryan_waldschmidt_media"
import { ryan_waldschmidt_market } from "./ryan_waldschmidt_market"

export const ryan_waldschmidt: any = {
  "id": "ryan_waldschmidt",
  "name": "Ryan Waldschmidt",
  "fullName": "Ryan Waldschmidt",
  "team": "Arizona Diamondbacks",
  "organization": "Arizona Diamondbacks",
  "position": "CF",
  "tier": "MLB",
  "level": "MLB",
  "age": 24,
  "birthdate": "2002-10-07",
  "school": "Kentucky (KY)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 205,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 31,
  "draftOverall": 31,
  "draftBonus": "2.90m",
  "pickValue": "2.90m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.288,
    "H": 42,
    "R": 31,
    "HR": 3,
    "RBI": 25,
    "BB": 20,
    "K": 43,
    "OPS": 0.857
  },
  "pitching": null,
  "tracker": {
    "G": 40,
    "AB": 146,
    "PA": 174,
    "R": 31,
    "H": 42,
    "2B": 11,
    "3B": 3,
    "HR": 3,
    "RBI": 25,
    "BB": 20,
    "K": 43,
    "SB": 6,
    "CS": 3,
    "HBP": 6,
    "SF": 2,
    "AVG": 0.288,
    "OBP": 0.391,
    "SLG": 0.466,
    "OPS": 0.857,
    "lastGame": {
      "g": 40,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-13",
      "opp": "@ Texas Rangers",
      "team": "Arizona Diamondbacks",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 1,
      "sb": 0,
      "cs": 1,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.288,
    "OPS": 0.857,
    "H": 42,
    "HR": 3,
    "RBI": 25,
    "BB": 20,
    "K": 43,
    "AB": 146,
    "G": 40,
    "SB": 6
  }
}
ryan_waldschmidt.knowledge = ryan_waldschmidt_knowledge
ryan_waldschmidt.performance = ryan_waldschmidt_performance
ryan_waldschmidt.media = ryan_waldschmidt_media
ryan_waldschmidt.cardMarket = ryan_waldschmidt_market
ryan_waldschmidt.marketArchetype = ryan_waldschmidt_market.marketArchetype
ryan_waldschmidt.dlr = { performance: ryan_waldschmidt_performance, media: ryan_waldschmidt_media, cardMarket: ryan_waldschmidt_market }
