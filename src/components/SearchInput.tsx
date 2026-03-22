import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
  <View style={[styles.wrap, isFocused && styles.wrapFocused]}>
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
  </View>
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
  wrapFocused: {
    transform: [{ scale: 1.02 }],
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
