import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { AppText } from '@/src/components/AppText';
import { Screen } from '@/src/components/Screen';
import { MenuLinkList } from '@/src/features/settings/MenuLinkList';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radii, spacing } from '@/src/theme';

export default function MoreScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const recentSearches = useAppStore((s) => s.recentSearches);

  return (
    <>
      <StatusBar style="light" />
      <Screen>
        {/* Profile header with blue gradient */}
        <View style={[styles.profileCard, isTablet && styles.profileCardTablet]}>
          <LinearGradient
            colors={['#5B9FE6', '#3570B8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.profileContent, isTablet && styles.profileContentTablet]}>
            <Image
              source={require('../../assets/profile-girl.jpg')}
              style={[styles.avatar, isTablet && styles.avatarTablet]}
              contentFit="cover"
              transition={300}
            />
            <AppText style={[styles.profileTitle, isTablet && styles.profileTitleTablet]} tone="inverse">Milica Vukčević</AppText>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <AppText style={[styles.statNum, isTablet && styles.statNumTablet]} tone="inverse">{favoriteIds.length}</AppText>
              <AppText style={styles.statLabel} tone="inverse">Sačuvano</AppText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <AppText style={[styles.statNum, isTablet && styles.statNumTablet]} tone="inverse">{recentSearches.length}</AppText>
              <AppText style={styles.statLabel} tone="inverse">Pretraga</AppText>
            </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    height: 250,
    marginHorizontal: -spacing.xl,
    marginTop: -spacing.section,
  },
  profileCardTablet: {
    height: 280,
  },
  profileContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing.xxxl + spacing.xl,
  },
  profileContentTablet: {
    paddingTop: spacing.xxxl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: colors.white,
  },
  avatarTablet: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profileTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
  },
  profileTitleTablet: {
    fontSize: 22,
  },
  profileSub: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    opacity: 0.8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statNum: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
  },
  statNumTablet: {
    fontSize: 26,
  },
  statLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 10,
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
