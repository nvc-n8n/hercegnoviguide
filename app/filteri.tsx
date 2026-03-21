import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { FilterChips } from '@/src/components/FilterChips';
import { Screen } from '@/src/components/Screen';
import { useLocation } from '@/src/hooks/useLocation';
import { useAppStore } from '@/src/store/useAppStore';
import { spacing } from '@/src/theme';
import type { SortOption } from '@/src/types/place';

const sortOptions: Array<{ key: SortOption; label: string }> = [
  { key: 'recommended', label: 'Preporučeno' },
  { key: 'nearest', label: 'Najbliže' },
  { key: 'rating', label: 'Najbolje ocijenjeno' },
  { key: 'alphabetical', label: 'A–Š' },
];

export default function FiltersScreen() {
  const filters = useAppStore((s) => s.filters);
  const setFilters = useAppStore((s) => s.setFilters);
  const resetFilters = useAppStore((s) => s.resetFilters);
  const { requestLocation } = useLocation();

  const toggle = async (key: Exclude<keyof typeof filters, 'sort'>) => {
    const nextValue = !filters[key];

    if (key === 'nearby' && nextValue) {
      await requestLocation();
    }

    setFilters({
      ...filters,
      [key]: nextValue,
    });
  };

  return (
    <Screen>
      <View style={styles.header} accessible={true} accessibilityLabel="Filters section">
        <AppText serif variant="title">
          Filteri
        </AppText>
        <AppText tone="muted" variant="bodyLarge">
          Prilagodite rezultate prema trenutnom planu: plaža, večera, porodica ili blizina.
        </AppText>
      </View>
      <FilterChips filters={filters} onToggle={toggle} />
      <View style={styles.sortWrap}>
        <AppText serif variant="subheading">
          Sortiranje
        </AppText>
        <View style={styles.sortButtons}>
          {sortOptions.map((option) => (
            <ActionButton
              key={option.key}
              label={option.label}
              onPress={() => setFilters({ ...filters, sort: option.key })}
              variant={filters.sort === option.key ? 'primary' : 'ghost'}
            />
          ))}
        </View>
      </View>
      <View style={styles.actions}>
        <ActionButton label="Resetuj" onPress={resetFilters} variant="ghost" />
        <ActionButton label="Primijeni" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  sortWrap: {
    gap: spacing.md,
  },
  sortButtons: {
    gap: spacing.sm,
  },
  actions: {
    gap: spacing.md,
  },
});
