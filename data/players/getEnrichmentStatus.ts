/* =============================================================
   ENRICHMENT STATUS AUTHORITY — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   getEnrichmentStatus(player) computes the enrichment tier and
   domain population summary for a Diamond Ledger player.

   RESPONSIBILITY:
     - Inspect domain layer presence and completeness
     - Assign enrichment tier (A / B / C)
     - Return populated vs missing domain lists
     - Return completeness ratio 0–1

   This function is READ-ONLY — it never modifies the player.
   Its output is attached as player.intelligence by enrichPlayer().

   See ENRICHMENT_RULES.md §4 for tier definitions.
   See ENGINE_FREEZE.md for system boundaries.
   ============================================================= */

import type { Player } from "@/data/types/player"

/* =========================
   OUTPUT TYPE
========================= */

export type EnrichmentTier = "A" | "B" | "C"

export type EnrichmentStatus = {
  /** Tier A = fully enriched; B = partially enriched; C = structural baseline */
  enrichmentTier: EnrichmentTier
  /** Domain layers with substantive data */
  populatedDomains: string[]
  /** Domain layers that are absent or scaffold-only */
  missingDomains: string[]
  /** 0–1 ratio of populated domain slots out of total expected */
  completeness: number
  /** Domains injected with neutral scaffold (set by enrichPlayer) */
  scaffolded?: string[]
}

/* =========================
   DOMAIN INSPECTORS
========================= */

/** A domain is "substantive" if it has real data beyond neutral scaffolding */

function hasSubstantiveKnowledge(player: Player): boolean {
  const k = player.knowledge
  if (!k) return false

  // Scout tool grades are the most reliable signal of real knowledge
  const scoutTools = k.scout?.scout as Record<string, unknown> | undefined
  if (scoutTools && Object.values(scoutTools).some(v => typeof v === "number" && v > 0)) {
    return true
  }

  // Analyst scores other than 0.5 (scaffolded default) indicate real data
  const scoutAnalyst = k.scout?.analystScores as Record<string, number | null | undefined> | undefined
  if (scoutAnalyst) {
    const hasRealScore = Object.values(scoutAnalyst).some(
      v => typeof v === "number" && v !== 0.5
    )
    if (hasRealScore) return true
  }

  const careerAnalyst = k.career?.analystScores as Record<string, number | null | undefined> | undefined
  if (careerAnalyst) {
    const hasRealScore = Object.values(careerAnalyst).some(
      v => typeof v === "number" && v !== 0.5
    )
    if (hasRealScore) return true
  }

  return false
}

function hasSubstantivePerformance(player: Player): boolean {
  const p = player.performance
  if (!p) return false
  // Any non-null value in snapshot or scout or analyst = real performance data
  const hasSnap = p.snapshot && Object.values(p.snapshot).some(v => v !== null && v !== undefined)
  const hasScout = p.scout && Object.values(p.scout).some(v => v !== null && v !== undefined)
  const hasAnalyst = p.analyst && Object.values(p.analyst).some(v => v !== null && v !== undefined)
  return !!(hasSnap || hasScout || hasAnalyst)
}

function hasSubstantiveMedia(player: Player): boolean {
  const m = player.media
  if (!m) return false

  // A media object where every value is exactly 0.5 is scaffold-only
  const allFields: number[] = []
  const collectFloats = (layer: Record<string, unknown> | undefined) => {
    if (!layer) return
    for (const v of Object.values(layer)) {
      if (typeof v === "number") allFields.push(v)
    }
  }
  collectFloats(m.snapshot as Record<string, unknown> | undefined)
  collectFloats(m.scout as Record<string, unknown> | undefined)
  collectFloats(m.analyst as Record<string, unknown> | undefined)

  if (allFields.length === 0) return false

  // If ALL values are exactly 0.5 → scaffold only, not substantive
  const allNeutral = allFields.every(v => v === 0.5)
  return !allNeutral
}

