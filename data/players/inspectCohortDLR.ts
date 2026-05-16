/* =============================================================
   DLR INSPECTION — NON-PRODUCTION (2026-05-08)
   -------------------------------------------------------------
   inspectCohortDLR(dryRunResult) reads dry-run player outputs and
   generates a DLR distribution report.

   DRY-RUN RULES:
     - Read-only — never alters player data
     - Never patches missing data
     - Never mutates dry-run outputs
     - All results are in-memory only

   FROZEN ENGINE:
     DLR scores reported here are computed via the frozen
     calculateDLR() function. This inspector reports scores only —
     it has no scoring logic of its own.

   See ENGINE_FREEZE.md. See ENRICHMENT_RULES.md.
   ============================================================= */

import type { DryRunResult } from "./runCohortDryRun"

/* =========================
   OUTPUT TYPES
========================= */

export type DLRBucket = {
  range: string
  count: number
  playerIds: string[]
}

export type LowConfidenceEntry = {
  id: string | undefined
  dlrScore: number | null
  confidence: number | null
  enrichmentTier: "A" | "B" | "C" | null
  missingDomains: string[]
  format: string
}

export type InvalidEntry = {
  id: string | undefined
  errorMessages: string[]
  format: string
}

export type DLRInspectionReport = {
  /** Distribution in 10-point DLR buckets */
  distribution: DLRBucket[]
  /** Summary statistics */
  stats: {
    count: number
    min: number
    max: number
    average: number
    median: number
    stdDev: number
  }
  /** Players with lowest DLR confidence (bottom 5) */
  lowestConfidence: LowConfidenceEntry[]
  /** Players that failed pipeline validation */
  structurallyInvalid: InvalidEntry[]
  /** Tier breakdown */
  tierBreakdown: {
    A: { count: number; avgDLR: number; avgConfidence: number }
    B: { count: number; avgDLR: number; avgConfidence: number }
    C: { count: number; avgDLR: number; avgConfidence: number }
  }
  /** Common missing domain patterns */
  missingDomainPatterns: Record<string, number>
}

/* =========================
   HELPERS
========================= */

function avg(arr: number[]): number {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0
}

function median(arr: number[]): number {
  if (!arr.length) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2
    : (sorted[mid] ?? 0)
}

function stdDev(arr: number[]): number {
  if (arr.length < 2) return 0
  const mean = avg(arr)
  return Math.sqrt(arr.reduce((sum, v) => sum + (v - mean) ** 2, 0) / arr.length)
}

/* =========================
   INSPECTOR
========================= */

/**
 * Generates a DLR distribution and confidence report from a dry-run result.
 *
 * Read-only — never mutates input data.
 */
export function inspectCohortDLR(dryRunResult: DryRunResult): DLRInspectionReport {
  const { players } = dryRunResult

  const scoredPlayers = players.filter(p => p.dlrScore !== null && p.player !== null)

  /* ---- DLR distribution in 10-point buckets ---- */
  const bucketMap: Record<string, { count: number; ids: string[] }> = {}
  const bucketLabels = ["0-9","10-19","20-29","30-39","40-49","50-59","60-69","70-79","80-89","90-100"]
  for (const label of bucketLabels) {
    bucketMap[label] = { count: 0, ids: [] }
  }

  const dlrValues: number[] = []
  for (const p of scoredPlayers) {
    const score = p.dlrScore!
    dlrValues.push(score)
    const bucket = Math.min(Math.floor(score / 10), 9)
    const label = bucketLabels[bucket] ?? "90-100"
    bucketMap[label]!.count++
    bucketMap[label]!.ids.push(p.sourceId ?? "unknown")
  }

  const distribution: DLRBucket[] = bucketLabels.map(label => ({
    range: label,
    count: bucketMap[label]!.count,
    playerIds: bucketMap[label]!.ids,
  }))

  /* ---- Stats ---- */
  const stats = {
    count:   dlrValues.length,
    min:     dlrValues.length ? Math.min(...dlrValues) : 0,
    max:     dlrValues.length ? Math.max(...dlrValues) : 0,
    average: avg(dlrValues),
    median:  median(dlrValues),
    stdDev:  stdDev(dlrValues),
  }

  /* ---- Lowest confidence (bottom 5, excluding failed) ---- */
  const confEntries: LowConfidenceEntry[] = scoredPlayers
    .filter(p => p.dlrConfidence !== null)
    .map(p => ({
      id:             p.sourceId,
      dlrScore:       p.dlrScore,
      confidence:     p.dlrConfidence,
      enrichmentTier: p.enrichmentTier,
      missingDomains: p.player?.intelligence?.missingDomains ?? [],
      format:         p.format,
    }))
    .sort((a, b) => (a.confidence ?? 1) - (b.confidence ?? 1))
    .slice(0, 5)

  /* ---- Structurally invalid ---- */
  const structurallyInvalid: InvalidEntry[] = players
    .filter(p => p.player === null || p.issues.some(i => i.severity === "error"))
    .map(p => ({
      id:            p.sourceId,
      errorMessages: p.issues.filter(i => i.severity === "error").map(i => i.message),
      format:        p.format,
    }))

  /* ---- Tier breakdown ---- */
  const tierData = { A: { scores: [] as number[], confs: [] as number[] }, B: { scores: [] as number[], confs: [] as number[] }, C: { scores: [] as number[], confs: [] as number[] } }
  for (const p of scoredPlayers) {
    const t = p.enrichmentTier
    if (t && p.dlrScore !== null) {
      tierData[t].scores.push(p.dlrScore)
      if (p.dlrConfidence !== null) tierData[t].confs.push(p.dlrConfidence)
    }
  }
  const tierBreakdown = {
    A: { count: tierData.A.scores.length, avgDLR: avg(tierData.A.scores), avgConfidence: avg(tierData.A.confs) },
    B: { count: tierData.B.scores.length, avgDLR: avg(tierData.B.scores), avgConfidence: avg(tierData.B.confs) },
    C: { count: tierData.C.scores.length, avgDLR: avg(tierData.C.scores), avgConfidence: avg(tierData.C.confs) },
  }

  /* ---- Missing domain patterns ---- */
  const missingDomainPatterns: Record<string, number> = {}
  for (const p of players) {
    for (const d of p.player?.intelligence?.missingDomains ?? []) {
      missingDomainPatterns[d] = (missingDomainPatterns[d] ?? 0) + 1
    }
  }

  return {
    distribution,
    stats,
    lowestConfidence: confEntries,
    structurallyInvalid,
    tierBreakdown,
    missingDomainPatterns,
  }
}
