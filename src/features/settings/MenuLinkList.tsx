import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { AppText } from '@/src/components/AppText';
import { colors, radii, spacing } from '@/src/theme';

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
          <View style={styles.iconWrap}>
            <Ionicons color={colors.primary} name={item.icon} size={20} />
          </View>
          <View style={styles.content}>
            <AppText style={styles.title} variant="bodyLarge">
              {item.title}
            </AppText>
            <AppText tone="muted" variant="label">
              {item.subtitle}
            </AppText>
          </View>
          <Ionicons color={colors.textSoft} name="chevron-forward" size={18} />
        </Pressable>
      </Link>
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowPressed: {
    opacity: 0.9,
    backgroundColor: colors.cardAlt,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.cardAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
  },
});
