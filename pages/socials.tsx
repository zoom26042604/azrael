import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import HeadMeta from '@/src/components/HeadMeta';

export default function SocialsPage() {
  const { t } = useLanguage();

  const socials = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/zoom26042604',
      description: t('socials.github_desc'),
      color: 'var(--color-mauve)'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/nathan-ferre-0ba3a438a',
      description: t('socials.linkedin_desc'),
      color: 'var(--color-blue)'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:nathanferre06@gmail.com',
      description: 'nathanferre06@gmail.com',
      color: 'var(--color-peach)'
    },
    {
      name: t('socials.email_academic'),
      icon: Mail,
      url: 'mailto:nathan.ferre@ynov.com',
      description: 'nathan.ferre@ynov.com',
      color: 'var(--color-green)'
    }
  ];

  return (
    <>
      <HeadMeta
        title={t('nav.socials')}
        description="Retrouvez tous mes réseaux sociaux et moyens de me contacter : GitHub, LinkedIn, Email."
        path="/socials"
        keywords={['contact', 'réseaux sociaux', 'social media', 'GitHub', 'LinkedIn']}
      />
      <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
            {t('socials.title')}
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-subtext0)' }}>
            {t('socials.description')}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="group relative overflow-hidden rounded-lg p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-surface0)',
                  border: '1px solid var(--color-surface1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = social.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-surface1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-lg p-3 transition-colors"
                    style={{
                      backgroundColor: 'var(--color-base)',
                      color: social.color
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h2 
                      className="text-xl font-semibold transition-colors"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {social.name}
                    </h2>
                    <p 
                      className="text-sm transition-colors"
                      style={{ color: 'var(--color-subtext0)' }}
                    >
                      {social.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
