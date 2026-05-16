/* =============================================================
   DRY-RUN PIPELINE — NON-PRODUCTION (2026-05-08)
   -------------------------------------------------------------
   runCohortDryRun(cohort) executes a full migration + enrichment
   pipeline pass against an arbitrary cohort array in dry-run mode.

   DRY-RUN RULES:
     - Does NOT write back into production cohort files
     - Does NOT mutate original source arrays
     - Does NOT replace any production export
     - All outputs are in-memory only

   PRODUCTION REPLACEMENT:
     Requires a separate, explicitly approved promotion pass.
     This file is NOT that pass.

   FROZEN ENGINE:
     calculateDLR, dlrConfig, signalEngine, confidence are not
     modified by this pipeline. DLR scores are computed via the
     frozen calculateDLR() call — no workarounds.

   PLAYER FORMAT DETECTION:
     Three formats are present in Diamond Ledger cohorts:
       1. Domain-file player  — has knowledge / performance / media
       2. Legacy cohort player — has scouting + dlr.performance flat
       3. Minimal inline player — has core identity only, no scouting

     Format 2 → migrateLegacyPlayer()
     Format 3 → createPlayer() with direct core extraction
     Format 1 → enrichPlayer() only (already assembled)

   See MIGRATION_RULES.md, ENRICHMENT_RULES.md, ENGINE_FREEZE.md.
   ============================================================= */

import type { Player } from "@/data/types/player"
import { calculateDLR } from "@/data/dlr/calculateDLR"
import { migrateLegacyPlayer, detectPlayerFormat, type PlayerFormat } from "./migrateLegacyPlayer"
import { enrichPlayer, type EnrichedPlayer } from "./enrichPlayer"
import { getEnrichmentStatus } from "./getEnrichmentStatus"
import type { ValidationIssue } from "./playerValidator"

/* =========================
   OUTPUT TYPES
========================= */

export type DryRunPlayerResult = {
  sourceId: string | undefined
  format: PlayerFormat
  player: EnrichedPlayer | null
  dlrScore: number | null
  dlrConfidence: number | null
  enrichmentTier: "A" | "B" | "C" | null
  completeness: number | null
  issues: ValidationIssue[]
  scaffolded: string[]
}

export type DryRunSummary = {
  originalCount:        number
  domainFileCount:      number
  legacyScoutingCount:  number
  minimalInlineCount:   number
  unknownCount:         number
  migratedCount:      number
  enrichedCount:      number
  failedCount:        number
  warningCount:       number
  tierDistribution:   { A: number; B: number; C: number }
  averageCompleteness: number
  averageDLR:         number
  minDLR:             number
  maxDLR:             number
  warningCategories:  Record<string, number>
  missingDomainCounts: Record<string, number>
}

export type DryRunResult = {
  players:   DryRunPlayerResult[]
  summary:   DryRunSummary
}

/* =========================
   DRY RUN PIPELINE
========================= */

/**
 * Executes a full dry-run migration + enrichment pipeline against
 * a cohort array. Returns per-player results and aggregate summary.
 *
 * NON-DESTRUCTIVE — source array is never mutated.
 * NON-PRODUCTION — outputs are in-memory only.
 */
