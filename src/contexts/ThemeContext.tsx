"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Theme, DEFAULT_THEME, THEME_VARIANTS, THEMES } from '@/src/lib/constants';

interface ThemeContextType {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  const applyThemeColors = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    const palette = THEME_VARIANTS[newTheme];
    const themePrefix = `catppuccin-${palette}`;
    
    root.setAttribute('data-theme', palette);
    
    // Apply all theme colors immediately
    const colorNames = [
      'rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon', 
      'peach', 'yellow', 'green', 'teal', 'sky', 'sapphire', 
      'blue', 'lavender', 'text',
      'overlay0', 'surface2', 'surface1', 'surface0', 'base', 'mantle'
    ] as const;

    const rootStyle = getComputedStyle(root);
    
    colorNames.forEach(colorName => {
      const cssVarValue = rootStyle.getPropertyValue(`--${themePrefix}-${colorName}`);
      root.style.setProperty(`--color-${colorName}`, cssVarValue);
    });

    // WCAG AA compliant: use text color for subtext to ensure 4.5:1 contrast ratio
    const textValue = rootStyle.getPropertyValue(`--${themePrefix}-text`);
    root.style.setProperty('--color-subtext1', textValue);
    root.style.setProperty('--color-subtext0', textValue);

    // Update accent color
    const accentValue = rootStyle.getPropertyValue(`--${themePrefix}-peach`);
    root.style.setProperty('--color-accent', accentValue);
  }, []);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
      applyThemeColors(savedTheme);
    } else {
      // Migrate old theme names
      const oldTheme = localStorage.getItem('catppuccin-theme');
      if (oldTheme === 'latte' || oldTheme === 'light') {
        localStorage.setItem('theme', 'light');
        setTheme('light');
        applyThemeColors('light');
      } else if (oldTheme === 'mocha' || oldTheme === 'dark' || oldTheme === 'frappe' || oldTheme === 'macchiato') {
        localStorage.setItem('theme', 'dark');
        setTheme('dark');
        applyThemeColors('dark');
      } else {
        applyThemeColors(DEFAULT_THEME);
      }
    }
  }, [applyThemeColors]);

  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyThemeColors(newTheme);
  }, [applyThemeColors]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
