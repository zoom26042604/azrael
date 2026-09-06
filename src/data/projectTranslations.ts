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
      description: "Stage de développement full-stack au sein de Loud : audit technique de l'existant, modélisation et API sécurisée des réservations, correction d'un bug de sécurité, et finalisation du parcours d'inscription pour une plateforme de réservation en ligne destinée à une prothésiste ongulaire.",
      journey: `Ce stage s'est déroulé au sein de Loud, l'auto-entreprise de mon maître de stage, Ludovic Roux, basée à Toulouse (31) et créée en 2025 à la fin de ses études, dans le secteur de la prestation de services informatiques et plus précisément du développement sur mesure. Son activité principale est le développement pour une prop firm (société de trading pour compte propre), son client principal, mais il intervient en parallèle sur des projets plus ponctuels pour d'autres structures, comme une mairie pour la gestion d'une cantine, ou encore L'Atelier de Camille, ainsi qu'une activité complémentaire de formation dans l'enseignement supérieur. Sur le marché du développement sur mesure, où se côtoient ESN, solutions SaaS standardisées et indépendants, Loud se positionne sur des besoins spécifiques de TPE, d'indépendants et de collectivités, avec une clientèle surtout locale.

L'Atelier de Camille est précisément ce type de mission : une plateforme de réservation en ligne pour une prothésiste ongulaire indépendante, dans le secteur de la beauté et du soin, engagé dans une digitalisation croissante. Les clientes attendent aujourd'hui de pouvoir réserver depuis leur téléphone, tandis que la professionnelle veut garder un contrôle total sur son agenda, la validation de chaque demande et le suivi de sa clientèle. Le cahier des charges est précis sur ce point : aucune réservation n'est possible sans que Camille n'ait explicitement ouvert un créneau, et chaque demande passe par une validation manuelle avant tout encaissement d'acompte.

Le projet a fait l'objet d'une continuité dans le travail d'équipe avec d'autres stagiaires, notamment Loïc Delprat et Ylan Dessenne, intervenus sur différentes sessions du projet. Pour structurer les tâches et assurer le suivi de l'avancement, nous avons utilisé un espace Notion muni d'un tableau Kanban mis en place par Ludovic Roux, regroupant l'ensemble des tickets et des fonctionnalités. Les échanges en temps réel, le partage d'écran et la coordination technique entre les membres se faisaient via Discord. Mon environnement de travail personnel s'est articulé autour de VS Code pour le développement, complété par l'outil Postman pour tester rigoureusement les routes de l'API, simuler les requêtes HTTP, valider les codes de retour et gérer l'authentification par token JWT.

Je suis intervenu sur un projet déjà engagé : une API backend en Spring Boot relativement avancée (authentification JWT, gestion des utilisateurs, des services et des créneaux de disponibilité déjà fonctionnelle), et un frontend Next.js encore au stade de gabarit. Avant de produire la moindre ligne de code, j'ai consacré la première partie du stage à un audit complet : cartographie de l'architecture existante (couches controller/service/repository, conventions de nommage, sécurité), comparaison systématique avec le cahier des charges fonctionnel, la stack technique cible et le schéma de base de données cible déjà défini pour le projet, puis recensement précis des écarts (versions de Spring Boot, entités manquantes comme les réservations ou les paiements, dépendances non installées) et des questions à trancher avant d'agir. Plutôt qu'un audit ponctuel, j'ai pris l'habitude de documenter chacune de mes actions tout au long du stage, ticket par ticket : cette documentation technique personnelle m'a servi de fil directeur pour savoir précisément ce que j'avais fait et où j'en étais, et m'a aussi permis de m'approprier le fonctionnement de Spring Boot en l'expliquant avec le code réel du projet, pour m'assurer de bien maîtriser le terrain avant d'y toucher.

Sur cette base, j'ai pris en charge la fonctionnalité de réservation de bout en bout côté backend, découpée en plusieurs tickets successifs. J'ai d'abord modélisé l'entité Booking : au-delà du strict critère d'acceptation, j'ai choisi d'y inclure le créneau réservé (cohérent avec le schéma de base de données) et de représenter le statut par un type énuméré plutôt qu'une simple chaîne de caractères, pour plus de sûreté. J'ai vérifié ce travail en conditions réelles en démarrant l'application et en contrôlant que le schéma SQL généré automatiquement par Hibernate correspondait exactement aux colonnes attendues.

J'ai ensuite construit l'API de gestion des réservations : création, modification et suppression, réservées à l'administratrice. Deux choix de conception ont structuré ce travail : le prix et l'acompte sont copiés depuis la prestation au moment de la création (un instantané tarifaire, pour qu'une modification ultérieure des prix par Camille ne réécrive pas rétroactivement des réservations déjà passées), et la modification fonctionne en mise à jour partielle, un champ non transmis dans la requête reste inchangé, en cohérence avec les conventions déjà en place sur les autres ressources du projet. J'ai testé chaque cas (création, modification, suppression, mais aussi les cas d'erreur : accès sans jeton, prestation inexistante, requête invalide) et documenté les résultats obtenus.

Le ticket suivant a ajouté les routes de lecture, avec une exigence d'autorisation plus fine que sur les autres ressources : l'administratrice doit voir toutes les réservations, mais chaque cliente ne doit voir que les siennes. J'ai réutilisé un motif d'autorisation déjà présent dans le projet (rôle ADMIN ou propriétaire de la ressource) pour rester cohérent avec les conventions établies. En vérifiant ce comportement avec plusieurs comptes de test, j'ai découvert qu'un refus d'accès renvoyait un code 500 au lieu d'un 403 attendu, un problème qui touchait en réalité plusieurs endpoints du projet, pas seulement les réservations. J'ai identifié la cause dans le gestionnaire d'erreurs central de l'application, qui ne traitait pas ce type d'exception de sécurité, et j'ai corrigé le comportement en y ajoutant la prise en charge manquante. La correction s'est révélée efficace sur l'ensemble des endpoints concernés du projet.

En parallèle, côté frontend, j'ai terminé la page d'inscription, dont une première structure (mise en page, dépendances de validation) avait déjà été posée. Il manquait plusieurs éléments pour couvrir l'ensemble des critères attendus : champs prénom et nom distincts plutôt qu'un unique champ nom complet, un véritable appel à l'API d'inscription avec redirection en cas de succès (l'ébauche se contentait d'un simple affichage en console), une validation côté client réellement alignée sur les règles du backend (format de mot de passe, format de téléphone français), et surtout la gestion des erreurs renvoyées par le serveur : conflit d'email ou de téléphone déjà utilisé, erreurs de validation détaillées par champ, erreurs réseau génériques. J'ai vérifié ce contrat de bout en bout, backend démarré, avec le payload exact envoyé par le formulaire. Une fois ces critères couverts, j'ai ajouté plusieurs améliorations d'ergonomie sans dépendance supplémentaire : mise en page plus compacte, bouton d'affichage/masquage du mot de passe, indicatif visuel du pays sur le champ téléphone, et deux cases de consentement RGPD obligatoires (conditions générales et politique de confidentialité), en documentant clairement la limite de cette implémentation : le consentement n'est pour l'instant géré que côté frontend, une vraie conformité nécessiterait de le persister côté backend.

L'ensemble de ce travail suit des conventions de projet que j'ai respectées : une branche Git dédiée par ticket, fusion par pull request vers une branche d'intégration commune. Cette organisation m'a habitué à intervenir sur un code déjà écrit par d'autres, à en comprendre le fonctionnement avant de le modifier, et à documenter mes changements pour qu'ils restent compréhensibles par le reste de l'équipe.`,
      technical: [
        "Java 21 / Spring Boot, architecture en couches (controller → service → interface/service → repository)",
        "Spring Data JPA / Hibernate pour la persistance, relations @ManyToOne et enums typés (@Enumerated)",
        "Spring Security et authentification JWT stateless, filtre d'authentification dédié, autorisation au niveau méthode (@PreAuthorize) avec expressions SpEL",
        "Gestion centralisée des erreurs via plusieurs @RestControllerAdvice coexistants (format de réponse unifié)",
        "Validation déclarative (Bean Validation) avec expressions régulières alignées entre frontend et backend",
        "DTO séparés en objets de requête et de réponse, isolant les entités du contrat d'API",
        "Documentation d'API interactive avec Swagger / SpringDoc OpenAPI",
        "Base H2 en mémoire pour le développement avec seeders de données de test, PostgreSQL prévu en cible",
        "Next.js (App Router), React et TypeScript, formulaires avec react-hook-form et validation Zod",
        "Tailwind CSS et composants shadcn/ui (Radix UI), gestion de paquets via pnpm",
        "Outils de développement et de collaboration : VS Code, Postman, Notion (tableaux Kanban), Discord pour la communication d'équipe",
        "Workflow Git en équipe : une branche par ticket, revue et fusion via pull request vers une branche d'intégration"
      ],
      features: [
        "Collaboration et continuité de projet au sein de l'équipe de stage (avec Loïc Delprat et Ylan Dessenne) via Notion (Kanban) et Discord",
        "Audit technique complet de l'existant, comparaison avec le cahier des charges, la stack cible et le schéma de base de données cible du projet, avec recensement précis des écarts et questions ouvertes",
        "Documentation technique personnelle tenue tout au long du stage, ticket par ticket, servant de fil directeur de l'avancement",
        "Modèle de réservation (Booking) : statut typé, prix et acompte, liée à la cliente, à la prestation et au créneau",
        "API sécurisée de gestion des réservations (création, modification, suppression) testée via Postman et réservée à l'administratrice",
        "Routes de lecture des réservations avec autorisation fine admin/propriétaire",
        "Diagnostic et correction d'un bug de sécurité transversal (codes 500 au lieu de 403 sur les accès refusés) dans le gestionnaire d'erreurs central",
        "Finalisation du formulaire d'inscription sous VS Code : validation, appel serveur, gestion des erreurs",
        "Améliorations d'ergonomie du formulaire : affichage du mot de passe, indicatif téléphonique, consentement RGPD"
      ],
      reality: `Ce stage m'a fait passer d'un rôle d'apprenant sur des projets personnels à celui de contributeur sur un code déjà écrit par d'autres, avec ses conventions, ses choix historiques et ses contraintes. Le ressenti principal est celui d'une bascule : apprendre à lire et respecter le travail des autres avant d'apprendre à écrire le sien, une rigueur différente de celle d'un projet démarré seul de zéro.

La principale difficulté a été la gestion des dépendances entre mes propres tickets non encore fusionnés : la création du modèle de réservation, son API de gestion, puis ses routes de lecture s'enchaînaient sur des branches distinctes pas encore intégrées à la branche commune. Il fallait donc suivre précisément l'avancement de chacune pour ne perdre ni code ni cohérence. Cette contrainte a révélé une vraie force chez moi : documenter et tracer mes choix de conception pour qu'ils restent compréhensibles en dehors de mon poste de travail, mais aussi une marge de progression sur l'anticipation des dépendances entre tâches avant de les découper en tickets.

Ce stage a surtout révélé l'intérêt que je porte aux pratiques d'ingénierie logicielle et, plus spécifiquement, à tout ce qui touche à l'infrastructure et à l'environnement d'exécution. Lors de l'audit initial, ce qui a le plus retenu mon attention n'était pas telle ou telle fonctionnalité, mais des sujets comme l'externalisation des secrets, la séparation des configurations de développement et de production, ou l'absence encore de conteneurisation (Docker, PostgreSQL) pourtant prévue par le cahier des charges. Ces questions de configuration, de déploiement et de fiabilité de l'environnement m'intéressent aujourd'hui davantage que l'ajout de nouvelles fonctionnalités, et orientent mon projet professionnel vers le DevOps et l'administration système.`
    },
    en: {
      title: "L'Atelier de Camille",
      description: "Full-stack development internship at Loud: technical audit of the existing codebase, booking domain modeling and secured API, a security bug fix, and a finished sign-up flow for an online booking platform built for a nail technician.",
      journey: `This internship took place at Loud, the company of my internship supervisor, Ludovic Roux, based in Toulouse, France, founded in 2025 right after he finished his studies, in the custom software development industry. His main activity is development work for a proprietary trading firm, his primary client, but he also takes on more punctual projects for other organisations, such as a town hall for canteen management or this one, L'Atelier de Camille, alongside teaching work in higher education. In the custom-development market, where software agencies, standardized SaaS products and independents all coexist, Loud focuses on the specific needs of small businesses, independents and local authorities, mostly within a local client base.

L'Atelier de Camille is exactly that kind of engagement: an online booking platform for an independent nail technician, in the beauty and personal care sector, undergoing rapid digitalisation. Clients now expect to book from their phone, while the professional wants full control over her schedule, the approval of every request, and how her client base is tracked. The specification is explicit on this: no booking is possible until Camille has explicitly opened a time slot, and every request goes through manual approval before any deposit is charged.

The project benefited from team continuity across different internship periods with other interns, notably Loïc Delprat and Ylan Dessenne. To structure tasks and track progress, we used a Notion workspace featuring a Kanban board set up by Ludovic Roux, grouping all tickets and features to be developed. Real-time communication, screen sharing, and technical coordination among team members took place via Discord. My personal working environment relied on VS Code for development, combined with Postman to thoroughly test API routes, simulate HTTP requests, validate response codes, and handle JWT authentication tokens.

I joined a project already in motion: a fairly advanced Spring Boot backend (JWT authentication, user, service and availability-slot management already working), and a Next.js frontend still at the template stage. Before writing a single line of code, I spent the first part of the internship on a full audit: mapping the existing architecture (controller/service/repository layers, naming conventions, security setup), systematically comparing it against the functional specification, the target tech stack, and the target database schema already defined for the project, then precisely listing the gaps (Spring Boot version, missing entities like bookings or payments, dependencies not yet installed) and the open questions to settle before acting. Rather than a one-off audit, I made a habit of documenting each of my actions throughout the internship, ticket by ticket: this personal technical documentation became my guiding thread, letting me know exactly what I had done and where I stood, and it also helped me internalise how Spring Boot works by explaining it through the project's own code, to make sure I fully understood the ground before touching it.

Building on that, I owned the booking feature end to end on the backend, split across several successive tickets. I first modeled the Booking entity: beyond the strict acceptance criteria, I chose to include the booked time slot (consistent with the database schema) and to represent the status as an enum type rather than a plain string, for extra type safety. I verified this in a real run by starting the application and checking that the SQL schema Hibernate auto-generated matched the expected columns exactly.

I then built the booking management API: create, update and delete, restricted to the admin. Two design decisions shaped this work: price and deposit are copied from the service at creation time (a pricing snapshot, so a later price change by Camille never rewrites past bookings), and updates are partial, any field left out of the request stays unchanged, consistent with conventions already used elsewhere in the project. I tested every case (create, update, delete, plus error cases: no token, non-existent service, invalid request) and documented the results.

The next ticket added read routes, with a stricter authorization requirement than other resources: the admin must see every booking, while each client should only see her own. I reused an authorization pattern already present in the project (admin role or resource owner) to stay consistent with established conventions. While testing this with several test accounts, I found that denied access was returning a 500 instead of the expected 403, an issue that actually affected several endpoints across the project, not just bookings. I traced the cause to the application's central error handler, which wasn't handling this type of security exception, and fixed the behaviour by adding the missing handling there. The fix turned out to resolve the issue across every affected endpoint in the project.

In parallel, on the frontend, I finished the sign-up page, which already had an initial structure (layout, validation dependencies) in place. Several things were still needed to cover all the required criteria: separate first-name and last-name fields instead of a single full-name field, an actual call to the registration API with a redirect on success (the draft only logged to the console), client-side validation genuinely aligned with the backend's rules (password format, French phone format), and above all, handling the errors returned by the server: email or phone already in use, detailed field-level validation errors, generic network errors. I verified this contract end to end, backend running, using the exact payload sent by the form. Once those criteria were covered, I added several usability improvements with no extra dependency: a more compact layout, a show/hide password toggle, a visual country indicator on the phone field, and two mandatory GDPR consent checkboxes (terms and privacy policy), while clearly documenting the limit of that implementation: consent is currently handled on the frontend only, and full compliance would require persisting it on the backend too.

All of this work follows project conventions I respected: a dedicated Git branch per ticket, merged via pull request into a shared integration branch. That organisation got me used to working on code already written by others, understanding how it worked before changing it, and documenting my changes so they stayed understandable to the rest of the team.`,
      technical: [
        "Java 21 / Spring Boot, layered architecture (controller → service interface/implementation → repository)",
        "Spring Data JPA / Hibernate for persistence, @ManyToOne relations and typed enums (@Enumerated)",
        "Spring Security with stateless JWT authentication, a dedicated auth filter, method-level authorization (@PreAuthorize) with SpEL expressions",
        "Centralised error handling via multiple coexisting @RestControllerAdvice handlers (unified response format)",
        "Declarative validation (Bean Validation) with regex rules kept consistent between frontend and backend",
        "DTOs split into request and response objects, isolating entities from the API contract",
        "Interactive API documentation with Swagger / SpringDoc OpenAPI",
        "In-memory H2 database for development with seeded test data, PostgreSQL planned for production",
        "Next.js (App Router), React and TypeScript, forms with react-hook-form and Zod validation",
        "Development & collaboration tools: VS Code, Postman, Notion (Kanban boards), Discord for team communication",
        "Team Git workflow: one branch per ticket, reviewed and merged via pull request into an integration branch"
      ],
      features: [
        "Team collaboration and project continuity across internship periods (with Loïc Delprat and Ylan Dessenne) using Notion (Kanban) and Discord",
        "Full technical audit of the existing codebase, compared against the specification, the target stack and the project's target database schema, with a precise list of gaps and open questions",
        "Personal technical documentation kept throughout the internship, ticket by ticket, serving as a guiding thread for progress",
        "Booking domain model: typed status, price and deposit, linked to the client, the service and the time slot",
        "Secured booking management API (create, update, delete) tested via Postman and restricted to the admin",
        "Booking read routes with fine-grained admin-or-owner authorization",
        "Diagnosed and fixed a cross-cutting security bug (500s instead of 403s on denied access) in the central error handler",
        "Completed the sign-up form in VS Code: validation, server call, and error handling",
        "Usability improvements to the form: password toggle, phone prefix, GDPR consent"
      ],
      reality: `This internship moved me from a learner's role on personal projects to a contributor's role on code already written by others, with its own conventions, historical choices and constraints. The main feeling was a shift: learning to read and respect other people's work before learning to write my own, a different kind of rigour than working alone from a blank slate.

The main difficulty was managing dependencies between my own unmerged tickets: building the booking model, then its management API, then its read routes, each following on a separate branch not yet integrated into the shared branch. That meant tracking each one's progress closely to avoid losing code or breaking consistency. This constraint revealed a real strength of mine: documenting and tracing my design decisions so they stay understandable outside my own head, but also room to grow in anticipating task dependencies before splitting work into tickets.

More than anything, this internship revealed how much I care about software engineering practices, and specifically about infrastructure and runtime environments. During the initial audit, what caught my attention most wasn't any particular feature, but issues like externalising secrets, separating development and production configuration, or the lack of containerisation (Docker, PostgreSQL) that the specification still called for. These questions of configuration, deployment and environment reliability interest me today more than adding new features, and are steering my career plans toward DevOps and system administration.`
    },
    ko: {
      title: "아틀리에 드 카미유",
      description: "Loud에서 진행한 풀스택 개발 인턴십: 기존 코드베이스에 대한 기술 감사, 예약 도메인 모델링 및 보안 API, 보안 버그 수정, 그리고 네일 아티스트를 위한 온라인 예약 플랫폼의 완성된 회원가입 플로우.",
      journey: `이번 인턴십은 제 실습 지도자인 Ludovic Roux의 회사, 프랑스 툴루즈에 기반을 둔 Loud에서 진행되었으며, 그가 학업을 마친 직후인 2025년에 설립한 맞춤형 소프트웨어 개발 업계의 회사입니다. 그의 주요 활동은 자기자본 트레이딩 회사를 위한 개발 업무이며 이곳이 주요 고객이지만, 시청의 급식 관리 시스템이나 이번 프로젝트인 L'Atelier de Camille처럼 다른 조직을 위한 더 단발적인 프로젝트도 병행하고, 고등교육 강의 활동도 함께 하고 있습니다. 대기업을 상대하는 SI 기업 및 에이전시, 표준화된 SaaS 제품, 그리고 프리랜서가 공존하는 맞춤형 개발 시장에서, Loud는 주로 지역 고객을 대상으로 중소기업, 프리랜서, 지자체의 구체적인 요구에 집중합니다.

L'Atelier de Camille는 정확히 그런 유형의 프로젝트입니다: 독립 네일 아티스트를 위한 온라인 예약 플랫폼으로, 뷰티·케어 산업이 빠르게 디지털화되는 흐름 속에 있습니다. 고객은 이제 휴대폰으로 예약하길 기대하고, 전문가는 자신의 일정, 모든 요청의 승인 여부, 고객 관리 방식을 완전히 통제하고 싶어 합니다. 명세서는 이 점을 명확히 하고 있습니다: Camille이 명시적으로 시간대를 열어두지 않으면 예약이 불가능하고, 모든 요청은 보증금이 청구되기 전에 수동 승인을 거쳐야 합니다.

이 프로젝트는 Loïc Delprat, Ylan Dessenne 등 다른 실습생들과 함께 여러 세션에 걸쳐 연속성 있게 진행되었습니다. 업무를 체계화하고 진행 상황을 추적하기 위해, 우리는 Ludovic Roux가 설정한 Notion 워크스페이스와 Kanban 보드를 사용하여 티켓과 기능을 관리했습니다. 팀원 간의 실시간 소통, 화면 공유, 기술적 조율은 Discord를 통해 이루어졌습니다. 저의 개인적인 작업 환경은 개발을 위한 VS Code를 중심으로 구성되었으며, Postman을 활용하여 API 라우트를 엄격하게 테스트하고, HTTP 요청을 시뮬레이션하고, 응답 코드를 검증하며 JWT 인증 토큰을 관리했습니다.

저는 이미 진행 중인 프로젝트에 합류했습니다: 상당히 발전된 Spring Boot 백엔드(JWT 인증, 사용자·서비스·예약 가능 시간대 관리가 이미 작동)와, 아직 템플릿 단계인 Next.js 프론트엔드였습니다. 코드를 한 줄도 쓰기 전에, 저는 인턴십 초반을 전체 감사에 할애했습니다: 기존 아키텍처 정리(controller/service/repository 계층, 명명 규칙, 보안 설정), 기능 명세서·목표 기술 스택·프로젝트에 이미 정의되어 있던 목표 데이터베이스 스키마와의 체계적 비교, 그리고 행동하기 전에 해결해야 할 격차(Spring Boot 버전, 예약이나 결제 같은 누락된 엔티티, 아직 설치되지 않은 의존성)와 질문의 정확한 목록화였습니다. 일회성 감사에 그치지 않고, 저는 인턴십 내내 티켓 단위로 제 모든 행동을 문서화하는 습관을 들였습니다: 이 개인적인 기술 문서는 제가 정확히 무엇을 했고 어디에 있는지 알 수 있게 해주는 길잡이가 되었으며, 프로젝트의 실제 코드로 Spring Boot의 작동 방식을 설명함으로써 이를 체득하는 데도 도움이 되었습니다. 이는 손대기 전에 기반을 완전히 이해했는지 확인하기 위함이었습니다.

이를 바탕으로 저는 백엔드에서 예약 기능을 처음부터 끝까지 담당했으며, 여러 개의 연속된 티켓으로 나누어 진행했습니다. 먼저 Booking 엔티티를 모델링했습니다: 엄격한 승인 기준을 넘어, 저는 예약된 시간대를 포함하기로 결정했고(데이터베이스 스키마와 일치), 상태를 단순 문자열이 아닌 열거형 타입으로 표현하여 타입 안전성을 높였습니다. 애플리케이션을 실제로 실행하고 Hibernate가 자동 생성한 SQL 스키마가 예상 컬럼과 정확히 일치하는지 확인하여 이를 검증했습니다.

이후 저는 예약 관리 API를 구축했습니다: 관리자에게만 허용되는 생성, 수정, 삭제입니다. 두 가지 설계 결정이 이 작업의 방향을 결정했습니다: 가격과 보증금은 생성 시점에 서비스로부터 복사됩니다(가격 스냅샷 방식으로, Camille이 이후 가격을 변경해도 과거 예약을 다시 쓰지 않도록 함), 그리고 수정은 부분 업데이트 방식입니다. 요청에서 제외된 필드는 변경되지 않으며, 이는 프로젝트 다른 곳에서 이미 사용되던 규칙과 일치합니다. 저는 모든 경우(생성, 수정, 삭제, 그리고 토큰 없음·존재하지 않는 서비스·잘못된 요청 같은 오류 상황)를 테스트하고 결과를 문서화했습니다.

다음 티켓은 조회 라우트를 추가했으며, 다른 리소스보다 더 엄격한 권한 요구사항이 있었습니다: 관리자는 모든 예약을 봐야 하고, 각 고객은 자신의 예약만 봐야 합니다. 저는 확립된 규칙과 일관성을 유지하기 위해 프로젝트에 이미 존재하던 권한 부여 패턴(관리자 역할 또는 리소스 소유자)을 재사용했습니다. 여러 테스트 계정으로 이를 테스트하는 과정에서, 접근 거부 시 예상된 403 대신 500이 반환되는 것을 발견했습니다. 이는 실제로 예약뿐 아니라 프로젝트 전체의 여러 엔드포인트에 영향을 미치는 문제였습니다. 이 문제의 원인이 된 중앙 오류 처리기를 진단하고 누락된 처리를 추가하여 영향을 받은 모든 엔드포인트에서 문제를 해결했습니다.

이와 병행하여 프론트엔드에서는 이미 초기 구조(레이아웃, 검증 의존성)가 마련되어 있던 회원가입 페이지를 완성했습니다. 요구되는 모든 기준을 충족하기 위해 여러 가지가 더 필요했습니다: 하나의 전체 이름 필드 대신 분리된 이름·성 필드, 성공 시 리다이렉트가 있는 실제 회원가입 API 호출(초안은 콘솔 로그만 남겼음), 백엔드 규칙(비밀번호 형식, 프랑스 전화번호 형식)과 실제로 일치하는 클라이언트 측 검증, 그리고 무엇보다 서버가 반환하는 오류 처리: 이미 사용 중인 이메일이나 전화번호, 필드별 상세 검증 오류, 일반 네트워크 오류였습니다. 저는 백엔드를 실행한 상태에서 폼이 보내는 정확한 페이로드로 이 계약을 처음부터 끝까지 검증했습니다. 이러한 기준을 충족한 후, 추가 의존성 없이 여러 사용성 개선을 더했습니다: 더 간결한 레이아웃, 비밀번호 표시/숨김 토글, 전화번호 필드의 시각적 국가 표시, 그리고 필수 GDPR 동의 체크박스 두 개(약관 및 개인정보 처리방침)였으며, 이 구현의 한계를 명확히 문서화했습니다: 동의는 현재 프론트엔드에서만 처리되며, 완전한 준수를 위해서는 백엔드에도 이를 저장해야 합니다.

이 모든 작업은 제가 지켜야 했던 프로젝트 규칙을 따릅니다: 티켓당 전용 Git 브랜치, 공유 통합 브랜치로의 풀 리퀘스트 병합. 이 조직력 덕분에 다른 사람이 이미 작성한 코드를 다루고, 수정하기 전에 작동 방식을 이해하며, 팀의 나머지 사람들이 이해할 수 있도록 변경 사항을 문서화하는 법을 익힐 수 있었습니다.`,
      technical: [
        "Java 21 / Spring Boot, 계층형 아키텍처 (controller → service 인터페이스/구현 → repository)",
        "영속성을 위한 Spring Data JPA / Hibernate, @ManyToOne 관계 및 타입이 지정된 열거형(@Enumerated)",
        "무상태 JWT 인증, 전용 인증 필터, SpEL 표현식을 사용한 메서드 수준 권한 부여(@PreAuthorize)를 갖춘 Spring Security",
        "여러 개의 @RestControllerAdvice 핸들러가 공존하는 중앙 집중식 오류 처리(통일된 응답 형식)",
        "프론트엔드와 백엔드 간 일관되게 유지되는 정규식 규칙을 사용한 선언적 검증(Bean Validation)",
        "요청과 응답 객체로 분리된 DTO, 엔티티를 API 계약과 분리",
        "Swagger / SpringDoc OpenAPI를 사용한 대화형 API 문서화",
        "테스트 데이터가 시드된 개발용 인메모리 H2 데이터베이스, 운영 환경용 PostgreSQL 예정",
        "Next.js(App Router), React, TypeScript, react-hook-form과 Zod 검증을 사용한 폼",
        "개발 및 협업 도구: VS Code, Postman, Notion(Kanban 보드), 팀 소통을 위한 Discord",
        "팀 Git 워크플로우: 티켓당 하나의 브랜치, 통합 브랜치로의 풀 리퀘스트를 통한 리뷰 및 병합"
      ],
      features: [
        "실습 팀원(Loïc Delprat 및 Ylan Dessenne)과 Notion(Kanban) 및 Discord를 활용한 업무 연속성 및 소통 유지",
        "기존 코드베이스에 대한 전체 기술 감사, 명세서·목표 스택·프로젝트의 목표 데이터베이스 스키마와의 비교, 격차와 미해결 질문의 정확한 목록화",
        "인턴십 내내 티켓 단위로 작성한 개인 기술 문서, 진행 상황의 길잡이 역할",
        "예약 도메인 모델: 타입이 지정된 상태, 가격과 보증금, 고객·서비스·시간대와의 연결",
        "Postman을 통해 테스트된, 관리자로 제한된 보안 예약 관리 API(생성, 수정, 삭제)",
        "프로젝트에 이미 존재하던 패턴을 재사용한, 세밀한 관리자/소유자 권한 부여가 적용된 예약 조회 라우트",
        "중앙 오류 처리기에서 범용적인 보안 버그(접근 거부 시 403 대신 500) 진단 및 수정",
        "VS Code에서 회원가입 폼 완성: 검증, 서버 호출, 오류 처리",
        "폼의 사용성 개선: 비밀번호 토글, 전화번호 국가 접두사, GDPR 동의"
      ],
      reality: `이 인턴십을 통해 저는 개인 프로젝트에서 배우는 역할에서, 이미 다른 사람이 작성한 코드, 나름의 규칙, 역사적 선택, 제약을 가진 코드에 기여하는 역할로 옮겨갔습니다. 가장 큰 느낌은 일종의 전환이었습니다: 스스로 코드를 쓰기 전에, 다른 사람의 작업을 읽고 존중하는 법을 먼저 배우는 것, 혼자 백지에서 시작하는 것과는 다른 종류의 엄격함이었습니다.

가장 큰 어려움은 아직 병합되지 않은 제 자신의 티켓들 간의 의존성을 관리하는 것이었습니다: 예약 모델 구축, 그 관리 API, 그리고 조회 라우트가 각각 공유 브랜치에 아직 통합되지 않은 별도의 브랜치에서 이어졌습니다. 그래서 코드나 일관성을 잃지 않으려면 각각의 진행 상황을 정확히 추적해야 했습니다. 이 제약은 저의 진짜 강점을 드러냈습니다: 제 설계 결정을 문서화하고 추적하여 제 자리를 벗어나서도 이해할 수 있게 만드는 것입니다. 하지만 작업을 티켓으로 나누기 전에 작업 간 의존성을 미리 예측하는 부분에서는 성장의 여지도 보여주었습니다.

무엇보다 이 인턴십은 소프트웨어 엔지니어링 관행, 특히 인프라와 실행 환경에 대한 제 관심을 드러내 주었습니다. 초기 감사 과정에서 저의 관심을 가장 많이 끈 것은 특정 기능이 아니라, 비밀 정보의 외부화, 개발/운영 환경 설정 분리, 명세서에서 여전히 요구하고 있는 컨테이너화(Docker, PostgreSQL)의 부재 같은 주제들이었습니다. 설정, 배포, 환경 안정성에 관한 이러한 질문들이 새로운 기능을 추가하는 것보다 지금 저에게 더 흥미롭게 다가오며, 제 진로를 DevOps와 시스템 관리 쪽으로 이끌고 있습니다.`
    }
  }
};

export function getProjectTranslation(slug: string, language: Language): ProjectContent | null {
  return projectTranslations[slug]?.[language] || null;
}