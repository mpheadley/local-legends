import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content/businesses")

export interface BusinessFrontmatter {
  title: string
  slug: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  published: boolean
  businessCity: string
  businessCategory: string
}

export interface BusinessPost {
  slug: string
  frontmatter: BusinessFrontmatter
  content: string
}

export function getBusinessSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return []
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getBusinessBySlug(slug: string): BusinessPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { slug, frontmatter: data as BusinessFrontmatter, content }
}

export function getAllBusinesses(): BusinessPost[] {
  return getBusinessSlugs()
    .map(getBusinessBySlug)
    .filter((p): p is BusinessPost => p !== null && p.frontmatter.published)
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title))
}

export function getBusinessesByCity(citySlug: string): BusinessPost[] {
  return getAllBusinesses().filter((b) =>
    b.frontmatter.tags.includes(citySlug)
  )
}

export function getBusinessCities(): string[] {
  const all = getAllBusinesses()
  const cities = new Set<string>()
  for (const b of all) {
    if (b.frontmatter.businessCity) cities.add(b.frontmatter.businessCity)
  }
  return Array.from(cities).sort()
}

export function cityToSlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "")
}
