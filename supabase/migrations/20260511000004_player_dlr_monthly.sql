-- =============================================================
-- Diamond Ledger — Monthly DLR Settlement Table
-- Migration: 20260511000004_player_dlr_monthly
-- Monthly Memory Layer (2026-05-11)
--
-- Additive migration. DO NOT modify migrations 000001–000003.
--
-- Purpose:
--   Store one settled DLR identity row per player per calendar month.
--   This is the organism's durable monthly memory unit — the highest-
--   confidence anchor when fresh, derived entirely from weekly organism
--   memory, never from raw baseball ingestion.
--
-- Design principles:
--   - UNIQUE(player_id, settlement_month) — no duplicate months.
--     Writes use ON CONFLICT DO UPDATE (upsert).
--
--   - settlement_month format: YYYY-MM (e.g. '2026-05')
--     Sortable as a string. ORDER BY settlement_month DESC LIMIT 1
--     retrieves the latest settlement.
--
--   - week_count (Section 1B): records how many weekly snapshots
--     contributed to this settlement. Distinguishes a full 4-week
--     settlement from a partial 1-week bootstrap. Critical for
--     confidence weighting, narrative readiness, and historical integrity.
--
--   - is_partial: true when week_count < 4. Partial settlements are
--     valid anchors but carry lower confidence. Narrative generation
--     gates on week_count >= 4.
--
--   - STALENESS RULE (Section 3A): Monthly settlement is the highest-
--     confidence anchor ONLY when settlement_month is the current or
--     immediately prior calendar month. If stale (older than prior month),
--     the weekly layer regains anchor priority. Staleness is evaluated
--     at hydration time, not stored in the DB.
--
--   - AGGREGATION (Section 4A): dlr_score is a weighted consolidation
--     of the contributing weekly rows. Most recent week: 1.5× influence.
--     Prior weeks: 1.0× influence. Derived from organism memory only.
--
--   Anchor priority (when monthly is fresh):
--     monthlySettledScore → persistedScore (weekly) → score → 50
--
--   See: data/dlr/DLR_MONTHLY_SETTLEMENT_RULES.md
--        data/dlr/settleMonthlyDLR.ts (write path)
--        lib/dlr/hydrateDLR.ts (read/staleness path)
-- =============================================================

-- =============================================================
-- PLAYER_DLR_MONTHLY
-- One row per player per calendar month. Upserted on settlement.
-- =============================================================

create table if not exists public.player_dlr_monthly (
  id                    uuid primary key default gen_random_uuid(),

  -- Identity
  player_id             text not null references public.players(id) on delete cascade,

  -- Calendar month key — format: YYYY-MM (e.g. '2026-05')
  -- Sortable as a string. ORDER BY settlement_month DESC LIMIT 1 = latest.
  settlement_month      text not null,

  -- Settled DLR rating (weighted average of contributing weekly rows)
  -- Most recent week = 1.5× influence. Prior weeks = 1.0×.
  dlr_score             numeric(5,2) not null,

  -- Tier at settlement
  dlr_tier              text,

  -- Section 1B: number of weekly snapshot rows that contributed to this settlement.
  -- Full settlement = 4. Partial bootstrap = 1–3.
  -- Used for: settlement confidence, narrative gating (>= 4 required),
  --           future weighting, partial period detection.
  week_count            integer not null default 0,

  -- True when week_count < 4. Partial settlements are valid anchors
  -- but are flagged for downstream consumers (narrative gate, confidence).
  is_partial            boolean not null generated always as (week_count < 4) stored,

  -- Overall confidence at settlement (weighted average of weekly confidence_level)
  confidence_level      numeric(4,3),

  -- Most common or most recent health class across contributing weeks
  health_class          text,

  -- Average weekly delta across contributing weeks (directional trend)
  weekly_avg_delta      numeric(5,2),

  -- Monthly contribution value (as reported by calculateDLRMovement at settlement)
  monthly_contribution  numeric(5,2),

  -- Snapshot of the weekly_history array at settlement time
  weekly_history        jsonb,

  -- Source of settlement
  source                text not null default 'manual',   -- 'manual' | 'cron'

  season                integer,

  -- Audit
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  -- THE SAFETY CONSTRAINT: one row per player per calendar month.
  -- Application MUST use upsert — never raw INSERT.
  constraint player_dlr_monthly_unique_month
    unique (player_id, settlement_month),

  -- Tier value guard
  constraint player_dlr_monthly_tier_check
    check (dlr_tier is null or dlr_tier in ('ELITE', 'PREMIUM', 'SOLID', 'WATCHLIST', 'HOLD')),

  -- Health class guard
  constraint player_dlr_monthly_health_check
    check (health_class is null or health_class in ('FULLY_REACTIVE', 'PARTIALLY_REACTIVE', 'STATIC_SUPPORTED')),

  -- Source guard
  constraint player_dlr_monthly_source_check
    check (source in ('manual', 'cron')),

  -- week_count guard
  constraint player_dlr_monthly_week_count_check
    check (week_count >= 0 and week_count <= 5)
);

