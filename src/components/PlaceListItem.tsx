import { memo } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { getHeroImageUri } from '@/src/constants/heroImages';
import { formatDistance } from '@/src/lib/format';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place } from '@/src/types/place';

type PlaceListItemProps = {
  place: Place & { distanceMeters?: number | null };
  onPress: () => void;
  onPressDirections: () => void;
  index?: number;
};

export const PlaceListItem = memo(({ place, onPress, onPressDirections, index = 0 }: PlaceListItemProps) => {
  const thumbUri = getHeroImageUri(place.id, place.category);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const cardWidth = isTablet ? (width - spacing.xl * 2 - spacing.md) / 2 : width - spacing.xl * 2;

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={place.title}
      onPress={onPress}
      style={({ pressed }) => [styles.card, { width: cardWidth }, pressed && styles.pressed]}>

      {/* Big image */}
      <View style={styles.imageWrap}>
        {thumbUri ? (
          <Image source={thumbUri} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons color={colors.primary} name="image-outline" size={28} />
          </View>
        )}

        {/* Rating badge */}
        {place.rating ? (
          <View style={styles.ratingBadge}>
            <Ionicons color="#FFD700" name="star" size={11} />
            <AppText style={styles.ratingText} tone="inverse" variant="caption">{place.rating.toFixed(1)}</AppText>
          </View>
        ) : null}

        {/* Directions button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Uputstva"
          onPress={onPressDirections}
          style={styles.dirBtn}>
          <Ionicons color={colors.white} name="navigate" size={14} />
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <AppText style={styles.title} numberOfLines={1} variant="subheading">{place.title}</AppText>
        <View style={styles.locationRow}>
          <Ionicons color={colors.primary} name="location" size={12} />
          <AppText numberOfLines={1} tone="muted" variant="caption">{place.address}</AppText>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageWrap: {
    height: 140,
    backgroundColor: colors.primaryLight,
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(45,55,72,0.65)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  ratingText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
  },
  dirBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  title: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
