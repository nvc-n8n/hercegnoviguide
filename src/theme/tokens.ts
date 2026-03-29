export const colors = {
  background: '#F0F4FA',
  backgroundMuted: '#E8EEF6',
  card: '#FFFFFF',
  cardAlt: '#F5F8FC',
  text: '#2D3748',
  textMuted: '#6B7D99',
  textSoft: '#A0B0C8',
  border: '#DDE5F0',
  primary: '#4A90D9',
  primaryDeep: '#3570B8',
  primaryLight: '#E8F1FB',
  secondary: '#FF6B6B',
  accent: '#4A90D9',
  accentSoft: '#E8F1FB',
  success: '#27AE60',
  warning: '#F2994A',
  danger: '#EB5757',
  night: '#2D3748',
  shadow: 'rgba(27,42,74,0.10)',
  overlay: 'rgba(27,42,74,0.45)',
  white: '#FFFFFF',
  black: '#000000',
  terracotta: '#FF6B6B',
  terracottaLight: '#FFE0E0',
};

export const gradients = {
  hero: ['#5B9FE6', '#3570B8'] as const,
  sea: ['#4A90D9', '#2E6DB8'] as const,
  stone: ['#6B7D99', '#A0B0C8'] as const,
  sunset: ['#FF6B6B', '#FF9A76'] as const,
  forest: ['#27AE60', '#6FCF97'] as const,
  night: ['#2D3748', '#3D5A8A'] as const,
  family: ['#F2994A', '#F2C94C'] as const,
  heritage: ['#5D4E37', '#A08E76'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 28,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#2D3748',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  soft: {
    shadowColor: '#2D3748',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  elevated: {
    shadowColor: '#2D3748',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
};

export const typography = {
  hero: 28,
  title: 22,
  heading: 18,
  subheading: 16,
  body: 14,
  bodyLarge: 15,
  overline: 11,
  label: 13,
  caption: 11,
};
