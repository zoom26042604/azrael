import { AnchorHTMLAttributes, ReactNode, useMemo, useCallback } from 'react';
import type { LinkMouseHandler } from '@/src/types/events';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'muted';
  underline?: boolean;
  external?: boolean;
}

export default function Link({
  children,
  variant = 'default',
  underline = true,
  external = false,
  className = '',
  href,
  ...props
}: LinkProps) {
  
  const variantColors = useMemo(() => ({
    default: 'var(--color-text)',
    accent: 'var(--color-accent)',
    muted: 'var(--color-subtext0)'
  }), []);

  const baseStyles = useMemo(() => ({
    color: variantColors[variant],
    textDecoration: underline ? 'underline' : 'none',
    textDecorationColor: 'color-mix(in srgb, currentColor 30%, transparent)',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  }), [variant, underline, variantColors]);

  const handleMouseEnter: LinkMouseHandler = useCallback((e) => {
    e.currentTarget.style.color = 'var(--color-accent)';
    if (underline) {
      e.currentTarget.style.textDecorationColor = 'var(--color-accent)';
    }
  }, [underline]);

  const handleMouseLeave: LinkMouseHandler = useCallback((e) => {
    e.currentTarget.style.color = variantColors[variant];
    if (underline) {
      e.currentTarget.style.textDecorationColor = 'color-mix(in srgb, currentColor 30%, transparent)';
    }
  }, [variant, underline, variantColors]);

  return (
    <a
      href={href}
      style={baseStyles}
      className={className}
      target={external ? '_blank' : props.target}
      rel={external ? 'noopener noreferrer' : props.rel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
}
