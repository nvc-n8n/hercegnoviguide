import { useEffect } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { EmptyState } from '@/src/components/EmptyState';
import { HeroCard } from '@/src/components/HeroCard';
import { MapPreview } from '@/src/components/MapPreview';
import { PlaceListItem } from '@/src/components/PlaceListItem';
import { Screen } from '@/src/components/Screen';
import { SectionHeader } from '@/src/components/SectionHeader';
import { getHeroImageUri } from '@/src/constants/heroImages';
import { formatCategory, formatRating } from '@/src/lib/format';
import { openDirections } from '@/src/services/directions';
import { sharePlace } from '@/src/services/share';
import { getCategoryPlaces, getPlaceBySlug } from '@/src/services/places';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, spacing } from '@/src/theme';

export default function PlaceDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slug: string }>();
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const addRecentView = useAppStore((s) => s.addRecentView);
  const place = getPlaceBySlug(params.slug);

  useEffect(() => {
    if (place) {
      addRecentView(place.id);
    }
  }, [addRecentView, place]);

  if (!place) {
    return (
      <Screen>
        <EmptyState body="Mjesto nije pronađeno u lokalnom vodiču." title="Mjesto nije dostupno" />
      </Screen>
    );
  }

  const isSaved = favoriteIds.includes(place.id);
  const relatedPlaces = getCategoryPlaces(place.category)
    .filter((candidate) => candidate.id !== place.id)
    .slice(0, 4);

  return (
    <Screen>
      {/* Hero with floating back button */}
      <View>
        <HeroCard
          badge={formatCategory(place.category)}
          subtitle={place.address}
          title={place.title}
          variant={place.heroVariant}
          imageSource={getHeroImageUri(place.id, place.category)}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Nazad"
          onPress={() => router.back()}
          style={[styles.backBtn, { top: Math.max(insets.top, spacing.lg) + spacing.sm }]}>
          <Ionicons color={colors.white} name="arrow-back" size={22} />
        </Pressable>
      </View>

      {/* Action row */}
      <Animated.View entering={FadeInUp.duration(300).delay(100)} style={styles.actionRow}>
        <View style={styles.actionPrimary}>
          <ActionButton
            icon="navigate-outline"
            label="Uputstva"
            onPress={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
          />
        </View>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'Remove from favorites' : 'Add to favorites'}
          onPress={() => toggleFavorite(place.id)}
          style={styles.actionIcon}>
          <Ionicons color={isSaved ? colors.danger : colors.textMuted} name={isSaved ? 'heart' : 'heart-outline'} size={22} />
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Share this place"
          onPress={() => sharePlace(place)}
          style={styles.actionIcon}>
          <Ionicons color={colors.textMuted} name="share-social-outline" size={22} />
        </Pressable>
      </Animated.View>

      {/* Description card */}
      <Animated.View entering={FadeInUp.duration(300).delay(200)} style={styles.metaCard}>
        <AppText serif variant="subheading">
          O mjestu
        </AppText>
        <AppText tone="muted" style={styles.descriptionText}>{place.description}</AppText>
        <View style={styles.metaGroup}>
          <View style={styles.metaRow}>
            <Ionicons color={colors.primary} name="location-outline" size={16} />
            <AppText variant="label">{place.address}</AppText>
          </View>
          <View style={styles.metaRow}>
            <Ionicons color={colors.warning} name="star-outline" size={16} />
            <AppText variant="label">{formatRating(place.rating, place.reviewCount)}</AppText>
          </View>
          {place.openingHours?.weekdayText?.length ? (
            <View style={styles.metaRow}>
              <Ionicons color={colors.success} name="time-outline" size={16} />
              <AppText variant="label">{place.openingHours.weekdayText[0]}</AppText>
            </View>
          ) : null}
        </View>
      </Animated.View>

      {/* Quick facts */}
      {place.quickFacts.length > 0 ? (
        <Animated.View entering={FadeInUp.duration(300).delay(300)} style={styles.section}>
          <SectionHeader title="Brže informacije" />
          <View style={styles.quickFacts}>
            {place.quickFacts.map((fact) => (
              <View key={fact.label} style={styles.factCard}>
                <AppText tone="soft" variant="caption">
                  {fact.label}
                </AppText>
                <AppText style={styles.factValue} variant="bodyLarge">
                  {fact.value}
                </AppText>
              </View>
            ))}
          </View>
        </Animated.View>
      ) : null}

      {/* Map */}
      <Animated.View entering={FadeInUp.duration(300).delay(400)} style={styles.section}>
        <SectionHeader title="Lokacija" />
        <MapPreview address={place.address} lat={place.lat} lng={place.lng} title={place.title} />
      </Animated.View>

      {/* Contact */}
      <Animated.View entering={FadeInUp.duration(300).delay(500)} style={styles.section}>
        <SectionHeader title="Kontakt i linkovi" />
        <View style={styles.contactRow}>
          {place.phone ? (
            <ActionButton icon="call-outline" label="Pozovi" onPress={() => Linking.openURL(`tel:${place.phone}`)} variant="ghost" />
          ) : null}
          {place.website ? (
            <ActionButton icon="globe-outline" label="Sajt" onPress={() => Linking.openURL(place.website!)} variant="ghost" />
          ) : null}
          {!place.phone && !place.website ? (
            <AppText tone="muted" variant="label">Kontaktni podaci uskoro.</AppText>
          ) : null}
        </View>
      </Animated.View>

      {/* Related places */}
      {relatedPlaces.length > 0 ? (
        <Animated.View entering={FadeInUp.duration(300).delay(600)} style={styles.section}>
          <SectionHeader title="Slična mjesta" />
          <View style={styles.related}>
            {relatedPlaces.map((relatedPlace, index) => (
              <PlaceListItem
                key={relatedPlace.id}
                index={index}
                onPress={() => router.push(`/mjesto/${relatedPlace.slug}` as never)}
                onPressDirections={() =>
                  openDirections({ title: relatedPlace.title, lat: relatedPlace.lat, lng: relatedPlace.lng })
                }
                place={relatedPlace}
              />
            ))}
          </View>
        </Animated.View>
      ) : null}

      <View style={styles.sourceCard}>
        <AppText tone="soft" variant="caption">
          Izvor: OpenStreetMap
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  actionPrimary: {
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.xl,
    gap: spacing.md,
  },
  descriptionText: {
    lineHeight: 22,
  },
  metaGroup: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quickFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  factCard: {
    width: '47%',
    backgroundColor: colors.cardAlt,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  factValue: {
    fontFamily: 'Manrope_700Bold',
  },
  section: {
    gap: spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  related: {
    gap: spacing.md,
  },
  sourceCard: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
});
