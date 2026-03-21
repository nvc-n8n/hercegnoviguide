import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

import { AppText } from '@/src/components/AppText';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { HeroVariant } from '@/src/types/place';

type HeroCardProps = {
  title: string;
  subtitle: string;
  badge?: string;
  variant?: HeroVariant;
  imageUri?: string;
};

export const HeroCard = ({ title, subtitle, badge, imageUri }: HeroCardProps) => (
  <View style={styles.card} accessible={true} accessibilityLabel={`${badge ? badge + ', ' : ''}${title}, ${subtitle}`}>
    {imageUri ? (
      <Image source={{ uri: imageUri }} style={StyleSheet.absoluteFill} contentFit="cover" transition={400} />
    ) : null}
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.65)']}
      locations={[0.25, 1]}
      style={StyleSheet.absoluteFill}
    />
    <View style={styles.content}>
      {badge ? (
        <View style={[styles.badge, { backgroundColor: `${colors.primary}33` }]}>
          <AppText style={styles.badgeText} tone="inverse" variant="caption">
            {badge.toUpperCase()}
          </AppText>
        </View>
      ) : null}
      <AppText serif style={styles.title} tone="inverse" variant="hero">
        {title}
      </AppText>
      <AppText style={styles.subtitle} tone="inverse" variant="bodyLarge">
        {subtitle}
      </AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    minHeight: 320,
    overflow: 'hidden',
    ...shadows.card,
  },
  content: {
    flex: 1,
    padding: spacing.xxl,
    justifyContent: 'flex-end',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    marginBottom: spacing.xl,
  },
  badgeText: {
    fontFamily: 'Manrope_700Bold',
    letterSpacing: 1,
    fontSize: 11,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    marginTop: spacing.sm,
    maxWidth: '90%',
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
