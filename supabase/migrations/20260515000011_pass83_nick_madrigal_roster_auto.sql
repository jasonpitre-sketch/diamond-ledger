-- Pass 83 — Nick Madrigal auto-ingestion roster enablement
-- Adds Nick Madrigal to the production daily scheduler roster.
--
-- MiLB Stats API verified:
--   player 663611, team 561 (Salt Lake Bees), sportId 11 (Triple-A).

insert into public.roster (
  player_id,
  name,
  kind,
  level,
  active,
  data_source,
  external_player_id,
  external_team_id,
  external_sport_id,
  last_ingestion_status,
  last_ingestion_message,
  created_at,
  updated_at
)
values (
  'nick_madrigal',
  'Nick Madrigal',
  'hitter',
  'AAA',
  true,
  'milb_stats_api',
  '663611',
  '561',
  '11',
  'success',
  'Auto-enabled via MiLB Stats API; 2026 Salt Lake game logs verified through 2026-05-14',
  now(),
  now()
)
on conflict (player_id) do update
set name = excluded.name,
    kind = excluded.kind,
    level = excluded.level,
    active = excluded.active,
    data_source = excluded.data_source,
    external_player_id = excluded.external_player_id,
    external_team_id = excluded.external_team_id,
    external_sport_id = excluded.external_sport_id,
    last_ingestion_message = excluded.last_ingestion_message,
    updated_at = now();
