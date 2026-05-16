import { myles_naylor_knowledge } from "./myles_naylor_knowledge"
import { myles_naylor_performance } from "./myles_naylor_performance"
import { myles_naylor_media } from "./myles_naylor_media"
import { myles_naylor_market } from "./myles_naylor_market"

export const myles_naylor: any = {
  "id": "myles_naylor",
  "name": "Myles Naylor",
  "fullName": "Myles Naylor",
  "team": "Lansing Lugnuts",
  "organization": "Athletics",
  "position": "3B",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-04-15",
  "school": "St Joan of Arc Catholic SS (ON)",
  "country": "CAN",
  "height": "6' 2\"",
  "weight": 195,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 39,
  "draftOverall": 39,
  "draftBonus": "2.20m",
  "pickValue": "2.20m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.274,
    "H": 26,
    "R": 18,
    "HR": 3,
    "RBI": 17,
    "BB": 16,
    "K": 38,
    "OPS": 0.831
  },
  "pitching": null,
  "tracker": {
    "G": 25,
    "AB": 95,
    "PA": 111,
    "R": 18,
    "H": 26,
    "2B": 4,
    "3B": 2,
    "HR": 3,
    "RBI": 17,
    "BB": 16,
    "K": 38,
    "SB": 3,
    "CS": 1,
    "HBP": 0,
    "SF": 0,
    "AVG": 0.274,
    "OBP": 0.378,
    "SLG": 0.453,
    "OPS": 0.831,
    "lastGame": {
      "g": 25,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "vs Quad Cities River Bandits",
      "team": "Lansing Lugnuts",
      "week": "2026-W20",
      "ab": 4,
      "r": 1,
      "h": 2,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 2,
      "bb": 1,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 2
    }
  },
  "careerAverages": {
    "AVG": 0.274,
    "OPS": 0.831,
    "H": 26,
    "HR": 3,
    "RBI": 17,
    "BB": 16,
    "K": 38,
    "AB": 95,
    "G": 25,
    "SB": 3
  }
}
myles_naylor.knowledge = myles_naylor_knowledge
myles_naylor.performance = myles_naylor_performance
myles_naylor.media = myles_naylor_media
myles_naylor.cardMarket = myles_naylor_market
myles_naylor.marketArchetype = myles_naylor_market.marketArchetype
myles_naylor.dlr = { performance: myles_naylor_performance, media: myles_naylor_media, cardMarket: myles_naylor_market }
