-- Trail reviews table
create table if not exists trail_reviews (
  id          uuid primary key default gen_random_uuid(),
  trail_slug  text not null,
  name        text not null,
  rating      integer not null check (rating between 1 and 5),
  title       text,
  body        text not null,
  date_hiked  date,
  conditions  text,
  difficulty_felt text,
  approved    boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists idx_trail_reviews_slug on trail_reviews(trail_slug, approved, created_at desc);

-- Trail support donations log
create table if not exists trail_support (
  id          uuid primary key default gen_random_uuid(),
  trail_slug  text not null,
  trail_name  text not null,
  amount_cents integer not null,
  stripe_session_id text,
  created_at  timestamptz not null default now()
);
