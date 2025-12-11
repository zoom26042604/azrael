// Panel de couleurs vives et joyeuses pour attribution aléatoire
const COLOR_PALETTE = [
  '#00D9FF', // Cyan vif
  '#61DAFB', // Cyan clair
  '#0070F3', // Bleu
  '#3178C6', // Bleu TypeScript
  '#4B8BBE', // Bleu Python
  '#FF3E00', // Rouge-orange
  '#38BDF8', // Cyan Tailwind
  '#42B883', // Vert
  '#7C3AED', // Violet
  '#E10098', // Rose
  '#F7DF1E', // Jaune
  '#47A248', // Vert foncé
  '#FF6C37', // Orange
  '#5A67D8', // Violet Prisma
  '#FB015B', // Rose vif
  '#259DFF', // Bleu clair
  '#6E40C9', // Violet GitHub
  '#FF5D01', // Orange vif
  '#F9A03C', // Orange D3
  '#764ABC', // Violet Redux
  '#CC6699', // Rose SCSS
  '#3ECF8E', // Vert Supabase
  '#E43717', // Rouge Rust
  '#00DC82', // Vert Nuxt
  '#646CFF', // Bleu Vite
  '#DD0031', // Rouge Angular
  '#E0234E', // Rouge NestJS
  '#009688', // Teal
  '#6DB33F', // Vert Spring
  '#FF2D20', // Rouge Laravel
  '#4169E1', // Bleu PostgreSQL
  '#DC382D', // Rouge Redis
  '#FFCA28', // Jaune Firebase
  '#2496ED', // Bleu Docker
  '#326CE5', // Bleu Kubernetes
  '#F05032', // Orange Git
  '#C21325', // Rouge Jest
  '#6E9F18', // Vert Vitest
  '#FF4785', // Rose Storybook
  '#FF9900', // Orange AWS
  '#0089D6', // Bleu Azure
  '#4285F4', // Bleu GCP
  '#00C7B7', // Teal Netlify
  '#430098', // Violet Heroku
  '#0080FF', // Bleu DigitalOcean
  '#7B42BC', // Violet Terraform
  '#2088FF', // Bleu GitHub Actions
  '#EA2D2E', // Rouge Java
  '#F34B7D', // Rose C++
  '#68217A', // Violet C#
];

// Fonction de hash pour générer une couleur cohérente basée sur le nom du tag ET du projet
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Obtient une couleur aléatoire pour un tag dans le contexte d'un projet spécifique.
 * La même techno aura des couleurs différentes sur différents projets.
 * @param tag - Le nom de la technologie
 * @param projectSlug - Le slug du projet (optionnel, utilisé pour varier les couleurs par projet)
 */
export function getTagColor(tag: string, projectSlug?: string): { type: 'hex' | 'catppuccin'; color: string } {
  const normalizedTag = tag.toLowerCase().trim();
  
  // Combiner le tag avec le projet pour générer une couleur unique par projet
  const seed = projectSlug ? `${projectSlug}-${normalizedTag}` : normalizedTag;
  const hash = hashString(seed);
  const colorIndex = hash % COLOR_PALETTE.length;
  const color = COLOR_PALETTE[colorIndex];
  
  return { type: 'hex', color };
}
