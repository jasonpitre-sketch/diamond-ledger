/**
 * ⚠️  NON-PRODUCTION SANDBOX OUTPUT — DO NOT IMPORT INTO PRODUCTION ⚠️
 *
 * Generated: 2026-05-08
 * Source: data/playersDraft2018.ts (31 players)
 * Pipeline: runCohortDryRun.ts → enrichPlayer → enrichCohort
 * Purpose: Dry-run DLR + enrichment validation — see COHORT_DRY_RUN_REPORT.md
 *
 * STATUS: Sandbox only. Production export requires:
 *   1. Formal promotion approval pass
 *   2. Real *_performance.ts domain files for each player
 *   3. Real *_media.ts domain files (or confirmed neutral is acceptable)
 *   4. Verification that enriched DLR scores meet quality bar
 *
 * ENRICHMENT RESULTS (from executeDryRun.mjs — real computed values):
 *   Total enriched:       31 / 31
 *   Tier A (full domain): 2  (alec_bohm, casey_mize)
 *   Tier B (partial):     0
 *   Tier C (baseline):    29
 *   Average completeness: 25.2%
 *   Average DLR:          50.2
 *   Min DLR:              50  (all Tier C players — neutral market default)
 *   Max DLR:              53  (casey_mize)
 *
 * DLR SCORE BREAKDOWN:
 *   Tier A (domain-file) — alec_bohm: 52, casey_mize: 53
 *   Tier C (minimal+enriched) — all score 50 (neutral baseline across all layers)
 *
 * ENRICHMENT SCAFFOLDING APPLIED TO TIER C PLAYERS:
 *   - media: full neutral scaffold (0.5 across all 17 fields)
 *   - cardMarket: full neutral scaffold (0.5 across all 8 signal fields)
 *   - knowledge.bio: neutral categorical strings ("neutral" across 4+5 fields)
 *   - knowledge.career: neutral categorical + 0.5 analystScores
 *   - knowledge.scout.snapshot: neutral text signals
 *   - knowledge.scout.analystScores: 0.5 neutral
 *   - performance: NOT enriched (forbidden — no physical stats available)
 *
 * WHY ALL TIER C = DLR 50:
 *   The neutral scaffold injects exactly-0.5 values for media, knowledge,
 *   and cardMarket. Without performance data (ERA/AVG/xERA/xAVG) these
 *   players score baseline across all four layers:
 *     knowledge: ~6/18 (bio/career neutral = 0.5 throughout)
 *     performance: 0/40 (layer absent)
 *     media: ~9/18 (all 0.5 neutral)
 *     market: ~12/24 (engine default — no marketSnapshot)
 *   Total ≈ 27/100 normalized → ~50 via composeDLR neutral mapping
 */

export const ENRICHMENT_SUMMARY_2018 = {
  cohort:          "2018 Draft",
  generatedAt:     "2026-05-08",
  status:          "NON-PRODUCTION SANDBOX",
  pipelineVersion: "Pass 13 enrichment + Pass 14 dry run",

  results: {
    total:              31,
    enriched:           31,
    failed:             0,
    tierA:              2,
    tierB:              0,
    tierC:              29,
    averageCompleteness: 0.252,
    averageDLR:         50.2,
    minDLR:             50,
    maxDLR:             53,
    medianDLR:          50,
  },

  perPlayerDLR: [
    { id: "casey_mize",          tier: "A", dlr: 53, completeness: 1.00 },
    { id: "alec_bohm",           tier: "A", dlr: 52, completeness: 1.00 },
    { id: "brady_singer",        tier: "C", dlr: 50, completeness: 0.20 },
    { id: "nick_madrigal",       tier: "C", dlr: 50, completeness: 0.20 },
    { id: "matthew_liberatore",  tier: "C", dlr: 50, completeness: 0.20 },
    { id: "mason_denaburg",      tier: "C", dlr: 50, completeness: 0.20 },
    { id: "brice_turang",        tier: "C", dlr: 50, completeness: 0.20 },
    { id: "trevor_larnach",      tier: "C", dlr: 50, completeness: 0.20 },
    { id: "bo_naylor",           tier: "C", dlr: 50, completeness: 0.20 },
    { id: "xavier_edwards",      tier: "C", dlr: 50, completeness: 0.20 },
    { id: "jeremy_eierman",      tier: "C", dlr: 50, completeness: 0.20 },
    { id: "steele_walker",       tier: "C", dlr: 50, completeness: 0.20 },
    { id: "jordan_groshans",     tier: "C", dlr: 50, completeness: 0.20 },
    { id: "jameson_hannah",      tier: "C", dlr: 50, completeness: 0.20 },
    { id: "jt_ginn",             tier: "C", dlr: 50, completeness: 0.20 },
    { id: "will_banfield",       tier: "C", dlr: 50, completeness: 0.20 },
    { id: "tristan_beck",        tier: "C", dlr: 50, completeness: 0.20 },
    { id: "jordyn_adams",        tier: "C", dlr: 50, completeness: 0.20 },
    { id: "nick_schnell",        tier: "C", dlr: 50, completeness: 0.20 },
    { id: "jake_mccarthy",       tier: "C", dlr: 50, completeness: 0.20 },
    { id: "michael_siani",       tier: "C", dlr: 50, completeness: 0.20 },
    { id: "alek_thomas",         tier: "C", dlr: 50, completeness: 0.20 },
    { id: "parker_meadows",      tier: "C", dlr: 50, completeness: 0.20 },
    { id: "adam_kloffenstein",   tier: "C", dlr: 50, completeness: 0.20 },
    { id: "sean_hjelle",         tier: "C", dlr: 50, completeness: 0.20 },
    { id: "seth_beer",           tier: "C", dlr: 50, completeness: 0.20 },
    { id: "anthony_seigler",     tier: "C", dlr: 50, completeness: 0.20 },
    { id: "lenny_torres",        tier: "C", dlr: 50, completeness: 0.20 },
    { id: "blaine_knight",       tier: "C", dlr: 50, completeness: 0.20 },
    { id: "kris_bubic",          tier: "C", dlr: 50, completeness: 0.20 },
    { id: "griffin_conine",      tier: "C", dlr: 50, completeness: 0.20 },
  ],

  missingDomains: {
    "knowledge.tools":       29,  // no scouting grades — need *_knowledge.ts
    "performance":           29,  // no stats — need *_performance.ts
    "media.substantive":     29,  // neutral scaffold only — need *_media.ts
    "cardMarket.substantive": 29, // neutral scaffold only — need *_market.ts
  },

  promotionBlockers: [
    "29 players have no *_performance.ts domain files (40 pts max, scoring 0)",
    "29 players have no *_media.ts domain files (18 pts max, neutral scaffold only)",
    "29 players have no knowledge tool grades (scouting grades needed)",
    "All 29 Tier C players show identical DLR=50 (neutral baseline — not differentiating)",
    "migrateLegacyPlayer.ts needs a 'minimal_inline' format detection branch",
  ],
}
