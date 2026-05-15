/**
 * lib/supabase/playerBridge.ts
 * Pass 40 — Supabase Foundation Architecture
 *
 * COEXISTENCE STRATEGY
 * ====================
 * Diamond Ledger currently holds all player intelligence in local TypeScript
 * data files (data/players/, playersDraft2026.ts, etc.). These are the source
 * of truth TODAY.
 *
 * As the Supabase backend matures, live data (snapshots, lineage, DLR scores)
 * will flow from the database. This bridge provides a unified interface so
 * that the application can consume either source without the calling code
 * needing to know which layer responded.
 *
 * RESOLUTION PRIORITY
 * ====================
 * 1. Supabase — if a live snapshot exists for the player + season, use it.
 * 2. Static local — if no live record, fall back to the local data file.
 *
 * This means:
 *   - Static players continue rendering perfectly today
 *   - As players are migrated / live data flows, the DB record wins
 *   - No "big bang" migration required
 *   - Static files can be deprecated gradually, one player at a time
 *
 * USAGE
 * ====================
 * Server-side (Route Handler, Server Component):
 *   import { getPlayerSnapshot } from "@/lib/supabase/playerBridge"
 *   const snapshot = await getPlayerSnapshot("casey_mize", 2026)
 *
 * The vault currently reads directly from static arrays (app/vault/page.tsx).
 * That path is untouched — this bridge is additive infrastructure only.
 * Wire it in when live snapshot ingestion begins (future pass).
 *
 * CURRENT STATE
 * ====================
 * All functions below are present but the Supabase path is gated by
 * NEXT_PUBLIC_SUPABASE_URL being set. If the env var is absent (local dev
 * without backend wired), ALL functions fall through to the static path.
 * No runtime errors will occur.
 */

import type { Player } from "@/data/types/player"

// =============================================================
// ENVIRONMENT GUARD
// True when the Supabase URL is configured in the environment.
// =============================================================

const SUPABASE_CONFIGURED =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("https://")

// =============================================================
// PLAYER SNAPSHOT BRIDGE
// Resolves the live tracker/snapshot for a player in a given season.
// Returns null if no record exists in either source.
// =============================================================

export type LiveSnapshot = {
  player_id:   string
  season:      number
  is_pitcher:  boolean
  // hitter fields
  ab?:    number | null
  h?:     number | null
  hr?:    number | null
  rbi?:   number | null
  bb?:    number | null
  k?:     number | null
  sb?:    number | null
  avg?:   number | null
  obp?:   number | null
  ops?:   number | null
  // pitcher fields
  ip?:    number | null
  g?:     number | null
  w?:     number | null
  l?:     number | null
  era?:   number | null
  whip?:  number | null
  so?:    number | null
  // rolling windows
  rolling?: {
    days7?:  Record<string, number | null> | null
    days15?: Record<string, number | null> | null
    days30?: Record<string, number | null> | null
  } | null
  // meta
  dlr_score?:  number | null
  source?:     string | null
  captured_at: string
}

/**
 * Fetch a player's live snapshot from Supabase.
 * Returns null if Supabase is not configured or no record exists.
 * Server-side only — imports createServerClient dynamically to avoid
 * bundling server code on the client.
 */
async function fetchSnapshotFromDB(
  playerId: string,
  season: number
): Promise<LiveSnapshot | null> {
  if (!SUPABASE_CONFIGURED) return null

  try {
    // Dynamic import keeps server-only cookies() out of client bundles
    const { createServerClient } = await import("@/lib/supabase/server")
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("player_snapshots")
      .select("*")
      .eq("player_id", playerId)
      .eq("season", season)
      .single()

    if (error || !data) return null
    return data as LiveSnapshot
  } catch {
    // Supabase unavailable — fall through to static
    return null
  }
}

/**
 * Resolve a player's current-season snapshot.
 * DB record wins over static tracker if present.
 *
 * @param player  - Full local Player object (from static data arrays)
 * @param season  - Season year (e.g. 2026)
 * @returns       - LiveSnapshot from DB, or a synthetic snapshot built
 *                  from the player's static tracker fields, or null.
 */
