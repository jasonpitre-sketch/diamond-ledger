import { blake_mitchell_knowledge } from "./blake_mitchell_knowledge"
import { blake_mitchell_performance } from "./blake_mitchell_performance"
import { blake_mitchell_media } from "./blake_mitchell_media"
import { blake_mitchell_market } from "./blake_mitchell_market"

export const blake_mitchell: any = {
  "id": "blake_mitchell",
  "name": "Blake Mitchell",
  "fullName": "Blake Mitchell",
  "team": "Quad Cities River Bandits",
  "organization": "Kansas City Royals",
  "position": "C",
  "tier": "A+",
  "level": "A+",
  "age": 22,
  "birthdate": "2004-08-03",
  "school": "Sinton HS (TX)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 202,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 8,
  "draftOverall": 8,
  "draftBonus": "4.90m",
  "pickValue": "5.98m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.196,
    "H": 18,
    "R": 27,
    "HR": 7,
    "RBI": 16,
    "BB": 38,
    "K": 45,
    "OPS": 0.879
  },
  "pitching": null,
  "tracker": {
    "G": 31,
    "AB": 92,
    "PA": 134,
    "R": 27,
    "H": 18,
    "2B": 2,
    "3B": 0,
    "HR": 7,
    "RBI": 16,
    "BB": 38,
    "K": 45,
    "SB": 7,
    "CS": 3,
    "HBP": 2,
    "SF": 2,
    "AVG": 0.196,
    "OBP": 0.433,
    "SLG": 0.446,
    "OPS": 0.879,
    "lastGame": {
      "g": 31,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Lansing Lugnuts",
      "team": "Quad Cities River Bandits",
      "week": "2026-W20",
      "ab": 4,
      "r": 1,
      "h": 2,
      "d": 1,
      "t": 0,
      "hr": 1,
      "rbi": 1,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 6
    }
  },
  "careerAverages": {
    "AVG": 0.196,
    "OPS": 0.879,
    "H": 18,
    "HR": 7,
    "RBI": 16,
    "BB": 38,
    "K": 45,
    "AB": 92,
    "G": 31,
    "SB": 7
  }
}
blake_mitchell.knowledge = blake_mitchell_knowledge
blake_mitchell.performance = blake_mitchell_performance
blake_mitchell.media = blake_mitchell_media
blake_mitchell.cardMarket = blake_mitchell_market
blake_mitchell.marketArchetype = blake_mitchell_market.marketArchetype
blake_mitchell.dlr = { performance: blake_mitchell_performance, media: blake_mitchell_media, cardMarket: blake_mitchell_market }
