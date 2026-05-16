import { walker_janek_knowledge } from "./walker_janek_knowledge"
import { walker_janek_performance } from "./walker_janek_performance"
import { walker_janek_media } from "./walker_janek_media"
import { walker_janek_market } from "./walker_janek_market"

export const walker_janek: any = {
  "id": "walker_janek",
  "name": "Walker Janek",
  "fullName": "Walker Janek",
  "team": "Corpus Christi Hooks",
  "organization": "Houston Astros",
  "position": "C",
  "tier": "AA",
  "level": "AA",
  "age": 24,
  "birthdate": "2002-09-24",
  "school": "Sam Houston (TX)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 28,
  "draftOverall": 28,
  "draftBonus": "3.13m",
  "pickValue": "3.13m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.135,
    "H": 10,
    "R": 7,
    "HR": 1,
    "RBI": 11,
    "BB": 4,
    "K": 28,
    "OPS": 0.395
  },
  "pitching": null,
  "tracker": {
    "G": 19,
    "AB": 74,
    "PA": 78,
    "R": 7,
    "H": 10,
    "2B": 3,
    "3B": 0,
    "HR": 1,
    "RBI": 11,
    "BB": 4,
    "K": 28,
    "SB": 4,
    "CS": 0,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.135,
    "OBP": 0.179,
    "SLG": 0.216,
    "OPS": 0.395,
    "lastGame": {
      "g": 19,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-01",
      "opp": "vs Frisco RoughRiders",
      "team": "Corpus Christi Hooks",
      "week": "2026-W18",
      "ab": 1,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 0,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.135,
    "OPS": 0.395,
    "H": 10,
    "HR": 1,
    "RBI": 11,
    "BB": 4,
    "K": 28,
    "AB": 74,
    "G": 19,
    "SB": 4
  }
}
walker_janek.knowledge = walker_janek_knowledge
walker_janek.performance = walker_janek_performance
walker_janek.media = walker_janek_media
walker_janek.cardMarket = walker_janek_market
walker_janek.marketArchetype = walker_janek_market.marketArchetype
walker_janek.dlr = { performance: walker_janek_performance, media: walker_janek_media, cardMarket: walker_janek_market }
