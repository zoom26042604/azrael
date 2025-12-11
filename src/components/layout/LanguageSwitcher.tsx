"use client";

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

const languages = [
  { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'ko' as const, label: '한국어', flag: '🇰🇷' },
];

export default function LanguageSwitcher() {
  const { language: currentLang, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [isOpen]);

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
        aria-label="Sélecteur de langue"
        aria-expanded={isOpen}
        style={{
          backgroundColor: isOpen ? 'var(--color-surface0)' : 'transparent',
          color: 'var(--color-text)',
          border: '1px solid var(--color-surface0)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Globe size={18} />
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
        <span className="text-sm hidden md:inline">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && buttonRect && createPortal(
        <div
          ref={dropdownRef}
          className="fixed rounded-lg border shadow-xl overflow-hidden"
          style={{
            backgroundColor: 'var(--color-mantle)',
            borderColor: 'var(--color-surface1)',
            minWidth: '180px',
            top: `${buttonRect.bottom + 8}px`,
            right: `${window.innerWidth - buttonRect.right}px`,
            zIndex: 9999,
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{
                backgroundColor: currentLang === lang.code ? 'var(--color-surface0)' : 'transparent',
                color: currentLang === lang.code ? 'var(--color-accent)' : 'var(--color-text)',
              }}
              onMouseEnter={(e) => {
                if (currentLang !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentLang !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm">{lang.label}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
