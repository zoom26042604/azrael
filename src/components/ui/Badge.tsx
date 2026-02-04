import { ReactNode, CSSProperties, useMemo } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}: BadgeProps) {
  
  const variantStyles = useMemo<Record<string, CSSProperties>>(() => ({
    default: {
      backgroundColor: 'var(--color-surface0)',
      color: 'var(--color-text)'
    },
    accent: {
      backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
      color: 'var(--color-accent)'
    },
    success: {
      backgroundColor: 'color-mix(in srgb, var(--color-green) 15%, transparent)',
      color: 'var(--color-green)'
    },
    warning: {
      backgroundColor: 'color-mix(in srgb, var(--color-yellow) 15%, transparent)',
      color: 'var(--color-yellow)'
    },
    danger: {
      backgroundColor: 'color-mix(in srgb, var(--color-red) 15%, transparent)',
      color: 'var(--color-red)'
    }
  }), []);

  const sizeStyles = useMemo<Record<string, CSSProperties>>(() => ({
    sm: {
      padding: '0.125rem 0.5rem',
      fontSize: '0.75rem'
    },
    md: {
      padding: '0.25rem 0.75rem',
      fontSize: '0.875rem'
    },
    lg: {
      padding: '0.375rem 1rem',
      fontSize: '1rem'
    }
  }), []);

  const badgeStyle = useMemo<CSSProperties>(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '9999px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...sizeStyles[size]
  }), [variant, size, variantStyles, sizeStyles]);

  return (
    <span style={badgeStyle} className={className}>
      {children}
    </span>
  );
}
