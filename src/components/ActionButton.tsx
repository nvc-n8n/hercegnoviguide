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
      accessibilityHint={disabled ? "Button is disabled" : undefined}
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
          style={styles.label}
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
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  secondary: {
    backgroundColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.55,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  label: {
    fontFamily: 'Manrope_700Bold',
  },
});
