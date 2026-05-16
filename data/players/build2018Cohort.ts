/* =============================================================
   2018 COHORT BUILDER — PRODUCTION ASSEMBLY (2026-05-08)
   -------------------------------------------------------------
   build2018Cohort() is the single authoritative builder for the
   2018 draft class. It orchestrates the full migration + enrichment
   pipeline and returns production-ready enriched players.

   PIPELINE:
     playersDraft2018 (raw source)
       → detectPlayerFormat()    (classify each player)
       → migrateLegacyPlayer()   (minimal_inline → createPlayer)
       → enrichPlayer()          (neutral scaffold for missing layers)
       → build2018Cohort()       (unified production-ready result)

   RESPONSIBILITIES:
     1. Ingest the raw 2018 draft cohort array
     2. Detect each player's format (domain vs minimal_inline)
     3. Domain players pass through untouched (no migration)
     4. Migrate non-domain players via migrateLegacyPlayer()
     5. Enrich all migrated players via enrichPlayer()
     6. Validate every result and segregate by outcome
     7. Return clean, production-safe players with full diagnostics

   DO NOT:
     - Fabricate performance stats (ERA, AVG, xERA, xAVG)
     - Fabricate scouting tool grades
     - Set dlr.score or dlr.weeklyHistory
     - Call calculateDLR() — that is the UI's responsibility
     - Alter calculateDLR.ts, dlrConfig.ts, or signalEngine.ts
     - Import from dry-run or sandbox modules
     - Delete or reference sandbox outputs

   CURRENT STATUS:
     - 2 domain-file players (alec_bohm, casey_mize): Tier A
     - 29 minimal inline players: Tier C (performance not yet populated)
     - Production-safe but partially enriched
     - Real *_performance.ts domain files needed for full DLR quality
     - See COHORT_2018_STATUS.md for full audit

   See MIGRATION_RULES.md, ENRICHMENT_RULES.md, ENGINE_FREEZE.md.
   ============================================================= */

import type { Player } from "@/data/types/player"
import { playersDraft2018 } from "@/data/playersDraft2018"
import { detectPlayerFormat, migrateLegacyPlayer } from "./migrateLegacyPlayer"
import { enrichPlayer, type EnrichedPlayer } from "./enrichPlayer"
import type { ValidationIssue } from "./playerValidator"

/* =========================
   OUTPUT TYPES
========================= */

/**
 * A player that passed migration and enrichment but had warnings at
 * one or both pipeline stages. The player IS valid and production-safe.
 */
export type CohortBuildWarning = {
  /** The fully assembled enriched player */
  player: EnrichedPlayer
  /** Issues surfaced during migration (empty for domain-file players) */
  migrationIssues: ValidationIssue[]
  /** Issues surfaced during enrichment */
  enrichmentIssues: ValidationIssue[]
  /** Index of this entry in the original source cohort array */
  sourceIndex: number
  /** Source player id, if determinable */
  sourceId: string | undefined
}

/**
 * A player that failed migration or enrichment and cannot be used in
 * production. Manual correction per PLAYER_CONTRACT.md is required.
 */
export type CohortBuildFailure = {
  /** The raw source object (may be partial or malformed) */
  source: unknown
  /** All validation issues that caused failure */
  issues: ValidationIssue[]
  /** Which pipeline stage produced the failure */
  stage: "migration" | "enrichment"
  /** Index of this entry in the original source cohort array */
  sourceIndex: number
  /** Source player id, if determinable */
  sourceId: string | undefined
}

/** Aggregate summary for a build2018Cohort() run */
export type CohortBuildSummary = {
  /** Total players in the raw source cohort */
  total: number
  /** Players assembled cleanly with no issues */
  passed: number
  /** Players assembled with warnings but still structurally valid */
  warnings: number
  /** Players that failed migration or enrichment */
  failed: number
  /** Number of players that carried migration warnings */
  migrationWarningCount: number
  /** Number of players that carried enrichment warnings */
  enrichmentWarningCount: number
  /** Enrichment tier distribution across all valid players */
  tierDistribution: { A: number; B: number; C: number }
  /** Average enrichment completeness 0–1 across all valid players */
  averageCompleteness: number
}

/** Full result of build2018Cohort() */
export type CohortBuildResult = {
  /**
   * All successfully assembled players — clean + warned combined.
   * These are production-safe and can be passed to the vault.
   *
   * NOTE: Players are partially enriched (Tier A: 2, Tier C: 29).
   * DLR scores for Tier C players will cluster near 50 until
   * *_performance.ts domain files are created.
   */
  players: EnrichedPlayer[]
  /**
   * Players that succeeded but carried warnings from migration
   * or enrichment. Inspect migrationIssues / enrichmentIssues
   * to understand what scaffolding was applied.
   */
  warnings: CohortBuildWarning[]
  /** Players that failed a pipeline stage — require manual correction */
  failed: CohortBuildFailure[]
  /** Aggregate build pass summary */
  summary: CohortBuildSummary
}

/* =========================
   COHORT BUILDER
========================= */

