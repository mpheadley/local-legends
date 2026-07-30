// Parks — Southern Legends NE-Alabama slice of the Parks Guide engine.
// Sibling to trails.ts. Same factory pattern the national Parks Guide engine reuses:
// one Park type + a data array + a [slug] render. Honest "complete guide" pages,
// never scraped stubs. MattNote ONLY where Matt has actually been.
//
// HARD CONSTRAINT: this file holds the NE-AL slice ONLY. National/SE parks live on
// the standalone Parks Guide surface (parks.gatherstudio.app), never on SL root.

export type ParkManager = "state" | "national" | "national-preserve" | "city" | "county" | "private"
export type ParkTrailDifficulty = "easy" | "moderate" | "hard" | "strenuous"

export interface ParkTrail {
  name: string
  length: number // miles
  difficulty: ParkTrailDifficulty
  note?: string
}

export interface Park {
  slug: string
  name: string
  shortName: string
  location: string // "Gadsden, Alabama"
  county: string
  region: string
  state: string
  managedBy: ParkManager
  established?: number
  acreage?: number
  elevationFt?: number
  fee: boolean
  feeNote?: string
  hours?: string
  description: string
  history: string
  highlights: string[]
  trailsInPark?: ParkTrail[]
  activities: string[]
  camping?: string
  // Seasonality — the honest "is it worth the drive right now" layer
  seasonality?: {
    fall?: string
    spring?: string
    summer?: string
    winter?: string
  }
  // MattNote — ONLY populate where Matt has genuinely been. Never fabricate.
  mattNote?: string
  website: string
  npsSite?: string
  lat: number
  lng: number
  image?: string // only set to a VERIFIED-on-disk path; otherwise gradient fallback
  // Cross-links (the SL integration + the honest-source moat)
  profileSlug?: string // → SL long-form profile
  trailSlug?: string // → /trails/[slug]
  tags: string[]
}

