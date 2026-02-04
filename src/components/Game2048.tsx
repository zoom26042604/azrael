"use client";

import { useState, useRef, useEffect } from 'react';
import { ExternalLink, AlertCircle, RefreshCw, Github } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

// URL du jeu 2048 hébergé (à changer en production)
const GAME_URL = process.env.NEXT_PUBLIC_GAME_2048_URL || 'http://localhost:3001';

const LOAD_TIMEOUT = 8000; // 8 secondes timeout

const Game2048 = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Timeout pour détecter si l'iframe ne charge pas
    timeoutRef.current = setTimeout(() => {
      if (!isLoaded && !hasError) {
        setHasError(true);
      }
    }, LOAD_TIMEOUT);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [iframeKey, isLoaded, hasError]);

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHasError(true);
    setIsLoaded(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoaded(false);
    setIframeKey(prev => prev + 1);
  };

  return (
    <>
      {/* Game container */}
      <div 
        className="flex flex-col rounded-xl border shadow-lg overflow-hidden"
        style={{
          borderColor: 'var(--color-surface0)',
          backgroundColor: 'var(--color-base)',
        }}
      >
        {/* Game iframe */}
        <div className="relative flex-1" style={{ minHeight: '420px' }}>
          {!isLoaded && !hasError && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-mantle)' }}
            >
              <div className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
                />
                <span className="text-sm" style={{ color: 'var(--color-subtext0)' }}>
                  {t('game2048.loading') || 'Chargement du jeu...'}
                </span>
              </div>
            </div>
          )}
          
          {hasError && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-mantle)', padding: '1rem' }}
            >
              <div 
                className="flex flex-col items-center gap-4 text-center"
                style={{
                  maxWidth: '380px',
                  padding: '2rem',
                  borderRadius: '1rem',
                  backgroundColor: 'var(--color-surface0)',
                  border: '1px solid var(--color-surface1)'
                }}
              >
                <div 
                  className="flex items-center justify-center w-16 h-16 rounded-full"
                  style={{ backgroundColor: 'var(--color-peach)', opacity: 0.15 }}
                >
                  <AlertCircle size={32} style={{ color: 'var(--color-peach)' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--color-text)', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {t('game2048.unavailable_title') || 'Intégration non disponible'}
                  </h3>
                  <p style={{ color: 'var(--color-subtext0)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    {t('game2048.unavailable_desc') || 'Le jeu 2048 n\'est pas accessible actuellement. Vous pouvez consulter le code source ou réessayer.'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <a
                    href="https://github.com/zoom26042604/game-2048"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: 'var(--color-surface1)',
                      color: 'var(--color-text)',
                      flex: 1
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface1)'}
                  >
                    <Github size={16} />
                    {t('game2048.view_github') || 'Voir sur GitHub'}
                  </a>
                  <button
                    onClick={handleRetry}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-base)',
                      border: 'none',
                      cursor: 'pointer',
                      flex: 1
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <RefreshCw size={16} />
                    {t('game2048.retry') || 'Réessayer'}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <iframe
            key={iframeKey}
            src={`${GAME_URL}/embed`}
            className="w-full h-full border-0"
            style={{ 
              minHeight: '420px',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s'
            }}
            onLoad={handleLoad}
            onError={handleError}
            allow="keyboard-map"
            title="2048 Game"
          />
        </div>

        {/* Footer */}
        <div 
          className="p-2 border-t"
          style={{ borderColor: 'var(--color-surface0)' }}
        >
          <a
            href={GAME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors w-full"
            style={{
              backgroundColor: 'var(--color-surface0)',
              color: 'var(--color-text)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface0)'}
          >
            <ExternalLink size={12} />
            {t('game2048.full_version')}
          </a>
        </div>
      </div>
    </>
  );
};

export default Game2048;
