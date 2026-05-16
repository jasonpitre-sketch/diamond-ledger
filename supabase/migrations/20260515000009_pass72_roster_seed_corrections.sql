-- Pass 72 follow-up — Production roster seed corrections
-- Aligns live Supabase roster with the 10-player automation contract.

update public.roster
set player_id = 'roch_cholowsky',
    name = 'Roch Cholowsky',
    active = true,
    last_ingestion_status = 'manual_pending',
    last_ingestion_message = 'Awaiting manual ingestion',
    updated_at = now()
where player_id = 'scott_roch';

update public.roster
set player_id = 'brice_turang',
    name = 'Brice Turang',
    external_player_id = '668930',
    external_team_id = '158',
    external_sport_id = '1',
    updated_at = now()
where player_id = 'brandon_turang';

update public.roster
set external_player_id = '664761',
    external_team_id = '143',
    external_sport_id = '1',
    updated_at = now()
where player_id = 'alec_bohm';

update public.roster
set external_player_id = '663903',
    external_team_id = '113',
    external_sport_id = '1',
    updated_at = now()
where player_id = 'brady_singer';

update public.roster
set external_player_id = '663554',
    external_team_id = '116',
    external_sport_id = '1',
    updated_at = now()
where player_id = 'casey_mize';

update public.roster
set active = true,
    last_ingestion_status = 'manual_pending',
    last_ingestion_message = 'Awaiting manual ingestion',
    updated_at = now()
where player_id in ('carson_bolemon', 'grady_emerson', 'roch_cholowsky');
