import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { colors, radii, shadows, spacing } from '@/src/theme';

type SearchInputProps = {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onOpenFilters?: () => void;
};

export const SearchInput = ({ value, placeholder, onChangeText, onOpenFilters }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrap, isFocused && styles.wrapFocused]}>
      <Ionicons color={colors.primary} name="search" size={20} />
      <TextInput
        accessibilityLabel={placeholder}
        accessible={true}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        style={styles.input}
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
    minHeight: 48,
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.card,
  },
  wrapFocused: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    fontFamily: 'Manrope_400Regular',
    color: colors.text,
    padding: 0,
  },
  filterButton: {
    minWidth: 36,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
