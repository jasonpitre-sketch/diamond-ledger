-- Pass 90 — Jac Caglianone auto-ingestion roster enablement
insert into public.roster (player_id,name,kind,level,active,data_source,external_player_id,external_team_id,external_sport_id,last_ingestion_status,last_ingestion_message,created_at,updated_at)
values ('jac_caglianone','Jac Caglianone','hitter','MLB',true,'mlb_stats_api','695506','118','1','success','Auto-enabled via mlb_stats_api; 2026 game logs verified',now(),now())
on conflict (player_id) do update set name=excluded.name,kind=excluded.kind,level=excluded.level,active=excluded.active,data_source=excluded.data_source,external_player_id=excluded.external_player_id,external_team_id=excluded.external_team_id,external_sport_id=excluded.external_sport_id,last_ingestion_message=excluded.last_ingestion_message,updated_at=now();
