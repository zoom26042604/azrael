import { useState, useRef, useCallback, useMemo } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import Sidebar from '@/src/components/layout/Sidebar';
import GuidePopup, { GuidePopupRef } from '@/src/components/layout/GuidePopup';
import GuideNotification from '@/src/components/layout/GuideNotification';
import ErrorBoundary from '@/src/components/ErrorBoundary';
import { LanguageProvider } from '@/src/contexts/LanguageContext';
import { ThemeProvider } from '@/src/contexts/ThemeContext';

// View transition styles - extracted as constant
const VIEW_TRANSITION_STYLES = `
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0s;
  }
  
  ::view-transition-old(*):not(::view-transition-old(root)),
  ::view-transition-new(*):not(::view-transition-new(root)) {
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    overflow: clip;
  }
  
  ::view-transition-group(*[style*="project-img"]) {
    z-index: 100 !important;
  }
  
  ::view-transition-group(*[style*="project-title"]) {
    z-index: 50 !important;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const guideRef = useRef<GuidePopupRef>(null);

  // Memoize callbacks to prevent unnecessary re-renders
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const openGuide = useCallback(() => {
    guideRef.current?.open();
  }, []);

  // Memoize style object to avoid recreating on every render
  const containerStyle = useMemo(() => ({
    background: 'var(--color-base)',
    color: 'var(--color-text)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  }), []);

  const mainStyle = useMemo(() => ({ flex: 1 }), []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Head>
          <title>Nathan FERRE</title>
          <meta name="description" content="Portfolio personnel - Etudiant en Informatique" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <style dangerouslySetInnerHTML={{ __html: VIEW_TRANSITION_STYLES }} />
        </Head>
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-base)',
          }}
        >
          Aller au contenu principal
        </a>
        <div style={containerStyle}>
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} openGuide={openGuide} />
          <GuideNotification onOpenGuide={openGuide} />
          <main id="main-content" style={mainStyle}>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </main>
          <Footer />
          <GuidePopup ref={guideRef} />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
