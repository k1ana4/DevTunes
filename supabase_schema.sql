-- DevTune — Supabase Schema
-- Paste into your Supabase SQL editor and run

create table if not exists devtune_tracks (
  id          text primary key,
  scene_id    text,
  name        text not null,
  emoji       text,
  mood        text,
  intensity   int,
  prompt      text,
  audio_b64   text,
  created_at  timestamptz default now()
);

create index if not exists devtune_tracks_time on devtune_tracks (created_at desc);
alter table devtune_tracks enable row level security;
create policy "Open access" on devtune_tracks for all using (true);
