/* =============================================================
   ENRICHMENT AUTHORITY — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   enrichPlayer(player) is the authoritative enrichment entry point
   for adding safe structural scaffolding to partially populated
   Diamond Ledger players.

   RESPONSIBILITIES:
     - Detect missing or skeleton domain layers
     - Delegate to per-domain enrichers for safe scaffold injection
     - Preserve ALL existing non-null values — enrichment is additive
     - Attach intelligence status flag to result
     - Validate enriched player via validatePlayer()

   ENRICHMENT NEVER:
     - Modifies the frozen DLR engine (calculateDLR.ts)
     - Fabricates physical stats, scouting grades, or projections
     - Overwrites existing real data
     - Invents performance data (ERA, AVG, kRate, xERA, xAVG)
     - Invents scouting tool grades
     - Creates marketSnapshot (requires live eBay data)

   See ENRICHMENT_RULES.md for enrichment tier definitions.
   See ENGINE_FREEZE.md for system boundaries.
   See PLAYER_CONTRACT.md for field naming rules.
   ============================================================= */

import type { Player } from "@/data/types/player"
import { validatePlayer, type ValidationResult } from "./playerValidator"
import { enrichKnowledge } from "./enrichKnowledge"
import { enrichMedia } from "./enrichMedia"
import { enrichMarket } from "./enrichMarket"
import { enrichPerformance } from "./enrichPerformance"
import { getEnrichmentStatus, type EnrichmentStatus } from "./getEnrichmentStatus"

/* =========================
   OUTPUT TYPE
========================= */

export type EnrichedPlayer = Player & {
  /** Enrichment status annotation — display only, NOT consumed by DLR engine */
  intelligence?: EnrichmentStatus
}

export type EnrichPlayerResult = {
  /** The enriched player — safe for cohort arrays and UI consumption */
  player: EnrichedPlayer
  /** Validation result after enrichment */
  validation: ValidationResult
  /** Domains that had scaffolding injected in this enrichment pass */
  scaffolded: string[]
}

/* =========================
   ENRICHMENT ENTRY POINT
========================= */

/**
 * Enriches a single player by injecting safe neutral scaffolding
 * for any domain layers that are absent or structurally incomplete.
 *
 * Enrichment is ADDITIVE ONLY — existing values are never overwritten.
 *
 * Usage:
 * ```ts
 * import { enrichPlayer } from "@/data/players/enrichPlayer"
 * import { migrateLegacyPlayer } from "@/data/players/migrateLegacyPlayer"
 *
 * const { player: migrated } = migrateLegacyPlayer(legacySource)
 * const { player, validation, scaffolded } = enrichPlayer(migrated)
 *
 * console.log(player.intelligence?.enrichmentTier)  // "B"
 * console.log(scaffolded)  // ["media", "knowledge.bio", "knowledge.career"]
 * ```
 *
 * For batch enrichment across a draft cohort, use enrichCohort().
 */
export function enrichPlayer(source: Player): EnrichPlayerResult {
  const scaffolded: string[] = []

  // Work on a shallow copy — enrichment must not mutate the source object
  let player: Player = { ...source }

  // ---- Per-domain enrichment ----
  // Each enricher returns the (possibly enriched) domain layer and the
  // list of sub-paths that were scaffolded.

  const knowledgeResult = enrichKnowledge(player)
  if (knowledgeResult.scaffolded.length > 0) {
    player = { ...player, knowledge: knowledgeResult.knowledge }
    scaffolded.push(...knowledgeResult.scaffolded)
  }

  const mediaResult = enrichMedia(player)
  if (mediaResult.scaffolded.length > 0) {
    player = { ...player, media: mediaResult.media }
    scaffolded.push(...mediaResult.scaffolded)
  }

  const marketResult = enrichMarket(player)
  if (marketResult.scaffolded.length > 0) {
    player = { ...player, cardMarket: marketResult.cardMarket }
    scaffolded.push(...marketResult.scaffolded)
  }

  // Performance enricher never modifies data — it only validates and warns.
  // Its warnings are surfaced through validation below.
  const performanceResult = enrichPerformance(player)
  // performanceResult.warnings are already ValidationIssues; merge below

  // ---- Compute enrichment status ----
  const status = getEnrichmentStatus(player)

  const enriched: EnrichedPlayer = {
    ...player,
    intelligence: {
      ...status,
      scaffolded
    }
  }

  // ---- Validate ----
  const validation = validatePlayer(enriched)

  // Merge performance enrichment warnings into validation
  if (performanceResult.warnings.length > 0) {
    validation.issues.push(...performanceResult.warnings)
    validation.isValid = !validation.issues.some(i => i.severity === "error")
  }

  return {
    player: enriched,
    validation,
    scaffolded,
  }
}
