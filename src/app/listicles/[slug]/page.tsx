export const revalidate = 300;

import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { getListicle, getListicleSlugs, getAllListicles } from "@/lib/listicles";
import { siteConfig } from "@/lib/site-config";
import ShareRow from "@/app/components/ShareRow";

export function generateStaticParams() {
  return getListicleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getListicle(slug);
  if (!l) return {};
  return {
    title: `${l.title} — Southern Legends`,
    description: l.excerpt,
    alternates: { canonical: `/listicles/${slug}` },
    openGraph: { title: l.title, description: l.excerpt, url: `/listicles/${slug}` },
  };
}

// Map <Script> (JSON-LD in the MDX) to a raw script tag; MDXRemote resolves component names.
const mdxComponents = {
  Script: (props: React.ComponentProps<"script">) => <script {...props} />,
};

export default async function ListiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getListicle(slug);
  if (!l) notFound();

  const others = getAllListicles().filter((x) => x.slug !== slug).slice(0, 6);

  return (
    <main id="main-content" style={{ backgroundColor: "#F0EDE6", minHeight: "100vh" }}>
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-36">
        <Link
          href="/listicles"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9a6c2f",
            textDecoration: "none",
          }}
        >
          ← Local Guides
        </Link>

        <article
          className="prose prose-lg mt-6 max-w-none"
          style={{
            // @ts-expect-error CSS var
            "--tw-prose-headings": "#1a1208",
            "--tw-prose-body": "#3a2c1e",
            "--tw-prose-links": "#9a6c2f",
            "--tw-prose-bold": "#1a1208",
            fontFamily: "var(--font-body)",
          }}
        >
          <MDXRemote source={l.content} components={mdxComponents} />
        </article>

        <div style={{ marginTop: "3rem" }}>
          <ShareRow url={`/listicles/${slug}`} title={l.title} description={l.excerpt} />
        </div>

        {others.length > 0 && (
          <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(154,108,47,0.18)", paddingTop: "2rem" }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a6c2f", marginBottom: "1rem",
            }}>
              More local guides
            </p>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {others.map((o) => (
                <Link key={o.slug} href={`/listicles/${o.slug}`} style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.05rem", color: "#1a1208", textDecoration: "none",
                }}>
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