-- Column comments

comment on column public.player_dlr_monthly.settlement_month is
  'Calendar month key in YYYY-MM format (e.g. 2026-05). Sortable. Monthly settlement period.';

comment on column public.player_dlr_monthly.dlr_score is
  'Weighted settled DLR. Most recent week: 1.5×. Prior weeks: 1.0×. Section 4A.';

comment on column public.player_dlr_monthly.week_count is
  'Number of weekly snapshot rows contributing to this settlement. 4 = full. <4 = partial (is_partial=true). Section 1B.';

comment on column public.player_dlr_monthly.is_partial is
  'Generated: true when week_count < 4. Narrative gate requires is_partial=false.';

comment on column public.player_dlr_monthly.confidence_level is
  'Weighted average of contributing weekly confidence_level values.';

comment on column public.player_dlr_monthly.weekly_avg_delta is
  'Average of contributing weekly weekly_delta values. Directional trend indicator.';

-- =============================================================
-- RLS — monthly rows are publicly readable; writes are server-only
-- =============================================================

alter table public.player_dlr_monthly enable row level security;

create policy "Monthly DLR settlements are publicly readable"
  on public.player_dlr_monthly for select
  to anon, authenticated
  using (true);

-- No client-side insert/update policies.
-- All writes go through service role (server actions, manual settlement).

-- =============================================================
-- INDEXES
-- =============================================================

-- Primary lookup: latest settlement for a player
create index if not exists idx_player_dlr_monthly_player_month
  on public.player_dlr_monthly (player_id, settlement_month desc);

-- Season-scoped history
create index if not exists idx_player_dlr_monthly_season
  on public.player_dlr_monthly (player_id, season);

-- =============================================================
-- updated_at trigger
-- =============================================================

create trigger set_player_dlr_monthly_updated_at
  before update on public.player_dlr_monthly
  for each row execute procedure public.set_updated_at();

-- =============================================================
-- USAGE NOTES
--
-- Write (upsert):
--   INSERT INTO public.player_dlr_monthly
--     (player_id, settlement_month, dlr_score, week_count, ...)
--   VALUES ($1, $2, $3, $4, ...)
--   ON CONFLICT (player_id, settlement_month) DO UPDATE SET
--     dlr_score = EXCLUDED.dlr_score,
--     week_count = EXCLUDED.week_count,
--     updated_at = now();
--
-- Read (latest, freshness check in application):
--   SELECT settlement_month, dlr_score, week_count, is_partial, confidence_level
--   FROM public.player_dlr_monthly
--   WHERE player_id = $1
--   ORDER BY settlement_month DESC
--   LIMIT 1;
--
-- Read (season history):
--   SELECT settlement_month, dlr_score, week_count, weekly_avg_delta
--   FROM public.player_dlr_monthly
--   WHERE player_id = $1 AND season = $2
--   ORDER BY settlement_month ASC;
--
-- STALENESS: evaluated in lib/dlr/hydrateDLR.ts, not in SQL.
--   Current month OR immediately prior month → fresh → highest anchor.
--   Older → stale → weekly anchor takes priority.
-- =============================================================
