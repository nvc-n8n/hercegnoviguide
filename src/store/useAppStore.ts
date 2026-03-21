import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { defaultFilters } from '@/src/services/places';
import type { NearbyLocation, PlaceFilters } from '@/src/types/place';

type AppState = {
  hasSeenOnboarding: boolean;
  favoriteIds: string[];
  recentSearches: string[];
  recentViewIds: string[];
  lastKnownLocation: NearbyLocation | null;
  filters: PlaceFilters;
};

type AppActions = {
  setHasSeenOnboarding: (value: boolean) => void;
  toggleFavorite: (id: string) => void;
  addRecentSearch: (query: string) => void;
  addRecentView: (id: string) => void;
  setLastKnownLocation: (location: NearbyLocation | null) => void;
  setFilters: (filters: PlaceFilters) => void;
  resetFilters: () => void;
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      favoriteIds: [],
      recentSearches: [],
      recentViewIds: [],
      lastKnownLocation: null,
      filters: defaultFilters,

      setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),

      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((fid) => fid !== id)
            : [id, ...state.favoriteIds],
        })),

      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [query, ...state.recentSearches.filter((s) => s !== query)].slice(0, 6),
        })),

      addRecentView: (id) =>
        set((state) => ({
          recentViewIds: [id, ...state.recentViewIds.filter((v) => v !== id)].slice(0, 8),
        })),

      setLastKnownLocation: (location) => set({ lastKnownLocation: location }),

      setFilters: (filters) => set({ filters }),

      resetFilters: () => set({ filters: defaultFilters }),
    }),
    {
      name: 'herceg-novi-guide:store:v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasSeenOnboarding: state.hasSeenOnboarding,
        favoriteIds: state.favoriteIds,
        recentSearches: state.recentSearches,
        recentViewIds: state.recentViewIds,
        lastKnownLocation: state.lastKnownLocation,
      }),
    },
  ),
);
