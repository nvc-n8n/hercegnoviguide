/**
 * Herceg Novi Guide — Image Assets
 *
 * Place-specific photos from Wikimedia Commons (CC) and Pexels (free commercial use).
 */

import type { ImageSource } from 'expo-image';

// ── Local photo assets ──────────────────────────────────────────────

const LOCAL = {
  // ── Herceg Novi panoramas & town views ──
  hnPanorama1: require('../../assets/photos/herceg-novi-panorama-1.jpg'),
  hnPanorama2: require('../../assets/photos/herceg-novi-panorama-2.jpg'),
  hnPanorama3: require('../../assets/photos/herceg-novi-panorama-3.jpg'),
  hnPanoramaPexels1: require('../../assets/photos/hn-panorama-1.jpg'),
  hnPanoramaPexels2: require('../../assets/photos/hn-panorama-2.jpg'),
  hnFromSea: require('../../assets/photos/herceg-novi-from-sea.jpg'),
  hnSunset: require('../../assets/photos/herceg-novi-sunset.jpg'),
  hnWalkway: require('../../assets/photos/herceg-novi-walkway.jpg'),
  hnOldTownGate: require('../../assets/photos/herceg-novi-old-town-gate.jpg'),
  hnSquare: require('../../assets/photos/herceg-novi-square.jpg'),

  // ── Herceg Novi old town (original) ──
  hnOldTown1: require('../../assets/photos/herceg-novi-old-town-1.jpg'),
  hnOldTown2: require('../../assets/photos/herceg-novi-old-town-2.jpg'),

  // ── Fortresses — actual place photos ──
  forteMare: require('../../assets/photos/forte-mare.jpg'),
  kanliKula: require('../../assets/photos/kanli-kula.jpg'),
  fortSpanjola: require('../../assets/photos/fort-spanjola.jpg'),
  sahatKula: require('../../assets/photos/sahat-kula.jpg'),
  hnFortress1: require('../../assets/photos/herceg-novi-fortress-1.jpg'),
  hnFortress2: require('../../assets/photos/herceg-novi-fortress-2.jpg'),

  // ── Attractions — specific places ──
  gradskiMuzej: require('../../assets/photos/gradski-muzej.jpg'),
  kucaIvaAndrica: require('../../assets/photos/kuca-iva-andrica.jpg'),
  spomenikTvrtku: require('../../assets/photos/spomenik-tvrtku.jpg'),

  // ── Religious — actual places ──
  manastirSavina: require('../../assets/photos/manastir-savina.jpg'),
  crkvaSvMihaila: require('../../assets/photos/crkva-sv-mihaila.jpg'),
  crkvaSvJeronima: require('../../assets/photos/crkva-sv-jeronima.jpg'),
  churchOldTown1: require('../../assets/photos/church-old-town-1.jpg'),
  churchOldTown2: require('../../assets/photos/church-old-town-2.jpg'),
  churchOldTown3: require('../../assets/photos/church-old-town-3.jpg'),
  monastery1: require('../../assets/photos/monastery-1.jpg'),
  monastery2: require('../../assets/photos/monastery-2.jpg'),

  // ── Beaches — specific places ──
  zaloBeach: require('../../assets/photos/zalo-beach.jpg'),
  lazureBeach: require('../../assets/photos/lazure-beach.jpg'),
  savinaBeach: require('../../assets/photos/savina-beach.jpg'),
  perlaBeach: require('../../assets/photos/perla-beach.jpg'),
  kalajzaBeach: require('../../assets/photos/kalajza-beach.jpg'),
  rafaelloBeach: require('../../assets/photos/rafaello-beach.jpg'),
  toplaBeach: require('../../assets/photos/topla-beach.jpg'),
  njiviceBeach: require('../../assets/photos/njivice-beach.jpg'),
  zanjiceBeach: require('../../assets/photos/zanjice-beach.jpg'),
  miristeBeach: require('../../assets/photos/miriste-beach.jpg'),
  igaloBeach: require('../../assets/photos/igalo-beach.jpg'),
  montenegroBeach1: require('../../assets/photos/montenegro-beach-1.jpg'),

  // ── Coast ──
  montenegroCoast1: require('../../assets/photos/montenegro-coast-1.jpg'),
  montenegroCoast2: require('../../assets/photos/montenegro-coast-2.jpg'),
  montenegroCoast3: require('../../assets/photos/montenegro-coast-3.jpg'),

  // ── Restaurants — specific places ──
  triLipe: require('../../assets/photos/tri-lipe.jpg'),
  gradskaKafana: require('../../assets/photos/gradska-kafana.jpg'),
  belveder: require('../../assets/photos/belveder-restoran.jpg'),
  portofino: require('../../assets/photos/portofino-restoran.jpg'),
  konobaAragosta: require('../../assets/photos/konoba-aragosta.jpg'),
  feral: require('../../assets/photos/feral-restoran.jpg'),

  // ── Cafes — specific places ──
  fabrikaCoffee: require('../../assets/photos/fabrika-coffee.jpg'),
  koffeinCafe: require('../../assets/photos/koffein-cafe.jpg'),
  belavistaCafe: require('../../assets/photos/belavista-cafe.jpg'),
  nauticaCafe: require('../../assets/photos/nautica-cafe.jpg'),

  // ── Nightlife — specific places ──
  laBamba: require('../../assets/photos/la-bamba.jpg'),
  tondoBar: require('../../assets/photos/tondo-bar.jpg'),
  skuribanda: require('../../assets/photos/skuribanda.jpg'),
  peoplesBeachBar: require('../../assets/photos/peoples-beach-bar.jpg'),

  // ── Nearby trips — specific places ──
  plavaSpilja: require('../../assets/photos/plava-spilja.jpg'),
  mamulaIsland: require('../../assets/photos/mamula-island.jpg'),
  gospaOdSkrpjela: require('../../assets/photos/gospa-od-skrpjela.jpg'),
  rimskiMozaici: require('../../assets/photos/rimski-mozaici.jpg'),
  kotorCableCarView: require('../../assets/photos/kotor-cable-car-view.jpg'),
  bokaKotorska1: require('../../assets/photos/boka-kotorska-1.jpg'),
  kotorOldTownView: require('../../assets/photos/kotor-old-town-view.jpg'),

  // ── Festivals — specific events ──
  festivalMimoze: require('../../assets/photos/festival-mimoze.jpg'),
  filmFestival: require('../../assets/photos/film-festival.jpg'),
  bokaNoc: require('../../assets/photos/boka-noc.jpg'),
  sunceaneSkale: require('../../assets/photos/sunceane-skale.jpg'),

  // ── Shopping — specific places ──
  zelenaPijaca: require('../../assets/photos/zelena-pijaca.jpg'),
  stariGradSuveniri: require('../../assets/photos/stari-grad-suveniri.jpg'),
  hdiCentar: require('../../assets/photos/hdi-centar.jpg'),

  // ── Viewpoints ──
  tajnoBrdo: require('../../assets/photos/tajno-brdo.jpg'),
  viewpointBay1: require('../../assets/photos/viewpoint-bay-1.jpg'),
  viewpointBay2: require('../../assets/photos/viewpoint-bay-2.jpg'),

  // ── Promenade ──
  promenade1: require('../../assets/photos/promenade-1.jpg'),
  promenade2: require('../../assets/photos/promenade-2.jpg'),
  igaloTrail: require('../../assets/photos/igalo-trail.jpg'),
  toplaArea: require('../../assets/photos/topla-area.jpg'),

  // ── Family ──
  familyBeach1: require('../../assets/photos/family-beach-1.jpg'),
  familyBeach2: require('../../assets/photos/family-beach-2.jpg'),

  // ── Bay panorama ──
  bayOfKotorPanorama: require('../../assets/photos/bay-of-kotor-panorama.jpg'),

  // ── Market (original) ──
  market1: require('../../assets/photos/market-1.jpg'),
  market2: require('../../assets/photos/market-2.jpg'),

  // ── Nightlife (original) ──
  nightlifeBar1: require('../../assets/photos/nightlife-bar-1.jpg'),
  nightlifeBar2: require('../../assets/photos/nightlife-bar-2.jpg'),
};

