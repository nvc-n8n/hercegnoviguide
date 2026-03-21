import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/src/components/AppText';
import { colors, spacing } from '@/src/theme';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export const SectionHeader = ({ title, subtitle, actionLabel, onPressAction }: SectionHeaderProps) => (
  <View style={styles.row}>
    <View style={styles.textWrap}>
      <AppText serif variant="heading">
        {title}
      </AppText>
      {subtitle ? (
        <AppText style={styles.subtitle} tone="muted">
          {subtitle}
        </AppText>
      ) : null}
    </View>
    {actionLabel && onPressAction ? (
      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={actionLabel}
        onPress={onPressAction}
        style={({ pressed }) => [styles.actionLink, pressed && styles.actionPressed]}>
        <AppText style={styles.actionText} variant="label">
          {actionLabel}
        </AppText>
        <Ionicons color={colors.secondary} name="chevron-forward" size={14} />
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  textWrap: {
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  actionPressed: {
    opacity: 0.6,
  },
  actionText: {
    color: colors.secondary,
    fontFamily: 'Manrope_600SemiBold',
  },
});
