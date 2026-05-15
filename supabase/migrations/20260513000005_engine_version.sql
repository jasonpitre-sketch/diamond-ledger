-- =============================================================
-- MIGRATION 005 — ENGINE VERSION COLUMN
-- Diamond Ledger / DLR Engine Versioning (2026-05-13)
-- -------------------------------------------------------------
-- Adds engine_version to player_dlr_weekly and player_dlr_monthly.
--
-- GOVERNANCE:
-- See data/dlr/DLR_ENGINE_VERSIONING_RULES.md
--
-- DESIGN:
-- engine_version is added to the UNIQUE constraint on both tables.
-- This allows multiple engine versions to coexist for the same
-- player/week — old rows become historical record, not overwritten.
--
-- BACKFILL:
-- Existing rows (P57-3) receive engine_version = 'P57-3' via the
-- column DEFAULT. PostgreSQL applies DEFAULT to all existing rows
-- when NOT NULL + DEFAULT is specified in ADD COLUMN.
--
-- CONSTRAINT CHANGES:
--   player_dlr_weekly:
--     OLD: player_dlr_weekly_unique_week (player_id, snapshot_week)
--     NEW: player_dlr_weekly_unique_week_version
--          (player_id, snapshot_week, engine_version)
--
--   player_dlr_monthly:
--     OLD: player_dlr_monthly_unique_month (player_id, settlement_month)
--     NEW: player_dlr_monthly_unique_month_version
--          (player_id, settlement_month, engine_version)
--
-- HOW TO APPLY:
-- Paste this entire script into Supabase SQL Editor → Run
-- =============================================================


-- ─────────────────────────────────────────────────────────────
-- PLAYER_DLR_WEEKLY — add engine_version
-- ─────────────────────────────────────────────────────────────

alter table public.player_dlr_weekly
  add column if not exists engine_version varchar(20) not null default 'P57-3';

comment on column public.player_dlr_weekly.engine_version is
  'DLR scoring engine version that produced this row. Never reused. '
  'Old rows preserved as historical record. Current version defined in '
  'data/dlr/engineVersion.ts CURRENT_ENGINE_VERSION. Governance: DLR_ENGINE_VERSIONING_RULES.md.';

-- Drop old unique constraint (player_id, snapshot_week only)
alter table public.player_dlr_weekly
  drop constraint if exists player_dlr_weekly_unique_week;

-- Recreate with engine_version — allows multi-version coexistence
alter table public.player_dlr_weekly
  add constraint player_dlr_weekly_unique_week_version
    unique (player_id, snapshot_week, engine_version);

-- Version-aware index for fast current-version reads
-- (supplements existing idx_player_dlr_weekly_player_week)
create index if not exists idx_player_dlr_weekly_version_week
  on public.player_dlr_weekly (player_id, engine_version, snapshot_week desc);


-- ─────────────────────────────────────────────────────────────
-- PLAYER_DLR_MONTHLY — add engine_version
-- ─────────────────────────────────────────────────────────────

alter table public.player_dlr_monthly
  add column if not exists engine_version varchar(20) not null default 'P57-3';

comment on column public.player_dlr_monthly.engine_version is
  'DLR scoring engine version that produced this row. Never reused. '
  'Old rows preserved as historical record. Current version defined in '
  'data/dlr/engineVersion.ts CURRENT_ENGINE_VERSION. Governance: DLR_ENGINE_VERSIONING_RULES.md.';

-- Drop old unique constraint (player_id, settlement_month only)
alter table public.player_dlr_monthly
  drop constraint if exists player_dlr_monthly_unique_month;

-- Recreate with engine_version — allows multi-version coexistence
alter table public.player_dlr_monthly
  add constraint player_dlr_monthly_unique_month_version
    unique (player_id, settlement_month, engine_version);

-- Version-aware index for fast current-version reads
create index if not exists idx_player_dlr_monthly_version_month
  on public.player_dlr_monthly (player_id, engine_version, settlement_month desc);


-- ─────────────────────────────────────────────────────────────
-- VERIFY BACKFILL
-- After running, all existing rows should show engine_version = 'P57-3'
-- Run this SELECT to confirm:
--
--   SELECT engine_version, count(*) FROM player_dlr_weekly GROUP BY engine_version;
--   SELECT engine_version, count(*) FROM player_dlr_monthly GROUP BY engine_version;
--
-- Expected:
--   player_dlr_weekly:  engine_version = 'P57-3', count = 7
--   player_dlr_monthly: engine_version = 'P57-3', count = 1
-- ─────────────────────────────────────────────────────────────
