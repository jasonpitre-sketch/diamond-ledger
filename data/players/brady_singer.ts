import { brady_singer_knowledge } from "./brady_singer_knowledge"
import { brady_singer_performance } from "./brady_singer_performance"
import { brady_singer_media } from "./brady_singer_media"
import { brady_singer_market } from "./brady_singer_market"

export const brady_singer = {
  id:           "brady_singer",
  name:         "Brady Singer",
  fullName:     "Brady Singer",

  team:         "CIN",
  parentClub:   "CIN",
  position:     "SP",
  jerseyNumber:  51,

  tier:  "MLB",
  level: "MLB",

  age:        29,
  birthdate:  "1996-08-04",
  birthplace: "Leesburg, FL",
  college:    "Florida",
  highSchool: "Eustis HS (FL)",

  height: "6'5\"",
  weight:  215,
  bats:   "R",
  throws: "R",

  draftYear:    2018,
  draftRound:   1,
  draftOverall: 18,
  draftTeam:    "KC",

  competitionLevel: "MLB",

  /* =========================
     MARKET ARCHETYPE
     Required at composite root AND inside cardMarket (Pass 20.6 pattern)
  ========================= */
  marketArchetype: brady_singer_market.marketArchetype,

  requiresDualDomain: false,

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "cool",   // struggling — 5.79 ERA in 9 GS; last 3 starts 7.91 ERA
    price:   null
  },

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   brady_singer_knowledge,
  performance: brady_singer_performance,
  media:       brady_singer_media,
  cardMarket:  brady_singer_market,

  /* =========================
     CORE STATS (pitching display layer — 2026 current season)
  ========================= */
  hitting:  null,

  pitching: {
    ERA:  5.79,
    W:    2,
    L:    3,
    IP:   42.0,
    K:    28,
    BB:   11,
    WHIP: 1.667,
    K9:   6.0
  },

  /* =========================
     TRACKER — 2026 in-season totals (through 5/12/2026)
     Pitcher tracker — appearance-based rolling windows (starts3/5/7)
     Pass 66 pitcher cascade convention
  ========================= */
  tracker: {
    G:   9,
    GS:  9,
    W:   2,
    L:   3,
    SV:  0,

    IP:  42.0,
    H:   59,
    R:   28,
    ER:  27,
    HR:  11,
    BB:  11,
    K:   28,
    SO:  28,
    HBP: 0,
    BF:  196,

    ERA:  5.79,
    WHIP: 1.667,
    K9:   6.0,
    BB9:  2.36,
    HR9:  2.36,
    KBB:  2.55,

    lastGame: {
      date:   "2026-05-12",
      opp:    "vs WSH",
      IP:     3.2,
      H:      6,
      R:      3,
      ER:     3,
      BB:     1,
      K:      2,
      HR:     3
    },

    // Rolling windows — appearance-based (starts3/5/7), NOT date-based
    // Pass 66 pitcher convention: seeded from verified game logs
    rolling: {
      starts3: {
        // May 12 vs WSH + May 6 @ CHC + May 1 @ PIT
        IP:   13.0,
        H:    19,
        ER:   11,
        BB:    4,
        K:     9,
        HR:    6,
        ERA:   7.62,
        WHIP:  1.769
      },
      starts5: {
        // adds Apr 25 vs DET + Apr 19 @ MIN
        IP:   24.1,
        H:    32,
        ER:   16,
        BB:    7,
        K:    14,
        HR:    8,
        ERA:   5.92,
        WHIP:  1.644
      },
      starts7: {
        // adds Apr 14 vs SF + Apr 8 @ MIA
        IP:   34.0,
        H:    48,
        ER:   23,
        BB:    7,
        K:    18,
        HR:   10,
        ERA:   6.00,
        WHIP:  1.697
      }
    },

    mlbIP:    897.0,   // career MLB IP
    minorIP:  null,    // no significant minor league time tracked
    everReachedMLBSample: true
  },

  /* =========================
     CAREER AVERAGES — MLB career through 5/12/2026
  ========================= */
  careerAverages: {
    G:    168,
    GS:   165,
    W:    52,
    L:    59,
    IP:   897.0,
    K:    836,
    ERA:  4.30,
    WHIP: 1.326,
    K9:   8.4,
    WAR:  11.8
  },

  /* =========================
     CAREER LINEAGE — season-by-season arc
  ========================= */
  careerLineage: {
    "2020": { team: "KC",  level: "MLB", note: "MLB debut" },
    "2021": { team: "KC",  level: "MLB" },
    "2022": { team: "KC",  level: "MLB", W: 10, L: 5,  ERA: 3.23, WHIP: 1.14,  note: "Career-best season" },
    "2023": { team: "KC",  level: "MLB", W: 8,  L: 11, ERA: 5.52, WHIP: 1.45,  note: "Collapse year — yo-yo established" },
    "2024": { team: "KC",  level: "MLB", W: 9,  L: 13, ERA: 3.71, WHIP: 1.27,  note: "Recovery" },
    "2025": { team: "CIN", level: "MLB", W: 14, L: 12, ERA: 4.03, WHIP: 1.24,  note: "Traded to Reds; solid anchor year" },
    "2026": { team: "CIN", level: "MLB", W: 2,  L: 3,  ERA: 5.79, WHIP: 1.667, status: "in-season", note: "Struggling badly through 5/6/2026" }
  },

  /* =========================
     DLR — populated on first ingestion
  ========================= */
  dlr: {}
}
