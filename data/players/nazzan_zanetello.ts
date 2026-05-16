import { nazzan_zanetello_knowledge } from "./nazzan_zanetello_knowledge"
import { nazzan_zanetello_performance } from "./nazzan_zanetello_performance"
import { nazzan_zanetello_media } from "./nazzan_zanetello_media"
import { nazzan_zanetello_market } from "./nazzan_zanetello_market"

export const nazzan_zanetello: any = {
  "id": "nazzan_zanetello",
  "name": "Nazzan Zanetello",
  "fullName": "Nazzan Zanetello",
  "team": "Greenville Drive",
  "organization": "Boston Red Sox",
  "position": "SS",
  "tier": "A+",
  "level": "A+",
  "age": 20,
  "birthdate": "2005-05-25",
  "school": "Christian Brothers College HS (MO)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 180,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 50,
  "draftOverall": 50,
  "draftBonus": "3.00m",
  "pickValue": "1.70m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.111,
    "H": 2,
    "R": 3,
    "HR": 1,
    "RBI": 3,
    "BB": 5,
    "K": 11,
    "OPS": 0.667
  },
  "pitching": null,
  "tracker": {
    "G": 7,
    "AB": 18,
    "PA": 24,
    "R": 3,
    "H": 2,
    "2B": 1,
    "3B": 0,
    "HR": 1,
    "RBI": 3,
    "BB": 5,
    "K": 11,
    "SB": 2,
    "CS": 1,
    "HBP": 1,
    "SF": 0,
    "TB": 6,
    "AVG": 0.111,
    "OBP": 0.333,
    "SLG": 0.333,
    "OPS": 0.667,
    "lastGame": {
      "g": 7,
      "sport": 13,
      "level": "A+",
      "date": "2026-04-15",
      "opp": "vs Bowling Green Hot Rods",
      "team": "Greenville Drive",
      "week": "2026-W16",
      "ab": 0,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.111,
    "H": 2,
    "R": 3,
    "HR": 1,
    "RBI": 3,
    "BB": 5,
    "K": 11,
    "OPS": 0.667,
    "AB": 18,
    "G": 7,
    "SB": 2
  }
}
nazzan_zanetello.knowledge = nazzan_zanetello_knowledge
nazzan_zanetello.performance = nazzan_zanetello_performance
nazzan_zanetello.media = nazzan_zanetello_media
nazzan_zanetello.cardMarket = nazzan_zanetello_market
nazzan_zanetello.marketArchetype = nazzan_zanetello_market.marketArchetype
nazzan_zanetello.dlr = { performance: nazzan_zanetello_performance, media: nazzan_zanetello_media, cardMarket: nazzan_zanetello_market }
