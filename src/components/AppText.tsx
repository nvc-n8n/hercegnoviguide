import { memo } from 'react';
import { Text, type TextProps } from 'react-native';

import { colors, typography } from '@/src/theme';

type Variant = 'hero' | 'title' | 'heading' | 'subheading' | 'body' | 'bodyLarge' | 'label' | 'caption';

type AppTextProps = TextProps & {
  variant?: Variant;
  tone?: 'default' | 'muted' | 'soft' | 'inverse';
  serif?: boolean;
};

const fontSizeByVariant: Record<Variant, number> = {
  hero: typography.hero,
  title: typography.title,
  heading: typography.heading,
  subheading: typography.subheading,
  body: typography.body,
  bodyLarge: typography.bodyLarge,
  label: typography.label,
  caption: typography.caption,
};

const lineHeightByVariant: Record<Variant, number> = {
  hero: 48,
  title: 38,
  heading: 32,
  subheading: 24,
  body: 22,
  bodyLarge: 24,
  label: 18,
  caption: 15,
};

const letterSpacingByVariant: Partial<Record<Variant, number>> = {
  hero: -0.3,
  title: -0.2,
  caption: 0.2,
  label: 0.1,
};

const toneColor = {
  default: colors.text,
  muted: colors.textMuted,
  soft: colors.textSoft,
  inverse: colors.white,
};

export const AppText = memo(({
  variant = 'body',
  tone = 'default',
  serif = false,
  style,
  ...props
}: AppTextProps) => (
  <Text
    {...props}
    style={[
      {
        color: toneColor[tone],
        fontSize: fontSizeByVariant[variant],
        lineHeight: lineHeightByVariant[variant],
        fontFamily: serif ? 'PlayfairDisplay_400Regular' : 'Manrope_400Regular',
        letterSpacing: letterSpacingByVariant[variant],
      },
      style,
    ]}
  />
));
