import type { Metadata } from 'next';

interface PageMetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  image = '/og-image.png',
  keywords = [],
  type = 'website'
}: PageMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nathanferre.dev';
  const fullUrl = `${baseUrl}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const defaultKeywords = [
    'Nathan FERRE',
    'développeur',
    'developer',
    'portfolio',
    'web development',
    'Ynov Toulouse'
  ];

  return {
    title: `${title} | Nathan FERRE`,
    description,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    authors: [{ name: 'Nathan FERRE', url: baseUrl }],
    creator: 'Nathan FERRE',
    publisher: 'Nathan FERRE',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        'fr-FR': `${fullUrl}?lang=fr`,
        'en-US': `${fullUrl}?lang=en`,
        'ko-KR': `${fullUrl}?lang=ko`
      }
    },
    openGraph: {
      type,
      title,
      description,
      url: fullUrl,
      siteName: 'Nathan FERRE Portfolio',
      locale: 'fr_FR',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@zoom26042604'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    }
  };
}
