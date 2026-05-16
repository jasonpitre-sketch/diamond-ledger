import { george_lombard_jr_knowledge } from "./george_lombard_jr_knowledge"
import { george_lombard_jr_performance } from "./george_lombard_jr_performance"
import { george_lombard_jr_media } from "./george_lombard_jr_media"
import { george_lombard_jr_market } from "./george_lombard_jr_market"

export const george_lombard_jr: any = {
  "id": "george_lombard_jr",
  "name": "George Lombard Jr.",
  "fullName": "George Lombard Jr.",
  "team": "Scranton/Wilkes-Barre RailRiders",
  "organization": "New York Yankees",
  "position": "SS",
  "tier": "AAA",
  "level": "AAA",
  "age": 21,
  "birthdate": "2005-06-02",
  "school": "Gulliver Prep School (FL)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 26,
  "draftOverall": 26,
  "draftBonus": "3.30m",
  "pickValue": "3.07m",
  "competitionLevel": "AAA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.25,
    "H": 31,
    "R": 26,
    "HR": 4,
    "RBI": 11,
    "BB": 28,
    "K": 28,
    "OPS": 0.805
  },
  "pitching": null,
  "tracker": {
    "G": 33,
    "AB": 124,
    "PA": 155,
    "R": 26,
    "H": 31,
    "2B": 8,
    "3B": 0,
    "HR": 4,
    "RBI": 11,
    "BB": 28,
    "K": 28,
    "SB": 6,
    "CS": 4,
    "HBP": 2,
    "SF": 1,
    "AVG": 0.25,
    "OBP": 0.394,
    "SLG": 0.411,
    "OPS": 0.805,
    "lastGame": {
      "g": 33,
      "sport": 11,
      "level": "AAA",
      "date": "2026-05-14",
      "opp": "vs Syracuse Mets",
      "team": "Scranton/Wilkes-Barre RailRiders",
      "week": "2026-W20",
      "ab": 6,
      "r": 2,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 1,
      "bb": 0,
      "so": 0,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.25,
    "OPS": 0.805,
    "H": 31,
    "HR": 4,
    "RBI": 11,
    "BB": 28,
    "K": 28,
    "AB": 124,
    "G": 33,
    "SB": 6
  }
}
george_lombard_jr.knowledge = george_lombard_jr_knowledge
george_lombard_jr.performance = george_lombard_jr_performance
george_lombard_jr.media = george_lombard_jr_media
george_lombard_jr.cardMarket = george_lombard_jr_market
george_lombard_jr.marketArchetype = george_lombard_jr_market.marketArchetype
george_lombard_jr.dlr = { performance: george_lombard_jr_performance, media: george_lombard_jr_media, cardMarket: george_lombard_jr_market }
