import { ScrollView, StyleSheet, View } from 'react-native';

import { ActionButton } from '@/src/components/ActionButton';
import { colors, spacing } from '@/src/theme';
import type { PlaceFilters } from '@/src/types/place';

type FilterChipsProps = {
  filters: PlaceFilters;
  onToggle: (key: keyof Omit<PlaceFilters, 'sort'>) => void;
};

const labels: Array<{ key: keyof Omit<PlaceFilters, 'sort'>; label: string }> = [
  { key: 'openNow', label: 'Otvoreno sad' },
  { key: 'topRated', label: 'Najbolje ocijenjeno' },
  { key: 'nearby', label: 'Blizu mene' },
  { key: 'family', label: 'Porodice' },
  { key: 'nightlife', label: 'Noćni život' },
  { key: 'beaches', label: 'Plaže' },
  { key: 'culture', label: 'Kultura' },
  { key: 'food', label: 'Hrana' },
];

export const FilterChips = ({ filters, onToggle }: FilterChipsProps) => (
  <ScrollView contentContainerStyle={styles.content} horizontal showsHorizontalScrollIndicator={false}>
    {labels.map((item) => (
      <View key={item.key} style={styles.buttonWrap}>
        <ActionButton
          label={item.label}
          onPress={() => onToggle(item.key)}
          variant={filters[item.key] ? 'primary' : 'ghost'}
        />
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
  },
  buttonWrap: {
    borderColor: colors.border,
  },
});
