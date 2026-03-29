import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { PlaceCard } from '@/src/components/PlaceCard';
import { CategoryChip } from '@/src/components/CategoryChip';
import { SectionHeader } from '@/src/components/SectionHeader';
import { categories } from '@/src/constants/categories';
import { useLocation } from '@/src/hooks/useLocation';
import { openDirections } from '@/src/services/directions';
import { defaultFilters, filterPlaces, getAllPlaces, getPlacesByTag, getPopularPlaces } from '@/src/services/places';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place } from '@/src/types/place';
import { SafeAreaView } from 'react-native-safe-area-context';

type PlaceWithDist = Place & { distanceMeters?: number | null };

export default function HomeScreen() {
  const { width: screenW } = useWindowDimensions();
  const isTablet = screenW >= 768;
  const [refreshing, setRefreshing] = useState(false);
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const { lastKnownLocation } = useLocation();

  const popularPlaces = useMemo(() => getPopularPlaces().slice(0, 4), []);
  const allPlaces = useMemo(() => getAllPlaces(), []);
  const beachPlaces = useMemo(() => getPlacesByTag('beach').slice(0, 4), []);
  const foodPlaces = useMemo(() => getPlacesByTag('food').slice(0, 4), []);
  const nightlifePlaces = useMemo(() => allPlaces.filter((p) => p.category === 'nightlife').slice(0, 4), [allPlaces]);
  const nearbyPlaces = useMemo(
    () =>
      lastKnownLocation
        ? filterPlaces(allPlaces, { ...defaultFilters, nearby: true, sort: 'nearest' }, lastKnownLocation).slice(0, 4)
        : [],
    [allPlaces, lastKnownLocation],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setRefreshing(false);
  }, []);

  const renderCard = useCallback(({ item: place }: { item: PlaceWithDist }) => (
    <PlaceCard
      isSaved={favoriteIds.includes(place.id)}
      onPress={() => router.push(`/mjesto/${place.slug}` as never)}
      onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
      onPressSave={() => toggleFavorite(place.id)}
      place={place}
    />
  ), [favoriteIds, toggleFavorite]);

  const renderCardGrid = useCallback(({ item: place }: { item: PlaceWithDist }) => (
    <PlaceCard
      fullWidth
      isSaved={favoriteIds.includes(place.id)}
      onPress={() => router.push(`/mjesto/${place.slug}` as never)}
      onPressDirections={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
      onPressSave={() => toggleFavorite(place.id)}
      place={place}
    />
  ), [favoriteIds, toggleFavorite]);

  const PlaceRail = useCallback(({ places, title, actionLabel, actionHref }: { places: PlaceWithDist[]; title: string; actionLabel?: string; actionHref?: string }) => (
    <View style={styles.section}>
      <View style={styles.sectionPad}>
        <SectionHeader title={title} actionLabel={actionLabel} onPressAction={actionHref ? () => router.push(actionHref as never) : undefined} />
      </View>
      {isTablet ? (
        <FlatList
          data={places}
          keyExtractor={(p) => p.id}
          renderItem={renderCardGrid}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.sectionPad}
          scrollEnabled={false}
          removeClippedSubviews
          initialNumToRender={2}
        />
      ) : (
        <FlatList
          data={places}
          keyExtractor={(p) => p.id}
          renderItem={renderCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardRail}
          removeClippedSubviews
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
        />
      )}
    </View>
  ), [isTablet, renderCard, renderCardGrid]);

  // Build sections data for main FlatList
  const sections = useMemo(() => {
    const s: { key: string; type: string; data?: PlaceWithDist[]; title?: string; actionLabel?: string; actionHref?: string }[] = [
      { key: 'hero', type: 'hero' },
      { key: 'search', type: 'search' },
      { key: 'categories', type: 'categories' },
      { key: 'popular', type: 'places', data: popularPlaces, title: 'Najpopularnije', actionLabel: 'Sve', actionHref: '/(tabs)/istrazi' },
    ];
    if (nearbyPlaces.length > 0) {
      s.push({ key: 'nearby', type: 'places', data: nearbyPlaces, title: 'U blizini' });
    }
    s.push(
      { key: 'beaches', type: 'places', data: beachPlaces, title: 'Plaže', actionLabel: 'Sve', actionHref: '/kategorija/beaches' },
      { key: 'restaurants', type: 'places', data: foodPlaces, title: 'Restorani', actionLabel: 'Sve', actionHref: '/kategorija/restaurants' },
      { key: 'nightlife', type: 'places', data: nightlifePlaces, title: 'Noćni život', actionLabel: 'Sve', actionHref: '/kategorija/nightlife' },
      { key: 'mayor', type: 'mayor' },
    );
    return s;
  }, [popularPlaces, nearbyPlaces, beachPlaces, foodPlaces, nightlifePlaces]);

  const renderSection = useCallback(({ item }: { item: typeof sections[0] }) => {
    switch (item.type) {
      case 'hero':
        return (
          <View style={[styles.heroWrap, { width: screenW, height: isTablet ? 340 : 260 }]}>
            <Image
              source={require('../../assets/photos/montenegro-beach-2.jpg')}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
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
        );
      case 'search':
        return (
          <View style={[styles.searchWrap, styles.sectionPad]}>
            <Pressable
              onPress={() => router.push('/(tabs)/istrazi' as never)}
              style={styles.searchBar}>
              <Ionicons color={colors.textSoft} name="search" size={18} />
              <AppText tone="soft" variant="body">Pretraži mjesta...</AppText>
            </Pressable>
          </View>
        );
      case 'categories':
        return (
          <View style={styles.section}>
            <View style={styles.sectionPad}>
              <SectionHeader title="Kategorije" actionLabel="Sve" onPressAction={() => router.push('/(tabs)/istrazi' as never)} />
            </View>
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
        );
      case 'places':
        return <PlaceRail places={item.data!} title={item.title!} actionLabel={item.actionLabel} actionHref={item.actionHref} />;
      case 'mayor':
        return <View style={styles.sectionPad}><MayorCard /></View>;
      default:
        return null;
    }
  }, [screenW, isTablet, PlaceRail]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <FlatList
        data={sections}
        keyExtractor={(s) => s.key}
        renderItem={renderSection}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={4}
        maxToRenderPerBatch={2}
        windowSize={5}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} tintColor={colors.primary} />}
      />
    </SafeAreaView>
  );
}

const KATIC_PHOTO = require('../../assets/katic.jpg');

function MayorCard() {
  const { width } = useWindowDimensions();
  const photoHeight = width >= 768 ? 360 : 200;

  return (
    <View style={styles.mayorCard}>
      <Image source={KATIC_PHOTO} style={[styles.mayorPhoto, { height: photoHeight }]} contentFit="cover" contentPosition={{ top: '15%', left: '50%' }} transition={200} cachePolicy="memory-disk" />
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
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    gap: spacing.section,
    paddingBottom: 40,
  },
  sectionPad: {
    paddingHorizontal: spacing.xl,
  },
  heroWrap: {
    borderBottomLeftRadius: radii.xxl,
    borderBottomRightRadius: radii.xxl,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroAppName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    lineHeight: 38,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroAppNameTablet: {
    fontSize: 36,
    lineHeight: 46,
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  section: {
    gap: spacing.md,
  },
  catRail: {
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xs,
  },
  cardRail: {
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingRight: spacing.xxxl,
    paddingVertical: spacing.xs,
  },
  gridRow: {
    gap: spacing.md,
  },
  mayorCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
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
