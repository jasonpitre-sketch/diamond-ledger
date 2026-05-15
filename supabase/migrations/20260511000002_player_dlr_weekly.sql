-- =============================================================
-- Diamond Ledger — Weekly DLR Snapshot Table
-- Migration: 20260511000002_player_dlr_weekly
-- Section 1A — Persisted DLR Memory Architecture
--
-- Purpose:
--   Store one settled DLR identity row per player per ISO week.
--   This is the organism's durable weekly memory unit.
--   It enables baseDLR hydration without live recalculation.
--
-- Design principles:
--   - UNIQUE(player_id, snapshot_week) — no duplicate weeks allowed.
--     Writes use ON CONFLICT DO UPDATE (upsert). The constraint is the
--     safety mechanism, not application logic.
--
--   - snapshot_week format: YYYY-Www (e.g. '2026-W19')
--     Human-readable, sortable as a string, stable weekly grouping.
--     Read queries: ORDER BY snapshot_week DESC LIMIT 1
--
--   - dlr_score is the settled rating at week close. It populates
--     players.dlr_score and feeds player.dlr.persistedScore on hydration.
--     See: data/dlr/PERSISTED_READ_PATH_RULES.md
--
--   - weekly_history stores the trailing 4-week deltaShort array as JSONB.
--     This is the organism's rolling momentum memory.
--     See: data/dlr/DLR_MEMORY_RULES.md §3
--
--   - Additive migration — DO NOT modify 20260511000001_initial_schema.sql.
--     This table extends the schema forward safely.
--
-- Write path:
--   data/dlr/writeWeeklySnapshot.ts → upsert via Supabase server client
--   Called manually during settlement; cron remains deferred.
--
-- Read path:
--   lib/dlr/hydrateDLR.ts → reads players.dlr_score (not this table directly)
--   This table is the audit trail and history source.
-- =============================================================

-- =============================================================
-- PLAYER_DLR_WEEKLY
-- One row per player per ISO week. Upserted on settlement.
-- =============================================================

create table if not exists public.player_dlr_weekly (
  id                    uuid primary key default gen_random_uuid(),

  -- Identity
  player_id             text not null references public.players(id) on delete cascade,

  -- ISO week key — format: YYYY-Www (e.g. '2026-W19')
  -- Sortable as a string. ORDER BY snapshot_week DESC LIMIT 1 retrieves latest.
  snapshot_week         text not null,

  -- Settled DLR rating at week close (0.0–100.0, one decimal)
  dlr_score             numeric(5,2) not null,

  -- Tier at settlement — ELITE | PREMIUM | SOLID | WATCHLIST | HOLD
  dlr_tier              text,

  -- Confidence breakdown at settlement
  confidence_overall    numeric(4,3),   -- 0.000–1.000
  confidence_knowledge  numeric(4,3),
  confidence_performance numeric(4,3),
  confidence_media      numeric(4,3),
  confidence_market     numeric(4,3),

  -- Organism health class at settlement
  -- FULLY_REACTIVE | PARTIALLY_REACTIVE | STATIC_SUPPORTED
  health_class          text,

  -- Movement data at settlement
  base_dlr              numeric(5,2),   -- persistedScore or score used as anchor
  weekly_delta          numeric(5,2),   -- deltaShort for this week
  monthly_contribution  numeric(5,2),   -- deltaMonthly (average of 4-week window)

  -- Trailing 4-week weekly delta history (JSONB array of numbers)
  -- Example: [-0.4, 0.8, 1.2, 0.6]
  weekly_history        jsonb,

  -- Competition level at settlement (from performance.competitionLevel)
  competition_level     text,

  -- Source metadata
  source                text default 'manual',   -- 'manual' | 'cron' | 'server_action'
  season                integer,

  -- Audit
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  -- THE SAFETY CONSTRAINT: one row per player per week.
  -- Writes use ON CONFLICT (player_id, snapshot_week) DO UPDATE.
  -- Application logic MUST use upsert — never raw INSERT.
  constraint player_dlr_weekly_unique_week
    unique (player_id, snapshot_week),

  -- Tier value guard
  constraint player_dlr_weekly_tier_check
    check (dlr_tier is null or dlr_tier in ('ELITE', 'PREMIUM', 'SOLID', 'WATCHLIST', 'HOLD')),

  -- Health class value guard
  constraint player_dlr_weekly_health_check
    check (health_class is null or health_class in ('FULLY_REACTIVE', 'PARTIALLY_REACTIVE', 'STATIC_SUPPORTED')),

  -- Source value guard
  constraint player_dlr_weekly_source_check
    check (source in ('manual', 'cron', 'server_action'))
);

-- =============================================================
-- RLS — weekly rows are publicly readable; writes are server-only
-- =============================================================

alter table public.player_dlr_weekly enable row level security;

create policy "Weekly DLR snapshots are publicly readable"
  on public.player_dlr_weekly for select
  to anon, authenticated
  using (true);

-- No client-side insert/update policies.
-- All writes go through service role (server actions, sync workers).

-- =============================================================
-- INDEXES
-- =============================================================

-- Primary lookup: latest week for a player
create index if not exists idx_player_dlr_weekly_player_week
  on public.player_dlr_weekly (player_id, snapshot_week desc);

-- Season-scoped history queries
create index if not exists idx_player_dlr_weekly_season
  on public.player_dlr_weekly (player_id, season);

-- =============================================================
-- updated_at trigger (reuses shared utility from migration 1)
-- =============================================================

create trigger set_player_dlr_weekly_updated_at
  before update on public.player_dlr_weekly
  for each row execute procedure public.set_updated_at();

-- =============================================================
-- USAGE NOTES
--
-- Write (upsert):
--   INSERT INTO public.player_dlr_weekly (player_id, snapshot_week, dlr_score, ...)
--   VALUES ($1, $2, $3, ...)
--   ON CONFLICT (player_id, snapshot_week) DO UPDATE SET
--     dlr_score = EXCLUDED.dlr_score,
--     updated_at = now();
--
-- Read (latest):
--   SELECT * FROM public.player_dlr_weekly
--   WHERE player_id = $1
--   ORDER BY snapshot_week DESC
--   LIMIT 1;
--
-- Read (season history):
--   SELECT snapshot_week, dlr_score, weekly_delta
--   FROM public.player_dlr_weekly
--   WHERE player_id = $1 AND season = $2
--   ORDER BY snapshot_week ASC;
-- =============================================================
