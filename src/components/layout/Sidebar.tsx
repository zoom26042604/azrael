"use client";

import { useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { X, Keyboard } from 'lucide-react';
import ThemeSelector from '../ThemeSelector';
import LanguageSelector from '../LanguageSelector';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  openGuide?: () => void;
}

export default function Sidebar({ isOpen, closeSidebar, openGuide }: SidebarProps) {
  const currentPath = usePathname();
  const { t } = useLanguage();

  const handleGuideClick = useCallback(() => {
    if (openGuide) {
      openGuide();
      closeSidebar();
    }
  }, [openGuide, closeSidebar]);

  const mainNavItems = useMemo(() => [
    { title: t('nav.about'), href: '/about' },
    { title: t('nav.projects'), href: '/projects' },
    { title: t('nav.contact'), href: '/contact' },
    { title: t('nav.resume'), href: '/cv' },
    { title: t('nav.socials'), href: '/socials' }
  ], [t]);

  const moreNavItems = useMemo(() => [
    { title: '2048 Game', href: 'http://localhost:3001', external: true }
  ], []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
          onClick={closeSidebar}
          onKeyDown={(e) => e.key === 'Escape' && closeSidebar()}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-40 flex w-64 transform flex-col border-l shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--color-mantle)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-surface0)'
        }}
        id="sidebar-nav"
        tabIndex={-1}
        aria-hidden={!isOpen}
        {...(!isOpen && { inert: true })}
      >
        <div 
          className="flex h-16 shrink-0 items-center justify-between border-b p-4"
          style={{ borderColor: 'var(--color-surface0)' }}
        >
          <span 
            className="font-mono text-lg font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            {t('nav.more')}
          </span>
          <button
            onClick={closeSidebar}
            className="rounded"
            style={{ color: 'var(--color-subtext1)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            aria-label="Close navigation menu"
            tabIndex={isOpen ? 0 : -1}
          >
            <X size={24} />
          </button>
        </div>

        <div 
          className="shrink-0 border-b p-4"
          style={{ borderColor: 'var(--color-surface0)' }}
        >
          <ThemeSelector />
          <LanguageSelector />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2" role="list">
            {mainNavItems.map((item) => {
              const isActive = !item.external && currentPath === item.href;
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="block rounded p-2 transition-colors duration-150 focus:outline-none"
                    style={{
                      backgroundColor: isActive ? 'var(--color-surface0)' : 'transparent'
                    }}
                    tabIndex={isOpen ? 0 : -1}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onFocus={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface1)'}
                    onBlur={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeSidebar}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}

            <li>
              <hr 
                className="my-2 border-t" 
                style={{ borderColor: 'var(--color-surface1)' }}
              />
            </li>

            <li 
              className="px-2 py-1 text-xs font-semibold tracking-wider uppercase"
              style={{ color: 'var(--color-subtext0)' }}
            >
              {t('nav.more')}
            </li>

            {moreNavItems.map((item) => {
              const isActive = currentPath === item.href;
              const external = 'external' in item ? item.external : false;
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="block rounded p-2 transition-colors duration-150 focus:outline-none"
                    style={{
                      backgroundColor: isActive ? 'var(--color-surface0)' : 'transparent'
                    }}
                    tabIndex={isOpen ? 0 : -1}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onFocus={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface1)'}
                    onBlur={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeSidebar}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Guide du Portfolio en bas */}
        <div 
          className="shrink-0 border-t p-4"
          style={{ borderColor: 'var(--color-surface0)' }}
        >
          <button
            onClick={handleGuideClick}
            className="w-full flex items-center gap-3 rounded p-3 transition-all"
            style={{
              backgroundColor: 'var(--color-surface0)',
              color: 'var(--color-text)',
            }}
            tabIndex={isOpen ? 0 : -1}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface1)';
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            <Keyboard size={20} />
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">{t('guide.title')}</div>
              <div className="text-xs" style={{ color: 'var(--color-subtext0)' }}>
                {t('guide.discover')}
              </div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
