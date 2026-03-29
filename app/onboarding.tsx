import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
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
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroVisible(true), 400);
    const t2 = setTimeout(() => setPhase('slides'), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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

  // ── SPLASH: Blue gradient ──
  if (phase === 'intro') {
    return (
      <View style={styles.splashRoot}>
        <LinearGradient colors={['#5B9FE6', '#3570B8']} style={StyleSheet.absoluteFill} />
        <View style={[styles.splashContent, { opacity: introVisible ? 1 : 0 }]}>
          <Ionicons color={colors.white} name="location" size={40} />
          <AppText style={styles.splashTitle} tone="inverse">Herceg Novi</AppText>
          <AppText style={styles.splashTagline} tone="inverse">ISTRAŽI GRAD SUNCA I MORA</AppText>
        </View>
      </View>
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
  splashRoot: { flex: 1 },
  splashContent: {
    flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.md,
  },
  splashTitle: { fontFamily: 'Manrope_700Bold', fontSize: 34 },
  splashTagline: { fontFamily: 'Manrope_500Medium', fontSize: 11, letterSpacing: 3, opacity: 0.8 },

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
