-- Pass 72 follow-up — Daily ingestion service-role grants
-- Allows the cron scheduler to read/update roster and write run logs.

grant select, update on public.roster to service_role;
grant select, insert on public.daily_ingestion_log to service_role;
grant usage, select on sequence public.daily_ingestion_log_id_seq to service_role;
