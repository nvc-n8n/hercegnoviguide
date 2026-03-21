import { useEffect, useMemo, useState } from 'react';

import { searchPlaces } from '@/src/services/places';
import type { Place } from '@/src/types/place';

export const usePlaceSearch = (debounceMs = 250) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const results: Place[] = useMemo(
    () => (debouncedQuery.trim() ? searchPlaces(debouncedQuery) : []),
    [debouncedQuery],
  );

  return { query, setQuery, results, isSearching: query !== debouncedQuery };
};
