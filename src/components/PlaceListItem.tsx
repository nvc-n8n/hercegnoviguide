import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { getHeroImageUri } from '@/src/constants/heroImages';
import { formatDistance } from '@/src/lib/format';
import { colors, radii, spacing } from '@/src/theme';
import { categoryByKey } from '@/src/constants/categories';
import type { Place } from '@/src/types/place';

type PlaceListItemProps = {
  place: Place & { distanceMeters?: number | null };
  onPress: () => void;
  onPressDirections: () => void;
  index?: number;
};

export const PlaceListItem = memo(({ place, onPress, onPressDirections, index = 0 }: PlaceListItemProps) => {
  const thumbUri = getHeroImageUri(place.id, place.category);
  const categoryColor = categoryByKey[place.category]?.color || colors.primary;

  return (
    <View style={[styles.row, { borderLeftColor: categoryColor }]}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={place.title}
        onPress={onPress}
        style={({ pressed }) => [styles.mainArea, pressed && styles.pressed]}>
        {thumbUri ? (
          <Image source={thumbUri} style={styles.thumb} contentFit="cover" transition={200} />
        ) : (
          <View style={styles.thumbFallback}>
            <Ionicons color={colors.primary} name="location-outline" size={20} />
          </View>
        )}
        <View style={styles.content}>
          <AppText style={styles.title} variant="bodyLarge" numberOfLines={1}>
            {place.title}
          </AppText>
          <AppText numberOfLines={1} tone="muted" variant="label">
            {place.address}
          </AppText>
          <View style={styles.meta}>
            {place.distanceMeters != null ? (
              <View style={styles.metaPill}>
                <Ionicons color={colors.primary} name="navigate-outline" size={11} />
                <AppText tone="soft" variant="caption">
                  {formatDistance(place.distanceMeters)}
                </AppText>
              </View>
            ) : null}
            {place.rating ? (
              <View style={styles.metaPill}>
                <Ionicons color={colors.warning} name="star" size={11} />
                <AppText tone="soft" variant="caption">
                  {place.rating.toFixed(1)}
                </AppText>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Uputstva" onPress={onPressDirections} style={styles.cta}>
        <Ionicons color={colors.primary} name="navigate-outline" size={20} />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  mainArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  pressed: {
    opacity: 0.92,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: radii.lg,
    shadowColor: '#1F3C4D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  thumbFallback: {
    width: 72,
    height: 72,
    borderRadius: radii.lg,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
  },
  meta: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 2,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  cta: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
