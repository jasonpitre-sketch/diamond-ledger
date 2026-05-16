-- Pass 86 — Matthew Liberatore auto-ingestion roster enablement
-- MLB Stats API verified: player 669461, team 138 (St. Louis Cardinals), sportId 1.

insert into public.roster (
  player_id, name, kind, level, active, data_source,
  external_player_id, external_team_id, external_sport_id,
  last_ingestion_status, last_ingestion_message, created_at, updated_at
)
values (
  'matthew_liberatore', 'Matthew Liberatore', 'pitcher', 'MLB', true, 'mlb_stats_api',
  '669461', '138', '1',
  'success', 'Auto-enabled via MLB Stats API; 2026 game logs verified through 2026-05-13',
  now(), now()
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
