import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { Screen } from '@/src/components/Screen';
import { MenuLinkList } from '@/src/features/settings/MenuLinkList';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, shadows, spacing } from '@/src/theme';

export default function MoreScreen() {
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const recentSearches = useAppStore((s) => s.recentSearches);

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="title">Profil</AppText>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <AppText style={styles.statNum}>{favoriteIds.length}</AppText>
          <AppText tone="muted" variant="caption">Sačuvano</AppText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <AppText style={styles.statNum}>{recentSearches.length}</AppText>
          <AppText tone="muted" variant="caption">Pretraga</AppText>
        </View>
      </View>

      <MenuLinkList
        items={[
          { href: '/o-gradu', icon: 'information-circle-outline', title: 'Praktične informacije', subtitle: 'Kako koristiti grad i aplikaciju' },
          { href: '/o-podacima', icon: 'layers-outline', title: 'O podacima', subtitle: 'Izvori podataka i atribucije' },
          { href: '/privatnost', icon: 'shield-checkmark-outline', title: 'Privatnost', subtitle: 'Koji podaci se koriste' },
          { href: '/podesavanja', icon: 'settings-outline', title: 'Podešavanja', subtitle: 'Jezik i ponašanje mape' },
        ]}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.sm },
  statsCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: radii.xl, padding: spacing.xl, ...shadows.card,
  },
  stat: { flex: 1, alignItems: 'center', gap: spacing.xs },
  statNum: { fontFamily: 'Manrope_700Bold', fontSize: 28, color: colors.primary },
  statDivider: { width: 1, height: 36, backgroundColor: colors.border },
});
