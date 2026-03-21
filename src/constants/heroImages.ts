/**
 * Real photos of actual Herceg Novi locations from Wikimedia Commons.
 * All images are CC-licensed. Unsplash CDN used only for generic categories.
 */

const wm = (path: string) => `https://upload.wikimedia.org/wikipedia/commons/${path}`;
const wmThumb = (path: string, file: string, w = 1280) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${w}px-${file}`;
const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

// ── REAL Herceg Novi location photos (Wikimedia Commons) ──────────
const HN = {
  // Panorama / Bay views
  panorama: wmThumb('e/e1/Herceg_Novi.JPG', 'Herceg_Novi.JPG'),
  oldCity: wmThumb('0/0f/Herceg_Novi_-_old_city.JPG', 'Herceg_Novi_-_old_city.JPG'),
  primorje: wm('c/c8/Herceg_Novi_Primorje.JPG'),
  gucalicaPeak: wmThumb('d/dc/2024-02-04_A_view_from_Gru%C4%8Dalica_Peak%2C_Herceg_Novi_1.jpg', '2024-02-04_A_view_from_Gru%C4%8Dalica_Peak%2C_Herceg_Novi_1.jpg'),
  tajnoBrdo: wmThumb('e/e9/2024-02-04_A_vewi_from_Tajno_Brdo_fortress%2C_Herceg_Novi.jpg', '2024-02-04_A_vewi_from_Tajno_Brdo_fortress%2C_Herceg_Novi.jpg'),

  // Forte Mare
  forteMare: wmThumb('f/f0/2024-02-04_Forte_Mare%2C_Herceg_Novi.jpg', '2024-02-04_Forte_Mare%2C_Herceg_Novi.jpg'),
  forteMare2: wmThumb('4/41/Herceg_-_Novi._Forte_Mare._%D0%92%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D1%83%D1%8E_%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82%D1%8C._-_panoramio.jpg', 'Herceg_-_Novi._Forte_Mare._%D0%92%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D1%83%D1%8E_%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82%D1%8C._-_panoramio.jpg'),
  forteMareSeaFortress: wmThumb('0/05/%D0%93%D0%B5%D1%80%D1%86%D0%B5%D0%B3_-_%D0%9D%D0%BE%D0%B2%D0%B8%2C_%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F_%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82%D1%8C._-_panoramio.jpg', '%D0%93%D0%B5%D1%80%D1%86%D0%B5%D0%B3_-_%D0%9D%D0%BE%D0%B2%D0%B8%2C_%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F_%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82%D1%8C._-_panoramio.jpg'),

  // Zitadelle / Spanjola
  zitadelle: wmThumb('8/8d/D01.30_Zitadelle_Herceg_Novi.jpg', 'D01.30_Zitadelle_Herceg_Novi.jpg'),
  cityWalls: wmThumb('5/5a/Herceg_Novi_city_walls-05.JPG', 'Herceg_Novi_city_walls-05.JPG'),

  // Savina Monastery
  savina: wmThumb('b/bb/Bw306_-_Manastir_Savina.jpg', 'Bw306_-_Manastir_Savina.jpg'),

  // Churches (color photos)
  churchAscention: wmThumb('3/31/Herceg_Novi_-_Church_of_the_Ascention_Day.JPG', 'Herceg_Novi_-_Church_of_the_Ascention_Day.JPG'),
  churchColor: wmThumb('9/90/Herceg_Novi%2C_2014-04-25_-_panoramio_%287%29.jpg', 'Herceg_Novi%2C_2014-04-25_-_panoramio_%287%29.jpg'),
  oldTownChurch: wmThumb('7/7e/Herceg_-_Novi%2C_old_town_-_panoramio.jpg', 'Herceg_-_Novi%2C_old_town_-_panoramio.jpg'),
  hercegNoviScene: wmThumb('9/97/05_-_Herceg_Novi.jpg', '05_-_Herceg_Novi.jpg'),

  // Promenade
  promenade: wmThumb('f/f6/Herceg_Novi._Promenade_Pet_Danica_-_panoramio_%281%29.jpg', 'Herceg_Novi._Promenade_Pet_Danica_-_panoramio_%281%29.jpg'),
  panoramio10: wmThumb('2/2c/Herceg_Novi%2C_Montenegro_-_panoramio_%2810%29.jpg', 'Herceg_Novi%2C_Montenegro_-_panoramio_%2810%29.jpg'),
};

// ── Unsplash for generic categories (food, nightlife, etc.) ──────
const UNS = {
  crystalBeach: unsplash('photo-1723714521356-13b98f25f61f'),
  clearOcean: unsplash('photo-1759674950524-4dd2aaec63ee'),
  coastPalm: unsplash('photo-1724217552369-22b256e395d9'),
  blueCave: unsplash('photo-1755433023969-d3842237354a'),
  harborPlate: unsplash('photo-1646275869281-e99e041965b2'),
  grilledFish: unsplash('photo-1519708227418-c8fd9a32b7a2'),
  seafoodPlate: unsplash('photo-1632389879997-330b17bf1923'),
  sardines: unsplash('photo-1600699899970-b1c9fadd8f9e'),
  cafeOutdoor: unsplash('photo-1744995537200-3336aa087fd4'),
  cafeStreet: unsplash('photo-1683806627665-cb37319c526c'),
  cocktailBar: unsplash('photo-1745060830135-21963bf5ab30'),
  neonBar: unsplash('photo-1511963118349-e2b22c0efcfc'),
  farmersMarket: unsplash('photo-1749229964730-a5438ec7ae73'),
  marketStall: unsplash('photo-1755716274675-444cbf2db134'),
};

/** Per-place hero images. */
export const placeHeroImages: Record<string, string> = {
  // ── Attractions (REAL photos) ───────────────────────────
  'forte-mare': HN.forteMare,
  'kanli-kula': HN.cityWalls,
  'fort-spanjola': HN.zitadelle,
  'gradski-muzej': HN.oldTownChurch,
  'kuca-iva-andrica': HN.oldCity,
  'spomenik-tvrtku': HN.promenade,
  'sahat-kula': HN.panoramio10,

  // ── Viewpoints (REAL photos) ────────────────────────────
  'tajno-brdo': HN.tajnoBrdo,

  // ── Religious (REAL photos) ─────────────────────────────
  'manastir-savina': HN.churchAscention,
  'crkva-sv-arhangela-mihaila': HN.churchColor,
  'crkva-svetog-jeronima': HN.churchAscention,
  'crkva-svetog-spasa': HN.hercegNoviScene,
  'crkva-sv-leopolda': HN.oldTownChurch,
  'svetog-save': HN.churchAscention,

  // ── Beaches (Unsplash — generic crystal water) ──────────
  'zalo': UNS.crystalBeach,
  'lazure': UNS.clearOcean,
  'savina-beach': UNS.coastPalm,
  'perla': UNS.crystalBeach,
  'kalajza': UNS.clearOcean,
  'rafaello': UNS.coastPalm,
  'topla': UNS.crystalBeach,
  'njivice-beach': UNS.clearOcean,
  'zanjice': UNS.coastPalm,
  'miriste': UNS.crystalBeach,
  'igalo-beach': UNS.clearOcean,

  // ── Restaurants (Unsplash — food) ───────────────────────
  'tri-lipe': UNS.harborPlate,
  'gradska-kafana': UNS.grilledFish,
  'belveder-restoran': UNS.seafoodPlate,
  'portofino': UNS.harborPlate,
  'konoba-aragosta': UNS.sardines,
  'feral': UNS.grilledFish,

  // ── Cafes (Unsplash) ───────────────────────────────────
  'fabrika-coffee': UNS.cafeOutdoor,
  'koffein-specialty': UNS.cafeOutdoor,
  'belavista-cafe': UNS.cafeStreet,
  'nautica-cafe': UNS.cafeOutdoor,

  // ── Nightlife (Unsplash) ────────────────────────────────
  'la-bamba': UNS.cocktailBar,
  'tondo': UNS.neonBar,
  'skuribanda': UNS.cocktailBar,
  'peoples-beach-bar': UNS.neonBar,

  // ── Nearby Trips (mix) ──────────────────────────────────
  'plava-spilja': UNS.blueCave,
  'tvrdava-mamula': HN.forteMareSeaFortress,
  'gospa-od-skrpjela': HN.panorama,
  'rimski-mozaici': HN.oldCity,
  'kotor-cable-car': HN.gucalicaPeak,

  // ── Festivals (REAL HN) ─────────────────────────────────
  'festival-mimoze': HN.promenade,
  'herceg-novi-film-festival': HN.cityWalls,
  'boka-noc': HN.panorama,
  'sunceane-skale': HN.panoramio10,

  // ── Shopping ────────────────────────────────────────────
  'zelena-pijaca': UNS.farmersMarket,
  'stari-grad-suveniri': HN.oldTownChurch,
  'hdi-centar': UNS.marketStall,

  // ── Practical (REAL HN) ─────────────────────────────────
  'turisticki-info': HN.primorje,
  'bolnica-meljine': HN.panorama,
  'apoteka-centar': HN.oldCity,
  'policija-hn': HN.primorje,
  'autobuska-stanica': HN.panorama,
  'posta-hn': HN.oldCity,
};

/** Category fallback images. */
export const categoryFallbackImages: Record<string, string> = {
  attractions: HN.forteMare,
  religious: HN.churchColor,
  beaches: UNS.crystalBeach,
  restaurants: UNS.harborPlate,
  cafes: UNS.cafeOutdoor,
  nightlife: UNS.cocktailBar,
  viewpoints: HN.gucalicaPeak,
  nearbyTrips: HN.panorama,
  festivals: HN.promenade,
  shopping: UNS.farmersMarket,
  practical: HN.primorje,
  family: HN.promenade,
};

/** Category hero images for the category carousel on home. */
// All Unsplash — reliable, high-quality, no Wikimedia cropping issues
export const categoryCarouselImages: Record<string, string> = {
  attractions: `${unsplash('photo-1558618666-fcd25c85cd64')}?w=900&h=600&fit=crop&q=85`,
  religious:   `${unsplash('photo-1548013146-72479768bada')}?w=900&h=600&fit=crop&q=85`,
  beaches:     `${UNS.crystalBeach}?w=900&h=600&fit=crop&q=85`,
  restaurants: `${UNS.harborPlate}?w=900&h=600&fit=crop&q=85`,
  cafes:       `${UNS.cafeOutdoor}?w=900&h=600&fit=crop&q=85`,
  nightlife:   `${UNS.cocktailBar}?w=900&h=600&fit=crop&q=85`,
  viewpoints:  `${unsplash('photo-1506905925346-21bda4d32df4')}?w=900&h=600&fit=crop&q=85`,
  family:      `${unsplash('photo-1507525428034-b723cf961d3e')}?w=900&h=600&fit=crop&q=85`,
  nearbyTrips: `${unsplash('photo-1476514525535-07fb3b4ae5f1')}?w=900&h=600&fit=crop&q=85`,
  festivals:   `${unsplash('photo-1533174072545-7a4b6ad7a6c3')}?w=900&h=600&fit=crop&q=85`,
  shopping:    `${UNS.farmersMarket}?w=900&h=600&fit=crop&q=85`,
  practical:   `${unsplash('photo-1530521954074-e64f6810b32d')}?w=900&h=600&fit=crop&q=85`,
};

/** Get hero image URL for a place. Appends sizing params for Unsplash URLs only. */
export const getHeroImageUri = (placeId: string, category: string, w = 800, h = 500): string => {
  const base = placeHeroImages[placeId] ?? categoryFallbackImages[category];
  if (!base) return '';
  // Only append query params for Unsplash URLs (Wikimedia URLs are already sized)
  if (base.includes('unsplash.com')) {
    return `${base}?w=${w}&h=${h}&fit=crop&q=80`;
  }
  return base;
};