export function runCohortDryRun(cohort: unknown[]): DryRunResult {
  const playerResults: DryRunPlayerResult[] = []

  for (const source of cohort) {
    const sourceId =
      typeof source === "object" && source !== null
        ? ((source as Record<string, unknown>)["id"] as string | undefined)
        : undefined

    const format = detectPlayerFormat(source)
    let enriched: EnrichedPlayer | null = null
    let issues: ValidationIssue[] = []
    let scaffolded: string[] = []

    try {
      if (format === "domain") {
        // Domain-file player — enrich only (no migration needed)
        const result = enrichPlayer(source as Player)
        enriched = result.player
        issues = result.validation.issues
        scaffolded = result.scaffolded

      } else {
        // All other formats route through migrateLegacyPlayer()
        // (handles legacy_scouting, minimal_inline, and returns error for unknown)
        const migrated = migrateLegacyPlayer(source)
        if (migrated.validation.isValid) {
          const result = enrichPlayer(migrated.player)
          enriched = result.player
          issues = [...migrated.validation.issues, ...result.validation.issues]
          scaffolded = result.scaffolded
        } else {
          issues = migrated.validation.issues
        }
      }
    } catch (err) {
      issues.push({
        severity: "error",
        path: "pipeline",
        message: `Pipeline error: ${err instanceof Error ? err.message : String(err)}`
      })
    }

    // Compute DLR and status if we have an enriched player
    let dlrScore: number | null = null
    let dlrConfidence: number | null = null
    let enrichmentTier: "A" | "B" | "C" | null = null
    let completeness: number | null = null

    if (enriched) {
      try {
        const dlr = calculateDLR(enriched)
        dlrScore = dlr.rating ?? null
        dlrConfidence = dlr.confidence?.overall ?? null
      } catch {
        // DLR calc failure is non-fatal — report null
      }
      const status = getEnrichmentStatus(enriched)
      enrichmentTier = status.enrichmentTier
      completeness = status.completeness
    }

    playerResults.push({
      sourceId,
      format,
      player: enriched,
      dlrScore,
      dlrConfidence,
      enrichmentTier,
      completeness,
      issues,
      scaffolded,
    })
  }

  /* ---- Aggregate summary ---- */
  let domainFileCount = 0, legacyCount = 0, minimalCount = 0, unknownCount = 0
  let migratedCount = 0, enrichedCount = 0, failedCount = 0, warningCount = 0
  const tiers = { A: 0, B: 0, C: 0 }
  const completenessValues: number[] = []
  const dlrValues: number[] = []
  const warningCategories: Record<string, number> = {}
  const missingDomainCounts: Record<string, number> = {}

  for (const r of playerResults) {
    if (r.format === "domain")          domainFileCount++
    if (r.format === "legacy_scouting") legacyCount++
    if (r.format === "minimal_inline")  minimalCount++
    if (r.format === "unknown")         unknownCount++

    const hasErrors   = r.issues.some(i => i.severity === "error")
    const hasWarnings = r.issues.some(i => i.severity === "warning")

    if (r.player) {
      migratedCount++
      enrichedCount++
      if (hasWarnings && !hasErrors) warningCount++
      if (!hasErrors && !hasWarnings) { /* clean */ }
    } else {
      failedCount++
    }

    if (r.enrichmentTier) tiers[r.enrichmentTier]++
    if (r.completeness !== null) completenessValues.push(r.completeness)
    if (r.dlrScore !== null) dlrValues.push(r.dlrScore)

    // Category counts for issues
    for (const issue of r.issues) {
      const cat = issue.path.split(".")[0]
      warningCategories[cat] = (warningCategories[cat] ?? 0) + 1
    }

    // Missing domain counts
    if (r.player?.intelligence) {
      for (const d of r.player.intelligence.missingDomains ?? []) {
        missingDomainCounts[d] = (missingDomainCounts[d] ?? 0) + 1
      }
    }
  }

  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0

  const summary: DryRunSummary = {
    originalCount:        cohort.length,
    domainFileCount,
    legacyScoutingCount:  legacyCount,
    minimalInlineCount:   minimalCount,
    unknownCount,
    migratedCount,
    enrichedCount,
    failedCount,
    warningCount,
    tierDistribution:    tiers,
    averageCompleteness: avg(completenessValues),
    averageDLR:          avg(dlrValues),
    minDLR:              dlrValues.length ? Math.min(...dlrValues) : 0,
    maxDLR:              dlrValues.length ? Math.max(...dlrValues) : 0,
    warningCategories,
    missingDomainCounts,
  }

  return { players: playerResults, summary }
}
