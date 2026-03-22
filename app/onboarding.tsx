import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    image: categoryFallbackImages.beaches,
    title: 'Od ideje do mape\nza sekunde',
    body: 'Dodirnite Uputstva na bilo kojem mjestu i navigacija se otvara odmah.',
  },
  {
    key: 'save',
    image: categoryFallbackImages.nightlife,
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

  // Simple opacity state for intro
  const [introVisible, setIntroVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    // Fade in intro
    const t1 = setTimeout(() => setIntroVisible(true), 300);
    const t2 = setTimeout(() => setLineVisible(true), 1200);
    const t3 = setTimeout(() => setSubtitleVisible(true), 1800);
    // Transition to slides after intro
    const t4 = setTimeout(() => setPhase('slides'), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

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
          source={categoryFallbackImages.viewpoints}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={800}
        />
        <LinearGradient
          colors={['rgba(26,43,61,0.3)', 'rgba(26,43,61,0.85)']}
          locations={[0.2, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.introContent, { opacity: introVisible ? 1 : 0 }]}>
          <View>
            <AppText style={styles.introLabel} tone="inverse" variant="caption">
              LOKALNI VODIČ
            </AppText>
          </View>
          <AppText serif style={styles.introTitle} tone="inverse">
            Dobro došli u
          </AppText>
          <AppText serif style={styles.introCity} tone="inverse">
            Herceg Novi
          </AppText>
          <View style={[styles.introLine, { width: lineVisible ? 60 : 0, opacity: lineVisible ? 1 : 0 }]} />
          <View style={{ opacity: subtitleVisible ? 1 : 0 }}>
            <AppText style={styles.introSub} tone="inverse" variant="body">
              Grad sunca, stepenica i šćuvanih uvala
            </AppText>
          </View>
        </View>

        {/* Loading indicator */}
        <View style={[styles.loadingWrap, { bottom: insets.bottom + 40 }]}>
          <View style={styles.loadingDots}>
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
          </View>
        </View>
      </View>
    );
  }

  // ── SLIDES PHASE ──
  const controlsHeight = insets.bottom + 130;

  return (
    <View style={styles.root}>
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
              <Image source={item.image} style={StyleSheet.absoluteFill} contentFit="cover" transition={400} />
              <LinearGradient
                colors={['rgba(26,43,61,0.05)', 'rgba(26,43,61,0.78)']}
                locations={[0.25, 1]}
                style={StyleSheet.absoluteFill}
              />
              <View style={[styles.slideContent, { paddingBottom: controlsHeight + 20 }]}>
                <View>
                  <AppText serif style={styles.slideTitle} tone="inverse">
                    {item.title}
                  </AppText>
                </View>
                <View>
                  <AppText style={styles.slideBody} tone="inverse" variant="bodyLarge">
                    {item.body}
                  </AppText>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom controls — separate from ScrollView, not overlapping */}
      <View
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
      </View>
    </View>
  );
}

function Dot({ active }: { active: boolean }) {
  return (
    <View
      style={[
        styles.dot,
        { width: active ? 24 : 8, opacity: active ? 1 : 0.35 },
      ]}
    />
  );
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
