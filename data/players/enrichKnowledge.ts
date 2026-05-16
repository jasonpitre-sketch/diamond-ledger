/* =============================================================
   KNOWLEDGE ENRICHER — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   enrichKnowledge(player) injects neutral scaffolding for absent
   knowledge sub-layers.

   SAFE enrichment targets:
   - knowledge.bio: neutral categorical strings ("neutral", "moderate")
   - knowledge.career: neutral categorical strings + 0.5 analystScores
   - knowledge.scout.snapshot: neutral text signal strings
   - knowledge.scout.analystScores: neutral 0.5 values

   FORBIDDEN — never enrich:
   - knowledge.scout.scout (hit/power/run/arm/field, fastball/breaking/etc.)
     → Real scouting grades. Cannot fabricate.
   - knowledge.scout.scoutScores → Derived from real tools
   - knowledge.bio.scoutScores / knowledge.career.scoutScores → same

   The DLR engine reads categorical strings via scoreBioCategorical()
   which returns 0.5 for "neutral" and "moderate". Injecting these
   communicates "no signal — baseline" without fabricating truth.

   See ENRICHMENT_RULES.md §3 for safe/forbidden knowledge enrichment.
   See PLAYER_CONTRACT.md §knowledge for sub-layer specs.
   See ENGINE_FREEZE.md for system boundaries.
   ============================================================= */

import type { Player, KnowledgeData, LayerRecord } from "@/data/types/player"

/* =========================
   OUTPUT TYPE
========================= */

export type EnrichKnowledgeResult = {
  /** The (possibly enriched) knowledge domain layer */
  knowledge: KnowledgeData | undefined
  /** Sub-paths that were scaffolded */
  scaffolded: string[]
}

/* =========================
   NEUTRAL SCAFFOLD DEFAULTS
========================= */

/**
 * Neutral bio snapshot — categorical strings that score 0.5 via
 * scoreBioCategorical() in calculateDLR.ts.
 *
 * "neutral" maps to 0.5 in the scoring function:
 *   if (["moderate","progressing","neutral"].includes(v)) return 0.5
 */
const NEUTRAL_BIO_SNAPSHOT = {
  archetype:          "neutral",
  developmentPath:    "neutral",
  physicalProjection: "neutral",
  riskProfile:        "neutral",
} as const

/**
 * Neutral bio analyst — categorical strings for the analyst sub-layer.
 */
const NEUTRAL_BIO_ANALYST = {
  serviceTime:  "neutral",
  value:        "neutral",
  orgRole:      "neutral",
  development:  "neutral",
  risk:         "neutral",
} as const

/**
 * Neutral scout snapshot — text signals for the engine's textSignalScore().
 * "neutral" scores 0.5 per the SIGNAL_MAP in signalEngine.ts.
 */
const NEUTRAL_SCOUT_SNAPSHOT = {
  primaryTool: "neutral",
  roleType:    "neutral",
} as const

/**
 * Neutral scout analystScores — 0–1 normalized floats.
 * 0.5 = no signal, baseline.
 */
const NEUTRAL_SCOUT_ANALYST_SCORES = {
  ceiling: 0.5,
  floor:   0.5,
} as const

/**
 * Neutral career snapshot — text signal for draftPedigree.
 */
const NEUTRAL_CAREER_SNAPSHOT = {
  draftPedigree: "neutral",
} as const

/**
 * Neutral career scout — text signal for projectionPath.
 */
const NEUTRAL_CAREER_SCOUT = {
  projectionPath: "neutral",
} as const

/**
 * Neutral career analystScores — 0–1 normalized float for timeline.
 */
const NEUTRAL_CAREER_ANALYST_SCORES = {
  timeline: 0.5,
} as const

/* =========================
   HELPERS
========================= */

function isNullish(v: unknown): v is null | undefined {
  return v === null || v === undefined
}

