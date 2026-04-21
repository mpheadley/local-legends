"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const update = () => {
      const { top, height } = article.getBoundingClientRect();
      const total = height - window.innerHeight;
      const scrolled = Math.max(0, -top);
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[4px] bg-ll-accent"
      style={{ width: `${progress}%`, transition: "width 80ms linear", boxShadow: "0 0 6px rgba(202,138,4,0.7)" }}
      aria-hidden="true"
    />
  );
}
