// Southern Legends is "Stories from the Appalachian Foothills of Northeast Alabama."
// The Places directory was dumping all 244 AL cities statewide (Mobile, Montgomery, Gulf Shores) —
// off-brand + thin. This scopes Places to the region SL actually covers.

// Where SL has real stories, profiles, or guides — surfaced first, prominently.
export const ANCHOR_CITIES = ["Anniston", "Oxford", "Jacksonville", "Piedmont"];

// Northeast Alabama / Appalachian foothills counties: Calhoun, Etowah, Cherokee,
// Cleburne, DeKalb, Marshall, St. Clair, Talladega, Jackson, Blount.
export const NE_ALABAMA_CITIES = [
  // Calhoun
  "Anniston", "Oxford", "Jacksonville", "Piedmont", "Weaver", "Ohatchee", "Alexandria", "Wellington", "Munford",
  // Etowah
  "Gadsden", "Attalla", "Glencoe", "Rainbow City", "Hokes Bluff", "Southside", "Sardis City", "Gallant",
  // Cherokee
  "Leesburg",
  // Cleburne
  "Heflin", "Delta",
  // DeKalb
  "Collinsville",
  // Marshall
  "Boaz", "Guntersville", "Arab", "Grant", "Union Grove",
  // St. Clair
  "Pell City", "Springville", "Ashville", "Odenville", "Moody", "Steele",
  // Talladega
  "Talladega", "Sylacauga", "Lincoln", "Childersburg",
  // Jackson
  "Scottsboro",
  // Blount
  "Oneonta", "Locust Fork", "Hayden", "Remlap",
];

const NE_SET = new Set(NE_ALABAMA_CITIES);
const ANCHOR_SET = new Set(ANCHOR_CITIES);

/** Cities in SL's region, minus the anchors (which render separately). */
export function regionCities(allCities: string[]): string[] {
  return allCities.filter((c) => NE_SET.has(c) && !ANCHOR_SET.has(c)).sort();
}
