import { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, User, Briefcase, Code2 } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import HeadMeta from '@/src/components/HeadMeta';
import Timeline from '@/src/components/Timeline';
import Skills from '@/src/components/Skills';
import { experienceTimeline } from '@/src/data/experience';

export default function AboutPage() {
  const { t } = useLanguage();

  const avatarStyle = useMemo(() => ({
    backgroundImage: 'url(/images/avatar.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '450px',
    backgroundColor: 'var(--color-surface0)'
  }), []);

  const handleEmailClick = useCallback(() => {
    window.location.href = 'mailto:nathanferre06@gmail.com';
  }, []);

  return (
    <>
      <HeadMeta
        title={t('about.title')}
        description="Étudiant en développement informatique à Ynov Toulouse, passionné par le développement web et les nouvelles technologies."
        path="/about"
        keywords={['étudiant', 'student', 'Ynov', 'développement web', 'formation']}
        type="profile"
      />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
      {/* About Me Section */}
      <section className="space-y-6">
        <h1 className="flex items-center gap-3 text-3xl font-bold md:text-4xl fade-in">
          <User size={32} style={{ color: 'var(--color-accent)' }} />
          <span>{t('about.title')}</span>
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 scale-in">
          <div 
            className="md:col-span-1 rounded-md shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            style={avatarStyle}
          />

          <div className="space-y-4 md:col-span-2">
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-subtext0)' }}>
              <b>{t('about.greeting')}</b> {t('about.intro_1')}{' '}
              <Link href="/socials" className="link">
                (@zoom26042604)
              </Link>
              {' '}{t('about.intro_2')}
              {' '}{t('about.intro_3')}{' '}
              <Link href="/projects" className="link">
                {t('about.interesting_projects')}
              </Link>
              {' '}{t('about.intro_4')}
            </p>

            <p className="text-base leading-relaxed" style={{ color: 'var(--color-subtext0)' }}>
              {t('about.currently')}{' '}
              <a
                href="https://www.ynov.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Ynov Campus Toulouse
              </a>
              {t('about.studying')}
            </p>

            <p className="text-base leading-relaxed" style={{ color: 'var(--color-subtext0)' }}>
              {t('about.outside')}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://github.com/zoom26042604"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: 'var(--color-text)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}
              >
                <Github size={16} />
                GitHub
              </a>

              <span style={{ color: 'var(--color-surface1)' }}>*</span>

              <a
                href="https://www.linkedin.com/in/nathan-ferre-0ba3a438a/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: 'var(--color-text)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}
              >
                <Linkedin size={16} />
                LinkedIn
              </a>

              <span style={{ color: 'var(--color-surface1)' }}>*</span>
              
              <span
                role="button"
                aria-label="Send an email"
                className="inline-flex items-center gap-1.5 text-sm transition-colors cursor-pointer"
                style={{ color: 'var(--color-text)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}
                tabIndex={0}
                onClick={handleEmailClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleEmailClick();
                  }
                }}
              >
                <Mail size={16} />
                nathanferre06[at]gmail.com
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Background Timeline */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold">
          <Briefcase size={28} style={{ color: 'var(--color-accent)' }} />
          <span>{t('experience.title')}</span>
        </h2>
        <Timeline items={experienceTimeline} />
      </section>

      {/* Skills & Tools Section */}
      <section className="space-y-6">
        <Skills />
      </section>
    </div>
    </>
  );
}
