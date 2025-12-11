import { ReactNode, CSSProperties, useMemo, useCallback, MouseEvent } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
}

export default function Card({
  children,
  title,
  subtitle,
  icon,
  href,
  onClick,
  className = '',
  hoverable = false,
  bordered = true
}: CardProps) {
  
  const baseStyles = useMemo<CSSProperties>(() => ({
    backgroundColor: 'var(--color-base)',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    ...(bordered && {
      border: '1px solid var(--color-surface0)',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
    })
  }), [bordered]);

  const handleMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    if (hoverable) {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
    }
  }, [hoverable]);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    if (hoverable) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = bordered ? '0 1px 3px 0 rgb(0 0 0 / 0.1)' : 'none';
    }
  }, [hoverable, bordered]);

  const content = (
    <>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <span style={{ color: 'var(--color-accent)' }}>{icon}</span>}
          {title && (
            <div className="flex-1">
              <h3 
                className="text-lg font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                {title}
              </h3>
              {subtitle && (
                <p 
                  className="text-sm mt-1"
                  style={{ color: 'var(--color-subtext0)' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={className}
        style={{
          ...baseStyles,
          display: 'block',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={className}
      style={{
        ...baseStyles,
        ...(onClick && { cursor: 'pointer' })
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {content}
    </div>
  );
}
