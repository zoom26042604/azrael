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
    image: null,
    github: 'https://github.com/zoom26042604/azrael',
    demo: 'https://nathanferre.dev',
    featured: true
  }
];

export const featuredProjects = projects.filter(p => p.featured);
