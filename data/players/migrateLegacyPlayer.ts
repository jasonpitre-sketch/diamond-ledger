/* =============================================================
   COHORT MIGRATION AUTHORITY — PIPELINE EXTENSION (2026-05-08)
   -------------------------------------------------------------
   migrateLegacyPlayer(player) is the authoritative converter for
   transforming non-domain cohort players into canonical Diamond
   Ledger player objects conforming to PLAYER_CONTRACT.md.

   SUPPORTED FORMATS:
     "legacy_scouting"  — 2025/2026 inline format with scouting+dlr
                          flat objects. Mapped per MIGRATION_RULES.md.
     "minimal_inline"   — 2018 inline format with core identity +
                          signals only. No scouting, no dlr block.
                          Assembled via createPlayer() directly.
     "domain"           — Already assembled. Should not come here.
     "unknown"          — Unrecognized shape. Returns error.

   RESPONSIBILITIES:
     - Detect player format via detectPlayerFormat()
     - Route to the correct migration path
     - Normalize field names and values per MIGRATION_RULES.md
     - Assemble domain layers where safe mappings exist
     - Leave domain layers undefined where no safe mapping exists
     - Pass assembled input to createPlayer() for final assembly
       and validation

   DO NOT:
     - Invent performance, media, or knowledge data
     - Normalize physical stats (ERA, AVG, xERA, xAVG) to 0–1
     - Map legacy dlr.performance signals to PerformanceData
     - Map legacy dlr.media signals to MediaData
     - Apply scouting tool grades to pitchers
     - Set dlr.score to any value
     - Add scoring constants or weights

   See MIGRATION_RULES.md for the authoritative mapping table.
   See ENGINE_FREEZE.md for system boundaries.
   See PLAYER_CONTRACT.md for field naming rules.
   ============================================================= */

import { createPlayer, type CreatePlayerResult } from "./createPlayer"
import type { ValidationIssue } from "./playerValidator"

/* =========================
   LEGACY TYPE HELPERS
========================= */

/**
 * Minimal shape of a legacy cohort player (2025 / 2026 inline format).
 * Typed loosely — actual legacy objects vary widely.
 */
type LegacyPlayer = Record<string, unknown>

/** Scouting block as found in legacy players */
type LegacyScouting = {
  hit?: unknown
  power?: unknown
  speed?: unknown
  arm?: unknown
  field?: unknown
  overall?: unknown
}

/** Legacy dlr.cardMarket block */
type LegacyDLRCardMarket = {
  psa10Premium?: unknown
  liquidity?: unknown
  scarcity?: unknown
  trend?: unknown
  volatility?: unknown
  depth?: unknown
  longTerm?: unknown
  stability?: unknown
  confidence?: unknown
}

/** Full legacy dlr block — can be present or absent */
type LegacyDLR = {
  performance?: {
    trend?: unknown
    ageFactor?: unknown
    consistency?: unknown
    durability?: unknown
    upside?: unknown
    floor?: unknown
    confidence?: unknown
  }
  media?: Record<string, unknown>
  cardMarket?: LegacyDLRCardMarket
  score?: unknown
  weeklyHistory?: unknown
}

/* =========================
   FORMAT DETECTION
========================= */

/** The three cohort player formats found in Diamond Ledger + the fallback */
export type PlayerFormat = "domain" | "legacy_scouting" | "minimal_inline" | "unknown"

/** Returns true if player already has real domain layers (knowledge/performance/media) */
function isDomainFilePlayer(player: unknown): boolean {
  if (typeof player !== "object" || player === null) return false
  const p = player as Record<string, unknown>
  return (
    (typeof p["knowledge"] === "object" && p["knowledge"] !== null) ||
    (typeof p["performance"] === "object" && p["performance"] !== null) ||
    (typeof p["media"] === "object" && p["media"] !== null)
  )
}

/** Returns true if player has the 2025/2026 scouting+dlr flat format */
function isLegacyScoutingPlayer(player: unknown): boolean {
  if (typeof player !== "object" || player === null) return false
  const p = player as Record<string, unknown>
  return typeof p["scouting"] === "object" && p["scouting"] !== null
}

