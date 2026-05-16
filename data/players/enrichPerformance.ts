/* =============================================================
   PERFORMANCE ENRICHER — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   enrichPerformance(player) validates the performance layer and
   emits diagnostic warnings.

   THIS ENRICHER NEVER INJECTS DATA.

   Performance enrichment is FORBIDDEN because all scoring fields
   are physical stats or real Statcast data:
     - Pitchers: ERA (snapshot), kPercent (scout), xERA (analyst)
     - Hitters:  AVG (snapshot), kRate (scout), xAVG (analyst)

   Injecting any placeholder would fabricate a physical stat that
   the DLR engine would treat as real. This is unconditionally
   forbidden per ENRICHMENT_RULES.md §3.

   RESPONSIBILITY:
   Detect and warn about common performance layer issues that should
   be corrected by creating real *_performance.ts domain files.

   See ENRICHMENT_RULES.md §3 Forbidden for rationale.
   See PLAYER_CONTRACT.md §performance for naming rules.
   See ENGINE_FREEZE.md for system boundaries.
   ============================================================= */

import type { Player } from "@/data/types/player"
import type { ValidationIssue } from "./playerValidator"

/* =========================
   OUTPUT TYPE
========================= */

export type EnrichPerformanceResult = {
  /**
   * Performance is never modified — always the original player.performance.
   * This field exists only for API symmetry with other enrichers.
   */
  performance: Player["performance"]
  /** Diagnostic warnings about performance layer issues */
  warnings: ValidationIssue[]
}

/* =========================
   ENRICHER (VALIDATION ONLY)
========================= */

/**
 * Validates the performance layer and emits warnings for common issues.
 *
 * NEVER modifies performance data. If performance is absent, emits a
 * warning indicating that a *_performance.ts domain file is required.
 *
 * This enricher is intentionally a no-op for enrichment — it exists to
 * provide diagnostic guidance within the enrichment pipeline.
 */
export function enrichPerformance(player: Player): EnrichPerformanceResult {
  const warnings: ValidationIssue[] = []
  const p = player.performance

  if (!p) {
    warnings.push({
      severity: "warning",
      path: "performance",
      message:
        "Performance layer is absent. Player will score 0 on the performance layer (40 pts max). " +
        "Create a *_performance.ts domain file per PLAYER_CONTRACT.md."
    })
    return { performance: undefined, warnings }
  }

  // Check for lowercase ERA/AVG capitalization bugs (PLAYER_CONTRACT.md Known Issues)
  const snap = p.snapshot as Record<string, unknown> | undefined
  if (snap) {
    if (snap["era"] !== undefined && snap["ERA"] === undefined) {
      warnings.push({
        severity: "warning",
        path: "performance.snapshot.era",
        message:
          "Found 'era' (lowercase) — engine reads 'ERA' (uppercase). " +
          "Pitcher snapshot scores 0 until this is fixed. " +
          "Rename 'era' → 'ERA' in the *_performance.ts domain file."
      })
    }
    if (snap["avg"] !== undefined && snap["AVG"] === undefined) {
      warnings.push({
        severity: "warning",
        path: "performance.snapshot.avg",
        message:
          "Found 'avg' (lowercase) — engine reads 'AVG' (uppercase). " +
          "Hitter snapshot scores 0 until this is fixed. " +
          "Rename 'avg' → 'AVG' in the *_performance.ts domain file."
      })
    }
  }

  // Check for missing kind declaration
  if (!p.kind) {
    warnings.push({
      severity: "warning",
      path: "performance.kind",
      message:
        "performance.kind is absent. Declare 'hitter' or 'pitcher' to confirm role. " +
        "The engine uses position for role detection — kind is a documentation aid."
    })
  }

  return { performance: p, warnings }
}
