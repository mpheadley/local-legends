"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Stories", href: "/profiles" },
    { label: "Places", href: "/places" },
    { label: "Essays", href: "/essays" },
    { label: "Books", href: "/books" },
    { label: "About", href: "/about" },
  ];
  const moreLinks = [
    { label: "Guides", href: "/listicles" },
    { label: "Arts", href: "/arts" },
    { label: "The Land", href: "/land" },
  ];
  const allLinks = [...navLinks, ...moreLinks];
  const supportLink = { label: "Support", href: "/support" };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-ll-dark/95 backdrop-blur-sm ${
          scrolled ? "shadow-lg py-2" : "py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-6">
          {/* Wordmark */}
          <Link href="/" className="shrink-0">
            <span
              className="font-bold text-xl tracking-tight text-white uppercase tracking-[0.08em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Southern Legends
            </span>
          </Link>

          {/* Nav links — left-aligned after wordmark */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* More — groups the secondary sections */}
            <div className="relative group">
              <button
                className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60 group-hover:text-white transition-colors duration-200 flex items-center gap-1"
                aria-haspopup="true"
              >
                More
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <div className="bg-ll-dark border border-white/10 rounded shadow-lg py-2 min-w-[9rem]">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Spacer */}
          <div className="hidden md:block flex-1" />

          {/* Support button — right side, desktop */}
          <Link
            href={supportLink.href}
            className="hidden md:inline-block px-4 py-1.5 bg-ll-primary text-white text-xs font-semibold uppercase tracking-[0.15em] rounded hover:bg-ll-primary-dark transition-colors"
          >
            {supportLink.label}
          </Link>

          {/* Search icon — right side */}
          <Link
            href="/search"
            className="hidden md:flex text-white/50 hover:text-white transition-colors"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>

          {/* RSS icon — right side */}
          <a
            href="/profiles/feed.xml"
            className="hidden md:flex text-white/50 hover:text-white transition-colors"
            aria-label="RSS Feed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795 0 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.742-7.115-15.793-15.839-15.82zm0-8.18v4.819c12.951.115 23.363 10.627 23.478 23.625h.022v-4.819h-.022c-.115-13.262-10.873-23.861-23.478-23.625z" />
            </svg>
          </a>

          {/* Mobile hamburger */}
          <div className="flex-1 md:hidden" />
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ll-dark/98 flex flex-col items-center justify-center transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="absolute top-5 right-6 text-white p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <nav className="flex flex-col items-center gap-8">
          {allLinks.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-2xl font-semibold transition-colors ${
                  isActive
                    ? "text-ll-accent"
                    : "text-white hover:text-ll-accent"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/search"
            className="text-2xl font-semibold text-white hover:text-ll-accent transition-colors flex items-center gap-2"
            style={{ fontFamily: "var(--font-heading)" }}
            onClick={() => setMobileOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search
          </Link>
          <Link
            href={supportLink.href}
            className="px-6 py-2 bg-ll-primary text-white text-xl font-semibold rounded hover:bg-ll-primary-dark transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
            onClick={() => setMobileOpen(false)}
          >
            {supportLink.label}
          </Link>
        </nav>
      </div>
    </>
  );
}