/**
 * Returns true if player is a minimal inline player:
 * has core identity (id + position) but NO scouting block and NO domain layers.
 * Characteristic of 2018 draft cohort inline entries.
 */
function isMinimalInlinePlayer(player: unknown): boolean {
  if (typeof player !== "object" || player === null) return false
  const p = player as Record<string, unknown>
  return (
    typeof p["id"] === "string" && p["id"] !== "" &&
    typeof p["position"] === "string" &&
    (typeof p["scouting"] !== "object" || p["scouting"] === null) &&
    (typeof p["knowledge"] !== "object" || p["knowledge"] === null) &&
    (typeof p["performance"] !== "object" || p["performance"] === null) &&
    (typeof p["media"] !== "object" || p["media"] === null)
  )
}

/**
 * Detects the format of a cohort player object.
 *
 * Returns:
 *   "domain"          — already has real domain layers (knowledge/performance/media)
 *   "legacy_scouting" — 2025/2026 flat scouting+dlr inline format
 *   "minimal_inline"  — 2018 core-identity-only format (no scouting, no dlr)
 *   "unknown"         — unrecognized shape (missing id or other required fields)
 */
export function detectPlayerFormat(player: unknown): PlayerFormat {
  if (isDomainFilePlayer(player)) return "domain"
  if (isLegacyScoutingPlayer(player)) return "legacy_scouting"
  if (isMinimalInlinePlayer(player)) return "minimal_inline"
  return "unknown"
}

/**
 * @deprecated Use detectPlayerFormat(player) === "legacy_scouting" instead.
 * Kept for backward compatibility with existing callers.
 */
export function isLegacyPlayer(player: unknown): player is LegacyPlayer {
  return isLegacyScoutingPlayer(player)
}

/* =========================
   ROLE DETECTION
========================= */

const PITCHER_POSITIONS = new Set([
  "P", "SP", "RP", "CP", "LHP", "RHP", "LHRP", "RHRP"
])

function isPitcherPosition(position: unknown): boolean {
  if (typeof position !== "string") return false
  const upper = position.toUpperCase().trim()
  return PITCHER_POSITIONS.has(upper)
}

/* =========================
   NORMALIZATION UTILITIES
========================= */

/** Normalize tier/level strings — map "" to undefined */
function normalizeTier(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined
  const trimmed = raw.trim()
  if (trimmed === "") return undefined
  return trimmed
}

/** Parse a float, return undefined if not a finite number */
function parseFloat01(raw: unknown): number | undefined {
  if (typeof raw === "number" && isFinite(raw)) return raw
  if (typeof raw === "string") {
    const n = Number(raw)
    if (isFinite(n)) return n
  }
  return undefined
}

/** Clamp a number to [0, 1]. Emits a warning if clamping occurred. */
function clamp01(
  value: number,
  fieldPath: string,
  warnings: ValidationIssue[]
): number {
  if (value < 0) {
    warnings.push({
      severity: "warning",
      path: fieldPath,
      message: `Value ${value} is below 0 — clamped to 0.`
    })
    return 0
  }
  if (value > 1) {
    warnings.push({
      severity: "warning",
      path: fieldPath,
      message: `Value ${value} is above 1 — clamped to 1.`
    })
    return 1
  }
  return value
}

/** Parse a tool grade, validate 20–80 range. Returns undefined if invalid. */
function parseToolGrade(
  raw: unknown,
  fieldPath: string,
  warnings: ValidationIssue[]
): number | undefined {
  const n = parseFloat01(raw)
  if (n === undefined) return undefined
  if (n === 0) {
    // Zero is a pitcher placeholder in legacy hitter tool sets — skip
    warnings.push({
      severity: "warning",
      path: fieldPath,
      message: `Tool grade is 0 — likely a pitcher placeholder, skipped.`
    })
    return undefined
  }
  if (n < 20) {
    warnings.push({
      severity: "warning",
      path: fieldPath,
      message: `Tool grade ${n} is below 20-80 scale minimum — clamped to 20.`
    })
    return 20
  }
  if (n > 80) {
    warnings.push({
      severity: "warning",
      path: fieldPath,
      message: `Tool grade ${n} exceeds 20-80 scale maximum — clamped to 80.`
    })
    return 80
  }
  return n
}

