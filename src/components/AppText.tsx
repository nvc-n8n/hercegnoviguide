import { memo } from 'react';
import { Text, type TextProps } from 'react-native';

import { colors, typography } from '@/src/theme';

type Variant = 'hero' | 'title' | 'heading' | 'subheading' | 'body' | 'bodyLarge' | 'overline' | 'label' | 'caption';

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
  overline: typography.overline,
  label: typography.label,
  caption: typography.caption,
};

const lineHeightByVariant: Record<Variant, number> = {
  hero: 34,
  title: 28,
  heading: 24,
  subheading: 22,
  body: 20,
  bodyLarge: 22,
  overline: 15,
  label: 18,
  caption: 15,
};

const fontFamilyByVariant: Partial<Record<Variant, string>> = {
  hero: 'Manrope_700Bold',
  title: 'Manrope_700Bold',
  heading: 'Manrope_700Bold',
  subheading: 'Manrope_600SemiBold',
  overline: 'Manrope_600SemiBold',
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
        fontFamily: fontFamilyByVariant[variant] ?? 'Manrope_400Regular',
      },
      style,
    ]}
  />
));
