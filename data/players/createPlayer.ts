/* =============================================================
   PLAYER FACTORY — PIPELINE AUTHORITY (2026-05-08)
   -------------------------------------------------------------
   createPlayer(input) is the authoritative factory for assembling
   new player objects conforming to the Diamond Ledger player
   contract (see PLAYER_CONTRACT.md).

   RESPONSIBILITIES:
     - Assembles the canonical player structure from domain inputs
     - Injects safe defaults for optional fields
     - Validates the assembled player before returning
     - Preserves the frozen engine architecture

   DO NOT:
     - Generate fake scores
     - Invent missing performance, media, or market data
     - Alter DLR calculations or scoring constants
     - Produce player.dlr.score — that is set by the DLR engine,
       not by this factory

   EXTENSION:
     - Add new optional input fields to CreatePlayerInput as the
       Player schema grows (additive only)
     - Do NOT add scoring logic to this file

   See ENGINE_FREEZE.md for system boundaries.
   See PLAYER_CONTRACT.md for field naming rules and sub-layer specs.
   ============================================================= */

import type {
  Player,
  KnowledgeData,
  PerformanceData,
  MediaData,
  LegacyCardMarket,
  PlayerTracker,
  PlayerCareer,
  PlayerSignals,
  PlayerStats
} from "@/data/types/player"

import { validatePlayer, type ValidationResult } from "./playerValidator"

/* =========================
   INPUT TYPES
========================= */

/**
 * Core player identity — required fields and common profile fields.
 * Passed as `input.core` to createPlayer().
 */
export type PlayerCoreInput = {
  /** Unique snake_case identifier. e.g. "casey_mize" */
  id: string
  /** Display name. e.g. "Casey Mize" */
  name: string
  /** 3-letter MLB org. e.g. "DET" */
  team: string
  /** Position string. Determines scoring role. e.g. "RHP", "SS", "3B" */
  position: string
  /** Level tier. e.g. "MLB", "AA", "A", "DRAFT" */
  tier?: string
  /** Same as tier in most cases */
  level?: string
  /** Current age */
  age?: number
  /** "R", "L", or "S" */
  bats?: string
  /** "R" or "L" */
  throws?: string
  /** Path to card image. e.g. "/cards/2025_draft/casey_mize.png" */
  card?: string
  /** Draft year (for cohort array entries) */
  draftYear?: number
  /** Draft pick number (for cohort array entries) */
  draftPick?: number
  /** Draft round */
  draftRound?: number
  /** Legacy stats block — hitter (display-only, NOT scoring input) */
  hitting?: PlayerStats | null
  /** Legacy stats block — pitcher (display-only, NOT scoring input) */
  pitching?: PlayerStats | null
}

/**
 * Full input to createPlayer(). All domain layers are optional —
 * the factory injects structural defaults but will NOT invent data.
 * Missing layers will generate validator warnings and score 0 or
 * use engine defaults for that DLR layer.
 */
export type CreatePlayerInput = {
  core: PlayerCoreInput
  knowledge?: KnowledgeData
  performance?: PerformanceData
  media?: MediaData
  /** cardMarket object from *_market.ts */
  market?: LegacyCardMarket
  tracker?: PlayerTracker
  careerAverages?: PlayerCareer
  signals?: PlayerSignals
}

/* =========================
   OUTPUT TYPE
========================= */

export type CreatePlayerResult = {
  /** The assembled player object, ready for cohort arrays and UI consumption */
  player: Player
  /** Validation result — check .isValid and .issues before publishing the player */
  validation: ValidationResult
}

/* =========================
   DEFAULTS
========================= */

const DEFAULT_SIGNALS: PlayerSignals = {
  tracked: false,
  heat: null,
  price: null
}

/* =========================
   FACTORY
========================= */