export async function getPlayerSnapshot(
  player: Player,
  season: number
): Promise<LiveSnapshot | null> {
  const playerId = player.id

  // 1. Try live DB snapshot
  const dbSnapshot = await fetchSnapshotFromDB(playerId, season)
  if (dbSnapshot) return dbSnapshot

  // 2. Build synthetic snapshot from static tracker (coexistence fallback)
  const t = player.tracker
  if (!t) return null

  const isPitcher = (t.IP != null && (t.AB == null || t.AB === 0))

  return {
    player_id:  playerId,
    season,
    is_pitcher: isPitcher,
    // hitter
    ab:   t.AB   ?? null,
    h:    t.H    ?? null,
    hr:   t.HR   ?? null,
    rbi:  t.RBI  ?? null,
    bb:   t.BB   ?? null,
    k:    t.K    ?? null,
    sb:   t.SB   ?? null,
    avg:  t.AVG  ?? null,
    obp:  t.OBP  ?? null,
    ops:  t.OPS  ?? null,
    // pitcher
    ip:   t.IP   ?? null,
    g:    t.G    ?? null,
    w:    t.W    ?? null,
    l:    t.L    ?? null,
    era:  t.ERA  ?? null,
    whip: t.WHIP ?? null,
    so:   t.SO   ?? null,
    // rolling
    rolling: t.rolling
      ? {
          days7:  t.rolling.days7  ?? null,
          days15: t.rolling.days15 ?? null,
          days30: t.rolling.days30 ?? null
        }
      : null,
    dlr_score:   null,   // not cached in static data
    source:      "static",
    captured_at: new Date().toISOString()
  }
}

// =============================================================
// PLAYER LINEAGE BRIDGE
// Resolves career stage history from DB or local careerLineage.
// =============================================================

export type LiveLineageStage = {
  stage_label:  string
  stage_order:  number
  hitting?:     Record<string, number | null> | null
  pitching?:    Record<string, number | null> | null
}

/**
 * Fetch a player's career lineage from Supabase.
 * Returns null if Supabase is not configured or no records exist.
 */
async function fetchLineageFromDB(
  playerId: string
): Promise<LiveLineageStage[] | null> {
  if (!SUPABASE_CONFIGURED) return null

  try {
    const { createServerClient } = await import("@/lib/supabase/server")
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("player_lineage")
      .select("stage_label, stage_order, hitting, pitching")
      .eq("player_id", playerId)
      .order("stage_order", { ascending: true })

    if (error || !data || data.length === 0) return null
    return data as LiveLineageStage[]
  } catch {
    return null
  }
}

/**
 * Resolve a player's career lineage.
 * DB record wins over static careerLineage if present.
 *
 * @param player - Full local Player object
 * @returns      - Ordered stage array from DB or static careerLineage, or null
 */
export async function getPlayerLineage(
  player: Player
): Promise<LiveLineageStage[] | null> {
  // 1. Try live DB lineage
  const dbLineage = await fetchLineageFromDB(player.id)
  if (dbLineage) return dbLineage

  // 2. Coexistence fallback — convert static careerLineage to bridge shape
  const staticLineage = player.careerLineage
  if (!staticLineage?.stages?.length) return null

  return staticLineage.stages.map((stage, idx) => ({
    stage_label: stage.label,
    stage_order: idx,
    hitting:     stage.hitting   as Record<string, number | null> ?? null,
    pitching:    stage.pitching  as Record<string, number | null> ?? null
  }))
}

// =============================================================
// WATCHLIST BRIDGE
// User-specific player tracking — requires authenticated user.
// Returns empty array when Supabase is not configured.
// =============================================================

/**
 * Fetch the authenticated user's watchlist player IDs.
 * Returns [] when Supabase is not configured or user is not authenticated.
 */
export async function getUserWatchlist(): Promise<string[]> {
  if (!SUPABASE_CONFIGURED) return []

  try {
    const { createServerClient } = await import("@/lib/supabase/server")
    const supabase = await createServerClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from("watchlists")
      .select("player_id")
      .eq("user_id", user.id)

    if (error || !data) return []
    return data.map((row: { player_id: string }) => row.player_id)
  } catch {
    return []
  }
}
