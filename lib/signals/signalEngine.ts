/* =============================================================================
   DIAMOND LEDGER — SIGNAL ENGINE  (Pass 33)
   -----------------------------------------------------------------------------
   Centralised resolution of BAT / PWR / CMD / RUN / VAL behavioral signals.

   Philosophy
   ──────────
   Signals represent rolling behavioral MOMENTUM — not static scouting grades.
   They react to recency: 7-day windows are the primary source when available,
   falling back through 15D → 30D → current season → "no data" in that order.

   During transitional tiers (DRAFT, ROOKIE) no stabilised baseline exists, so
   rolling windows naturally dominate and signals become more reactive.  That
   reactivity is not an artefact — it is correct behaviour.

   Pipeline (per signal)
   ─────────────────────
   tracker.rolling.days7  ← most reactive (primary)
       ↓ absent
   tracker.rolling.days15 ← moderate stability
       ↓ absent
   tracker.rolling.days30 ← longer-term context
       ↓ absent
   tracker season totals  ← current-season accumulator
       ↓ absent
   SignalState "dark"     ← no data — renders as "—"

   DO NOT
   ──────
   • Do not derive or approximate rolling values from season totals.
   • Do not fabricate signal states.
   • Do not change threshold constants without a governance pass.
   • Do not implement live-data ingestion here — this is resolution only.

   Governance: data/dlr/SIGNAL_ENGINE_RULES.md
   ============================================================================= */

import type { PlayerTracker } from "@/data/types/player"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

/** Behavioral intensity of a signal. */
export type SignalState = "hot" | "warm" | "neutral" | "cool" | "dark"

/** Directional trajectory (VAL only). */
export type SignalDirection = "up" | "flat" | "down"

/** Which data window drove this signal. */
export type SignalSource =
  | "rolling_7d"
  | "rolling_15d"
  | "rolling_30d"
  | "season"
  | "none"

/** A single resolved behavioral signal. */
export type Signal = {
  /** Intensity state for icon/color rendering. */
  state:     SignalState
  /** Directional trajectory (primarily for VAL). */
  direction: SignalDirection
  /** Which window the state was resolved from. */
  source:    SignalSource
  /** Human-readable reason string for debugging / future tooltips. */
  reason:    string
}

/**
 * The full signal bundle returned for one player row.
 *
 * Hitter layout:   BAT  PWR  VAL
 * Pitcher layout:  CMD  RUN  VAL
 *
 * All five fields are always present — callers choose which to display
 * based on viewMode.
 */
export type SignalBundle = {
  bat: Signal   // contact / approach / hitting consistency
  pwr: Signal   // power / slugging / extra-base momentum
  cmd: Signal   // command / control / strike efficiency  (pitcher)
  run: Signal   // run prevention / suppression           (pitcher)
  val: Signal   // overall directional trajectory          (universal)
}

/** Minimal player shape the engine needs — avoids importing the full Player type. */
export type SignalPlayerInput = {
  tracker?:     PlayerTracker | null
  performance?: { kind?: string; snapshot?: Record<string, number | string | null | undefined> } | null
  hitting?:     Record<string, number | string | null | undefined> | null
  pitching?:    Record<string, number | string | null | undefined> | null
  media?:       { snapshot?: Record<string, number | null | undefined>; analyst?: Record<string, number | null | undefined> } | null
}

/* ─────────────────────────────────────────────────────────────
   THRESHOLDS  — single source of truth
   Mirrors lib/scoring.ts and data/dlr/signals/playerSignals.ts.
   DO NOT change without a governance pass.
   ───────────────────────────────────────────────────────────── */

const T = {
  hitter: {
    bat: { hot: 0.270, cold: 0.230 },   // AVG
    pwr: { hot: 0.820, cold: 0.700 },   // OPS
  },
  pitcher: {
    cmd: { hot: 1.15,  cold: 1.40  },   // WHIP  — lower is better
    run: { hot: 3.50,  cold: 5.00  },   // ERA   — lower is better
  },
} as const

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

function num(
  obj: Record<string, number | string | null | undefined> | null | undefined,
  key: string
): number | null {
  const v = obj?.[key]
  return typeof v === "number" && Number.isFinite(v) ? v : null
}

/** Dark placeholder — no data available. */
function dark(label: string): Signal {
  return { state: "dark", direction: "flat", source: "none", reason: `No ${label} data` }
}

/** Neutral placeholder — data present but below significance threshold. */
function neutral(label: string, source: SignalSource, reason: string): Signal {
  return { state: "neutral", direction: "flat", source, reason: `${label}: ${reason}` }
}

/* ─────────────────────────────────────────────────────────────
   ROLLING WINDOW RESOLVER
   ───────────────────────────────────────────────────────────── */

type RollingWindow = NonNullable<NonNullable<PlayerTracker["rolling"]>["days7"]>

/**
 * Return the highest-priority non-null rolling window and its source label.
 * Priority: 7D > 15D > 30D > null.
 */
