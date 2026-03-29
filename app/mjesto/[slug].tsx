import { useEffect } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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
import { colors, radii, shadows, spacing } from '@/src/theme';

export default function PlaceDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slug: string }>();
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const addRecentView = useAppStore((s) => s.addRecentView);
  const place = getPlaceBySlug(params.slug);

  useEffect(() => {
    if (place) addRecentView(place.id);
  }, [addRecentView, place]);

  if (!place) {
    return (
      <Screen>
        <EmptyState body="Mjesto nije pronađeno." title="Nije dostupno" />
      </Screen>
    );
  }

  const isSaved = favoriteIds.includes(place.id);
  const relatedPlaces = getCategoryPlaces(place.category)
    .filter((c) => c.id !== place.id)
    .slice(0, 4);

  return (
    <Screen>
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
          onPress={() => router.replace('/(tabs)/pocetna' as never)}
          style={[styles.backBtn, { top: Math.max(insets.top, spacing.lg) }]}>
          <Ionicons color={colors.text} name="chevron-back" size={22} />
        </Pressable>
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <View style={styles.actionPrimary}>
          <ActionButton icon="navigate" label="Uputstva" onPress={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })} />
        </View>
        <Pressable onPress={() => toggleFavorite(place.id)} style={styles.actionCircle}>
          <Ionicons color={isSaved ? colors.secondary : colors.textMuted} name={isSaved ? 'heart' : 'heart-outline'} size={20} />
        </Pressable>
        <Pressable onPress={() => sharePlace(place)} style={styles.actionCircle}>
          <Ionicons color={colors.textMuted} name="share-outline" size={20} />
        </Pressable>
      </View>

      {/* Info card */}
      <View style={styles.infoCard}>
        <AppText variant="heading">O mjestu</AppText>
        <AppText tone="muted" style={styles.desc}>{place.description}</AppText>
        <View style={styles.divider} />
        <InfoRow icon="location" text={place.address} />
        <InfoRow icon="star" text={formatRating(place.rating, place.reviewCount)} />
        {place.openingHours?.weekdayText?.length ? (
          <InfoRow icon="time-outline" text={place.openingHours.weekdayText[0]} />
        ) : null}
      </View>

      {place.quickFacts.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader title="Informacije" />
          <View style={styles.factsGrid}>
            {place.quickFacts.map((f) => (
              <View key={f.label} style={styles.factCard}>
                <AppText tone="muted" variant="caption">{f.label}</AppText>
                <AppText variant="body" style={styles.factValue}>{f.value}</AppText>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader title="Lokacija" />
        <MapPreview address={place.address} lat={place.lat} lng={place.lng} title={place.title} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Kontakt" />
        <View style={styles.contactRow}>
          {place.phone ? <ActionButton icon="call-outline" label="Pozovi" onPress={() => Linking.openURL(`tel:${place.phone}`)} variant="ghost" /> : null}
          {place.website ? <ActionButton icon="globe-outline" label="Web sajt" onPress={() => Linking.openURL(place.website!)} variant="ghost" /> : null}
          {!place.phone && !place.website ? <AppText tone="muted" variant="caption">Kontaktni podaci uskoro.</AppText> : null}
        </View>
      </View>

      {relatedPlaces.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader title="Slična mjesta" />
          <View style={styles.relatedGrid}>{relatedPlaces.map((rp, i) => (
            <PlaceListItem key={rp.id} index={i} onPress={() => router.push(`/mjesto/${rp.slug}` as never)} onPressDirections={() => openDirections({ title: rp.title, lat: rp.lat, lng: rp.lng })} place={rp} />
          ))}</View>
        </View>
      ) : null}

      <View style={{ alignItems: 'center', paddingVertical: spacing.md }}>
        <AppText tone="soft" variant="caption">Izvor: OpenStreetMap</AppText>
      </View>
    </Screen>
  );
}

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={infoStyles.row}>
      <Ionicons color={colors.primary} name={icon as never} size={16} />
      <AppText variant="body">{text}</AppText>
    </View>
  );
}

const infoStyles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md } });

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute', left: spacing.sm, width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...shadows.soft,
  },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  actionPrimary: { flex: 1 },
  actionCircle: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  infoCard: {
    backgroundColor: colors.card, borderRadius: radii.lg, padding: spacing.xl, gap: spacing.md, ...shadows.soft,
  },
  desc: { lineHeight: 22 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  section: { gap: spacing.md },
  factsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  factCard: {
    width: '48%', backgroundColor: colors.card, borderRadius: radii.md,
    padding: spacing.md, gap: spacing.xs, ...shadows.soft,
  },
  factValue: { fontFamily: 'Manrope_600SemiBold' },
  contactRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  relatedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
});
