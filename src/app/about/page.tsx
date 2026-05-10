export const revalidate = 300

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import SubscribeCTA from "@/app/components/SubscribeCTA";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — why we tell these stories and who's behind the project.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteConfig.url}/about`,
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative text-white overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-black/50 z-[1]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-10 md:pt-32 md:pb-14">
          <h1
            className="text-3xl md:text-4xl font-bold uppercase tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            About
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-ll-light">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 prose-profile">
          <p>
            I profile people in Northeast Alabama. Business owners, mostly.
            But also places and organizations that have been here long enough
            to have a story worth hearing.
          </p>

          <p>
            The format is simple. I sit down with someone, ask how they got
            here, and write it with enough room to actually tell the story.
          </p>

          <h2 id="farm">Who&apos;s Behind This?</h2>

          <div className="not-prose my-6">
            <Image
              src="/images/about/headshot-hedcut-matt-headley.webp"
              alt="Matt Headley, illustrated portrait"
              width={120}
              height={120}
              className="rounded-lg float-left mr-6 mb-2"
            />
            <p className="text-ll-text leading-relaxed mb-6">
              My name is Matt Headley. I live in Jacksonville. I spent nineteen
              years in music and pastoral ministry. Somewhere in the middle of
              that, my wife Heather and I built a
              flower farm. Cut flowers, farmers markets, a little retail kiosk
              on the Chief Ladiga Trail. We built that thing from the ground up,
              with our kids underfoot. And then we had to sell it.
            </p>
            <p className="text-ll-text leading-relaxed mb-6">
              I still drive past farms and gardens on my way to work. Some days
              it&apos;s fine. Some days it isn&apos;t.
            </p>
          </div>

          <div className="not-prose my-8 grid grid-cols-2 gap-4">
            <Image
              src="/images/about/matt-and-heather-flower-farm.webp"
              alt="Matt and Heather Headley at the flower farm"
              width={720}
              height={720}
              className="w-full rounded-lg object-cover aspect-square"
            />
            <Image
              src="/images/about/headley-flower-farm-field.webp"
              alt="Rows of zinnias and echinacea at Headley Flower Farm"
              width={800}
              height={600}
              className="w-full rounded-lg object-cover aspect-square"
            />
          </div>

          <div>
            <p className="text-ll-text leading-relaxed mb-6">
              What I do now is help small business owners find and say the true
              thing about what they do. I run{" "}
              <a
                href="https://plainspokenblueprint.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ll-primary font-medium underline underline-offset-3 hover:text-ll-primary-dark transition-colors"
              >
                Plainspoken Blueprint
              </a>
              {" "}— a messaging clarity practice built from fifteen years in the pulpit, a flower farm, and thirty pieces of software for
              florists, farmers market managers, pastors, and wedding vendors. One 90-minute session. One page. A message that works before you walk in the room.
            </p>
            <p className="text-ll-text leading-relaxed mb-6">
              Southern Legends started because the work kept putting me across
              the table from people, and I needed that more than I expected.
              Turns out sitting with someone and asking them to tell you their story is one of the
              ways back. I wrote more about{" "}
              <Link
                href="/essays/the-same-domain"
                className="text-ll-primary font-medium underline underline-offset-3 hover:text-ll-primary-dark transition-colors"
              >
                why this site exists
              </Link>
              {" "}in the journal. My writing has appeared in the{" "}
              <Link
                href="/essays/hope-in-the-wilderness"
                className="text-ll-primary font-medium underline underline-offset-3 hover:text-ll-primary-dark transition-colors"
              >
                Anniston Star
              </Link>
              .
            </p>
            <p className="text-ll-text leading-relaxed mb-6">
              When you&apos;ve lost something you built, you notice the people
              who are still building. You pay attention differently. You ask
              better questions.
            </p>
          </div>

          {/* PB section — Matt writes the prose */}
          <div className="not-prose my-8 p-6 rounded-lg" style={{ background: "var(--color-ll-warm)", border: "1px solid var(--color-ll-border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-ll-text-light mb-3">
              Plainspoken Blueprint
            </p>
            <p className="text-ll-text leading-relaxed mb-4">
              {/* Matt writes this paragraph — what PB does, who it's for, what you leave with */}
              [Placeholder — Matt writes this: what PB does in plain language, who it&apos;s for, what a 90-min session produces. One paragraph. First person.]
            </p>
            <a
              href="https://plainspokenblueprint.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-bold"
              style={{ color: "var(--color-ll-primary)", textDecoration: "underline" }}
            >
              Book a 90-min session →
            </a>
          </div>

          <h2>Know Someone Worth Writing About?</h2>

          <p>
            If you know a person or a place whose story deserves to be told, I&apos;d like to hear about it.
          </p>

          <p>
            Reach out at{" "}
            <a href="mailto:matt@plainspokenblueprint.com">matt@plainspokenblueprint.com</a>.
          </p>

          <hr className="my-10 border-ll-dark/10" />

          <div className="not-prose flex flex-col sm:flex-row gap-4 my-10">
            <Link
              href="/support"
              className="btn-support inline-block px-7 py-3 bg-ll-primary font-bold text-sm rounded-md hover:bg-ll-primary-dark transition-colors text-center"
            >
              Support this work →
            </Link>
            <Link
              href="/essays"
              className="btn-journal inline-block px-5 py-2 border-2 border-ll-accent font-bold text-sm rounded-md hover:bg-ll-accent transition-colors text-center"
            >
              Matt also writes about his own story →
            </Link>
          </div>

          <hr className="my-10 border-ll-dark/10" />

          {process.env.NEXT_PUBLIC_MERCH_STORE_URL && (
            <div className="not-prose text-center my-10">
              <p
                className="text-xs uppercase tracking-widest text-ll-dark mb-1"
                style={{ opacity: 0.32, letterSpacing: "0.22em" }}
              >
                Walt Whitman
              </p>
              <p
                className="text-3xl text-ll-dark leading-snug mb-4"
                style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 300 }}
              >
                I contain<br />multitudes.
              </p>
              <div className="flex gap-6 justify-center flex-wrap mb-5">
                <a href="https://matt-headley-shop.fourthwall.com/products/i-contain-multitudes" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.dev/IMNy3eu4RC0MEIbGmpUUg-5yMjSRyFtKLGn1Mjh5S84/w:1920/sm:1/enc/ZedkaYftBaqinaIZ/Jr40_xy3Eb4tySwk/rScelYdmKxyZS6jZ/NJHeSvZlktqX-xYh/WSHRJ-RhgMHeSlMQ/27Iq7L_pckKRXOOp/v5oIB6B1Vnyt8g_D/jmvq7ZBuLrTpLBdn/gKhmeo_IvtrJEkf4/Yfl8j3qjiOOsC3F3/Z2VGxXEwJGMrAnzQ/2Xzk5fe0iRKeZTw2/UCV0r3RWKam0aN3r/8xpuJ8LPfqX3Axj4/fUq1cLuAVw8.jpg"
                    alt="I Contain Multitudes tee"
                    width={160}
                    height={160}
                    className="mx-auto rounded mb-1"
                  />
                  <span className="text-xs text-ll-text-light">I Contain Multitudes</span>
                </a>
                <a href="https://matt-headley-shop.fourthwall.com/products/chief-ladiga-trail" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.dev/ZF3dCHiMwN_oLeMILCG_ZyO-yLWVBfdGdJMTSYB-VXY/w:1920/sm:1/enc/xbK5_Zj8qaLU0EP3/UfOi6qpauX8X4zZD/AWPss1Zx9hhOgARc/CZqplVE_aYujz1uM/epI7dRMx0-wU71TK/3ma_163k4tMHBodv/YrGnTZCy-6dzW-bm/mAPjyxMJSQCG5oDM/9dFf4zGHoj51RgVo/E53wJphu1Azmz6CY/uVVj-1cu4Ost7nHt/mSLxEtUbNZifhAY-/Jc8wVoo-eZhrCxWg/lW9fJ68l0YPLbqD5/8B9AixuIqDc.jpg"
                    alt="Chief Ladiga Trail tee"
                    width={160}
                    height={160}
                    className="mx-auto rounded mb-1"
                  />
                  <span className="text-xs text-ll-text-light">Chief Ladiga Trail</span>
                </a>
                <a href="https://matt-headley-shop.fourthwall.com/products/the-model-city-anniston-alabama" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.dev/bCKGvDFomR4x6_Zlk-RenE-MeR-Zb6uKO6B8jy1nJ6A/w:1920/sm:1/enc/8Tc1-v11kCUQnxAj/xbkOwN2Vmv1CmS5b/iH46ky6mYZkr7k1T/sj-wL9p2g_mBO1xo/11U6ggMM2EaOCyuu/ZKr9z6B4zHOG8DIq/zuwI3c9jJmiOwIiV/VVBN7X34q-o7BDHm/mSLvFXaNgCicXSW1/oVoxxnVrSMwkzOC5/pb5-h4tqgXuvRrep/XjTo_ygy8ePtMBxI/mrLLJArS604vJop5/0ZWri4eShE8mN6Mk/R8CBRTe6q5c.jpg"
                    alt="The Model City tee"
                    width={160}
                    height={160}
                    className="mx-auto rounded mb-1"
                  />
                  <span className="text-xs text-ll-text-light">The Model City</span>
                </a>
              </div>
              <a
                href={process.env.NEXT_PUBLIC_MERCH_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-ll-primary border border-ll-primary px-5 py-2.5 hover:bg-ll-primary hover:text-white transition-colors"
              >
                The store →
              </a>
            </div>
          )}

          <hr className="my-10 border-ll-dark/10" />

          <p className="text-sm text-ll-text-light">
            Southern Legends is built and maintained by{" "}
            <a
              href="https://matthewheadley.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matt Headley
            </a>
            {" "}·{" "}
            <a
              href="https://headleyweb.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Headley Web &amp; SEO
            </a>
            .
          </p>
        </div>
      </section>

      <SubscribeCTA variant="section" />
    </main>
  );
}
