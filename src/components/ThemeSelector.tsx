"use client";

import { useCallback } from 'react';
import { Palette } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { useTheme } from '@/src/hooks/useTheme';
import { THEMES, Theme } from '@/src/lib/constants';

const themeLabels: Record<Theme, { key: 'nav.theme_light' | 'nav.theme_dark'; fallback: string }> = {
  light: { key: 'nav.theme_light', fallback: 'Clair' },
  dark: { key: 'nav.theme_dark', fallback: 'Sombre' }
};

export default function ThemeSelector() {
  const { t } = useLanguage();
  const { theme, changeTheme } = useTheme();

  const handleThemeChange = useCallback((newTheme: Theme) => {
    changeTheme(newTheme);
  }, [changeTheme]);

  return (
    <>
      <h3 
        className="mb-4 flex items-center gap-2 text-sm font-semibold"
        style={{ color: 'var(--color-text)' }}
      >
        <Palette size={16} style={{ color: 'var(--color-accent)' }} />
        {t('nav.theme')}
      </h3>
      <div 
        className="relative mb-4 flex flex-wrap items-center justify-center gap-1 rounded-md p-1 ring-1 md:justify-start"
        style={{ borderColor: 'var(--color-surface0)' }}
      >
        {THEMES.map((name) => {
          const isSelected = theme === name;
          const themeLabel = themeLabels[name];
          return (
            <button
              key={name}
              onClick={() => handleThemeChange(name)}
              aria-label={`${t('nav.select_theme')} ${themeLabel.fallback}`}
              aria-pressed={isSelected}
              className={`flex-1 cursor-pointer rounded-[5px] px-2 py-1 text-center text-xs font-medium transition-all duration-300 ${
                isSelected ? 'shadow-sm ring-1 ring-inset' : ''
              }`}
              style={{
                backgroundColor: isSelected ? 'var(--color-base)' : 'transparent',
                color: isSelected ? 'var(--color-text)' : 'var(--color-subtext1)',
                ['--tw-ring-color' as any]: isSelected ? 'color-mix(in srgb, var(--color-accent) 70%, transparent)' : 'transparent'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.color = 'var(--color-subtext0)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.color = 'var(--color-subtext1)';
                }
              }}
            >
              {t(themeLabel.key)}
            </button>
          );
        })}
      </div>
    </>
  );
}
