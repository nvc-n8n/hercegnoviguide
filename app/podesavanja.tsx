import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { Screen } from '@/src/components/Screen';
import { appCopy } from '@/src/constants/copy';
import { colors, radii, spacing } from '@/src/theme';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <Screen>
      <Pressable
        accessibilityLabel="Nazad"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={[styles.backBtn, { top: insets.top + spacing.sm }]}>
        <Ionicons color={colors.text} name="arrow-back" size={22} />
      </Pressable>
      <View style={styles.header}>
        <AppText serif variant="title">
          Podešavanja
        </AppText>
        <AppText tone="muted" variant="bodyLarge">
          Ova verzija je namjerno jednostavna: lokalni favorites, jasan jezik i bez nepotrebnih opcija.
        </AppText>
      </View>
      <View style={styles.card}>
        <AppText serif variant="subheading">
          {appCopy.languageNote}
        </AppText>
        <AppText style={styles.body} tone="muted">
          {appCopy.languageValue}
        </AppText>
      </View>
      <View style={styles.card}>
        <AppText serif variant="subheading">
          Mape i direkcije
        </AppText>
        <AppText style={styles.body} tone="muted">
          Na iOS-u se otvara Apple Maps, a na Androidu Google Maps kada je dostupan. Ako nije, koristi se web fallback.
        </AppText>
      </View>
      <View style={styles.card}>
        <AppText serif variant="subheading">
          Podaci na uređaju
        </AppText>
        <AppText style={styles.body} tone="muted">
          Sačuvana mjesta, onboarding i nedavne pretrage ostaju lokalno na uređaju.
        </AppText>
      </View>
      <ActionButton icon="arrow-back" label="Nazad" onPress={() => router.back()} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    left: spacing.xl,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    paddingTop: spacing.xxxl + spacing.xl,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  body: {
    marginTop: spacing.sm,
    lineHeight: 22,
  },
});
