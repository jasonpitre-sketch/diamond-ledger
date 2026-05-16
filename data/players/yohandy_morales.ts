import { yohandy_morales_knowledge } from "./yohandy_morales_knowledge"
import { yohandy_morales_performance } from "./yohandy_morales_performance"
import { yohandy_morales_media } from "./yohandy_morales_media"
import { yohandy_morales_market } from "./yohandy_morales_market"

export const yohandy_morales: any = {
  "id": "yohandy_morales",
  "name": "Yohandy Morales",
  "fullName": "Yohandy Morales",
  "team": "Rochester Red Wings",
  "organization": "Washington Nationals",
  "position": "3B",
  "tier": "AAA",
  "level": "AAA",
  "age": 25,
  "birthdate": "2001-10-09",
  "school": "Miami (FL)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 225,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 40,
  "draftOverall": 40,
  "draftBonus": "2.60m",
  "pickValue": "2.14m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.353,
    "H": 48,
    "R": 29,
    "HR": 9,
    "RBI": 25,
    "BB": 19,
    "K": 40,
    "OPS": 1.043
  },
  "pitching": null,
  "tracker": {
    "G": 40,
    "AB": 136,
    "PA": 159,
    "R": 29,
    "H": 48,
    "2B": 7,
    "3B": 0,
    "HR": 9,
    "RBI": 25,
    "BB": 19,
    "K": 40,
    "SB": 2,
    "CS": 1,
    "HBP": 3,
    "SF": 1,
    "AVG": 0.353,
    "OBP": 0.44,
    "SLG": 0.603,
    "OPS": 1.043,
    "lastGame": {
      "g": 40,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Lehigh Valley IronPigs",
      "team": "Rochester Red Wings",
      "week": "2026-W20",
      "ab": 4,
      "r": 2,
      "h": 2,
      "d": 1,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 2,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 3
    }
  },
  "careerAverages": {
    "AVG": 0.353,
    "OPS": 1.043,
    "H": 48,
    "HR": 9,
    "RBI": 25,
    "BB": 19,
    "K": 40,
    "AB": 136,
    "G": 40,
    "SB": 2
  }
}
yohandy_morales.knowledge = yohandy_morales_knowledge
yohandy_morales.performance = yohandy_morales_performance
yohandy_morales.media = yohandy_morales_media
yohandy_morales.cardMarket = yohandy_morales_market
yohandy_morales.marketArchetype = yohandy_morales_market.marketArchetype
yohandy_morales.dlr = { performance: yohandy_morales_performance, media: yohandy_morales_media, cardMarket: yohandy_morales_market }
