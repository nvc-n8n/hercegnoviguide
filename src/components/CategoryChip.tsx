import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { colors, spacing } from '@/src/theme';

type CategoryChipProps = {
  label: string;
  emoji: string;
  onPress?: () => void;
  active?: boolean;
};

export const CategoryChip = ({ label, emoji, onPress, active = false }: CategoryChipProps) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const circleSize = isTablet ? 72 : 56;

  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${label}${active ? ', selected' : ''}`}
      onPress={onPress}
      style={({ pressed }) => [styles.container, isTablet && styles.containerTablet, pressed && styles.pressed]}>
      <View style={[styles.iconCircle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}>
        <Text style={[styles.emoji, isTablet && styles.emojiTablet]}>{emoji}</Text>
      </View>
      <AppText style={[styles.label, isTablet && styles.labelTablet]} numberOfLines={1} variant="caption">{label}</AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    width: 72,
  },
  containerTablet: {
    width: 90,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  iconCircle: {
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 26,
  },
  emojiTablet: {
    fontSize: 34,
  },
  label: {
    fontFamily: 'Manrope_500Medium',
    color: colors.text,
    textAlign: 'center',
  },
  labelTablet: {
    fontSize: 13,
  },
});
