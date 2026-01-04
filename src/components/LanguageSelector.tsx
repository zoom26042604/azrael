"use client";

import { Languages } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

const languages = [
  { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'ko' as const, label: '한국어', flag: '🇰🇷' }
];

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <h3 
        className="mb-4 flex items-center gap-2 text-sm font-semibold"
        style={{ color: 'var(--color-text)' }}
      >
        <Languages size={16} style={{ color: 'var(--color-accent)' }} />
        {t('nav.language')}
      </h3>
      <div 
        className="relative mb-4 flex flex-wrap items-center justify-center gap-1 rounded-md p-1 ring-1 md:justify-start"
        style={{ borderColor: 'var(--color-surface0)' }}
      >
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
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
              title={lang.label}
            >
              <span className="mr-1">{lang.flag}</span>
              {lang.code.toUpperCase()}
            </button>
          );
        })}
      </div>
    </>
  );
}
