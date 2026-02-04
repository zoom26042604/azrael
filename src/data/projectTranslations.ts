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
      ],
      features: [
        'Design entièrement responsive (mobile, tablette, desktop)',
        'Navigation au clavier améliorée avec breadcrumb éditable',
        'Carte en temps réel avec heure locale',
      ],
      reality: `Ce portfolio offre une expérience utilisateur complète. La navigation par breadcrumb avec édition au clavier (Espace) offre une navigation rapide et intuitive.`

    },
    en: {
      title: 'Azrael',
      description: 'Modern portfolio website developed with Next.js, TypeScript and the Catppuccin design system',
      journey: `This portfolio was designed to showcase my skills and projects professionally. The project emphasizes user experience with smooth animations, intuitive navigation, and a complete theme system.

The site uses Next.js 16 with Turbopack for optimal performance, TypeScript for type safety, and Tailwind CSS for modern and responsive design. The theme system integrates Catppuccin with 2 palettes (Latte and Mocha) and an orange accent color (Peach).`,
      technical: [
        'Next.js 16',
        'TypeScript for type safety and maintainability',
        'Tailwind CSS with custom configuration',
        'Catppuccin theme system (2 themes with orange accent color)',
        'Multi-language support (French, English, Korean)',
        'Breadcrumb navigation with keyboard editing (Space)',
        'Interactive guide for new visitors'
      ],
      features: [
        'Fully responsive design (mobile, tablet, desktop)',
        'Theme system with dynamic switching',
        'Orange accent color (Peach) for all interactive elements',
        'Enhanced keyboard navigation with editable breadcrumb',
        'Real-time map with local time',
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
  },
  'game-2048': {
    fr: {
      title: 'Jeu 2048',
      description: 'Une implémentation moderne du jeu de puzzle classique 2048 avec classement et statistiques',
      journey: `Ce projet est une refonte complète du jeu 2048 classique, transformé en une application web complète avec un système de classement, des statistiques globales et des profils joueurs.

Le jeu utilise une base de données SQLite avec Prisma ORM pour stocker les scores et les classements. L'interface est construite avec Next.js et les animations sont gérées par Framer Motion pour une expérience fluide.`,
      technical: [
        'Next.js 16 avec App Router',
        'TypeScript pour la sécurité des types',
        'Prisma ORM avec SQLite pour la base de données',
        'Zustand pour la gestion d\'état du jeu',
        'Framer Motion pour les animations',
        'Tailwind CSS pour le design',
        'API Routes pour le backend'
      ],
      features: [
        'Gameplay classique du 2048 avec contrôles tactiles et clavier',
        'Classement global avec pagination',
        'Profils joueurs avec historique des scores',
        'Statistiques globales (parties jouées, taux de victoire, etc.)',
        'Soumission des scores avec partage social',
        'Design responsive pour mobile et desktop',
        'Animations fluides sur les tuiles'
      ],
      reality: `Le jeu offre une expérience complète avec un système de classement persistant. Les joueurs peuvent voir leur rang, comparer leurs scores avec d'autres joueurs, et suivre leurs progrès dans le temps.

L'architecture du projet sépare clairement la logique de jeu (store Zustand), l'interface utilisateur (composants React), et la persistance des données (API + Prisma).`
    },
    en: {
      title: '2048 Game',
      description: 'A modern implementation of the classic 2048 puzzle game with leaderboard and statistics',
      journey: `This project is a complete rebuild of the classic 2048 game, transformed into a full-featured web application with a leaderboard system, global statistics, and player profiles.

The game uses a SQLite database with Prisma ORM to store scores and rankings. The interface is built with Next.js and animations are handled by Framer Motion for a smooth experience.`,
      technical: [
        'Next.js 16 with App Router',
        'TypeScript for type safety',
        'Prisma ORM with SQLite for database',
        'Zustand for game state management',
        'Framer Motion for animations',
        'Tailwind CSS for styling',
        'API Routes for backend'
      ],
      features: [
        'Classic 2048 gameplay with touch and keyboard controls',
        'Global leaderboard with pagination',
        'Player profiles with score history',
        'Global statistics (games played, win rate, etc.)',
        'Score submission with social sharing',
        'Responsive design for mobile and desktop',
        'Smooth tile animations'
      ],
      reality: `The game offers a complete experience with a persistent leaderboard system. Players can see their rank, compare scores with other players, and track their progress over time.

The project architecture clearly separates game logic (Zustand store), user interface (React components), and data persistence (API + Prisma).`
    },
    ko: {
      title: '2048 게임',
      description: '리더보드와 통계가 있는 클래식 2048 퍼즐 게임의 현대적 구현',
      journey: `이 프로젝트는 클래식 2048 게임을 완전히 재구축하여 리더보드 시스템, 글로벌 통계 및 플레이어 프로필이 있는 완전한 기능의 웹 애플리케이션으로 변환했습니다.

게임은 점수와 순위를 저장하기 위해 Prisma ORM이 있는 SQLite 데이터베이스를 사용합니다. 인터페이스는 Next.js로 구축되었고 애니메이션은 부드러운 경험을 위해 Framer Motion으로 처리됩니다.`,
      technical: [
        'App Router가 있는 Next.js 16',
        '타입 안전성을 위한 TypeScript',
        '데이터베이스를 위한 SQLite가 있는 Prisma ORM',
        '게임 상태 관리를 위한 Zustand',
        '애니메이션을 위한 Framer Motion',
        '스타일링을 위한 Tailwind CSS',
        '백엔드를 위한 API Routes'
      ],
      features: [
        '터치 및 키보드 컨트롤이 있는 클래식 2048 게임플레이',
        '페이지네이션이 있는 글로벌 리더보드',
        '점수 기록이 있는 플레이어 프로필',
        '글로벌 통계 (플레이한 게임, 승률 등)',
        '소셜 공유가 있는 점수 제출',
        '모바일과 데스크톱을 위한 반응형 디자인',
        '부드러운 타일 애니메이션'
      ],
      reality: `게임은 영구적인 리더보드 시스템으로 완전한 경험을 제공합니다. 플레이어는 자신의 순위를 보고, 다른 플레이어와 점수를 비교하고, 시간에 따른 진행 상황을 추적할 수 있습니다.

프로젝트 아키텍처는 게임 로직(Zustand 스토어), 사용자 인터페이스(React 컴포넌트) 및 데이터 영속성(API + Prisma)을 명확하게 분리합니다.`
    }
  },
  'interactive-cv': {
    fr: {
      title: 'CV Interactif',
      description: 'Un CV/Resume web interactif construit avec Next.js, avec mode sombre et support d\'impression',
      journey: `Ce projet est un CV interactif conçu pour remplacer les CV traditionnels créés avec des outils comme Canva. L'idée était de créer une expérience web moderne qui peut être facilement mise à jour et partagée.

Le CV utilise Next.js pour le rendu côté serveur, Tailwind CSS pour le design, et Framer Motion pour les animations subtiles. Le support d'impression permet d'exporter le CV en PDF directement depuis le navigateur.`,
      technical: [
        'Next.js 16 avec App Router',
        'TypeScript pour la sécurité des types',
        'Tailwind CSS pour le design responsive',
        'Framer Motion pour les animations',
        'Mode sombre/clair avec préférence système',
        'Styles d\'impression optimisés pour export PDF',
        'Fichier de données centralisé pour faciliter les mises à jour'
      ],
      features: [
        'Design moderne et professionnel',
        'Mode sombre/clair avec bascule',
        'Export PDF optimisé via impression',
        'Sections: Expérience, Éducation, Projets, Compétences, Langues',
        'Animations d\'entrée fluides',
        'Liens vers portfolio et réseaux sociaux',
        'Facilement personnalisable via fichier de données'
      ],
      reality: `Le CV offre une alternative moderne aux documents statiques. Les informations sont centralisées dans un fichier TypeScript, ce qui facilite les mises à jour.

Le design est responsive et s'adapte à tous les écrans, tout en restant optimisé pour l'impression papier. Les animations ajoutent une touche de sophistication sans nuire à la lisibilité.`
    },
    en: {
      title: 'Interactive CV',
      description: 'An interactive web CV/Resume built with Next.js, featuring dark mode and print support',
      journey: `This project is an interactive CV designed to replace traditional resumes created with tools like Canva. The idea was to create a modern web experience that can be easily updated and shared.

The CV uses Next.js for server-side rendering, Tailwind CSS for design, and Framer Motion for subtle animations. Print support allows exporting the CV to PDF directly from the browser.`,
      technical: [
        'Next.js 16 with App Router',
        'TypeScript for type safety',
        'Tailwind CSS for responsive design',
        'Framer Motion for animations',
        'Dark/light mode with system preference',
        'Optimized print styles for PDF export',
        'Centralized data file for easy updates'
      ],
      features: [
        'Modern and professional design',
        'Dark/light mode toggle',
        'Optimized PDF export via print',
        'Sections: Experience, Education, Projects, Skills, Languages',
        'Smooth entrance animations',
        'Links to portfolio and social networks',
        'Easily customizable via data file'
      ],
      reality: `The CV offers a modern alternative to static documents. Information is centralized in a TypeScript file, making updates easy.

The design is responsive and adapts to all screens while remaining optimized for paper printing. Animations add a touch of sophistication without harming readability.`
    },
    ko: {
      title: '인터랙티브 이력서',
      description: '다크 모드와 인쇄 지원을 갖춘 Next.js로 구축된 인터랙티브 웹 이력서',
      journey: `이 프로젝트는 Canva와 같은 도구로 만든 전통적인 이력서를 대체하기 위해 설계된 인터랙티브 이력서입니다. 아이디어는 쉽게 업데이트하고 공유할 수 있는 현대적인 웹 경험을 만드는 것이었습니다.

이력서는 서버 사이드 렌더링을 위해 Next.js를, 디자인을 위해 Tailwind CSS를, 미묘한 애니메이션을 위해 Framer Motion을 사용합니다. 인쇄 지원을 통해 브라우저에서 직접 PDF로 이력서를 내보낼 수 있습니다.`,
      technical: [
        'App Router가 있는 Next.js 16',
        '타입 안전성을 위한 TypeScript',
        '반응형 디자인을 위한 Tailwind CSS',
        '애니메이션을 위한 Framer Motion',
        '시스템 선호도가 있는 다크/라이트 모드',
        'PDF 내보내기를 위한 최적화된 인쇄 스타일',
        '쉬운 업데이트를 위한 중앙 집중식 데이터 파일'
      ],
      features: [
        '현대적이고 전문적인 디자인',
        '다크/라이트 모드 토글',
        '인쇄를 통한 최적화된 PDF 내보내기',
        '섹션: 경력, 교육, 프로젝트, 기술, 언어',
        '부드러운 입장 애니메이션',
        '포트폴리오 및 소셜 네트워크 링크',
        '데이터 파일을 통한 쉬운 사용자 정의'
      ],
      reality: `이력서는 정적 문서에 대한 현대적인 대안을 제공합니다. 정보는 TypeScript 파일에 중앙 집중화되어 업데이트가 쉽습니다.

디자인은 반응형이며 모든 화면에 적응하면서도 종이 인쇄에 최적화되어 있습니다. 애니메이션은 가독성을 해치지 않으면서 세련미를 더합니다.`
    }
  }
};

export function getProjectTranslation(slug: string, language: Language): ProjectContent | null {
  return projectTranslations[slug]?.[language] || null;
}