// ── Per-place hero images (each place gets its own photo) ───────────
export const placeHeroImages: Record<string, ImageSource> = {
  // Attractions — each has its own photo
  'forte-mare': LOCAL.forteMare,
  'kanli-kula': LOCAL.kanliKula,
  'fort-spanjola': LOCAL.fortSpanjola,
  'gradski-muzej': LOCAL.gradskiMuzej,
  'kuca-iva-andrica': LOCAL.kucaIvaAndrica,
  'spomenik-tvrtku': LOCAL.spomenikTvrtku,
  'sahat-kula': LOCAL.sahatKula,

  // Viewpoints
  'tajno-brdo': LOCAL.tajnoBrdo,

  // Religious — each has its own photo
  'manastir-savina': LOCAL.manastirSavina,
  'crkva-sv-arhangela-mihaila': LOCAL.crkvaSvMihaila,
  'crkva-svetog-jeronima': LOCAL.crkvaSvJeronima,
  'crkva-svetog-spasa': LOCAL.churchOldTown3,
  'crkva-sv-leopolda': LOCAL.churchOldTown1,
  'svetog-save': LOCAL.churchOldTown2,

  // Beaches — each has its own photo
  'zalo': LOCAL.zaloBeach,
  'lazure': LOCAL.lazureBeach,
  'savina-beach': LOCAL.savinaBeach,
  'perla': LOCAL.perlaBeach,
  'kalajza': LOCAL.kalajzaBeach,
  'rafaello': LOCAL.rafaelloBeach,
  'topla': LOCAL.toplaBeach,
  'njivice-beach': LOCAL.njiviceBeach,
  'zanjice': LOCAL.zanjiceBeach,
  'miriste': LOCAL.miristeBeach,
  'igalo-beach': LOCAL.igaloBeach,

  // Restaurants — each has its own photo
  'tri-lipe': LOCAL.triLipe,
  'gradska-kafana': LOCAL.gradskaKafana,
  'belveder-restoran': LOCAL.belveder,
  'portofino': LOCAL.portofino,
  'konoba-aragosta': LOCAL.konobaAragosta,
  'feral': LOCAL.feral,

  // Cafes — each has its own photo
  'fabrika-coffee': LOCAL.fabrikaCoffee,
  'koffein-specialty': LOCAL.koffeinCafe,
  'belavista-cafe': LOCAL.belavistaCafe,
  'nautica-cafe': LOCAL.nauticaCafe,

  // Nightlife — each has its own photo
  'la-bamba': LOCAL.laBamba,
  'tondo': LOCAL.tondoBar,
  'skuribanda': LOCAL.skuribanda,
  'peoples-beach-bar': LOCAL.peoplesBeachBar,

  // Nearby trips — each has its own photo
  'plava-spilja': LOCAL.plavaSpilja,
  'tvrdava-mamula': LOCAL.mamulaIsland,
  'gospa-od-skrpjela': LOCAL.gospaOdSkrpjela,
  'rimski-mozaici': LOCAL.rimskiMozaici,
  'kotor-cable-car': LOCAL.kotorCableCarView,

  // Festivals — each has its own photo
  'festival-mimoze': LOCAL.festivalMimoze,
  'herceg-novi-film-festival': LOCAL.filmFestival,
  'boka-noc': LOCAL.bokaNoc,
  'sunceane-skale': LOCAL.sunceaneSkale,

  // Shopping — each has its own photo
  'zelena-pijaca': LOCAL.zelenaPijaca,
  'stari-grad-suveniri': LOCAL.stariGradSuveniri,
  'hdi-centar': LOCAL.hdiCentar,

  // Practical — use town views
  'turisticki-info': LOCAL.hnFromSea,
  'bolnica-meljine': LOCAL.hnPanorama3,
  'apoteka-centar': LOCAL.hnSquare,
  'policija-hn': LOCAL.hnPanoramaPexels1,
  'autobuska-stanica': LOCAL.hnPanoramaPexels2,
  'posta-hn': LOCAL.hnOldTownGate,
};

