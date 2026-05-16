import { james_tibbs_iii_knowledge } from "./james_tibbs_iii_knowledge"
import { james_tibbs_iii_performance } from "./james_tibbs_iii_performance"
import { james_tibbs_iii_media } from "./james_tibbs_iii_media"
import { james_tibbs_iii_market } from "./james_tibbs_iii_market"

export const james_tibbs_iii: any = {
  "id": "james_tibbs_iii",
  "name": "James Tibbs III",
  "fullName": "James Tibbs III",
  "team": "Oklahoma City Comets",
  "organization": "San Francisco Giants",
  "position": "RF",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-10-01",
  "school": "Florida State (FL)",
  "country": "USA",
  "height": "5' 11\"",
  "weight": 201,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 13,
  "draftOverall": 13,
  "draftBonus": "4.75m",
  "pickValue": "5.27m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.294,
    "H": 47,
    "R": 36,
    "HR": 11,
    "RBI": 27,
    "BB": 26,
    "K": 50,
    "OPS": 0.988
  },
  "pitching": null,
  "tracker": {
    "G": 40,
    "AB": 160,
    "PA": 188,
    "R": 36,
    "H": 47,
    "2B": 13,
    "3B": 1,
    "HR": 11,
    "RBI": 27,
    "BB": 26,
    "K": 50,
    "SB": 2,
    "CS": 0,
    "HBP": 1,
    "SF": 1,
    "AVG": 0.294,
    "OBP": 0.394,
    "SLG": 0.594,
    "OPS": 0.988,
    "lastGame": {
      "g": 40,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "@ Albuquerque Isotopes",
      "team": "Oklahoma City Comets",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 2,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 2,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 2
    }
  },
  "careerAverages": {
    "AVG": 0.294,
    "OPS": 0.988,
    "H": 47,
    "HR": 11,
    "RBI": 27,
    "BB": 26,
    "K": 50,
    "AB": 160,
    "G": 40,
    "SB": 2
  }
}
james_tibbs_iii.knowledge = james_tibbs_iii_knowledge
james_tibbs_iii.performance = james_tibbs_iii_performance
james_tibbs_iii.media = james_tibbs_iii_media
james_tibbs_iii.cardMarket = james_tibbs_iii_market
james_tibbs_iii.marketArchetype = james_tibbs_iii_market.marketArchetype
james_tibbs_iii.dlr = { performance: james_tibbs_iii_performance, media: james_tibbs_iii_media, cardMarket: james_tibbs_iii_market }
