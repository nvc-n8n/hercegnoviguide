import type { ConfigContext, ExpoConfig } from 'expo/config';

const EAS_PROJECT_ID = '9de622e0-c688-4da4-a1b8-4a9b5d5089c9';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Herceg Novi Guide',
  owner: '1302nvc',
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
  ios: {
    bundleIdentifier: 'com.mojflow.hercegnoviguide',
    supportsTablet: true,
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Lokaciju koristimo samo kada uključite opcije U blizini ili Najbliže, kako bismo prikazali mjesta oko vas.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'Lokaciju koristimo samo kada uključite opcije U blizini ili Najbliže, kako bismo prikazali mjesta oko vas.',
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
  ],
  extra: {
    eas: {
      projectId: EAS_PROJECT_ID,
    },
  },
  experiments: {
    typedRoutes: true,
  },
});
