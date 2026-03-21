import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { Screen } from '@/src/components/Screen';
import { colors, radii, spacing } from '@/src/theme';

const items = [
  {
    title: 'Lokalni starter sadržaj',
    body: 'Starter dataset je kuriran u repozitorijumu i služi za brz rad aplikacije bez mrežne zavisnosti.',
  },
  {
    title: 'OpenStreetMap izvori',
    body: 'Nazivi lokacija, koordinate i osnovne adresne smjernice u početnom seed-u dolaze iz OpenStreetMap podataka.',
  },
  {
    title: 'Atribucija',
    body: 'Svi geografski podaci koriste OpenStreetMap kao izvor. Dodatni izvori će biti označeni uz svako mjesto.',
  },
];

export default function DataSourcesScreen() {
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
          O podacima i izvorima
        </AppText>
        <AppText tone="muted" variant="bodyLarge">
          Aplikacija radi potpuno offline sa lokalnim podacima.
        </AppText>
      </View>
      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.title} style={styles.card}>
            <AppText serif variant="subheading">
              {item.title}
            </AppText>
            <AppText style={styles.body} tone="muted">
              {item.body}
            </AppText>
          </View>
        ))}
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
  list: {
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
