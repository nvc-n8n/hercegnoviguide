import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.textSoft,
        tabBarStyle: {
          backgroundColor: '#FFFAF6',
          borderTopColor: '#E0D5C8',
          borderTopWidth: 1,
          paddingTop: 8,
          height: 84,
        },
        tabBarLabelStyle: {
          fontFamily: 'Manrope_600SemiBold',
          fontSize: 11,
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}>
      <Tabs.Screen
        name="pocetna"
        options={{
          title: 'Početna',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="home-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="istrazi"
        options={{
          title: 'Istraži',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="compass-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="map-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="sacuvano"
        options={{
          title: 'Sačuvano',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="heart-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="vise"
        options={{
          title: 'Više',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="menu-outline" size={size} />,
        }}
      />
    </Tabs>
  );
}
