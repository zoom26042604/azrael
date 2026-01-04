# Azrael Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.0.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat)](LICENSE)

> Modern multilingual portfolio built with Next.js 16, TypeScript, and Catppuccin design system.

[🌐 Live Site](https://nathan-ferre.fr) | [📧 Contact](mailto:nathan.ferre@ynov.com)

---

## 🎨 Overview

Personal portfolio showcasing my skills, projects, and professional experience with a modern and responsive interface. The site integrates the Catppuccin theme system with a consistent orange accent color.

### ✨ Key Features

- 🌍 **Multilingual**: Full FR/EN/KO support with dynamic switching
- 🎨 **Catppuccin Themes**: Light (Latte) and Dark (Mocha) modes
- 🎯 **Orange Accent Color**: Peach color for all interactive elements
- 📱 **100% Responsive**: Adaptive design for mobile, tablet, and desktop
- ⌨️ **Keyboard Navigation**: Editable breadcrumb with Space shortcut
- 🔍 **Advanced Search**: Real-time project filtering and sorting
- 🗺️ **Interactive Map**: Location display with Leaflet and local time
- 🎮 **2048 Mini-game**: Integrated with score saving
- ♿ **Accessibility**: ARIA labels and optimized navigation
- ⚡ **Performance**: Lighthouse score > 90/100

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/zoom26042604/azrael.git
cd azrael

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The site will be available at [http://localhost:3000](http://localhost:3000)

### Available Scripts

\`\`\`bash
npm run dev      # Development with Turbopack
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
\`\`\`

---

## 🏗️ Architecture

\`\`\`
azrael/
├── pages/                    # Next.js pages (routing)
│   ├── _app.tsx             # Global configuration
│   ├── _document.tsx        # HTML structure
│   ├── index.tsx            # Home page
│   ├── about.tsx            # About
│   ├── projects/            # Projects
│   ├── contact.tsx          # Contact
│   └── api/                 # API routes
├── src/
│   ├── components/          # React components
│   │   ├── features/        # Business components
│   │   ├── layout/          # Layout (Header, Sidebar, Footer)
│   │   └── ui/              # Reusable UI components
│   ├── contexts/            # React contexts (Theme, Language)
│   ├── data/                # Static data
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities and constants
│   └── types/               # TypeScript types
├── public/                  # Static assets
└── styles/                  # Global CSS styles
\`\`\`

---

## 🛠️ Tech Stack

### Core

- **[Next.js 16](https://nextjs.org/)** - React framework with Turbopack
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Static typing
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### Libraries

- **[Leaflet](https://leafletjs.com/)** - Interactive maps
- **[Lucide React](https://lucide.dev/)** - Modern icons
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon collection

### Design System

- **[Catppuccin](https://github.com/catppuccin/catppuccin)** - Pastel color palette
  - 2 themes: Latte (light) and Mocha (dark)
  - Fixed orange accent color (Peach)
  - CSS variables for dynamic switching

---

## 🎨 Theme System

The portfolio uses the Catppuccin system with two main themes:

### Available Themes

| Theme | Catppuccin Variant | Description |
|-------|-------------------|-------------|
| \`light\` | Latte | Light mode with warm pastel tones |
| \`dark\` | Mocha | Dark mode with soft pastel tones |

### Accent Color

The portfolio uses a fixed orange accent color (**Peach**) for all interactive elements, ensuring consistent visual identity.

### Persistence

User preferences (theme, language, scores) are saved in \`localStorage\` for a personalized experience.

---

## 🌍 Internationalization

Full support for 3 languages:

- 🇫🇷 **French** (default)
- 🇬🇧 **English**
- 🇰🇷 **Korean**

All translations are centralized in \`src/contexts/LanguageContext.tsx\`.

---

## 📦 Deployment

### Manual Build

\`\`\`bash
npm run build
npm run start
\`\`\`

The optimized build will be in the \`.next/\` folder

---

## 🔧 Configuration

### Environment Variables

Create a \`.env.local\` file:

\`\`\`env
# Next.js
NEXT_PUBLIC_SITE_URL=https://nathanferre.dev

# API (optional)
GITHUB_TOKEN=your_github_token_here
\`\`\`

### Customization

- **Themes**: Edit \`src/lib/constants.ts\`
- **Translations**: Modify \`src/contexts/LanguageContext.tsx\`
- **Projects**: Add to \`src/data/projects.ts\`
- **Styles**: Customize \`styles/catppuccin.css\`

---

## 📝 Detailed Features

### Breadcrumb Navigation

Dynamic breadcrumb with keyboard editing:
- Press **Space** to activate editing
- Type the path (e.g., \`/projects\`, \`/about\`)
- **Enter** to validate, **Escape** to cancel

### Project Filtering

- **Search**: Real-time filtering by title/description/tags
- **Sort**: Default, by name (A-Z), or by date (recent)
- **Quick Filters**: Technology tag buttons

### Interactive Map

- Geographic location with Leaflet
- Local time display
- Custom marker with animation

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create a branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Nathan FERRE**

- 🌐 Website: [nathan-ferre.fr](https://nathan-ferre.fr)
- 💼 LinkedIn: [Nathan FERRE](https://www.linkedin.com/in/nathan-ferre-0ba3a438a/)
- 🐙 GitHub: [@zoom26042604](https://github.com/zoom26042604)
- 📧 Email: nathan.ferre@ynov.com

---

## 🙏 Acknowledgments

- [Catppuccin](https://github.com/catppuccin/catppuccin) for the beautiful color system
- [Next.js](https://nextjs.org) for the incredible framework
- Open-source community for the inspiration

---

<div align="center">

**⭐ If you like this project, don't hesitate to give it a star!**

Made with ❤️ and ☕ by Nathan FERRE

</div>
