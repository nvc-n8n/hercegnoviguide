import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Herceg Novi Guide',
  slug: 'hercegnoviguide',
  scheme: 'hercegnoviguide',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#F6F1E7',
  },
  assetBundlePatterns: ['**/*'],
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 30000,
    url: 'https://u.expo.dev/YOUR_PROJECT_ID',
  },
  newArchEnabled: false,
  ios: {
    bundleIdentifier: 'com.mojflow.hercegnoviguide',
    supportsTablet: true,
    usesAppleSignIn: false,
    buildNumber: '1',
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Lokaciju koristimo samo kada uključite opcije U blizini ili Najbliže, kako bismo prikazali mjesta oko vas.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'Lokaciju koristimo samo kada uključite opcije U blizini ili Najbliže, kako bismo prikazali mjesta oko vas.',
      UIRequiredDeviceCapabilities: ['location-services'],
    },
  },
  android: {
    package: 'com.mojflow.hercegnoviguide',
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundColor: '#F6F1E7',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    permissions: ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION'],
    config: process.env.GOOGLE_MAPS_API_KEY
      ? { googleMaps: { apiKey: process.env.GOOGLE_MAPS_API_KEY } }
      : undefined,
  },
  web: {
    bundler: 'metro',
    output: 'single',
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-location',
      {
        locationWhenInUsePermission:
          'Lokaciju koristimo samo za prikaz mjesta u blizini i sortiranje po udaljenosti.',
      },
    ],
    [
      'expo-maps',
      {
        requestLocationPermission: false,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
