import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everyone Has Opinions About Your Wedding — Southern Legends",
  description: "A satirical picture book for grown-ups. In the style of Dr. Seuss. About weddings.",
  alternates: { canonical: "/books/opinions" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
