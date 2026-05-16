import { konnor_griffin_knowledge } from "./konnor_griffin_knowledge"
import { konnor_griffin_performance } from "./konnor_griffin_performance"
import { konnor_griffin_media } from "./konnor_griffin_media"
import { konnor_griffin_market } from "./konnor_griffin_market"

export const konnor_griffin: any = {
  "id": "konnor_griffin",
  "name": "Konnor Griffin",
  "fullName": "Konnor Griffin",
  "team": "Indianapolis Indians",
  "organization": "Pittsburgh Pirates",
  "position": "SS",
  "tier": "AAA",
  "level": "AAA",
  "age": 20,
  "birthdate": "2006-04-24",
  "school": "Jackson Prep School (MS)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 222,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 9,
  "draftOverall": 9,
  "draftBonus": "6.53m",
  "pickValue": "6.22m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.275,
    "H": 42,
    "R": 22,
    "HR": 3,
    "RBI": 20,
    "BB": 16,
    "K": 47,
    "OPS": 0.765
  },
  "pitching": null,
  "tracker": {
    "G": 43,
    "AB": 153,
    "PA": 173,
    "R": 22,
    "H": 42,
    "2B": 9,
    "3B": 2,
    "HR": 3,
    "RBI": 20,
    "BB": 16,
    "K": 47,
    "SB": 13,
    "CS": 2,
    "HBP": 2,
    "SF": 2,
    "AVG": 0.275,
    "OBP": 0.347,
    "SLG": 0.418,
    "OPS": 0.765,
    "lastGame": {
      "g": 43,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "vs Colorado Rockies",
      "ab": 4,
      "r": 1,
      "h": 2,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 2,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 2,
      "team": "Pittsburgh Pirates",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "AVG": 0.275,
    "OPS": 0.765,
    "H": 42,
    "HR": 3,
    "RBI": 20,
    "BB": 16,
    "K": 47,
    "AB": 153,
    "G": 43,
    "SB": 13
  }
}

konnor_griffin.knowledge = konnor_griffin_knowledge
konnor_griffin.performance = konnor_griffin_performance
konnor_griffin.media = konnor_griffin_media
konnor_griffin.cardMarket = konnor_griffin_market
konnor_griffin.marketArchetype = konnor_griffin_market.marketArchetype
konnor_griffin.dlr = { performance: konnor_griffin_performance, media: konnor_griffin_media, cardMarket: konnor_griffin_market }
