import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { formatCategory } from '@/src/lib/format';
import { openDirections } from '@/src/services/directions';
import { colors, radii, shadows, spacing } from '@/src/theme';
import type { Place } from '@/src/types/place';

type MapSheetProps = {
  place: Place;
  onClose: () => void;
};

export const MapSheet = memo(({ place, onClose }: MapSheetProps) => (
  <View style={styles.sheet}>
    <View style={styles.header}>
      <View style={styles.headerText}>
        <AppText style={styles.category} tone="soft" variant="caption">
          {formatCategory(place.category)}
        </AppText>
        <AppText serif style={styles.title} variant="heading">
          {place.title}
        </AppText>
        <AppText numberOfLines={2} tone="muted" variant="label">
          {place.address}
        </AppText>
      </View>
      <Pressable accessibilityLabel="Zatvori" onPress={onClose} style={styles.closeButton}>
        <Ionicons color={colors.textSoft} name="close" size={22} />
      </Pressable>
    </View>
    <AppText numberOfLines={2} tone="muted">
      {place.description}
    </AppText>
    <View style={styles.actions}>
      <ActionButton
        icon="navigate-outline"
        label="Uputstva"
        onPress={() => openDirections({ title: place.title, lat: place.lat, lng: place.lng })}
      />
      <ActionButton
        icon="arrow-forward-outline"
        label="Detalji"
        onPress={() => {
          onClose();
          router.push(`/mjesto/${place.slug}` as never);
        }}
        variant="ghost"
      />
    </View>
  </View>
));

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  category: {
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
