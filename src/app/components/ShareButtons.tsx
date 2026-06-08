"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  podcastUrls?: {
    spotify?: string;
    apple?: string;
    youtube?: string;
  };
}

export default function ShareButtons({ url, title, description, podcastUrls }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCanNativeShare("share" in navigator);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fullUrl = `${siteConfig.url}${url}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${fullUrl}`)}`;

  async function nativeShare() {
    try {
      await navigator.share({ title, text: description, url: fullUrl });
    } catch {
      // User cancelled or share failed — do nothing
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  }

  if (canNativeShare) {
    return (
      <div className="share-buttons flex items-center gap-3">
        <button
          onClick={nativeShare}
          className="inline-flex items-center gap-2 px-5 py-2 border border-white/25 rounded text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          aria-label="Share this story"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share this story
        </button>
      </div>
    );
  }

  return (
    <div className="share-buttons flex items-center gap-3 flex-wrap">

      {/* Facebook */}
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on Facebook">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* Email */}
      <a href={emailUrl} className="share-btn" aria-label="Share via email">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>

      {/* Podcast platforms */}
      {podcastUrls?.spotify && (
        <a href={podcastUrls.spotify} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Listen on Spotify">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </a>
      )}
      {podcastUrls?.apple && (
        <a href={podcastUrls.apple} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Listen on Apple Podcasts">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c2.071 0 3.938.8 5.324 2.1a7.456 7.456 0 0 1 2.176 5.303c0 1.758-.61 3.373-1.622 4.645a7.435 7.435 0 0 1-1.757 1.654c.044-.225.069-.457.069-.695 0-1.99-1.614-3.604-3.604-3.604s-3.604 1.614-3.604 3.604c0 .238.025.47.069.695a7.435 7.435 0 0 1-1.757-1.654A7.43 7.43 0 0 1 5.5 11.903c0-2.07.84-3.945 2.199-5.315A7.458 7.458 0 0 1 12 4.5zm0 2.625a4.778 4.778 0 1 0 0 9.557 4.778 4.778 0 0 0 0-9.557zm0 1.875a2.903 2.903 0 1 1 0 5.807 2.903 2.903 0 0 1 0-5.807z"/>
          </svg>
        </a>
      )}
      {podcastUrls?.youtube && (
        <a href={podcastUrls.youtube} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Watch on YouTube">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
          </svg>
        </a>
      )}

      {/* Copy link */}
      <button onClick={copyLink} className="share-btn" aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>
    </div>
  );
}