export const PARKS: Park[] = [
  {
    slug: "cheaha-state-park",
    name: "Cheaha State Park",
    shortName: "Cheaha",
    location: "Delta, Alabama",
    county: "Clay & Cleburne Counties",
    region: "NE Alabama",
    state: "AL",
    managedBy: "state",
    established: 1933,
    acreage: 2799,
    elevationFt: 2407,
    fee: true,
    feeNote: "$2–$5 per person · military free with ID",
    hours: "Day-use 7am–sunset · lodge & restaurant vary by season",
    description:
      "The roof of Alabama. Cheaha sits at 2,407 feet — the highest point in the state — on a spine of ancient Appalachian quartzite in the Talladega National Forest. It is Alabama's oldest continuously operating state park, hand-built by the Civilian Conservation Corps out of local stone between 1933 and 1939. Bunker Tower, the stone cabins, and the lake are all CCC work you can still stand on.",
    history:
      "The CCC broke ground here in 1933 and quarried the mountain to build what's still standing. Bunker Tower crowns the summit; below it, stone cabins and a chalet look out over the valley. The park anchors the Cheaha Wilderness and the Pinhoti Trail, which runs north to connect with the Appalachian Trail in Georgia. Reached by the Talladega Scenic Drive (Highway 281) — a mountain road worth the trip on its own.",
    highlights: [
      "Highest point in Alabama — 2,407 ft, panoramic valley views",
      "Bald Rock boardwalk: 0.3 mi, wheelchair-accessible, to a stone overlook",
      "Pulpit Rock: short, steep, and the best sunset spot on the mountain",
      "CCC stone architecture from the 1930s throughout the park",
      "Cheaha Trailhead of the Pinhoti Trail → connects to the Appalachian Trail",
    ],
    trailsInPark: [
      { name: "Bald Rock Trail", length: 0.3, difficulty: "easy", note: "Accessible boardwalk to the overlook" },
      { name: "Pulpit Rock Trail", length: 1.0, difficulty: "moderate", note: "Short, steep, sunset payoff" },
      { name: "Cave Creek Trail", length: 3.3, difficulty: "strenuous", note: "Real elevation, Cheaha Wilderness" },
      { name: "Mountain Laurel Trail", length: 1.5, difficulty: "moderate", note: "Laurel thickets to the Rock Garden" },
    ],
    activities: ["Hiking", "Camping", "Lodging (stone cabins & chalets)", "Summit restaurant", "Lake swimming", "Scenic driving"],
    camping: "Tent, RV, and improved sites plus historic CCC stone cabins and a chalet. Book through alapark.com.",
    seasonality: {
      fall: "Peak. Late October–early November the ridge turns — best foliage view in the state.",
      spring: "Mountain laurel blooms along the Mountain Laurel Trail; mild and green.",
      summer: "Cooler than the valley by a few degrees; go early, the summit gets crowded midday.",
      winter: "Clear cold days give the longest views; road can ice — check before you drive 281.",
    },
    mattNote:
      "This is my default answer when someone asks where to go. I live about 40 minutes from the gate, and I go back for the quiet — weekday mornings on Pulpit Rock, before the sun's all the way up and before anybody else is there. It's the closest thing NE Alabama has to standing on top of something.",
    website: "https://www.alapark.com/parks/cheaha-state-park",
    lat: 33.4859,
    lng: -85.8089,
    tags: ["state-park", "hiking", "highest-point", "ccc", "clay-county", "cleburne-county", "fall-foliage"],
  },
  {
    slug: "noccalula-falls-park",
    name: "Noccalula Falls Park",
    shortName: "Noccalula Falls",
    location: "Gadsden, Alabama",
    county: "Etowah County",
    region: "NE Alabama",
    state: "AL",
    managedBy: "city",
    established: 1950,
    acreage: 250,
    fee: true,
    feeNote: "Gorge trail & attractions admission at the gate",
    hours: "Daily, seasonal hours — check the city site before you go",
    description:
      "A 90-foot waterfall dropping straight off a ledge into Black Creek gorge in the middle of Gadsden. Around it: 250 acres of gorge trail, caves, a botanical garden, a pioneer village, a mini-train, and a bronze statue of the Cherokee woman the falls are named for, caught mid-leap. It's part real wilderness, part old-Alabama roadside park, and it's been drawing families since 1950.",
    history:
      "Thomas McClung claimed the falls and 40 acres in 1845. A man named Faxon carved his name into the rock wall behind the water in 1859 — it's still there. Someone ran a tavern and dance hall in a cave behind the falls in the late 1800s, then tried to blast it bigger with dynamite; it collapsed. The City of Gadsden finally bought the land and opened the park in 1950. The gorge trail below the falls is the real draw — carvings, overhangs, and the sound of the water filling the whole ravine.",
    highlights: [
      "90-foot waterfall with a walkable gorge trail below it",
      "Faxon's 1859 carving still visible behind the falls",
      "Bronze statue of Noccalula caught mid-leap",
      "Botanical gardens, pioneer village, and the mini-train for families",
      "Best waterfall flow after spring rain — a trickle by late summer",
    ],
    activities: ["Waterfall viewing", "Gorge hiking", "Botanical gardens", "Pioneer village", "Mini-train", "Camping"],
    camping: "Campground on site with RV and tent sites — one of the few in-town waterfall campgrounds in the state.",
    seasonality: {
      fall: "Color along the gorge rim; comfortable hiking weather.",
      spring: "The falls are at full thunder after rain — go in March–April for the real show.",
      summer: "Flow drops to a trickle in a dry August; come for the gardens and shade, not the falls.",
      winter: "Cold snaps can freeze the falls into ice columns — rare, but worth the drive when it happens.",
    },
    mattNote:
      "The day after Thanksgiving in 2008, I got down on one knee near the antique farm equipment at Noccalula, in front of a lit-up nativity scene, and Heather said yes. I've been back more times than I can count since — with her, with the kids, on ordinary afternoons when we just needed somewhere to go. The full story is in the profile.",
    website: "https://www.cityofgadsden.com/1102/Noccalula-Falls-Park",
    lat: 34.0357,
    lng: -86.0083,
    image: "/images/profiles/noccalula-falls/falls-from-gorge.webp",
    profileSlug: "noccalula-falls",
    tags: ["waterfall", "city-park", "gadsden", "etowah-county", "family", "camping", "history"],
  },
  {
    slug: "little-river-canyon",
    name: "Little River Canyon National Preserve",
    shortName: "Little River Canyon",
    location: "Fort Payne, Alabama",
    county: "DeKalb & Cherokee Counties",
    region: "NE Alabama",
    state: "AL",
    managedBy: "national-preserve",
    established: 1992,
    acreage: 15288,
    fee: false,
    feeNote: "Free — no entrance fee",
    hours: "Rim drive and overlooks open daily, sunrise to sunset",
    description:
      "One of the deepest canyon systems east of the Mississippi, cut by the Little River — a river that runs almost its entire length on top of Lookout Mountain. Managed by the National Park Service, the preserve pairs a dramatic 11-mile rim drive with waterfalls, swimming holes, and some genuinely rugged backcountry. Little River Falls at the north end is the easy showpiece; the canyon floor is for people who mean it.",
    history:
      "Congress established the preserve in 1992 to protect the canyon and the free-flowing river above it. The river is unusual — it forms and flows on the mountaintop before dropping into the gorge, which is why the water stays clean and cold. The NPS rim drive (Highway 176) strings together overlooks named Eberhart Point, Grace's High Falls, and Wolf Creek.",
    highlights: [
      "Little River Falls: 45-foot falls, minutes from the parking area",
      "11-mile scenic rim drive (Highway 176) with stacked overlooks",
      "Grace's High Falls — Alabama's tallest, best after rain",
      "Swimming holes and kayaking above the falls in season",
      "NPS-managed — the national-park experience without the national-park crowds",
    ],
    activities: ["Scenic driving", "Waterfall viewing", "Hiking", "Swimming", "Kayaking", "Rock climbing"],
    seasonality: {
      fall: "The canyon walls turn — one of the best foliage drives in the Southeast.",
      spring: "Highest water; Grace's High Falls only really runs after spring rain.",
      summer: "Swimming season above the falls; canyon floor gets hot, start early.",
      winter: "Bare trees open up the long canyon views the summer leaves hide.",
    },
    website: "https://www.nps.gov/liri/index.htm",
    npsSite: "https://www.nps.gov/liri/index.htm",
    lat: 34.3959,
    lng: -85.6217,
    tags: ["national-preserve", "nps", "canyon", "waterfall", "dekalb-county", "fall-foliage", "swimming"],
  },
  {
    slug: "desoto-state-park",
    name: "DeSoto State Park",
    shortName: "DeSoto",
    location: "Fort Payne, Alabama",
    county: "DeKalb County",
    region: "NE Alabama",
    state: "AL",
    managedBy: "state",
    established: 1939,
    acreage: 3502,
    fee: false,
    feeNote: "Free day-use · fees for lodging & camping",
    hours: "Day-use daily, sunrise to sunset",
    description:
      "On top of Lookout Mountain, a few miles up from Little River Canyon, DeSoto is the waterfall park — a green, wet, mossy stretch of the plateau laced with cascades, wildflowers, and CCC-built stone. DeSoto Falls at the north end drops over 100 feet; smaller falls like Laurel and Lodge are strung along the boardwalks and creek trails. It pairs naturally with the canyon: do both in a day.",
    history:
      "Another Civilian Conservation Corps project, developed in the late 1930s on the Lookout Mountain plateau. The park protects a stretch of the West Fork of Little River and dozens of waterfalls and cascades, plus one of the better wildflower displays in the state along its trail system.",
    highlights: [
      "DeSoto Falls: 100+ foot drop, a short walk from the parking area",
      "Boardwalk and creek trails past Laurel Falls, Lodge Falls, and Lost Falls",
      "Spring wildflower bloom among the best in Alabama",
      "CCC stone lodge, cabins, and improved campground",
      "Ten minutes from Little River Canyon — pair them",
    ],
    activities: ["Hiking", "Waterfall viewing", "Camping", "Lodging", "Wildflower walks", "Mountain biking"],
    camping: "Improved campground, primitive sites, cabins, and a lodge. Book through alapark.com.",
    seasonality: {
      fall: "Color on the plateau; cool creek-trail hiking.",
      spring: "Peak — waterfalls run full and the wildflowers are out. The season to come.",
      summer: "Shaded and wet; good hot-weather hiking near the cascades.",
      winter: "Quiet; falls still run through the cold months.",
    },
    website: "https://www.alapark.com/parks/desoto-state-park",
    lat: 34.4989,
    lng: -85.6203,
    tags: ["state-park", "waterfall", "wildflowers", "dekalb-county", "ccc", "camping", "spring"],
  },
  {
    slug: "coldwater-mountain",
    name: "Coldwater Mountain",
    shortName: "Coldwater",
    location: "Anniston, Alabama",
    county: "Calhoun County",
    region: "NE Alabama",
    state: "AL",
    managedBy: "county",
    acreage: 4000,
    fee: false,
    feeNote: "Free",
    hours: "Daylight hours, daily",
    description:
      "One of the Southeast's premier mountain-biking destinations, right on the edge of Anniston. Coldwater is a purpose-built trail system — flow trails, technical descents, and long green cross-country loops carved into 4,000 acres of forest by the Northeast Alabama Bicycle Association. It draws riders from across the region, but the easier loops walk and ride fine for beginners too.",
    history:
      "The trail network was built out over the 2010s as a partnership between the Forever Wild land program and NEABA, turning a stretch of protected forest into an IMBA-recognized ride center. It anchors Anniston's push to brand itself as a Southern outdoor-recreation town, alongside the Chief Ladiga Trail.",
    highlights: [
      "35+ miles of purpose-built mountain-bike trail",
      "Flow trails ('Bomb Dog') and technical lines for advanced riders",
      "Long green cross-country loops that beginners can ride",
      "IMBA-recognized ride center, free to the public",
      "Minutes from downtown Anniston — pairs with the Chief Ladiga Trail",
    ],
    activities: ["Mountain biking", "Trail running", "Hiking"],
    seasonality: {
      fall: "Prime riding — cool, dry, and the leaves are turning overhead.",
      spring: "Green and fast; trails can be soft after heavy rain, let them dry.",
      summer: "Rideable early and late; midday heat on the exposed climbs.",
      winter: "Rides well on dry cold days — one of the best winter trail systems in the state.",
    },
    website: "https://coldwatermtb.com",
    lat: 33.6098,
    lng: -85.9169,
    trailSlug: "coldwater-mountain",
    tags: ["mountain-biking", "trails", "anniston", "calhoun-county", "free", "outdoor-rec"],
  },
  {
    slug: "choccolocco-park",
    name: "Choccolocco Park",
    shortName: "Choccolocco",
    location: "Oxford, Alabama",
    county: "Calhoun County",
    region: "NE Alabama",
    state: "AL",
    managedBy: "city",
    established: 2016,
    acreage: 100,
    fee: false,
    feeNote: "Free",
    hours: "Daily, dawn to dusk",
    description:
      "Oxford's big community park — a 100-acre complex built around a spring-fed lake, with a paved walking loop, playgrounds, sports fields, and an amphitheater. It's not wilderness; it's the well-made town park where NE Alabama families actually spend Saturday. The lake loop is flat, stroller-friendly, and open to everyone.",
    history:
      "The City of Oxford opened Choccolocco Park in 2016 as a regional recreation complex, built around a natural spring and lake on the south side of town. It hosts tournaments, festivals, and everyday walkers, and has become the recreational anchor for the Oxford–Anniston corridor.",
    highlights: [
      "Paved lake loop — flat, accessible, stroller- and wheelchair-friendly",
      "Spring-fed lake at the center of the park",
      "Multiple playgrounds and open sports fields",
      "Amphitheater for festivals and community events",
      "Free, in-town, and open year-round",
    ],
    activities: ["Walking", "Running", "Playgrounds", "Sports fields", "Community events"],
    seasonality: {
      fall: "Comfortable walking weather; festival season at the amphitheater.",
      spring: "Green and busy; the lake loop fills up on nice weekends.",
      summer: "Early morning and evening are the moves; little shade midday.",
      winter: "Open and quiet — the flat loop is a good cold-weather walk.",
    },
    website: "https://www.oxfordalabama.org/234/Choccolocco-Park",
    lat: 33.5773,
    lng: -85.8351,
    tags: ["city-park", "oxford", "calhoun-county", "family", "walking", "free", "accessible"],
  },
]

export function getPark(slug: string): Park | undefined {
  return PARKS.find((p) => p.slug === slug)
}

export function getAllParks(): Park[] {
  return PARKS
}

const MANAGER_LABELS: Record<ParkManager, string> = {
  state: "State Park",
  national: "National Park",
  "national-preserve": "National Preserve (NPS)",
  city: "City Park",
  county: "County / Public Land",
  private: "Private",
}

export function managerLabel(m: ParkManager): string {
  return MANAGER_LABELS[m]
}

const DIFFICULTY_LABELS: Record<ParkTrailDifficulty, string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
  strenuous: "Strenuous",
}

export function parkDifficultyLabel(d: ParkTrailDifficulty): string {
  return DIFFICULTY_LABELS[d]
}

const DIFFICULTY_COLORS: Record<ParkTrailDifficulty, string> = {
  easy: "#3D6B4F",
  moderate: "#CA8A04",
  hard: "#9A3412",
  strenuous: "#7F1D1D",
}

export function parkDifficultyColor(d: ParkTrailDifficulty): string {
  return DIFFICULTY_COLORS[d]
}
