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
  },
  'atelier-de-camille': {
    fr: {
      title: "L'Atelier de Camille",
      description: "Stage full-stack sur une plateforme de réservation en ligne pour une prothésiste ongulaire : audit technique, modélisation des réservations, API sécurisée et finalisation du parcours d'inscription.",
      journey: `L'Atelier de Camille est une plateforme de réservation en ligne pour une prothésiste ongulaire indépendante, dans un secteur — la beauté et le soin — engagé dans une digitalisation croissante : les clientes attendent aujourd'hui de pouvoir réserver depuis leur téléphone, tandis que la professionnelle veut garder un contrôle total sur son agenda et sa clientèle. C'est dans ce contexte que s'inscrit mon stage de développement full-stack, réalisé du 29 juin au 3 août 2026.

Je suis arrivé sur un projet déjà engagé : une API backend en Spring Boot relativement avancée, et un frontend Next.js encore au stade de gabarit. Mon rôle a d'abord consisté à comprendre ce socle existant avant d'y toucher : cartographie de l'architecture, comparaison systématique avec le cahier des charges et le schéma de base de données cibles, recensement des écarts et des questions à trancher avec l'équipe. Cet audit, formalisé en documentation technique, m'a servi de boussole pour la suite du stage.

J'ai ensuite pris en charge la fonctionnalité de réservation de bout en bout côté backend (modélisation, API sécurisée de création/modification/suppression, puis lecture avec autorisation fine cliente/administratrice), avant de terminer côté frontend la page d'inscription, dont une première version avait été posée par un autre membre de l'équipe.

Le projet suit des conventions d'équipe strictes que j'ai dû intégrer : une branche par ticket, fusion par pull request vers une branche commune, et surtout la règle de ne jamais modifier le code écrit par un autre développeur, même quand ce code contient une limite. Cette contrainte s'est révélée plus formatrice que prévu : en découvrant un bug renvoyant un code 500 au lieu de 403 sur les accès refusés, la solution n'était pas de corriger directement le fichier concerné (écrit par un collègue), mais de comprendre assez finement le framework pour intercepter le problème autrement, via un second gestionnaire d'exceptions.`,
      technical: [
        "Java 21 / Spring Boot, architecture en couches (controller → service → repository)",
        "Spring Data JPA / Hibernate pour la persistance, relations et enums typés",
        "Spring Security et authentification JWT stateless avec autorisation au niveau méthode (@PreAuthorize)",
        "Documentation d'API avec Swagger / SpringDoc OpenAPI",
        "Next.js, React et TypeScript, formulaires avec react-hook-form et validation Zod",
        "Tailwind CSS et composants shadcn/ui (Radix UI)",
        "Workflow Git en équipe : une branche par ticket, revue et fusion via pull request"
      ],
      features: [
        "Audit technique complet de l'existant et comparaison avec le cahier des charges et le schéma de base de données cible",
        "Modèle de réservation : statut, prix et acompte figés au moment de la demande, liée à la cliente, à la prestation et au créneau",
        "API sécurisée de gestion des réservations (création, modification, suppression) avec mise à jour partielle des champs métier",
        "Lecture des réservations avec autorisation fine admin/propriétaire, et correction d'un bug de code d'erreur (403 au lieu de 500)",
        "Finalisation du formulaire d'inscription : validations, erreurs serveur, redirection, affichage du mot de passe, indicatif téléphonique, consentement RGPD",
        "Vérification systématique de chaque fonctionnalité en conditions réelles, avec tableaux de cas de test documentés"
      ],
      reality: `Ce stage m'a fait passer d'un rôle d'apprenant sur des projets personnels à celui de contributeur sur un code déjà écrit par d'autres, avec ses conventions, ses choix historiques et ses contraintes. Le ressenti principal est celui d'une bascule : apprendre à lire et respecter le travail des autres avant d'apprendre à écrire le sien, une rigueur différente de celle d'un projet démarré seul de zéro.

La principale difficulté a été la gestion des dépendances entre mes propres tickets non encore fusionnés : BE-017 s'appuyait sur BE-016, BE-018 sur BE-017, chacun sur une branche distincte pas encore intégrée à la branche commune. Il fallait donc suivre précisément l'avancement de chacune pour ne perdre ni code ni cohérence. Cette contrainte a révélé une vraie force chez moi — documenter et tracer mes choix de conception pour qu'ils restent compréhensibles en dehors de mon poste de travail — mais aussi une marge de progression sur l'anticipation des dépendances entre tâches avant de les découper en tickets.

Ce stage a surtout révélé l'intérêt que je porte aux pratiques d'ingénierie logicielle et, plus spécifiquement, à tout ce qui touche à l'infrastructure et à l'environnement d'exécution. Lors de l'audit initial, ce qui a le plus retenu mon attention n'était pas telle ou telle fonctionnalité, mais des sujets comme l'externalisation des secrets, la séparation des configurations de développement et de production, ou l'absence encore de conteneurisation (Docker, PostgreSQL) pourtant prévue par le cahier des charges. Ces questions de configuration, de déploiement et de fiabilité de l'environnement m'intéressent aujourd'hui davantage que l'ajout de nouvelles fonctionnalités, et orientent mon projet professionnel vers le DevOps et l'administration système.`
    },
    en: {
      title: "L'Atelier de Camille",
      description: "Full-stack internship on an online booking platform for a nail technician: technical audit, booking domain modeling, secure API, and a finished sign-up flow.",
      journey: `L'Atelier de Camille is an online booking platform for an independent nail technician, in a sector — beauty and personal care — undergoing rapid digitalisation: clients now expect to book from their phone, while the professional wants full control over her schedule and clientele. That's the context for this full-stack internship, carried out from June 29 to August 3, 2026.

I joined a project already in motion: a fairly advanced Spring Boot backend API, and a Next.js frontend still at the template stage. My first task was to understand that existing foundation before touching it: mapping the architecture, systematically comparing it against the target specification and database schema, and listing the gaps and open questions for the team to settle. That audit, written up as technical documentation, became my compass for the rest of the internship.

I then owned the booking feature end to end on the backend (modeling, a secured create/update/delete API, then read endpoints with fine-grained client/admin authorization), before finishing the sign-up page on the frontend, whose first version had been laid out by another team member.

The project follows strict team conventions I had to work within: one branch per ticket, merged via pull request into a shared branch, and above all the rule of never modifying code written by someone else, even when that code has a limitation. That last constraint turned out more instructive than expected: when I found a bug returning a 500 instead of a 403 on denied access, the fix wasn't to directly patch the file in question (written by a teammate), but to understand the framework well enough to intercept the problem differently, through a second exception handler.`,
      technical: [
        "Java 21 / Spring Boot, layered architecture (controller → service → repository)",
        "Spring Data JPA / Hibernate for persistence, typed relations and enums",
        "Spring Security with stateless JWT auth and method-level authorization (@PreAuthorize)",
        "API documentation with Swagger / SpringDoc OpenAPI",
        "Next.js, React and TypeScript, forms with react-hook-form and Zod validation",
        "Tailwind CSS and shadcn/ui components (Radix UI)",
        "Team Git workflow: one branch per ticket, reviewed and merged via pull request"
      ],
      features: [
        "Full technical audit of the existing codebase against the target specification and database schema",
        "Booking domain model: status, price and deposit snapshotted at request time, linked to the client, the service and the time slot",
        "Secured booking management API (create, update, delete) with partial updates to business fields",
        "Booking read endpoints with fine-grained admin-or-owner authorization, plus a fix for a mis-mapped error status (403 instead of 500)",
        "Finished the sign-up form: validation, server-error handling, redirect, password visibility toggle, phone prefix, GDPR consent",
        "Systematic end-to-end verification of every feature, with documented test-case tables"
      ],
      reality: `This internship moved me from a learner's role on personal projects to a contributor's role on code already written by others, with its own conventions, historical choices and constraints. The main feeling was a shift: learning to read and respect other people's work before learning to write my own — a different kind of rigour than working alone from a blank slate.

The main difficulty was managing dependencies between my own unmerged tickets: BE-017 relied on BE-016, BE-018 on BE-017, each on a separate branch not yet integrated into the shared branch. That meant tracking each one's progress closely to avoid losing code or breaking consistency. This constraint revealed a real strength of mine — documenting and tracing my design decisions so they stay understandable outside my own head — but also room to grow in anticipating task dependencies before splitting work into tickets.

More than anything, this internship revealed how much I care about software engineering practices, and specifically about infrastructure and runtime environments. During the initial audit, what caught my attention most wasn't any particular feature, but issues like externalising secrets, separating development and production configuration, or the lack of containerisation (Docker, PostgreSQL) that the specification still called for. These questions of configuration, deployment and environment reliability interest me today more than adding new features, and are steering my career plans toward DevOps and system administration.`
    },
    ko: {
      title: "아틀리에 드 카미유",
      description: "네일 아티스트를 위한 온라인 예약 플랫폼 인턴십: 기술 감사, 예약 도메인 모델링, 보안 API, 완성된 회원가입 플로우.",
      journey: `L'Atelier de Camille는 독립 네일 아티스트를 위한 온라인 예약 플랫폼으로, 뷰티·케어 산업이 빠르게 디지털화되는 흐름 속에 있습니다: 고객은 이제 휴대폰으로 예약하길 기대하고, 전문가는 자신의 일정과 고객 관리를 완전히 통제하고 싶어 합니다. 이것이 2026년 6월 29일부터 8월 3일까지 진행된 이번 풀스택 인턴십의 배경입니다.

저는 이미 진행 중인 프로젝트에 합류했습니다: 상당히 발전된 Spring Boot 백엔드 API와, 아직 템플릿 단계인 Next.js 프론트엔드였습니다. 첫 과제는 손대기 전에 기존 기반을 이해하는 것이었습니다: 아키텍처 정리, 목표 명세 및 데이터베이스 스키마와의 체계적 비교, 팀이 결정해야 할 격차와 질문 목록화. 이 감사 작업은 기술 문서로 정리되어 인턴십 내내 저의 나침반이 되었습니다.

이후 저는 백엔드에서 예약 기능을 처음부터 끝까지 담당했고(모델링, 보안이 적용된 생성/수정/삭제 API, 세밀한 고객/관리자 권한이 적용된 조회 엔드포인트), 프론트엔드에서는 다른 팀원이 초안을 작성했던 회원가입 페이지를 완성했습니다.

이 프로젝트는 제가 따라야 했던 엄격한 팀 규칙을 갖고 있었습니다: 티켓당 하나의 브랜치, 공유 브랜치로의 풀 리퀘스트 병합, 그리고 무엇보다 다른 개발자가 작성한 코드에 한계가 있더라도 절대 직접 수정하지 않는다는 규칙이었습니다. 이 마지막 제약은 예상보다 더 많은 것을 가르쳐 주었습니다: 접근 거부 시 403 대신 500을 반환하는 버그를 발견했을 때, 해결책은 해당 파일(동료가 작성한)을 직접 고치는 것이 아니라, 프레임워크를 충분히 이해해 두 번째 예외 처리기를 통해 문제를 다르게 가로채는 것이었습니다.`,
      technical: [
        "Java 21 / Spring Boot, 계층형 아키텍처 (controller → service → repository)",
        "영속성을 위한 Spring Data JPA / Hibernate, 타입이 지정된 관계 및 열거형",
        "무상태 JWT 인증과 메서드 수준 권한 부여(@PreAuthorize)를 사용하는 Spring Security",
        "Swagger / SpringDoc OpenAPI를 사용한 API 문서화",
        "Next.js, React, TypeScript, react-hook-form과 Zod 검증을 사용한 폼",
        "Tailwind CSS와 shadcn/ui 컴포넌트(Radix UI)",
        "팀 Git 워크플로우: 티켓당 하나의 브랜치, 풀 리퀘스트를 통한 리뷰 및 병합"
      ],
      features: [
        "기존 코드베이스에 대한 전체 기술 감사 및 목표 명세·데이터베이스 스키마와의 비교",
        "예약 도메인 모델: 요청 시점에 고정되는 상태, 가격, 보증금, 고객·서비스·시간대와의 연결",
        "비즈니스 필드에 대한 부분 업데이트를 지원하는 보안 예약 관리 API (생성, 수정, 삭제)",
        "세밀한 관리자/소유자 권한 부여가 적용된 예약 조회 엔드포인트, 잘못 매핑된 오류 상태 수정(500 대신 403)",
        "회원가입 폼 완성: 유효성 검사, 서버 오류 처리, 리다이렉션, 비밀번호 표시 토글, 전화번호 접두사, GDPR 동의",
        "문서화된 테스트 케이스 표를 통한 모든 기능의 체계적인 종단 간 검증"
      ],
      reality: `이 인턴십을 통해 저는 개인 프로젝트에서 배우는 역할에서, 이미 다른 사람이 작성한 코드 — 나름의 규칙, 역사적 선택, 제약을 가진 — 에 기여하는 역할로 옮겨갔습니다. 가장 큰 느낌은 일종의 전환이었습니다: 스스로 코드를 쓰기 전에, 다른 사람의 작업을 읽고 존중하는 법을 먼저 배우는 것 — 혼자 백지에서 시작하는 것과는 다른 종류의 엄격함이었습니다.

가장 큰 어려움은 아직 병합되지 않은 제 자신의 티켓들 간의 의존성을 관리하는 것이었습니다: BE-017은 BE-016에, BE-018은 BE-017에 의존했고, 각각 공유 브랜치에 아직 통합되지 않은 별도의 브랜치에 있었습니다. 그래서 코드나 일관성을 잃지 않으려면 각각의 진행 상황을 정확히 추적해야 했습니다. 이 제약은 저의 진짜 강점을 드러냈습니다 — 제 설계 결정을 문서화하고 추적하여 제 자리를 벗어나서도 이해할 수 있게 만드는 것 — 하지만 작업을 티켓으로 나누기 전에 작업 간 의존성을 미리 예측하는 부분에서는 성장의 여지도 보여주었습니다.

무엇보다 이 인턴십은 소프트웨어 엔지니어링 관행, 특히 인프라와 실행 환경에 대한 제 관심을 드러내 주었습니다. 초기 감사 과정에서 저의 관심을 가장 많이 끈 것은 특정 기능이 아니라, 비밀 정보의 외부화, 개발/운영 환경 설정 분리, 명세서에서 여전히 요구하고 있는 컨테이너화(Docker, PostgreSQL)의 부재 같은 주제들이었습니다. 설정, 배포, 환경 안정성에 관한 이러한 질문들이 새로운 기능을 추가하는 것보다 지금 저에게 더 흥미롭게 다가오며, 제 진로를 DevOps와 시스템 관리 쪽으로 이끌고 있습니다.`
    }
  }
};

export function getProjectTranslation(slug: string, language: Language): ProjectContent | null {
  return projectTranslations[slug]?.[language] || null;
}
