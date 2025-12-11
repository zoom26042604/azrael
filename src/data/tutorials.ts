import { Tutorial } from '@/src/types';

export const tutorials: Tutorial[] = [
  {
    slug: 'introduction-react',
    title: 'Introduction à React',
    description: 'Apprenez les bases de React et créez votre première application',
    level: 'Débutant',
    duration: '2 heures',
    topics: ['Components', 'Props', 'State', 'Hooks']
  },
  {
    slug: 'nextjs-pour-debutants',
    title: 'Next.js pour les débutants',
    description: 'Découvrez Next.js et le rendu côté serveur',
    level: 'Débutant',
    duration: '3 heures',
    topics: ['Routing', 'SSR', 'API Routes', 'Deployment']
  },
  {
    slug: 'typescript-avance',
    title: 'TypeScript Avancé',
    description: 'Maîtrisez les concepts avancés de TypeScript',
    level: 'Avancé',
    duration: '4 heures',
    topics: ['Generics', 'Utility Types', 'Decorators', 'Type Guards']
  },
  {
    slug: 'tailwind-masterclass',
    title: 'Tailwind CSS Masterclass',
    description: 'Créez des designs modernes avec Tailwind CSS',
    level: 'Intermédiaire',
    duration: '2.5 heures',
    topics: ['Utility Classes', 'Responsive Design', 'Custom Themes', 'Components']
  }
];
