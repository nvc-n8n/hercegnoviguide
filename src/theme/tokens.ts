export const colors = {
  background: '#F5F0E8',
  backgroundMuted: '#EDE7DA',
  card: '#FFFAF6',
  cardAlt: '#F7F2EA',
  text: '#1F3C4D',
  textMuted: '#5A6A7C',
  textSoft: '#9DA3A8',
  border: '#E0D5C8',
  primary: '#4A8C9F',
  primaryDeep: '#3A7286',
  secondary: '#B8551C',
  accent: '#D4A85C',
  accentSoft: '#E8D4B8',
  success: '#2E8B6A',
  warning: '#B8842A',
  danger: '#A74A3F',
  night: '#1F3C4D',
  shadow: 'rgba(31,60,77,0.12)',
  overlay: 'rgba(31,60,77,0.35)',
  white: '#FFFFFF',
  black: '#000000',
  terracotta: '#B8551C',
  terracottaLight: '#F0DDD0',
};

export const gradients = {
  sea: ['#3A7286', '#6BB0BF'] as const,
  stone: ['#5E5A50', '#A49A88'] as const,
  sunset: ['#9E4A2D', '#D4915A'] as const,
  forest: ['#2B5E52', '#6A9E82'] as const,
  night: ['#1A2B3D', '#3C5B77'] as const,
  family: ['#B87040', '#E0B07A'] as const,
  heritage: ['#4A3630', '#8A6C5E'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 36,
  section: 32,
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#1F3C4D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 6,
  },
  soft: {
    shadowColor: '#1F3C4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#1F3C4D',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 32,
    elevation: 10,
  },
};

export const typography = {
  hero: 40,
  title: 30,
  heading: 24,
  subheading: 18,
  body: 16,
  bodyLarge: 17,
  label: 13,
  caption: 12,
};
