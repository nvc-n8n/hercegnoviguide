import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { colors, radii, spacing } from '@/src/theme';
import type { ImageSource } from 'expo-image';
import type { HeroVariant } from '@/src/types/place';

type HeroCardProps = {
  title: string;
  subtitle: string;
  badge?: string;
  variant?: HeroVariant;
  imageSource?: ImageSource;
};

export const HeroCard = ({ title, subtitle, badge, imageSource }: HeroCardProps) => (
  <View style={styles.card} accessible={true} accessibilityLabel={`${badge ? badge + ', ' : ''}${title}, ${subtitle}`}>
    {imageSource ? (
      <Image source={imageSource} style={StyleSheet.absoluteFill} contentFit="cover" transition={400} />
    ) : null}
    <LinearGradient
      colors={['transparent', 'rgba(27,42,74,0.65)']}
      locations={[0.35, 1]}
      style={StyleSheet.absoluteFill}
    />
    <View style={styles.content}>
      {badge ? (
        <View style={styles.badge}>
          <AppText style={styles.badgeText} tone="inverse" variant="caption">{badge}</AppText>
        </View>
      ) : null}
      <AppText style={styles.title} tone="inverse" variant="hero">{title}</AppText>
      <View style={styles.locationRow}>
        <Ionicons color={colors.white} name="location" size={14} />
        <AppText style={styles.subtitle} tone="inverse" variant="body">{subtitle}</AppText>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    height: 260,
    overflow: 'hidden',
    backgroundColor: colors.primaryLight,
    marginHorizontal: -spacing.xl,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontFamily: 'Manrope_600SemiBold',
    letterSpacing: 0.5,
  },
  title: {
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    opacity: 0.9,
  },
  subtitle: {
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
