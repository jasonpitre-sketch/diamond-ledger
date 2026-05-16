import { matt_shaw_knowledge } from "./matt_shaw_knowledge"
import { matt_shaw_performance } from "./matt_shaw_performance"
import { matt_shaw_media } from "./matt_shaw_media"
import { matt_shaw_market } from "./matt_shaw_market"

export const matt_shaw: any = {
  "id": "matt_shaw",
  "name": "Matt Shaw",
  "fullName": "Matt Shaw",
  "team": "Chicago Cubs",
  "organization": "Chicago Cubs",
  "position": "RF",
  "tier": "MLB",
  "level": "MLB",
  "age": 25,
  "birthdate": "2001-11-06",
  "school": "Maryland (MD)",
  "country": "USA",
  "height": "5' 10\"",
  "weight": 185,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 13,
  "draftOverall": 13,
  "draftBonus": "4.85m",
  "pickValue": "4.85m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.256,
    "H": 23,
    "R": 10,
    "HR": 3,
    "RBI": 11,
    "BB": 5,
    "K": 17,
    "OPS": 0.714
  },
  "pitching": null,
  "tracker": {
    "G": 37,
    "AB": 90,
    "PA": 96,
    "R": 10,
    "H": 23,
    "2B": 6,
    "3B": 0,
    "HR": 3,
    "RBI": 11,
    "BB": 5,
    "K": 17,
    "SB": 3,
    "CS": 1,
    "HBP": 0,
    "SF": 1,
    "AVG": 0.256,
    "OBP": 0.292,
    "SLG": 0.422,
    "OPS": 0.714,
    "lastGame": {
      "g": 37,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "@ Atlanta Braves",
      "team": "Chicago Cubs",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 1,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.256,
    "OPS": 0.714,
    "H": 23,
    "HR": 3,
    "RBI": 11,
    "BB": 5,
    "K": 17,
    "AB": 90,
    "G": 37,
    "SB": 3
  }
}
matt_shaw.knowledge = matt_shaw_knowledge
matt_shaw.performance = matt_shaw_performance
matt_shaw.media = matt_shaw_media
matt_shaw.cardMarket = matt_shaw_market
matt_shaw.marketArchetype = matt_shaw_market.marketArchetype
matt_shaw.dlr = { performance: matt_shaw_performance, media: matt_shaw_media, cardMarket: matt_shaw_market }
