import { walker_jenkins_knowledge } from "./walker_jenkins_knowledge"
import { walker_jenkins_performance } from "./walker_jenkins_performance"
import { walker_jenkins_media } from "./walker_jenkins_media"
import { walker_jenkins_market } from "./walker_jenkins_market"

export const walker_jenkins: any = {
  "id": "walker_jenkins",
  "name": "Walker Jenkins",
  "fullName": "Walker Jenkins",
  "team": "St. Paul Saints",
  "organization": "Minnesota Twins",
  "position": "OF",
  "tier": "AAA",
  "level": "AAA",
  "age": 21,
  "birthdate": "2005-02-19",
  "school": "South Brunswick HS (NC)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 210,
  "bats": "L",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 5,
  "draftOverall": 5,
  "draftBonus": "7.14m",
  "pickValue": "7.14m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.256,
    "H": 23,
    "R": 15,
    "HR": 2,
    "RBI": 9,
    "BB": 19,
    "K": 18,
    "OPS": 0.785
  },
  "pitching": null,
  "tracker": {
    "G": 25,
    "AB": 90,
    "PA": 111,
    "R": 15,
    "H": 23,
    "2B": 6,
    "3B": 0,
    "HR": 2,
    "RBI": 9,
    "BB": 19,
    "K": 18,
    "SB": 5,
    "CS": 1,
    "HBP": 2,
    "SF": 0,
    "AVG": 0.256,
    "OBP": 0.396,
    "SLG": 0.389,
    "OPS": 0.785,
    "lastGame": {
      "g": 25,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-03",
      "opp": "vs Iowa Cubs",
      "team": "St. Paul Saints",
      "week": "2026-W18",
      "ab": 2,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.256,
    "OPS": 0.785,
    "H": 23,
    "HR": 2,
    "RBI": 9,
    "BB": 19,
    "K": 18,
    "AB": 90,
    "G": 25,
    "SB": 5
  }
}
walker_jenkins.knowledge = walker_jenkins_knowledge
walker_jenkins.performance = walker_jenkins_performance
walker_jenkins.media = walker_jenkins_media
walker_jenkins.cardMarket = walker_jenkins_market
walker_jenkins.marketArchetype = walker_jenkins_market.marketArchetype
walker_jenkins.dlr = { performance: walker_jenkins_performance, media: walker_jenkins_media, cardMarket: walker_jenkins_market }
