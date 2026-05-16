/* =============================================================
   PLAYER VALIDATOR — PIPELINE AUTHORITY (2026-05-08)
   -------------------------------------------------------------
   Single source of truth for player structure validation.

   validatePlayer(player)         — full validation pipeline
   validatePlayerStructure(p)     — required root fields
   validateRole(p)                — tool set / role consistency
   validatePerformance(p)         — snapshot naming, 0-1 ranges, stat sanity
   validateTracker(p)             — AB/IP consistency, numeric types

   Returns ValidationResult: { isValid: boolean, issues: ValidationIssue[] }

   DO NOT AUTO-MUTATE PLAYERS. This is a read-only diagnostic tool.
   Fix issues manually using PLAYER_CONTRACT.md as the authority.

   See ENGINE_FREEZE.md for system boundaries.
   ============================================================= */

import type { Player } from "@/data/types/player"

/* =========================
   TYPES
========================= */

export type ValidationSeverity = "error" | "warning"

export type ValidationIssue = {
  severity: ValidationSeverity
  path: string
  message: string
}

export type ValidationResult = {
  /** true when zero errors are present (warnings are non-blocking) */
  isValid: boolean
  issues: ValidationIssue[]
}

/* =========================
   INTERNAL HELPERS
========================= */

function err(path: string, message: string): ValidationIssue {
  return { severity: "error", path, message }
}

function warn(path: string, message: string): ValidationIssue {
  return { severity: "warning", path, message }
}

function isNormalized(v: unknown): boolean {
  return typeof v === "number" && isFinite(v) && v >= 0 && v <= 1
}

