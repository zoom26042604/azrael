"use client";

import { useState, useEffect } from 'react';
import { X, Sparkles, Hand } from 'lucide-react';

interface GuideNotificationProps {
  onOpenGuide: () => void;
}

export default function GuideNotification({ onOpenGuide }: GuideNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà vu le guide
    const seen = localStorage.getItem('portfolio-guide-seen');
    if (!seen) {
      // Afficher la notification après 1 seconde
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpenGuide = () => {
    setIsVisible(false);
    onOpenGuide();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-4 sm:top-6 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 animate-in slide-in-from-top duration-500"
      style={{ zIndex: 9999 }}
    >
      <div
        className="rounded-lg sm:rounded-xl shadow-2xl px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 border"
        style={{
          backgroundColor: 'var(--color-mantle)',
          borderColor: 'var(--color-accent)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--color-accent)',
          maxWidth: '100%',
        }}
      >
        <div
          className="p-1.5 sm:p-2 rounded-lg hidden sm:block"
          style={{
            backgroundColor: 'var(--color-surface0)',
            color: 'var(--color-accent)',
          }}
        >
          <Sparkles size={20} className="sm:w-6 sm:h-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p 
            className="text-sm font-medium mb-0.5 sm:mb-1 flex items-center gap-2"
            style={{ color: 'var(--color-text)' }}
          >
            <Sparkles size={16} className="sm:hidden" style={{ color: 'var(--color-accent)' }} />
            Bienvenue sur mon portfolio ! <Hand size={14} className="sm:w-4 sm:h-4" />
          </p>
          <p 
            className="text-xs"
            style={{ color: 'var(--color-subtext0)' }}
          >
            Découvrez comment naviguer et profiter de toutes les fonctionnalités
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleOpenGuide}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-base)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px color-mix(in srgb, var(--color-accent) 50%, transparent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Voir le guide
          </button>
          
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 rounded-lg transition-all duration-200"
            style={{ color: 'var(--color-subtext0)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-subtext0)';
            }}
            aria-label="Fermer la notification"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
