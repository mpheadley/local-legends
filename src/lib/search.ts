import { getAllJournalPosts } from "./journal";
import { getAllProfiles } from "./profiles";

export interface SearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  type: "journal" | "profile";
  date: string;
  href: string;
  category?: string;
}

function stripMdx(raw: string): string {
  return raw
    .replace(/^import\s.+$/gm, "")
    .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, "")
    .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, "")
    .replace(/\{[^}]*\}/g, "")
    .replace(/#+\s+/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildSearchIndex(): SearchEntry[] {
  const profiles = getAllProfiles().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    excerpt: p.frontmatter.excerpt,
    content: stripMdx(p.content),
    type: "profile" as const,
    date: p.frontmatter.date,
    href: `/profiles/${p.slug}`,
    category: p.frontmatter.category,
  }));

  const journal = getAllJournalPosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    excerpt: p.frontmatter.excerpt,
    content: stripMdx(p.content),
    type: "journal" as const,
    date: p.frontmatter.date,
    href: `/essays/${p.slug}`,
  }));

  return [...profiles, ...journal];
}
