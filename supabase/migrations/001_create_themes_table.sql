-- Vibe Themes Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create themes table
create table if not exists public.themes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null default auth.uid(),
  name text not null,
  brand_colors jsonb not null,
  tokens jsonb not null,
  mode text not null default 'both' check (mode in ('light', 'dark', 'both')),
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create indexes
create index if not exists themes_user_id_idx on public.themes(user_id);
create index if not exists themes_is_public_idx on public.themes(is_public) where is_public = true;
create index if not exists themes_created_at_idx on public.themes(created_at desc);

-- Enable Row Level Security
alter table public.themes enable row level security;

-- Policies

-- Users can view their own themes
create policy "Users can view own themes"
  on public.themes for select
  using (auth.uid() = user_id);

-- Users can view public themes
create policy "Anyone can view public themes"
  on public.themes for select
  using (is_public = true);

-- Users can insert their own themes
create policy "Users can insert own themes"
  on public.themes for insert
  with check (auth.uid() = user_id);

-- Users can update their own themes
create policy "Users can update own themes"
  on public.themes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can delete their own themes
create policy "Users can delete own themes"
  on public.themes for delete
  using (auth.uid() = user_id);

-- Function to automatically update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
drop trigger if exists themes_updated_at on public.themes;
create trigger themes_updated_at
  before update on public.themes
  for each row
  execute function public.handle_updated_at();

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.themes to anon, authenticated;
