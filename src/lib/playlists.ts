/**
 * YouTube playlist config for Southern Legends pages.
 * Each key is a slug (city, essay, profile, or category).
 *
 * playlistId: the part after ?list= in a YouTube URL (real IDs are ~18–34 chars, e.g. PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf)
 * videoId: optional — sets the thumbnail and starting video (11 chars, e.g. gHePXlmAOOo)
 *
 * SAFETY: getPlaylist() only returns an entry once it has a REAL id (see isReady()).
 * Placeholder ids like "PLanniston" render NOTHING — never a broken embed.
 * Fill in real ids progressively; the page starts showing the player the moment one is real.
 */

export interface PlaylistConfig {
  playlistId: string;
  videoId?: string;
  title: string;
  caption?: string;
}

// A real YouTube playlist id is >= 13 chars; a real video id is exactly 11.
function isReady(pl: PlaylistConfig): boolean {
  const realPlaylist = !!pl.playlistId && pl.playlistId.length >= 13;
  const realVideo = !!pl.videoId && pl.videoId.length === 11;
  return realPlaylist || realVideo;
}

const playlists: Record<string, PlaylistConfig> = {
  // ── ESSAYS ──────────────────────────────────────────────────
  "redbird-willow-farm": {
    playlistId: "PLRBWFarm", // TODO: replace with real RBWFarm playlist id
    videoId: "gHePXlmAOOo", // WVTM13 news segment — real id (renders now)
    title: "Redbird Willow Farm — on camera",
    caption: "News coverage and farm videos from Redbird Willow Farm, Anniston, AL.",
  },

  // ── CITIES ── (search YouTube "[city] Alabama"; drop the real list= id here) ──
  anniston: {
    playlistId: "PLanniston", // TODO real id
    title: "Anniston, Alabama — on film",
    caption: "Local videos, events, and stories from Anniston.",
  },
  oxford: {
    playlistId: "PLoxford", // TODO real id
    title: "Oxford, Alabama — on film",
  },
  jacksonville: {
    playlistId: "PLjacksonville", // TODO real id
    title: "Jacksonville, Alabama — on film",
  },
  gadsden: {
    playlistId: "PLgadsden", // TODO real id
    title: "Gadsden, Alabama — on film",
  },
  talladega: {
    playlistId: "PLtalladega", // TODO real id
    title: "Talladega, Alabama — on film",
  },

  // ── CATEGORIES ──────────────────────────────────────────────
  music: {
    playlistId: "PLmusic", // TODO real id
    title: "NE Alabama Music — live sessions & stories",
  },
  arts: {
    playlistId: "PLarts", // TODO real id
    title: "Arts & Culture in Northeast Alabama",
  },
  faith: {
    playlistId: "PLfaith", // TODO real id
    title: "Faith & Community in the Alabama Foothills",
  },
  food: {
    playlistId: "PLfood", // TODO real id
    title: "Southern Food & Farm — Northeast Alabama",
  },
};

/** Returns the config only if it has a real, renderable id. Placeholders → null. */
export function getPlaylist(slug: string): PlaylistConfig | null {
  const pl = playlists[slug];
  if (!pl) return null;
  return isReady(pl) ? pl : null;
}

/** True only if a real, renderable playlist exists for the slug. */
export function hasPlaylist(slug: string): boolean {
  return getPlaylist(slug) !== null;
}
