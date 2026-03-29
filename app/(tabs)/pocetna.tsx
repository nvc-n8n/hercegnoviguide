import { useMemo, useState } from 'react';
import { Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { PlaceCard } from '@/src/components/PlaceCard';
import { CategoryChip } from '@/src/components/CategoryChip';
import { Screen } from '@/src/components/Screen';
import { SectionHeader } from '@/src/components/SectionHeader';
import { categories } from '@/src/constants/categories';
import { getHeroImageUri } from '@/src/constants/heroImages';
import { useLocation } from '@/src/hooks/useLocation';
import { openDirections } from '@/src/services/directions';
import { defaultFilters, filterPlaces, getAllPlaces, getCategoryPlaces, getPlacesByTag, getPopularPlaces } from '@/src/services/places';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place } from '@/src/types/place';

export default function HomeScreen() {
  const { width: screenW } = useWindowDimensions();
  const isTablet = screenW >= 768;
  const [refreshing, setRefreshing] = useState(false);
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const { lastKnownLocation } = useLocation();

  const popularPlaces = useMemo(() => getPopularPlaces(), []);
  const allPlaces = useMemo(() => getAllPlaces(), []);
  const beachPlaces = useMemo(() => getPlacesByTag('beach').slice(0, 6), []);
  const foodPlaces = useMemo(() => getPlacesByTag('food').slice(0, 6), []);
  const nightlifePlaces = useMemo(() => allPlaces.filter((p) => p.category === 'nightlife').slice(0, 6), [allPlaces]);
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

  const renderPlaceCards = (places: (Place & { distanceMeters?: number | null })[]) => {
    if (isTablet) {
      return (
        <View style={styles.cardGrid}>
          {places.map((place) => (
            <PlaceCard
              fullWidth
              isSaved={favoriteIds.includes(place.id)}
              key={place.id}
              onPress={() => router.push(`/mjesto/${place.slug}` as never)}
              onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
              onPressSave={() => toggleFavorite(place.id)}
              place={place}
            />
          ))}
        </View>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.cardRail} horizontal showsHorizontalScrollIndicator={false}>
        {places.map((place) => (
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
    );
  };

  return (
    <Screen
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} tintColor={colors.primary} />}>

      {/* ── Hero ── */}
      <View style={[styles.heroWrap, { width: screenW, height: isTablet ? 320 : 240 }]}>
        <Image
          source={require('../../assets/photos/montenegro-beach-2.jpg')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={500}
        />
        <LinearGradient
          colors={['rgba(74,144,217,0.55)', 'rgba(27,42,74,0.75)']}
          locations={[0, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroContent}>
          <View style={styles.heroTop}>
            <Ionicons color={colors.white} name="location" size={isTablet ? 28 : 22} />
            <AppText style={[styles.heroAppName, isTablet && styles.heroAppNameTablet]} tone="inverse">Herceg Novi</AppText>
          </View>
          <AppText style={styles.heroTagline} tone="inverse" variant="caption">
            ISTRAŽI GRAD SUNCA I MORA
          </AppText>
        </View>
      </View>

      {/* ── Search ── */}
      <View style={styles.searchWrap}>
        <Pressable
          onPress={() => router.push('/(tabs)/istrazi' as never)}
          style={styles.searchBar}>
          <Ionicons color={colors.textSoft} name="search" size={18} />
          <AppText tone="soft" variant="body">Pretraži mjesta...</AppText>
        </Pressable>
      </View>

      {/* ── Categories ── */}
      <View style={styles.section}>
        <SectionHeader title="Kategorije" actionLabel="Sve" onPressAction={() => router.push('/(tabs)/istrazi' as never)} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRail}>
          {categories.map((cat) => (
            <CategoryChip
              key={cat.key}
              emoji={cat.emoji}
              label={cat.shortTitle}
              onPress={() => router.push(`/kategorija/${cat.key}` as never)}
            />
          ))}
        </ScrollView>
      </View>

      {/* ── Most Popular ── */}
      <View style={styles.section}>
        <SectionHeader title="Najpopularnije" actionLabel="Sve" onPressAction={() => router.push('/(tabs)/istrazi' as never)} />
        {renderPlaceCards(popularPlaces.slice(0, isTablet ? 6 : 6))}
      </View>

      {/* ── Nearby ── */}
      {lastKnownLocation ? (
        <View style={styles.section}>
          <SectionHeader title="U blizini" />
          {renderPlaceCards(nearbyPlaces)}
        </View>
      ) : null}

      {/* ── Beaches ── */}
      <View style={styles.section}>
        <SectionHeader actionLabel="Sve" onPressAction={() => router.push('/kategorija/beaches' as never)} title="Plaže" />
        {renderPlaceCards(beachPlaces)}
      </View>

      {/* ── Restaurants ── */}
      <View style={styles.section}>
        <SectionHeader actionLabel="Sve" onPressAction={() => router.push('/kategorija/restaurants' as never)} title="Restorani" />
        {renderPlaceCards(foodPlaces)}
      </View>

      {/* ── Nightlife ── */}
      <View style={styles.section}>
        <SectionHeader actionLabel="Sve" onPressAction={() => router.push('/kategorija/nightlife' as never)} title="Noćni život" />
        {renderPlaceCards(nightlifePlaces)}
      </View>

      {/* ── Mayor ── */}
      <MayorCard />
    </Screen>
  );
}

const KATIC_PHOTO = require('../../assets/katic.jpg');

function MayorCard() {
  const { width } = useWindowDimensions();
  const photoHeight = width >= 768 ? 360 : 200;

  return (
    <View style={styles.mayorCard}>
      <Image source={KATIC_PHOTO} style={[styles.mayorPhoto, { height: photoHeight }]} contentFit="cover" contentPosition={{ top: '15%', left: '50%' }} transition={400} />
      <View style={styles.mayorContent}>
        <AppText variant="heading">Dobrodošli u Herceg Novi</AppText>
        <AppText tone="muted" variant="caption">Stevan Katić, Gradonačelnik</AppText>
        <AppText tone="muted" variant="body" style={styles.mayorBio}>
          Herceg Novi je grad sunca, stepenica i šćuvanih uvala. Bilo da dolazite po prvi put ili se vraćate — ovdje ćete uvijek pronaći nešto novo. Dobrodošli su svi!
        </AppText>
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push('/o-gradu' as never)}
          style={({ pressed }) => [styles.mayorBtn, pressed && { opacity: 0.7 }]}>
          <AppText style={styles.mayorBtnText}>O gradu</AppText>
          <Ionicons color={colors.primary} name="arrow-forward" size={14} />
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  heroWrap: {
    marginLeft: -spacing.xl,
    marginTop: -spacing.section,
    borderBottomLeftRadius: radii.xxl,
    borderBottomRightRadius: radii.xxl,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroAppName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroAppNameTablet: {
    fontSize: 36,
  },
  heroTagline: {
    fontFamily: 'Manrope_500Medium',
    letterSpacing: 2,
    opacity: 0.85,
    fontSize: 10,
  },
  searchWrap: {
    marginTop: -spacing.xxl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    ...shadows.card,
  },
  section: {
    gap: spacing.md,
  },
  catRail: {
    gap: spacing.lg,
    paddingVertical: spacing.xs,
  },
  cardRail: {
    gap: spacing.md,
    paddingRight: spacing.xxxl,
    paddingVertical: spacing.xs,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  mayorCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  mayorPhoto: {
    width: '100%',
  },
  mayorContent: {
    padding: spacing.xl,
    gap: spacing.sm,
  },
  mayorBio: {
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  mayorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  mayorBtnText: {
    fontFamily: 'Manrope_600SemiBold',
    color: colors.primary,
    fontSize: 13,
  },
});