/** Split "R/R" → { bats: "R", throws: "R" } */
function parseBatThrow(raw: unknown): { bats?: string; throws?: string } {
  if (typeof raw !== "string") return {}
  const parts = raw.split("/")
  if (parts.length !== 2) return {}
  const bats = parts[0]?.trim()
  const throws_ = parts[1]?.trim()
  return {
    bats: bats || undefined,
    throws: throws_ || undefined
  }
}

/* =========================
   DOMAIN LAYER BUILDERS
========================= */

/**
 * Builds a minimal knowledge object for hitters from the legacy scouting block.
 * Populates only knowledge.scout.scout — all other sub-layers are omitted.
 * Returns undefined if no valid tool grades are found.
 */
function buildHitterKnowledge(
  scouting: LegacyScouting,
  warnings: ValidationIssue[]
): Record<string, unknown> | undefined {
  const tools: Record<string, number> = {}

  const hit = parseToolGrade(scouting.hit, "scouting.hit", warnings)
  if (hit !== undefined) tools.hit = hit

  const power = parseToolGrade(scouting.power, "scouting.power", warnings)
  if (power !== undefined) tools.power = power

  // speed → run (MIGRATION_RULES.md §2)
  const run = parseToolGrade(scouting.speed, "scouting.speed", warnings)
  if (run !== undefined) tools.run = run

  const arm = parseToolGrade(scouting.arm, "scouting.arm", warnings)
  if (arm !== undefined) tools.arm = arm

  const field = parseToolGrade(scouting.field, "scouting.field", warnings)
  if (field !== undefined) tools.field = field

  // scouting.overall: discard — not a DLR scoring input
  if (Object.keys(tools).length === 0) {
    warnings.push({
      severity: "warning",
      path: "scouting",
      message: "No valid hitter tool grades found in legacy scouting block. knowledge will be undefined."
    })
    return undefined
  }

  return {
    scout: {
      scout: tools
    }
  }
}

/**
 * Builds a LegacyCardMarket object from the legacy dlr.cardMarket block.
 * Only maps the fields that have a direct contract equivalent.
 * Returns undefined if no valid fields are found.
 */
function buildCardMarket(
  legacyCardMarket: LegacyDLRCardMarket,
  warnings: ValidationIssue[]
): Record<string, unknown> | undefined {
  const market: Record<string, number> = {}

  const fields: Array<[keyof LegacyDLRCardMarket, string]> = [
    ["liquidity", "cardMarket.liquidity"],
    ["scarcity",  "cardMarket.scarcity"],
    ["trend",     "cardMarket.trend"],
    ["volatility","cardMarket.volatility"],
    ["depth",     "cardMarket.depth"],
    ["longTerm",  "cardMarket.longTerm"],
    ["stability", "cardMarket.stability"],
    ["confidence","cardMarket.confidence"],
  ]

  for (const [key, path] of fields) {
    const raw = legacyCardMarket[key]
    const n = parseFloat01(raw)
    if (n !== undefined) {
      market[key] = clamp01(n, path, warnings)
    }
  }

  // psa10Premium: discard — no contract slot (MIGRATION_RULES.md §3)

  if (Object.keys(market).length === 0) return undefined
  return market
}

/* =========================
   MINIMAL INLINE MIGRATION
========================= */

/**
 * Shared core extractor — works for both legacy_scouting and minimal_inline
 * formats. Pulls standard identity fields with safe type coercion.
 */
