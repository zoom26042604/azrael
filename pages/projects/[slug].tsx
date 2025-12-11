import { useRouter } from 'next/router';
import { useState } from 'react';
import { Github, ExternalLink, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { getTagColor } from '@/src/lib/tagColors';
import { projects } from '@/src/data/projects';
import Link from 'next/link';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { getProjectTranslation } from '@/src/data/projectTranslations';

export default function ProjectPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t, language } = useLanguage();
  const [imageError, setImageError] = useState(false);

  if (!slug || typeof slug !== 'string') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p style={{ color: 'var(--color-subtext0)' }}>{t('projects.loading')}</p>
      </div>
    );
  }

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          {t('projects.not_found')}
        </h1>
        <Link href="/projects" className="link">
          ← {t('projects.back')}
        </Link>
      </div>
    );
  }

  // Get translated content
  const translatedContent = getProjectTranslation(slug, language);

  const title = translatedContent?.title || project.title;
  const description = translatedContent?.description || project.description;
  const journey = translatedContent?.journey;
  const technical = translatedContent?.technical || [];
  const features = translatedContent?.features || [];
  const reality = translatedContent?.reality;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link 
        href="/projects" 
        className="link inline-flex items-center gap-2 mb-8"
      >
        <ArrowLeft size={16} />
        {t('projects.back')}
      </Link>

      <article className="space-y-8">
        {/* Banner Image */}
        <div 
          className="relative aspect-video w-full overflow-hidden rounded-lg md:rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-surface0) 0%, var(--color-surface1) 50%, var(--color-surface0) 100%)',
            border: '1px solid var(--color-surface2)',
            viewTransitionName: `project-img-${slug}`
          } as React.CSSProperties}
        >
          {project.image && !imageError ? (
            <Image 
              src={project.image}
              alt={title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          ) : (
            <div style={{ fontSize: '4rem', color: 'var(--color-overlay0)', fontWeight: 300 }}>
              📁
            </div>
          )}
        </div>

        {/* Header */}
        <header className="space-y-4">
          <h1 
            className="text-3xl font-bold md:text-4xl" 
            style={{ 
              color: 'var(--color-text)',
              viewTransitionName: `project-title-${slug}`
            } as React.CSSProperties}
          >
            {title}
          </h1>
          
          {/* Date and Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: 'var(--color-subtext0)' }}>
            {project.date && (
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <time>{new Date(project.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</time>
              </div>
            )}
            
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext0)'}
              >
                <Github size={16} />
              </a>
            )}
            
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext0)'}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex items-center gap-x-2">
              <Tag size={18} style={{ color: 'var(--color-subtext0)' }} />
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => {
                  const tagColor = getTagColor(tag, slug);
                  const style = tagColor.type === 'hex' 
                    ? { backgroundColor: 'var(--color-surface0)', color: tagColor.color }
                    : { backgroundColor: 'var(--color-surface0)', color: `var(--color-${tagColor.color})` };
                  
                  return (
                    <span key={tag} className="rounded px-2 py-1 text-xs font-semibold" style={style}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        <hr style={{ borderColor: 'var(--color-surface1)' }} />

        {/* Content */}
        <div className="space-y-8">
          {journey && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                {t('projects.the_project')}
              </h2>
              {journey.split('\n\n').map((p: string, i: number) => (
                <p key={i} style={{ color: 'var(--color-subtext0)' }}>{p}</p>
              ))}
            </section>
          )}

          {technical && technical.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                {t('projects.tech_stack')}
              </h2>
              <ul className="space-y-2">
                {technical.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2" style={{ color: 'var(--color-subtext0)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {features && features.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                {t('projects.features')}
              </h2>
              <ul className="space-y-2">
                {features.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2" style={{ color: 'var(--color-subtext0)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {reality && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                {t('projects.conclusion')}
              </h2>
              {reality.split('\n\n').map((p: string, i: number) => (
                <p key={i} style={{ color: 'var(--color-subtext0)' }}>{p}</p>
              ))}
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
