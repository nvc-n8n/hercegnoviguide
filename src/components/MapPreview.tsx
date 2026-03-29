import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { colors, radii, shadows, spacing } from '@/src/theme';

type MapPreviewProps = {
  title: string;
  lat: number;
  lng: number;
  address: string;
};

export const MapPreview = ({ title, lat, lng, address }: MapPreviewProps) => (
  <View style={styles.card} accessible={true} accessibilityLabel={`Location: ${title}`} accessibilityHint={address}>
    <View style={styles.iconCircle}>
      <Ionicons color={colors.primary} name="map" size={24} />
    </View>
    <AppText style={styles.title} variant="body">{title}</AppText>
    <View style={styles.locationRow}>
      <Ionicons color={colors.primary} name="location" size={12} />
      <AppText tone="muted" variant="caption">{address}</AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    height: 140,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.soft,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Manrope_600SemiBold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
