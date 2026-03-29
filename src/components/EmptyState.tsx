import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ActionButton } from '@/src/components/ActionButton';
import { AppText } from '@/src/components/AppText';
import { colors, spacing } from '@/src/theme';

type EmptyStateProps = {
  title: string;
  body: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onPressAction?: () => void;
};

export const EmptyState = memo(({
  title,
  body,
  icon = 'sparkles-outline',
  actionLabel,
  onPressAction,
}: EmptyStateProps) => (
  <View style={styles.container}>
    <View style={styles.iconCircle}>
      <Ionicons color={colors.primary} name={icon} size={36} />
    </View>
    <AppText variant="heading" style={styles.title}>{title}</AppText>
    <AppText style={styles.body} tone="muted" variant="body">{body}</AppText>
    {actionLabel && onPressAction ? <ActionButton label={actionLabel} onPress={onPressAction} /> : null}
  </View>
));

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    maxWidth: 280,
  },
});
