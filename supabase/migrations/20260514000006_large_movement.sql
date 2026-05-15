-- ============================================================
-- Migration 006 — Large Movement Observability Flag (P59)
-- ============================================================
-- Adds large_movement BOOLEAN to player_dlr_weekly.
-- Purpose: flag weekly snapshots where |deltaShort| > 2.0 for
-- cross-player observability queries without clipping the value.
-- Matches the discipline of fallback_used (Pass 48) — observability
-- fields belong in the data, not only in markdown journals.
--
-- Backfill: P57-3 and P58 rows were all within ±0.80 (hard cap was
-- in place). DEFAULT FALSE is correct for all historical rows.
-- ============================================================

ALTER TABLE public.player_dlr_weekly
  ADD COLUMN IF NOT EXISTS large_movement BOOLEAN NOT NULL DEFAULT FALSE;

-- Partial index: cheap cross-player query "show me all large movements"
-- without scanning rows where large_movement = FALSE (the vast majority).
CREATE INDEX IF NOT EXISTS idx_player_dlr_weekly_large_movement
  ON public.player_dlr_weekly (large_movement)
  WHERE large_movement = TRUE;

COMMENT ON COLUMN public.player_dlr_weekly.large_movement IS
  'P59 — true when |deltaShort| > 2.0 at snapshot time. Value is NOT clipped. Observability flag only.';
