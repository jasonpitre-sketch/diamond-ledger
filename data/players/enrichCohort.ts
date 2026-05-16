/* =============================================================
   COHORT ENRICHMENT AUTHORITY — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   enrichCohort(players) is the authoritative batch enricher for
   draft cohort arrays. It enriches every player in the array via
   enrichPlayer() and returns a complete enrichment summary.

   RESPONSIBILITIES:
     - Enrich entire draft classes in one pass
     - Validate every result after enrichment
     - Segregate by enrichment tier
     - Return enrichment summary with tier distribution

   ENRICHMENT NEVER:
     - Modifies frozen DLR scoring (ENGINE_FREEZE.md)
     - Fabricates baseball truth (ENRICHMENT_RULES.md)
     - Modifies source cohort arrays (non-destructive)

   PIPELINE POSITION:
   migrateLegacyPlayer → createPlayer → enrichPlayer → enrichCohort
   (migration pass)      (factory)       (single)      (batch)

   See ENRICHMENT_RULES.md for enrichment tier definitions.
   See ENGINE_FREEZE.md for system boundaries.
   ============================================================= */

import type { Player } from "@/data/types/player"
import type { ValidationIssue } from "./playerValidator"
import type { EnrichedPlayer } from "./enrichPlayer"
import { enrichPlayer } from "./enrichPlayer"

/* =========================
   OUTPUT TYPES
========================= */

/** An enriched player that validated with at least one warning */
export type EnrichmentWarning = {
  player: EnrichedPlayer
  issues: ValidationIssue[]
  sourceIndex: number
}

/** An enriched player that failed validation (isValid = false) */
export type EnrichmentFailure = {
  source: Player
  issues: ValidationIssue[]
  sourceIndex: number
}

/** Tier distribution within a cohort enrichment run */
export type TierDistribution = {
  A: number
  B: number
  C: number
}

/** Summary returned by enrichCohort() */
export type EnrichmentSummary = {
  total: number
  /** Players that enriched and validated with no issues */
  clean: number
  /** Players that enriched and validated with warnings but no errors */
  warnings: number
  /** Players that failed post-enrichment validation */
  failed: number
  /** Number of players that had at least one domain scaffolded */
  enriched: number
  /** Number of players where no enrichment was needed */
  unchanged: number
  /** Distribution across enrichment tiers A / B / C */
  tiers: TierDistribution
}

/** Full result returned by enrichCohort() */
export type CohortEnrichmentResult = {
  /** Players that enriched cleanly (no issues) */
  cleanPlayers: EnrichedPlayer[]
  /** Players that enriched with warnings */
  warnings: EnrichmentWarning[]
  /** Players that failed post-enrichment validation */
  failed: EnrichmentFailure[]
  /** Summary counts and tier distribution */
  summary: EnrichmentSummary
}

/* =========================
   BATCH ENRICHER
========================= */

/**
 * Enriches an entire cohort of players via enrichPlayer().
 *
 * Usage:
 * ```ts
 * import { enrichCohort } from "@/data/players/enrichCohort"
 * import { migrateAll } from "@/data/players/migrateCohort"
 * import { playersDraft2026 } from "@/data/playersDraft2026"
 *
 * const migrated = migrateAll(playersDraft2026)
 * const result = enrichCohort(migrated)
 *
 * console.log(result.summary)
 * // { total: 62, clean: 5, warnings: 55, failed: 2, enriched: 60, unchanged: 2, tiers: { A:0, B:55, C:5 } }
 *
 * // Use cleanPlayers + warnings.map(w => w.player) for the vault
 * const vaultReady = enrichAll(migrated)
 * ```
 *
 * The enricher is NON-DESTRUCTIVE — source players are not mutated.
 */
export function enrichCohort(players: Player[]): CohortEnrichmentResult {
  const cleanPlayers: EnrichedPlayer[] = []
  const warnings: EnrichmentWarning[] = []
  const failed: EnrichmentFailure[] = []

  const tiers: TierDistribution = { A: 0, B: 0, C: 0 }
  let enrichedCount = 0

  for (let i = 0; i < players.length; i++) {
    const source = players[i]

    let result: ReturnType<typeof enrichPlayer>

    try {
      result = enrichPlayer(source)
    } catch (err) {
      failed.push({
        source,
        issues: [{
          severity: "error",
          path: "root",
          message: `enrichPlayer threw an unexpected error: ${
            err instanceof Error ? err.message : String(err)
          }`
        }],
        sourceIndex: i,
      })
      continue
    }

    const { player, validation, scaffolded } = result

    // Track tier distribution
    const tier = player.intelligence?.enrichmentTier ?? "C"
    tiers[tier]++

    // Track enrichment vs unchanged
    if (scaffolded.length > 0) {
      enrichedCount++
    }

    if (!validation.isValid) {
      failed.push({
        source,
        issues: validation.issues,
        sourceIndex: i,
      })
      continue
    }

    const hasWarnings = validation.issues.some(i => i.severity === "warning")

    if (hasWarnings) {
      warnings.push({
        player,
        issues: validation.issues,
        sourceIndex: i,
      })
    } else {
      cleanPlayers.push(player)
    }
  }

  const summary: EnrichmentSummary = {
    total:     players.length,
    clean:     cleanPlayers.length,
    warnings:  warnings.length,
    failed:    failed.length,
    enriched:  enrichedCount,
    unchanged: players.length - enrichedCount,
    tiers,
  }

  return {
    cleanPlayers,
    warnings,
    failed,
    summary,
  }
}

/* =========================
   CONVENIENCE HELPER
========================= */

/**
 * Returns all successfully enriched players (clean + warning players combined),
 * suitable for direct use in a cohort array or vault.
 *
 * Usage:
 * ```ts
 * import { enrichAll } from "@/data/players/enrichCohort"
 * import { migrateAll } from "@/data/players/migrateCohort"
 * import { playersDraft2026 } from "@/data/playersDraft2026"
 *
 * export const vault2026 = enrichAll(migrateAll(playersDraft2026))
 * ```
 */
export function enrichAll(players: Player[]): EnrichedPlayer[] {
  const { cleanPlayers, warnings } = enrichCohort(players)
  return [...cleanPlayers, ...warnings.map(w => w.player)]
}
