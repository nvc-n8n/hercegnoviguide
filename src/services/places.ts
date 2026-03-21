import Fuse from 'fuse.js';

import { seedPlaces } from '@/src/data/seed/places';
import { getDistanceInMeters } from '@/src/lib/distance';
import type {
  NearbyLocation,
  Place,
  PlaceCategory,
  PlaceFilters,
  PlaceTag,
  SortOption,
} from '@/src/types/place';

export type PlaceWithDistance = Place & {
  distanceMeters?: number | null;
};

export const defaultFilters: PlaceFilters = {
  openNow: false,
  topRated: false,
  nearby: false,
  family: false,
  nightlife: false,
  beaches: false,
  culture: false,
  food: false,
  sort: 'recommended',
};

const categoryTagMap: Partial<Record<PlaceCategory, PlaceTag>> = {
  family: 'family',
  viewpoints: 'viewpoint',
  nearbyTrips: 'trip',
  nightlife: 'nightlife',
  beaches: 'beach',
  religious: 'religious',
  festivals: 'festival',
  shopping: 'shopping',
  practical: 'practical',
};

const fuse = new Fuse(seedPlaces, {
  threshold: 0.28,
  ignoreLocation: true,
  keys: ['title', 'description', 'address', 'tags', 'subcategory'],
});

export const matchesCategory = (place: Place, category: PlaceCategory) => {
  if (place.category === category) {
    return true;
  }

  const tag = categoryTagMap[category];
  return tag ? place.tags.includes(tag) : false;
};

export const getAllPlaces = () => seedPlaces;

export const getFeaturedPlaces = () => seedPlaces.filter((place) => place.isFeatured);

export const getPlaceBySlug = (slug: string) => seedPlaces.find((place) => place.slug === slug);

export const getCategoryPlaces = (category: PlaceCategory) =>
  seedPlaces.filter((place) => matchesCategory(place, category));

export const searchPlaces = (query: string) => {
  if (!query.trim()) {
    return seedPlaces;
  }

  return fuse.search(query).map((result) => result.item);
};

const applyDistance = (places: Place[], location?: NearbyLocation | null): PlaceWithDistance[] =>
  places.map((place) => ({
    ...place,
    distanceMeters: location
      ? getDistanceInMeters(location.latitude, location.longitude, place.lat, place.lng)
      : null,
  }));

const sortPlaces = (places: PlaceWithDistance[], sort: SortOption) => {
  const sorted = [...places];

  if (sort === 'alphabetical') {
    return sorted.sort((left, right) => left.title.localeCompare(right.title, 'sr-Latn'));
  }

  if (sort === 'rating') {
    return sorted.sort((left, right) => (right.rating ?? 0) - (left.rating ?? 0));
  }

  if (sort === 'nearest') {
    return sorted.sort((left, right) => (left.distanceMeters ?? Infinity) - (right.distanceMeters ?? Infinity));
  }

  return sorted.sort((left, right) => {
    const leftScore = Number(Boolean(left.isFeatured)) + (left.rating ?? 0);
    const rightScore = Number(Boolean(right.isFeatured)) + (right.rating ?? 0);
    return rightScore - leftScore;
  });
};

export const filterPlaces = (
  places: Place[],
  filters: PlaceFilters,
  location?: NearbyLocation | null,
): PlaceWithDistance[] => {
  const filtered = places.filter((place) => {
    if (filters.openNow && place.openingHours?.openNow !== true) {
      return false;
    }

    if (filters.topRated && (place.rating ?? 0) < 4.5) {
      return false;
    }

    if (filters.family && !place.tags.includes('family')) {
      return false;
    }

    if (filters.nightlife && !place.tags.includes('nightlife')) {
      return false;
    }

    if (filters.beaches && !place.tags.includes('beach')) {
      return false;
    }

    if (filters.culture && !place.tags.includes('culture') && !place.tags.includes('religious')) {
      return false;
    }

    if (filters.food && !place.tags.includes('food')) {
      return false;
    }

    return true;
  });

  const withDistance = applyDistance(filtered, location);
  const nextSort = filters.nearby ? 'nearest' : filters.sort;
  return sortPlaces(withDistance, nextSort);
};

export const getPopularPlaces = () =>
  sortPlaces(
    seedPlaces.filter((place) => place.isFeatured || place.tags.includes('featured')),
    'recommended',
  ).slice(0, 8);

export const getPlacesByTag = (tag: PlaceTag) => seedPlaces.filter((place) => place.tags.includes(tag));
