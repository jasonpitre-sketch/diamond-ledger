import { tommy_troy_knowledge } from "./tommy_troy_knowledge"
import { tommy_troy_performance } from "./tommy_troy_performance"
import { tommy_troy_media } from "./tommy_troy_media"
import { tommy_troy_market } from "./tommy_troy_market"

export const tommy_troy: any = {
  "id": "tommy_troy",
  "name": "Tommy Troy",
  "fullName": "Tommy Troy",
  "team": "Reno Aces",
  "organization": "Arizona Diamondbacks",
  "position": "SS",
  "tier": "AAA",
  "level": "AAA",
  "age": 24,
  "birthdate": "2002-01-17",
  "school": "Stanford (CA)",
  "country": "USA",
  "height": "5' 9\"",
  "weight": 197,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 12,
  "draftOverall": 12,
  "draftBonus": "4.40m",
  "pickValue": "5.04m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.312,
    "H": 48,
    "R": 35,
    "HR": 2,
    "RBI": 25,
    "BB": 25,
    "K": 44,
    "OPS": 0.851
  },
  "pitching": null,
  "tracker": {
    "G": 39,
    "AB": 154,
    "PA": 181,
    "R": 35,
    "H": 48,
    "2B": 8,
    "3B": 3,
    "HR": 2,
    "RBI": 25,
    "BB": 25,
    "K": 44,
    "SB": 6,
    "CS": 1,
    "HBP": 1,
    "SF": 1,
    "AVG": 0.312,
    "OBP": 0.409,
    "SLG": 0.442,
    "OPS": 0.851,
    "lastGame": {
      "g": 39,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Las Vegas Aviators",
      "team": "Reno Aces",
      "week": "2026-W20",
      "ab": 3,
      "r": 0,
      "h": 0,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 1,
      "so": 2,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 0
    }
  },
  "careerAverages": {
    "AVG": 0.312,
    "OPS": 0.851,
    "H": 48,
    "HR": 2,
    "RBI": 25,
    "BB": 25,
    "K": 44,
    "AB": 154,
    "G": 39,
    "SB": 6
  }
}
tommy_troy.knowledge = tommy_troy_knowledge
tommy_troy.performance = tommy_troy_performance
tommy_troy.media = tommy_troy_media
tommy_troy.cardMarket = tommy_troy_market
tommy_troy.marketArchetype = tommy_troy_market.marketArchetype
tommy_troy.dlr = { performance: tommy_troy_performance, media: tommy_troy_media, cardMarket: tommy_troy_market }
