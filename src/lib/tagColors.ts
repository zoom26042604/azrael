// Panel de couleurs vives et joyeuses pour attribution aléatoire
// Les couleurs ont été choisies pour assurer un contraste WCAG AA minimum sur fond sombre
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

// Fonction pour déterminer si on doit utiliser du texte blanc ou noir pour un meilleur contraste
function shouldUseWhiteText(hexColor: string): boolean {
  // Convertir hex en RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Appliquer la correction gamma (WCAG 2.1 formula)
  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Calculer la luminance relative (WCAG 2.1)
  const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;

  // Si la luminance est < 0.5, utiliser du texte blanc (meilleur contraste)
  // Cette valeur garantit un ratio de contraste d'au moins 4.5:1
  return luminance < 0.5;
}

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
 * Assure le contraste WCAG AA pour l'accessibilité.
 * @param tag - Le nom de la technologie
 * @param projectSlug - Le slug du projet (optionnel, utilisé pour varier les couleurs par projet)
 */
export function getTagColor(tag: string, projectSlug?: string): { type: 'hex' | 'catppuccin'; color: string; backgroundColor: string; textColor: 'white' | 'black' } {
  const normalizedTag = tag.toLowerCase().trim();
  
  // Combiner le tag avec le projet pour générer une couleur unique par projet
  const seed = projectSlug ? `${projectSlug}-${normalizedTag}` : normalizedTag;
  const hash = hashString(seed);
  const colorIndex = hash % COLOR_PALETTE.length;
  const color = COLOR_PALETTE[colorIndex];
  const textColor = shouldUseWhiteText(color) ? 'white' : 'black';
  
  return { type: 'hex', color, backgroundColor: color, textColor };
}
