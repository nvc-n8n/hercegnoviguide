import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '@/src/components/AppText';
import { categoryFallbackImages } from '@/src/constants/heroImages';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, spacing } from '@/src/theme';

const slides = [
  {
    key: 'discover',
    image: categoryFallbackImages.viewpoints,
    title: 'Otkrijte grad\nna obali zaliva',
    body: 'Atrakcije, plaže, hrana i večernja mjesta — sve na jednom mjestu, bez reklama i bez interneta.',
  },
  {
    key: 'navigate',
    image: `${categoryFallbackImages.beaches}?w=1400&h=900&fit=crop&q=80`,
    title: 'Od ideje do mape\nza sekunde',
    body: 'Dodirnite Uputstva na bilo kojem mjestu i navigacija se otvara odmah.',
  },
  {
    key: 'save',
    image: `${categoryFallbackImages.nightlife}?w=1400&h=900&fit=crop&q=80`,
    title: 'Sačuvajte plan\nza savršen dan',
    body: 'Označite omiljene lokacije i napravite plan za jutro, popodne ili veče.',
  },
];

export default function OnboardingScreen() {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const setHasSeenOnboarding = useAppStore((s) => s.setHasSeenOnboarding);

  // Phase: 'intro' → 'slides'
  const [phase, setPhase] = useState<'intro' | 'slides'>('intro');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // Intro animations
  const introScale = useSharedValue(0.85);
  const introOpacity = useSharedValue(0);
  const lineWidth = useSharedValue(0);

  useEffect(() => {
    // Animate intro in
    introOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    introScale.value = withDelay(300, withSpring(1, { damping: 20, stiffness: 90 }));
    lineWidth.value = withDelay(1200, withTiming(60, { duration: 600 }));

    // Transition to slides after intro
    const timer = setTimeout(() => setPhase('slides'), 3200);
    return () => clearTimeout(timer);
  }, [introOpacity, introScale, lineWidth]);

  const introStyle = useAnimatedStyle(() => ({
    opacity: introOpacity.value,
    transform: [{ scale: introScale.value }],
  }));

  const lineStyle = useAnimatedStyle(() => ({
    width: lineWidth.value,
    opacity: withTiming(lineWidth.value > 0 ? 1 : 0, { duration: 300 }),
  }));

  const complete = useCallback(() => {
    setHasSeenOnboarding(true);
    router.replace('/(tabs)/pocetna' as never);
  }, [setHasSeenOnboarding]);

  const goNext = useCallback(() => {
    if (activeIndex < slides.length - 1) {
      const next = activeIndex + 1;
      scrollRef.current?.scrollTo({ x: next * screenW, animated: true });
      setActiveIndex(next);
    } else {
      complete();
    }
  }, [activeIndex, complete, screenW]);

  // ── INTRO PHASE ──
  if (phase === 'intro') {
    return (
      <View style={styles.introRoot}>
        <Image
          source={{ uri: categoryFallbackImages.viewpoints }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={800}
        />
        <LinearGradient
          colors={['rgba(26,43,61,0.3)', 'rgba(26,43,61,0.85)']}
          locations={[0.2, 1]}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View style={[styles.introContent, introStyle]}>
          <Animated.View entering={FadeIn.duration(600).delay(400)}>
            <AppText style={styles.introLabel} tone="inverse" variant="caption">
              LOKALNI VODIČ
            </AppText>
          </Animated.View>
          <AppText serif style={styles.introTitle} tone="inverse">
            Dobro došli u
          </AppText>
          <AppText serif style={styles.introCity} tone="inverse">
            Herceg Novi
          </AppText>
          <Animated.View style={[styles.introLine, lineStyle]} />
          <Animated.View entering={FadeInUp.duration(500).delay(1800)}>
            <AppText style={styles.introSub} tone="inverse" variant="body">
              Grad sunca, stepenica i šćuvanih uvala
            </AppText>
          </Animated.View>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View
          entering={FadeIn.duration(400).delay(2200)}
          style={[styles.loadingWrap, { bottom: insets.bottom + 40 }]}>
          <View style={styles.loadingDots}>
            <LoadingDot delay={0} />
            <LoadingDot delay={150} />
            <LoadingDot delay={300} />
          </View>
        </Animated.View>
      </View>
    );
  }

  // ── SLIDES PHASE ──
  const controlsHeight = insets.bottom + 130;

  return (
    <Animated.View entering={FadeIn.duration(600)} style={styles.root}>
      {/* Slides take up space above controls */}
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / screenW);
            setActiveIndex(idx);
          }}>
          {slides.map((item) => (
            <View key={item.key} style={{ width: screenW, height: screenH }}>
              <Image source={{ uri: item.image }} style={StyleSheet.absoluteFill} contentFit="cover" transition={400} />
              <LinearGradient
                colors={['rgba(26,43,61,0.05)', 'rgba(26,43,61,0.78)']}
                locations={[0.25, 1]}
                style={StyleSheet.absoluteFill}
              />
              <View style={[styles.slideContent, { paddingBottom: controlsHeight + 20 }]}>
                <Animated.View entering={FadeInDown.duration(400).delay(100)}>
                  <AppText serif style={styles.slideTitle} tone="inverse">
                    {item.title}
                  </AppText>
                </Animated.View>
                <Animated.View entering={FadeInDown.duration(400).delay(250)}>
                  <AppText style={styles.slideBody} tone="inverse" variant="bodyLarge">
                    {item.body}
                  </AppText>
                </Animated.View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom controls — separate from ScrollView, not overlapping */}
      <Animated.View
        entering={FadeInUp.duration(400).delay(300)}
        style={[styles.controls, { paddingBottom: insets.bottom + spacing.xxl }]}>
        {/* Step indicator */}
        <View style={styles.stepRow}>
          <View style={styles.dots}>
            {slides.map((_, i) => (
              <Dot key={i} active={i === activeIndex} />
            ))}
          </View>
          <AppText style={styles.stepText} tone="inverse" variant="caption">
            {activeIndex + 1}/{slides.length}
          </AppText>
        </View>

        {/* Next button */}
        <Pressable
          onPress={goNext}
          style={({ pressed }) => [styles.nextBtn, pressed && styles.nextBtnPressed]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={activeIndex === slides.length - 1 ? 'Start your journey' : 'Next slide'}>
          <AppText style={styles.nextText} variant="body">
            {activeIndex === slides.length - 1 ? 'Kreni na putovanje' : 'Dalje'}
          </AppText>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

function Dot({ active }: { active: boolean }) {
  const animStyle = useAnimatedStyle(() => ({
    width: withSpring(active ? 24 : 8, { damping: 18, stiffness: 180 }),
    opacity: withSpring(active ? 1 : 0.35, { damping: 18, stiffness: 180 }),
  }));
  return <Animated.View style={[styles.dot, animStyle]} />;
}

function LoadingDot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);
  useEffect(() => {
    const pulse = () => {
      opacity.value = withDelay(
        delay,
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 }),
        ),
      );
    };
    pulse();
    const interval = setInterval(pulse, 1200);
    return () => clearInterval(interval);
  }, [delay, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return <Animated.View style={[styles.loadingDot, style]} />;
}

