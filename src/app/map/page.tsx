import type { Metadata } from "next";
import GlobeMap from "./GlobeMap";
import { getMapData } from "@/lib/map-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The Map — Southern Legends",
  description:
    "Every story, business, essay, and trail across Northeast Alabama, on an interactive globe and map. Who and what stayed.",
};

export default async function MapPage() {
  const { markers, trails } = await getMapData();
  return <GlobeMap markers={markers} trails={trails} />;
}
