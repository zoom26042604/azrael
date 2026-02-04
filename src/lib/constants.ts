export const THEMES = ['light', 'dark'] as const;

// Map theme names to Catppuccin variants
export const THEME_VARIANTS = {
  light: 'latte',
  dark: 'mocha'
} as const;

export const ACCENT_COLORS = [
  'rosewater',
  'flamingo',
  'pink',
  'mauve',
  'red',
  'maroon',
  'peach',
  'yellow',
  'green',
  'teal',
  'sky',
  'sapphire',
  'blue',
  'lavender'
] as const;

export type Theme = typeof THEMES[number];
export type AccentColor = typeof ACCENT_COLORS[number];

export const DEFAULT_THEME: Theme = 'dark';
export const DEFAULT_ACCENT: AccentColor = 'peach';
