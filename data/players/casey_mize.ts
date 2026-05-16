/**
 * Pass 71 — Casey Mize Composite (2026-05-14)
 * 2018 #1 Overall Pick — Detroit Tigers (RHP)
 *
 * STATUS: IL_15_DAY as of 2026-05-14.
 *   Mize is currently on the 15-day injured list. 2026 season (2.90 ERA, 31.0 IP / 6 GS)
 *   paused. Tracker seeded through final start 2026-05-04. Rehab assignment (Erie SeaWolves)
 *   likely placeholder pending return timeline.
 *
 * marketArchetype: "HIGH_RISK_ARM"
 *   Injury-sensitive collector psychology. High ceiling when healthy (2026 pre-IL was elite:
 *   2.90 ERA, 35 K in 31 IP) creates speculative demand. IL suppresses market momentum.
 *   "RE_ENTRY_VETERAN" does NOT exist in frozen 8-archetype registry. HIGH_RISK_ARM is correct.
 *
 * Pass 71 corrections applied:
 *   - status: "IL_15_DAY" field (first IL-tagged player in Diamond Ledger)
 *   - marketArchetype: "HIGH_RISK_ARM" at composite root (Pass 20.6 triple-placement)
 *   - Tracker upgraded from days7 → starts3/5/7 pitcher format (Pass 66 convention)
 *   - Full Singer-pattern composite structure (all header fields + explicit domain wiring)
 *   - 2025 baseline: 3.87 ERA / 1.268 WHIP / 149.0 IP — All-Star season anchor
 *   - contractStatus, serviceTime, draftOverall added
 *
 * 2025 stats source: Baseball Reference (verified 2026-05-14 via Cowork)
 *   28 GS, 149.0 IP, 14-6, 3.87 ERA, 1.268 WHIP, 139 K, 153 H, 36 BB, 21 HR
 *
 * 2026 stats: Through 2026-04-28 (Start 6, final start before IL)
 *   6 GS, 31.0 IP, 2-2, 2.90 ERA, 1.194 WHIP, 35 K, 26 H, 11 BB
 */

import { casey_mize_knowledge } from "./casey_mize_knowledge"
import { casey_mize_performance } from "./casey_mize_performance"
import { casey_mize_media }       from "./casey_mize_media"
import { casey_mize_market }      from "./casey_mize_market"

