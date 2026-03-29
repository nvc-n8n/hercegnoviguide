import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { colors, spacing } from '@/src/theme';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export const SectionHeader = ({ title, subtitle, actionLabel, onPressAction }: SectionHeaderProps) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View style={styles.row}>
      <View style={styles.textWrap}>
        <AppText variant={isTablet ? 'title' : 'heading'}>{title}</AppText>
        {subtitle ? (
          <AppText tone="muted" variant={isTablet ? 'body' : 'caption'}>{subtitle}</AppText>
        ) : null}
      </View>
      {actionLabel && onPressAction ? (
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onPressAction}
          style={({ pressed }) => [pressed && styles.actionPressed]}>
          <AppText style={styles.actionText} variant={isTablet ? 'body' : 'label'}>{actionLabel}</AppText>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  actionPressed: {
    opacity: 0.6,
  },
  actionText: {
    color: colors.primary,
    fontFamily: 'Manrope_600SemiBold',
  },
});
