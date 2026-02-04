# Azrael - Portfolio Personnel

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Portfolio personnel multilingue construit avec Next.js 16, TypeScript et le système de design Catppuccin.

**[Site en ligne](https://nathan-ferre.fr)** · **[Contact](mailto:nathanferre06@gmail.com)**

---

## Présentation

Site portfolio présentant mes compétences, projets et parcours professionnel. L'interface utilise le thème Catppuccin avec une couleur d'accent orange cohérente sur l'ensemble du site.

### Fonctionnalités principales

- **Multilingue** : Support complet FR/EN avec changement dynamique
- **Thèmes Catppuccin** : Modes clair (Latte) et sombre (Mocha)
- **Responsive** : Design adaptatif mobile, tablette et desktop
- **Navigation clavier** : Breadcrumb éditable avec raccourci Espace
- **Recherche avancée** : Filtrage et tri des projets en temps réel
- **Carte interactive** : Localisation avec Leaflet et heure locale
- **Mini-jeu 2048** : Intégré avec sauvegarde des scores
- **Accessibilité** : Labels ARIA et navigation optimisée
- **Performance** : Score Lighthouse > 90/100

---

## Installation

### Prérequis

- Node.js 20+
- npm, yarn, pnpm ou bun

### Démarrage rapide

```bash
# Cloner le dépôt
git clone https://github.com/zoom26042604/azrael.git
cd azrael

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Développement avec Turbopack |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

---

## Architecture

```
azrael/
├── pages/                    # Pages Next.js (routing)
│   ├── _app.tsx             # Configuration globale
│   ├── _document.tsx        # Structure HTML
│   ├── index.tsx            # Page d'accueil
│   ├── about.tsx            # À propos
│   ├── cv.tsx               # CV interactif
│   ├── projects/            # Projets
│   ├── contact.tsx          # Contact
│   └── api/                 # Routes API
├── src/
│   ├── components/          # Composants React
│   │   ├── features/        # Composants métier
│   │   ├── layout/          # Layout (Header, Sidebar, Footer)
│   │   └── ui/              # Composants UI réutilisables
│   ├── contexts/            # Contextes React (Theme, Language)
│   ├── data/                # Données statiques
│   ├── hooks/               # Hooks personnalisés
│   ├── lib/                 # Utilitaires et constantes
│   └── types/               # Types TypeScript
├── public/                  # Assets statiques
│   ├── images/              # Images (projets, profil)
│   └── logos/               # Logos des entreprises
├── scripts/                 # Scripts utilitaires
└── styles/                  # Styles CSS globaux
```

---

## Stack technique

### Core

| Technologie | Version | Rôle |
|-------------|---------|------|
| [Next.js](https://nextjs.org/) | 16 | Framework React avec Turbopack |
| [React](https://react.dev/) | 19 | Bibliothèque UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Typage statique |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Framework CSS utility-first |

### Bibliothèques

| Bibliothèque | Utilisation |
|--------------|-------------|
| [Leaflet](https://leafletjs.com/) | Cartes interactives |
| [React Icons](https://react-icons.github.io/react-icons/) | Collection d'icônes (Lucide, Simple Icons) |
| [Framer Motion](https://www.framer.com/motion/) | Animations |

### Design System

Le portfolio utilise [Catppuccin](https://github.com/catppuccin/catppuccin), une palette de couleurs pastel avec deux variantes :

| Thème | Variante | Description |
|-------|----------|-------------|
| Clair | Latte | Mode clair avec tons pastel chauds |
| Sombre | Mocha | Mode sombre avec tons pastel doux |

La couleur d'accent (Peach/orange) est fixe pour garantir une identité visuelle cohérente.

---

## Configuration

### Personnalisation

| Fichier | Contenu |
|---------|---------|
| `src/lib/constants.ts` | Configuration des thèmes |
| `src/contexts/LanguageContext.tsx` | Traductions |
| `src/data/projects.ts` | Liste des projets |
| `src/data/experience.ts` | Expériences professionnelles |
| `styles/catppuccin.css` | Variables CSS du thème |

---

## Fonctionnalités détaillées

### Navigation Breadcrumb

Le breadcrumb supporte l'édition au clavier :
- **Espace** : Activer le mode édition
- Taper le chemin (ex: `/projects`, `/about`)
- **Entrée** : Valider, **Échap** : Annuler

### Filtrage des projets

- Recherche en temps réel par titre, description et tags
- Tri par nom (A-Z) ou par date (récent)
- Filtres rapides par technologie

### Carte interactive

- Localisation géographique avec marqueur personnalisé
- Affichage de l'heure locale
- Animation au survol

### Génération d'images de projets

Les images de projets sont générées automatiquement depuis les repos GitHub :

```bash
./scripts/generate-project-images.sh
```

Le script utilise l'API Bannerbear pour créer des images avec le titre, la description et les statistiques du repo.

---

## Déploiement

### Build manuel

```bash
npm run build
npm run start
```

Le build optimisé sera dans le dossier `.next/`

### Docker

```bash
docker build -t azrael .
docker run -p 3000:3000 azrael
```

---

## Contribution

Les contributions sont les bienvenues.

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nom-feature`)
3. Commit les changements (`git commit -m 'Ajout de la feature'`)
4. Push sur la branche (`git push origin feature/nom-feature`)
5. Ouvrir une Pull Request

---

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Auteur

**Nathan FERRE**

- Site : [nathan-ferre.fr](https://nathan-ferre.fr)
- LinkedIn : [Nathan FERRE](https://www.linkedin.com/in/nathan-ferre-0ba3a438a/)
- GitHub : [@zoom26042604](https://github.com/zoom26042604)
- Email : nathanferre06@gmail.com

---

## Remerciements

- [Catppuccin](https://github.com/catppuccin/catppuccin) pour le système de couleurs
- [JasonLovesDoggo/nyx](https://github.com/JasonLovesDoggo/nyx) pour l'inspiration du design
- [Next.js](https://nextjs.org) pour le framework
