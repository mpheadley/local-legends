"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

export interface CarouselSlide {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoCarouselProps {
  slides: CarouselSlide[];
  title?: string;
}

export default function PhotoCarousel({ slides, title }: PhotoCarouselProps) {
  const [idx, setIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const goTo = useCallback(
    (n: number) => setIdx(((n % total) + total) % total),
    [total]
  );

  // Calculate translateX to center the active slide
  const getOffset = useCallback(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return 0;
    const slideEls = track.children;
    if (!slideEls[idx]) return 0;
    const slideEl = slideEls[idx] as HTMLElement;
    let sum = 0;
    for (let j = 0; j < idx; j++) {
      sum += (slideEls[j] as HTMLElement).offsetWidth + 12; // 12 = gap
    }
    return (wrap.offsetWidth - slideEl.offsetWidth) / 2 - sum;
  }, [idx]);

  // Apply transform (centers the active slide)
  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${getOffset()}px)`;
  }, [getOffset]);

  useEffect(() => {
    applyTransform();
  }, [idx, applyTransform]);

  // Recalculate on resize
  useEffect(() => {
    function onResize() {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = "none";
      track.style.transform = `translateX(${getOffset()}px)`;
      requestAnimationFrame(() => {
        if (track) track.style.transition = "";
      });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getOffset]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % total), 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  const stopAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const restartAuto = useCallback(() => {
    stopAuto();
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % total), 4000);
  }, [stopAuto, total]);

  // Sync thumbnail scroll
  useEffect(() => {
    const strip = thumbsRef.current;
    if (!strip) return;
    const thumb = strip.children[idx] as HTMLElement | undefined;
    if (thumb) {
      const offset =
        thumb.offsetLeft - (strip.offsetWidth - thumb.offsetWidth) / 2;
      strip.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [idx]);

  // Keyboard — carousel nav + lightbox close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIdx !== null) {
        if (e.key === "Escape") { setLightboxIdx(null); return; }
        if (e.key === "ArrowLeft") { setLightboxIdx(((lightboxIdx - 1) + total) % total); return; }
        if (e.key === "ArrowRight") { setLightboxIdx((lightboxIdx + 1) % total); return; }
        return;
      }
      if (e.key === "ArrowLeft") { stopAuto(); goTo(idx - 1); restartAuto(); }
      if (e.key === "ArrowRight") { stopAuto(); goTo(idx + 1); restartAuto(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, lightboxIdx, total, goTo, stopAuto, restartAuto]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  return (
    <div className="my-12">
      {title && (
        <h3
          className="text-xl md:text-2xl font-bold mb-6 text-center"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
      )}

      {/* Main stage */}
      <div
        ref={wrapRef}
        className="carousel-wrap"
        onMouseEnter={stopAuto}
        onMouseLeave={restartAuto}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(dx) > 40) {
            stopAuto();
            dx < 0 ? goTo(idx + 1) : goTo(idx - 1);
            restartAuto();
          }
        }}
      >
        {/* Slide track */}
        <div ref={trackRef} className="carousel-track">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`carousel-slide ${i === idx ? "active" : ""}`}
              onClick={() => {
                if (i === idx) {
                  setLightboxIdx(i);
                } else {
                  stopAuto();
                  goTo(i);
                  restartAuto();
                }
              }}
              style={i === idx ? { cursor: "zoom-in" } : {}}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={i === idx ? "eager" : "lazy"}
                fetchPriority={i === idx ? "high" : "auto"}
                decoding="async"
                onLoad={() => {
                  // Re-center once real dimensions are known (fixes first-paint mis-center)
                  if (i === idx) applyTransform();
                }}
                className="carousel-slide-img"
              />
              {slide.caption && (
                <div className="carousel-caption">{slide.caption}</div>
              )}
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          className="carousel-btn carousel-prev"
          aria-label="Previous photo"
          onClick={() => {
            stopAuto();
            goTo(idx - 1);
            restartAuto();
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="carousel-btn carousel-next"
          aria-label="Next photo"
          onClick={() => {
            stopAuto();
            goTo(idx + 1);
            restartAuto();
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Counter */}
        <div className="carousel-counter">
          {idx + 1} / {total}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="carousel-thumbs-wrap">
        <button
          className="carousel-thumb-btn"
          aria-label="Scroll thumbnails left"
          onClick={() =>
            thumbsRef.current?.scrollBy({ left: -195, behavior: "smooth" })
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div ref={thumbsRef} className="carousel-thumbs">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              className={`carousel-thumb ${i === idx ? "active" : ""}`}
              onClick={() => {
                stopAuto();
                goTo(i);
                restartAuto();
              }}
              aria-label={`Go to photo ${i + 1}`}
            >
              <Image
                src={slide.src}
                alt=""
                width={120}
                height={90}
                className="carousel-thumb-img"
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <button
          className="carousel-thumb-btn"
          aria-label="Scroll thumbnails right"
          onClick={() =>
            thumbsRef.current?.scrollBy({ left: 195, behavior: "smooth" })
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxIdx(null)}
          aria-modal="true"
          role="dialog"
        >
          {/* Close */}
          <button
            className="lightbox-close"
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(((lightboxIdx - 1) + total) % total); }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image */}
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img
              src={slides[lightboxIdx].src}
              alt={slides[lightboxIdx].alt}
              className="lightbox-img"
            />
            {slides[lightboxIdx].caption && (
              <p className="lightbox-caption">{slides[lightboxIdx].caption}</p>
            )}
            <p className="lightbox-counter">{lightboxIdx + 1} / {total}</p>
          </div>

          {/* Next */}
          <button
            className="lightbox-nav lightbox-next"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % total); }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
