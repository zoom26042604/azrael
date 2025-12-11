import Head from 'next/head';

interface HeadMetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
}

export default function HeadMeta({
  title,
  description,
  path = '',
  image = '/og-image.png',
  keywords = [],
  type = 'website'
}: HeadMetaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nathanferre.dev';
  const fullUrl = `${baseUrl}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullTitle = title.includes('Nathan FERRE') ? title : `${title} | Nathan FERRE`;

  const defaultKeywords = [
    'Nathan FERRE',
    'développeur',
    'developer',
    'portfolio',
    'web development',
    'Ynov Toulouse'
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Nathan FERRE" />
      <meta name="creator" content="Nathan FERRE" />
      <meta name="publisher" content="Nathan FERRE" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Nathan FERRE Portfolio" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@zoom26042604" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      
      {/* Language alternatives */}
      <link rel="alternate" hrefLang="fr-FR" href={`${fullUrl}?lang=fr`} />
      <link rel="alternate" hrefLang="en-US" href={`${fullUrl}?lang=en`} />
      <link rel="alternate" hrefLang="ko-KR" href={`${fullUrl}?lang=ko`} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Head>
  );
}
