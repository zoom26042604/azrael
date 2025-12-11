type Language = 'fr' | 'en' | 'ko';

interface ProjectContent {
  title: string;
  description: string;
  journey?: string;
  technical?: string[];
  features?: string[];
  reality?: string;
}

type ProjectTranslations = {
  [key: string]: {
    [lang in Language]: ProjectContent;
  };
};

export const projectTranslations: ProjectTranslations = {
  'portfolio-personnel': {
    fr: {
      title: 'Azrael',
      description: 'Site portfolio moderne développé avec Next.js, TypeScript et le système de design Catppuccin',
      journey: `Ce portfolio a été conçu pour présenter mes compétences et projets de manière professionnelle. Le projet met l'accent sur l'expérience utilisateur avec des animations fluides, une navigation intuitive et un système de thèmes complet.

Le site utilise Next.js 16 avec Turbopack pour des performances optimales, TypeScript pour la sécurité des types, et Tailwind CSS pour un design moderne et responsive. Le système de thèmes intègre Catppuccin avec 2 palettes (Latte et Mocha) et une couleur d'accent orange (Peach).`,
      technical: [
        'Next.js 16 avec Turbopack pour des temps de build rapides',
        'TypeScript pour la sécurité des types et la maintenabilité',
        'Tailwind CSS avec configuration personnalisée',
        'Système de thèmes Catppuccin (2 thèmes avec couleur d\'accent orange)',
        'Support multilingue (Français, Anglais, Coréen)',
        'Breadcrumb navigation avec édition au clavier (Espace)',
        'Composants dynamiques avec React Hooks',
        'Leaflet pour la carte interactive',
        'Jeu 2048 intégré avec localStorage pour les scores',
        'Guide interactif pour les nouveaux visiteurs'
      ],
      features: [
        'Design entièrement responsive (mobile, tablette, desktop)',
        'Système de thèmes avec changement dynamique',
        'Couleur d\'accent orange (Peach) pour tous les éléments interactifs',
        'Navigation au clavier améliorée avec breadcrumb éditable',
        'Filtrage et recherche avancés pour les projets',
        'Carte en temps réel avec heure locale',
        'SEO optimisé avec meta tags Open Graph et Twitter Cards',
        'Performance élevée avec optimisations Next.js',
        'Accessibilité améliorée avec aria-labels',
        'Système de notifications pour le guide'
      ],
      reality: `Le portfolio offre une expérience utilisateur complète avec un système de thèmes sophistiqué utilisant Catppuccin (Latte et Mocha) avec une couleur d'accent orange conhérente. La navigation par breadcrumb avec édition au clavier (Espace) offre une navigation rapide et intuitive.

Le système de filtrage des projets inclut une recherche en temps réel, un tri par date/nom, et des filtres rapides par technologies. Tous les choix de l'utilisateur (thème, langue, score 2048) sont sauvegardés en localStorage pour une expérience personnalisée.`
    },
    en: {
      title: 'Azrael',
      description: 'Modern portfolio website developed with Next.js, TypeScript and the Catppuccin design system',
      journey: `This portfolio was designed to showcase my skills and projects professionally. The project emphasizes user experience with smooth animations, intuitive navigation, and a complete theme system.

The site uses Next.js 16 with Turbopack for optimal performance, TypeScript for type safety, and Tailwind CSS for modern and responsive design. The theme system integrates Catppuccin with 2 palettes (Latte and Mocha) and an orange accent color (Peach).`,
      technical: [
        'Next.js 16 with Turbopack for fast build times',
        'TypeScript for type safety and maintainability',
        'Tailwind CSS with custom configuration',
        'Catppuccin theme system (2 themes with orange accent color)',
        'Multi-language support (French, English, Korean)',
        'Breadcrumb navigation with keyboard editing (Space)',
        'Dynamic components with React Hooks',
        'Leaflet for interactive map',
        '2048 game integrated with localStorage for scores',
        'Interactive guide for new visitors'
      ],
      features: [
        'Fully responsive design (mobile, tablet, desktop)',
        'Theme system with dynamic switching',
        'Orange accent color (Peach) for all interactive elements',
        'Enhanced keyboard navigation with editable breadcrumb',
        'Advanced filtering and search for projects',
        'Real-time map with local time',
        'SEO optimized with Open Graph and Twitter Cards meta tags',
        'High performance with Next.js optimizations',
        'Improved accessibility with aria-labels',
        'Notification system for guide'
      ],
      reality: `The portfolio offers a complete user experience with a sophisticated theme system using Catppuccin (Latte and Mocha) with a consistent orange accent color. The breadcrumb navigation with keyboard editing (Space) provides quick and intuitive navigation.

The project filtering system includes real-time search, sorting by date/name, and quick filters by technologies. All user choices (theme, language, 2048 score) are saved in localStorage for a personalized experience.`
    },
    ko: {
      title: 'Azrael',
      description: 'Next.js, TypeScript 및 Catppuccin 디자인 시스템으로 개발된 현대적인 포트폴리오 웹사이트',
      journey: `이 포트폴리오는 제 기술과 프로젝트를 전문적으로 소개하기 위해 디자인되었습니다. 이 프로젝트는 부드러운 애니메이션, 직관적인 탐색 및 완벽한 테마 시스템으로 사용자 경험을 강조합니다.

사이트는 최적의 성능을 위해 Turbopack을 사용하는 Next.js 16, 타입 안전성을 위한 TypeScript, 현대적이고 반응형 디자인을 위한 Tailwind CSS를 사용합니다. 테마 시스템은 2개의 팔레트(Latte와 Mocha)와 주황색 강조 색상(Peach)을 가진 Catppuccin을 통합합니다.`,
      technical: [
        '빠른 빌드 시간을 위한 Turbopack을 사용하는 Next.js 16',
        '타입 안전성과 유지 보수성을 위한 TypeScript',
        '사용자 지정 구성을 가진 Tailwind CSS',
        'Catppuccin 테마 시스템 (2개 테마와 주황색 강조 색상)',
        '다국어 지원 (프랑스어, 영어, 한국어)',
        '키보드 편집(스페이스)을 가진 브레드크럼 탐색',
        'React Hooks를 사용한 동적 구성 요소',
        '대화형 지도를 위한 Leaflet',
        '점수를 위한 localStorage를 통합한 2048 게임',
        '새 방문자를 위한 대화형 가이드'
      ],
      features: [
        '완전히 반응형 디자인 (모바일, 태블릿, 데스크톱)',
        '동적 전환을 가진 테마 시스템',
        '모든 대화형 요소에 대한 주황색 강조 색상(Peach)',
        '편집 가능한 브레드크럼으로 향상된 키보드 탐색',
        '프로젝트를 위한 고급 필터링 및 검색',
        '현지 시간을 표시하는 실시간 지도',
        'Open Graph 및 Twitter Cards 메타 태그로 SEO 최적화',
        'Next.js 최적화로 높은 성능',
        'aria-labels로 향상된 접근성',
        '가이드를 위한 알림 시스템'
      ],
      reality: `포트폴리오는 일관된 주황색 강조 색상을 가진 Catppuccin(Latte와 Mocha)을 사용하는 정교한 테마 시스템으로 완전한 사용자 경험을 제공합니다. 키보드 편집(스페이스)을 가진 브레드크럼 탐색은 빠르고 직관적인 탐색을 제공합니다.

프로젝트 필터링 시스템에는 실시간 검색, 날짜/이름별 정렬 및 기술별 빠른 필터가 포함되어 있습니다. 모든 사용자 선택(테마, 언어, 2048 점수)은 localStorage에 저장되어 개인화된 경험을 제공합니다.`
    }
  }
};

export function getProjectTranslation(slug: string, language: Language): ProjectContent | null {
  return projectTranslations[slug]?.[language] || null;
}
