"use client";

import { useMemo, useCallback, useEffect, useState } from 'react';
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
  const [currentPath, setCurrentPath] = useState('/');
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
  const mainNavItems = useMemo(() => [
    { title: t('nav.home'), href: '/', external: false },
    { title: t('nav.about'), href: '/about', external: false },
    { title: t('nav.projects'), href: '/projects', external: false },
    { title: t('nav.contact'), href: '/contact', external: false },
    { title: t('nav.resume'), href: '/cv', external: false }
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
    <header 
      className="header sticky top-0 z-10 flex h-24 items-center justify-between p-5 pb-10 select-none"
      style={headerStyle}
      role="banner"
    >
      <Breadcrumb />
      <button
        onClick={toggleSidebar}
        className="rounded p-2 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)"
        style={{ color: 'var(--color-text)' }}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="sidebar-nav"
      >
        <Menu size={24} aria-hidden="true" />
      </button>
      <nav className="hidden items-center space-x-4 lg:flex" role="navigation" aria-label="Main navigation">
        {mainNavItems.map((item) => {
          // Si c'est le lien Accueil ET qu'on est sur la page d'accueil, afficher un bouton scroll-to-top
          if (item.href === '/' && currentPath === '/') {
            return (
              <button
                key={item.title}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="rounded px-3 py-2 text-sm font-medium transition-colors duration-150"
                style={{ color: 'var(--color-text)' }}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
                aria-label="Retour en haut de la page"
              >
                {item.title}
              </button>
            );
          }
          
          // Sinon, afficher un lien normal
          return (
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
          );
        })}
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
    </header>
  );
}
