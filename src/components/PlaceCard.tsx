import { memo } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { getHeroImageUri } from '@/src/constants/heroImages';
import { formatCategory } from '@/src/lib/format';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place } from '@/src/types/place';

type PlaceCardProps = {
  place: Place & { distanceMeters?: number | null };
  isSaved: boolean;
  onPress: () => void;
  onPressSave: () => void;
  onPressDirections: () => void;
  fullWidth?: boolean;
};

export const PlaceCard = memo(({ place, isSaved, onPress, onPressSave, fullWidth }: PlaceCardProps) => {
  const heroUri = getHeroImageUri(place.id, place.category);
  const { width: screenW } = useWindowDimensions();
  const isTablet = screenW >= 768;

  const cardWidth = fullWidth
    ? (screenW - spacing.xl * 2 - spacing.md) / 2
    : isTablet
    ? (screenW - spacing.xl * 2 - spacing.md) / 2
    : 220;

  return (
    <View style={[styles.wrap, { width: cardWidth as number }]}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={place.title}
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>

        <View style={[styles.imageWrap, isTablet && styles.imageWrapTablet]}>
          {heroUri ? (
            <Image source={heroUri} style={StyleSheet.absoluteFill} contentFit="cover" cachePolicy="memory-disk" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons color={colors.primary} name="image-outline" size={28} />
            </View>
          )}

          {place.rating ? (
            <View style={styles.ratingBadge}>
              <Ionicons color="#FFD700" name="star" size={12} />
              <AppText style={styles.ratingText} tone="inverse" variant="caption">
                {place.rating.toFixed(1)}
              </AppText>
            </View>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sačuvaj"
            onPress={onPressSave}
            style={styles.heartBtn}>
            <Ionicons
              color={isSaved ? colors.secondary : colors.white}
              name={isSaved ? 'heart' : 'heart-outline'}
              size={18}
            />
          </Pressable>
        </View>

        <View style={styles.content}>
          <AppText style={styles.title} numberOfLines={1} variant="subheading">
            {place.title}
          </AppText>
          <View style={styles.locationRow}>
            <Ionicons color={colors.primary} name="location" size={12} />
            <AppText tone="muted" numberOfLines={1} variant="caption" style={styles.address}>
              {place.address}
            </AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    width: 220,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPressed: {
    opacity: 0.85,
  },
  imageWrap: {
    height: 160,
    backgroundColor: colors.primaryLight,
  },
  imageWrapTablet: {
    height: 220,
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
    backgroundColor: 'rgba(27,42,74,0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  ratingText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
  },
  heartBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(27,42,74,0.35)',
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
  address: {
    flex: 1,
    fontSize: 10,
  },
});
