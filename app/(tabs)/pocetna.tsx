import { useMemo, useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, interpolate } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { PlaceCard } from '@/src/components/PlaceCard';
import { Screen } from '@/src/components/Screen';
import { SectionHeader } from '@/src/components/SectionHeader';
import { categories } from '@/src/constants/categories';
import { categoryCarouselImages, getHeroImageUri } from '@/src/constants/heroImages';
import { useLocation } from '@/src/hooks/useLocation';
import { openDirections } from '@/src/services/directions';
import { defaultFilters, filterPlaces, getAllPlaces, getPlacesByTag, getPopularPlaces } from '@/src/services/places';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place } from '@/src/types/place';

const SCREEN_W = Dimensions.get('window').width;

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const { lastKnownLocation, requestLocation, isRequestingLocation } = useLocation();

  const popularPlaces = useMemo(() => getPopularPlaces(), []);
  const allPlaces = useMemo(() => getAllPlaces(), []);
  const beachPlaces = useMemo(() => getPlacesByTag('beach').slice(0, 6), []);
  const foodPlaces = useMemo(() => getPlacesByTag('food').slice(0, 6), []);
  const nightlifePlaces = useMemo(() => getPlacesByTag('nightlife').slice(0, 6), []);
  const nearbyPlaces = useMemo(
    () =>
      lastKnownLocation
        ? filterPlaces(allPlaces, { ...defaultFilters, nearby: true, sort: 'nearest' }, lastKnownLocation).slice(0, 4)
        : [],
    [allPlaces, lastKnownLocation],
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setRefreshing(false);
  };

  const featuredMain = popularPlaces[0];
  const featuredRow = popularPlaces.slice(1, 3);
  const featuredThird = popularPlaces[3];

  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const catScrollRef = useRef<ScrollView>(null);

  return (
    <Screen
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} tintColor={colors.secondary} />}>

      {/* ── HERO: Full-bleed, edge-to-edge ── */}
      <Animated.View entering={FadeInUp.duration(500).delay(50)} style={styles.heroWrap}>
        <Image
          source={require('../../assets/photos/viewpoint-bay-1.jpg')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={500}
        />
        <LinearGradient
          colors={['rgba(26,43,61,0.1)', 'rgba(26,43,61,0.75)']}
          locations={[0.25, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <AppText style={styles.heroBadgeText} tone="inverse" variant="caption">
              LOKALNI VODIČ
            </AppText>
          </View>
          <AppText serif style={styles.heroTitle} tone="inverse">
            {'Otkrij\nHerceg Novi'}
          </AppText>
          <AppText style={styles.heroSub} tone="inverse" variant="body">
            Grad sunca, stepenica i šćuvanih uvala
          </AppText>
        </View>
      </Animated.View>

      {/* ── CATEGORIES: Full-width paged carousel ── */}
      <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.catSection}>
        <View style={styles.catHeader}>
          <SectionHeader subtitle="Biraj kategoriju i kreni" title="Šta te zanima?" />
        </View>
        <ScrollView
          ref={catScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          style={styles.catScroller}
          contentContainerStyle={styles.catRail}
          onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
            setActiveCatIndex(idx);
          }}
          scrollEventThrottle={16}>
          {categories.map((cat, i) => (
            <Pressable
              key={cat.key}
              accessibilityRole="link"
              onPress={() => router.push(`/kategorija/${cat.key}` as never)}
              style={({ pressed }) => [styles.catCard, pressed && styles.catCardPressed]}>
              <Image
                source={categoryCarouselImages[cat.key]}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                transition={500}
              />
              {/* Deep gradient for text legibility */}
              <LinearGradient
                colors={['transparent', 'rgba(10,20,30,0.35)', 'rgba(10,20,30,0.82)']}
                locations={[0.3, 0.6, 1]}
                style={StyleSheet.absoluteFill}
              />
              {/* Counter */}
              <View style={styles.catCounter}>
                <AppText style={styles.catCounterText} tone="inverse">
                  {i + 1}/{categories.length}
                </AppText>
              </View>
              {/* Content */}
              <View style={styles.catContent}>
                <View style={[styles.catIconCircle, { backgroundColor: cat.color + '33' }]}>
                  <Ionicons color="#fff" name={cat.icon as never} size={22} />
                </View>
                <AppText style={styles.catLabel} tone="inverse">
                  {cat.title}
                </AppText>
                <AppText style={styles.catDesc} tone="inverse" numberOfLines={2}>
                  {cat.description}
                </AppText>
                <View style={styles.catCta}>
                  <AppText style={styles.catCtaText} tone="inverse">Istraži</AppText>
                  <Ionicons color="rgba(255,255,255,0.9)" name="arrow-forward" size={14} />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        {/* Dot indicators */}
        <View style={styles.catDots}>
          {categories.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => catScrollRef.current?.scrollTo({ x: i * SCREEN_W, animated: true })}>
              <Animated.View
                style={[
                  styles.catDot,
                  i === activeCatIndex && styles.catDotActive,
                ]}
              />
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {/* ── FEATURED: Asymmetric editorial grid ── */}
      <Animated.View entering={FadeInUp.duration(400).delay(350)} style={styles.section}>
        <SectionHeader subtitle="Mjesta đe se osjetiš kao svoj" title="Ne propusti" />
        <View style={styles.editorialGrid}>
          {featuredMain ? <EditorialCard place={featuredMain} aspect={16 / 10} delay={0} /> : null}
          {featuredRow.length === 2 ? (
            <View style={styles.editorialRow}>
              <View style={styles.editorialHalf}>
                <EditorialCard place={featuredRow[0]} aspect={4 / 5} delay={80} />
              </View>
              <View style={styles.editorialHalf}>
                <EditorialCard place={featuredRow[1]} aspect={4 / 5} delay={140} />
              </View>
            </View>
          ) : null}
          {featuredThird ? <EditorialCard place={featuredThird} aspect={16 / 10} delay={200} /> : null}
        </View>
      </Animated.View>

      {/* ── NEARBY (moved earlier when location available) ── */}
      {lastKnownLocation ? (
        <Animated.View entering={FadeInUp.duration(400).delay(450)} style={styles.section}>
          <SectionHeader title="U blizini" />
          <ScrollView contentContainerStyle={styles.rail} horizontal showsHorizontalScrollIndicator={false}>
            {nearbyPlaces.map((place) => (
              <PlaceCard
                isSaved={favoriteIds.includes(place.id)}
                key={place.id}
                onPress={() => router.push(`/mjesto/${place.slug}` as never)}
                onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
                onPressSave={() => toggleFavorite(place.id)}
                place={place}
              />
            ))}
          </ScrollView>
        </Animated.View>
      ) : null}

      {/* ── BREAKFAST & MORNING ── */}
      <Animated.View entering={FadeInUp.duration(400).delay(550)} style={styles.section}>
        <SectionHeader actionLabel="Sva mjesta" onPressAction={() => router.push('/kategorija/cafes' as never)} subtitle="Jutarnja kafa ili doručak uz pogled" title="Za jutro" />
        <ScrollView contentContainerStyle={styles.rail} horizontal showsHorizontalScrollIndicator={false}>
          {foodPlaces.slice(0, 4).map((place) => (
            <PlaceCard
              isSaved={favoriteIds.includes(place.id)}
              key={place.id}
              onPress={() => router.push(`/mjesto/${place.slug}` as never)}
              onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
              onPressSave={() => toggleFavorite(place.id)}
              place={place}
            />
          ))}
        </ScrollView>
      </Animated.View>

      {/* ── AFTERNOON: BEACHES & SWIMMING ── */}
      <Animated.View entering={FadeInUp.duration(400).delay(650)} style={styles.section}>
        <SectionHeader actionLabel="Sve plaže" onPressAction={() => router.push('/kategorija/beaches' as never)} subtitle="Sunce, more i opuštanje" title="Za popodne" />
        <ScrollView contentContainerStyle={styles.rail} horizontal showsHorizontalScrollIndicator={false}>
          {beachPlaces.map((place) => (
            <PlaceCard
              isSaved={favoriteIds.includes(place.id)}
              key={place.id}
              onPress={() => router.push(`/mjesto/${place.slug}` as never)}
              onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
              onPressSave={() => toggleFavorite(place.id)}
              place={place}
            />
          ))}
        </ScrollView>
      </Animated.View>

      {/* ── EVENING: DINNER & RESTAURANTS ── */}
      <Animated.View entering={FadeInUp.duration(400).delay(750)} style={styles.section}>
        <SectionHeader actionLabel="Sva mjesta" onPressAction={() => router.push('/kategorija/restaurants' as never)} subtitle="Večera s lokalnim specijalitetima" title="Za večer" />
        <ScrollView contentContainerStyle={styles.rail} horizontal showsHorizontalScrollIndicator={false}>
          {foodPlaces.map((place) => (
            <PlaceCard
              isSaved={favoriteIds.includes(place.id)}
              key={place.id}
              onPress={() => router.push(`/mjesto/${place.slug}` as never)}
              onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
              onPressSave={() => toggleFavorite(place.id)}
              place={place}
            />
          ))}
        </ScrollView>
      </Animated.View>

      {/* ── LATE NIGHT: NIGHTLIFE ── */}
      <Animated.View entering={FadeInUp.duration(400).delay(850)} style={styles.section}>
        <SectionHeader actionLabel="Večernja mjesta" onPressAction={() => router.push('/kategorija/nightlife' as never)} subtitle="Barovi, klubovi i noćni život" title="Za kasnije sate" />
        <ScrollView contentContainerStyle={styles.rail} horizontal showsHorizontalScrollIndicator={false}>
          {nightlifePlaces.map((place) => (
            <PlaceCard
              isSaved={favoriteIds.includes(place.id)}
              key={place.id}
              onPress={() => router.push(`/mjesto/${place.slug}` as never)}
              onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
              onPressSave={() => toggleFavorite(place.id)}
              place={place}
            />
          ))}
        </ScrollView>
      </Animated.View>

      {/* ── MAYOR: Word from the city ── */}
      <Animated.View entering={FadeInUp.duration(400).delay(950)} style={styles.section}>
        <MayorCard />
      </Animated.View>

    </Screen>
  );
}

const KATIC_PHOTO = require('../../assets/katic.jpg');

function MayorCard() {
  return (
    <View style={styles.mayorCard}>

      {/* Full-width photo — replace KATIC_PHOTO_URI with the real URL or local require once available */}
      <View style={styles.mayorPhotoWrap}>
        <LinearGradient
          colors={[colors.primaryDeep, colors.night]}
          style={StyleSheet.absoluteFill}
        />
        <Image
          source={KATIC_PHOTO}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition={{ top: '10%', left: '50%' }}
          transition={400}
        />
        <LinearGradient
          colors={['transparent', colors.card]}
          locations={[0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Info block */}
      <View style={styles.mayorContent}>
        {/* Name + title */}
        <View style={styles.mayorMeta}>
          <AppText style={styles.mayorName}>Stevan Katić</AppText>
          <AppText variant="bodyLarge" tone="muted" style={styles.mayorTitle}>
            Gradonačelnik Herceg Novog
          </AppText>
        </View>

        {/* Divider */}
        <View style={styles.mayorDivider} />

        {/* Bio */}
        <AppText style={styles.mayorBio} tone="muted">
          Stevan Katić je diplomirani ekonomista, rođen i odrastao u Herceg Novom. Predsjednik opštine od 2016. godine — treći put reizabran glasovima sugrađana, što ga čini jednim od najdugovječnijih i najpopularnijih lokalnih lidera u Crnoj Gori.
        </AppText>
        <AppText style={styles.mayorBio} tone="muted">
          Posvećen razvoju turizma, obnovi kulturnog nasljeđa i unapređenju kvaliteta svakodnevnog života. Pod njegovim rukovodstvom obnovljena je tvrđava Španjola, uređeno šetalište i pozicioniran Herceg Novi kao premium destinacija Boke Kotorske.
        </AppText>

        {/* Quote */}
        <View style={styles.mayorQuoteWrap}>
          <AppText style={styles.mayorQuoteMark}>"</AppText>
          <AppText style={styles.mayorQuote}>
            Herceg Novi je grad koji se pamti. Dobrodošli — nadam se da ćete osjetiti dušu ovog mjesta.
          </AppText>
        </View>

        {/* CTA */}
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Saznaj više o gradu"
          onPress={() => router.push('/o-gradu' as never)}
          style={({ pressed }) => [styles.mayorCtaBtn, pressed && styles.mayorCtaPressed]}>
          <AppText style={styles.mayorCtaText} tone="inverse" variant="body">
            Saznaj više o gradu
          </AppText>
          <Ionicons color={colors.white} name="arrow-forward" size={16} />
        </Pressable>
      </View>

    </View>
  );
}

function EditorialCard({ place, aspect, delay }: { place: Place; aspect: number; delay: number }) {
  const imgSource = getHeroImageUri(place.id, place.category);
  return (
    <Animated.View entering={FadeInUp.duration(400).delay(delay)}>
      <Pressable
        accessibilityRole="link"
        onPress={() => router.push(`/mjesto/${place.slug}` as never)}
        style={({ pressed }) => [pressed && styles.editorialPressed]}>
        <View style={[styles.editorialCard, { aspectRatio: aspect }]}>
          {imgSource ? (
            <Image source={imgSource} style={StyleSheet.absoluteFill} contentFit="cover" transition={400} />
          ) : null}
          <LinearGradient
            colors={['transparent', 'rgba(26,43,61,0.75)']}
            locations={[0.3, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.editorialContent}>
            <AppText serif style={styles.editorialTitle} tone="inverse" variant="heading">
              {place.title}
            </AppText>
            <AppText style={styles.editorialSub} tone="inverse" variant="label" numberOfLines={1}>
              {place.address}
            </AppText>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    width: SCREEN_W,
    height: 440,
    marginLeft: -spacing.xl,
    marginTop: -spacing.section,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxxl,
    gap: spacing.sm,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: spacing.xs,
  },
  heroBadgeText: {
    fontFamily: 'Manrope_600SemiBold',
    letterSpacing: 1.5,
    fontSize: 10,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 44,
    lineHeight: 50,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroSub: {
    opacity: 0.85,
    fontFamily: 'Manrope_400Regular',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  section: {
    gap: spacing.lg,
  },
  catSection: {
    gap: spacing.lg,
    marginHorizontal: -spacing.xl,
  },
  catHeader: {
    paddingHorizontal: spacing.xl,
  },
  catScroller: {
    // no borderRadius here — let cards handle it
  },
  catRail: {
    // no gap needed — paging handles spacing
  },
  catCard: {
    width: SCREEN_W,
    height: 300,
    overflow: 'hidden',
  },
  catCardPressed: {
    opacity: 0.93,
  },
  catCounter: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.xl,
    backgroundColor: 'rgba(0,0,0,0.28)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
  },
  catCounterText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  catContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl + spacing.xl,
    paddingBottom: spacing.xxxl,
    gap: spacing.sm,
  },
  catIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  catLabel: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    lineHeight: 38,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  catDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.82)',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  catCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  catCtaText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.3,
  },
  catDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  catDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  catDotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  rail: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  editorialGrid: {
    gap: spacing.lg,
  },
  editorialRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  editorialHalf: {
    flex: 1,
  },
  editorialCard: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  editorialPressed: {
    opacity: 0.93,
    transform: [{ scale: 0.98 }],
  },
  editorialContent: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.xl,
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  editorialTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  editorialSub: {
    opacity: 0.75,
  },

  // ── Mayor card ──
  mayorCard: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mayorPhotoWrap: {
    height: 320,
    backgroundColor: colors.night,
  },
  mayorPhotoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mayorPhotoInitials: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 72,
    opacity: 0.25,
  },
  mayorContent: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  mayorMeta: {
    gap: spacing.xs,
  },
  mayorName: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 26,
    lineHeight: 32,
    color: colors.text,
  },
  mayorTitle: {
    fontFamily: 'Manrope_400Regular',
  },
  mayorDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  mayorBio: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  mayorQuoteWrap: {
    backgroundColor: colors.backgroundMuted,
    borderRadius: radii.md,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  mayorQuoteMark: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 36,
    lineHeight: 28,
    color: colors.secondary,
  },
  mayorQuote: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
    fontStyle: 'italic',
  },
  mayorCtaBtn: {
    backgroundColor: colors.secondary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  mayorCtaPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  mayorCtaText: {
    fontFamily: 'Manrope_700Bold',
  },

  // ── Prompt card ──
  promptCard: {
    gap: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.xl,
    ...shadows.soft,
  },
  promptBody: {
    lineHeight: 20,
  },
});
