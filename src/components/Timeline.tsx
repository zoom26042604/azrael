"use client";

import type { ExperienceTimelineItem } from '@/src/components/Experience';
import { Calendar, Briefcase, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import AnimatedSection from '@/src/components/AnimatedSection';
import Image from 'next/image';

interface TimelineProps {
  items: ExperienceTimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const { t } = useLanguage();

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const isCurrentRole = (item: ExperienceTimelineItem): boolean => !item.endDate;

  return (
    <div className="relative space-y-8">
      {/* Ligne verticale */}
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5"
        style={{ backgroundColor: 'var(--color-surface1)' }}
      />

      {items.map((item, index) => (
        <AnimatedSection
          key={`${item.company}-${index}`}
          animation="slide-right"
          delay={index * 100}
        >
          <div className="relative flex gap-6 items-start">
            {/* Timeline dot */}
            <div
              className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-4 shrink-0"
              style={{
                backgroundColor: isCurrentRole(item) ? 'var(--color-accent)' : 'var(--color-surface0)',
                borderColor: 'var(--color-base)'
              }}
            >
              <Briefcase
                size={14}
                style={{ color: isCurrentRole(item) ? 'var(--color-base)' : 'var(--color-accent)' }}
              />
            </div>

            {/* Content card */}
            <div
              className="flex-1 rounded-lg p-6 space-y-3 transition-all duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--color-surface0)',
                border: `1px solid var(--color-surface1)`
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1 flex-1">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {t(item.role)}
                  </h3>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'var(--color-accent)' }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    <span className="font-medium">{item.company}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Company logo */}
                {item.logoUrl && (
                  <Image
                    src={item.logoUrl}
                    alt={item.logoAlt}
                    width={48}
                    height={48}
                    className="object-contain rounded"
                    style={{ transform: item.logoScale ? `scale(${item.logoScale})` : undefined }}
                  />
                )}
              </div>

              {/* Date range */}
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-subtext0)' }}
              >
                <Calendar size={14} />
                <span>
                  {formatDate(item.startDate)} – {item.endDate ? formatDate(item.endDate) : t('experience.present')}
                </span>
                {isCurrentRole(item) && (
                  <span
                    className="px-2 py-0.5 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: 'var(--color-green)',
                      color: 'var(--color-base)'
                    }}
                  >
                    {t('experience.current')}
                  </span>
                )}
              </div>

              {/* Details */}
              {item.details && (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-subtext1)' }}
                >
                  {t(item.details)}
                </p>
              )}
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
