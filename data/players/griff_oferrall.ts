import { griff_oferrall_knowledge } from "./griff_oferrall_knowledge"
import { griff_oferrall_performance } from "./griff_oferrall_performance"
import { griff_oferrall_media } from "./griff_oferrall_media"
import { griff_oferrall_market } from "./griff_oferrall_market"

export const griff_oferrall: any = {
  "id": "griff_oferrall",
  "name": "Griff O'Ferrall",
  "fullName": "Griff O'Ferrall",
  "team": "Chesapeake Baysox",
  "organization": "Baltimore Orioles",
  "position": "SS",
  "tier": "AA",
  "level": "AA",
  "age": 23,
  "birthdate": "2003-02-02",
  "school": "Virginia (VA)",
  "country": "USA",
  "height": "6' 1\"",
  "weight": 195,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 32,
  "draftOverall": 32,
  "draftBonus": "2.70m",
  "pickValue": "2.84m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.184,
    "H": 19,
    "R": 20,
    "HR": 2,
    "RBI": 9,
    "BB": 19,
    "K": 25,
    "OPS": 0.65
  },
  "pitching": null,
  "tracker": {
    "G": 29,
    "AB": 103,
    "PA": 125,
    "R": 20,
    "H": 19,
    "2B": 9,
    "3B": 0,
    "HR": 2,
    "RBI": 9,
    "BB": 19,
    "K": 25,
    "SB": 5,
    "CS": 1,
    "HBP": 2,
    "SF": 1,
    "AVG": 0.184,
    "OBP": 0.32,
    "SLG": 0.33,
    "OPS": 0.65,
    "lastGame": {
      "g": 29,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "@ Akron RubberDucks",
      "team": "Chesapeake Baysox",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 1,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.184,
    "OPS": 0.65,
    "H": 19,
    "HR": 2,
    "RBI": 9,
    "BB": 19,
    "K": 25,
    "AB": 103,
    "G": 29,
    "SB": 5
  }
}
griff_oferrall.knowledge = griff_oferrall_knowledge
griff_oferrall.performance = griff_oferrall_performance
griff_oferrall.media = griff_oferrall_media
griff_oferrall.cardMarket = griff_oferrall_market
griff_oferrall.marketArchetype = griff_oferrall_market.marketArchetype
griff_oferrall.dlr = { performance: griff_oferrall_performance, media: griff_oferrall_media, cardMarket: griff_oferrall_market }
