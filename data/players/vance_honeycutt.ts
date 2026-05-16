import { vance_honeycutt_knowledge } from "./vance_honeycutt_knowledge"
import { vance_honeycutt_performance } from "./vance_honeycutt_performance"
import { vance_honeycutt_media } from "./vance_honeycutt_media"
import { vance_honeycutt_market } from "./vance_honeycutt_market"

export const vance_honeycutt: any = {
  "id": "vance_honeycutt",
  "name": "Vance Honeycutt",
  "fullName": "Vance Honeycutt",
  "team": "Frederick Keys",
  "organization": "Baltimore Orioles",
  "position": "OF",
  "tier": "A+",
  "level": "A+",
  "age": 23,
  "birthdate": "2003-05-17",
  "school": "North Carolina (NC)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 205,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 22,
  "draftOverall": 22,
  "draftBonus": "4.00m",
  "pickValue": "3.80m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.202,
    "H": 17,
    "R": 16,
    "HR": 5,
    "RBI": 16,
    "BB": 10,
    "K": 45,
    "OPS": 0.735
  },
  "pitching": null,
  "tracker": {
    "G": 22,
    "AB": 84,
    "PA": 95,
    "R": 16,
    "H": 17,
    "2B": 5,
    "3B": 0,
    "HR": 5,
    "RBI": 16,
    "BB": 10,
    "K": 45,
    "SB": 11,
    "CS": 0,
    "HBP": 1,
    "SF": 0,
    "AVG": 0.202,
    "OBP": 0.295,
    "SLG": 0.44,
    "OPS": 0.735,
    "lastGame": {
      "g": 22,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-13",
      "opp": "@ Hudson Valley Renegades",
      "team": "Frederick Keys",
      "week": "2026-W20",
      "ab": 5,
      "r": 1,
      "h": 2,
      "d": 1,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 2,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 3
    }
  },
  "careerAverages": {
    "AVG": 0.202,
    "OPS": 0.735,
    "H": 17,
    "HR": 5,
    "RBI": 16,
    "BB": 10,
    "K": 45,
    "AB": 84,
    "G": 22,
    "SB": 11
  }
}
vance_honeycutt.knowledge = vance_honeycutt_knowledge
vance_honeycutt.performance = vance_honeycutt_performance
vance_honeycutt.media = vance_honeycutt_media
vance_honeycutt.cardMarket = vance_honeycutt_market
vance_honeycutt.marketArchetype = vance_honeycutt_market.marketArchetype
vance_honeycutt.dlr = { performance: vance_honeycutt_performance, media: vance_honeycutt_media, cardMarket: vance_honeycutt_market }
