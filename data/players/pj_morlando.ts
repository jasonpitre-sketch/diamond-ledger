import { pj_morlando_knowledge } from "./pj_morlando_knowledge"
import { pj_morlando_performance } from "./pj_morlando_performance"
import { pj_morlando_media } from "./pj_morlando_media"
import { pj_morlando_market } from "./pj_morlando_market"

export const pj_morlando: any = {
  "id": "pj_morlando",
  "name": "PJ Morlando",
  "fullName": "PJ Morlando",
  "team": "Jupiter Hammerheads",
  "organization": "Miami Marlins",
  "position": "OF",
  "tier": "A",
  "level": "A",
  "age": 21,
  "birthdate": "2005-05-16",
  "school": "Summerville HS (SC)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 198,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 16,
  "draftOverall": 16,
  "draftBonus": "3.40m",
  "pickValue": "4.70m",
  "competitionLevel": "A",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.198,
    "H": 22,
    "R": 18,
    "HR": 3,
    "RBI": 15,
    "BB": 26,
    "K": 35,
    "OPS": 0.677
  },
  "pitching": null,
  "tracker": {
    "G": 32,
    "AB": 111,
    "PA": 141,
    "R": 18,
    "H": 22,
    "2B": 4,
    "3B": 0,
    "HR": 3,
    "RBI": 15,
    "BB": 26,
    "K": 35,
    "SB": 1,
    "CS": 0,
    "HBP": 3,
    "SF": 1,
    "AVG": 0.198,
    "OBP": 0.362,
    "SLG": 0.315,
    "OPS": 0.677,
    "lastGame": {
      "g": 32,
      "sport": 14,
      "level": "A",
      "date": "2026-05-14",
      "opp": "@ St. Lucie Mets",
      "team": "Jupiter Hammerheads",
      "week": "2026-W20",
      "ab": 2,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 3,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.198,
    "OPS": 0.677,
    "H": 22,
    "HR": 3,
    "RBI": 15,
    "BB": 26,
    "K": 35,
    "AB": 111,
    "G": 32,
    "SB": 1
  }
}
pj_morlando.knowledge = pj_morlando_knowledge
pj_morlando.performance = pj_morlando_performance
pj_morlando.media = pj_morlando_media
pj_morlando.cardMarket = pj_morlando_market
pj_morlando.marketArchetype = pj_morlando_market.marketArchetype
pj_morlando.dlr = { performance: pj_morlando_performance, media: pj_morlando_media, cardMarket: pj_morlando_market }
