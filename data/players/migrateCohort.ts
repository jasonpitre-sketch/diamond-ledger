/* =============================================================
   COHORT MIGRATION AUTHORITY — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   migrateCohort(players) is the authoritative batch migrator for
   legacy cohort arrays (playersDraft2025, playersDraft2026).

   RESPONSIBILITIES:
     - Migrate every player in a cohort array
     - Segregate results into valid, warning, and failed buckets
     - Return a complete migration summary

   DO NOT:
     - Modify the source cohort arrays
     - Alter scoring logic or engine files
     - Add scoring constants or weights

   See MIGRATION_RULES.md for the authoritative mapping table.
   See ENGINE_FREEZE.md for system boundaries.
   ============================================================= */

import type { Player } from "@/data/types/player"
import type { ValidationIssue } from "./playerValidator"
import { validatePlayer } from "./playerValidator"
import { migrateLegacyPlayer, detectPlayerFormat } from "./migrateLegacyPlayer"

/* =========================
   OUTPUT TYPES
========================= */

/** A migrated player that validated successfully with at least one warning */
export type MigrationWarning = {
  player: Player
  issues: ValidationIssue[]
  /** Source index in the original cohort array */
  sourceIndex: number
  /** Source player id if available */
  sourceId: string | undefined
}

/** A player that failed migration (isValid = false) */
export type FailedMigration = {
  /** Raw source object (may be partial or malformed) */
  source: unknown
  issues: ValidationIssue[]
  /** Source index in the original cohort array */
  sourceIndex: number
  /** Source player id if available */
  sourceId: string | undefined
}

/** Summary counters for a cohort migration run */
export type MigrationSummary = {
  /** Total players attempted */
  total: number
  /** Players with no issues — fully clean */
  passed: number
  /** Players with validation warnings but isValid = true */
  warnings: number
  /** Players with errors — isValid = false */
  failed: number
}

/** Full result returned by migrateCohort() */
export type CohortMigrationResult = {
  /** Players that passed validation with no issues */
  validPlayers: Player[]
  /** Players that are valid but had migration or validation warnings */
  warnings: MigrationWarning[]
  /** Players that failed migration (errors present) */
  failedPlayers: FailedMigration[]
  /** Summary counts */
  summary: MigrationSummary
}

/* =========================
   BATCH MIGRATOR
========================= */

/**
 * Migrates an entire cohort array to canonical Diamond Ledger player objects.
 *
 * Handles all three player formats automatically:
 *   - "domain"          → validated and passed through (no migration needed)
 *   - "legacy_scouting" → migrated via full scouting+dlr mapping
 *   - "minimal_inline"  → assembled via createPlayer() with core extraction
 *   - "unknown"         → returned as failed migration
 *
 * Usage:
 * ```ts
 * import { migrateCohort } from "@/data/players/migrateCohort"
 * import { playersDraft2018 } from "@/data/playersDraft2018"
 *
 * const result = migrateCohort(playersDraft2018)
 * console.log(result.summary)
 * // { total: 31, passed: 2, warnings: 29, failed: 0 }
 * ```
 *
 * The migrator is NON-DESTRUCTIVE — it does not modify source arrays.
 * Fix failed players by creating proper domain files per PLAYER_CONTRACT.md.
 */
export function migrateCohort(players: unknown[]): CohortMigrationResult {
  const validPlayers: Player[] = []
  const warnings: MigrationWarning[] = []
  const failedPlayers: FailedMigration[] = []

  for (let i = 0; i < players.length; i++) {
    const source = players[i]

    // Extract source id for diagnostics (best effort)
    const sourceId =
      source !== null &&
      typeof source === "object" &&
      typeof (source as Record<string, unknown>)["id"] === "string"
        ? (source as Record<string, unknown>)["id"] as string
        : undefined

    const format = detectPlayerFormat(source)
    let player: Player
    let validation: ReturnType<typeof validatePlayer>

    try {
      if (format === "domain") {
        // Domain-file players pass through — validate only, no migration
        player = source as Player
        validation = validatePlayer(player)
      } else {
        // All other formats (legacy_scouting, minimal_inline, unknown) go through migrateLegacyPlayer
        const result = migrateLegacyPlayer(source)
        player  = result.player
        validation = result.validation
      }
    } catch (err) {
      failedPlayers.push({
        source,
        issues: [{
          severity: "error",
          path: "root",
          message: `Migration threw an unexpected error: ${
            err instanceof Error ? err.message : String(err)
          }`
        }],
        sourceIndex: i,
        sourceId,
      })
      continue
    }

    if (!validation.isValid) {
      failedPlayers.push({
        source,
        issues: validation.issues,
        sourceIndex: i,
        sourceId,
      })
      continue
    }

    const hasWarnings = validation.issues.some(issue => issue.severity === "warning")

    if (hasWarnings) {
      warnings.push({
        player,
        issues: validation.issues,
        sourceIndex: i,
        sourceId,
      })
    } else {
      validPlayers.push(player)
    }
  }

  const summary: MigrationSummary = {
    total:    players.length,
    passed:   validPlayers.length,
    warnings: warnings.length,
    failed:   failedPlayers.length,
  }

  return {
    validPlayers,
    warnings,
    failedPlayers,
    summary,
  }
}

/* =========================
   CONVENIENCE HELPER
========================= */

/**
 * Returns all successfully migrated players (passed + warning players combined),
 * suitable for direct use in a cohort array.
 *
 * Callers that want to inspect warnings separately should use
 * `migrateCohort()` directly.
 *
 * Usage:
 * ```ts
 * import { migrateAll } from "@/data/players/migrateCohort"
 * import { playersDraft2026 } from "@/data/playersDraft2026"
 *
 * const players = migrateAll(playersDraft2026)
 * ```
 */
export function migrateAll(players: unknown[]): Player[] {
  const { validPlayers, warnings } = migrateCohort(players)
  return [...validPlayers, ...warnings.map(w => w.player)]
}
