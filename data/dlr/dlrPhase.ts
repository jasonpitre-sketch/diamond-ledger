/* =========================
   DLR PHASE ENGINE
   Maps player progression tier → visual phase color.

   Palette: aerospace / tactical / industrial

   ◈ amber  — Development (HS, College, Draft)
              Tactical amber / tungsten gold — dormant systems, blueprint energy
   ◈ copper — Minors proving ground (ROK, A, A+, AA, AAA)
              Oxidized copper / industrial bronze — machine under load
   ◈ teal   — MLB established (Rookie, Starter, All-Star, MVP)
              Deep cyan / aerospace teal — elite command, cold plasma
   ========================= */

export type DLRPhase = "yellow" | "orange" | "green"

/* Exact-match sets — checked against uppercased, trimmed tier/level string */
const GREEN_TIERS = new Set([
  "ROOKIE", "STARTER", "ALL-STAR", "ALL_STAR", "MVP", "MLB", "AS"
])

const ORANGE_TIERS = new Set([
  "ROK", "A", "A+", "AA", "AAA"
])

const YELLOW_TIERS = new Set([
  "HS", "HIGH SCHOOL", "COLLEGE", "NCAA", "DRAFT"
])

/**
 * Derive a player's DLR phase from their tier/level string.
 * Accepts the raw value from `player.tier` or `player.level`.
 *
 * MLB identity persists during temporary demotions — callers should
 * pass `player.tier` (which records earned MLB status) rather than
 * the transient `player.level` (current assignment).
 */
export function getDLRPhase(tier?: string | null, level?: string | null): DLRPhase {
  const raw = (tier ?? level ?? "").trim()
  const t = raw.toUpperCase()

  if (GREEN_TIERS.has(t))  return "green"
  if (ORANGE_TIERS.has(t)) return "orange"
  if (YELLOW_TIERS.has(t)) return "yellow"

  // Partial-match fallbacks for unusual values
  if (t.includes("DRAFT") || t.includes("HS") || t.includes("COLLEGE") || t.includes("NCAA")) return "yellow"
  if (t === "RY" || t === "ROK") return "orange"  // legacy "RY" → minors
  if (t === "" || t === "—") return "yellow"

  return "yellow" // unknown defaults to development/yellow
}

/* Phase colour tokens — single source of truth for hex + glow.
   Progressive blue spectrum: teal → ocean → deep royal.
   color      = vault DLR ring (large text, can be rich/dark)
   panelColor = Intel panel score readout (small text on dark bg — must stay readable) */
export const DLR_PHASE_STYLE: Record<DLRPhase, {
  color: string
  panelColor: string
  textShadow: string
}> = {
  // ◈ DEVELOPMENT — Aerospace Teal
  yellow: {
    color:      "#1ac8dc",
    panelColor: "#1ac8dc",   // already bright — same in both contexts
    textShadow: [
      "0 0 6px rgba(26,200,220,.88)",
      "0 0 18px rgba(26,200,220,.50)",
      "0 0 36px rgba(26,200,220,.18)"
    ].join(", ")
  },
  // ◈ MINORS — Steel Blue (vault: dark industrial / panel: readable steel)
  orange: {
    color:      "#28587a",
    panelColor: "#3d8cb8",   // lighter steel — same hue, legible on dark bg
    textShadow: [
      "0 0 5px rgba(40,88,122,.78)",
      "0 0 14px rgba(40,88,122,.38)",
      "0 0 28px rgba(40,88,122,.12)"
    ].join(", ")
  },
  // ◈ MLB — Royal Blue (vault: deep navy / panel: bright royal)
  green: {
    color:      "#1a3a9e",
    panelColor: "#4a72d4",   // lighter royal — same hue family, clearly visible
    textShadow: [
      "0 0 8px rgba(26,58,158,.94)",
      "0 0 22px rgba(26,58,158,.58)",
      "0 0 44px rgba(26,58,158,.22)"
    ].join(", ")
  }
}

/* Tier badge colour — list rows (no bloom, just the base tone) */
export const DLR_PHASE_BADGE: Record<DLRPhase, string> = {
  yellow: "#1ac8dc",  // aerospace teal
  orange: "#28587a",  // dark steel blue
  green:  "#1a3a9e"   // deep royal blue
}

/* =========================
   LIFECYCLE ACCENT SYSTEM
   Precision coloring by competitionLevel — more granular than DLRPhase.
   HS and NCAA are both "yellow" phase but carry distinct lifecycle identities.
   These styles drive: HeroVault DLR number, IntelStack --dlr-phase-color,
   PlayerList active row glow, stat table anchor/TOTAL row labels.
   ========================= */

export const LIFECYCLE_STYLE: Record<string, {
  color:       string   // vault DLR ring / large display
  panelColor:  string   // IntelStack panel readouts (small text on dark bg)
  textShadow:  string   // glow bloom for DLR number
}> = {
  // ◈ HS — Quartz: raw, uncut, high-upside volatility
  HS: {
    color:      "#c8a564",
    panelColor: "#c8a564",
    textShadow: [
      "0 0 6px rgba(200,165,100,.88)",
      "0 0 18px rgba(200,165,100,.50)",
      "0 0 36px rgba(200,165,100,.18)"
    ].join(", ")
  },
  // ◈ NCAA — Jade: structured development, proven production
  NCAA: {
    color:      "#3eb489",
    panelColor: "#3eb489",
    textShadow: [
      "0 0 6px rgba(62,180,137,.88)",
      "0 0 18px rgba(62,180,137,.50)",
      "0 0 36px rgba(62,180,137,.18)"
    ].join(", ")
  },
  // ◈ MiLB — Sapphire: professional proving ground, deep pressure
  MiLB: {
    color:      "#2d72d4",
    panelColor: "#2d72d4",
    textShadow: [
      "0 0 6px rgba(45,114,212,.88)",
      "0 0 18px rgba(45,114,212,.50)",
      "0 0 36px rgba(45,114,212,.18)"
    ].join(", ")
  },
  // ◈ MLB — Diamond: crystalline elite, verified arrival
  MLB: {
    color:      "#b8e8ff",
    panelColor: "#b8e8ff",
    textShadow: [
      "0 0 6px rgba(184,232,255,.88)",
      "0 0 18px rgba(184,232,255,.50)",
      "0 0 36px rgba(184,232,255,.18)"
    ].join(", ")
  }
}

/**
 * Normalise a raw competitionLevel string to a LIFECYCLE_STYLE key.
 * Returns null if the stage is unrecognised — callers should fall back
 * to the standard DLRPhase colours.
 */
export function getLifecycleStage(competitionLevel?: string | null): string | null {
  const raw = (competitionLevel ?? "").trim()
  const t   = raw.toUpperCase()
  if (t === "HS")                          return "HS"
  if (t === "NCAA")                        return "NCAA"
  if (t === "MILB" || raw === "MiLB")     return "MiLB"
  if (t === "MLB")                         return "MLB"
  return null   // unknown → caller falls back to DLR phase colour
}
