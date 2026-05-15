-- Pass 72 — Roster Registry + Daily Ingestion Log
-- Single source of truth for which players are tracked, how, and what happened each run.

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: roster
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS roster (
  player_id                TEXT PRIMARY KEY,            -- matches data/players/*.ts id (snake_case)
  name                     TEXT NOT NULL,
  kind                     TEXT NOT NULL,              -- "hitter" or "pitcher"
  level                    TEXT NOT NULL,              -- "HS", "NCAA", "A", "AA", "AAA", "MLB"
  active                   BOOLEAN DEFAULT true,
  data_source              TEXT NOT NULL,              -- "mlb_stats_api" | "milb_stats_api" | "ncaa_ucla_scrape" | "manual"
  external_player_id       TEXT,                       -- MLB/MiLB Stats API player ID
  external_team_id         TEXT,                       -- MLB Stats API team ID
  external_sport_id        TEXT,                       -- "1" = MLB, "11" = Triple-A, etc.
  last_ingested_date       DATE,                       -- date of most recent successful ingestion
  last_ingested_at         TIMESTAMP WITH TIME ZONE,
  last_ingestion_status    TEXT,                       -- "success" | "no_game" | "error" | "manual_pending"
  last_ingestion_message   TEXT,                       -- human-readable detail from last run
  created_at               TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at               TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_roster_active
  ON roster(active) WHERE active = true;

CREATE INDEX IF NOT EXISTS idx_roster_source
  ON roster(data_source) WHERE active = true;

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: daily_ingestion_log
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_ingestion_log (
  id                       SERIAL PRIMARY KEY,
  run_date                 DATE NOT NULL,
  run_started_at           TIMESTAMP WITH TIME ZONE NOT NULL,
  run_completed_at         TIMESTAMP WITH TIME ZONE,
  total_attempted          INT,
  successful_ingestions    INT,
  no_game_count            INT,
  error_count              INT,
  manual_pending_count     INT,
  run_summary              JSONB,                      -- per-player detail array
  email_sent               BOOLEAN DEFAULT false,
  email_recipient          TEXT,
  created_at               TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_log_run_date
  ON daily_ingestion_log(run_date DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED: 10 players
-- Verified MLB Stats API IDs as of 2026-05-14.
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO roster (
  player_id, name, kind, level, active,
  data_source, external_player_id, external_team_id, external_sport_id
) VALUES
  -- MLB (fully automated via mlb_stats_api)
  ('alec_bohm',    'Alec Bohm',    'hitter',  'MLB', true, 'mlb_stats_api', '664761', '143', '1'),
  ('brice_turang', 'Brice Turang', 'hitter',  'MLB', true, 'mlb_stats_api', '668930', '158', '1'),
  ('brady_singer', 'Brady Singer', 'pitcher', 'MLB', true, 'mlb_stats_api', '663903', '113', '1'),
  ('casey_mize',   'Casey Mize',   'pitcher', 'MLB', true, 'mlb_stats_api', '663554', '116', '1'),
  -- MiLB (adapter pending Pass 73)
  ('eli_willits',    'Eli Willits',    'hitter',  'AAA', true, 'milb_stats_api', NULL, NULL, NULL),
  ('ethan_holliday', 'Ethan Holliday', 'hitter',  'A',   true, 'milb_stats_api', NULL, NULL, NULL),
  ('kade_anderson',  'Kade Anderson',  'pitcher', 'A',   true, 'milb_stats_api', NULL, NULL, NULL),
  -- Manual (NCAA scraper pending Pass 74; HS permanent manual)
  ('roch_cholowsky', 'Roch Cholowsky', 'hitter',  'NCAA', true, 'manual', NULL, NULL, NULL),
  ('carson_bolemon', 'Carson Bolemon', 'pitcher', 'HS',   true, 'manual', NULL, NULL, NULL),
  ('grady_emerson',  'Grady Emerson',  'hitter',  'HS',   true, 'manual', NULL, NULL, NULL)
ON CONFLICT (player_id) DO NOTHING;

-- Set initial status for manual/pending players
UPDATE roster
SET last_ingestion_status = 'manual_pending',
    last_ingestion_message = 'Awaiting adapter or manual ingestion'
WHERE data_source IN ('manual', 'milb_stats_api')
  AND last_ingestion_status IS NULL;
