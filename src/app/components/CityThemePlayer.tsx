"use client"

import AudioPlayer from "./AudioPlayer"

/** Maps city slug → audio file under /public/audio/cities/.
 *  Drop the Suno .mp3 into public/audio/cities/ and add the slug here. */
const CITY_THEMES: Record<string, { file: string; caption: string }> = {
  anniston: {
    file: "/audio/cities/anniston-theme.mp3",
    caption: "Anniston — original composition · Southern Legends",
  },
}

interface Props {
  citySlug: string
}

export default function CityThemePlayer({ citySlug }: Props) {
  const theme = CITY_THEMES[citySlug]
  if (!theme) return null
  return (
    <AudioPlayer
      src={theme.file}
      title={`${citySlug.charAt(0).toUpperCase() + citySlug.slice(1)} Theme`}
      caption={theme.caption}
    />
  )
}
