import { Code2 } from 'lucide-react';
import * as SimpleIcons from 'react-icons/si';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { skills } from '@/src/data/skills';

export default function Skills() {
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    const Icon = (SimpleIcons as any)[iconName];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <section className="space-y-6">
      <h2 className="flex items-center gap-3 text-2xl font-bold md:text-3xl">
        <Code2 size={28} style={{ color: 'var(--color-accent)' }} />
        <span style={{ color: 'var(--color-text)' }}>
          {t('skills.title')}
        </span>
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {skills.map((skill) => (
          <a
            key={skill.name}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all"
            style={{
              backgroundColor: 'var(--color-surface0)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-surface1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)';
              e.currentTarget.style.color = 'var(--color-base)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
              e.currentTarget.style.color = 'var(--color-text)';
              e.currentTarget.style.borderColor = 'var(--color-surface1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title={skill.name}
          >
            {getIcon(skill.icon)}
            <span>{skill.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
