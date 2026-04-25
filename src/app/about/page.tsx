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
              What I do now is build websites and run search campaigns for local businesses. That&apos;s{" "}
              <a
                href="https://headleyweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ll-primary font-medium underline underline-offset-3 hover:text-ll-primary-dark transition-colors"
              >
                Headley Web &amp; SEO
              </a>
              . Southern Legends started because the work kept putting me across
              the table from people, and I needed that more than I expected.
              Turns out sitting
              with someone and asking them to tell you their story is one of the
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

          <h2>Know Someone Worth Writing About?</h2>

          <p>
            If you know a person or a place whose story deserves to be told, I&apos;d like to hear about it.
          </p>

          <p>
            Reach out at{" "}
            <a href="mailto:matt@headleyweb.com">matt@headleyweb.com</a>.
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
                    src="https://imgproxy.fourthwall.com/XnWvYiZD4UjuNBJBJ6PsIFbGJQ0_vwWMnwXmZZYM284/w:1920/sm:1/enc/Iii2cVJX6gm0Z5eT/n-DKEGZRRMgLOx8E/IMyMVfwhzQTkbK2F/ogivFZtKqq4b1QIL/_tvLMpcuJd30nKeQ/7m10OvKkDUX2YfjK/syPaHP0XhDTrPN8F/0_ggD-iszhBag0N-/wWGI-LmU8ECYrvT1/vdaFyt063kd6W_Jv/PICxh677t92H8jr9/o_obaRxZjzsHyJKE/UU6f8Ge6SFWzHK6Q/UuJAyx3H18_uoK5U/ud3AIRtDync"
                    alt="I Contain Multitudes tee"
                    width={160}
                    height={160}
                    className="mx-auto rounded mb-1"
                  />
                  <span className="text-xs text-ll-text-light">I Contain Multitudes</span>
                </a>
                <a href="https://matt-headley-shop.fourthwall.com/products/chief-ladiga-trail" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.com/bHccj44L1ev8agAF-wIegw5E4RCpSXSjV6EofGCuOAs/w:1920/sm:1/enc/XBYPBuD-JAm0ldGB/C_il-GBKr_m-hGFF/q0r9c956tj7SBm-A/kEovJx6hlHwRpqWE/YwxX-829rTCOA_lV/PNR4Cpydyiy1QDkd/Tz56NiaVzcBLDOjW/Vs0EAnicbLeedKJF/kfUVcMHs6YwPpHn1/Yth_teKqtBgkuRFS/4GmyZmRy7zIQCeJ0/25x19MxN7ULq-BZc/TvQM3VK0eXNiMckp/z45whZ_dp8h2wMpX/tFw3mbn-kHE"
                    alt="Ladiga's Land tee"
                    width={160}
                    height={160}
                    className="mx-auto rounded mb-1"
                  />
                  <span className="text-xs text-ll-text-light">Ladiga&apos;s Land</span>
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
