import { theo_gillen_knowledge } from "./theo_gillen_knowledge"
import { theo_gillen_performance } from "./theo_gillen_performance"
import { theo_gillen_media } from "./theo_gillen_media"
import { theo_gillen_market } from "./theo_gillen_market"

export const theo_gillen: any = {
  "id": "theo_gillen",
  "name": "Theo Gillen",
  "fullName": "Theo Gillen",
  "team": "Bowling Green Hot Rods",
  "organization": "Tampa Bay Rays",
  "position": "OF",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-09-12",
  "school": "Westlake HS (TX)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 195,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 18,
  "draftOverall": 18,
  "draftBonus": "4.37m",
  "pickValue": "4.37m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.277,
    "H": 26,
    "R": 24,
    "HR": 8,
    "RBI": 23,
    "BB": 17,
    "K": 30,
    "OPS": 0.991
  },
  "pitching": null,
  "tracker": {
    "G": 27,
    "AB": 94,
    "PA": 114,
    "R": 24,
    "H": 26,
    "2B": 4,
    "3B": 1,
    "HR": 8,
    "RBI": 23,
    "BB": 17,
    "K": 30,
    "SB": 13,
    "CS": 2,
    "HBP": 2,
    "SF": 1,
    "AVG": 0.277,
    "OBP": 0.395,
    "SLG": 0.596,
    "OPS": 0.991,
    "lastGame": {
      "g": 27,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Greenville Drive",
      "team": "Bowling Green Hot Rods",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 3,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.277,
    "OPS": 0.991,
    "H": 26,
    "HR": 8,
    "RBI": 23,
    "BB": 17,
    "K": 30,
    "AB": 94,
    "G": 27,
    "SB": 13
  }
}
theo_gillen.knowledge = theo_gillen_knowledge
theo_gillen.performance = theo_gillen_performance
theo_gillen.media = theo_gillen_media
theo_gillen.cardMarket = theo_gillen_market
theo_gillen.marketArchetype = theo_gillen_market.marketArchetype
theo_gillen.dlr = { performance: theo_gillen_performance, media: theo_gillen_media, cardMarket: theo_gillen_market }
