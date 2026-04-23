import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/profiles";

export const runtime = "edge";
export const alt = "Southern Legends profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BASE_URL = "https://southernlegends.blog";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);

  const [frauncesSemiBold, sourceSans] = await Promise.all([
    fetch(new URL("../../fonts/Fraunces-SemiBold.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
    fetch(new URL("../../fonts/SourceSans3-Regular.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
  ]);

  const fonts = [
    { name: "Fraunces", data: frauncesSemiBold, style: "normal" as const, weight: 600 as const },
    { name: "Source Sans 3", data: sourceSans, style: "normal" as const, weight: 400 as const },
  ];

  if (!profile || profile.frontmatter.aiWritten) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#292524",
            color: "#FAFAF7",
            fontSize: 48,
            fontFamily: "Fraunces",
          }}
        >
          Southern Legends
        </div>
      ),
      { ...size, fonts }
    );
  }

  const { title, name, location, heroImage } = profile.frontmatter;
  const ogPosition = profile.frontmatter.ogPosition ?? 0.35;
  const heroUrl = heroImage ? `${BASE_URL}${heroImage}` : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#292524",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Image fills right 55% */}
        {heroUrl && (
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 0,
              right: 0,
              width: "55%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <img
              src={heroUrl}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: `center ${(ogPosition * 100).toFixed(0)}%`,
              }}
            />
            {/* Fade left edge of image into the dark panel */}
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: 0,
                left: 0,
                width: "40%",
                height: "100%",
                background: "linear-gradient(to right, #292524, transparent)",
              }}
            />
          </div>
        )}

        {/* Dark left panel — title lives here */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "52%",
            height: "100%",
            padding: "60px 56px",
          }}
        >
          {/* Site name */}
          <span
            style={{
              fontFamily: "Fraunces",
              fontSize: 22,
              fontWeight: 600,
              color: "#FAFAF7",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              opacity: 0.7,
              marginBottom: 32,
            }}
          >
            Southern Legends
          </span>

          {/* Gold rule */}
          <div
            style={{
              display: "flex",
              width: 60,
              height: 3,
              backgroundColor: "#CA8A04",
              marginBottom: 28,
            }}
          />

          {/* Profile title */}
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: title.length > 30 ? 60 : title.length > 20 ? 72 : 80,
              fontWeight: 600,
              color: "#FAFAF7",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {title}
          </div>

          {/* Name */}
          {name && name !== title && (
            <div
              style={{
                display: "flex",
                fontFamily: "Source Sans 3",
                fontSize: 28,
                fontWeight: 400,
                color: "#CA8A04",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
              }}
            >
              {name}
            </div>
          )}

          {/* Location — bottom of panel */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 48,
              left: 56,
              fontFamily: "Source Sans 3",
              fontSize: 20,
              color: "#FAFAF7",
              opacity: 0.5,
            }}
          >
            By Matt Headley · {location}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
