"use client";

import { useState, useMemo, useCallback } from 'react';
import { ExternalLink, X, Calendar } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

export interface ExperienceTimelineItem {
  company: string;
  role: string;
  url: string;
  logoUrl: string;
  logoAlt: string;
  startDate: string;
  endDate?: string;
  details?: string;
  logoScale?: number;
}

interface ExperienceProps {
  timeline: ExperienceTimelineItem[];
}

export default function Experience({ timeline }: ExperienceProps) {
  const { t } = useLanguage();
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  const buttonOutlineStyle = useMemo(() => ({
    outlineColor: 'var(--color-accent)'
  }), []);

  const isPast = useCallback((item: ExperienceTimelineItem): boolean => {
    return !!item.endDate;
  }, []);

  const formatDate = useCallback((dateStr: string, yearMonthOnly = true): string => {
    const date = new Date(dateStr);
    if (yearMonthOnly) {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    return date.toLocaleDateString();
  }, []);

  return (
    <section className="px-4 md:px-0">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:justify-start">
        {timeline.map((item, i) => {
          const past = isPast(item);
          const isOpen = openPopover === i;

          return (
            <div key={item.company} className="relative">
              <button
                onClick={() => setOpenPopover(isOpen ? null : i)}
                className={`group flex cursor-pointer items-center gap-2 rounded text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  past
                    ? 'opacity-60 hover:opacity-80 focus-visible:opacity-100'
                    : 'hover:opacity-80 focus-visible:opacity-100'
                }`}
                style={buttonOutlineStyle}
                aria-label={`View details for ${item.role} at ${item.company}`}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector('span span');
                  if (span instanceof HTMLElement) {
                    span.style.color = 'var(--color-text)';
                  }
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector('span span');
                  if (span instanceof HTMLElement && !past) {
                    span.style.color = 'var(--color-text)';
                  } else if (span instanceof HTMLElement) {
                    span.style.color = 'var(--color-subtext1)';
                  }
                }}
              >
                <img
                  src={item.logoUrl}
                  alt=""
                  width={32}
                  height={28}
                  className="flex max-h-8 min-h-7 w-auto min-w-6 object-contain transition-transform duration-200 group-hover:scale-105"
                  style={{
                    transform: item.logoScale ? `scale(${item.logoScale})` : undefined
                  }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'flex items-center justify-center rounded';
                    placeholder.style.cssText = `
                      min-width: 2rem;
                      min-height: 1.75rem;
                      max-height: 2rem;
                      background: linear-gradient(135deg, var(--color-surface0) 0%, var(--color-surface1) 100%);
                      border: 1px solid var(--color-surface2);
                      font-size: 0.75rem;
                      font-weight: 600;
                      color: var(--color-subtext0);
                      padding: 0 0.5rem;
                    `;
                    placeholder.textContent = item.company.slice(0, 2).toUpperCase();
                    target.parentElement?.insertBefore(placeholder, target);
                  }}
                />
                <span 
                  className="transition-colors duration-200"
                  style={{ color: 'var(--color-subtext1)' }}
                >
                  <span className="whitespace-nowrap">
                    <span 
                      className={past ? '' : 'font-medium'}
                      style={{ color: past ? 'var(--color-subtext1)' : 'var(--color-text)' }}
                    >
                      {item.company}
                    </span>
                    {past && (
                      <span className="text-xs ml-1" style={{ color: 'var(--color-overlay0)' }}>
                        {' '}({t('experience.past')})
                      </span>
                    )}
                  </span>
                </span>
              </button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setOpenPopover(null)}
                  />
                  <div
                    className="absolute bottom-full left-1/2 z-30 mb-2 w-80 md:w-96 -translate-x-1/2 rounded-xl border p-4 shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200"
                    style={{
                      borderColor: 'var(--color-surface0)',
                      backgroundColor: 'var(--color-mantle)',
                      color: 'var(--color-text)',
                      boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logoUrl}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-auto max-w-16 shrink-0 rounded-md object-contain p-1"
                          style={{
                            transform: item.logoScale ? `scale(${item.logoScale})` : undefined
                          }}
                        />
                        <div>
                          <p 
                            className="font-semibold transition-colors"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {item.company}
                          </p>
                          <p className="text-sm" style={{ color: 'var(--color-subtext0)' }}>
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setOpenPopover(null)}
                        className="-m-1 cursor-pointer rounded p-1 transition-colors"
                        style={{ color: 'var(--color-subtext1)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
                        aria-label="Close details"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {item.details && (
                      <p className="mb-3 text-sm" style={{ color: 'var(--color-subtext1)' }}>
                        {item.details}
                      </p>
                    )}

                    <div 
                      className="mb-3 flex items-center gap-1.5 text-xs"
                      style={{ color: 'var(--color-overlay0)' }}
                    >
                      <Calendar size={14} className="shrink-0" />
                      <span>{formatDate(item.startDate)}</span>
                      <span>-</span>
                      {item.endDate ? (
                        <span>{formatDate(item.endDate)}</span>
                      ) : (
                        <span>{t('experience.present')}</span>
                      )}
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm transition-colors"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      <span>{t('experience.visit_website')}</span>
                      <ExternalLink
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
