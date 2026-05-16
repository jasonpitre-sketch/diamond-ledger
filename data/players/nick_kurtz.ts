import { nick_kurtz_knowledge } from "./nick_kurtz_knowledge"
import { nick_kurtz_performance } from "./nick_kurtz_performance"
import { nick_kurtz_media } from "./nick_kurtz_media"
import { nick_kurtz_market } from "./nick_kurtz_market"

export const nick_kurtz: any = {
  "id": "nick_kurtz",
  "name": "Nick Kurtz",
  "fullName": "Nick Kurtz",
  "team": "Athletics",
  "organization": "Athletics",
  "position": "1B",
  "tier": "MLB",
  "level": "MLB",
  "age": 23,
  "birthdate": "2003-03-12",
  "school": "Wake Forest (NC)",
  "country": "USA",
  "height": "6' 5\"",
  "weight": 240,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 4,
  "draftOverall": 4,
  "draftBonus": "7.00m",
  "pickValue": "8.37m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.275,
    "H": 42,
    "R": 27,
    "HR": 7,
    "RBI": 26,
    "BB": 40,
    "K": 57,
    "OPS": 0.905
  },
  "pitching": null,
  "tracker": {
    "G": 42,
    "AB": 153,
    "PA": 194,
    "R": 27,
    "H": 42,
    "2B": 8,
    "3B": 1,
    "HR": 7,
    "RBI": 26,
    "BB": 40,
    "K": 57,
    "SB": 5,
    "CS": 1,
    "HBP": 1,
    "SF": 0,
    "AVG": 0.275,
    "OBP": 0.428,
    "SLG": 0.477,
    "OPS": 0.905,
    "lastGame": {
      "g": 42,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-14",
      "opp": "vs St. Louis Cardinals",
      "ab": 3,
      "r": 1,
      "h": 2,
      "d": 0,
      "t": 0,
      "hr": 1,
      "rbi": 1,
      "bb": 1,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 1,
      "sf": 0,
      "tb": 5,
      "team": "Athletics",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "AVG": 0.275,
    "OPS": 0.905,
    "H": 42,
    "HR": 7,
    "RBI": 26,
    "BB": 40,
    "K": 57,
    "AB": 153,
    "G": 42,
    "SB": 5
  }
}

nick_kurtz.knowledge = nick_kurtz_knowledge
nick_kurtz.performance = nick_kurtz_performance
nick_kurtz.media = nick_kurtz_media
nick_kurtz.cardMarket = nick_kurtz_market
nick_kurtz.marketArchetype = nick_kurtz_market.marketArchetype
nick_kurtz.dlr = { performance: nick_kurtz_performance, media: nick_kurtz_media, cardMarket: nick_kurtz_market }
