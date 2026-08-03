// Entity Graph — query layer for the NE Alabama subject registry
// All ventures write to subjects table; SL reads from it here.
// Schema: supabase/migrations/20260803_entity_graph.sql

import { createClient } from "@supabase/supabase-js";

// Server-side only — uses service role key for direct reads
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export type SubjectType =
  | "person"
  | "place"
  | "business"
  | "church"
  | "venue"
  | "trail"
  | "organization"
  | "event";

export interface Subject {
  id: string;
  slug: string;
  name: string;
  type: SubjectType;
  city: string | null;
  county: string | null;
  state: string;
  lat: number | null;
  lng: number | null;
  description: string | null;
  notes: string | null;
  ventures: string[];
  sources: string[];
  sl_profile: string | null;
  sl_essays: string[];
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube_channel: string | null;
  last_scraped: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubjectMedia {
  id: string;
  subject_id: string;
  type: "youtube" | "image" | "audio" | "podcast" | "article";
  url: string;
  title: string | null;
  thumbnail: string | null;
  source: string | null;
  published_at: string | null;
}

export interface SubjectMention {
  id: string;
  subject_id: string;
  venture: string;
  content_type: string;
  content_slug: string;
  content_url: string | null;
}

// Fetch a single subject by slug
export async function getSubject(slug: string): Promise<Subject | null> {
  const client = getServiceClient();
  const { data, error } = await client
    .from("subjects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data as Subject;
}

// Fetch subjects by city — used by city pages
export async function getSubjectsByCity(
  city: string,
  types?: SubjectType[]
): Promise<Subject[]> {
  const client = getServiceClient();
  let query = client.from("subjects").select("*").ilike("city", city);
  if (types?.length) query = query.in("type", types);
  const { data } = await query.order("name");
  return (data ?? []) as Subject[];
}

// Fetch subjects that have SL content (profile or essay)
export async function getSubjectsWithContent(): Promise<Subject[]> {
  const client = getServiceClient();
  const { data } = await client
    .from("subjects")
    .select("*")
    .or("sl_profile.not.is.null,sl_essays.not.eq.{}")
    .order("name");
  return (data ?? []) as Subject[];
}

// Fetch subjects by type
export async function getSubjectsByType(type: SubjectType): Promise<Subject[]> {
  const client = getServiceClient();
  const { data } = await client
    .from("subjects")
    .select("*")
    .eq("type", type)
    .order("name");
  return (data ?? []) as Subject[];
}

// Fetch subjects that belong to a venture
export async function getSubjectsByVenture(venture: string): Promise<Subject[]> {
  const client = getServiceClient();
  const { data } = await client
    .from("subjects")
    .select("*")
    .contains("ventures", [venture])
    .order("name");
  return (data ?? []) as Subject[];
}

// Fetch media for a subject
export async function getSubjectMedia(
  subjectId: string,
  type?: SubjectMedia["type"]
): Promise<SubjectMedia[]> {
  const client = getServiceClient();
  let query = client
    .from("subject_media")
    .select("*")
    .eq("subject_id", subjectId);
  if (type) query = query.eq("type", type);
  const { data } = await query.order("published_at", { ascending: false });
  return (data ?? []) as SubjectMedia[];
}

// Fetch all mentions of a subject across ventures
export async function getSubjectMentions(subjectId: string): Promise<SubjectMention[]> {
  const client = getServiceClient();
  const { data } = await client
    .from("subject_mentions")
    .select("*")
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: false });
  return (data ?? []) as SubjectMention[];
}

// Upsert a subject (for scrapers writing to the graph)
export async function upsertSubject(
  subject: Omit<Subject, "id" | "created_at" | "updated_at">
): Promise<Subject | null> {
  const client = getServiceClient();
  const { data, error } = await client
    .from("subjects")
    .upsert(subject, { onConflict: "slug" })
    .select()
    .single();
  if (error) {
    console.error("upsertSubject error:", error);
    return null;
  }
  return data as Subject;
}

// Add media to a subject (idempotent by url)
export async function addSubjectMedia(
  media: Omit<SubjectMedia, "id">
): Promise<void> {
  const client = getServiceClient();
  await client
    .from("subject_media")
    .upsert(media, { onConflict: "subject_id,type,url" } as Record<string, unknown>)
    .throwOnError();
}

// Record a content mention of a subject
export async function recordMention(
  mention: Omit<SubjectMention, "id" | "created_at">
): Promise<void> {
  const client = getServiceClient();
  await client
    .from("subject_mentions")
    .upsert(mention, { onConflict: "subject_id,venture,content_type,content_slug" } as Record<string, unknown>)
    .throwOnError();
}

// Full-text search across subjects (name + description)
export async function searchSubjects(query: string, limit = 10): Promise<Subject[]> {
  const client = getServiceClient();
  const { data } = await client
    .from("subjects")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(limit)
    .order("name");
  return (data ?? []) as Subject[];
}