const styles = StyleSheet.create({
  // ── Intro ──
  introRoot: {
    flex: 1,
    backgroundColor: '#1A2B3D',
  },
  introContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xxl,
  },
  introLabel: {
    fontFamily: 'Manrope_600SemiBold',
    letterSpacing: 3,
    fontSize: 11,
    marginBottom: spacing.lg,
    textTransform: 'uppercase',
  },
  introTitle: {
    fontFamily: 'PlayfairDisplay_400Regular',
    fontSize: 28,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  introCity: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 48,
    lineHeight: 56,
    color: colors.white,
    textAlign: 'center',
  },
  introLine: {
    height: 2,
    backgroundColor: colors.secondary,
    marginVertical: spacing.lg,
    borderRadius: 1,
  },
  introSub: {
    fontFamily: 'Manrope_400Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  loadingWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },

  // ── Slides ──
  root: {
    flex: 1,
    backgroundColor: '#1A2B3D',
  },
  slideContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xxl,
    gap: spacing.md,
  },
  slideTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 36,
    lineHeight: 42,
    color: colors.white,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  slideBody: {
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Manrope_400Regular',
    lineHeight: 24,
    maxWidth: '92%',
  },

  // ── Controls ──
  controls: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    gap: spacing.xl,
    backgroundColor: '#1A2B3D',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  stepText: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'Manrope_500Medium',
  },
  nextBtn: {
    backgroundColor: colors.white,
    paddingVertical: spacing.lg,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  nextBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  nextText: {
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
  },
});
