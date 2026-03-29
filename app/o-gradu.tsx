import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { Screen } from '@/src/components/Screen';
import { colors, radii, spacing } from '@/src/theme';

const HN_HERO = require('../assets/photos/viewpoint-bay-1.jpg');
const HN_PROMENADE = require('../assets/photos/promenade-1.jpg');
const HN_OLD_CITY = require('../assets/photos/herceg-novi-old-town-1.jpg');
const HN_FORTE = require('../assets/photos/herceg-novi-fortress-1.jpg');

const sections = [
  {
    title: 'Kako planirati dan',
    body: 'Centar je najlakši za jutarnju kafu i kraću šetnju, plaže su praktične od kasnog jutra, a večernji planovi se prirodno nastavljaju uz šetalište.',
    photo: HN_PROMENADE,
  },
  {
    title: 'Kretanje po gradu',
    body: 'Najviše stvari u užem dijelu grada možete povezati pješke. Za dalje tačke kao Savina, Meljine, Njivice ili Luštica računajte na automobil ili organizovan prevoz.',
    photo: HN_OLD_CITY,
  },
  {
    title: 'Kada tražiti lokaciju',
    body: 'Opcije U blizini i Najbliže imaju smisla kada ste već na terenu. Uputstva rade i bez aplikacijske lokacije jer se navigacija otvara direktno u mapi.',
    photo: null,
  },
  {
    title: 'Šta sačuvati unaprijed',
    body: 'Sačuvajte plažu, jedno mjesto za ručak i rezervnu večernju opciju. Tako je lakše mijenjati plan bez ponovne pretrage.',
    photo: HN_FORTE,
  },
];

export default function AboutCityScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Screen>
      {/* Back button */}
      <Pressable
        accessibilityLabel="Nazad"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={[styles.backBtn, { top: insets.top + spacing.sm }]}>
        <Ionicons color={colors.text} name="arrow-back" size={22} />
      </Pressable>

      {/* Hero photo */}
      <View style={styles.heroWrap}>
        <Image
          source={HN_HERO}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={400}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.6)']}
          locations={[0.4, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroContent}>
          <AppText serif style={styles.heroTitle} tone="inverse">
            Herceg Novi
          </AppText>
          <AppText style={styles.heroSub} tone="inverse" variant="body">
            Grad sunca, stepenica i Boke Kotorske
          </AppText>
        </View>
      </View>

      {/* Intro */}
      <View style={styles.intro}>
        <AppText serif variant="title">
          Praktične informacije
        </AppText>
        <AppText tone="muted" variant="bodyLarge" style={styles.introBody}>
          Kratke smjernice za lakše kretanje, planiranje dana i korišćenje aplikacije na licu mjesta.
        </AppText>
      </View>

      {/* Sections */}
      <View style={styles.list}>
        {sections.map((section) => (
          <View key={section.title} style={styles.card}>
            {section.photo ? (
              <View style={styles.cardPhoto}>
                <Image
                  source={section.photo}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                  transition={300}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.25)']}
                  style={StyleSheet.absoluteFill}
                />
              </View>
            ) : null}
            <View style={styles.cardBody}>
              <AppText serif variant="subheading">
                {section.title}
              </AppText>
              <AppText style={styles.cardText} tone="muted">
                {section.body}
              </AppText>
            </View>
          </View>
        ))}
      </View>

      {/* Bottom CTA */}
      <View style={styles.cta}>
        <ActionButton
          icon="compass-outline"
          label="Istraži grad"
          onPress={() => router.push('/(tabs)/istrazi' as never)}
        />
        <ActionButton
          icon="map-outline"
          label="Otvori mapu"
          onPress={() => router.push('/(tabs)/mapa' as never)}
          variant="ghost"
        />
      </View>
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
  heroWrap: {
    height: 260,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginTop: spacing.xxxl + spacing.xl,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xl,
    gap: spacing.xs,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 36,
    lineHeight: 42,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroSub: {
    opacity: 0.85,
    fontFamily: 'Manrope_400Regular',
  },
  intro: {
    gap: spacing.sm,
  },
  introBody: {
    lineHeight: 24,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cardPhoto: {
    height: 160,
  },
  cardBody: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardText: {
    lineHeight: 22,
  },
  cta: {
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
});