function hasKey(obj: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * Detects player role from position / performance.kind.
 * Mirrors detectPlayerRole() in signalEngine.ts — do NOT call
 * the live engine function from here to avoid a dependency on
 * the scoring path in a validation utility.
 */
function detectRole(player: Player): "hitter" | "pitcher" {
  const pos = (player.position ?? player.pos ?? "").toUpperCase()
  if (
    player.performance?.kind === "pitcher" ||
    ["P", "SP", "RP", "RHP", "LHP"].includes(pos)
  ) {
    return "pitcher"
  }
  return "hitter"
}

/* =========================
   validatePlayerStructure
========================= */

/**
 * Validates required root fields and sub-layer presence.
 * Does not inspect sub-layer contents.
 */
export function validatePlayerStructure(player: unknown): ValidationResult {
  const issues: ValidationIssue[] = []

  if (!player || typeof player !== "object") {
    return {
      isValid: false,
      issues: [err("root", "Player must be a non-null object")]
    }
  }

  const p = player as Record<string, unknown>

  // ---- Required root fields (error) ----
  if (!p.id || typeof p.id !== "string" || p.id.trim() === "") {
    issues.push(err("id", "id is required and must be a non-empty string"))
  }

  if (!p.name || typeof p.name !== "string" || (p.name as string).trim() === "") {
    issues.push(err("name", "name is required and must be a non-empty string"))
  }

  if (!p.position && !p.pos) {
    issues.push(err("position", "position is required — it determines the scoring role (hitter vs pitcher)"))
  }

  // ---- Recommended root fields (warning) ----
  if (!p.team) {
    issues.push(warn("team", "team is missing"))
  }

  if (p.tier === undefined && p.level === undefined) {
    issues.push(warn("tier", "tier and level are both missing"))
  }

  if (p.age === undefined || p.age === null) {
    issues.push(warn("age", "age is missing"))
  }

  if (!p.bats) {
    issues.push(warn("bats", "bats is missing"))
  }

  if (!p.throws) {
    issues.push(warn("throws", "throws is missing"))
  }

  // ---- Domain layers (warning if absent) ----
  if (!p.performance) {
    issues.push(warn(
      "performance",
      "performance layer is missing — DLR performance score (max 40 pts) will be 0"
    ))
  }

  if (!p.media) {
    issues.push(warn(
      "media",
      "media layer is missing — DLR media score (max 18 pts) will use defaults"
    ))
  }

  if (!p.knowledge) {
    issues.push(warn(
      "knowledge",
      "knowledge layer is missing — DLR knowledge score (max 18 pts) will be 0"
    ))
  }

  if (!p.cardMarket && !p.marketSnapshot) {
    issues.push(warn(
      "cardMarket",
      "cardMarket (and marketSnapshot) are missing — DLR market score (max 24 pts) will use defaults"
    ))
  }

  return {
    isValid: issues.filter(i => i.severity === "error").length === 0,
    issues
  }
}

/* =========================
   validateRole
========================= */

/**
 * Checks that knowledge.scout.scout contains tools appropriate
 * for the player's detected role. Mixing hitter and pitcher
 * tool keys will cause signalEngine.readRoleToolGrades() to
 * skip fields or return null grades.
 */
export function validateRole(player: Player): ValidationResult {
  const issues: ValidationIssue[] = []
  const role = detectRole(player)
  const tools = (player.knowledge?.scout?.scout ?? {}) as Record<string, unknown>

  const HITTER_TOOLS = ["hit", "power", "run", "arm", "field"] as const
  const PITCHER_TOOLS = [
    "fastball", "breaking", "offspeed", "command", "control",
    "fb", "slider", "curveball", "changeup", "splitter"
  ] as const

  if (role === "pitcher") {
    for (const key of HITTER_TOOLS) {
      if (hasKey(tools, key)) {
        issues.push(warn(
          `knowledge.scout.scout.${key}`,
          `Pitcher has hitter tool '${key}'. ` +
          `Pitcher tools: fastball, breaking, offspeed, command, control. ` +
          `Remove '${key}' or it will be ignored by the scoring engine.`
        ))
      }
    }

    // Check kind consistency with position
    if (
      player.performance?.kind !== undefined &&
      player.performance.kind !== "pitcher"
    ) {
      const pos = (player.position ?? player.pos ?? "").toUpperCase()
      issues.push(warn(
        "performance.kind",
        `performance.kind is '${player.performance.kind}' but position '${pos}' resolves to pitcher role. ` +
        `Set performance.kind to "pitcher" for consistency.`
      ))
    }
  }

  if (role === "hitter") {
    for (const key of PITCHER_TOOLS) {
      if (hasKey(tools, key)) {
        issues.push(warn(
          `knowledge.scout.scout.${key}`,
          `Hitter has pitcher tool '${key}'. ` +
          `Hitter tools: hit, power, run, arm, field. ` +
          `Remove '${key}' or it will be ignored by the scoring engine.`
        ))
      }
    }

    if (
      player.performance?.kind !== undefined &&
      player.performance.kind !== "hitter"
    ) {
      const pos = (player.position ?? player.pos ?? "").toUpperCase()
      issues.push(warn(
        "performance.kind",
        `performance.kind is '${player.performance.kind}' but position '${pos}' resolves to hitter role. ` +
        `Set performance.kind to "hitter" for consistency.`
      ))
    }
  }

  return {
    isValid: issues.filter(i => i.severity === "error").length === 0,
    issues
  }
}

/* =========================
   validatePerformance
========================= */

/**
 * Checks snapshot field capitalization (critical — wrong case = score 0),
 * validates normalized trend fields are 0–1, and checks stat plausibility.
 */
export function validatePerformance(player: Player): ValidationResult {
  const issues: ValidationIssue[] = []
  const role = detectRole(player)
  const perf = player.performance

  if (!perf) {
    // Already warned in validatePlayerStructure — skip here
    return { isValid: true, issues: [] }
  }

  // ---- kind field ----
  if (!perf.kind) {
    issues.push(warn(
      "performance.kind",
      `performance.kind is missing. Set to "hitter" or "pitcher". ` +
      `Scoring role is inferred from position, but kind should be explicit.`
    ))
  }

  // ---- sub-layer presence ----
  if (!perf.snapshot) {
    issues.push(warn("performance.snapshot", "performance.snapshot is missing"))
  }

  if (!perf.scout) {
    issues.push(warn("performance.scout", "performance.scout is missing — scout sub-score (12 pts) will be 0"))
  }

  if (!perf.analyst) {
    issues.push(warn("performance.analyst", "performance.analyst is missing — analyst sub-score (20 pts) will be 0"))
  }

  // ---- Snapshot field naming (CRITICAL) ----
  if (perf.snapshot) {
    const snap = perf.snapshot as Record<string, unknown>

    if (role === "pitcher") {
      // Engine reads: readNumber(p?.snapshot, "ERA")
      if (hasKey(snap, "era") && !hasKey(snap, "ERA")) {
        issues.push(err(
          "performance.snapshot.era",
          "Field 'era' found but the scoring engine reads 'ERA' (uppercase). " +
          "Rename 'era' to 'ERA' — otherwise pitcher snapshot scores 0."
        ))
      }
      if (!hasKey(snap, "ERA") && !hasKey(snap, "era")) {
        issues.push(warn(
          "performance.snapshot.ERA",
          "ERA is missing from pitcher snapshot — snapshot sub-score (8 pts) will be 0"
        ))
      }
      // Plausibility check
      const era = (snap.ERA ?? snap.era) as number | undefined
      if (typeof era === "number" && (era < 0 || era > 15)) {
        issues.push(warn("performance.snapshot.ERA", `ERA value ${era} is outside plausible range (0–15)`))
      }

    } else {
      // Engine reads: readNumber(p?.snapshot, "AVG")
      if (hasKey(snap, "avg") && !hasKey(snap, "AVG")) {
        issues.push(err(
          "performance.snapshot.avg",
          "Field 'avg' found but the scoring engine reads 'AVG' (uppercase). " +
          "Rename 'avg' to 'AVG' — otherwise hitter snapshot scores 0."
        ))
      }
      if (!hasKey(snap, "AVG") && !hasKey(snap, "avg")) {
        issues.push(warn(
          "performance.snapshot.AVG",
          "AVG is missing from hitter snapshot — snapshot sub-score (8 pts) will be 0"
        ))
      }
      // Plausibility check
      const avg = (snap.AVG ?? snap.avg) as number | undefined
      if (typeof avg === "number" && (avg < 0 || avg > 0.5)) {
        issues.push(warn("performance.snapshot.AVG", `AVG value ${avg} is outside plausible range (0–0.500)`))
      }
    }
  }

  // ---- Scout field naming ----
  if (perf.scout) {
    const scout = perf.scout as Record<string, unknown>

    if (role === "pitcher") {
      // Engine reads: readNumber(p?.scout, "kPercent")
      if (!hasKey(scout, "kPercent")) {
        issues.push(warn(
          "performance.scout.kPercent",
          "kPercent is missing from pitcher scout — scout sub-score (12 pts) will be 0. " +
          "Note: 'kPercentage', 'kpct', etc. are not recognized by the engine."
        ))
      }
    } else {
      // Engine reads: readNumber(p?.scout, "kRate")
      if (!hasKey(scout, "kRate")) {
        issues.push(warn(
          "performance.scout.kRate",
          "kRate is missing from hitter scout — scout sub-score (12 pts) will be 0. " +
          "Note: 'strikeoutRate', 'k_rate', etc. are not recognized by the engine."
        ))
      }
    }
  }

  // ---- Analyst: xStat naming and normalized trend fields ----
  if (perf.analyst) {
    const analyst = perf.analyst as Record<string, unknown>

    if (role === "pitcher") {
      // Engine reads: readNumber(p?.analyst, "xERA")
      if (!hasKey(analyst, "xERA")) {
        issues.push(warn(
          "performance.analyst.xERA",
          "xERA is missing from pitcher analyst — analyst sub-score (20 pts) will be 0"
        ))
      }
      if (typeof analyst.xERA === "number" && ((analyst.xERA as number) < 0 || (analyst.xERA as number) > 10)) {
        issues.push(warn("performance.analyst.xERA", `xERA value ${analyst.xERA} is outside plausible range (0–10)`))
      }

      // 0–1 trend fields
      const pitcherTrendFields = ["pitchMixGrade", "veloTrend", "commandTrend", "injuryTrend", "roleStability"]
      for (const field of pitcherTrendFields) {
        const v = analyst[field]
        if (v !== undefined && v !== null && !isNormalized(v)) {
          issues.push(warn(
            `performance.analyst.${field}`,
            `${field} should be 0–1 normalized, got ${v}. ` +
            `Do not confuse trend fields (0–1) with physical stats (xERA, stuffPlus).`
          ))
        }
      }

    } else {
      // Engine reads: readNumber(p?.analyst, "xAVG")
      if (!hasKey(analyst, "xAVG")) {
        issues.push(warn(
          "performance.analyst.xAVG",
          "xAVG is missing from hitter analyst — analyst sub-score (20 pts) will be 0"
        ))
      }
      if (typeof analyst.xAVG === "number" && ((analyst.xAVG as number) < 0 || (analyst.xAVG as number) > 0.5)) {
        issues.push(warn("performance.analyst.xAVG", `xAVG value ${analyst.xAVG} is outside plausible range (0–0.500)`))
      }

      // 0–1 trend fields
      const hitterTrendFields = ["plateDiscTrend", "contactTrend", "injuryTrend", "sprintTrend", "posValue", "consistency"]
      for (const field of hitterTrendFields) {
        const v = analyst[field]
        if (v !== undefined && v !== null && !isNormalized(v)) {
          issues.push(warn(
            `performance.analyst.${field}`,
            `${field} should be 0–1 normalized, got ${v}. ` +
            `Do not confuse trend fields (0–1) with physical stats (xAVG, xSLG).`
          ))
        }
      }
    }
  }

  return {
    isValid: issues.filter(i => i.severity === "error").length === 0,
    issues
  }
}

/* =========================
   validateTracker
========================= */

/**
 * Checks AB/IP mode consistency, numeric field types,
 * and confirms rolling windows exist for display.
 */
export function validateTracker(player: Player): ValidationResult {
  const issues: ValidationIssue[] = []
  const tracker = player.tracker

  if (!tracker) {
    issues.push(warn(
      "tracker",
      "tracker is missing — sampleConfidence() will use 0.6 baseline (no sample-size weighting). " +
      "Add tracker.AB (hitter) or tracker.IP (pitcher) to enable full confidence scoring."
    ))
    return { isValid: true, issues }
  }

  const hasAB = typeof tracker.AB === "number" && tracker.AB >= 0
  const hasIP = typeof tracker.IP === "number" && tracker.IP >= 0

  if (!hasAB && !hasIP) {
    issues.push(warn(
      "tracker",
      "tracker has neither AB nor IP. sampleConfidence() will return 0.6 baseline. " +
      "Add tracker.AB for hitters or tracker.IP for pitchers."
    ))
  }

  if (hasAB && hasIP) {
    issues.push(warn(
      "tracker",
      "tracker has both AB and IP. sampleConfidence() precedence: AB wins (hitter mode). " +
      "Remove the unused counter unless this is intentionally a two-way player."
    ))
  }

  // Role consistency check
  const role = detectRole(player)
  if (role === "pitcher" && hasAB && !hasIP) {
    issues.push(warn(
      "tracker.AB",
      "Player appears to be a pitcher (by position) but tracker has AB and not IP. " +
      "sampleConfidence() will use abConfidence() — intended?"
    ))
  }
  if (role === "hitter" && hasIP && !hasAB) {
    issues.push(warn(
      "tracker.IP",
      "Player appears to be a hitter (by position) but tracker has IP and not AB. " +
      "sampleConfidence() will use ipConfidence() — intended?"
    ))
  }

  // Numeric field type check
  const numericTrackerFields = [
    "AB", "IP", "PA", "G", "R", "H", "HR", "RBI", "BB", "K", "SB",
    "W", "L", "ERA", "WHIP", "SO", "AVG", "OBP", "OPS",
    "mlbAB", "minorAB"
  ] as const

  for (const field of numericTrackerFields) {
    const v = tracker[field]
    if (v !== undefined && v !== null && typeof v !== "number") {
      issues.push(err(
        `tracker.${field}`,
        `tracker.${field} must be a number, got ${typeof v} (${JSON.stringify(v)})`
      ))
    }
  }

  // Negative value checks
  if (typeof tracker.AB === "number" && tracker.AB < 0) {
    issues.push(err("tracker.AB", `tracker.AB must be ≥ 0, got ${tracker.AB}`))
  }
  if (typeof tracker.IP === "number" && tracker.IP < 0) {
    issues.push(err("tracker.IP", `tracker.IP must be ≥ 0, got ${tracker.IP}`))
  }

  // Rolling windows — display only, but expected for UI
  if (tracker.rolling === undefined) {
    issues.push(warn(
      "tracker.rolling",
      "tracker.rolling windows are missing. Display-only — engine ignores them, but UI expects them."
    ))
  }

  return {
    isValid: issues.filter(i => i.severity === "error").length === 0,
    issues
  }
}

/* =========================
   validateMedia
========================= */

/**
 * Checks that all media fields are 0–1 normalized.
 */
export function validateMedia(player: Player): ValidationResult {
  const issues: ValidationIssue[] = []
  const media = player.media

  if (!media) return { isValid: true, issues: [] }

  const allMediaFields: { section: string; keys: string[] }[] = [
    {
      section: "snapshot",
      keys: ["mentions", "headlineImpact", "highlightFactor", "socialBuzz"]
    },
    {
      section: "scout",
      keys: ["fanRecognition", "teamVisibility", "interviewPresence", "narrativeStrength", "milestoneAttention"]
    },
    {
      section: "analyst",
      keys: [
        "prospectPedigree", "hypeTrend", "mediaStability", "storyDurability",
        "breakoutProbability", "publicMomentum", "attentionDecay", "confidence"
      ]
    }
  ]

  for (const { section, keys } of allMediaFields) {
    const layer = (media as Record<string, unknown>)[section] as Record<string, unknown> | undefined
    if (!layer) continue

    for (const key of keys) {
      const v = layer[key]
      if (v !== undefined && v !== null && !isNormalized(v)) {
        issues.push(warn(
          `media.${section}.${key}`,
          `media.${section}.${key} should be 0–1 normalized, got ${v}`
        ))
      }
    }
  }

  return {
    isValid: issues.filter(i => i.severity === "error").length === 0,
    issues
  }
}

/* =========================
   validatePlayer (full pipeline)
========================= */

/**
 * Full validation pipeline. Runs all sub-validators in order.
 * Stops deep validation if root structure is invalid.
 *
 * Returns ValidationResult:
 *   .isValid  — true if zero errors (warnings are non-blocking)
 *   .issues   — array of { severity, path, message }
 *
 * DO NOT auto-mutate players based on this output.
 * Use PLAYER_CONTRACT.md to fix issues manually.
 */
export function validatePlayer(player: unknown): ValidationResult {
  const allIssues: ValidationIssue[] = []

  const structureResult = validatePlayerStructure(player)
  allIssues.push(...structureResult.issues)

  // Only continue deeper validation if root structure passes
  if (!structureResult.isValid) {
    return { isValid: false, issues: allIssues }
  }

  const p = player as Player

  const roleResult = validateRole(p)
  allIssues.push(...roleResult.issues)

  const performanceResult = validatePerformance(p)
  allIssues.push(...performanceResult.issues)

  const trackerResult = validateTracker(p)
  allIssues.push(...trackerResult.issues)

  const mediaResult = validateMedia(p)
  allIssues.push(...mediaResult.issues)

  const hasErrors = allIssues.some(i => i.severity === "error")

  return {
    isValid: !hasErrors,
    issues: allIssues
  }
}
