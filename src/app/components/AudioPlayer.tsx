"use client";

import { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
  caption?: string;
}

export default function AudioPlayer({ src, title, caption }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(duration > 0 ? (audio.currentTime / duration) * 100 : 0);
    };
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [duration]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg px-5 py-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4">
        {/* Play/pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-ll-primary text-white flex items-center justify-center hover:bg-ll-primary-dark transition-colors"
        >
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4 translate-x-px" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-xs font-medium text-ll-text-light uppercase tracking-wide mb-1.5 truncate">
              {title}
            </p>
          )}

          {/* Scrubber */}
          <div
            className="relative h-1.5 bg-ll-border rounded-full cursor-pointer"
            onClick={seek}
          >
            <div
              className="absolute inset-y-0 left-0 bg-ll-primary rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Times */}
          <div className="flex justify-between mt-1.5 text-xs text-ll-text-light tabular-nums">
            <span>{fmt(currentTime)}</span>
            <span>{duration ? fmt(duration) : "—"}</span>
          </div>
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs italic text-ll-text-light text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
