"use client";

import { useState, useMemo, useCallback } from 'react';
import { useAccentColor } from '@/src/hooks/useTheme';
import { ACCENT_COLORS, AccentColor } from '@/src/lib/constants';
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function ColorSelector() {
  const { t } = useLanguage();
  const { accentColor, changeAccentColor } = useAccentColor();
  const [backgroundEnabled, setBackgroundEnabled] = useState(false);

  // Memoize position calculations
  const ringPosition = useMemo(() => {
    const selectedIndex = ACCENT_COLORS.indexOf(accentColor);
    const row = Math.floor(selectedIndex / 7);
    const col = selectedIndex % 7;
    return { row, col };
  }, [accentColor]);

  // Memoize ring style to prevent recalculation
  const ringStyle = useMemo(() => ({
    transform: `translate(calc(${ringPosition.col} * (100% + 0.625rem)), calc(${ringPosition.row} * (100% + 0.625rem)))`,
    width: 'calc((100% - 6 * 0.625rem) / 7)',
    color: `var(--color-${accentColor})`,
    ['--tw-ring-color' as any]: 'currentColor',
    ['--tw-ring-offset-color' as any]: 'var(--color-base)'
  } as React.CSSProperties), [ringPosition.col, ringPosition.row, accentColor]);

  // Memoize toggle handler
  const toggleBackground = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundEnabled(e.target.checked);
  }, []);

  return (
    <>
      <div className="relative grid grid-cols-7 gap-2.5 md:gap-1.5">
        {ACCENT_COLORS.map((colorName) => {
          const isSelected = accentColor === colorName;
          return (
            <button
              key={colorName}
              aria-label={`${t('nav.select_color')} ${colorName}`}
              aria-pressed={isSelected}
              title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
              onClick={() => changeAccentColor(colorName)}
              style={{
                backgroundColor: `var(--color-${colorName})`,
                opacity: isSelected ? 1 : 0.8,
                transform: isSelected ? 'scale(1.05)' : 'scale(1)'
              }}
              className="aspect-square min-h-5 w-full min-w-5 cursor-pointer rounded-md shadow-sm transition-all duration-150 hover:scale-110 hover:opacity-100"
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <span className="sr-only">{colorName}</span>
            </button>
          );
        })}

        {/* Animated ring */}
        <div
          className="pointer-events-none absolute aspect-square min-h-5 min-w-5 rounded-md ring-2 ring-offset-2 transition-all duration-300 ease-out"
          style={ringStyle}
        />
      </div>

      <div className="mt-4 flex items-center">
        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={backgroundEnabled}
            onChange={toggleBackground}
            className="form-checkbox h-4 w-4 rounded"
            style={{ color: 'currentColor' }}
            aria-label="Toggle the colorful background on/off"
          />
          <span className="ml-2 text-sm" style={{ color: 'var(--color-subtext0)' }}>
            Background effect: <span style={{ color: 'var(--color-accent)' }}>{backgroundEnabled ? 'on' : 'off'}</span>
          </span>
        </label>
      </div>
    </>
  );
}
