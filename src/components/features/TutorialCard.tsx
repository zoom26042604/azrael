import Link from 'next/link';
import { Tutorial } from '@/src/types';

interface TutorialCardProps {
  tutorial: Tutorial;
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'var(--color-green)';
      case 'Intermédiaire':
        return 'var(--color-yellow)';
      case 'Avancé':
        return 'var(--color-red)';
      default:
        return 'var(--color-text)';
    }
  };

  return (
    <article 
      className="rounded-xl border p-6 transition-colors duration-200"
      style={{ 
        borderColor: 'var(--color-surface0)',
        backgroundColor: 'var(--color-base)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-surface0)';
      }}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h2 
            className="text-2xl font-semibold"
            style={{ color: 'var(--color-text)' }}
          >
            {tutorial.title}
          </h2>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: 'color-mix(in srgb, ' + getLevelColor(tutorial.level) + ' 20%, transparent)',
              color: getLevelColor(tutorial.level)
            }}
          >
            {tutorial.level}
          </span>
        </div>

        <p style={{ color: 'var(--color-subtext0)' }}>
          {tutorial.description}
        </p>

        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-subtext1)' }}>
          <span>⏱️ {tutorial.duration}</span>
          <span>•</span>
          <span>{tutorial.topics.length} modules</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tutorial.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-md px-2 py-1 text-xs"
              style={{
                backgroundColor: 'var(--color-surface0)',
                color: 'var(--color-subtext0)'
              }}
            >
              {topic}
            </span>
          ))}
        </div>

        <Link
          href={`/tutorials/${tutorial.slug}`}
          className="link inline-block mt-2 text-sm"
        >
          Commencer le tutoriel →
        </Link>
      </div>
    </article>
  );
}
