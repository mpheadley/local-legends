import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/listicles");

export interface GuideBusiness {
  name: string;
  city: string;
  zip?: string;
  tel?: string;
  web?: string;
  image?: string;
  photos?: string[];
  quote?: string;
  quoteAttrib?: string;
}

export interface GuideEvent {
  name: string;
  date: string;
  location: string;
  distances?: string;
  category?: string;
  web?: string;
  image?: string;
  description: string;
  vendor?: string;
  section?: string;
}

export interface Listicle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  city: string;
  category?: string;
  image?: string;
  intro?: string;
  businesses: GuideBusiness[];
  events?: GuideEvent[];
  itemlist?: string; // JSON-LD ItemList string
  content: string; // legacy MDX body (empty for card-format guides)
}

function titleCase(s: string): string {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function deriveCity(slug: string): string {
  const m = slug.match(/-in-(.+)$/);
  return m ? titleCase(m[1]) : "";
}

export function getListicleSlugs(): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getListicle(slug: string): Listicle | null {
  const fp = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  const { data, content } = matter(fs.readFileSync(fp, "utf8"));
  return {
    slug,
    title: (data.title as string) ?? titleCase(slug),
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    city: (data.place as string) || deriveCity(slug),
    category: data.category as string | undefined,
    image: data.image as string | undefined,
    intro: data.intro as string | undefined,
    businesses: (data.businesses as GuideBusiness[]) ?? [],
    events: data.events as GuideEvent[] | undefined,
    itemlist: data.itemlist as string | undefined,
    content: content.replace(/^\s*import .*$/gm, "").trim(),
  };
}

export function getAllListicles(): Listicle[] {
  return getListicleSlugs()
    .map(getListicle)
    .filter((l): l is Listicle => l !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getListiclesByCity(city: string): Listicle[] {
  const key = city.toLowerCase();
  const keySlug = key.replace(/\s+/g, "-");
  return getAllListicles().filter(
    (l) => l.city.toLowerCase() === key || l.tags.some((t) => t.toLowerCase() === keySlug)
  );
}
