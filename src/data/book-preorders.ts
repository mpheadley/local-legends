// Book preorder / support products — server-authoritative pricing (never trust client price).
// Consumed by: /api/books/preorder (checkout), BookPreorder.tsx (UI), /books/<slug> pages.
// NOTE: per Matt's override of the one-presell rule, preorder + Founding Patron tiers are live.
// Tend: Before the Wedding remains the primary presell; these are forthcoming-with-preorder.

export type TierId = "preorder" | "founding" | "support";

export interface BookTier {
  id: TierId;
  label: string;
  price: number;        // USD
  desc: string;
}

export interface BookProduct {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;        // /images path
  blurb: string;
  status: "forthcoming";
  signupSource: string; // Resend source tag for notify signups
  tiers: BookTier[];
}

export const BOOK_PREORDERS: Record<string, BookProduct> = {
  "company-of-farmers": {
    slug: "company-of-farmers",
    title: "Company of Farmers",
    subtitle: "The people who taught me to love the land — and the farm I dreamed, built, and did not keep.",
    cover: "/images/journal/chickens-pasture.webp",
    blurb:
      "A memoir and manifesto in the company of Wendell Berry, Joel Salatin, Justin Rhodes, Noah Sanders, and the Crosbys of Indigo Ridge. Half portrait, half confession. Each chapter is a farmer; each farmer is a mirror.",
    status: "forthcoming",
    signupSource: "book-company-of-farmers",
    tiers: [
      { id: "preorder", label: "Preorder — Signed First Edition", price: 22, desc: "Signed first edition, shipped on release. Your name in the acknowledgments' reader list." },
      { id: "founding", label: "Founding Patron", price: 75, desc: "Signed first edition + name printed in the book as a Founding Patron + the chapters emailed as they're written + a handwritten note." },
      { id: "support", label: "Buy Matt a Bag of Seed", price: 10, desc: "A one-time gift toward the writing. No book owed — just thanks. (You'll still get the chapters by email.)" },
    ],
  },
  "the-back-forty": {
    slug: "the-back-forty",
    title: "I Was Outside",
    subtitle: "Dispatches on dirt, chickens, and the people who perform them — from a man who farmed for real and lost the farm anyway.",
    cover: "/images/books/back-forty-cover.png",
    blurb:
      "The agrarian satire collection — a loyal skeptic's field guide to the homesteading-influencer complex, from a man who farmed for real and lost the farm anyway.",
    status: "forthcoming",
    signupSource: "book-the-back-forty",
    tiers: [
      { id: "preorder", label: "Preorder — Signed First Edition", price: 20, desc: "Signed first edition, shipped on release." },
      { id: "founding", label: "Founding Patron", price: 60, desc: "Signed first edition + name in the book + early chapters by email." },
      { id: "support", label: "Buy Matt a Bag of Seed", price: 10, desc: "A one-time gift toward the writing. No book owed — just thanks." },
    ],
  },
};

export function getBook(slug: string): BookProduct | undefined {
  return BOOK_PREORDERS[slug];
}

export function getTier(slug: string, tierId: string): BookTier | undefined {
  return BOOK_PREORDERS[slug]?.tiers.find((t) => t.id === tierId);
}
