const FW = "https://matt-headley-shop.fourthwall.com/products";

export const PRODUCTS = {
  ICM: {
    url: `${FW}/i-contain-multitudes`,
    image: "https://imgproxy.fourthwall.dev/IMNy3eu4RC0MEIbGmpUUg-5yMjSRyFtKLGn1Mjh5S84/w:1920/sm:1/enc/ZedkaYftBaqinaIZ/Jr40_xy3Eb4tySwk/rScelYdmKxyZS6jZ/NJHeSvZlktqX-xYh/WSHRJ-RhgMHeSlMQ/27Iq7L_pckKRXOOp/v5oIB6B1Vnyt8g_D/jmvq7ZBuLrTpLBdn/gKhmeo_IvtrJEkf4/Yfl8j3qjiOOsC3F3/Z2VGxXEwJGMrAnzQ/2Xzk5fe0iRKeZTw2/UCV0r3RWKam0aN3r/8xpuJ8LPfqX3Axj4/fUq1cLuAVw8.jpg",
    name: "I Contain Multitudes",
  },
  SH: {
    url: `${FW}/still-here`,
    image: "https://imgproxy.fourthwall.com/FyWryySt9e8_rzT3yE6eItoqF6GstCkbBJSuL62LpoY/w:1920/sm:1/enc/kZytLUESOJY7WIq3/mQmU8CAxU0TQJrD2/LFh8Y-uqr4QKxZUr/-r3HZV9rDnJj-a9U/SY5J9AEtq4g5o7L3/JwKTj1OyPau1R0tC/tTw60OgXWBZkD6Hu/wWE8ibGTgAZsKMsY/WTotCATD8-xnovcw/FEwNfv2JgknjHnf0/ug0yHPZ7pcf3JZ2i/bZ0phQZB_NTgL9ld/E3bYmALpumGY4hCG/Su9KSvpN3h6FOoRK/dNXM-cTSQcw",
    name: "Still Here",
  },
  BP: {
    url: `${FW}/bipolar-proud`,
    image: "https://imgproxy.fourthwall.com/h_96A1MIPtOTIaIiYVWIX71opxpo5aTClEo1w5juBqs/w:1920/sm:1/enc/6cyztRuBMcyK5yJ6/qW27rarZs034xiqO/uIEdXZ3wyNpBYfZu/bLqZxDSki3uIG-wV/r6rKWmuVX7Ij7c2u/T76KUWv84U9RwuRI/LB9zHEDBJydUE_RF/J14NCV4M8fBZ1kaa/FXRwj95Ef9XIM9Bo/lZsxWinD2qG6FKf5/Zwg8Tzn0duzfC-NX/OETz1p97N3Efixji/_IxGEL89KxkwdZis/XH8gGKHP_ZwkNzcR/-b99RXRadmU",
    name: "Bipolar & Proud",
  },
  CLT: {
    url: `${FW}/chief-ladiga-trail`,
    image: "https://imgproxy.fourthwall.dev/ZF3dCHiMwN_oLeMILCG_ZyO-yLWVBfdGdJMTSYB-VXY/w:1920/sm:1/enc/xbK5_Zj8qaLU0EP3/UfOi6qpauX8X4zZD/AWPss1Zx9hhOgARc/CZqplVE_aYujz1uM/epI7dRMx0-wU71TK/3ma_163k4tMHBodv/YrGnTZCy-6dzW-bm/mAPjyxMJSQCG5oDM/9dFf4zGHoj51RgVo/E53wJphu1Azmz6CY/uVVj-1cu4Ost7nHt/mSLxEtUbNZifhAY-/Jc8wVoo-eZhrCxWg/lW9fJ68l0YPLbqD5/8B9AixuIqDc.jpg",
    name: "Ladiga's Land",
  },
  MC: {
    url: `${FW}/the-model-city-anniston-alabama`,
    image: "https://imgproxy.fourthwall.dev/bCKGvDFomR4x6_Zlk-RenE-MeR-Zb6uKO6B8jy1nJ6A/w:1920/sm:1/enc/8Tc1-v11kCUQnxAj/xbkOwN2Vmv1CmS5b/iH46ky6mYZkr7k1T/sj-wL9p2g_mBO1xo/11U6ggMM2EaOCyuu/ZKr9z6B4zHOG8DIq/zuwI3c9jJmiOwIiV/VVBN7X34q-o7BDHm/mSLvFXaNgCicXSW1/oVoxxnVrSMwkzOC5/pb5-h4tqgXuvRrep/XjTo_ygy8ePtMBxI/mrLLJArS604vJop5/0ZWri4eShE8mN6Mk/R8CBRTe6q5c.jpg",
    name: "The Model City",
  },
  DD: {
    url: `${FW}/dave-dennis-freedom-rider-1961`,
    image: "https://imgproxy.fourthwall.dev/YvdCQQM4m34BsiGM6jH_ZWtLkpB-86lBsT-JJkH5ywk/w:1920/sm:1/enc/KJmEURE1ZEHH7lz8/KbhMAztnGROBOrZB/o1KrQlLfPkYCWGsu/3VL6M0apn3-yNoot/gJPOll2UlrMbcT8Z/vVZ1y11cowVyD17R/sbEPfskKjsV9d8Vp/AqT_Q1F4px2_tfwr/k-RstG64c2orIMYh/HMEZQoFMr8fRPgDc/gsaRG0QfuoURMYhQ/-zr4w5ogA_ILJAWL/_a8TnRJ1oT5Y8hM8/nlJuDiLEe-ixnKlh/brcnBF06Xtk.jpg",
    name: "Dave Dennis — Freedom Rider, 1961",
  },
} as const;

