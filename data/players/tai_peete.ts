import { tai_peete_knowledge } from "./tai_peete_knowledge"
import { tai_peete_performance } from "./tai_peete_performance"
import { tai_peete_media } from "./tai_peete_media"
import { tai_peete_market } from "./tai_peete_market"

export const tai_peete: any = {
  "id": "tai_peete",
  "name": "Tai Peete",
  "fullName": "Tai Peete",
  "team": "Peoria Chiefs",
  "organization": "Seattle Mariners",
  "position": "OF",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-08-11",
  "school": "Trinity Christian School (GA)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 193,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 30,
  "draftOverall": 30,
  "draftBonus": "2.50m",
  "pickValue": "2.73m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.276,
    "H": 34,
    "R": 22,
    "HR": 5,
    "RBI": 23,
    "BB": 15,
    "K": 44,
    "OPS": 0.892
  },
  "pitching": null,
  "tracker": {
    "G": 28,
    "AB": 123,
    "PA": 138,
    "R": 22,
    "H": 34,
    "2B": 11,
    "3B": 3,
    "HR": 5,
    "RBI": 23,
    "BB": 15,
    "K": 44,
    "SB": 5,
    "CS": 5,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.276,
    "OBP": 0.355,
    "SLG": 0.537,
    "OPS": 0.892,
    "lastGame": {
      "g": 28,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-12",
      "opp": "@ Beloit Sky Carp",
      "team": "Peoria Chiefs",
      "week": "2026-W20",
      "ab": 4,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 2,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.276,
    "OPS": 0.892,
    "H": 34,
    "HR": 5,
    "RBI": 23,
    "BB": 15,
    "K": 44,
    "AB": 123,
    "G": 28,
    "SB": 5
  }
}
tai_peete.knowledge = tai_peete_knowledge
tai_peete.performance = tai_peete_performance
tai_peete.media = tai_peete_media
tai_peete.cardMarket = tai_peete_market
tai_peete.marketArchetype = tai_peete_market.marketArchetype
tai_peete.dlr = { performance: tai_peete_performance, media: tai_peete_media, cardMarket: tai_peete_market }
