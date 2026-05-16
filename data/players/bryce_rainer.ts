import { bryce_rainer_knowledge } from "./bryce_rainer_knowledge"
import { bryce_rainer_performance } from "./bryce_rainer_performance"
import { bryce_rainer_media } from "./bryce_rainer_media"
import { bryce_rainer_market } from "./bryce_rainer_market"

export const bryce_rainer: any = {
  "id": "bryce_rainer",
  "name": "Bryce Rainer",
  "fullName": "Bryce Rainer",
  "team": "West Michigan Whitecaps",
  "organization": "Detroit Tigers",
  "position": "SS",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2005-07-03",
  "school": "Harvard-Westlake HS (CA)",
  "country": "USA",
  "height": "6' 3\"",
  "weight": 195,
  "bats": "L",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 11,
  "draftOverall": 11,
  "draftBonus": "5.80m",
  "pickValue": "5.71m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.215,
    "H": 23,
    "R": 16,
    "HR": 3,
    "RBI": 16,
    "BB": 18,
    "K": 53,
    "OPS": 0.708
  },
  "pitching": null,
  "tracker": {
    "G": 29,
    "AB": 107,
    "PA": 126,
    "R": 16,
    "H": 23,
    "2B": 7,
    "3B": 1,
    "HR": 3,
    "RBI": 16,
    "BB": 18,
    "K": 53,
    "SB": 7,
    "CS": 0,
    "HBP": 0,
    "SF": 1,
    "AVG": 0.215,
    "OBP": 0.325,
    "SLG": 0.383,
    "OPS": 0.708,
    "lastGame": {
      "g": 29,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-14",
      "opp": "@ Great Lakes Loons",
      "team": "West Michigan Whitecaps",
      "week": "2026-W20",
      "ab": 4,
      "r": 0,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 2,
      "sb": 1,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.215,
    "OPS": 0.708,
    "H": 23,
    "HR": 3,
    "RBI": 16,
    "BB": 18,
    "K": 53,
    "AB": 107,
    "G": 29,
    "SB": 7
  }
}
bryce_rainer.knowledge = bryce_rainer_knowledge
bryce_rainer.performance = bryce_rainer_performance
bryce_rainer.media = bryce_rainer_media
bryce_rainer.cardMarket = bryce_rainer_market
bryce_rainer.marketArchetype = bryce_rainer_market.marketArchetype
bryce_rainer.dlr = { performance: bryce_rainer_performance, media: bryce_rainer_media, cardMarket: bryce_rainer_market }
