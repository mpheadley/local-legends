/**
 * FacebookEmbed — renders a public Facebook post via the official plugins/post.php iframe.
 *
 * Usage in MDX:
 *   <FacebookEmbed href="https://www.facebook.com/951TheMountain/posts/pfbid0..." />
 *
 * Pass the canonical post URL as `href`. No FB SDK/script required — the plugin
 * iframe is self-contained and responsive to the max width below.
 */
type FacebookEmbedProps = {
  href: string;
  /** Max render width in px (FB caps at 500 for post plugin). Default 500. */
  width?: number;
  caption?: string;
};

export default function FacebookEmbed({ href, width = 500, caption }: FacebookEmbedProps) {
  const src =
    "https://www.facebook.com/plugins/post.php?href=" +
    encodeURIComponent(href) +
    `&show_text=true&width=${width}`;

  return (
    <figure className="my-10 flex flex-col items-center">
      <div
        className="w-full overflow-hidden rounded-lg border border-ll-border bg-white"
        style={{ maxWidth: width }}
      >
        <iframe
          src={src}
          width={width}
          height={620}
          style={{ border: "none", overflow: "hidden", width: "100%" }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook post"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-ll-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
