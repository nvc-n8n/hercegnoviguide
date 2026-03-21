import { Redirect } from 'expo-router';

import { useAppStore } from '@/src/store/useAppStore';

export default function IndexScreen() {
  const hasSeenOnboarding = useAppStore((s) => s.hasSeenOnboarding);

  return <Redirect href={hasSeenOnboarding ? '/(tabs)/pocetna' : '/onboarding'} />;
}
