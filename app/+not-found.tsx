import { router } from 'expo-router';

import { ActionButton } from '@/src/components/ActionButton';
import { EmptyState } from '@/src/components/EmptyState';
import { Screen } from '@/src/components/Screen';

export default function NotFoundScreen() {
  return (
    <Screen>
      <EmptyState
        body="Ova stranica ne postoji u aplikaciji."
        title="Stranica nije pronađena"
        actionLabel="Nazad na početnu"
        onPressAction={() => router.replace('/(tabs)/pocetna' as never)}
      />
    </Screen>
  );
}
