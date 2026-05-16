import { luke_keaschall_knowledge } from "./luke_keaschall_knowledge"
import { luke_keaschall_performance } from "./luke_keaschall_performance"
import { luke_keaschall_media } from "./luke_keaschall_media"
import { luke_keaschall_market } from "./luke_keaschall_market"

export const luke_keaschall: any = {
  "id": "luke_keaschall",
  "name": "Luke Keaschall",
  "fullName": "Luke Keaschall",
  "team": "Minnesota Twins",
  "organization": "Minnesota Twins",
  "position": "2B",
  "tier": "MLB",
  "level": "MLB",
  "age": 23,
  "birthdate": "2002-08-15",
  "school": "Arizona State (AZ)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 49,
  "draftOverall": 49,
  "draftBonus": "1.50m",
  "pickValue": "1.74m",
  "competitionLevel": "MLB",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.222,
    "H": 35,
    "R": 19,
    "HR": 1,
    "RBI": 15,
    "BB": 18,
    "K": 29,
    "OPS": 0.597
  },
  "pitching": null,
  "tracker": {
    "G": 44,
    "AB": 158,
    "PA": 180,
    "R": 19,
    "H": 35,
    "2B": 8,
    "3B": 0,
    "HR": 1,
    "RBI": 15,
    "BB": 18,
    "K": 29,
    "SB": 10,
    "CS": 0,
    "HBP": 2,
    "SF": 2,
    "TB": 46,
    "AVG": 0.222,
    "OBP": 0.306,
    "SLG": 0.291,
    "OPS": 0.597,
    "lastGame": {
      "g": 44,
      "sport": 1,
      "level": "MLB",
      "date": "2026-05-15",
      "opp": "vs Milwaukee Brewers",
      "team": "Minnesota Twins",
      "week": "2026-W20",
      "ab": 1,
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
    "AVG": 0.222,
    "H": 35,
    "R": 19,
    "HR": 1,
    "RBI": 15,
    "BB": 18,
    "K": 29,
    "OPS": 0.597,
    "AB": 158,
    "G": 44,
    "SB": 10
  }
}
luke_keaschall.knowledge = luke_keaschall_knowledge
luke_keaschall.performance = luke_keaschall_performance
luke_keaschall.media = luke_keaschall_media
luke_keaschall.cardMarket = luke_keaschall_market
luke_keaschall.marketArchetype = luke_keaschall_market.marketArchetype
luke_keaschall.dlr = { performance: luke_keaschall_performance, media: luke_keaschall_media, cardMarket: luke_keaschall_market }
