import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Import font assets directly (the package index re-exports a missing useFonts module)
const PlayfairDisplay_400Regular = require('@expo-google-fonts/playfair-display/400Regular/PlayfairDisplay_400Regular.ttf');
const PlayfairDisplay_600SemiBold = require('@expo-google-fonts/playfair-display/600SemiBold/PlayfairDisplay_600SemiBold.ttf');
const PlayfairDisplay_700Bold = require('@expo-google-fonts/playfair-display/700Bold/PlayfairDisplay_700Bold.ttf');
const Manrope_400Regular = require('@expo-google-fonts/manrope/400Regular/Manrope_400Regular.ttf');
const Manrope_500Medium = require('@expo-google-fonts/manrope/500Medium/Manrope_500Medium.ttf');
const Manrope_600SemiBold = require('@expo-google-fonts/manrope/600SemiBold/Manrope_600SemiBold.ttf');
const Manrope_700Bold = require('@expo-google-fonts/manrope/700Bold/Manrope_700Bold.ttf');

import { ErrorBoundary } from '@/src/components/ErrorBoundary';
import { colors } from '@/src/theme';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const [loaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="filteri" options={{ presentation: 'modal' }} />
            <Stack.Screen name="mjesto/[slug]" />
            <Stack.Screen name="kategorija/[category]" />
            <Stack.Screen name="o-gradu" />
            <Stack.Screen name="privatnost" />
            <Stack.Screen name="o-podacima" />
            <Stack.Screen name="podesavanja" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
