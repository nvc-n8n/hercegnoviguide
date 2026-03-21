export type PlaceCategory =
  | 'attractions'
  | 'religious'
  | 'beaches'
  | 'restaurants'
  | 'cafes'
  | 'nightlife'
  | 'viewpoints'
  | 'family'
  | 'nearbyTrips'
  | 'festivals'
  | 'shopping'
  | 'practical';

export type PlaceTag =
  | 'family'
  | 'nightlife'
  | 'beach'
  | 'religious'
  | 'culture'
  | 'food'
  | 'viewpoint'
  | 'trip'
  | 'featured'
  | 'old-town'
  | 'waterfront'
  | 'festival'
  | 'shopping'
  | 'practical';

export type HeroVariant =
  | 'sea'
  | 'stone'
  | 'sunset'
  | 'forest'
  | 'night'
  | 'family'
  | 'heritage';

export type NeighborhoodKey =
  | 'stari-grad'
  | 'topla'
  | 'savina'
  | 'igalo'
  | 'meljine'
  | 'njivice'
  | 'rose'
  | 'lustica'
  | 'boka'
  | 'nearby';

export type OpeningHours = {
  weekdayText?: string[];
  openNow?: boolean | null;
};

export type ImageAttribution = {
  text: string;
  url?: string;
};

export type SourceRef = {
  label: string;
  url: string;
};

export type QuickFact = {
  label: string;
  value: string;
};

export type Place = {
  id: string;
  sourceId: string;
  slug: string;
  title: string;
  category: PlaceCategory;
  subcategory?: string | null;
  description: string;
  address: string;
  neighborhood: NeighborhoodKey;
  lat: number;
  lng: number;
  heroImage?: string | null;
  gallery?: string[];
  rating?: number | null;
  reviewCount?: number | null;
  priceLevel?: number | null;
  website?: string | null;
  phone?: string | null;
  openingHours?: OpeningHours | null;
  tags: PlaceTag[];
  isFeatured?: boolean;
  isFamilyFriendly?: boolean;
  isNightlife?: boolean;
  isBeach?: boolean;
  isReligious?: boolean;
  googlePlaceId?: string | null;
  source: string;
  sourceUrl: string;
  attribution?: ImageAttribution[] | null;
  sourceRefs: SourceRef[];
  quickFacts: QuickFact[];
  heroVariant: HeroVariant;
  lastUpdated: string;
};

export type SortOption = 'recommended' | 'nearest' | 'rating' | 'alphabetical';

export type PlaceFilters = {
  openNow: boolean;
  topRated: boolean;
  nearby: boolean;
  family: boolean;
  nightlife: boolean;
  beaches: boolean;
  culture: boolean;
  food: boolean;
  sort: SortOption;
};

export type DirectionsTarget = {
  title: string;
  lat: number;
  lng: number;
  address?: string;
};

export type NearbyLocation = {
  latitude: number;
  longitude: number;
  timestamp: number;
};
