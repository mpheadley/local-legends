export const revalidate = 300

import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import StripePricingTable from "@/app/components/StripePricingTable";
import SubscribeCTA from "@/app/components/SubscribeCTA";

export const metadata: Metadata = {
  title: "Support",
  description: `Support Southern Legends — free stories from Northeast Alabama, written by Matt Headley.`,
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    url: "/support",
  },
};

export default function SupportPage() {
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
        name: "Support",
        item: `${siteConfig.url}/support`,
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
            Support This Work
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-ll-light">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 prose-profile">
          <p>
            Southern Legends is free — the profiles, the journal, all of it. No paywall, no algorithm, no monthly reminder that you still haven&apos;t subscribed.
          </p>

          <p>
            It costs time, miles, and a lot of cold coffee. If you want to help keep it going, here&apos;s how.
          </p>

          <div className="not-prose mt-10">
              <div className="flex gap-4 justify-center flex-wrap mb-6">
                <a href="https://matt-headley-shop.fourthwall.com/products/i-contain-multitudes" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.dev/IMNy3eu4RC0MEIbGmpUUg-5yMjSRyFtKLGn1Mjh5S84/w:1920/sm:1/enc/ZedkaYftBaqinaIZ/Jr40_xy3Eb4tySwk/rScelYdmKxyZS6jZ/NJHeSvZlktqX-xYh/WSHRJ-RhgMHeSlMQ/27Iq7L_pckKRXOOp/v5oIB6B1Vnyt8g_D/jmvq7ZBuLrTpLBdn/gKhmeo_IvtrJEkf4/Yfl8j3qjiOOsC3F3/Z2VGxXEwJGMrAnzQ/2Xzk5fe0iRKeZTw2/UCV0r3RWKam0aN3r/8xpuJ8LPfqX3Axj4/fUq1cLuAVw8.jpg"
                    alt="I Contain Multitudes tee"
                    width={140}
                    height={140}
                    className="rounded mb-2 mx-auto"
                  />
                  <span className="text-xs text-ll-text-light">I Contain Multitudes</span>
                </a>
                <a href="https://matt-headley-shop.fourthwall.com/products/bipolar-proud" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.com/h_96A1MIPtOTIaIiYVWIX71opxpo5aTClEo1w5juBqs/w:1920/sm:1/enc/6cyztRuBMcyK5yJ6/qW27rarZs034xiqO/uIEdXZ3wyNpBYfZu/bLqZxDSki3uIG-wV/r6rKWmuVX7Ij7c2u/T76KUWv84U9RwuRI/LB9zHEDBJydUE_RF/J14NCV4M8fBZ1kaa/FXRwj95Ef9XIM9Bo/lZsxWinD2qG6FKf5/Zwg8Tzn0duzfC-NX/OETz1p97N3Efixji/_IxGEL89KxkwdZis/XH8gGKHP_ZwkNzcR/-b99RXRadmU"
                    alt="Bipolar & Proud tee"
                    width={140}
                    height={140}
                    className="rounded mb-2 mx-auto"
                  />
                  <span className="text-xs text-ll-text-light">Bipolar &amp; Proud</span>
                </a>
                <a href="https://matt-headley-shop.fourthwall.com/products/still-here" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.com/FyWryySt9e8_rzT3yE6eItoqF6GstCkbBJSuL62LpoY/w:1920/sm:1/enc/kZytLUESOJY7WIq3/mQmU8CAxU0TQJrD2/LFh8Y-uqr4QKxZUr/-r3HZV9rDnJj-a9U/SY5J9AEtq4g5o7L3/JwKTj1OyPau1R0tC/tTw60OgXWBZkD6Hu/wWE8ibGTgAZsKMsY/WTotCATD8-xnovcw/FEwNfv2JgknjHnf0/ug0yHPZ7pcf3JZ2i/bZ0phQZB_NTgL9ld/E3bYmALpumGY4hCG/Su9KSvpN3h6FOoRK/dNXM-cTSQcw"
                    alt="Still Here tee"
                    width={140}
                    height={140}
                    className="rounded mb-2 mx-auto"
                  />
                  <span className="text-xs text-ll-text-light">Still Here</span>
                </a>
                <a href="https://matt-headley-shop.fourthwall.com/products/chief-ladiga-trail" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.dev/ZF3dCHiMwN_oLeMILCG_ZyO-yLWVBfdGdJMTSYB-VXY/w:1920/sm:1/enc/xbK5_Zj8qaLU0EP3/UfOi6qpauX8X4zZD/AWPss1Zx9hhOgARc/CZqplVE_aYujz1uM/epI7dRMx0-wU71TK/3ma_163k4tMHBodv/YrGnTZCy-6dzW-bm/mAPjyxMJSQCG5oDM/9dFf4zGHoj51RgVo/E53wJphu1Azmz6CY/uVVj-1cu4Ost7nHt/mSLxEtUbNZifhAY-/Jc8wVoo-eZhrCxWg/lW9fJ68l0YPLbqD5/8B9AixuIqDc.jpg"
                    alt="Chief Ladiga Trail tee"
                    width={140}
                    height={140}
                    className="rounded mb-2 mx-auto"
                  />
                  <span className="text-xs text-ll-text-light">Chief Ladiga Trail</span>
                </a>
                <a href="https://matt-headley-shop.fourthwall.com/products/the-model-city-anniston-alabama" target="_blank" rel="noopener noreferrer" className="text-center">
                  <Image
                    src="https://imgproxy.fourthwall.dev/bCKGvDFomR4x6_Zlk-RenE-MeR-Zb6uKO6B8jy1nJ6A/w:1920/sm:1/enc/8Tc1-v11kCUQnxAj/xbkOwN2Vmv1CmS5b/iH46ky6mYZkr7k1T/sj-wL9p2g_mBO1xo/11U6ggMM2EaOCyuu/ZKr9z6B4zHOG8DIq/zuwI3c9jJmiOwIiV/VVBN7X34q-o7BDHm/mSLvFXaNgCicXSW1/oVoxxnVrSMwkzOC5/pb5-h4tqgXuvRrep/XjTo_ygy8ePtMBxI/mrLLJArS604vJop5/0ZWri4eShE8mN6Mk/R8CBRTe6q5c.jpg"
                    alt="The Model City tee"
                    width={140}
                    height={140}
                    className="rounded mb-2 mx-auto"
                  />
                  <span className="text-xs text-ll-text-light">The Model City</span>
                </a>
              </div>
              <div className="text-center">
                <a
                  href="https://matt-headley-shop.fourthwall.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-ll-primary border border-ll-primary px-5 py-2.5 hover:bg-ll-primary hover:text-white transition-colors"
                >
                  The store →
                </a>
              </div>
          </div>

          <hr className="my-10 border-ll-dark/10" />

          <p className="mb-6">
            Rather give directly? A monthly contribution keeps the work going. Cancel any time.
          </p>

          <div className="not-prose">
            <StripePricingTable />
          </div>

          <div className="not-prose mt-8">
            {process.env.NEXT_PUBLIC_STRIPE_SUPPORT_URL && (
              <>
                <p className="text-sm text-ll-text-light mb-3">Or a one-time gift — no account needed.</p>
                <a
                  href={process.env.NEXT_PUBLIC_STRIPE_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-support inline-block px-7 py-3 bg-ll-primary font-bold text-sm rounded-md hover:bg-ll-primary-dark"
                >
                  Give a one-time gift →
                </a>
              </>
            )}
          </div>

          <hr className="my-10 border-ll-dark/10" />

          <p className="text-sm text-ll-text-light">
            Questions?{" "}
            <a
              href="mailto:matt@headleyweb.com"
              className="text-ll-primary underline underline-offset-3 hover:text-ll-primary-dark transition-colors"
            >
              matt@headleyweb.com
            </a>
          </p>
        </div>
      </section>

      <SubscribeCTA variant="section" />
    </main>
  );
}
