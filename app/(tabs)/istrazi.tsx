import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { CategoryChip } from '@/src/components/CategoryChip';
import { PlaceListItem } from '@/src/components/PlaceListItem';
import { SearchInput } from '@/src/components/SearchInput';
import { Screen } from '@/src/components/Screen';
import { SectionHeader } from '@/src/components/SectionHeader';
import { EmptyState } from '@/src/components/EmptyState';
import { categories } from '@/src/constants/categories';
import { appCopy } from '@/src/constants/copy';
import { usePlaceSearch } from '@/src/hooks/usePlaceSearch';
import { openDirections } from '@/src/services/directions';
import { getPopularPlaces } from '@/src/services/places';
import { colors, radii, spacing } from '@/src/theme';

export default function ExploreScreen() {
  const popularPlaces = getPopularPlaces();
  const { query, setQuery, results } = usePlaceSearch();
  const isSearching = query.trim().length > 0;

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="title">Istraži</AppText>
        <SearchInput
          value={query}
          placeholder={appCopy.searchPlaceholder}
          onChangeText={setQuery}
          onOpenFilters={() => router.push('/filteri' as never)}
        />
      </View>

      {isSearching ? (
        <View style={styles.section}>
          <SectionHeader title={`Rezultati (${results.length})`} />
          {results.length > 0 ? (
            <View style={styles.popularGrid}>
              {results.map((place, index) => (
                <PlaceListItem
                  key={place.id}
                  index={index}
                  onPress={() => router.push(`/mjesto/${place.slug}` as never)}
                  onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
                  place={place}
                />
              ))}
            </View>
          ) : (
            <EmptyState body={appCopy.searchEmptyBody} title={appCopy.searchEmptyTitle} />
          )}
        </View>
      ) : (
        <>
          {/* Quick filters */}
          <View style={styles.section}>
            <SectionHeader title="Po ritmu dana" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRail}>
              <QuickChip label="Ujutro" icon="sunny-outline" onPress={() => router.push('/kategorija/cafes' as never)} />
              <QuickChip label="Doručak" icon="cafe-outline" onPress={() => router.push('/kategorija/cafes' as never)} />
              <QuickChip label="Plaže" icon="water-outline" onPress={() => router.push('/kategorija/beaches' as never)} />
              <QuickChip label="Večera" icon="restaurant-outline" onPress={() => router.push('/kategorija/restaurants' as never)} />
              <QuickChip label="Noć" icon="moon-outline" onPress={() => router.push('/kategorija/nightlife' as never)} />
            </ScrollView>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <SectionHeader title="Kategorije" actionLabel="Sve" />
            <View style={styles.grid}>
              {categories.map((category) => (
                <CategoryChip
                  key={category.key}
                  emoji={category.emoji}
                  label={category.title}
                  onPress={() => router.push(`/kategorija/${category.key}` as never)}
                />
              ))}
            </View>
          </View>

          {/* Popular */}
          <View style={styles.section}>
            <SectionHeader title="Popularno" />
            <View style={styles.popularGrid}>
              {popularPlaces.map((place, index) => (
                <PlaceListItem
                  key={place.id}
                  index={index}
                  onPress={() => router.push(`/mjesto/${place.slug}` as never)}
                  onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
                  place={place}
                />
              ))}
            </View>
          </View>
        </>
      )}
    </Screen>
  );
}

function QuickChip({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.quickChip, pressed && styles.quickChipPressed]}>
      <Ionicons color={colors.primary} name={icon as never} size={16} />
      <AppText style={styles.quickChipText} variant="caption">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  chipRail: {
    gap: spacing.sm,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickChipPressed: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  quickChipText: {
    fontFamily: 'Manrope_500Medium',
    color: colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
  },
  gridItem: {},
  section: {
    gap: spacing.md,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});
