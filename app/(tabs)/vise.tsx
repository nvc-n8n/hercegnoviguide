import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { AppText } from '@/src/components/AppText';
import { Screen } from '@/src/components/Screen';
import { MenuLinkList } from '@/src/features/settings/MenuLinkList';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, spacing } from '@/src/theme';

export default function MoreScreen() {
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const recentSearches = useAppStore((s) => s.recentSearches);

  return (
    <Screen>
      <View style={styles.header} accessible={true} accessibilityLabel="More section">
        <AppText serif variant="title">
          Više
        </AppText>
        <AppText tone="muted" variant="bodyLarge">
          Kratke informacije o gradu, podacima, privatnosti i načinu na koji aplikacija radi.
        </AppText>
      </View>
      <Pressable
        onPress={() => router.push('/(tabs)/sacuvano' as never)}
        style={({ pressed }) => [styles.statsCard, pressed && styles.statsCardPressed]}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${favoriteIds.length} saved places`}>
        <View style={styles.stat}>
          <AppText serif variant="heading">
            {favoriteIds.length}
          </AppText>
          <AppText tone="muted" variant="label">
            sačuvano
          </AppText>
        </View>
        <View style={styles.stat}>
          <AppText serif variant="heading">
            {recentSearches.length}
          </AppText>
          <AppText tone="muted" variant="label">
            nedavnih pretraga
          </AppText>
        </View>
      </Pressable>
      <MenuLinkList
        items={[
          {
            href: '/o-gradu',
            icon: 'information-circle-outline',
            title: 'Praktične informacije',
            subtitle: 'Kako koristiti grad i aplikaciju tokom dana',
          },
          {
            href: '/o-podacima',
            icon: 'layers-outline',
            title: 'O podacima i izvorima',
            subtitle: 'Seed, live enrichment i atribucije',
          },
          {
            href: '/privatnost',
            icon: 'shield-checkmark-outline',
            title: 'Privatnost',
            subtitle: 'Koji podaci se koriste i kada',
          },
          {
            href: '/podesavanja',
            icon: 'settings-outline',
            title: 'Podešavanja',
            subtitle: 'Jezik aplikacije i ponašanje mape',
          },
        ]}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  statsCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  stat: {
    flex: 1,
  },
});
