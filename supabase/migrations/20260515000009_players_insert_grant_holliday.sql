-- Migration: 20260515000009_players_insert_grant_holliday
-- Pass 75 — Holliday 2026 Replay Setup (2026-05-15)
--
-- Purpose:
--   1. Grant INSERT on public.players to service_role so the write
--      scripts can bootstrap new player rows without requiring manual
--      dashboard intervention each time a new player is added.
--
--   2. Insert ethan_holliday into public.players so the FK constraint
--      on player_dlr_weekly and player_dlr_monthly is satisfied.
--
-- Background:
--   The initial schema (migration 001) only granted UPDATE(dlr_score,
--   dlr_updated_at, updated_at) on players to service_role. INSERT was
--   not included. eli_willits was inserted manually; ethan_holliday
--   triggers the same FK issue until this migration is applied.
--
-- Apply: Supabase SQL Editor → Paste → Run
-- ============================================================

-- 1. Grant INSERT on players to service_role
grant insert on public.players to service_role;

-- 2. Insert ethan_holliday (idempotent)
insert into public.players (
  id, name, team, position, level, tier, age, bats, throws,
  draft_year, draft_pick, requires_dual_domain, market_archetype, dlr_score
)
values (
  'ethan_holliday', 'Ethan Holliday', 'FRE', 'SS', 'A', 'A', 19, 'L', 'R',
  2025, 4, false, 'PRE_BOWMAN', 49.8
)
on conflict (id) do update set
  dlr_score  = excluded.dlr_score,
  updated_at = now();

-- 3. Verify
select id, name, dlr_score from public.players where id = 'ethan_holliday';
