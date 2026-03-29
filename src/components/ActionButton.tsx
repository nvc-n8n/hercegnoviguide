import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { colors, radii, spacing } from '@/src/theme';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
};

export const ActionButton = memo(({
  label,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
}: ActionButtonProps) => {
  const isGhost = variant === 'ghost';
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isGhost && styles.ghost,
        isSecondary && styles.secondary,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <View style={styles.content}>
        {icon ? (
          <Ionicons
            color={isGhost ? colors.primary : colors.white}
            name={icon}
            size={18}
            style={styles.icon}
          />
        ) : null}
        <AppText
          style={[styles.label, isGhost && styles.ghostLabel]}
          tone={isGhost ? 'default' : 'inverse'}
          variant="body">
          {label}
        </AppText>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.pill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.text,
  },
  ghost: {
    backgroundColor: colors.primaryLight,
    borderWidth: 0,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  label: {
    fontFamily: 'Manrope_600SemiBold',
  },
  ghostLabel: {
    color: colors.primary,
  },
});
