import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSoft,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#1B2A4A',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontFamily: 'Manrope_500Medium',
          fontSize: 10,
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="pocetna"
        options={{
          title: 'Početna',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons color={color} name={focused ? 'home' : 'home-outline'} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="istrazi"
        options={{
          title: 'Istraži',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons color={color} name={focused ? 'search' : 'search-outline'} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons color={color} name={focused ? 'map' : 'map-outline'} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="sacuvano"
        options={{
          title: 'Sačuvano',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons color={color} name={focused ? 'heart' : 'heart-outline'} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="vise"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons color={color} name={focused ? 'person' : 'person-outline'} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
