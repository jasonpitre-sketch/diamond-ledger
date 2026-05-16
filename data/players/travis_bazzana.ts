import { travis_bazzana_knowledge } from "./travis_bazzana_knowledge"
import { travis_bazzana_performance } from "./travis_bazzana_performance"
import { travis_bazzana_media } from "./travis_bazzana_media"
import { travis_bazzana_market } from "./travis_bazzana_market"

export const travis_bazzana: any = {
  "id": "travis_bazzana",
  "name": "Travis Bazzana",
  "fullName": "Travis Bazzana",
  "team": "Columbus Clippers",
  "organization": "Cleveland Guardians",
  "position": "2B",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-08-28",
  "school": "Oregon State (OR)",
  "country": "Australia",
  "height": "5' 11\"",
  "weight": 199,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 1,
  "draftOverall": 1,
  "draftBonus": "8.95m",
  "pickValue": "10.57m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.266,
    "H": 37,
    "R": 25,
    "HR": 3,
    "RBI": 16,
    "BB": 33,
    "K": 34,
    "OPS": 0.863
  },
  "pitching": null,
  "tracker": {
    "G": 38,
    "AB": 139,
    "PA": 175,
    "R": 25,
    "H": 37,
    "2B": 12,
    "3B": 2,
    "HR": 3,
    "RBI": 16,
    "BB": 33,
    "K": 34,
    "SB": 15,
    "CS": 2,
    "HBP": 3,
    "SF": 0,
    "AVG": 0.266,
    "OBP": 0.417,
    "SLG": 0.446,
    "OPS": 0.863,
    "lastGame": {
      "g": 38,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-13",
      "opp": "vs Los Angeles Angels",
      "ab": 4,
      "r": 0,
      "h": 2,
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
      "tb": 2,
      "team": "Cleveland Guardians",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "AVG": 0.266,
    "OPS": 0.863,
    "H": 37,
    "HR": 3,
    "RBI": 16,
    "BB": 33,
    "K": 34,
    "AB": 139,
    "G": 38,
    "SB": 15
  }
}

travis_bazzana.knowledge = travis_bazzana_knowledge
travis_bazzana.performance = travis_bazzana_performance
travis_bazzana.media = travis_bazzana_media
travis_bazzana.cardMarket = travis_bazzana_market
travis_bazzana.marketArchetype = travis_bazzana_market.marketArchetype
travis_bazzana.dlr = { performance: travis_bazzana_performance, media: travis_bazzana_media, cardMarket: travis_bazzana_market }
