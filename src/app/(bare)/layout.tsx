import type { Metadata } from "next";
import { Source_Sans_3, Fraunces } from "next/font/google";
import "../globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {};

export default function BareLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans.variable} ${fraunces.variable} antialiased`}
        style={{ margin: 0, padding: 0, background: "#1C1917" }}
      >
        {children}
      </body>
    </html>
  );
}