/**
 * Assembles a canonical Diamond Ledger player object from structured inputs.
 *
 * Usage:
 * ```ts
 * import { createPlayer } from "@/data/players/createPlayer"
 *
 * const { player, validation } = createPlayer({
 *   core:        { id: "jane_smith", name: "Jane Smith", team: "NYY", position: "SS", tier: "AA" },
 *   knowledge:   jane_smith_knowledge,
 *   performance: jane_smith_performance,
 *   media:       jane_smith_media,
 *   market:      jane_smith_market,
 *   tracker:     { AB: 85, PA: 100, G: 25, ... },
 * })
 *
 * if (!validation.isValid) {
 *   console.warn("Player has validation errors:", validation.issues.filter(i => i.severity === "error"))
 * }
 * ```
 *
 * The factory NEVER modifies domain data. It assembles only.
 * Fix validation errors by correcting domain files per PLAYER_CONTRACT.md.
 */
export function createPlayer(input: CreatePlayerInput): CreatePlayerResult {
  const { core, knowledge, performance, media, market, tracker, careerAverages, signals } = input

  // ---- Assemble the canonical player object ----
  const player: Player = {

    // Core identity
    id: core.id,
    name: core.name,
    team: core.team,
    position: core.position,
    tier: core.tier,
    level: core.level,
    age: core.age,
    bats: core.bats,
    throws: core.throws,
    card: core.card,

    // Draft fields (optional — only set for cohort array entries)
    ...(core.draftYear !== undefined ? { draftYear: core.draftYear } : {}),
    ...(core.draftPick !== undefined ? { draftPick: core.draftPick } : {}),
    ...(core.draftRound !== undefined ? { draftRound: core.draftRound } : undefined),

    // Signals — safe default: untracked, no heat, no price signal
    signals: signals ?? DEFAULT_SIGNALS,

    // Legacy stats blocks — display-only, NOT scoring inputs.
    // Uppercase keys (AVG, HR) are intentional in this legacy block.
    hitting: core.hitting ?? null,
    pitching: core.pitching ?? null,

    // Domain layers — passed through as-is.
    // The factory does NOT invent data. If a layer is omitted, it is
    // undefined and the DLR engine applies its default behavior.
    knowledge: knowledge,
    performance: performance,
    media: media,
    cardMarket: market,

    // Live tracker — passed through as-is.
    // Factory does NOT pre-fill AB, IP, or any stat values.
    tracker: tracker,

    // Career averages — display-only context, NEVER used in scoring.
    careerAverages: careerAverages,

    // DLR engine link.
    //
    // player.dlr.score and player.dlr.weeklyHistory are read by
    // calculateDLRMovement() as the persisted baseDLR and history.
    // Leave them undefined for a new player — the engine will
    // default to baseDLR = 50 and an empty weeklyHistory.
    //
    // player.dlr.performance/media/cardMarket are legacy backrefs.
    // calculateDLR() reads player.performance / player.media /
    // player.cardMarket directly — NOT through player.dlr.
    // The backrefs are preserved for compatibility only.
    dlr: {
      score: undefined,
      weeklyHistory: undefined,
      performance: performance,
      media: media,
      cardMarket: market
    }
  }

  // ---- Validate the assembled player ----
  // Returns all issues as ValidationIssue[]. Does not throw.
  // Callers should inspect validation.isValid and fix errors per
  // PLAYER_CONTRACT.md before publishing the player to a cohort array.
  const validation = validatePlayer(player)

  return { player, validation }
}

/* =========================
   COHORT ENTRY HELPER
========================= */

/**
 * Wraps a player for inclusion in a cohort array by spreading
 * cohort-specific fields onto the assembled player.
 *
 * Usage:
 * ```ts
 * import { createPlayer, toCohortEntry } from "@/data/players/createPlayer"
 *
 * const { player } = createPlayer({ core: { ... }, ... })
 *
 * export const playersDraft2025 = [
 *   toCohortEntry(player, { draftYear: 2025, draftPick: 1, card: "/cards/..." }),
 *   ...
 * ]
 * ```
 */
export function toCohortEntry(
  player: Player,
  cohort: {
    draftYear?: number
    draftPick?: number
    draftRound?: number
    card?: string
  }
): Player {
  return {
    ...player,
    ...(cohort.draftYear !== undefined ? { draftYear: cohort.draftYear } : {}),
    ...(cohort.draftPick !== undefined ? { draftPick: cohort.draftPick } : {}),
    ...(cohort.draftRound !== undefined ? { draftRound: cohort.draftRound } : {}),
    ...(cohort.card !== undefined ? { card: cohort.card } : {})
  }
}
