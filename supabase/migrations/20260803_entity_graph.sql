-- Entity Graph MVP — NE Alabama subject registry
-- The moat: one canonical record per subject (person, place, business, church, venue, trail)
-- All scrapers write to it. All ventures query from it.
-- Run in Supabase SQL editor.

CREATE TABLE IF NOT EXISTS subjects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  type          TEXT NOT NULL CHECK (type IN (
                  'person', 'place', 'business', 'church',
                  'venue', 'trail', 'organization', 'event'
                )),
  city          TEXT,
  county        TEXT DEFAULT 'Calhoun',
  state         TEXT DEFAULT 'AL',
  lat           NUMERIC(9,6),
  lng           NUMERIC(9,6),
  description   TEXT,
  notes         TEXT,
  -- Which ventures have content about this subject
  ventures      TEXT[] DEFAULT '{}',
  -- Source attribution: where the record was derived from
  sources       TEXT[] DEFAULT '{}',
  -- SL content links (profile slugs, essay slugs)
  sl_profile    TEXT,
  sl_essays     TEXT[] DEFAULT '{}',
  -- External presence
  website       TEXT,
  facebook      TEXT,
  instagram     TEXT,
  youtube_channel TEXT,
  -- Scrapers write here
  last_scraped  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Media attached to subjects (YouTube embeds, images, audio)
CREATE TABLE IF NOT EXISTS subject_media (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id    UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  type          TEXT NOT NULL CHECK (type IN ('youtube', 'image', 'audio', 'podcast', 'article')),
  url           TEXT NOT NULL,
  title         TEXT,
  thumbnail     TEXT,
  source        TEXT,            -- 'youtube_api', 'scraper', 'manual'
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Mentions: links any piece of content to any subject
CREATE TABLE IF NOT EXISTS subject_mentions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id    UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  venture       TEXT NOT NULL,   -- 'southern-legends', 'theaisle', 'ecclesia', etc.
  content_type  TEXT NOT NULL,   -- 'profile', 'essay', 'column', 'event'
  content_slug  TEXT NOT NULL,
  content_url   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(subject_id, venture, content_type, content_slug)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subjects_type    ON subjects(type);
CREATE INDEX IF NOT EXISTS idx_subjects_city    ON subjects(city);
CREATE INDEX IF NOT EXISTS idx_subjects_county  ON subjects(county);
CREATE INDEX IF NOT EXISTS idx_subjects_ventures ON subjects USING GIN(ventures);
CREATE INDEX IF NOT EXISTS idx_subject_media_subject ON subject_media(subject_id, type);
CREATE INDEX IF NOT EXISTS idx_subject_mentions_subject ON subject_mentions(subject_id);
CREATE INDEX IF NOT EXISTS idx_subject_mentions_venture ON subject_mentions(venture, content_type);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_subjects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER subjects_updated_at
  BEFORE UPDATE ON subjects
  FOR EACH ROW EXECUTE FUNCTION update_subjects_updated_at();
