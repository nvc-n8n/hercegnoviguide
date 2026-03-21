import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { Screen } from '@/src/components/Screen';
import { colors, radii, spacing } from '@/src/theme';

const sections = [
  {
    title: 'Osnovne informacije',
    body: 'Herceg Novi Guide (u nastavku "Aplikacija") je mobilna aplikacija razvijena od strane MojFlow-a. Ova Politika privatnosti objašnjava kako Aplikacija prikuplja, koristi i štiti vaše podatke.',
  },
  {
    title: 'Koje podatke prikupljamo',
    body: 'Aplikacija prikuplja samo sljedeće podatke:\n\n1. Lokacija: Samo kada aktivirate funkcije "U blizini" ili "Najbliže". Lokacija se obrađuje isključivo na vašem uređaju i nikada se ne šalje na servere, ne čuva se i ne koristi u pozadini.\n\n2. Sačuvana mjesta: Mjesta koja označite kao "savvaćena" čuvaju se lokalno na vašem uređaju.\n\n3. Nedavne pretrage: Vašu istoriju pretrage čuvamo lokalno na uređaju za vašu pogodnost.',
  },
  {
    title: 'Šta NE prikupljamo',
    body: 'Aplikacija NIKADA ne prikuplja:\n\n• Korisnički računi ili lične podatke (nema prijave)\n• IP adrese, identifikatore uređaja ili identifikatore za oglašavanje\n• Podatke o analitici ili korišćenju aplikacije\n• Podatke za praćenje (tracking)\n• Informacije o vašem redu kretanja ili putanjama\n• Bilo kakve druge lične podatke',
  },
  {
    title: 'Kako koristimo lokaciju',
    body: 'Lokacija se koristi SAMO za:\n\n• Prikaz obližnjih mjesta kada ste aktivirali "U blizini"\n• Pronalaženje najbližeg mjesta kada ste aktivirali "Najbliže"\n\nLokacija se nikada ne čuva permanentno, ne šalje vanjskim servisima i potpuno je pod vašom kontrolom. Svaki put kada otvorite Aplikaciju možete onemogućiti pristup lokaciji kroz postavke vašeg uređaja.',
  },
  {
    title: 'Treće strane i mape',
    body: 'Aplikacija koristi Apple Maps (iOS) i Google Maps (Android) za prikaz uputa i navigacije. Kada kliknete na uputstva za neko mjesto, Aplikacija otvara izabrane mape sa koordinatama.\n\nPrikupljanje podataka od strane Apple Maps i Google Maps je regulirano njihovim pojedinim Politikama privatnosti. Niste obavezni da koristite mapne funkcije - Aplikacija radi u potpunosti bez njih.',
  },
  {
    title: 'Kako se podaci čuvaju',
    body: 'Svi podaci se čuvaju ISKLJUČIVO na vašem uređaju. Nema backa-enda, nema servera i nema sinhronizacije sa internetu.\n\n• Aplikacija radi potpuno offline\n• Svi vaši izbori i sačuvana mjesta ostaju samo na vašem uređaju\n• Niko drugi ne može pristupiti vašim podacima',
  },
  {
    title: 'Brisanje podataka',
    body: 'Možete obrisati sve podatke koje je Aplikacija prikupila jednostavnom deinstalacijom:\n\n• Deinstalirajte Aplikaciju sa vašeg uređaja\n• Svi lokalni podaci (sačuvana mjesta, nedavne pretrage) će biti obrisani\n• Nema ostataka podataka na našim serverima jer oni ne postoje',
  },
  {
    title: 'Vaša prava',
    body: 'Prema GDPR i lokalnim zakonima o zaštiti podataka, imate pravo na:\n\n• Pristup: Jedini pristup vašim podacima ste vi preko Aplikacije\n• Brisanje: Možete obrisati sve podatke deinstalacijom\n• Kontrolu: Potpuna kontrola lokacije kroz postavke uređaja\n\nSvaki podatak koji Aplikacija čuva, vi ste kreirali aktivno korišćenjem (sačuvavanjem mjesta, pretraživanjem). Nema automatskog prikupljanja.',
  },
  {
    title: 'Sigurnost podataka',
    body: 'Pošto se svi podaci čuvaju lokalno na vašem uređaju, sigurnost zavisi od sigurnosti vašeg uređaja. Preporučujemo:\n\n• Koriščenje PIN-a, šablona ili biometrije na vašem uređaju\n• Redovno ažuriranje operativnog sistema\n• Deinstalaciju Aplikacije sa uređaja koji više ne koristite',
  },
  {
    title: 'Kontakt za pitanja',
    body: 'Ako imate pitanja vezano uz ovu Politiku privatnosti ili kako Aplikacija obrađuje vaše podatke, molimo vas da nas kontaktirate na info@mojflow.com ili kroz sekciju "Više" u Aplikaciji.',
  },
  {
    title: 'Izmjene Politike',
    body: 'Ova Politika privatnosti može biti azurirana. Sve izmjene će biti dostupne u ovoj sekciji Aplikacije. Nastavak korišćenja Aplikacije nakon izmjena znači da prihvatate nove uslove.',
  },
  {
    title: 'Zakonska osnova',
    body: 'Ova Politika privatnosti je usklađena sa:\n\n• Zakonom o zaštiti podataka Crne Gore\n• EU Regulativom o zaštiti podataka (GDPR 2016/679)\n• Zakonima Republike Hrvatske i Bosne i Hercegovine\n\nAplikacija je dizajnirana sa minimalnim prikupljanjem podataka kao osnovnim principom (privacy by design).',
  },
];

export default function PrivacyScreen() {
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
          Politika privatnosti
        </AppText>
        <AppText tone="muted" variant="bodyLarge">
          Saznajte kako Herceg Novi Guide štiti vaše podatke i vašu privatnost
        </AppText>
      </View>
      <View style={styles.list}>
        {sections.map((section) => (
          <View key={section.title} style={styles.card}>
            <AppText serif variant="subheading">
              {section.title}
            </AppText>
            <AppText style={styles.body} tone="muted">
              {section.body}
            </AppText>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <AppText tone="muted" variant="caption">
          Posljednja izmjena: 21. mart 2026.
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
  },
  footer: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