function hasSubstantiveMarket(player: Player): boolean {
  const m = player.cardMarket
  if (!m) return false

  // Has price data = substantive
  if (m.rawAvg != null || m.psa9Avg != null || m.psa10Avg != null) return true

  // Has any non-0.5 signal value = substantive
  const signalFields = [
    m.liquidity, m.trend, m.scarcity, m.depth, m.volatility, m.longTerm, m.stability, m.confidence
  ]
  return signalFields.some(v => v !== null && v !== undefined && v !== 0.5)
}

/* =========================
   COMPLETENESS CALCULATION
========================= */

/**
 * Computes 0–1 completeness across 5 domain slots:
 * knowledge (2 slots: bio/scout structure + career), performance (1), media (1), market (1).
 *
 * Slots are defined this way to give knowledge proportional weight without over-counting.
 */
function computeCompleteness(player: Player): number {
  let populated = 0
  const total = 5

  // knowledge.scout.scout tools → 1 slot
  const scoutTools = player.knowledge?.scout?.scout as Record<string, unknown> | undefined
  if (scoutTools && Object.values(scoutTools).some(v => typeof v === "number" && v > 0)) {
    populated += 1
  }

  // knowledge structure (bio + career analystScores) → 1 slot
  const hasCareer = !!player.knowledge?.career?.analystScores
  const hasBio = !!player.knowledge?.bio
  if (hasCareer || hasBio) populated += 1

  // performance → 1 slot
  if (hasSubstantivePerformance(player)) populated += 1

  // media → 1 slot (substantive, not just scaffold)
  if (hasSubstantiveMedia(player)) populated += 1

  // market (price or non-neutral signal) → 1 slot
  if (hasSubstantiveMarket(player)) populated += 1

  return populated / total
}

/* =========================
   TIER ASSIGNMENT
========================= */

/**
 * Assigns enrichment tier based on domain population.
 *
 * Tier A: performance + media + market all substantive
 * Tier B: at least one domain substantive (migrated with partial data)
 * Tier C: no substantive domain data (core identity + signals only)
 */
function assignTier(
  populatedDomains: string[]
): EnrichmentTier {
  const substantive = new Set(populatedDomains)

  // Tier A: all four major domains substantive
  const hasFour =
    substantive.has("performance") &&
    substantive.has("media") &&
    (substantive.has("market") || substantive.has("cardMarket")) &&
    (substantive.has("knowledge.tools") || substantive.has("knowledge"))
  if (hasFour) return "A"

  // Tier B: at least one substantive domain
  if (populatedDomains.length > 0) return "B"

  // Tier C: no substantive data
  return "C"
}

/* =========================
   MAIN FUNCTION
========================= */

/**
 * Returns the enrichment status for a player.
 *
 * Read-only — does not modify the player.
 */
export function getEnrichmentStatus(player: Player): EnrichmentStatus {
  const populatedDomains: string[] = []
  const missingDomains: string[] = []

  // Knowledge tools
  const scoutTools = player.knowledge?.scout?.scout as Record<string, unknown> | undefined
  if (scoutTools && Object.values(scoutTools).some(v => typeof v === "number" && v > 0)) {
    populatedDomains.push("knowledge.tools")
  } else {
    missingDomains.push("knowledge.tools")
  }

  // Knowledge bio/career
  if (hasSubstantiveKnowledge(player)) {
    populatedDomains.push("knowledge")
  } else {
    missingDomains.push("knowledge")
  }

  // Performance
  if (hasSubstantivePerformance(player)) {
    populatedDomains.push("performance")
  } else {
    missingDomains.push("performance")
  }

  // Media
  if (hasSubstantiveMedia(player)) {
    populatedDomains.push("media")
  } else {
    missingDomains.push("media")
  }

  // Market
  if (hasSubstantiveMarket(player)) {
    populatedDomains.push("cardMarket")
  } else {
    missingDomains.push("cardMarket")
  }

  const completeness = computeCompleteness(player)
  const enrichmentTier = assignTier(populatedDomains)

  return {
    enrichmentTier,
    populatedDomains,
    missingDomains,
    completeness,
  }
}
