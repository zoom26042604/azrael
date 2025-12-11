import { Theme, AccentColor, DEFAULT_ACCENT } from '@/src/lib/constants';
import { useState, useEffect } from 'react';

// useTheme is now exported from ThemeContext
export { useTheme } from '@/src/contexts/ThemeContext';

export function useAccentColor() {
  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    if (typeof window === 'undefined') return DEFAULT_ACCENT;
    
    const savedAccent = localStorage.getItem('accent') as AccentColor;
    return savedAccent || DEFAULT_ACCENT;
  });

  useEffect(() => {
    // Only handle DOM updates in effect
    document.documentElement.setAttribute('data-accent', accentColor);
  }, [accentColor]);

  const changeAccentColor = (newAccent: AccentColor) => {
    setAccentColor(newAccent);
    localStorage.setItem('accent', newAccent);
    document.documentElement.setAttribute('data-accent', newAccent);
  };

  return { accentColor, changeAccentColor };
}
