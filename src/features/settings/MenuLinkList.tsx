import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { AppText } from '@/src/components/AppText';
import { colors, radii, shadows, spacing } from '@/src/theme';

type MenuItem = {
  href: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
};

export const MenuLinkList = ({ items }: { items: MenuItem[] }) => {
  const screenW = Dimensions.get('window').width;
  const isTablet = screenW >= 768;
  const cardWidth = isTablet ? (screenW - spacing.xl * 2 - spacing.md) / 2 : undefined;

  return (
    <View style={[styles.list, isTablet && styles.listTablet]}>
      {items.map((item) => (
        <Pressable
          key={item.href}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={item.title}
          onPress={() => router.push(item.href as never)}
          style={({ pressed }) => [
            styles.row,
            isTablet && { width: cardWidth },
            pressed && styles.rowPressed,
          ]}>
          <View style={styles.iconCircle}>
            <Ionicons color={colors.primary} name={item.icon} size={20} />
          </View>
          <View style={styles.content}>
            <AppText style={styles.title}>{item.title}</AppText>
            <AppText tone="muted" variant="caption">{item.subtitle}</AppText>
          </View>
          <Ionicons color={colors.textSoft} name="chevron-forward" size={16} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  listTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.soft,
  },
  rowPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
  },
});
