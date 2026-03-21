import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInDown } from 'react-native-reanimated';

import { AppText } from '@/src/components/AppText';
import { colors, radii, spacing } from '@/src/theme';

type MapPreviewProps = {
  title: string;
  lat: number;
  lng: number;
  address: string;
};

export const MapPreview = ({ title, lat, lng, address }: MapPreviewProps) => {
  if (Platform.OS === 'web') {
    return (
      <Animated.View entering={SlideInDown.duration(400)} style={styles.fallback} accessible={true} accessibilityLabel={`Location: ${title}`} accessibilityHint={address}>
        <Ionicons color={colors.primary} name="map-outline" size={26} />
        <AppText style={styles.fallbackTitle} variant="bodyLarge">
          {title}
        </AppText>
        <AppText tone="muted" variant="label">
          {address}
        </AppText>
      </Animated.View>
    );
  }

  let ExpoMaps: any;
  try { ExpoMaps = require('expo-maps'); } catch { return null; }

  if (Platform.OS === 'ios') {
    const { AppleMaps } = ExpoMaps;
    return (
      <Animated.View entering={SlideInDown.duration(400)} accessible={true} accessibilityLabel={`Map showing ${title}`} accessibilityHint={address}>
        <AppleMaps.View
          cameraPosition={{ coordinates: { latitude: lat, longitude: lng }, zoom: 15 }}
          markers={[{ coordinates: { latitude: lat, longitude: lng }, title, tintColor: colors.secondary }]}
          style={styles.map}
          uiSettings={{ compassEnabled: false, scaleBarEnabled: false, myLocationButtonEnabled: false }}
        />
      </Animated.View>
    );
  }

  const { GoogleMaps } = ExpoMaps;
  return (
    <Animated.View entering={SlideInDown.duration(400)} accessible={true} accessibilityLabel={`Map showing ${title}`} accessibilityHint={address}>
      <GoogleMaps.View
        cameraPosition={{ coordinates: { latitude: lat, longitude: lng }, zoom: 15 }}
        markers={[{ coordinates: { latitude: lat, longitude: lng }, title }]}
        style={styles.map}
        uiSettings={{ compassEnabled: false, mapToolbarEnabled: false, myLocationButtonEnabled: false }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 180,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  fallback: {
    height: 180,
    borderRadius: radii.lg,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  fallbackTitle: {
    marginTop: spacing.md,
    fontFamily: 'Manrope_700Bold',
  },
});
