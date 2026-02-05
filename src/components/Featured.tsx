"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { getTagColor } from '@/src/lib/tagColors';
import { useLanguage } from '@/src/contexts/LanguageContext';

// Composant pour gérer les images avec placeholder
function FeaturedImage({ src, slug }: { src: string | undefined | null; slug: string }) {
  const { t } = useLanguage();
  const [hasError, setHasError] = useState(false);

  const containerStyle = useMemo(() => ({ 
    backgroundColor: 'var(--color-surface0)',
    transition: 'transform 0.3s ease',
    viewTransitionName: `project-img-${slug}`
  } as React.CSSProperties), [slug]);

  return (
    <div 
      className="relative aspect-2/1 w-full overflow-hidden"
      style={containerStyle}
    >
      {src && !hasError ? (
        <Image 
          src={src}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setHasError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <div style={{ fontSize: '2.5rem', color: 'var(--color-overlay0)' }}>📁</div>
          <span className="text-xs" style={{ color: 'var(--color-subtext0)' }}>
            {t('featured.no_image')}
          </span>
        </div>
      )}
    </div>
  );
}

export interface ProjectMetadata {
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  tags?: string[];
}

export interface FeaturedProject {
  slug: string;
  metadata: ProjectMetadata;
}

interface FeaturedProps {
  projects: FeaturedProject[];
  maxProjects: number;
}

export default function Featured({ projects, maxProjects }: FeaturedProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const displayProjects = maxProjects ? projects.slice(0, maxProjects) : projects;

  useEffect(() => {
    // Simuler le chargement des projets
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="px-4 py-8 md:px-0">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="flex items-center gap-3 text-2xl font-semibold md:text-3xl" style={{ color: 'var(--color-text)' }}>
            <Star size={28} style={{ color: 'var(--color-accent)' }} />
            <span>{t('featured.title')}</span>
          </h2>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {[1, 2].map(i => (
            <div 
              key={i}
              className="rounded-lg overflow-hidden animate-pulse"
              style={{
                backgroundColor: 'var(--color-surface0)',
                border: '1px solid var(--color-surface1)'
              }}
            >
              <div className="aspect-video w-full" style={{ backgroundColor: 'var(--color-surface1)' }} />
              <div className="p-5 space-y-3">
                <div className="h-6 rounded" style={{ backgroundColor: 'var(--color-surface1)', width: '60%' }} />
                <div className="h-4 rounded" style={{ backgroundColor: 'var(--color-surface1)', width: '100%' }} />
                <div className="h-4 rounded" style={{ backgroundColor: 'var(--color-surface1)', width: '80%' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (displayProjects.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-8 md:px-0" aria-labelledby="featured-projects-title">
      <div className="mb-8 flex items-center justify-between">
        <h2 id="featured-projects-title" className="flex items-center gap-3 text-2xl font-semibold md:text-3xl" style={{ color: 'var(--color-text)' }}>
          <Star size={28} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
          <span>{t('featured.title')}</span>
        </h2>
        <a
          href="/projects"
          className="link hidden sm:inline-flex items-center gap-1 text-sm"
        >
          {t('featured.view_all')}
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2"
            style={{
              borderColor: 'var(--color-surface0)',
              backgroundColor: 'var(--color-mantle)'
            }}
            aria-label={`${project.metadata.title} - ${project.metadata.description}`}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-surface0)';
            }}
          >
            <FeaturedImage
              src={project.metadata.image?.url}
              slug={project.slug}
            />

            <div className="space-y-3 p-5">
              <h3
                className="text-xl font-semibold transition-colors group-hover:text-accent"
                style={{ 
                  color: 'var(--color-text)',
                  viewTransitionName: `project-title-${project.slug}`
                } as React.CSSProperties}
              >
                {project.metadata.title}
              </h3>
              <p className="line-clamp-2 text-sm" style={{ color: 'var(--color-subtext0)' }}>
                {project.metadata.description}
              </p>

              {project.metadata.tags && project.metadata.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {project.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ 
                        backgroundColor: 'var(--color-surface0)', 
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-surface2)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <a
          href="/projects"
          className="link inline-flex items-center gap-1 text-sm"
        >
          {t('featured.view_all')}
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
