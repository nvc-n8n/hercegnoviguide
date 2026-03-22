import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { colors, radii, spacing } from '@/src/theme';

type MapPreviewProps = {
  title: string;
  lat: number;
  lng: number;
  address: string;
};

export const MapPreview = ({ title, lat, lng, address }: MapPreviewProps) => {
  return (
    <View style={styles.fallback} accessible={true} accessibilityLabel={`Location: ${title}`} accessibilityHint={address}>
      <Ionicons color={colors.primary} name="map-outline" size={26} />
      <AppText style={styles.fallbackTitle} variant="bodyLarge">
        {title}
      </AppText>
      <AppText tone="muted" variant="label">
        {address}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
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
