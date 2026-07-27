export const revalidate = 300;

import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { getListicle, getListicleSlugs, getAllListicles } from "@/lib/listicles";
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
    openGraph: { title: l.title, description: l.excerpt, url: `/listicles/${slug}`, images: l.image ? [l.image] : [] },
  };
}

const mdxComponents = {
  Script: (props: React.ComponentProps<"script">) => <script {...props} />,
};

function telHref(t: string) {
  return "tel:" + t.replace(/[^0-9]/g, "");
}

export default async function ListiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getListicle(slug);
  if (!l) notFound();

  const others = getAllListicles().filter((x) => x.slug !== slug).slice(0, 6);
  const isCard = l.businesses && l.businesses.length > 0;

  return (
    <main id="main-content" style={{ backgroundColor: "#F0EDE6", minHeight: "100vh" }}>
      {l.itemlist && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: l.itemlist }} />
      )}

      {/* Header image */}
      {l.image && (
        <div style={{ position: "relative", width: "100%", height: "clamp(220px, 38vw, 380px)" }}>
          <Image src={l.image} alt={l.title} fill priority style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,18,8,.15) 0%, transparent 40%, rgba(26,18,8,.75) 100%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 1.5rem 1.75rem", maxWidth: "48rem", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F0EDE6", opacity: 0.85, marginBottom: "0.5rem" }}>
              Southern Legends · Local Guide
            </p>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 6vw, 3.25rem)", fontWeight: 400, lineHeight: 1.05, color: "#fff" }}>
              {l.title}
            </h1>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 pb-16 pt-8">
        <Link href="/listicles" style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a6c2f", textDecoration: "none" }}>
          ← Local Guides
        </Link>

        {l.intro && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "#4a3728", lineHeight: 1.65, margin: "1.25rem 0 2rem", maxWidth: "40rem" }}>
            {l.intro}
          </p>
        )}

        {isCard ? (
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {l.businesses.map((b, i) => (
              <div key={b.name + i} style={{ display: "flex", gap: "0", alignItems: "stretch", background: "#fff", border: "1px solid rgba(154,108,47,0.15)", borderRadius: "10px", overflow: "hidden" }}>
                {/* Photo */}
                {b.image && (
                  <div style={{ flexShrink: 0, width: "120px", position: "relative" }}>
                    <Image src={b.image} alt={b.name} fill style={{ objectFit: "cover" }} sizes="120px" />
                  </div>
                )}
                {/* Number badge when no photo */}
                {!b.image && (
                  <div style={{ flexShrink: 0, width: "3rem", background: "#F0EDE6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "#9a6c2f" }}>{i + 1}</span>
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0, padding: "1rem 1.25rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  {b.image && (
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a6c2f", marginBottom: "0.2rem" }}>
                      #{i + 1}
                    </span>
                  )}
                  <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 400, color: "#1a1208", lineHeight: 1.2, margin: 0 }}>
                    {b.web ? <a href={b.web} target="_blank" rel="noopener" style={{ color: "#1a1208", textDecoration: "none" }}>{b.name}</a> : b.name}
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#6b5040", marginTop: "0.15rem", marginBottom: 0 }}>
                    {b.city}{b.zip ? ` · ${b.zip}` : ""}
                  </p>
                  <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.65rem", flexWrap: "wrap" }}>
                    {b.tel && (
                      <a href={telHref(b.tel)} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color: "#9a6c2f", background: "#F0EDE6", padding: "0.3rem 0.7rem", borderRadius: "5px", textDecoration: "none" }}>
                        {b.tel}
                      </a>
                    )}
                    {b.web && (
                      <a href={b.web} target="_blank" rel="noopener" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color: "#F0EDE6", background: "#9a6c2f", padding: "0.3rem 0.8rem", borderRadius: "5px", textDecoration: "none" }}>
                        Visit site →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <article className="prose prose-lg max-w-none" style={{ fontFamily: "var(--font-body)" }}>
            <MDXRemote source={l.content} components={mdxComponents} />
          </article>
        )}

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#6b5040", marginTop: "2rem", fontStyle: "italic" }}>
          A living list, honestly kept. Own one of these? <Link href="/contact" style={{ color: "#9a6c2f" }}>Claim or correct your listing.</Link>
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <ShareRow url={`/listicles/${slug}`} title={l.title} description={l.excerpt} />
        </div>

        {others.length > 0 && (
          <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(154,108,47,0.18)", paddingTop: "2rem" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a6c2f", marginBottom: "1rem" }}>
              More local guides
            </p>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {others.map((o) => (
                <Link key={o.slug} href={`/listicles/${o.slug}`} style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", color: "#1a1208", textDecoration: "none" }}>
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