// ── Category fallback images ────────────────────────────────────────
export const categoryFallbackImages: Record<string, ImageSource> = {
  attractions: LOCAL.forteMare,
  religious: LOCAL.manastirSavina,
  beaches: LOCAL.zanjiceBeach,
  restaurants: LOCAL.triLipe,
  cafes: LOCAL.fabrikaCoffee,
  nightlife: LOCAL.laBamba,
  viewpoints: LOCAL.tajnoBrdo,
  nearbyTrips: LOCAL.gospaOdSkrpjela,
  festivals: LOCAL.festivalMimoze,
  shopping: LOCAL.zelenaPijaca,
  practical: LOCAL.hnFromSea,
  family: LOCAL.familyBeach1,
};

// ── Category carousel images (Home screen full-width carousel) ──────
export const categoryCarouselImages: Record<string, ImageSource> = {
  attractions: LOCAL.forteMare,
  religious: LOCAL.manastirSavina,
  beaches: LOCAL.zanjiceBeach,
  restaurants: LOCAL.triLipe,
  cafes: LOCAL.belavistaCafe,
  nightlife: LOCAL.laBamba,
  viewpoints: LOCAL.tajnoBrdo,
  family: LOCAL.familyBeach1,
  nearbyTrips: LOCAL.gospaOdSkrpjela,
  festivals: LOCAL.festivalMimoze,
  shopping: LOCAL.zelenaPijaca,
  practical: LOCAL.hnFromSea,
};

// ── Helper ──────────────────────────────────────────────────────────
export const getHeroImageUri = (placeId: string, category: string): ImageSource => {
  return placeHeroImages[placeId] ?? categoryFallbackImages[category] ?? LOCAL.hnPanorama1;
};