function extractCoreFields(p: Record<string, unknown>) {
  // batThrow split (2026 extended format only — minimal/2018 have direct bats/throws)
  const batThrow = parseBatThrow(p["batThrow"])
  const bats = (typeof p["bats"] === "string" && p["bats"]) ? p["bats"] as string : batThrow.bats
  const throws_ = (typeof p["throws"] === "string" && p["throws"]) ? p["throws"] as string : batThrow.throws

  return {
    id:         typeof p["id"]       === "string" ? p["id"]       : "",
    name:       typeof p["name"]     === "string" ? p["name"]     : "",
    team:       typeof p["team"]     === "string" ? p["team"]     : undefined as unknown as string,
    position:   typeof p["position"] === "string" ? p["position"] : "",
    tier:       normalizeTier(p["tier"]),
    level:      normalizeTier(p["level"]),
    age:        typeof p["age"]      === "number" ? p["age"]      : undefined,
    bats,
    throws:     throws_,
    card:       typeof p["card"]     === "string" ? p["card"]     : undefined,
    draftYear:  typeof p["draftYear"]  === "number" ? p["draftYear"]  : undefined,
    draftPick:  typeof p["draftPick"]  === "number" ? p["draftPick"]  : undefined,
    draftRound: typeof p["draftRound"] === "number" ? p["draftRound"] : undefined,
    hitting:    p["hitting"]  as Parameters<typeof createPlayer>[0]["core"]["hitting"]  ?? null,
    pitching:   p["pitching"] as Parameters<typeof createPlayer>[0]["core"]["pitching"] ?? null,
  }
}

/**
 * Extracts the signals block with safe type coercion.
 */
function extractSignals(p: Record<string, unknown>) {
  type SignalObj = { tracked?: unknown; heat?: unknown; price?: unknown }
  const raw = p["signals"] as SignalObj | null | undefined
  if (!raw) return undefined
  return {
    tracked: typeof raw.tracked === "boolean" ? raw.tracked : false,
    heat:    typeof raw.heat    === "string"  ? raw.heat as "hot" | "neutral" | "cold" | "rising" | null : null,
    price:   typeof raw.price   === "string"  ? raw.price as "rising" | "flat" | "falling" | null : null,
  }
}

/**
 * Migrates a minimal inline player (2018 format) to the canonical player contract.
 *
 * Minimal inline players have only core identity + signals. They carry no
 * scouting grades, no performance stats, no media data, no cardMarket.
 *
 * This path assembles a structurally valid Tier C baseline player via
 * createPlayer(). Domain layers are intentionally left undefined — the
 * enrichment pipeline scaffolds media and knowledge neutrals later.
 *
 * DO NOT: add scouting grades, performance stats, or cardMarket here.
 */
function migrateMinimalInlinePlayer(p: Record<string, unknown>): CreatePlayerResult {
  const warnings: ValidationIssue[] = []

  const core = extractCoreFields(p)
  const signals = extractSignals(p)

  // Warn on empty tier normalization
  if (core.tier === undefined && typeof p["tier"] === "string" && p["tier"] !== undefined) {
    warnings.push({
      severity: "warning",
      path: "tier",
      message: `'tier' was "${p["tier"]}" — normalized to undefined.`
    })
  }

  const result = createPlayer({
    core:        core as Parameters<typeof createPlayer>[0]["core"],
    signals:     signals as Parameters<typeof createPlayer>[0]["signals"],
    knowledge:   undefined,
    performance: undefined,
    media:       undefined,
    market:      undefined,
    tracker:     undefined,
  })

  if (warnings.length > 0) {
    result.validation.issues.unshift(...warnings)
    result.validation.isValid = !result.validation.issues.some(i => i.severity === "error")
  }

  return result
}

/* =========================
   MIGRATION ENTRY POINT
========================= */

/**
 * Migrates a single non-domain cohort player to the canonical Diamond Ledger
 * player contract.
 *
 * Handles three formats:
 *   - "legacy_scouting" (2025/2026): scouting+dlr flat object
 *   - "minimal_inline"  (2018):      core identity + signals only
 *   - "domain":                       should not arrive here — returns error
 *   - "unknown":                      unrecognized — returns error
 *
 * Callers should check `validation.isValid` before including the player
 * in a cohort array. Players with errors should be corrected manually
 * per PLAYER_CONTRACT.md.
 *
 * Returns a standard CreatePlayerResult — identical output type to createPlayer().
 */
