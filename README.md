# Herceg Novi Guide

A premium city guide app for **Herceg Novi, Montenegro** — built with Expo & React Native.

Discover attractions, beaches, restaurants, viewpoints, nightlife, and hidden gems across one of the most beautiful towns on the Adriatic coast. Designed for tourists and locals alike, with a warm Mediterranean aesthetic and full offline-first architecture.

---

## Screenshots

> Coming soon — the app is in active development ahead of its first client demo.

---

## Features

- **Full-width category carousel** with paged swiping, animated dot indicators, and curated photography
- **Interactive map** with location-based discovery and category filtering
- **Neighbourhood exploration** — browse places by area (Topla, Savina, Igalo, Stari Grad…)
- **Save & bookmark** your favourite spots for later
- **City mayor section** — featuring Stevan Katić with bio, achievements, and city CTA
- **Beautiful editorial content** — curated city photos, practical info, and local tips
- **Search** with fuzzy matching across all places and categories
- **Onboarding flow** for first-time users
- **Settings** with language, notifications, and privacy controls

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Expo SDK 55](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/) |
| Language | TypeScript |
| UI | React Native with `expo-image`, `expo-linear-gradient` |
| Fonts | Manrope (body) + Playfair Display (display headings) |
| State | [Zustand](https://github.com/pmndrs/zustand) |
| Maps | `expo-maps` + `expo-location` |
| Search | [Fuse.js](https://www.fusejs.io/) |
| Build & Deploy | [EAS Build](https://docs.expo.dev/build/introduction/) |

## Project Structure

```
├── app/                    # Expo Router file-based routing
│   ├── (tabs)/             # Bottom tab navigator
│   │   ├── pocetna.tsx     #   Home screen
│   │   ├── istrazi.tsx     #   Explore / browse
│   │   ├── mapa.tsx        #   Map view
│   │   ├── sacuvano.tsx    #   Saved / bookmarks
│   │   └── vise.tsx        #   More / settings menu
│   ├── kategorija/         # Category detail screens
│   ├── mjesto/             # Place detail screens
│   ├── o-gradu.tsx         # About the city
│   ├── o-podacima.tsx      # Practical info
│   ├── podesavanja.tsx     # Settings
│   └── privatnost.tsx      # Privacy policy
├── src/
│   ├── components/         # Reusable UI components
│   ├── constants/          # Categories, copy, hero images
│   ├── data/               # Seed data, areas, editorial content
│   ├── features/           # Feature modules
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities
│   ├── services/           # API / data services
│   ├── store/              # Zustand stores
│   ├── theme/              # Colors, spacing, typography tokens
│   └── types/              # TypeScript type definitions
├── assets/                 # App icons, splash screen, photos
├── app.config.ts           # Expo config
└── eas.json                # EAS Build profiles
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — comes with `npx`
- [Expo Go](https://expo.dev/go) app installed on your phone (iOS or Android)

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/herceg-novi-guide.git
cd herceg-novi-guide

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

A QR code will appear in the terminal.

### Run on Android

1. Install **Expo Go** from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Open Expo Go on your phone
3. Tap **"Scan QR code"** and scan the QR code from the terminal
4. The app will load and you can use it like a normal app

> **Tip:** If your phone and computer are on different networks, start the server with tunnel mode:
> ```bash
> npx expo start --tunnel
> ```
> This works over any network (WiFi, mobile data, different locations).

### Run on iOS

1. Install **Expo Go** from the [App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Open the **Camera app** on your iPhone
3. Point it at the QR code — tap the notification that appears
4. The app opens in Expo Go

### Run on Web (optional)

```bash
npx expo start --web
```

---

## Building for Production

We use [EAS Build](https://docs.expo.dev/build/introduction/) for creating production binaries.

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build for Android (APK for testing)
eas build --profile preview --platform android

# Build for iOS (requires Apple Developer account)
eas build --profile preview --platform ios

# Build for stores
eas build --profile production --platform all
```

### Build Profiles

| Profile | Android | iOS | Use Case |
|---------|---------|-----|----------|
| `development` | APK (debug) | Simulator | Local development with dev client |
| `preview` | APK | Ad Hoc | Internal testing, client demos |
| `production` | AAB | App Store | Store submission |

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_MAPS_API_KEY` | Google Maps API key for Android map tiles | Optional (map works without it) |

Create a `.env.local` file in the project root if needed:

```
GOOGLE_MAPS_API_KEY=your_key_here
```

---

## Contributing

This is a client project for the city of Herceg Novi. For access or contribution requests, contact the development team.

---

## License

Private — All rights reserved. This project is not open source.

---

Built with care for Herceg Novi by [mojflow.co](https://mojflow.co)
