"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { getTagColor } from '@/src/lib/tagColors';
import { useLanguage } from '@/src/contexts/LanguageContext';

// Composant pour gérer les images avec placeholder
function FeaturedImage({ src, alt, slug }: { src: string | undefined | null; alt: string; slug: string }) {
  const { t } = useLanguage();
  const [hasError, setHasError] = useState(false);

  const containerStyle = useMemo(() => ({ 
    backgroundColor: 'var(--color-surface0)',
    transition: 'transform 0.3s ease',
    viewTransitionName: `project-img-${slug}`
  } as React.CSSProperties), [slug]);

  return (
    <div 
      className="relative h-48 overflow-hidden flex items-center justify-center"
      style={containerStyle}
    >
      {src && !hasError ? (
        <Image 
          src={src}
          alt={alt}
          fill
          className="object-cover"
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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {[1, 2].map(i => (
            <div 
              key={i}
              className="rounded-lg overflow-hidden animate-pulse"
              style={{
                backgroundColor: 'var(--color-surface0)',
                border: '1px solid var(--color-surface1)'
              }}
            >
              <div className="h-48" style={{ backgroundColor: 'var(--color-surface1)' }} />
              <div className="p-6 space-y-3">
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
    <section className="px-4 py-8 md:px-0">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-semibold md:text-3xl" style={{ color: 'var(--color-text)' }}>
          <Star size={28} style={{ color: 'var(--color-accent)' }} />
          <span>{t('featured.title')}</span>
        </h2>
        <Link
          href="/projects"
          className="group hidden items-center gap-1 text-sm sm:inline-flex"
          style={{ color: 'color-mix(in srgb, var(--color-accent) 90%, transparent)' }}
        >
          <span>{t('featured.view_all')}</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none"
            style={{
              borderColor: 'var(--color-surface0)',
              backgroundColor: 'var(--color-mantle)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-surface0)';
            }}
          >
            <FeaturedImage
              src={project.metadata.image?.url}
              alt={project.metadata.image?.alt || project.metadata.title}
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
                  {project.metadata.tags.map((tag) => {
                    const tagColor = getTagColor(tag, project.slug);
                    const style = tagColor.type === 'hex' 
                      ? { backgroundColor: 'var(--color-surface0)', color: tagColor.color }
                      : { backgroundColor: 'var(--color-surface0)', color: `var(--color-${tagColor.color})` };
                    
                    return (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={style}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1 text-sm hover:underline"
          style={{ color: 'var(--color-accent)' }}
        >
          <span>{t('featured.view_all')}</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
