-- Run this in the Supabase SQL editor for your project.

create table if not exists leads (
    id uuid primary key,
    name text not null,
    contact text not null,
    source text not null,
    initial_message text,
    temperature text default 'unscored',
    qualification_notes text,
    created_at timestamptz default now()
);

create table if not exists conversations (
    id uuid primary key default gen_random_uuid(),
    lead_id uuid references leads(id),
    transcript jsonb not null,
    temperature text not null,
    created_at timestamptz default now()
);

create table if not exists bookings (
    id uuid primary key default gen_random_uuid(),
    lead_id uuid references leads(id),
    booked boolean not null,
    slot_start timestamptz,
    calcom_booking_uid text,
    reason_if_not_booked text,
    created_at timestamptz default now()
);

-- Enable realtime on leads so the admin dashboard can subscribe to new rows.
alter publication supabase_realtime add table leads;

-- Create users table (public profile linked to auth.users)
create table if not exists users (
    id uuid references auth.users not null primary key,
    name text,
    email text,
    created_at timestamptz default now()
);

-- Trigger to automatically create a public user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
