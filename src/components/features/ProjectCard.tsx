import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/src/types';
import { getTagColor } from '@/src/lib/tagColors';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { getProjectTranslation } from '@/src/data/projectTranslations';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();

  // Get translated content
  const translatedContent = useMemo(() => 
    getProjectTranslation(project.slug, language),
    [project.slug, language]
  );

  const title = translatedContent?.title || project.title;
  const description = translatedContent?.description || project.description;

  const imageContainerStyle = useMemo(() => ({ 
    backgroundColor: 'var(--color-surface0)',
    transition: 'transform 0.3s ease',
    viewTransitionName: `project-img-${project.slug}`
  } as React.CSSProperties), [project.slug]);

  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group block"
    >
      <article 
        className="flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-200"
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
        {/* Image */}
        <div 
          className="relative h-48 overflow-hidden flex items-center justify-center"
          style={imageContainerStyle}
        >
          {project.image ? (
            <Image 
              src={project.image}
              alt={title}
              fill
              loading="lazy"
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="flex flex-col items-center justify-center gap-2"><div style="font-size: 2.5rem; color: var(--color-overlay0)">📁</div><span class="text-xs" style="color: var(--color-subtext0)">Image non trouvée</span></div>';
                }
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div style={{ fontSize: '2.5rem', color: 'var(--color-overlay0)' }}>📁</div>
              <span className="text-xs" style={{ color: 'var(--color-subtext0)' }}>
                Pas d&apos;image
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 
            className="mb-2 text-xl font-semibold"
            style={{ 
              color: 'var(--color-text)',
              viewTransitionName: `project-title-${project.slug}`
            } as React.CSSProperties}
          >
            {title}
          </h3>

          <p 
            className="mb-4 flex-1 text-sm"
            style={{ color: 'var(--color-subtext0)' }}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag) => {
              const tagColor = getTagColor(tag, project.slug);
              const style = tagColor.type === 'hex' 
                ? { backgroundColor: 'var(--color-surface0)', color: tagColor.color }
                : { backgroundColor: 'var(--color-surface0)', color: `var(--color-${tagColor.color})` };
              
              return (
                <span
                  key={tag}
                  className="rounded px-2 py-1 text-xs font-semibold"
                  style={style}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-subtext1)' }}>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {project.date}
            </span>
            <div className="flex gap-2">
              {project.github && (
                <Github size={14} />
              )}
              {project.demo && (
                <ExternalLink size={14} />
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