function fillNeutralRecord<T extends Record<string, unknown>>(
  existing: Record<string, unknown> | undefined,
  neutral: T,
  scaffolded: string[],
  label: string
): LayerRecord {
  if (!existing) {
    scaffolded.push(label)
    return { ...neutral } as unknown as LayerRecord
  }
  const missing = (Object.keys(neutral) as Array<keyof T>).filter(
    k => isNullish(existing[k as string])
  )
  if (missing.length === 0) return existing as unknown as LayerRecord
  scaffolded.push(`${label}.partial`)
  const filled: Record<string, unknown> = { ...existing }
  for (const k of missing) {
    filled[k as string] = neutral[k]
  }
  return filled as unknown as LayerRecord
}

/* =========================
   ENRICHER
========================= */

/**
 * Enriches the knowledge domain layer by injecting neutral categorical
 * scaffolding for absent bio, career, and scout annotation sub-layers.
 *
 * Scout tool grades (knowledge.scout.scout) are NEVER enriched.
 *
 * Enrichment is additive — existing values are never overwritten.
 */
export function enrichKnowledge(player: Player): EnrichKnowledgeResult {
  const existing = player.knowledge
  const scaffolded: string[] = []

  /* ---- bio ---- */
  const existingBio = existing?.bio

  const bioSnapshot = fillNeutralRecord(
    existingBio?.snapshot as Record<string, unknown> | undefined,
    NEUTRAL_BIO_SNAPSHOT,
    scaffolded,
    "knowledge.bio.snapshot"
  )

  const bioAnalyst = fillNeutralRecord(
    existingBio?.analyst as Record<string, unknown> | undefined,
    NEUTRAL_BIO_ANALYST,
    scaffolded,
    "knowledge.bio.analyst"
  )

  // Preserve existing scout and scoutScores/analystScores — NOT enriched
  const bio = {
    ...(existingBio ?? {}),
    snapshot: bioSnapshot,
    analyst:  bioAnalyst,
  }

  /* ---- scout ---- */
  const existingScout = existing?.scout

  // scout.snapshot — safe to scaffold with neutral text signals
  const scoutSnapshot = fillNeutralRecord(
    existingScout?.snapshot as Record<string, unknown> | undefined,
    NEUTRAL_SCOUT_SNAPSHOT,
    scaffolded,
    "knowledge.scout.snapshot"
  )

  // scout.analystScores — safe to scaffold with 0.5 neutrals
  const scoutAnalystScores = fillNeutralRecord(
    existingScout?.analystScores as Record<string, unknown> | undefined,
    NEUTRAL_SCOUT_ANALYST_SCORES,
    scaffolded,
    "knowledge.scout.analystScores"
  )

  // scout.scout — NEVER enriched (real tool grades only)
  const scout = {
    ...(existingScout ?? {}),
    snapshot:     scoutSnapshot,
    analystScores: scoutAnalystScores,
    // scout.scout preserved as-is — no enrichment
    ...(existingScout?.scout ? { scout: existingScout.scout } : {}),
  }

  /* ---- career ---- */
  const existingCareer = existing?.career

  const careerSnapshot = fillNeutralRecord(
    existingCareer?.snapshot as Record<string, unknown> | undefined,
    NEUTRAL_CAREER_SNAPSHOT,
    scaffolded,
    "knowledge.career.snapshot"
  )

  const careerScout = fillNeutralRecord(
    existingCareer?.scout as Record<string, unknown> | undefined,
    NEUTRAL_CAREER_SCOUT,
    scaffolded,
    "knowledge.career.scout"
  )

  const careerAnalystScores = fillNeutralRecord(
    existingCareer?.analystScores as Record<string, unknown> | undefined,
    NEUTRAL_CAREER_ANALYST_SCORES,
    scaffolded,
    "knowledge.career.analystScores"
  )

  const career = {
    ...(existingCareer ?? {}),
    snapshot:      careerSnapshot,
    scout:         careerScout,
    analystScores: careerAnalystScores,
  }

  if (scaffolded.length === 0) {
    return { knowledge: existing, scaffolded: [] }
  }

  const knowledge: KnowledgeData = {
    ...(existing ?? {}),
    bio: bio as KnowledgeData["bio"],
    scout: scout as KnowledgeData["scout"],
    career: career as KnowledgeData["career"],
  }

  return { knowledge, scaffolded }
}