/**
 * Assembles the 2018 draft class into production-ready enriched players.
 *
 * Processes each source player individually through the full pipeline:
 *   - Domain-file players (alec_bohm, casey_mize): pass-through + enrich
 *   - Minimal inline players (29 others): migrate + enrich
 *
 * Non-destructive — `playersDraft2018` is never mutated.
 * Engine files (calculateDLR.ts, dlrConfig.ts, signalEngine.ts) are
 * never called or modified by this function.
 *
 * Usage:
 * ```ts
 * import { build2018Cohort } from "@/data/players/build2018Cohort"
 *
 * const { players, warnings, failed, summary } = build2018Cohort()
 *
 * // Summary (expected):
 * // { total: 31, passed: 2, warnings: 29, failed: 0,
 * //   tierDistribution: { A: 2, B: 0, C: 29 } }
 *
 * // All valid players ready for vault use:
 * // players.length === 31 (passed + warned combined)
 * ```
 */
export function build2018Cohort(): CohortBuildResult {
  const source = playersDraft2018 as unknown[]

  const cleanPlayers: EnrichedPlayer[] = []
  const buildWarnings: CohortBuildWarning[] = []
  const buildFailed: CohortBuildFailure[] = []

  for (let i = 0; i < source.length; i++) {
    const raw = source[i]

    // Extract source id for diagnostics (best effort)
    const sourceId =
      typeof raw === "object" && raw !== null
        ? ((raw as Record<string, unknown>)["id"] as string | undefined)
        : undefined

    /* -------- Stage 1: Migration -------- */

    const format = detectPlayerFormat(raw)
    let migratedPlayer: Player
    let migrationIssues: ValidationIssue[] = []

    if (format === "domain") {
      // Domain-file players already have canonical domain layers.
      // Pass through without migration — enrichment handles scaffolding.
      migratedPlayer = raw as Player

    } else {
      // All non-domain formats (minimal_inline, legacy_scouting, unknown)
      // route through migrateLegacyPlayer() for format detection and assembly.
      const migResult = migrateLegacyPlayer(raw)

      if (!migResult.validation.isValid) {
        buildFailed.push({
          source: raw,
          issues: migResult.validation.issues,
          stage: "migration",
          sourceIndex: i,
          sourceId,
        })
        continue
      }

      migratedPlayer = migResult.player
      migrationIssues = migResult.validation.issues.filter(
        iss => iss.severity === "warning"
      )
    }

    /* -------- Stage 2: Enrichment -------- */

    let enrichResult: ReturnType<typeof enrichPlayer>

    try {
      enrichResult = enrichPlayer(migratedPlayer)
    } catch (err) {
      buildFailed.push({
        source: raw,
        issues: [{
          severity: "error",
          path: "enrichment",
          message: `enrichPlayer threw an unexpected error: ${
            err instanceof Error ? err.message : String(err)
          }`,
        }],
        stage: "enrichment",
        sourceIndex: i,
        sourceId,
      })
      continue
    }

    if (!enrichResult.validation.isValid) {
      buildFailed.push({
        source: raw,
        issues: enrichResult.validation.issues,
        stage: "enrichment",
        sourceIndex: i,
        sourceId,
      })
      continue
    }

    const enrichmentIssues = enrichResult.validation.issues.filter(
      iss => iss.severity === "warning"
    )

    /* -------- Stage 3: Classify -------- */

    const allIssues = [...migrationIssues, ...enrichmentIssues]

    if (allIssues.length > 0) {
      buildWarnings.push({
        player:           enrichResult.player,
        migrationIssues,
        enrichmentIssues,
        sourceIndex:      i,
        sourceId,
      })
    } else {
      cleanPlayers.push(enrichResult.player)
    }
  }

  /* -------- Aggregate summary -------- */

  // All valid players: clean (no issues) + warned (valid with issues)
  const allValid: EnrichedPlayer[] = [
    ...cleanPlayers,
    ...buildWarnings.map(w => w.player),
  ]

  const tiers = { A: 0, B: 0, C: 0 }
  const completenessValues: number[] = []

  for (const ep of allValid) {
    const tier = ep.intelligence?.enrichmentTier ?? "C"
    tiers[tier]++
    const comp = ep.intelligence?.completeness ?? 0
    completenessValues.push(comp)
  }

  const avgCompleteness =
    completenessValues.length
      ? completenessValues.reduce((a, b) => a + b, 0) / completenessValues.length
      : 0

  const summary: CohortBuildSummary = {
    total:                  source.length,
    passed:                 cleanPlayers.length,
    warnings:               buildWarnings.length,
    failed:                 buildFailed.length,
    migrationWarningCount:  buildWarnings.filter(w => w.migrationIssues.length > 0).length,
    enrichmentWarningCount: buildWarnings.filter(w => w.enrichmentIssues.length > 0).length,
    tierDistribution:       tiers,
    averageCompleteness:    Math.round(avgCompleteness * 1000) / 1000,
  }

  return {
    players:  allValid,
    warnings: buildWarnings,
    failed:   buildFailed,
    summary,
  }
}
