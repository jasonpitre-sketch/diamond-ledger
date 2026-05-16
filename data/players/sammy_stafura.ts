import { sammy_stafura_knowledge } from "./sammy_stafura_knowledge"
import { sammy_stafura_performance } from "./sammy_stafura_performance"
import { sammy_stafura_media } from "./sammy_stafura_media"
import { sammy_stafura_market } from "./sammy_stafura_market"

export const sammy_stafura: any = {
  "id": "sammy_stafura",
  "name": "Sammy Stafura",
  "fullName": "Sammy Stafura",
  "team": "Greensboro Grasshoppers",
  "organization": "Cincinnati Reds",
  "position": "SS",
  "tier": "A+",
  "level": "A+",
  "age": 21,
  "birthdate": "2004-11-15",
  "school": "Walter Panas HS (NY)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 188,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 43,
  "draftOverall": 43,
  "draftBonus": "2.50m",
  "pickValue": "2.00m",
  "competitionLevel": "A+",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.188,
    "H": 12,
    "R": 8,
    "HR": 3,
    "RBI": 7,
    "BB": 6,
    "K": 29,
    "OPS": 0.628
  },
  "pitching": null,
  "tracker": {
    "G": 18,
    "AB": 64,
    "PA": 74,
    "R": 8,
    "H": 12,
    "2B": 1,
    "3B": 0,
    "HR": 3,
    "RBI": 7,
    "BB": 6,
    "K": 29,
    "SB": 2,
    "CS": 0,
    "HBP": 3,
    "SF": 1,
    "TB": 22,
    "AVG": 0.188,
    "OBP": 0.284,
    "SLG": 0.344,
    "OPS": 0.628,
    "lastGame": {
      "g": 18,
      "sport": 13,
      "level": "A+",
      "date": "2026-05-06",
      "opp": "vs Greenville Drive",
      "team": "Greensboro Grasshoppers",
      "week": "2026-W19",
      "ab": 3,
      "r": 0,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.188,
    "H": 12,
    "R": 8,
    "HR": 3,
    "RBI": 7,
    "BB": 6,
    "K": 29,
    "OPS": 0.628,
    "AB": 64,
    "G": 18,
    "SB": 2
  }
}
sammy_stafura.knowledge = sammy_stafura_knowledge
sammy_stafura.performance = sammy_stafura_performance
sammy_stafura.media = sammy_stafura_media
sammy_stafura.cardMarket = sammy_stafura_market
sammy_stafura.marketArchetype = sammy_stafura_market.marketArchetype
sammy_stafura.dlr = { performance: sammy_stafura_performance, media: sammy_stafura_media, cardMarket: sammy_stafura_market }
