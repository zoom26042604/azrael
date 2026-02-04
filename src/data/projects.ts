import { Project } from '@/src/types';

// Projects use translation keys - actual translated content is in projectTranslations.ts
// The slug is used as the translation key to get the project content in the current language
export const projects: Project[] = [
  {
    slug: 'portfolio-personnel',
    title: 'portfolio-personnel', // Translation key
    description: 'portfolio-personnel', // Translation key
    sections: {
      journey: 'portfolio-personnel',
      technical: ['portfolio-personnel'],
      features: ['portfolio-personnel'],
      reality: 'portfolio-personnel'
    },
    tags: ['next.js', 'react', 'typescript', 'tailwind', 'portfolio'],
    date: '2024-12',
    image: '/images/projects/portfolio-personnel.webp',
    github: 'https://github.com/zoom26042604/azrael',
    demo: 'https://nathan-ferre.fr',
    featured: true
  },
  {
    slug: 'game-2048',
    title: 'game-2048', // Translation key
    description: 'game-2048', // Translation key
    sections: {
      journey: 'game-2048',
      technical: ['game-2048'],
      features: ['game-2048'],
      reality: 'game-2048'
    },
    tags: ['next.js', 'react', 'typescript', 'prisma', 'sqlite', 'framer-motion', 'game'],
    date: '2025-01',
    image: '/images/projects/game-2048.webp',
    github: 'https://github.com/zoom26042604/game-2048',
    demo: 'https://2048.nathan-ferre.fr',
    featured: true
  },
  {
    slug: 'interactive-cv',
    title: 'interactive-cv', // Translation key
    description: 'interactive-cv', // Translation key
    sections: {
      journey: 'interactive-cv',
      technical: ['interactive-cv'],
      features: ['interactive-cv'],
      reality: 'interactive-cv'
    },
    tags: ['next.js', 'react', 'typescript', 'tailwind', 'framer-motion', 'cv'],
    date: '2025-01',
    image: '/images/projects/interactive-cv.webp',
    github: 'https://github.com/zoom26042604/cv',
    demo: 'https://cv.nathan-ferre.fr',
    featured: true
  }
];

export const featuredProjects = projects.filter(p => p.featured);
