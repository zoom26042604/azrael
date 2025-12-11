import { ButtonHTMLAttributes, ReactNode, CSSProperties, useMemo, useCallback } from 'react';
import type { ButtonMouseHandler } from '@/src/types/events';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  
  const baseStyles = useMemo<CSSProperties>(() => ({
    borderRadius: '0.5rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? '0.5' : '1',
    width: fullWidth ? '100%' : 'auto',
    border: 'none'
  }), [disabled, fullWidth]);

  const sizeStyles = useMemo<Record<string, CSSProperties>>(() => ({
    sm: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem'
    },
    md: {
      padding: '0.5rem 1rem',
      fontSize: '1rem'
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem'
    }
  }), []);

  const variantStyles = useMemo<Record<string, CSSProperties>>(() => ({
    primary: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-base)'
    },
    secondary: {
      backgroundColor: 'var(--color-surface0)',
      color: 'var(--color-text)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid var(--color-surface0)'
    },
    danger: {
      backgroundColor: 'var(--color-red)',
      color: 'var(--color-base)'
    }
  }), []);

  const handleMouseEnter: ButtonMouseHandler = useCallback((e) => {
    if (!disabled) {
      if (variant === 'primary') {
        e.currentTarget.style.opacity = '0.9';
      } else if (variant === 'secondary') {
        e.currentTarget.style.backgroundColor = 'var(--color-surface1)';
      } else if (variant === 'ghost') {
        e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
      } else if (variant === 'danger') {
        e.currentTarget.style.opacity = '0.9';
      }
    }
  }, [disabled, variant]);

  const handleMouseLeave: ButtonMouseHandler = useCallback((e) => {
    if (!disabled) {
      if (variant === 'primary' || variant === 'danger') {
        e.currentTarget.style.opacity = '1';
      } else if (variant === 'secondary') {
        e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
      } else if (variant === 'ghost') {
        e.currentTarget.style.backgroundColor = 'transparent';
      }
    }
  }, [disabled, variant]);

  const buttonStyle = useMemo<CSSProperties>(() => ({
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant]
  }), [baseStyles, size, sizeStyles, variant, variantStyles]);

  return (
    <button
      style={buttonStyle}
      className={className}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
