"use client";

import { useMemo, useCallback } from 'react';
import Breadcrumb from '@/src/components/layout/Breadcrumb';
import LanguageSwitcher from '@/src/components/layout/LanguageSwitcher';
import ThemeToggle from '@/src/components/ThemeToggle';
import { Menu } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import type { ButtonMouseHandler, LinkMouseHandler } from '@/src/types/events';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { t } = useLanguage();
  
  const mainNavItems = useMemo(() => [
    { title: t('nav.about'), href: '/about' },
    { title: t('nav.projects'), href: '/projects' },
    { title: t('nav.contact'), href: '/contact' },
    { title: t('nav.resume'), href: '/resume.pdf', external: true }
  ], [t]);

  const handleButtonMouseEnter: ButtonMouseHandler = useCallback((e) => {
    e.currentTarget.style.color = 'var(--color-accent)';
  }, []);

  const handleButtonMouseLeave: ButtonMouseHandler = useCallback((e) => {
    e.currentTarget.style.color = 'var(--color-text)';
  }, []);

  const handleLinkMouseEnter: LinkMouseHandler = useCallback((e) => {
    e.currentTarget.style.color = 'var(--color-accent)';
  }, []);

  const handleLinkMouseLeave: LinkMouseHandler = useCallback((e) => {
    e.currentTarget.style.color = 'var(--color-text)';
  }, []);

  const headerStyle = useMemo(() => ({
    mask: 'linear-gradient(black, black, transparent)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  }), []);

  return (
    <div 
      className="header sticky top-0 z-10 flex h-24 items-center justify-between p-5 pb-10 select-none"
      style={headerStyle}
    >
      <Breadcrumb />
      <button
        onClick={toggleSidebar}
        className="rounded p-2 md:hidden"
        style={{ color: 'var(--color-text)' }}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="sidebar-nav"
      >
        <Menu size={24} />
      </button>
      <nav className="hidden items-center space-x-4 md:flex">
        {mainNavItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className="rounded px-3 py-2 text-sm font-medium transition-colors duration-150"
            style={{ color: 'var(--color-text)' }}
            onMouseEnter={handleLinkMouseEnter}
            onMouseLeave={handleLinkMouseLeave}
          >
            {item.title}
          </a>
        ))}
        <ThemeToggle />
        <LanguageSwitcher />
        <button
          onClick={toggleSidebar}
          className="cursor-pointer rounded px-3 py-2 text-sm font-medium"
          aria-label="Ouvrir le menu de navigation supplémentaire"
          style={{ color: 'var(--color-text)' }}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
        >
          {t('nav.more')}...
        </button>
      </nav>
    </div>
  );
}
