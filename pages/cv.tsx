
import React, { useRef, useEffect, useState } from 'react';
import { AlertCircle, RefreshCw, Github, ExternalLink } from 'lucide-react';

const CV_URL = process.env.NEXT_PUBLIC_CV_URL || 'http://localhost:3002';
const LOAD_TIMEOUT = 8000; // 8 secondes timeout

export default function CVPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Vérifie l'origine
      if (event.origin !== CV_URL) return;
      if (event.data && event.data.type === 'cvHeight') {
        setIframeHeight(event.data.height);
        // Message reçu = iframe chargée avec succès
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setIsLoading(false);
        setHasError(false);
      }
    }
    window.addEventListener('message', handleMessage);
    
    // Timeout pour détecter si l'iframe ne charge pas
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, LOAD_TIMEOUT);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading]);

  const handleLoad = () => {
    // On attend le message postMessage pour confirmer le chargement réel
    // Car onLoad se déclenche même sur les pages d'erreur du navigateur
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    // Reset timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, LOAD_TIMEOUT);
    if (iframeRef.current) {
      iframeRef.current.src = CV_URL;
    }
  };

  return (
    <main style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0', position: 'relative' }}>
      {isLoading && (
        <div 
          style={{ 
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            backgroundColor: 'var(--color-base)',
            zIndex: 10
          }}
        >
          <div 
            style={{ 
              width: '3rem',
              height: '3rem',
              border: '3px solid var(--color-surface0)',
              borderTop: '3px solid var(--color-accent)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
          <span style={{ color: 'var(--color-subtext0)', fontSize: '0.875rem' }}>
            Chargement du CV...
          </span>
          <style dangerouslySetInnerHTML={{
            __html: '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }'
          }} />
        </div>
      )}
      
      {hasError && (
        <div 
          style={{ 
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            backgroundColor: 'var(--color-base)',
            zIndex: 10,
            padding: '2rem'
          }}
        >
          <div 
            style={{
              padding: '2rem',
              borderRadius: '1rem',
              backgroundColor: 'var(--color-surface0)',
              border: '1px solid var(--color-surface1)',
              maxWidth: '420px',
              textAlign: 'center'
            }}
          >
            <div 
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(250, 179, 135, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <AlertCircle size={32} style={{ color: 'var(--color-peach)' }} />
            </div>
            <h2 style={{ color: 'var(--color-text)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Intégration non disponible
            </h2>
            <p style={{ color: 'var(--color-subtext0)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Le CV interactif n'est pas accessible actuellement. Vous pouvez consulter le code source sur GitHub ou réessayer.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href="https://github.com/zoom26042604/cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--color-surface1)',
                    color: 'var(--color-text)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    flex: 1,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface1)'}
                >
                  <Github size={16} />
                  Voir sur GitHub
                </a>
                <button
                  onClick={handleRetry}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-base)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    flex: 1,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <RefreshCw size={16} />
                  Réessayer
                </button>
              </div>
              <a
                href="https://cv.nathan-ferre.fr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'transparent',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-accent)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  e.currentTarget.style.color = 'var(--color-base)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
              >
                <ExternalLink size={16} />
                Voir le CV en version complète
              </a>
            </div>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={CV_URL}
        title="CV"
        style={{ 
          width: '100%', 
          maxWidth: 1500, 
          height: iframeHeight, 
          border: 'none', 
          transition: 'height 0.3s',
          opacity: (isLoading || hasError) ? 0 : 1
        }}
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />
    </main>
  );
}
