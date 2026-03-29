import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { AppText } from '@/src/components/AppText';
import { colors, radii, shadows, spacing } from '@/src/theme';

type MenuItem = {
  href: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
};

export const MenuLinkList = ({ items }: { items: MenuItem[] }) => (
  <View style={styles.list}>
    {items.map((item) => (
      <Link asChild href={item.href as never} key={item.href}>
        <Pressable
          accessible={true}
          accessibilityRole="link"
          accessibilityLabel={item.title}
          accessibilityHint={item.subtitle}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <View style={styles.iconCircle}>
            <Ionicons color={colors.primary} name={item.icon} size={20} />
          </View>
          <View style={styles.content}>
            <AppText style={styles.title} variant="body">{item.title}</AppText>
            <AppText tone="muted" variant="caption">{item.subtitle}</AppText>
          </View>
          <Ionicons color={colors.textSoft} name="chevron-forward" size={18} />
        </Pressable>
      </Link>
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
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
    transform: [{ scale: 0.99 }],
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: 'Manrope_600SemiBold',
  },
});