function primaryRolling(
  rolling: PlayerTracker["rolling"] | null | undefined
): { window: RollingWindow; source: "rolling_7d" | "rolling_15d" | "rolling_30d" } | null {
  if (rolling?.days7)  return { window: rolling.days7,  source: "rolling_7d"  }
  if (rolling?.days15) return { window: rolling.days15, source: "rolling_15d" }
  if (rolling?.days30) return { window: rolling.days30, source: "rolling_30d" }
  return null
}

/* ─────────────────────────────────────────────────────────────
   SIGNAL RESOLVERS — individual signals
   ───────────────────────────────────────────────────────────── */

function resolveBAT(
  rolling: PlayerTracker["rolling"] | null | undefined,
  tracker: PlayerTracker | null | undefined,
  snapshot: Record<string, number | string | null | undefined> | null | undefined
): Signal {
  // Primary: rolling window AVG
  const roll = primaryRolling(rolling)
  const avgRoll = roll ? (roll.window.AVG ?? null) : null

  if (avgRoll !== null) {
    const state: SignalState =
      avgRoll >= T.hitter.bat.hot  ? "hot"  :
      avgRoll < T.hitter.bat.cold  ? "cool" : "neutral"
    return {
      state,
      direction: state === "hot" ? "up" : state === "cool" ? "down" : "flat",
      source: roll!.source,
      reason: `AVG ${avgRoll.toFixed(3)} (${roll!.source})`
    }
  }

  // Fallback: season tracker
  const avgSeason = num(tracker as Record<string, number | string | null | undefined>, "AVG")
    ?? num(snapshot, "avg")
  if (avgSeason !== null) {
    const state: SignalState =
      avgSeason >= T.hitter.bat.hot  ? "warm"    :
      avgSeason < T.hitter.bat.cold  ? "cool"    : "neutral"
    return {
      state,
      direction: state === "warm" ? "up" : state === "cool" ? "down" : "flat",
      source: "season",
      reason: `AVG ${avgSeason.toFixed(3)} (season)`
    }
  }

  return dark("AVG")
}

function resolvePWR(
  rolling: PlayerTracker["rolling"] | null | undefined,
  tracker: PlayerTracker | null | undefined,
  snapshot: Record<string, number | string | null | undefined> | null | undefined
): Signal {
  const roll = primaryRolling(rolling)
  const opsRoll = roll ? (roll.window.OPS ?? null) : null

  if (opsRoll !== null) {
    const state: SignalState =
      opsRoll >= T.hitter.pwr.hot  ? "hot"  :
      opsRoll < T.hitter.pwr.cold  ? "cool" : "neutral"
    return {
      state,
      direction: state === "hot" ? "up" : state === "cool" ? "down" : "flat",
      source: roll!.source,
      reason: `OPS ${opsRoll.toFixed(3)} (${roll!.source})`
    }
  }

  const opsSeason = num(tracker as Record<string, number | string | null | undefined>, "OPS")
    ?? num(snapshot, "ops")
  if (opsSeason !== null) {
    const state: SignalState =
      opsSeason >= T.hitter.pwr.hot  ? "warm"    :
      opsSeason < T.hitter.pwr.cold  ? "cool"    : "neutral"
    return {
      state,
      direction: state === "warm" ? "up" : state === "cool" ? "down" : "flat",
      source: "season",
      reason: `OPS ${opsSeason.toFixed(3)} (season)`
    }
  }

  return dark("OPS")
}

function resolveCMD(
  rolling: PlayerTracker["rolling"] | null | undefined,
  tracker: PlayerTracker | null | undefined,
  snapshot: Record<string, number | string | null | undefined> | null | undefined,
  pitching: Record<string, number | string | null | undefined> | null | undefined
): Signal {
  const roll = primaryRolling(rolling)
  const whipRoll = roll ? (roll.window.WHIP ?? null) : null

  if (whipRoll !== null) {
    // WHIP: lower = better command
    const state: SignalState =
      whipRoll <= T.pitcher.cmd.hot  ? "hot"  :
      whipRoll >= T.pitcher.cmd.cold ? "cool" : "neutral"
    return {
      state,
      direction: state === "hot" ? "up" : state === "cool" ? "down" : "flat",
      source: roll!.source,
      reason: `WHIP ${whipRoll.toFixed(2)} (${roll!.source})`
    }
  }

  const whipSeason = num(tracker as Record<string, number | string | null | undefined>, "WHIP")
    ?? num(pitching, "WHIP")
    ?? num(snapshot, "whip")
  if (whipSeason !== null) {
    const state: SignalState =
      whipSeason <= T.pitcher.cmd.hot  ? "warm"    :
      whipSeason >= T.pitcher.cmd.cold ? "cool"    : "neutral"
    return {
      state,
      direction: state === "warm" ? "up" : state === "cool" ? "down" : "flat",
      source: "season",
      reason: `WHIP ${whipSeason.toFixed(2)} (season)`
    }
  }

  return dark("WHIP")
}

