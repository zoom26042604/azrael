export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  topics: string[];
}
