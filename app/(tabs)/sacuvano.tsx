import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

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
  const savedPlaces = getAllPlaces().filter((p) => favoriteIds.includes(p.id));

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="title">{appCopy.savedTitle}</AppText>
        {savedPlaces.length > 0 ? (
          <AppText tone="muted" variant="caption">{savedPlaces.length} sačuvano</AppText>
        ) : null}
      </View>
      {savedPlaces.length ? (
        <View style={styles.grid}>
          {savedPlaces.map((place, i) => (
            <PlaceListItem key={place.id} index={i} onPress={() => router.push(`/mjesto/${place.slug}` as never)} onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })} place={place} />
          ))}
        </View>
      ) : (
        <EmptyState body={appCopy.savedEmptyBody} icon="heart-outline" title={appCopy.savedEmptyTitle} actionLabel="Istraži mjesta" onPressAction={() => router.push('/(tabs)/istrazi' as never)} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.sm, gap: spacing.xs },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
});
