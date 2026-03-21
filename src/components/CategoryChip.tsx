import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { colors, radii, spacing } from '@/src/theme';

type CategoryChipProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  onPress?: () => void;
  active?: boolean;
};

export const CategoryChip = ({ label, icon, tint, onPress, active = false }: CategoryChipProps) => (
  <Pressable
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel={`${label}${active ? ', selected' : ''}`}
    onPress={onPress}
    style={[styles.container, active && styles.active]}>
    <View style={[styles.iconWrap, { backgroundColor: tint }]}>
      <Ionicons color={colors.white} name={icon} size={20} />
    </View>
    <AppText style={styles.label} variant="label">
      {label}
    </AppText>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    minWidth: 108,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  active: {
    borderColor: colors.primary,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Manrope_700Bold',
  },
});
