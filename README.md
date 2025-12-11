# Azrael Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.0.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat)](LICENSE)

> Portfolio moderne et multilingue développé avec Next.js 16, TypeScript et le système de design Catppuccin.

[🌐 Site en ligne](https://nathan-ferre.fr) | [📧 Contact](mailto:nathan.ferre@ynov.com)

---

## 🎨 Aperçu

Portfolio personnel présentant mes compétences, projets et expériences professionnelles avec une interface moderne et responsive. Le site intègre le système de thèmes Catppuccin avec une couleur d'accent orange cohérente.

### ✨ Fonctionnalités principales

- 🌍 **Multilingue** : Support complet FR/EN/KO avec changement dynamique
- 🎨 **Thèmes Catppuccin** : Mode clair (Latte) et sombre (Mocha)
- 🎯 **Couleur d'accent orange** : Couleur Peach pour tous les éléments interactifs
- 📱 **100% Responsive** : Design adaptatif mobile, tablette et desktop
- ⌨️ **Navigation clavier** : Breadcrumb éditable avec raccourci Espace
- 🔍 **Recherche avancée** : Filtrage et tri des projets en temps réel
- 🗺️ **Carte interactive** : Localisation avec Leaflet et heure locale
- 🎮 **Mini-jeu 2048** : Intégré avec sauvegarde des scores
- ♿ **Accessibilité** : ARIA labels et navigation optimisée
- ⚡ **Performances** : Score Lighthouse > 90/100

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20+ 
- npm, yarn, pnpm ou bun

### Installation

```bash
# Cloner le repository
git clone https://github.com/zoom26042604/azrael.git
cd azrael

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

```bash
npm run dev      # Développement avec Turbopack
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification ESLint
```

---

## 🏗️ Architecture

```
azrael/
├── pages/                    # Pages Next.js (routing)
│   ├── _app.tsx             # Configuration globale
│   ├── _document.tsx        # Structure HTML
│   ├── index.tsx            # Page d'accueil
│   ├── about.tsx            # À propos
│   ├── projects/            # Projets
│   ├── contact.tsx          # Contact
│   └── api/                 # API routes
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
└── styles/                  # Styles globaux CSS
```

---

## 🛠️ Stack technique

### Core

- **[Next.js 16](https://nextjs.org/)** - Framework React avec Turbopack
- **[React 19](https://react.dev/)** - Bibliothèque UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first

### Librairies

- **[Leaflet](https://leafletjs.com/)** - Carte interactive
- **[Lucide React](https://lucide.dev/)** - Icônes modernes
- **[React Icons](https://react-icons.github.io/react-icons/)** - Collection d'icônes

### Design System

- **[Catppuccin](https://github.com/catppuccin/catppuccin)** - Palette de couleurs pastel
  - 2 thèmes : Latte (clair) et Mocha (sombre)
  - Couleur d'accent orange (Peach) fixe
  - Variables CSS pour changement dynamique

---

## 🎨 Système de thèmes

Le portfolio utilise le système Catppuccin avec deux thèmes principaux :

### Thèmes disponibles

| Thème | Variant Catppuccin | Description |
|-------|-------------------|-------------|
| `light` | Latte | Mode clair avec tons pastels chauds |
| `dark` | Mocha | Mode sombre avec tons pastels doux |

### Couleur d'accent

Le portfolio utilise une couleur d'accent orange fixe (**Peach**) pour tous les éléments interactifs, garantissant une identité visuelle cohérente.

### Persistance

Les préférences utilisateur (thème, langue, scores) sont sauvegardées dans `localStorage` pour une expérience personnalisée.

---

## 🌍 Internationalisation

Support complet de 3 langues :

- 🇫🇷 **Français** (défaut)
- 🇬🇧 **Anglais**
- 🇰🇷 **Coréen**

Toutes les traductions sont centralisées dans `src/contexts/LanguageContext.tsx`.

---

## 📦 Déploiement

### Build manuel

```bash
npm run build
npm run start
```

Le build optimisé sera dans le dossier `.next/`

---

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env.local` :

```env
# Next.js
NEXT_PUBLIC_SITE_URL=https://nathanferre.dev

# API (optionnel)
GITHUB_TOKEN=your_github_token_here
```

### Personnalisation

- **Thèmes** : Modifier `src/lib/constants.ts`
- **Traductions** : Éditer `src/contexts/LanguageContext.tsx`
- **Projets** : Ajouter dans `src/data/projects.ts`
- **Styles** : Personnaliser `styles/catppuccin.css`

---

## 📝 Fonctionnalités détaillées

### Navigation breadcrumb

Breadcrumb dynamique avec édition au clavier :
- Appuyer sur **Espace** pour activer l'édition
- Taper le chemin (ex: `/projects`, `/about`)
- **Entrée** pour valider, **Échap** pour annuler

### Filtrage de projets

- **Recherche** : Filtrage en temps réel par titre/description/tags
- **Tri** : Par défaut, par nom (A-Z), ou par date (récents)
- **Filtres rapides** : Boutons de tags technologiques

### Carte interactive

- Localisation géographique avec Leaflet
- Affichage de l'heure locale
- Marqueur personnalisé avec animation

---

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👤 Auteur

**Nathan FERRE**

- 🌐 Website : [nathan-ferre.fr](https://nathan-ferre.fr)
- 💼 LinkedIn : [Nathan FERRE](https://www.linkedin.com/in/nathan-ferre-0ba3a438a/)
- 🐙 GitHub : [@zoom26042604](https://github.com/zoom26042604)
- 📧 Email : nathan.ferre@ynov.com

---

## 🙏 Remerciements

- [Catppuccin](https://github.com/catppuccin/catppuccin) pour le magnifique système de couleurs
- [Next.js](https://nextjs.org) pour le framework incroyable
- Communauté open-source pour l'inspiration

---

<div align="center">

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !**

Made with ❤️ and ☕ by Nathan FERRE

</div>
