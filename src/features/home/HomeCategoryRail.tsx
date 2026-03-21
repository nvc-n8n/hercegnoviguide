import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { CategoryChip } from '@/src/components/CategoryChip';
import { categories } from '@/src/constants/categories';
import { spacing } from '@/src/theme';

export const HomeCategoryRail = memo(() => (
  <ScrollView contentContainerStyle={styles.content} horizontal showsHorizontalScrollIndicator={false}>
    {categories.map((category) => (
      <View key={category.key} style={styles.item}>
        <CategoryChip
          icon={category.icon as never}
          label={category.shortTitle}
          onPress={() => router.push(`/kategorija/${category.key}` as never)}
          tint={category.color}
        />
      </View>
    ))}
  </ScrollView>
));

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  item: {
    width: 116,
  },
});
