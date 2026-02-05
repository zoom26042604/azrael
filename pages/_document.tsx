import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr" data-scroll-behavior="smooth">
      <Head>
        {/* SEO Meta Tags */}
        <meta name="description" content="Nathan FERRE - Développeur Full-Stack passionné. Portfolio avec projets web, expériences et compétences techniques." />
        <meta name="keywords" content="Nathan FERRE, développeur, full-stack, portfolio, web, Next.js, React, TypeScript" />
        <meta name="author" content="Nathan FERRE" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nathan-ferre.fr/" />
        <meta property="og:title" content="Nathan FERRE - Développeur Full-Stack" />
        <meta property="og:description" content="Portfolio de Nathan FERRE, développeur Full-Stack passionné. Découvrez mes projets et expériences." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://nathan-ferre.fr/" />
        <meta name="twitter:title" content="Nathan FERRE - Développeur Full-Stack" />
        <meta name="twitter:description" content="Portfolio de Nathan FERRE, développeur Full-Stack passionné." />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#cba6f7" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nathan FERRE" />
      </Head>
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
