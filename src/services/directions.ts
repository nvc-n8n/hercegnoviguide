import { Linking, Platform } from 'react-native';

import type { DirectionsTarget } from '@/src/types/place';

export const buildAppleMapsUrl = ({ title, lat, lng }: DirectionsTarget) =>
  `http://maps.apple.com/?q=${encodeURIComponent(title)}&daddr=${lat},${lng}`;

export const buildGoogleNavigationUrl = ({ lat, lng }: DirectionsTarget) => `google.navigation:q=${lat},${lng}`;

export const buildGoogleMapsUrl = ({ lat, lng }: DirectionsTarget) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

export const openDirections = async (target: DirectionsTarget) => {
  try {
    const browserFallback = buildGoogleMapsUrl(target);

    if (Platform.OS === 'ios') {
      const appleMapsUrl = buildAppleMapsUrl(target);
      try {
        const canOpenAppleMaps = await Linking.canOpenURL(appleMapsUrl);
        if (canOpenAppleMaps) {
          await Linking.openURL(appleMapsUrl);
          return;
        }
      } catch {
        // Fallback to browser if Apple Maps fails
      }

      await Linking.openURL(browserFallback);
      return;
    }

    const googleNavigationUrl = buildGoogleNavigationUrl(target);
    try {
      const canOpenGoogleNavigation = await Linking.canOpenURL(googleNavigationUrl);
      if (canOpenGoogleNavigation) {
        await Linking.openURL(googleNavigationUrl);
        return;
      }
    } catch {
      // Fallback to browser if Google Navigation fails
    }

    await Linking.openURL(browserFallback);
  } catch (error) {
    console.error('Failed to open directions:', error);
    // Fail silently - user can manually open maps
  }
};
