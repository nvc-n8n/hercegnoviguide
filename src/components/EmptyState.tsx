import { memo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
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
    <View style={styles.iconWrap}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDeep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBg}>
        <Ionicons color={colors.white} name={icon} size={28} />
      </LinearGradient>
      <View style={styles.iconBorder} />
    </View>
    <AppText serif style={styles.title} variant="heading">
      {title}
    </AppText>
    <View style={styles.line} />
    <AppText style={styles.body} tone="muted">
      {body}
    </AppText>
    {actionLabel && onPressAction ? <ActionButton label={actionLabel} onPress={onPressAction} /> : null}
  </View>
));

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.lg,
    justifyContent: 'center',
  },
  iconWrap: {
    position: 'relative',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gradientBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBorder: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  line: {
    width: 32,
    height: 2,
    backgroundColor: colors.secondary,
    borderRadius: 1,
    marginBottom: spacing.sm,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  body: {
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 20,
  },
});
