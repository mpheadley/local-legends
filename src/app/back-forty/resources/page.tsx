import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources — The Back Forty | Southern Legends",
  description:
    "Books, tools, and gear from a flower farmer in Northeast Alabama. Real recommendations, not a catalog. Affiliate links help keep the lights on.",
  alternates: { canonical: "/back-forty/resources" },
  openGraph: { url: "/back-forty/resources" },
};

type Resource = {
  title: string;
  author?: string;
  description: string;
  url: string;
  tag?: string;
};

type Category = {
  id: string;
  heading: string;
  intro: string;
  items: Resource[];
};

// Replace YOUR_TAG with your actual Amazon Associates tag
const TAG = "YOUR_TAG-20";

function amz(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${TAG}`;
}

const CATEGORIES: Category[] = [
  {
    id: "books",
    heading: "What I'm Reading",
    intro:
      "These are the books that changed how I think about land, food, and the people who work it. Not assigned reading. Not a syllabus. Just what I actually keep on the shelf.",
    items: [
      {
        title: "You Can Farm",
        author: "Joel Salatin",
        description:
          "The book that convinced a generation of people they could do this. Salatin is wrong about some things and right about more. Start here.",
        url: amz("0963810928"),
      },
      {
        title: "The Unsettling of America",
        author: "Wendell Berry",
        description:
          "Written in 1977. Still the clearest diagnosis of what industrialized agriculture cost us — and what it cost the people who gave it up.",
        url: amz("1619020084"),
      },
      {
        title: "Braiding Sweetgrass",
        author: "Robin Wall Kimmerer",
        description:
          "A botanist and member of the Citizen Potawatomi Nation on what plants know and what we've forgotten about reciprocity. Read slowly.",
        url: amz("1571313567"),
      },
      {
        title: "The Contrary Farmer",
        author: "Gene Logsdon",
        description:
          "Logsdon was the agrarian version of a man who stayed. Small scale, Midwestern, honest about failure. The antidote to homestead influencers.",
        url: amz("1603584110"),
      },
      {
        title: "Animal, Vegetable, Miracle",
        author: "Barbara Kingsolver",
        description:
          "A novelist moves her family to a farm in Virginia and writes about what it actually cost. The best food memoir I've read.",
        url: amz("0060852569"),
      },
      {
        title: "Floret Farm's Cut Flower Garden",
        author: "Erin Benzakein",
        description:
          "If you're growing flowers to sell — or just growing flowers — this is the standard reference. Heather and I both use it.",
        url: amz("1452145814"),
      },
      {
        title: "Four-Season Harvest",
        author: "Eliot Coleman",
        description:
          "Coleman grows food in Maine year-round without a heated greenhouse. Everything we assumed about growing seasons is wrong.",
        url: amz("1890132276"),
      },
      {
        title: "Teaming with Microbes",
        author: "Jeff Lowenfels & Wayne Lewis",
        description:
          "The science underneath everything else. Once you understand the soil food web, you stop treating soil like a medium and start treating it like a community.",
        url: amz("1604692170"),
      },
    ],
  },
  {
    id: "farm",
    heading: "On the Farm",
    intro:
      "Things I use, have used, or wish I'd bought sooner. We grow cut flowers on a small scale in Northeast Alabama. This list reflects that — not a 500-acre operation.",
    items: [
      {
        title: "Hoss Wheel Hoe",
        description:
          "The single best cultivation tool we own. Faster than hand-weeding, precise enough for tight rows. Worth every dollar.",
        url: "https://www.hosstools.com/product/wheel-hoe/",
        tag: "Not Amazon — buy direct from Hoss Tools",
      },
      {
        title: "Quick Cut Greens Harvester",
        description:
          "If you're growing salad greens or microgreens at any scale, this tool pays for itself in the first season.",
        url: amz("B00M62MFQM"),
      },
      {
        title: "Johnny's Selected Seeds Catalog",
        description:
          "Not an affiliate link. Just the best seed catalog. Order the print version once and you'll understand.",
        url: "https://www.johnnyseeds.com",
        tag: "No affiliate — just the best source",
      },
      {
        title: "Floret's Specialty Cut Flower Seeds",
        description:
          "The lisianthus, ranunculus, and anemone seeds that make people stop at the booth. High germination, worth the price.",
        url: amz("B08ZRLJ2GD"),
      },
      {
        title: "T-Post Pounder",
        description:
          "If you're fencing anything — gardens, animals, perimeter — a quality T-post driver saves your shoulders. Get the heavy one.",
        url: amz("B000BLZDCU"),
      },
    ],
  },
  {
    id: "kitchen",
    heading: "In the Kitchen",
    intro:
      "Growing food means learning to keep it. These are the books and tools that made preservation feel less like labor and more like the point.",
    items: [
      {
        title: "The Art of Fermentation",
        author: "Sandor Katz",
        description:
          "The complete reference for everything fermented. Not a recipe book — a philosophy. Katz changed how a lot of people think about food and time.",
        url: amz("160358286X"),
      },
      {
        title: "Ball Complete Book of Home Preserving",
        description:
          "The canning standard. If you're going to preserve food, get this first. Tested recipes, real safety guidance.",
        url: amz("0778801314"),
      },
      {
        title: "Nourishing Traditions",
        author: "Sally Fallon",
        description:
          "Controversial in some circles, foundational in others. Whatever you think of the WAP approach, the fermentation and broth sections alone are worth the price.",
        url: amz("0967089735"),
      },
      {
        title: "Weck Tulip Jar (Set of 6)",
        description:
          "Better than Mason jars for most things. German glass, rubber seal, no two-part lid to rust. Once you switch you don't go back.",
        url: amz("B00HTKSQC6"),
      },
    ],
  },
  {
    id: "faith-land",
    heading: "Faith & Land",
    intro:
      "The overlap between agrarian life and contemplative practice is older than either word. These books take it seriously.",
    items: [
      {
        title: "The One-Straw Revolution",
        author: "Masanobu Fukuoka",
        description:
          "A Japanese farmer who spent decades doing less and watching more. Part farming manual, part Zen text. One of the strangest and most useful books I've read.",
        url: amz("1590173139"),
      },
      {
        title: "Bringing It to the Table",
        author: "Wendell Berry",
        description:
          "Berry's essays on farming and food, collected. Shorter pieces, easier entry point than The Unsettling. Start here if you haven't read him.",
        url: amz("1593762941"),
      },
      {
        title: "The Sabbath",
        author: "Abraham Joshua Heschel",
        description:
          "The best short book on rest I've read. Thin enough to finish in an afternoon. Stays with you longer than most books three times the length.",
        url: amz("0374529752"),
      },
      {
        title: "Restoration Agriculture",
        author: "Mark Shepard",
        description:
          "Shepard runs a 100-acre permaculture farm in Wisconsin. Makes the case that perennial polyculture is both ecologically sound and economically viable.",
        url: amz("1601730365"),
      },
    ],
  },
];

export default function BackFortyResourcesPage() {
  return (
    <main style={{ backgroundColor: "var(--color-ll-warm)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "var(--color-ll-dark)",
          color: "var(--color-ll-light)",
          padding: "4rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-ll-accent)",
              marginBottom: "0.75rem",
              fontFamily: "var(--font-body)",
            }}
          >
            <Link href="/back-forty" style={{ color: "inherit", textDecoration: "none" }}>
              The Back Forty
            </Link>
            {" / "} Resources
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "1rem",
              color: "var(--color-ll-light)",
            }}
          >
            What I Actually Use
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "#C8C4BC",
              lineHeight: 1.7,
              maxWidth: "36rem",
            }}
          >
            Books, tools, and gear from a flower farmer in Northeast Alabama. I only put things
            here I've read, used, or given away as gifts. If I link to something on Amazon, I
            get a small cut at no extra cost to you.
          </p>

          {/* Affiliate disclosure */}
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.75rem",
              color: "#8A8580",
              fontFamily: "var(--font-body)",
              borderTop: "1px solid #2E2B27",
              paddingTop: "1rem",
            }}
          >
            <strong style={{ color: "#9A8F84" }}>Disclosure:</strong> Some links below are
            Amazon affiliate links. I earn a small commission if you buy through them. I don't
            recommend things I don't use, and I don't get paid to say nice things about anything.
          </p>
        </div>
      </div>

      {/* Category nav */}
      <div
        style={{
          backgroundColor: "#2A2722",
          padding: "0.75rem 1.5rem",
          borderBottom: "1px solid #3A3530",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "42rem",
            margin: "0 auto",
            display: "flex",
            gap: "1.5rem",
            whiteSpace: "nowrap",
          }}
        >
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--color-ll-accent)",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {cat.heading}
            </a>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
        {CATEGORIES.map((cat, i) => (
          <section
            key={cat.id}
            id={cat.id}
            style={{ marginBottom: i < CATEGORIES.length - 1 ? "4rem" : 0 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "var(--color-ll-dark)",
                marginBottom: "0.5rem",
              }}
            >
              {cat.heading}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "var(--color-ll-text-light)",
                lineHeight: 1.65,
                marginBottom: "1.75rem",
                borderLeft: "3px solid var(--color-ll-accent)",
                paddingLeft: "1rem",
              }}
            >
              {cat.intro}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cat.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid var(--color-ll-border)",
                      borderRadius: "6px",
                      padding: "1.25rem 1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "1rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.05rem",
                            fontWeight: 700,
                            color: "var(--color-ll-dark)",
                            marginBottom: item.author ? "0.1rem" : "0.4rem",
                          }}
                        >
                          {item.title}
                        </p>
                        {item.author && (
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.8rem",
                              color: "var(--color-ll-accent-dark)",
                              marginBottom: "0.4rem",
                              fontStyle: "italic",
                            }}
                          >
                            {item.author}
                          </p>
                        )}
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.9rem",
                            color: "var(--color-ll-text)",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description}
                        </p>
                        {item.tag && (
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.72rem",
                              color: "var(--color-ll-text-light)",
                              marginTop: "0.4rem",
                              fontStyle: "italic",
                            }}
                          >
                            {item.tag}
                          </p>
                        )}
                      </div>
                      <span
                        style={{
                          flexShrink: 0,
                          fontSize: "0.75rem",
                          color: "var(--color-ll-primary)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          paddingTop: "0.2rem",
                        }}
                      >
                        View →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}

        {/* Footer note */}
        <div
          style={{
            marginTop: "4rem",
            padding: "1.5rem",
            backgroundColor: "#F5F2ED",
            border: "1px solid var(--color-ll-border)",
            borderRadius: "6px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "var(--color-ll-text-light)",
              lineHeight: 1.65,
            }}
          >
            I update this list when something earns a permanent place on the shelf — or gets
            thrown across the barn. If something on here changed your mind about anything, I'd
            genuinely like to know.{" "}
            <Link
              href="/subscribe"
              style={{ color: "var(--color-ll-primary)", textDecoration: "none" }}
            >
              The newsletter
            </Link>{" "}
            is where I write about this stuff in more depth.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "#9A9590",
              marginTop: "0.75rem",
            }}
          >
            — Matt Headley, flower farmer, Northeast Alabama
          </p>
        </div>
      </div>
    </main>
  );
}
