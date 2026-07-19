import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/listicles");

export interface Listicle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  city: string;
  content: string; // import statements stripped (MDXRemote can't process them)
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
    city: deriveCity(slug),
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
