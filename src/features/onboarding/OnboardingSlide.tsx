import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AppText } from '@/src/components/AppText';
import { gradients, radii, spacing } from '@/src/theme';
import type { HeroVariant } from '@/src/types/place';

type OnboardingSlideProps = {
  title: string;
  body: string;
  index: number;
  variant: HeroVariant;
};

export const OnboardingSlide = ({ title, body, index, variant }: OnboardingSlideProps) => (
  <LinearGradient colors={gradients[variant]} style={styles.card}>
    <View style={styles.indexWrap}>
      <AppText style={styles.indexText} tone="inverse" variant="caption">
        0{index}
      </AppText>
    </View>
    <AppText serif style={styles.title} tone="inverse" variant="title">
      {title}
    </AppText>
    <AppText style={styles.body} tone="inverse" variant="bodyLarge">
      {body}
    </AppText>
  </LinearGradient>
);

const styles = StyleSheet.create({
  card: {
    minHeight: 260,
    borderRadius: radii.xl,
    padding: spacing.xxl,
    justifyContent: 'flex-end',
  },
  indexWrap: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.16)',
    marginBottom: spacing.xl,
  },
  indexText: {
    fontFamily: 'Manrope_700Bold',
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
  },
  body: {
    marginTop: spacing.md,
  },
});
