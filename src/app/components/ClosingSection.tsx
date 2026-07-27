import Image from "next/image";
import Link from "next/link";
import ShareButtons from "./ShareButtons";

interface Product {
  url: string;
  image: string;
  name: string;
}

interface ClosingSectionProps {
  shareUrl: string;
  title: string;
  excerpt?: string;
  primary: Product;
  secondary: Product;
  tertiary?: Product;
  podcastUrls?: { spotify?: string; apple?: string; youtube?: string };
}

export default function ClosingSection({ shareUrl, title, excerpt, primary, secondary, tertiary, podcastUrls }: ClosingSectionProps) {
  return (
    <section className="profile-closing">
      {/* Author credit */}
      <div className="profile-closing-author">
        <Image
          src="/images/about/headshot-hedcut-matt-headley.webp"
          alt="Matt Headley"
          width={128}
          height={128}
          className="rounded-full shrink-0"
          style={{ width: "128px", height: "128px" }}
        />
        <div>
          <p className="profile-closing-bio">
            <Link href="/about" className="profile-closing-name">
              Matt Headley
            </Link>
            {" "}is a former pastor and flower farmer from Northeast Alabama. He is the founder and editor of Southern Legends, the founder of{" "}
            <a href="https://plainspokenblueprint.com" target="_blank" rel="noopener noreferrer" className="profile-closing-link">
              Gather Studio
            </a>
            , a messaging coaching practice for small businesses, and the founder of{" "}
            <a href="https://theaisle.app" target="_blank" rel="noopener noreferrer" className="profile-closing-link">
              The Aisle
            </a>
            , a curated bridal expo series launching in Anniston this October.
          </p>
          <div className="mt-3">
            <Link
              href="/essays"
              className="btn-journal inline-block px-5 py-2 border-2 border-ll-accent font-bold text-sm rounded-md hover:bg-ll-accent transition-colors"
            >
              Matt also writes about his own story →
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="profile-closing-divider" />

      {/* Share + Merch + Support */}
      <div className="profile-closing-share">
        <ShareButtons url={shareUrl} title={title} description={excerpt ?? ""} podcastUrls={podcastUrls} />

        <p className="text-xs text-ll-accent text-center mt-8 mb-2" style={{ letterSpacing: "0.05em" }}>
          Purchases support Southern Legends.
        </p>
        <div className="flex gap-8 justify-center items-start">
          <div className="flex flex-col items-center gap-3">
            <a href={primary.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={primary.image}
                alt={primary.name}
                width={140}
                height={140}
                className="rounded hover:opacity-90 transition-opacity"
              />
            </a>
            <span className="text-xs text-white/60">{primary.name}</span>
            <a
              href={primary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-white border border-white/50 px-4 py-2 hover:bg-white hover:text-ll-dark transition-colors"
            >
              Get the shirt →
            </a>
          </div>
          <div className="flex flex-col items-center gap-3">
            <a href={secondary.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={secondary.image}
                alt={secondary.name}
                width={140}
                height={140}
                className="rounded hover:opacity-90 transition-opacity"
              />
            </a>
            <span className="text-xs text-white/60">{secondary.name}</span>
            <a
              href={secondary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-white border border-white/50 px-4 py-2 hover:bg-white hover:text-ll-dark transition-colors"
            >
              Get the shirt →
            </a>
          </div>
          {tertiary && (
            <div className="flex flex-col items-center gap-3">
              <a href={tertiary.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={tertiary.image}
                  alt={tertiary.name}
                  width={140}
                  height={140}
                  className="rounded hover:opacity-90 transition-opacity"
                />
              </a>
              <span className="text-xs text-white/60">{tertiary.name}</span>
              <a
                href={tertiary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-white border border-white/50 px-4 py-2 hover:bg-white hover:text-ll-dark transition-colors"
              >
                Get the shirt →
              </a>
            </div>
          )}
        </div>

        <a
          href="/support"
          className="btn-support inline-block mt-4 px-7 py-3 bg-ll-primary font-bold text-sm rounded-md hover:bg-ll-primary-dark transition-colors"
        >
          Support this work →
        </a>
      </div>
    </section>
  );
}
