-- =============================================================
-- Diamond Ledger — Weekly DLR Weekly Memory Pass 48 Columns
-- Migration: 20260511000003_player_dlr_weekly_pass48
-- Pass 48 — DLR Memory Implementation Foundation (2026-05-11)
--
-- Additive only. DO NOT modify migrations 000001 or 000002.
--
-- Adds two columns to player_dlr_weekly required by Pass 48:
--
--   fallback_used     boolean — true when any performance sub-layer
--                     metric fell back to static file values (i.e.,
--                     not all metrics were sourced from rolling blend).
--                     Derived from DLROutput.observability.performanceFallback.anyFallback.
--                     Defaults to false (assume rolling when unknown).
--                     Allows filtering/querying memory rows by data quality.
--
--   confidence_level  numeric(4,3) — the organism's overall confidence
--                     at settlement time. Maps to DLROutput.confidence.overall.
--                     Single consolidated read: range 0.000–1.000.
--                     Lightweight alternative to the per-layer confidence
--                     columns already in the table.
--
-- The full per-layer confidence breakdown (confidence_knowledge,
-- confidence_performance, etc.) from migration 000002 remains intact.
-- confidence_level is a convenience field for queries that only need
-- the aggregate trust level.
--
-- These columns complete the lightweight Pass 48 field contract:
--   id, player_id, snapshot_week, dlr_score, weekly_delta,
--   monthly_contribution, health_class, fallback_used,
--   confidence_level, created_at
-- =============================================================

alter table public.player_dlr_weekly
  add column if not exists fallback_used     boolean      not null default false,
  add column if not exists confidence_level  numeric(4,3);

-- Backfill fallback_used for any rows written before this migration.
-- Default false is correct: existing rows used full static pipeline,
-- which is not a fallback in the error sense — it's the normal static mode.
-- No action needed; the DEFAULT handles it.

comment on column public.player_dlr_weekly.fallback_used is
  'true when any performance sub-layer metric used static file fallback instead of rolling blend. Derived from DLROutput.observability.performanceFallback.anyFallback. Pass 48.';

comment on column public.player_dlr_weekly.confidence_level is
  'Overall DLR confidence at settlement (0.000–1.000). Maps to DLROutput.confidence.overall. Pass 48.';
