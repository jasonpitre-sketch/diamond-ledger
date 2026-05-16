import { jd_dix_knowledge } from "./jd_dix_knowledge"
import { jd_dix_performance } from "./jd_dix_performance"
import { jd_dix_media } from "./jd_dix_media"
import { jd_dix_market } from "./jd_dix_market"

export const jd_dix: any = {
  "id": "jd_dix",
  "name": "JD Dix",
  "fullName": "JD Dix",
  "team": "Visalia Rawhide",
  "organization": "Arizona Diamondbacks",
  "position": "SS",
  "tier": "A",
  "level": "A",
  "age": 21,
  "birthdate": "2005-10-12",
  "school": "Whitefish Bay HS (WI)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 180,
  "bats": "S",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 35,
  "draftOverall": 35,
  "draftBonus": "2.15m",
  "pickValue": "2.63m",
  "competitionLevel": "A",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.236,
    "H": 26,
    "R": 31,
    "HR": 5,
    "RBI": 16,
    "BB": 18,
    "K": 28,
    "OPS": 0.785
  },
  "pitching": null,
  "tracker": {
    "G": 28,
    "AB": 110,
    "PA": 134,
    "R": 31,
    "H": 26,
    "2B": 4,
    "3B": 1,
    "HR": 5,
    "RBI": 16,
    "BB": 18,
    "K": 28,
    "SB": 12,
    "CS": 0,
    "HBP": 4,
    "SF": 2,
    "AVG": 0.236,
    "OBP": 0.358,
    "SLG": 0.427,
    "OPS": 0.785,
    "lastGame": {
      "g": 28,
      "sport": 14,
      "level": "A",
      "date": "2026-05-12",
      "opp": "@ Fresno Grizzlies",
      "team": "Visalia Rawhide",
      "week": "2026-W20",
      "ab": 4,
      "r": 2,
      "h": 2,
      "d": 1,
      "t": 0,
      "hr": 1,
      "rbi": 2,
      "bb": 1,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 6
    }
  },
  "careerAverages": {
    "AVG": 0.236,
    "OPS": 0.785,
    "H": 26,
    "HR": 5,
    "RBI": 16,
    "BB": 18,
    "K": 28,
    "AB": 110,
    "G": 28,
    "SB": 12
  }
}
jd_dix.knowledge = jd_dix_knowledge
jd_dix.performance = jd_dix_performance
jd_dix.media = jd_dix_media
jd_dix.cardMarket = jd_dix_market
jd_dix.marketArchetype = jd_dix_market.marketArchetype
jd_dix.dlr = { performance: jd_dix_performance, media: jd_dix_media, cardMarket: jd_dix_market }
