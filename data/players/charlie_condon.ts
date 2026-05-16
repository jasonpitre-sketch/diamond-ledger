import { charlie_condon_knowledge } from "./charlie_condon_knowledge"
import { charlie_condon_performance } from "./charlie_condon_performance"
import { charlie_condon_media } from "./charlie_condon_media"
import { charlie_condon_market } from "./charlie_condon_market"

export const charlie_condon: any = {
  "id": "charlie_condon",
  "name": "Charlie Condon",
  "fullName": "Charlie Condon",
  "team": "Albuquerque Isotopes",
  "organization": "Colorado Rockies",
  "position": "OF",
  "tier": "AAA",
  "level": "AAA",
  "age": 23,
  "birthdate": "2003-04-14",
  "school": "Georgia (GA)",
  "country": "USA",
  "height": "6' 5\"",
  "weight": 216,
  "bats": "R",
  "throws": "R",
  "draftYear": 2024,
  "draftPick": 3,
  "draftOverall": 3,
  "draftBonus": "9.25m",
  "pickValue": "9.07m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.24,
    "H": 31,
    "R": 29,
    "HR": 4,
    "RBI": 17,
    "BB": 27,
    "K": 38,
    "OPS": 0.775
  },
  "pitching": null,
  "tracker": {
    "G": 34,
    "AB": 129,
    "PA": 163,
    "R": 29,
    "H": 31,
    "2B": 5,
    "3B": 1,
    "HR": 4,
    "RBI": 17,
    "BB": 27,
    "K": 38,
    "SB": 3,
    "CS": 0,
    "HBP": 5,
    "SF": 2,
    "AVG": 0.24,
    "OBP": 0.387,
    "SLG": 0.388,
    "OPS": 0.775,
    "lastGame": {
      "g": 34,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Oklahoma City Comets",
      "ab": 2,
      "r": 2,
      "h": 1,
      "d": 0,
      "t": 1,
      "hr": 0,
      "rbi": 0,
      "bb": 3,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 3,
      "team": "Albuquerque Isotopes",
      "week": "2026-W20"
    }
  },
  "careerAverages": {
    "AVG": 0.24,
    "OPS": 0.775,
    "H": 31,
    "HR": 4,
    "RBI": 17,
    "BB": 27,
    "K": 38,
    "AB": 129,
    "G": 34,
    "SB": 3
  }
}

charlie_condon.knowledge = charlie_condon_knowledge
charlie_condon.performance = charlie_condon_performance
charlie_condon.media = charlie_condon_media
charlie_condon.cardMarket = charlie_condon_market
charlie_condon.marketArchetype = charlie_condon_market.marketArchetype
charlie_condon.dlr = { performance: charlie_condon_performance, media: charlie_condon_media, cardMarket: charlie_condon_market }
