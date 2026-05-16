-- Pass 82 — Tyler Bremner auto-ingestion roster enablement
-- Adds Tyler Bremner to the production daily scheduler roster.
--
-- Context:
-- - Local replay/onboarding completed in Pass 81.
-- - MiLB Stats API verified:
--   player 803285, team 460 (Tri-City Dust Devils), sportId 13 (High-A).
-- - The service role previously had SELECT/UPDATE but not INSERT on roster;
--   production roster additions require INSERT for scheduler-maintained rows.

grant insert on public.roster to service_role;

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
  'tyler_bremner',
  'Tyler Bremner',
  'pitcher',
  'A+',
  true,
  'milb_stats_api',
  '803285',
  '460',
  '13',
  'no_game',
  'Auto-enabled via MiLB Stats API; last official game log appearance 2026-05-05',
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
