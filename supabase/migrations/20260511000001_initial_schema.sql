-- =============================================================
-- Diamond Ledger — Initial Schema
-- Migration: 20260511000001_initial_schema
-- Pass 40 — Supabase Foundation Architecture
--
-- Tables created:
--   users             → user identity + tier readiness
--   players           → master player entities (mirrors local IDs)
--   player_snapshots  → rolling/current performance states
--   player_lineage    → career-stage history (stage-based)
--   watchlists        → future user tracking system
--
-- Philosophy:
--   - Readable and extensible over clever and normalized
--   - Player IDs mirror local static data (e.g. 'casey_mize')
--   - JSONB for flexible sub-structures (rolling windows, stats)
--   - All tables use Row Level Security (RLS)
--   - Static local data coexists until migration is complete
-- =============================================================

-- =============================================================
-- USERS
-- Mirrors auth.users — extended with app-level tier metadata.
-- Created via trigger on auth.users insert.
-- =============================================================

create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique,
  tier        text not null default 'free',   -- 'free' | 'paid' | 'premium'
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint users_tier_check check (tier in ('free', 'paid', 'premium'))
);

-- Auto-create a public.users row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.users enable row level security;

create policy "Users can view their own record"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own record"
  on public.users for update
  using (auth.uid() = id);

-- =============================================================
-- PLAYERS
-- Master player entity table.
-- id mirrors local static player id (e.g. 'casey_mize', 'gio_rojas').
-- This allows coexistence: local files and DB can be matched by id.
-- =============================================================

create table if not exists public.players (
  id                    text primary key,         -- mirrors local player id
  name                  text not null,
  team                  text,
  position              text,
  level                 text,                      -- 'MLB' | 'MiLB' | 'NCAA' | 'Draft' | 'HS'
  tier                  text,                      -- lifecycle tier
  age                   integer,
  bats                  text,
  throws                text,
  school                text,
  draft_year            integer,
  draft_pick            integer,
  requires_dual_domain  boolean not null default false,
  market_archetype      text,
  dlr_score             numeric(5,2),              -- cached DLR (recalculated on snapshot update)
  dlr_updated_at        timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- RLS — players are public-readable, only service role writes
alter table public.players enable row level security;

create policy "Players are publicly readable"
  on public.players for select
  to anon, authenticated
  using (true);

-- =============================================================
-- PLAYER_SNAPSHOTS
-- Rolling and current-season performance state.
-- One row per player per season (upsert on update).
-- Hitter fields + pitcher fields coexist; populated by domain.
-- JSONB used for rolling windows and last_game to mirror existing
-- PlayerTracker rolling structure from data/types/player.ts.
-- =============================================================

create table if not exists public.player_snapshots (
  id              uuid primary key default gen_random_uuid(),
  player_id       text not null references public.players(id) on delete cascade,
  season          integer not null,

  -- Mode flag — mirrors tracker AB/IP hitter/pitcher switch
  is_pitcher      boolean not null default false,

  -- Hitter accumulating totals
  ab              integer,
  h               integer,
  hr              integer,
  rbi             integer,
  bb              integer,
  k               integer,
  sb              integer,
  avg             numeric(5,3),
  obp             numeric(5,3),
  slg             numeric(5,3),
  ops             numeric(5,3),

  -- Pitcher accumulating totals
  ip              numeric(7,1),
  g               integer,
  gs              integer,
  w               integer,
  l               integer,
  era             numeric(5,2),
  whip            numeric(5,3),
  so              integer,
  era_plus        integer,

  -- Short-term display signals (JSONB mirrors PlayerTracker.rolling)
  -- Shape: { days7: {...}, days15: {...}, days30: {...} }
  rolling         jsonb,

  -- Last game played (JSONB mirrors LastGame type)
  last_game       jsonb,

  -- DLR snapshot at time of capture
  dlr_score       numeric(5,2),

  -- Source + audit
  source          text,           -- 'MLB' | 'MiLB' | 'MaxPreps' | 'manual'
  captured_at     timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  unique (player_id, season)
);

alter table public.player_snapshots enable row level security;

create policy "Snapshots are publicly readable"
  on public.player_snapshots for select
  to anon, authenticated
  using (true);

-- =============================================================
-- PLAYER_LINEAGE
-- Career stage history — mirrors CareerLineage / CareerLineageStage
-- from data/types/player.ts (Pass 37).
-- One row per player per stage (e.g. HS, NCAA, MiLB, MLB).
-- stage_order: chronological position (0 = earliest).
-- hitting / pitching stored as JSONB to mirror CareerStageHitting /
-- CareerStagePitching types without coupling DB to TypeScript changes.
-- =============================================================

create table if not exists public.player_lineage (
  id           uuid primary key default gen_random_uuid(),
  player_id    text not null references public.players(id) on delete cascade,
  stage_label  text not null,   -- 'HS' | 'NCAA' | 'A-BALL' | 'AA' | 'AAA' | 'MiLB' | 'MLB'
  stage_order  integer not null default 0,
  hitting      jsonb,           -- CareerStageHitting fields
  pitching     jsonb,           -- CareerStagePitching fields
  source       text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  unique (player_id, stage_label)
);

alter table public.player_lineage enable row level security;

create policy "Lineage is publicly readable"
  on public.player_lineage for select
  to anon, authenticated
  using (true);

-- =============================================================
-- WATCHLISTS
-- User-specific player tracking.
-- Requires authenticated user. RLS enforces user isolation.
-- =============================================================

create table if not exists public.watchlists (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  player_id   text not null references public.players(id) on delete cascade,
  added_at    timestamptz not null default now(),
  notes       text,

  unique (user_id, player_id)
);

alter table public.watchlists enable row level security;

create policy "Users can view their own watchlist"
  on public.watchlists for select
  using (auth.uid() = user_id);

create policy "Users can add to their own watchlist"
  on public.watchlists for insert
  with check (auth.uid() = user_id);

create policy "Users can remove from their own watchlist"
  on public.watchlists for delete
  using (auth.uid() = user_id);

create policy "Users can update their own watchlist entries"
  on public.watchlists for update
  using (auth.uid() = user_id);

-- =============================================================
-- INDEXES
-- Targeted only — do not pre-index everything.
-- =============================================================

create index if not exists idx_player_snapshots_player_season
  on public.player_snapshots (player_id, season);

create index if not exists idx_player_lineage_player
  on public.player_lineage (player_id, stage_order);

create index if not exists idx_watchlists_user
  on public.watchlists (user_id);

create index if not exists idx_players_level
  on public.players (level);

-- =============================================================
-- updated_at auto-update trigger (shared utility)
-- =============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_users_updated_at
  before update on public.users
  for each row execute procedure public.set_updated_at();

create trigger set_players_updated_at
  before update on public.players
  for each row execute procedure public.set_updated_at();

create trigger set_snapshots_updated_at
  before update on public.player_snapshots
  for each row execute procedure public.set_updated_at();

create trigger set_lineage_updated_at
  before update on public.player_lineage
  for each row execute procedure public.set_updated_at();
