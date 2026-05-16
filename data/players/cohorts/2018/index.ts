/* =============================================================
   2018 COHORT — PRODUCTION EXPORT (2026-05-08)
   -------------------------------------------------------------
   This is the production-facing export for the 2018 draft class.
   All assembly is delegated to build2018Cohort().

   WHAT THIS FILE DOES:
     Calls build2018Cohort() once at module load to produce the
     fully assembled, enriched, production-ready cohort.

   WHAT THIS FILE DOES NOT DO:
     - Import from dry-run or sandbox modules
     - Call calculateDLR() or any scoring engine
     - Fabricate player data
     - Override any enrichment output

   CURRENT STATE:
     - 31 players total
     - 2 Tier A  (alec_bohm, casey_mize — full domain files)
     - 29 Tier C (minimal inline — performance not yet populated)
     - All players structurally valid and safe for vault use
     - DLR scores for Tier C players will cluster near 50 until
       *_performance.ts domain files are created

   PROMOTION STATUS:
     PRODUCTION-SAFE | PARTIALLY ENRICHED
     See COHORT_2018_STATUS.md for full audit and remaining work.

   See ENGINE_FREEZE.md for frozen system boundaries.
   ============================================================= */

import { build2018Cohort } from "@/data/players/build2018Cohort"
import type { CohortBuildResult } from "@/data/players/build2018Cohort"

/* =========================
   PRODUCTION EXPORT
========================= */

/**
 * The fully assembled 2018 draft cohort.
 *
 * Contains migration results, enrichment results, and a build summary.
 * All 31 players are production-safe — domain-file players are Tier A,
 * minimal inline players are Tier C pending performance domain files.
 *
 * Usage:
 * ```ts
 * import { cohort2018 } from "@/data/players/cohorts/2018"
 *
 * // All valid players (31):
 * const players = cohort2018.players
 *
 * // Summary:
 * console.log(cohort2018.summary)
 * // { total: 31, passed: 2, warnings: 29, failed: 0,
 * //   tierDistribution: { A: 2, B: 0, C: 29 } }
 *
 * // Check for any unexpected failures:
 * if (cohort2018.failed.length > 0) {
 *   console.error("Build failures:", cohort2018.failed)
 * }
 * ```
 */
export const cohort2018: CohortBuildResult = build2018Cohort()

/**
 * Convenience export — all valid 2018 players in a flat array.
 *
 * Equivalent to `cohort2018.players`. Use this when you only need
 * the player array and do not need warnings or the build summary.
 *
 * Usage:
 * ```ts
 * import { players2018 } from "@/data/players/cohorts/2018"
 * ```
 */
export const players2018 = cohort2018.players
