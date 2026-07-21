/**
 * Spotify playlist IDs for SL pages.
 * Run tools/spotify-playlists.py to create playlists, then paste IDs here.
 * Format: extract from URL → open.spotify.com/playlist/PASTE_THIS_PART
 */

export const SPOTIFY_PLAYLISTS: Record<string, string> = {
  // Main SL playlist — shown on all city + essay pages
  "southern-legends": "",          // "Mud on the Boots — Southern Legends"

  // City-specific (optional — leave blank to fall back to main SL playlist)
  "anniston":    "",
  "oxford":      "",
  "jacksonville": "",
  "gadsden":     "",
  "talladega":   "",

  // Content-type playlists
  "memoir":   "",                  // "What I Carried — Memoir"
  "gothic":   "",                  // "Dark Nave — Gothic Art & Commentary"
}

/** Returns the best playlist ID for a given city slug or content tag. Falls back to main SL list. */
export function getPlaylistId(key: string): string {
  return SPOTIFY_PLAYLISTS[key] || SPOTIFY_PLAYLISTS["southern-legends"] || ""
}
