import { jonathan_santucci_knowledge } from "./jonathan_santucci_knowledge"
import { jonathan_santucci_performance } from "./jonathan_santucci_performance"
import { jonathan_santucci_media } from "./jonathan_santucci_media"
import { jonathan_santucci_market } from "./jonathan_santucci_market"

export const jonathan_santucci: any = {
  "id": "jonathan_santucci",
  "name": "Jonathan Santucci",
  "fullName": "Jonathan Santucci",
  "team": "Binghamton Rumble Ponies",
  "organization": "New York Mets",
  "position": "P",
  "tier": "AA",
  "level": "AA",
  "age": 24,
  "birthdate": "2002-12-28",
  "school": "Duke (NC)",
  "country": "USA",
  "height": "6' 2\"",
  "weight": 205,
  "bats": "L",
  "throws": "L",
  "draftYear": 2024,
  "draftPick": 46,
  "draftOverall": 46,
  "draftBonus": "2.03m",
  "pickValue": "2.03m",
  "competitionLevel": "AA",
  "requiresDualDomain": false,
  "signals": {
    "tracked": true,
    "heat": "neutral",
    "price": null
  },
  "hitting": null,
  "pitching": {
    "ERA": 4.45,
    "H": 24,
    "W": null,
    "K": 42,
    "WHIP": 1.299,
    "IP": "32.1"
  },
  "tracker": {
    "G": 7,
    "IP": "32.1",
    "H": 24,
    "ER": 16,
    "BB": 18,
    "K": 42,
    "HR": 3,
    "ERA": 4.45,
    "WHIP": 1.299,
    "lastGame": {
      "g": 7,
      "sport": 12,
      "level": "AA",
      "date": "2026-05-14",
      "opp": "@ Somerset Patriots",
      "team": "Binghamton Rumble Ponies",
      "week": "2026-W20",
      "ip": "5.0",
      "outs": 15,
      "h": 6,
      "r": 4,
      "er": 2,
      "bb": 1,
      "k": 4,
      "hr": 0,
      "bf": 23
    }
  },
  "careerAverages": {
    "ERA": 4.45,
    "WHIP": 1.299,
    "K": 42,
    "IP": "32.1"
  }
}
jonathan_santucci.knowledge = jonathan_santucci_knowledge
jonathan_santucci.performance = jonathan_santucci_performance
jonathan_santucci.media = jonathan_santucci_media
jonathan_santucci.cardMarket = jonathan_santucci_market
jonathan_santucci.marketArchetype = jonathan_santucci_market.marketArchetype
jonathan_santucci.dlr = { performance: jonathan_santucci_performance, media: jonathan_santucci_media, cardMarket: jonathan_santucci_market }