function resolveRUN(
  rolling: PlayerTracker["rolling"] | null | undefined,
  tracker: PlayerTracker | null | undefined,
  snapshot: Record<string, number | string | null | undefined> | null | undefined,
  pitching: Record<string, number | string | null | undefined> | null | undefined
): Signal {
  const roll = primaryRolling(rolling)
  const eraRoll = roll ? (roll.window.ERA ?? null) : null

  if (eraRoll !== null) {
    // ERA: lower = better run prevention
    const state: SignalState =
      eraRoll <= T.pitcher.run.hot  ? "hot"  :
      eraRoll >= T.pitcher.run.cold ? "cool" : "neutral"
    return {
      state,
      direction: state === "hot" ? "up" : state === "cool" ? "down" : "flat",
      source: roll!.source,
      reason: `ERA ${eraRoll.toFixed(2)} (${roll!.source})`
    }
  }

  const eraSeason = num(tracker as Record<string, number | string | null | undefined>, "ERA")
    ?? num(pitching, "ERA")
    ?? num(snapshot, "era")
  if (eraSeason !== null) {
    const state: SignalState =
      eraSeason <= T.pitcher.run.hot  ? "warm"    :
      eraSeason >= T.pitcher.run.cold ? "cool"    : "neutral"
    return {
      state,
      direction: state === "warm" ? "up" : state === "cool" ? "down" : "flat",
      source: "season",
      reason: `ERA ${eraSeason.toFixed(2)} (season)`
    }
  }

  return dark("ERA")
}

function resolveVAL(
  bat: Signal,
  pwr: Signal,
  cmd: Signal,
  run: Signal,
  isPitcher: boolean
): Signal {
  const primary = isPitcher ? cmd : bat
  const secondary = isPitcher ? run : pwr

  const hotCount  = [primary, secondary].filter(s => s.state === "hot"  || s.state === "warm").length
  const coolCount = [primary, secondary].filter(s => s.state === "cool").length

  const direction: SignalDirection =
    hotCount === 2  ? "up"   :
    coolCount >= 1  ? "down" : "flat"

  const state: SignalState =
    hotCount === 2  ? "hot"     :
    hotCount === 1  ? "neutral" :
    coolCount === 2 ? "cool"    : "neutral"

  // Best available source among the two component signals
  const sourceOrder: SignalSource[] = ["rolling_7d","rolling_15d","rolling_30d","season","none"]
  const bestSource = [primary.source, secondary.source].sort(
    (a, b) => sourceOrder.indexOf(a) - sourceOrder.indexOf(b)
  )[0]

  return {
    state,
    direction,
    source: bestSource,
    reason: `VAL composite from ${primary.reason} + ${secondary.reason}`
  }
}

/* ─────────────────────────────────────────────────────────────
   PUBLIC API
   ───────────────────────────────────────────────────────────── */

/**
 * Resolve the full BAT/PWR/CMD/RUN/VAL signal bundle for a player.
 *
 * Rolling window priority: 7D → 15D → 30D → season totals → dark.
 * No values are fabricated or derived from season averages.
 *
 * @param player  Minimal player shape (tracker, performance, hitting, pitching)
 * @param mode    "hit" for hitters, "pitch" for pitchers
 */
export function resolveSignals(
  player: SignalPlayerInput | null | undefined,
  mode: "hit" | "pitch"
): SignalBundle {
  if (!player) {
    const d = dark("player")
    return { bat: d, pwr: d, cmd: d, run: d, val: d }
  }

  const tracker  = player.tracker  ?? null
  const rolling  = tracker?.rolling ?? null
  const snapshot = player.performance?.snapshot as
    Record<string, number | string | null | undefined> | null | undefined
  const pitching = player.pitching as Record<string, number | string | null | undefined> | null | undefined

  const isPitcher =
    mode === "pitch" ||
    player.performance?.kind === "pitcher"

  const bat = isPitcher ? neutral("BAT", "none", "pitcher") : resolveBAT(rolling, tracker, snapshot)
  const pwr = isPitcher ? neutral("PWR", "none", "pitcher") : resolvePWR(rolling, tracker, snapshot)
  const cmd = isPitcher ? resolveCMD(rolling, tracker, snapshot, pitching) : neutral("CMD", "none", "hitter")
  const run = isPitcher ? resolveRUN(rolling, tracker, snapshot, pitching) : neutral("RUN", "none", "hitter")
  const val = resolveVAL(bat, pwr, cmd, run, isPitcher)

  return { bat, pwr, cmd, run, val }
}

/* ─────────────────────────────────────────────────────────────
   SORT HELPERS  — replaces toneScore / directionScore
   ───────────────────────────────────────────────────────────── */

const STATE_SCORE: Record<SignalState, number> = {
  hot: 4, warm: 3, neutral: 2, cool: 1, dark: 0
}

/** Map a SignalState to a numeric sort key (higher = better). */
export function signalStateScore(s: SignalState): number {
  return STATE_SCORE[s] ?? 2
}

/** Map a SignalDirection to a numeric sort key (higher = better). */
export function signalDirectionScore(d: SignalDirection): number {
  if (d === "up")   return 2
  if (d === "down") return 0
  return 1
}
