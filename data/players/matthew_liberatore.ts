import { matthew_liberatore_knowledge } from "./matthew_liberatore_knowledge"
import { matthew_liberatore_performance } from "./matthew_liberatore_performance"
import { matthew_liberatore_media } from "./matthew_liberatore_media"
import { matthew_liberatore_market } from "./matthew_liberatore_market"

export const matthew_liberatore = {
  id: "matthew_liberatore",
  name: "Matthew Liberatore",
  fullName: "Matthew Joseph Liberatore",
  team: "STL",
  parentClub: "STL",
  position: "LHP",
  jerseyNumber: 32,
  tier: "MLB",
  level: "MLB",
  age: 26,
  birthdate: "1999-11-06",
  birthplace: "Peoria, AZ",
  highSchool: "Mountain Ridge HS (AZ)",
  height: "6'4\"",
  weight: 215,
  bats: "L",
  throws: "L",
  draftYear: 2018,
  draftRound: 1,
  draftOverall: 16,
  draftTeam: "TB",
  competitionLevel: "MLB",
  marketArchetype: matthew_liberatore_market.marketArchetype,
  requiresDualDomain: false,
  signals: { tracked: true, heat: "neutral", price: null },
  knowledge: matthew_liberatore_knowledge,
  performance: matthew_liberatore_performance,
  media: matthew_liberatore_media,
  cardMarket: matthew_liberatore_market,
  hitting: null,
  pitching: { ERA: 4.40, H: 53, W: 2, K: 34, WHIP: 1.511, IP: 47.0 },
  tracker: {
    G: 9, GS: 9, IP: 47.0, H: 53, R: 23, ER: 23, BB: 18, K: 34, HR: 9, BF: 203, W: 2, L: 2,
    ERA: 4.40, WHIP: 1.511, K9: 6.51, BB9: 3.45, HR9: 1.72,
    lastGame: { date: "2026-05-13", opp: "@ ATH", IP: 5.0, H: 9, R: 4, ER: 4, BB: 2, K: 5, HR: 1, BF: 24, result: "L" },
    rolling: {
      starts3: { n: 3, IP: 16.2, H: 17, ER: 7, BB: 7, K: 15, HR: 1, ERA: 3.78, WHIP: 1.440, K9: 8.10 },
      starts5: { n: 5, IP: 26.0, H: 28, ER: 13, BB: 10, K: 22, HR: 4, ERA: 4.50, WHIP: 1.462, K9: 7.62 },
      starts7: { n: 7, IP: 36.0, H: 43, ER: 21, BB: 15, K: 30, HR: 7, ERA: 5.25, WHIP: 1.611, K9: 7.50 }
    },
    mlbIP: 381.0,
    minorIP: null,
    everReachedMLBSample: true
  },
  careerAverages: { ERA: 4.61, WHIP: 1.39, K: 306, BB: 129, IP: 381.0, G: 129, GS: 62, W: 18, L: 26 },
  careerLineage: {
    "2022": { team: "STL", level: "MLB", G: 9, ERA: 5.97, note: "MLB debut" },
    "2023": { team: "STL", level: "MLB", G: 22, ERA: 5.25, note: "swingman usage" },
    "2024": { team: "STL", level: "MLB", G: 60, ERA: 3.69, note: "bulk relief/starter bridge" },
    "2025": { team: "STL", level: "MLB", G: 29, ERA: 4.21, IP: 151.2, note: "full rotation season" },
    "2026": { team: "STL", level: "MLB", G: 9, ERA: 4.40, IP: 47.0, status: "in-season", note: "rotation role through May 13" }
  },
  dlr: { performance: matthew_liberatore_performance, media: matthew_liberatore_media, cardMarket: matthew_liberatore_market }
}
