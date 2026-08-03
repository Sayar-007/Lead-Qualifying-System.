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