type Product = (typeof PRODUCTS)[keyof typeof PRODUCTS];

// Explicit per-slug assignments. Add a slug here when a new profile goes live.
// Profiles not listed get MC as the default (safe for any Anniston subject).
const PROFILE_MERCH: Record<string, Product> = {
  "chief-ladiga-trail": PRODUCTS.CLT,
  "noccalula-falls": PRODUCTS.CLT,
  "anniston-museums-gardens": PRODUCTS.MC,
  "aquality-farms": PRODUCTS.MC,
  "freedom-riders-national-monument": PRODUCTS.DD,
  "interfaith-ministries-calhoun-county": PRODUCTS.MC,
  "lewis-downing": PRODUCTS.MC,
  "mom-to-go": PRODUCTS.MC,
  "shannon-jenkins": PRODUCTS.MC,
};

// Explicit per-slug assignments for essays.
// Essays not listed get ICM as the default.
const ESSAY_MERCH: Record<string, Product> = {
  "the-hospital": PRODUCTS.SH,
  "hope-in-the-wilderness": PRODUCTS.SH,
  "im-not-going-to-disappear": PRODUCTS.SH,
  "the-same-domain": PRODUCTS.BP,
  "chief-ladiga-trail": PRODUCTS.CLT,
  "attempt-73": PRODUCTS.ICM,
  "a-letter-never-sent": PRODUCTS.ICM,
  "my-writing-has-a-new-home": PRODUCTS.ICM,
  "no-shade": PRODUCTS.ICM,
};

export function getProfileMerch(slug: string): { primary: Product; secondary: Product } {
  const primary = PROFILE_MERCH[slug] ?? PRODUCTS.MC;
  const secondary = primary === PRODUCTS.ICM ? PRODUCTS.SH : PRODUCTS.ICM;
  return { primary, secondary };
}

export function getEssayMerch(slug: string): { primary: Product; secondary: Product } {
  const primary = ESSAY_MERCH[slug] ?? PRODUCTS.ICM;
  const secondary = primary === PRODUCTS.ICM ? PRODUCTS.SH : PRODUCTS.ICM;
  return { primary, secondary };
}
