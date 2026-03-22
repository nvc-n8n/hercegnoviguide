import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { getHeroImageUri } from '@/src/constants/heroImages';
import { formatCategory, formatDistance } from '@/src/lib/format';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place } from '@/src/types/place';

type PlaceCardProps = {
  place: Place & { distanceMeters?: number | null };
  isSaved: boolean;
  onPress: () => void;
  onPressSave: () => void;
  onPressDirections: () => void;
};

export const PlaceCard = memo(({ place, isSaved, onPress, onPressSave, onPressDirections }: PlaceCardProps) => {
  const heroUri = getHeroImageUri(place.id, place.category);
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleCardPressIn = () => {
    cardScale.value = withSpring(0.96, { damping: 18, stiffness: 180 });
    cardOpacity.value = withSpring(0.92, { damping: 18, stiffness: 180 });
  };

  const handleCardPressOut = () => {
    cardScale.value = withSpring(1, { damping: 18, stiffness: 180 });
    cardOpacity.value = withSpring(1, { damping: 18, stiffness: 180 });
  };

  const handlePressSave = () => {
    heartScale.value = withSpring(0, { damping: 12, stiffness: 100 });
    heartScale.value = withSpring(1.3, { damping: 12, stiffness: 100 });
    heartScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    onPressSave();
  };

  return (
    <Animated.View entering={FadeInUp.duration(280)} style={[styles.wrap, cardAnimStyle]}>
      <Pressable
        onPressIn={handleCardPressIn}
        onPressOut={handleCardPressOut}
        accessible={false}
        style={styles.pressWrap}>
        <View style={styles.card}>
          {/* Image area — taps navigate to detail */}
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={place.title}
            onPress={onPress}
            style={({ pressed }) => [styles.imageWrap, pressed && styles.imagePressed]}>
          {heroUri ? (
            <Image source={heroUri} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
          ) : null}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            locations={[0.25, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroContent}>
            <View style={styles.topRow}>
              <View style={styles.pill}>
                <AppText style={styles.pillText} tone="inverse" variant="caption">
                  {formatCategory(place.category)}
                </AppText>
              </View>
            </View>
            <View style={styles.heroBottom}>
              <AppText serif style={styles.title} tone="inverse" variant="heading">
                {place.title}
              </AppText>
              <AppText style={styles.address} tone="inverse" numberOfLines={1} variant="label">
                {place.address}
              </AppText>
            </View>
          </View>
        </Pressable>

        {/* Save button — floated over image, outside the image Pressable */}
        <Animated.View style={[styles.heartBtn, heartAnimStyle]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sačuvaj mjesto"
            onPress={handlePressSave}>
            <Ionicons color={colors.white} name={isSaved ? 'heart' : 'heart-outline'} size={20} />
          </Pressable>
        </Animated.View>

        {/* Content area */}
        <Pressable
          accessibilityRole="link"
          onPress={onPress}
          style={styles.content}>
          <View style={styles.metaRow}>
            {place.rating ? (
              <View style={styles.metaPill}>
                <Ionicons color={colors.warning} name="star" size={13} />
                <AppText style={styles.metaText} variant="caption">
                  {place.rating.toFixed(1)}
                </AppText>
              </View>
            ) : null}
            {place.distanceMeters != null ? (
              <View style={styles.metaPill}>
                <Ionicons color={colors.primary} name="navigate-outline" size={13} />
                <AppText style={styles.metaText} variant="caption">
                  {formatDistance(place.distanceMeters)}
                </AppText>
              </View>
            ) : null}
          </View>
          <AppText style={styles.description} tone="muted" numberOfLines={2}>
            {place.description}
          </AppText>
        </Pressable>

        {/* Directions button — separate, not nested */}
        <View style={styles.actionWrap}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Uputstva"
            onPress={onPressDirections}
            style={({ pressed }) => [styles.dirBtn, pressed && styles.dirBtnPressed]}>
            <Ionicons color={colors.white} name="navigate-outline" size={16} />
            <AppText style={styles.dirLabel} tone="inverse" variant="body">
              Uputstva
            </AppText>
          </Pressable>
        </View>
      </View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    width: 280,
  },
  pressWrap: {
    width: '100%',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  imageWrap: {
    aspectRatio: 3 / 2,
    overflow: 'hidden',
  },
  imagePressed: {
    opacity: 0.92,
  },
  heroContent: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  pillText: {
    fontFamily: 'Manrope_700Bold',
    letterSpacing: 0.3,
  },
  heartBtn: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  heroBottom: {
    gap: spacing.xs,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
  },
  address: {
    opacity: 0.85,
    maxWidth: '92%',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(212,168,92,0.15)',
  },
  metaText: {
    fontFamily: 'Manrope_700Bold',
  },
  description: {
    lineHeight: 20,
  },
  actionWrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  dirBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.secondary,
  },
  dirBtnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  dirLabel: {
    fontFamily: 'Manrope_700Bold',
  },
});
