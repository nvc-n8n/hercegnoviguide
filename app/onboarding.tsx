import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { categoryFallbackImages } from '@/src/constants/heroImages';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, spacing } from '@/src/theme';

const slides = [
  { key: 'discover', image: categoryFallbackImages.viewpoints, title: 'Otkrijte Herceg Novi', body: 'Atrakcije, plaže, hrana i noćni život — sve na jednom mjestu.' },
  { key: 'navigate', image: categoryFallbackImages.beaches, title: 'Navigacija jednim dodirom', body: 'Dodirnite Uputstva i navigacija se otvara odmah.' },
  { key: 'save', image: categoryFallbackImages.nightlife, title: 'Sačuvajte omiljeno', body: 'Označite lokacije i napravite plan za savršen dan.' },
];

export default function OnboardingScreen() {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const setHasSeenOnboarding = useAppStore((s) => s.setHasSeenOnboarding);

  const [phase, setPhase] = useState<'intro' | 'slides'>('intro');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // Smooth animated values for intro
  const iconAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const lineAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered fade-in sequence
    Animated.sequence([
      Animated.delay(300),
      // Icon fades in + scales up
      Animated.spring(iconAnim, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true }),
      // Title fades in
      Animated.timing(titleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      // Tagline fades in
      Animated.timing(taglineAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      // Decorative line expands
      Animated.timing(lineAnim, { toValue: 1, duration: 400, useNativeDriver: false }),
      // Hold for a moment
      Animated.delay(800),
      // Smooth fade out entire splash
      Animated.timing(fadeOutAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      setPhase('slides');
    });
  }, [iconAnim, titleAnim, taglineAnim, lineAnim, fadeOutAnim]);

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

  // ── SPLASH: Smooth animated intro ──
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.splashRoot, { opacity: fadeOutAnim }]}>
        <LinearGradient colors={['#5B9FE6', '#3570B8', '#2B5EA0']} locations={[0, 0.6, 1]} style={StyleSheet.absoluteFill} />

        <View style={styles.splashContent}>
          {/* Icon with scale + fade */}
          <Animated.View style={[styles.iconWrap, {
            opacity: iconAnim,
            transform: [
              { scale: iconAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) },
            ],
          }]}>
            <View style={styles.iconCircle}>
              <Ionicons color={colors.primary} name="location" size={36} />
            </View>
          </Animated.View>

          {/* Title with fade + slide up */}
          <Animated.View style={{
            opacity: titleAnim,
            transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
          }}>
            <AppText style={styles.splashTitle} tone="inverse">Herceg Novi</AppText>
          </Animated.View>

          {/* Decorative line */}
          <Animated.View style={[styles.splashLine, {
            width: lineAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 48] }),
            opacity: lineAnim,
          }]} />

          {/* Tagline with fade */}
          <Animated.View style={{
            opacity: taglineAnim,
            transform: [{ translateY: taglineAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
          }}>
            <AppText style={styles.splashTagline} tone="inverse">ISTRAŽI GRAD SUNCA I MORA</AppText>
          </Animated.View>
        </View>

        {/* Subtle loading dots */}
        <Animated.View style={[styles.loadingWrap, { bottom: insets.bottom + 50, opacity: taglineAnim }]}>
          <View style={styles.loadingDots}>
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
          </View>
        </Animated.View>
      </Animated.View>
    );
  }

  // ── SLIDES ──
  return (
    <View style={styles.root}>
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
            <Image source={item.image} style={{ width: screenW, height: screenH * 0.55 }} contentFit="cover" transition={300} />
            <View style={styles.slideContent}>
              <AppText variant="hero">{item.title}</AppText>
              <AppText tone="muted" variant="body">{item.body}</AppText>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.controls, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>
        <Pressable onPress={goNext} style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.85 }]}>
          <AppText style={styles.nextText} tone="inverse">
            {activeIndex === slides.length - 1 ? 'POČNI' : 'DALJE'}
          </AppText>
        </Pressable>
        {activeIndex < slides.length - 1 ? (
          <Pressable onPress={complete} style={styles.skipBtn}>
            <AppText tone="muted" variant="label">Preskoči</AppText>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashRoot: {
    flex: 1,
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  iconWrap: {
    marginBottom: spacing.sm,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  splashTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 38,
    lineHeight: 48,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  splashLine: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 2,
  },
  splashTagline: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    letterSpacing: 4,
    opacity: 0.75,
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
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  root: { flex: 1, backgroundColor: colors.background },
  slideContent: { flex: 1, paddingHorizontal: spacing.xxl, paddingTop: spacing.xxl, gap: spacing.sm },

  controls: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.xxl, paddingTop: spacing.lg,
    backgroundColor: colors.background, gap: spacing.lg,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 24 },
  nextBtn: {
    backgroundColor: colors.primary, paddingVertical: spacing.lg,
    borderRadius: radii.pill, alignItems: 'center',
  },
  nextText: { fontFamily: 'Manrope_700Bold', fontSize: 15, letterSpacing: 1 },
  skipBtn: { alignItems: 'center', paddingVertical: spacing.sm },
});
