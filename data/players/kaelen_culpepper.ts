import { kaelen_culpepper_knowledge } from "./kaelen_culpepper_knowledge"
import { kaelen_culpepper_performance } from "./kaelen_culpepper_performance"
import { kaelen_culpepper_media } from "./kaelen_culpepper_media"
import { kaelen_culpepper_market } from "./kaelen_culpepper_market"

export const kaelen_culpepper: any = {
  "id": "kaelen_culpepper",
  "name": "Kaelen Culpepper",
  "fullName": "Kaelen Culpepper",
  "team": "St. Paul Saints",
  "organization": "Minnesota Twins",
  "position": "SS",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-12-29",
  "school": "Kansas State (KS)",
  "country": "USA",
  "height": "5' 10\"",
  "weight": 185,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 21,
  "draftOverall": 21,
  "draftBonus": "3.93m",
  "pickValue": "3.93m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.253,
    "H": 38,
    "R": 29,
    "HR": 8,
    "RBI": 29,
    "BB": 20,
    "K": 35,
    "OPS": 0.805
  },
  "pitching": null,
  "tracker": {
    "G": 36,
    "AB": 150,
    "PA": 174,
    "R": 29,
    "H": 38,
    "2B": 7,
    "3B": 0,
    "HR": 8,
    "RBI": 29,
    "BB": 20,
    "K": 35,
    "SB": 8,
    "CS": 0,
    "HBP": 2,
    "SF": 2,
    "AVG": 0.253,
    "OBP": 0.345,
    "SLG": 0.46,
    "OPS": 0.805,
    "lastGame": {
      "g": 36,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-13",
      "opp": "vs Columbus Clippers",
      "team": "St. Paul Saints",
      "week": "2026-W20",
      "ab": 3,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 2,
      "so": 2,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.253,
    "OPS": 0.805,
    "H": 38,
    "HR": 8,
    "RBI": 29,
    "BB": 20,
    "K": 35,
    "AB": 150,
    "G": 36,
    "SB": 8
  }
}
kaelen_culpepper.knowledge = kaelen_culpepper_knowledge
kaelen_culpepper.performance = kaelen_culpepper_performance
kaelen_culpepper.media = kaelen_culpepper_media
kaelen_culpepper.cardMarket = kaelen_culpepper_market
kaelen_culpepper.marketArchetype = kaelen_culpepper_market.marketArchetype
kaelen_culpepper.dlr = { performance: kaelen_culpepper_performance, media: kaelen_culpepper_media, cardMarket: kaelen_culpepper_market }
