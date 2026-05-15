-- =============================================================
-- PENDING MIGRATIONS — Diamond Ledger
-- Apply in the Supabase SQL Editor (Project → SQL Editor → New query)
-- Run this entire script as a single block.
--
-- Context: Migrations 002–004 were written but not applied to the
-- Supabase project. The initial schema (001) is already applied.
-- These migrations add the DLR memory layer tables required by
-- scripts/write-willits-2026-replay.mjs (Pass 57, P57-2).
--
-- What this creates:
--   · player_dlr_weekly   — weekly organism memory (one row per player per ISO week)
--   · player_dlr_monthly  — monthly settlement memory (one row per player per month)
--   · Grants UPDATE on players to service role (required for hot-read cache)
--
-- After applying: run the write script to persist the 7 weekly rows + 1 monthly:
--   node scripts/write-willits-2026-replay.mjs
--
-- Source files:
--   supabase/migrations/20260511000002_player_dlr_weekly.sql
--   supabase/migrations/20260511000003_player_dlr_weekly_pass48.sql
--   supabase/migrations/20260511000004_player_dlr_monthly.sql
-- =============================================================


-- ─────────────────────────────────────────────────────────────
-- 002: PLAYER_DLR_WEEKLY
-- ─────────────────────────────────────────────────────────────

create table if not exists public.player_dlr_weekly (
  id                    uuid primary key default gen_random_uuid(),
  player_id             text not null references public.players(id) on delete cascade,
  snapshot_week         text not null,
  dlr_score             numeric(5,2) not null,
  dlr_tier              text,
  confidence_overall    numeric(4,3),
  confidence_knowledge  numeric(4,3),
  confidence_performance numeric(4,3),
  confidence_media      numeric(4,3),
  confidence_market     numeric(4,3),
  health_class          text,
  base_dlr              numeric(5,2),
  weekly_delta          numeric(5,2),
  monthly_contribution  numeric(5,2),
  weekly_history        jsonb,
  competition_level     text,
  source                text default 'manual',
  season                integer,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  constraint player_dlr_weekly_unique_week
    unique (player_id, snapshot_week),

  constraint player_dlr_weekly_tier_check
    check (dlr_tier is null or dlr_tier in ('ELITE', 'PREMIUM', 'SOLID', 'WATCHLIST', 'HOLD')),

  constraint player_dlr_weekly_health_check
    check (health_class is null or health_class in ('FULLY_REACTIVE', 'PARTIALLY_REACTIVE', 'STATIC_SUPPORTED')),

  constraint player_dlr_weekly_source_check
    check (source in ('manual', 'cron', 'server_action'))
);

alter table public.player_dlr_weekly enable row level security;

create policy "Weekly DLR snapshots are publicly readable"
  on public.player_dlr_weekly for select
  to anon, authenticated
  using (true);

create index if not exists idx_player_dlr_weekly_player_week
  on public.player_dlr_weekly (player_id, snapshot_week desc);

create index if not exists idx_player_dlr_weekly_season
  on public.player_dlr_weekly (player_id, season);

create trigger set_player_dlr_weekly_updated_at
  before update on public.player_dlr_weekly
  for each row execute procedure public.set_updated_at();


-- ─────────────────────────────────────────────────────────────
-- 003: PLAYER_DLR_WEEKLY PASS 48 COLUMNS
-- ─────────────────────────────────────────────────────────────

alter table public.player_dlr_weekly
  add column if not exists fallback_used     boolean      not null default false,
  add column if not exists confidence_level  numeric(4,3);

comment on column public.player_dlr_weekly.fallback_used is
  'true when any performance sub-layer metric used static file fallback instead of rolling blend. Derived from DLROutput.observability.performanceFallback.anyFallback. Pass 48.';

comment on column public.player_dlr_weekly.confidence_level is
  'Overall DLR confidence at settlement (0.000–1.000). Maps to DLROutput.confidence.overall. Pass 48.';


-- ─────────────────────────────────────────────────────────────
-- 004: PLAYER_DLR_MONTHLY
-- ─────────────────────────────────────────────────────────────

create table if not exists public.player_dlr_monthly (
  id                    uuid primary key default gen_random_uuid(),
  player_id             text not null references public.players(id) on delete cascade,
  settlement_month      text not null,
  dlr_score             numeric(5,2) not null,
  dlr_tier              text,
  week_count            integer not null default 0,
  is_partial            boolean not null generated always as (week_count < 4) stored,
  confidence_level      numeric(4,3),
  health_class          text,
  weekly_avg_delta      numeric(5,2),
  monthly_contribution  numeric(5,2),
  weekly_history        jsonb,
  source                text not null default 'manual',
  season                integer,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  constraint player_dlr_monthly_unique_month
    unique (player_id, settlement_month),

  constraint player_dlr_monthly_tier_check
    check (dlr_tier is null or dlr_tier in ('ELITE', 'PREMIUM', 'SOLID', 'WATCHLIST', 'HOLD')),

  constraint player_dlr_monthly_health_check
    check (health_class is null or health_class in ('FULLY_REACTIVE', 'PARTIALLY_REACTIVE', 'STATIC_SUPPORTED')),

  constraint player_dlr_monthly_source_check
    check (source in ('manual', 'cron')),

  constraint player_dlr_monthly_week_count_check
    check (week_count >= 0 and week_count <= 5)
);

comment on column public.player_dlr_monthly.week_count is
  'Number of weekly snapshot rows contributing to this settlement. 4 = full. <4 = partial (is_partial=true). Section 1B.';

comment on column public.player_dlr_monthly.is_partial is
  'Generated: true when week_count < 4. Narrative gate requires is_partial=false.';

alter table public.player_dlr_monthly enable row level security;

create policy "Monthly DLR settlements are publicly readable"
  on public.player_dlr_monthly for select
  to anon, authenticated
  using (true);

create index if not exists idx_player_dlr_monthly_player_month
  on public.player_dlr_monthly (player_id, settlement_month desc);

create index if not exists idx_player_dlr_monthly_season
  on public.player_dlr_monthly (player_id, season);

create trigger set_player_dlr_monthly_updated_at
  before update on public.player_dlr_monthly
  for each row execute procedure public.set_updated_at();


-- ─────────────────────────────────────────────────────────────
-- SERVICE ROLE GRANTS
-- Required for writeWeeklySnapshot.ts to update players.dlr_score.
-- The initial migration only granted SELECT to anon/authenticated.
-- The service role needs explicit UPDATE permission to write the hot cache.
-- ─────────────────────────────────────────────────────────────

grant update (dlr_score, dlr_updated_at, updated_at) on public.players to service_role;
grant all on public.player_dlr_weekly to service_role;
grant all on public.player_dlr_monthly to service_role;
