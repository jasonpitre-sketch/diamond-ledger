import { arjun_nimmala_knowledge } from "./arjun_nimmala_knowledge"
import { arjun_nimmala_performance } from "./arjun_nimmala_performance"
import { arjun_nimmala_media } from "./arjun_nimmala_media"
import { arjun_nimmala_market } from "./arjun_nimmala_market"

export const arjun_nimmala: any = {
  "id": "arjun_nimmala",
  "name": "Arjun Nimmala",
  "fullName": "Arjun Nimmala",
  "team": "New Hampshire Fisher Cats",
  "organization": "Toronto Blue Jays",
  "position": "SS",
  "tier": "AA",
  "level": "AA",
  "age": 21,
  "birthdate": "2005-10-16",
  "school": "Strawberry Crest HS (FL)",
  "country": "USA",
  "height": "6' 0\"",
  "weight": 190,
  "bats": "R",
  "throws": "R",
  "draftYear": 2023,
  "draftPick": 20,
  "draftOverall": 20,
  "draftBonus": "3.00m",
  "pickValue": "3.75m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": {
    "AVG": 0.277,
    "H": 33,
    "R": 20,
    "HR": 4,
    "RBI": 22,
    "BB": 18,
    "K": 32,
    "OPS": 0.845
  },
  "pitching": null,
  "tracker": {
    "G": 31,
    "AB": 119,
    "PA": 139,
    "R": 20,
    "H": 33,
    "2B": 11,
    "3B": 0,
    "HR": 4,
    "RBI": 22,
    "BB": 18,
    "K": 32,
    "SB": 3,
    "CS": 3,
    "HBP": 1,
    "SF": 1,
    "AVG": 0.277,
    "OBP": 0.374,
    "SLG": 0.471,
    "OPS": 0.845,
    "lastGame": {
      "g": 31,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-15",
      "opp": "vs Reading Fightin Phils",
      "team": "New Hampshire Fisher Cats",
      "week": "2026-W20",
      "ab": 3,
      "r": 1,
      "h": 1,
      "d": 0,
      "t": 0,
      "hr": 0,
      "rbi": 0,
      "bb": 0,
      "so": 1,
      "sb": 0,
      "cs": 0,
      "hbp": 0,
      "sf": 0,
      "tb": 1
    }
  },
  "careerAverages": {
    "AVG": 0.277,
    "OPS": 0.845,
    "H": 33,
    "HR": 4,
    "RBI": 22,
    "BB": 18,
    "K": 32,
    "AB": 119,
    "G": 31,
    "SB": 3
  }
}
arjun_nimmala.knowledge = arjun_nimmala_knowledge
arjun_nimmala.performance = arjun_nimmala_performance
arjun_nimmala.media = arjun_nimmala_media
arjun_nimmala.cardMarket = arjun_nimmala_market
arjun_nimmala.marketArchetype = arjun_nimmala_market.marketArchetype
arjun_nimmala.dlr = { performance: arjun_nimmala_performance, media: arjun_nimmala_media, cardMarket: arjun_nimmala_market }
