import { categoryByKey } from '@/src/constants/categories';
import { neighborhoods } from '@/src/data/areas/neighborhoods';
import type { HeroVariant, NeighborhoodKey, PlaceCategory } from '@/src/types/place';

export const formatNeighborhood = (key: NeighborhoodKey) => neighborhoods[key];

export const formatCategory = (category: PlaceCategory) => categoryByKey[category]?.title ?? category;

export const formatRating = (rating?: number | null, reviewCount?: number | null) => {
  if (!rating) {
    return 'Ocjena uskoro';
  }

  if (!reviewCount) {
    return rating.toFixed(1);
  }

  return `${rating.toFixed(1)} · ${reviewCount} ocjena`;
};

export const formatDistance = (meters?: number | null) => {
  if (meters == null) {
    return null;
  }

  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }

  return `${(meters / 1000).toFixed(1)} km`;
};

export const heroVariantLabel: Record<HeroVariant, string> = {
  sea: 'More',
  stone: 'Kamen',
  sunset: 'Zalazak',
  forest: 'Zelenilo',
  night: 'Veče',
  family: 'Porodica',
  heritage: 'Nasljeđe',
};