export function migrateLegacyPlayer(player: unknown): CreatePlayerResult {
  const format = detectPlayerFormat(player)

  // Domain players should not come through migration — they go directly to enrichPlayer()
  if (format === "domain") {
    return {
      player: {} as ReturnType<typeof createPlayer>["player"],
      validation: {
        isValid: false,
        issues: [{
          severity: "error",
          path: "root",
          message: "Input is a domain-file player (has knowledge/performance/media). " +
                   "Domain players do not need migration — call enrichPlayer() directly."
        }]
      }
    }
  }

  // Minimal inline format — 2018 cohort pattern
  if (format === "minimal_inline") {
    return migrateMinimalInlinePlayer(player as Record<string, unknown>)
  }

  // Unknown shape — cannot migrate
  if (format === "unknown") {
    return {
      player: {} as ReturnType<typeof createPlayer>["player"],
      validation: {
        isValid: false,
        issues: [{
          severity: "error",
          path: "root",
          message: "Input format is unrecognized. Expected 'legacy_scouting', 'minimal_inline', or 'domain'. " +
                   "Check that the player has at least an 'id' and 'position' field."
        }]
      }
    }
  }

  // Legacy scouting+dlr format (2025/2026) — original migration path
  const p = player as Record<string, unknown>
  const migrationWarnings: ValidationIssue[] = []

  /* ---- ROLE DETECTION ---- */
  const position = typeof p["position"] === "string" ? p["position"] : undefined
  const isPitcher = isPitcherPosition(position)

  /* ---- CORE IDENTITY (shared extractor) ---- */
  const core = extractCoreFields(p)

  // Warn on empty tier/level after normalization (original had "")
  if (core.tier === undefined && typeof p["tier"] === "string" && p["tier"] !== undefined) {
    migrationWarnings.push({
      severity: "warning",
      path: "tier",
      message: `Legacy 'tier' was "${p["tier"]}" — normalized to undefined.`
    })
  }

  /* ---- SIGNALS (shared extractor) ---- */
  const signals = extractSignals(p)

  /* ---- KNOWLEDGE (hitters only, from scouting) ---- */
  const scouting = (typeof p["scouting"] === "object" && p["scouting"] !== null)
    ? p["scouting"] as LegacyScouting
    : null

  const knowledge = (!isPitcher && scouting)
    ? buildHitterKnowledge(scouting, migrationWarnings)
    : undefined

  if (isPitcher && scouting) {
    migrationWarnings.push({
      severity: "warning",
      path: "scouting",
      message: "Player is a pitcher — legacy scouting block contains hitter tool placeholders. knowledge not migrated."
    })
  }

  /* ---- CARDMARKET (from dlr.cardMarket) ---- */
  const legacyDLR = (typeof p["dlr"] === "object" && p["dlr"] !== null)
    ? p["dlr"] as LegacyDLR
    : null

  const cardMarket = (legacyDLR?.cardMarket && typeof legacyDLR.cardMarket === "object")
    ? buildCardMarket(legacyDLR.cardMarket as LegacyDLRCardMarket, migrationWarnings)
    : undefined

  /* ---- PERFORMANCE / MEDIA — intentionally undefined ----
     Legacy dlr.performance signals (trend, ageFactor, etc.) cannot be mapped
     to the PerformanceData domain layer (MIGRATION_RULES.md §5, §Forbidden).
     Legacy dlr.media signals have ambiguous field names (MIGRATION_RULES.md §4, §Forbidden).
     Leave both undefined. The DLR engine applies defaults.
  */

  /* ---- ASSEMBLE VIA createPlayer() ---- */
  const result = createPlayer({
    core:     core as Parameters<typeof createPlayer>[0]["core"],
    knowledge: knowledge as Parameters<typeof createPlayer>[0]["knowledge"],
    performance: undefined,
    media:    undefined,
    market:   cardMarket as Parameters<typeof createPlayer>[0]["market"],
    tracker:  undefined,
    signals:  signals as Parameters<typeof createPlayer>[0]["signals"],
  })

  // Merge migration warnings into the validation result
  if (migrationWarnings.length > 0) {
    result.validation.issues.unshift(...migrationWarnings)
    // Re-evaluate isValid: if we added only warnings (not errors), isValid stays true
    result.validation.isValid = !result.validation.issues.some(i => i.severity === "error")
  }

  return result
}
