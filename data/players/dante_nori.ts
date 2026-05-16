import { dante_nori_knowledge } from "./dante_nori_knowledge"
import { dante_nori_performance } from "./dante_nori_performance"
import { dante_nori_media } from "./dante_nori_media"
import { dante_nori_market } from "./dante_nori_market"

export const dante_nori: any = {
  "id": "dante_nori",
  "name": "Dante Nori",
  "fullName": "Dante Nori",
  "team": "Reading Fightin Phils",
  "organization": "Philadelphia Phillies",
  "position": "OF",
  "tier": "AA",
  "level": "AA",
  "age": 22,
  "birthdate": "2004-10-07",
  "school": "Northville HS (MI)",
  "country": "CAN",
  "height": "5' 9\"",
  "weight": 190,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 27,
  "draftOverall": 27,
  "draftBonus": "2.50m",
  "pickValue": "3.23m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.277,
    "H": 38,
    "R": 15,
    "HR": 2,
    "RBI": 14,
    "BB": 8,
    "K": 24,
    "OPS": 0.765
  },
  "pitching": null,
  "tracker": {
    "G": 31,
    "AB": 137,
    "PA": 147,
    "R": 15,
    "H": 38,
    "2B": 8,
    "3B": 4,
    "HR": 2,
    "RBI": 14,
    "BB": 8,
    "K": 24,
    "SB": 7,
    "CS": 6,
    "HBP": 2,
    "SF": 0,
    "AVG": 0.277,
    "OBP": 0.327,
    "SLG": 0.438,
    "OPS": 0.765,
    "lastGame": {
      "g": 31,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-13",
      "opp": "@ New Hampshire Fisher Cats",
      "team": "Reading Fightin Phils",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.277,
    "OPS": 0.765,
    "H": 38,
    "HR": 2,
    "RBI": 14,
    "BB": 8,
    "K": 24,
    "AB": 137,
    "G": 31,
    "SB": 7
  }
}
dante_nori.knowledge = dante_nori_knowledge
dante_nori.performance = dante_nori_performance
dante_nori.media = dante_nori_media
dante_nori.cardMarket = dante_nori_market
dante_nori.marketArchetype = dante_nori_market.marketArchetype
dante_nori.dlr = { performance: dante_nori_performance, media: dante_nori_media, cardMarket: dante_nori_market }
