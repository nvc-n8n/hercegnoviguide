import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

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
      <View style={styles.header} accessible={true} accessibilityLabel="Explore section">
        <AppText serif variant="title">
          Istraži po ritmu dana
        </AppText>
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
            <View style={styles.list}>
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
          {/* ── TIME OF DAY SECTION ── */}
          <View style={styles.section}>
            <SectionHeader subtitle="Pronađi mjesta po vremenu dana" title="Po ritmu dana" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeOfDayRail}>
              <TimeOfDayChip label="Ujutro" icon="sunrise-outline" onPress={() => router.push('/kategorija/cafes' as never)} />
              <TimeOfDayChip label="Doručak" icon="cafe-outline" onPress={() => router.push('/kategorija/cafes' as never)} />
              <TimeOfDayChip label="Ručak" icon="restaurant-outline" onPress={() => router.push('/kategorija/restaurants' as never)} />
              <TimeOfDayChip label="Popodne" icon="water-outline" onPress={() => router.push('/kategorija/beaches' as never)} />
              <TimeOfDayChip label="Večera" icon="star-outline" onPress={() => router.push('/kategorija/restaurants' as never)} />
              <TimeOfDayChip label="Noć" icon="moon-outline" onPress={() => router.push('/kategorija/nightlife' as never)} />
            </ScrollView>
          </View>

          {/* ── CATEGORIES SECTION ── */}
          <View style={styles.section}>
            <SectionHeader subtitle="Ili biraj direktno" title="Sve kategorije" />
            <View style={styles.grid}>
              {categories.map((category) => (
                <View key={category.key} style={styles.gridItem}>
                  <CategoryChip
                    icon={category.icon as never}
                    label={category.title}
                    onPress={() => router.push(`/kategorija/${category.key}` as never)}
                    tint={category.color}
                  />
                </View>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <SectionHeader subtitle="Brz ulaz u provjerene gradske rute." title="Popularna mjesta" />
            <View style={styles.list}>
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

function TimeOfDayChip({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.timeChip, pressed && styles.timeChipPressed]}
      accessible={true}
      accessibilityRole="link"
      accessibilityLabel={label}>
      <View style={styles.timeChipContent}>
        <AppText style={styles.timeChipText} variant="label">
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  timeOfDayRail: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  timeChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeChipPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  timeChipContent: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  timeChipText: {
    color: colors.primary,
    fontFamily: 'Manrope_600SemiBold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gridItem: {
    width: '47%',
  },
  section: {
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
});
