/* =============================================================
   MEDIA ENRICHER — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   enrichMedia(player) injects a neutral 0.5 scaffold for any
   media sub-layer fields that are absent on the player.

   SAFE: All 17 media fields are pre-normalized 0–1 floats.
   Injecting 0.5 communicates "no signal — baseline" without
   fabricating any baseball truth.

   FORBIDDEN: This enricher never invents sentiment, never
   assigns above-neutral values, never overwrites existing data.

   See ENRICHMENT_RULES.md §3 for safe/forbidden media enrichment.
   See ENGINE_FREEZE.md for system boundaries.
   ============================================================= */

import type { Player, MediaData } from "@/data/types/player"

/* =========================
   OUTPUT TYPE
========================= */

export type EnrichMediaResult = {
  /** The (possibly enriched) media domain layer */
  media: MediaData
  /** Sub-paths that were scaffolded (e.g. "media.snapshot", "media.analyst") */
  scaffolded: string[]
}

/* =========================
   NEUTRAL SCAFFOLD DEFAULTS
========================= */

/**
 * Neutral media scaffold — all values at 0.5.
 *
 * 0.5 communicates "unknown / no signal / baseline" to the DLR engine.
 * The engine's scoreFromAlreadyNormalized() averages populated fields —
 * 0.5 across all fields produces a neutral media score.
 *
 * These values are NEVER above 0.5. Assigning any value above 0.5
 * would fabricate an above-average media signal.
 */
const NEUTRAL_SNAPSHOT = {
  mentions:         0.5,
  headlineImpact:   0.5,
  highlightFactor:  0.5,
  socialBuzz:       0.5,
} as const

const NEUTRAL_SCOUT = {
  fanRecognition:     0.5,
  teamVisibility:     0.5,
  interviewPresence:  0.5,
  narrativeStrength:  0.5,
  milestoneAttention: 0.5,
} as const

const NEUTRAL_ANALYST = {
  prospectPedigree:     0.5,
  hypeTrend:            0.5,
  mediaStability:       0.5,
  storyDurability:      0.5,
  breakoutProbability:  0.5,
  publicMomentum:       0.5,
  attentionDecay:       0.5,
  confidence:           0.5,
} as const

/* =========================
   ENRICHER
========================= */

/**
 * Enriches the media domain layer of a player by injecting neutral
 * 0.5 scaffolding for any absent sub-layers.
 *
 * - If `player.media` is entirely absent: inject a full neutral media object.
 * - If a sub-layer (snapshot/scout/analyst) is absent: inject neutral defaults.
 * - Existing non-null values on any present sub-layer are NEVER overwritten.
 *
 * Returns the enriched media object and a list of scaffolded sub-paths.
 * If no enrichment was needed, returns the original media and an empty list.
 */
export function enrichMedia(player: Player): EnrichMediaResult {
  const existing = player.media
  const scaffolded: string[] = []

  // ---- snapshot ----
  let snapshot: MediaData["snapshot"]
  if (!existing?.snapshot) {
    snapshot = { ...NEUTRAL_SNAPSHOT }
    scaffolded.push("media.snapshot")
  } else {
    // Preserve existing; fill any absent fields with neutral
    const hadMissing = Object.keys(NEUTRAL_SNAPSHOT).some(
      k => existing.snapshot![k as keyof typeof NEUTRAL_SNAPSHOT] == null
    )
    snapshot = {
      ...NEUTRAL_SNAPSHOT,
      ...existing.snapshot,
    }
    if (hadMissing) scaffolded.push("media.snapshot.partial")
  }

  // ---- scout ----
  let scout: MediaData["scout"]
  if (!existing?.scout) {
    scout = { ...NEUTRAL_SCOUT }
    scaffolded.push("media.scout")
  } else {
    const hadMissing = Object.keys(NEUTRAL_SCOUT).some(
      k => existing.scout![k as keyof typeof NEUTRAL_SCOUT] == null
    )
    scout = {
      ...NEUTRAL_SCOUT,
      ...existing.scout,
    }
    if (hadMissing) scaffolded.push("media.scout.partial")
  }

  // ---- analyst ----
  let analyst: MediaData["analyst"]
  if (!existing?.analyst) {
    analyst = { ...NEUTRAL_ANALYST }
    scaffolded.push("media.analyst")
  } else {
    const hadMissing = Object.keys(NEUTRAL_ANALYST).some(
      k => existing.analyst![k as keyof typeof NEUTRAL_ANALYST] == null
    )
    analyst = {
      ...NEUTRAL_ANALYST,
      ...existing.analyst,
    }
    if (hadMissing) scaffolded.push("media.analyst.partial")
  }

  // No enrichment needed if existing was fully populated
  if (scaffolded.length === 0) {
    return {
      media: existing ?? { snapshot, scout, analyst },
      scaffolded: [],
    }
  }

  const media: MediaData = {
    ...(existing ?? {}),
    snapshot,
    scout,
    analyst,
  }

  return { media, scaffolded }
}
