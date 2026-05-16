import { dylan_crews_knowledge } from "./dylan_crews_knowledge"
import { dylan_crews_performance } from "./dylan_crews_performance"
import { dylan_crews_media } from "./dylan_crews_media"
import { dylan_crews_market } from "./dylan_crews_market"

export const dylan_crews: any = {
  "id": "dylan_crews",
  "name": "Dylan Crews",
  "fullName": "Dylan Crews",
  "team": "Rochester Red Wings",
  "organization": "Washington Nationals",
  "position": "RF",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-02-26",
  "school": "LSU (LA)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 203,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 2,
  "draftOverall": 2,
  "draftBonus": "9.00m",
  "pickValue": "9.00m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.257,
    "H": 38,
    "R": 28,
    "HR": 5,
    "RBI": 20,
    "BB": 19,
    "K": 41,
    "OPS": 0.773
  },
  "pitching": null,
  "tracker": {
    "G": 39,
    "AB": 148,
    "PA": 170,
    "R": 28,
    "H": 38,
    "2B": 8,
    "3B": 1,
    "HR": 5,
    "RBI": 20,
    "BB": 19,
    "K": 41,
    "SB": 7,
    "CS": 2,
    "HBP": 2,
    "SF": 1,
    "AVG": 0.257,
    "OBP": 0.347,
    "SLG": 0.426,
    "OPS": 0.773,
    "lastGame": {
      "g": 39,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Lehigh Valley IronPigs",
      "team": "Rochester Red Wings",
      "week": "2026-W20",
      "ab": 3,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 2,
      "so": 0,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.257,
    "OPS": 0.773,
    "H": 38,
    "HR": 5,
    "RBI": 20,
    "BB": 19,
    "K": 41,
    "AB": 148,
    "G": 39,
    "SB": 7
  }
}
dylan_crews.knowledge = dylan_crews_knowledge
dylan_crews.performance = dylan_crews_performance
dylan_crews.media = dylan_crews_media
dylan_crews.cardMarket = dylan_crews_market
dylan_crews.marketArchetype = dylan_crews_market.marketArchetype
dylan_crews.dlr = { performance: dylan_crews_performance, media: dylan_crews_media, cardMarket: dylan_crews_market }