export const casey_mize = {
  id:           "casey_mize",
  name:         "Casey Mize",
  fullName:     "Casey Mize",

  team:         "DET",
  parentClub:   "DET",
  position:     "RHP",
  jerseyNumber:  12,

  tier:  "MLB",
  level: "MLB",

  age:        28,
  birthdate:  "1997-05-01",
  birthplace: "Springville, AL",
  college:    "Auburn",
  highSchool: "Springville HS (AL)",

  height: "6'3\"",
  weight:  215,
  bats:   "R",
  throws: "R",

  draftYear:    2018,
  draftRound:   1,
  draftOverall: 1,       // #1 OVERALL — 2018 MLB Draft
  draftTeam:    "DET",

  competitionLevel: "MLB",

  /* =========================
     IL STATUS
     First IL-tagged player in Diamond Ledger.
     status field: "ACTIVE" (default, assumed) | "IL_15_DAY" | "IL_60_DAY" | "IL_10_DAY"
     When IL: tracker reflects totals through last active date.
     statusNote: human-readable context for display and governance.
  ========================= */
  status:     "IL_15_DAY" as const,
  statusNote: "On 15-day IL as of 2026-05-14. Tracker reflects 6 GS through 2026-04-28 (vs ATL). Erie SeaWolves rehab assignment may follow.",

  /* =========================
     CONTRACT
  ========================= */
  contractStatus: "1yr/$6.15M (2026), FA 2027",
  serviceTime:    5.111,    // ~5 years + 40 days MLB service (approx through 2026-05-14)

  /* =========================
     MARKET ARCHETYPE
     Required at composite root AND inside cardMarket (Pass 20.6 triple-placement).
     HIGH_RISK_ARM: injury-sensitive collector psychology, high ceiling when healthy.
  ========================= */
  marketArchetype: casey_mize_market.marketArchetype,

  requiresDualDomain: false,

  /* =========================
     SIGNALS
  ========================= */
  signals: {
    tracked: true,
    heat:    "uncertain",  // IL pauses trajectory; 2.90 ERA pre-IL is legitimately elite signal
    price:   null
  },

  /* =========================
     DOMAIN LAYERS
  ========================= */
  knowledge:   casey_mize_knowledge,
  performance: casey_mize_performance,
  media:       casey_mize_media,
  cardMarket:  casey_mize_market,

  /* =========================
     CORE STATS (pitching display layer — 2025 prior season)
     Reflects 2025 full season — anchor for context display.
     2026 in-season totals in tracker block below.
  ========================= */
  hitting:  null,

  pitching: {
    ERA:  3.87,   // 2025 full season — 28 GS, 149.0 IP
    W:    14,
    L:    6,
    IP:   149.0,
    K:    139,
    BB:   36,
    H:    153,
    WHIP: 1.268,
    K9:   8.39
  },

  /* =========================
     TRACKER — 2026 in-season totals (through 2026-05-04 / Start 6)
     Pitcher tracker — appearance-based rolling windows (starts3/5/7)
     Pass 66 pitcher cascade convention. IL paused — no new starts until return.
  ========================= */
  tracker: {
    G:    6,
    GS:   6,
    W:    2,
    L:    2,
    SV:   0,

    IP:   31.0,
    H:    26,
    R:    11,     // ESTIMATED (≈ ER + 1 unearned)
    ER:   10,     // DERIVED: ERA×IP/9 = 2.90×31.0/9 = 9.99 ≈ 10
    HR:   3,      // ESTIMATED: ~0.87 HR/9 pace
    BB:   11,
    K:    35,
    SO:   35,
    HBP:  2,      // ESTIMATED
    BF:   133,    // ESTIMATED: 31 IP × ~4.3 BF/IP

    ERA:  2.90,
    WHIP: 1.194,
    K9:   10.16,  // 35 K / 31.0 IP × 9
    BB9:   3.19,  // 11 BB / 31.0 IP × 9
    HR9:   0.87,  // 3 HR / 31.0 IP × 9 (estimated)
    KBB:   3.18,  // 35 / 11

    lastGame: {
      date: "2026-04-28",
      opp:  "vs ATL",    // API-verified: Apr 28 vs Atlanta Braves
      IP:   2.1,
      H:    3,
      R:    2,
      ER:   2,
      BB:   1,
      K:    3,
      HR:   null
    },

    // Rolling windows — appearance-based (starts3/5/7), NOT date-based
    // Pass 66 pitcher convention. 6 starts available; starts7 = season (all 6).
    // Starts 1–6 estimates derived from season aggregates + known Start 6 line.
    rolling: {
      starts3: {
        // Starts 4-5-6 (most recent 3 of 6). Start 6: 6.0 IP, 1 ER. ESTIMATED.
        IP:   16.0,
        H:    13,
        ER:    5,
        BB:    5,
        K:    19,
        ERA:   2.81,    // 5×9/16 = 2.81
        WHIP:  1.125    // (13+5)/16 = 1.125
      },
      starts5: {
        // Starts 2-3-4-5-6. Estimated from season aggregate minus Start 1.
        IP:   26.0,
        H:    22,
        ER:    8,
        BB:    9,
        K:    30,
        ERA:   2.77,    // 8×9/26 = 2.77
        WHIP:  1.192    // (22+9)/26 = 1.192
      },
      starts7: {
        // Only 6 starts exist — starts7 = full season aggregate
        IP:   31.0,
        H:    26,
        ER:   10,
        BB:   11,
        K:    35,
        ERA:   2.90,
        WHIP:  1.194
      }
    },

    mlbIP:    502.0,   // career MLB IP through 2026-05-14 (471 + 31)
    minorIP:  null,
    everReachedMLBSample: true
  },

  /* =========================
     CAREER AVERAGES — MLB career through 2026-05-14
     Includes 2026 pre-IL (31.0 IP) + 2025 full season (149.0 IP) + prior seasons.
  ========================= */
  careerAverages: {
    G:    101,
    GS:   96,
    W:    27,
    L:    29,
    IP:   502.0,
    K:    435,
    ERA:  3.99,
    WHIP: 1.267,
    BB:   175,    // ESTIMATED
    BB9:  3.14,   // ESTIMATED
    K9:   7.80    // 435/502 × 9 = 7.79
  },

  // CAREER LINEAGE — stage-based developmental history. Display-only.
  careerLineage: {
    stages: [
      {
        label: "MLB",
        pitching: {
          G:    101,
          GS:   96,
          IP:   502.0,
          W:    27,
          L:    29,
          ERA:  3.99,
          WHIP: 1.267,
          SO:   435,
          BB:   175,
          K9:   7.80,
        }
      }
    ]
  },

  /* =========================
     DLR (ENGINE LINK)
  ========================= */
  dlr: {
    performance: casey_mize_performance,
    media:       casey_mize_media,
    cardMarket:  casey_mize_market
  }
}
