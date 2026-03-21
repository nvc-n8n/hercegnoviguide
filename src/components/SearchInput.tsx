import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useState } from 'react';

import { colors, radii, spacing } from '@/src/theme';

type SearchInputProps = {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onOpenFilters?: () => void;
};

export const SearchInput = ({ value, placeholder, onChangeText, onOpenFilters }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderScale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: borderScale.value }],
  }));

  const handleFocus = () => {
    setIsFocused(true);
    borderScale.value = withSpring(1.02, { damping: 16, stiffness: 140 });
    shadowOpacity.value = withSpring(0.15, { damping: 16, stiffness: 140 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderScale.value = withSpring(1, { damping: 16, stiffness: 140 });
    shadowOpacity.value = withSpring(0, { damping: 16, stiffness: 140 });
  };

  return (
  <Animated.View style={[styles.wrap, animStyle, { shadowOpacity }]}>
    <Ionicons color={colors.textSoft} name="search-outline" size={20} />
    <TextInput
      accessibilityLabel={placeholder}
      accessible={true}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      placeholderTextColor={colors.textSoft}
      style={[styles.input, isFocused && styles.inputFocused]}
      value={value}
    />
    {onOpenFilters ? (
      <Pressable accessibilityLabel="Filteri" onPress={onOpenFilters} style={styles.filterButton}>
        <Ionicons color={colors.primary} name="options-outline" size={20} />
      </Pressable>
    ) : null}
  </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    minHeight: 54,
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 15,
    fontFamily: 'Manrope_400Regular',
    color: colors.text,
    padding: 0,
  },
  inputFocused: {
    color: colors.primary,
  },
  filterButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
