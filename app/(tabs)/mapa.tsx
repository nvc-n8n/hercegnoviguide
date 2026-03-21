import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { MapSheet } from '@/src/features/map/MapSheet';
import { useLocation } from '@/src/hooks/useLocation';
import { getAllPlaces } from '@/src/services/places';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place } from '@/src/types/place';
import { categoryByKey } from '@/src/constants/categories';

const HERCEG_NOVI_CENTER = { latitude: 42.4531, longitude: 18.5375 };

export default function MapScreen() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { requestLocation } = useLocation();
  const lastKnownLocation = useAppStore((s) => s.lastKnownLocation);
  const places = getAllPlaces();

  // Use lastKnownLocation if available, otherwise default to city center
  const initialCamera = lastKnownLocation
    ? { coordinates: { latitude: lastKnownLocation.latitude, longitude: lastKnownLocation.longitude }, zoom: 15 }
    : { coordinates: HERCEG_NOVI_CENTER, zoom: 14 };

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView edges={['top']} style={styles.safe} accessible={true} accessibilityLabel="Mapa dostupna samo na mobilnim uređajima">
        <View style={styles.fallback}>
          <Ionicons color={colors.primary} name="map-outline" size={48} />
          <AppText serif variant="heading">
            Mapa
          </AppText>
          <AppText tone="muted">Mapa je dostupna samo na mobilnim uređajima.</AppText>
        </View>
      </SafeAreaView>
    );
  }

  let ExpoMaps: any;
  try { ExpoMaps = require('expo-maps'); } catch { return null; }
  const isIOS = Platform.OS === 'ios';

  const markers = places.map((place) => ({
    coordinates: { latitude: place.lat, longitude: place.lng },
    title: place.title,
    tintColor: categoryByKey[place.category]?.color ?? colors.primary,
    id: place.id,
  }));

  const MapComponent = isIOS ? ExpoMaps.AppleMaps?.View : ExpoMaps.GoogleMaps?.View;

  if (!MapComponent) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.fallback} accessible={true} accessibilityLabel="Map unavailable">
          <Ionicons color={colors.primary} name="map-outline" size={48} />
          <AppText serif variant="heading">Mapa</AppText>
          <AppText tone="muted">Mapa nije dostupna na ovom uređaju.</AppText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <MapComponent
        cameraPosition={initialCamera}
        markers={markers}
        onMarkerClick={(event: { id?: string; title?: string }) => {
          const place = places.find((p) => p.id === event.id || p.title === event.title);
          if (place) setSelectedPlace(place);
        }}
        style={StyleSheet.absoluteFill}
        uiSettings={{ compassEnabled: true, myLocationButtonEnabled: false }}
      />

      <SafeAreaView edges={['top']} style={styles.overlay} pointerEvents="box-none">
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Show my location"
          onPress={requestLocation}
          style={({ pressed }) => [styles.locationButton, pressed && styles.locationButtonPressed]}>
          <Ionicons color={colors.primary} name="locate-outline" size={22} />
        </Pressable>
      </SafeAreaView>

      {selectedPlace ? (
        <MapSheet place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    alignItems: 'flex-end',
    padding: spacing.lg,
  },
  locationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  locationButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
});
