import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { EmptyState } from '@/src/components/EmptyState';
import { PlaceListItem } from '@/src/components/PlaceListItem';
import { Screen } from '@/src/components/Screen';
import { appCopy } from '@/src/constants/copy';
import { openDirections } from '@/src/services/directions';
import { getAllPlaces } from '@/src/services/places';
import { useAppStore } from '@/src/store/useAppStore';
import { spacing } from '@/src/theme';

export default function SavedScreen() {
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const savedPlaces = getAllPlaces().filter((place) => favoriteIds.includes(place.id));

  return (
    <Screen>
      <View style={styles.header} accessible={true} accessibilityLabel="Saved places section">
        <AppText serif variant="title">
          {appCopy.savedTitle}
        </AppText>
        <AppText tone="muted" variant="bodyLarge">
          Brz pristup mjestima koja ste sačuvali za kasnije.
        </AppText>
      </View>
      {savedPlaces.length ? (
        <View style={styles.list}>
          {savedPlaces.map((place, index) => (
            <PlaceListItem
              key={place.id}
              index={index}
              onPress={() => router.push(`/mjesto/${place.slug}` as never)}
              onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
              place={place}
            />
          ))}
        </View>
      ) : null}
      {!savedPlaces.length ? (
        <View style={styles.emptyContainer}>
          <EmptyState body={appCopy.savedEmptyBody} icon="heart-outline" title={appCopy.savedEmptyTitle} />
          <ActionButton label="Počni istraživanje" onPress={() => router.push('/(tabs)/istrazi' as never)} />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  emptyContainer: {
    gap: spacing.lg,
  },
});
