import { useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Featured from "@/src/components/Featured";
import Experience from "@/src/components/Experience";
import AnimatedSection from "@/src/components/AnimatedSection";
import HeadMeta from "@/src/components/HeadMeta";
import { featuredProjects } from "@/src/data/projects";
import { experienceTimeline } from "@/src/data/experience";
import { FeaturedProject } from "@/src/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { getProjectTranslation } from "@/src/data/projectTranslations";

// Dynamic imports pour les composants lourds
const LocationMap = dynamic(() => import("@/src/components/LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64" style={{ backgroundColor: 'var(--color-surface0)' }}>
      <span style={{ color: 'var(--color-subtext0)' }}>Chargement de la carte...</span>
    </div>
  )
});

const Game2048 = dynamic(() => import("@/src/components/Game2048"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64" style={{ backgroundColor: 'var(--color-surface0)' }}>
      <span style={{ color: 'var(--color-subtext0)' }}>Chargement du jeu...</span>
    </div>
  )
});

export default function Home() {
  const { t, language } = useLanguage();
  
  // Convertir les projets au format attendu par Featured avec traductions
  const formattedProjects: FeaturedProject[] = useMemo(() => 
    featuredProjects.map(project => {
      const translatedContent = getProjectTranslation(project.slug, language);
      
      return {
        slug: project.slug,
        metadata: {
          title: translatedContent?.title || project.title,
          description: translatedContent?.description || project.description,
          image: project.image ? {
            url: project.image,
            alt: translatedContent?.title || project.title
          } : undefined,
          tags: project.tags
        }
      };
    }), [language]
  );
  
  return (
    <>
      <HeadMeta
        title="Nathan FERRE"
        description="Portfolio personnel - Étudiant en Informatique"
        path="/"
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 md:space-y-16 md:px-4 md:py-12">
      {/* Section 1: Hero / Introduction */}
      <AnimatedSection animation="fade-in">
        <section className="space-y-5">
          <h1 className="text-3xl font-bold md:text-4xl" style={{ color: 'var(--color-text)' }}>
            {t('home.greeting')}{" "}
            <span style={{ color: 'var(--color-accent)' }}>
              Nathan FERRE
            </span>
          </h1>
          <p className="max-w-prose text-lg leading-relaxed" style={{ color: 'var(--color-subtext0)' }}>
            {t('home.intro')} <strong>{t('home.student_it')}</strong> {t('home.at')}{' '}
            <a
              className="link"
              target="_blank"
              rel="noopener"
              href="https://www.ynov.com"
            >
              Ynov Toulouse Campus
            </a>
            . {t('home.passionate')}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
            <a
              href="https://github.com/zoom26042604"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors rounded"
              style={{ color: 'var(--color-subtext1)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            >
              <Github size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <span className="text-xs" style={{ color: 'var(--color-text)' }} aria-hidden="true">|</span>
            <a
              href="https://www.linkedin.com/in/nathan-ferre-0ba3a438a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors rounded"
              style={{ color: 'var(--color-subtext1)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            >
              <Linkedin size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <span className="text-xs" style={{ color: 'var(--color-text)' }} aria-hidden="true">|</span>
            <a
              href="mailto:nathanferre06@gmail.com"
              className="inline-flex items-center gap-2 text-sm transition-colors rounded"
              style={{ color: 'var(--color-subtext1)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            >
              <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>nathanferre06@gmail.com</span>
            </a>
            <span className="text-xs" style={{ color: 'var(--color-text)' }} aria-hidden="true">|</span>
            <a
              href="about"
              className="group inline-flex items-center gap-1 text-sm transition-colors rounded"
              style={{ color: 'var(--color-subtext1)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            >
              <span>{t('home.about_me')}</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </section>
      </AnimatedSection>

      {/* Section: Minimal Experience Row */}
      <AnimatedSection animation="fade-up" delay={100}>
        <Experience timeline={experienceTimeline} />
      </AnimatedSection>

      {/* Section 2: Featured Projects */}
      <AnimatedSection animation="fade-up" delay={200}>
        <Featured projects={formattedProjects} maxProjects={2} />
      </AnimatedSection>

      {/* Section: Bento Grid Container */}
      <AnimatedSection animation="fade-up" delay={300}>
        <section className="px-4 md:px-0">
          <h2 className="sr-only">Dashboard / Highlights</h2>
          <div className="grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:gap-6">
            {/* Box 1: Location Map */}
            <LocationMap />

            {/* Box 2: 2048 Game */}
            <Game2048 />
          </div>
        </section>
      </AnimatedSection>
      </div>
    </>
  );
}
