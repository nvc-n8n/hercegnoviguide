import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { EmptyState } from '@/src/components/EmptyState';
import { Screen } from '@/src/components/Screen';
import { categoryByKey } from '@/src/constants/categories';
import { categoryFallbackImages, getHeroImageUri } from '@/src/constants/heroImages';
import { openDirections } from '@/src/services/directions';
import { filterPlaces, getCategoryPlaces } from '@/src/services/places';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place, PlaceCategory } from '@/src/types/place';

const SCREEN_W = Dimensions.get('window').width;

export default function CategoryScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ category: PlaceCategory }>();
  const filters = useAppStore((s) => s.filters);
  const lastKnownLocation = useAppStore((s) => s.lastKnownLocation);
  const category = params.category;
  const config = categoryByKey[category];
  const places = filterPlaces(getCategoryPlaces(category), filters, lastKnownLocation);

  if (!config) {
    return (
      <Screen>
        <EmptyState body="Kategorija nije prepoznata." title="Nema ove kategorije" />
      </Screen>
    );
  }

  // Category hero image (local asset)
  const heroSource = categoryFallbackImages[category];

  // Build editorial layout: alternate between full-width and 2-col rows
  const layoutRows: Array<{ type: 'full'; place: Place } | { type: 'pair'; left: Place; right: Place }> = [];
  let i = 0;
  while (i < places.length) {
    if (i === 0 || (i + 1 >= places.length)) {
      // First card always full-width, last odd card too
      layoutRows.push({ type: 'full', place: places[i] });
      i++;
    } else {
      // Pair
      layoutRows.push({ type: 'pair', left: places[i], right: places[i + 1] });
      i += 2;
    }
  }

  return (
    <Screen>
      {/* ── HERO: Full-bleed, edge-to-edge ── */}
      <View style={styles.heroWrap}>
        <Image source={heroSource} style={StyleSheet.absoluteFill} contentFit="cover" transition={500} />
        <LinearGradient
          colors={['rgba(26,43,61,0.08)', 'rgba(26,43,61,0.75)']}
          locations={[0.2, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroContent}>
          <AppText serif style={styles.heroTitle} tone="inverse">
            {config.title}
          </AppText>
          <AppText style={styles.heroSub} tone="inverse" variant="body">
            {config.description}
          </AppText>
        </View>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={[styles.floatingBtn, styles.floatingLeft, { top: Math.max(insets.top, spacing.section) + spacing.sm }]}>
          <Ionicons color={colors.white} name="arrow-back" size={22} />
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Open filters"
          onPress={() => router.push('/filteri' as never)}
          style={[styles.floatingBtn, styles.floatingRight, { top: Math.max(insets.top, spacing.section) + spacing.sm }]}>
          <Ionicons color={colors.white} name="options-outline" size={20} />
        </Pressable>
      </View>

      {/* ── Count ── */}
      <AppText tone="soft" variant="label" style={styles.count}>
        {places.length} {places.length === 1 ? 'mjesto' : 'mjesta'}
      </AppText>

      {/* ── Editorial masonry grid ── */}
      <View style={styles.grid}>
        {layoutRows.map((row, idx) => {
          if (row.type === 'full') {
            return (
              <MasonryCard
                key={row.place.id}
                place={row.place}
                aspect={idx === 0 ? 16 / 10 : 3 / 2}
                delay={idx * 60}
              />
            );
          }
          return (
            <View key={`pair-${idx}`} style={styles.pairRow}>
              <View style={styles.pairHalf}>
                <MasonryCard place={row.left} aspect={3 / 4} delay={idx * 60} />
              </View>
              <View style={styles.pairHalf}>
                <MasonryCard place={row.right} aspect={3 / 4} delay={idx * 60 + 40} />
              </View>
            </View>
          );
        })}
      </View>

      {!places.length ? (
        <EmptyState
          actionLabel="Resetuj filtere"
          body="U ovoj kategoriji trenutno nema rezultata za izabrane filtere."
          onPressAction={() => router.push('/filteri' as never)}
          title="Ništa nije pronađeno"
        />
      ) : null}
    </Screen>
  );
}

function MasonryCard({ place, aspect, delay }: { place: Place & { distanceMeters?: number | null }; aspect: number; delay: number }) {
  const imgSource = getHeroImageUri(place.id, place.category);
  return (
    <View>
      <Pressable
        accessibilityRole="link"
        onPress={() => router.push(`/mjesto/${place.slug}` as never)}
        style={({ pressed }) => [pressed && styles.cardPressed]}>
        <View style={[styles.card, { aspectRatio: aspect }]}>
          {imgSource ? (
            <Image source={imgSource} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
          ) : null}
          <LinearGradient
            colors={['transparent', 'rgba(26,43,61,0.7)']}
            locations={[0.35, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.cardContent}>
            <AppText serif style={styles.cardTitle} tone="inverse" variant="heading">
              {place.title}
            </AppText>
            <AppText style={styles.cardAddress} tone="inverse" variant="label" numberOfLines={1}>
              {place.address}
            </AppText>
          </View>
          {/* Directions floating button */}
          <Pressable
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Get directions to ${place.title}`}
            onPress={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
            style={({ pressed }) => [styles.dirFloating, pressed && styles.dirFloatingPressed]}>
            <Ionicons color={colors.white} name="navigate-outline" size={16} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Hero: full-bleed ──
  heroWrap: {
    width: SCREEN_W,
    height: 360,
    marginLeft: -spacing.xl,
    marginTop: -spacing.section,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    gap: spacing.xs,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 36,
    lineHeight: 42,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  heroSub: {
    opacity: 0.85,
    maxWidth: '90%',
    fontFamily: 'Manrope_400Regular',
  },
  floatingBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  floatingLeft: {
    left: spacing.xl,
  },
  floatingRight: {
    right: spacing.xl,
  },
  count: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ── Masonry grid ──
  grid: {
    gap: spacing.lg,
  },
  pairRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  pairHalf: {
    flex: 1,
  },
  card: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  cardContent: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.xl,
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cardAddress: {
    opacity: 0.75,
  },
  dirFloating: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dirFloatingPressed: {
    opacity: 0.7,
  },
});
