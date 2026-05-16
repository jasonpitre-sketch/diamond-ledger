/* =============================================================
   COHORT SUMMARY UTILITY — PRODUCTION (2026-05-08)
   -------------------------------------------------------------
   getCohortStats(players) is a pure utility that computes
   aggregate statistics for any EnrichedPlayer array.

   RESPONSIBILITIES:
     - Count totals, hitters, pitchers
     - Compute average DLR across the cohort
     - Compute average enrichment completeness
     - Report enrichment tier distribution
     - Report per-domain enrichment distribution
     - Count invalid (no intelligence annotation) players

   RULES:
     - Pure function — no side effects, no mutations
     - Calls calculateDLR() to derive DLR scores (pure — no side effects)
     - DLR failures are silently skipped (non-fatal)
     - No UI imports
     - No cohort-specific logic — works on any EnrichedPlayer array

   See ENGINE_FREEZE.md for frozen scoring systems.
   See ENRICHMENT_RULES.md for tier definitions.
   ============================================================= */

import { calculateDLR } from "@/data/dlr/calculateDLR"
import type { EnrichedPlayer } from "@/data/players/enrichPlayer"

/* =========================
   OUTPUT TYPE
========================= */

/** Aggregate statistics for a cohort of enriched players */
export type CohortStats = {
  /** Total players in the input array */
  total: number
  /** Players classified as hitters (by position or performance.kind) */
  hitters: number
  /** Players classified as pitchers (by position or performance.kind) */
  pitchers: number
  /** Average DLR rating across all players that produced a valid score */
  averageDLR: number
  /** Minimum DLR rating in the cohort (0 if no valid scores) */
  minDLR: number
  /** Maximum DLR rating in the cohort (0 if no valid scores) */
  maxDLR: number
  /** Average enrichment completeness 0–1 */
  averageCompleteness: number
  /** Count of players per enrichment tier */
  tierDistribution: { A: number; B: number; C: number }
  /**
   * Per-domain count of players with substantive (non-scaffold) data.
   * Domains: "knowledge.tools", "knowledge", "performance", "media", "cardMarket"
   */
  enrichmentDistribution: Record<string, number>
  /**
   * Players where intelligence annotation is absent.
   * Should be 0 for any properly assembled cohort.
   * Non-zero indicates a pipeline gap.
   */
  invalidCount: number
}

/* =========================
   ROLE HELPERS
========================= */

/** Pitcher position strings — mirrors PITCHER_POSITIONS in migrateLegacyPlayer.ts */
const PITCHER_POSITIONS = new Set([
  "P", "SP", "RP", "CP", "LHP", "RHP", "LHRP", "RHRP"
])

/**
 * Classifies a player's role using performance.kind first, then position string.
 * Returns "pitcher" | "hitter".
 */
function classifyRole(player: EnrichedPlayer): "pitcher" | "hitter" {
  // performance.kind is the authoritative role declaration per PLAYER_CONTRACT.md
  if (player.performance?.kind === "pitcher") return "pitcher"
  if (player.performance?.kind === "hitter")  return "hitter"

  // Fall back to position string for players without a performance domain file
  const pos = typeof player.position === "string" ? player.position.toUpperCase().trim() : ""
  return PITCHER_POSITIONS.has(pos) ? "pitcher" : "hitter"
}

/* =========================
   STAT HELPERS
========================= */

function avg(arr: number[]): number {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000
}

/* =========================
   MAIN FUNCTION
========================= */

/**
 * Computes aggregate statistics for an array of enriched players.
 *
 * Pure function — does not mutate any input. DLR scores are computed
 * via `calculateDLR()` (frozen engine, pure function, no side effects).
 * Players where `calculateDLR()` throws are excluded from DLR averages.
 *
 * Usage:
 * ```ts
 * import { getCohortStats } from "@/data/players/cohorts/cohortSummary"
 * import { players2018 } from "@/data/players/cohorts/2018"
 *
 * const stats = getCohortStats(players2018)
 * console.log(stats)
 * // {
 * //   total: 31, hitters: 16, pitchers: 15,
 * //   averageDLR: 50.2, minDLR: 50, maxDLR: 53,
 * //   averageCompleteness: 0.252,
 * //   tierDistribution: { A: 2, B: 0, C: 29 },
 * //   enrichmentDistribution: { performance: 2, media: 0, "knowledge.tools": 2, ... },
 * //   invalidCount: 0
 * // }
 * ```
 *
 * @param players - Array of EnrichedPlayer objects from any build pipeline
 * @returns Aggregate cohort statistics
 */
export function getCohortStats(players: EnrichedPlayer[]): CohortStats {
  let hitters = 0
  let pitchers = 0

  const dlrValues: number[] = []
  const completenessValues: number[] = []

  const tiers = { A: 0, B: 0, C: 0 }
  const enrichmentDistribution: Record<string, number> = {
    "knowledge.tools": 0,
    "knowledge":       0,
    "performance":     0,
    "media":           0,
    "cardMarket":      0,
  }
  let invalidCount = 0

  for (const player of players) {
    /* ---- Role ---- */
    const role = classifyRole(player)
    if (role === "pitcher") pitchers++
    else                    hitters++

    /* ---- DLR score ---- */
    try {
      const dlrOutput = calculateDLR(player)
      if (typeof dlrOutput.rating === "number" && isFinite(dlrOutput.rating)) {
        dlrValues.push(dlrOutput.rating)
      }
    } catch {
      // calculateDLR failure is non-fatal — player excluded from DLR average
    }

    /* ---- Enrichment intelligence ---- */
    const intel = player.intelligence

    if (!intel) {
      invalidCount++
      continue
    }

    // Tier
    const tier = intel.enrichmentTier ?? "C"
    tiers[tier]++

    // Completeness
    if (typeof intel.completeness === "number") {
      completenessValues.push(intel.completeness)
    }

    // Per-domain distribution — count players with each domain populated
    for (const domain of intel.populatedDomains ?? []) {
      if (domain in enrichmentDistribution) {
        enrichmentDistribution[domain]++
      } else {
        // Unexpected domain key — record it
        enrichmentDistribution[domain] = (enrichmentDistribution[domain] ?? 0) + 1
      }
    }
  }

  return {
    total:                  players.length,
    hitters,
    pitchers,
    averageDLR:             round3(avg(dlrValues)),
    minDLR:                 dlrValues.length ? Math.min(...dlrValues) : 0,
    maxDLR:                 dlrValues.length ? Math.max(...dlrValues) : 0,
    averageCompleteness:    round3(avg(completenessValues)),
    tierDistribution:       tiers,
    enrichmentDistribution,
    invalidCount,
  }
}
