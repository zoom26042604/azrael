import { useCallback, useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/src/hooks/useTheme';
import type { ButtonMouseHandler } from '@/src/types/events';

export default function ThemeToggle() {
  const { theme, changeTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  const handleToggle = useCallback(() => {
    changeTheme(isDark ? 'light' : 'dark');
  }, [isDark, changeTheme]);

  const handleMouseEnter: ButtonMouseHandler = useCallback((e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
    e.currentTarget.style.color = 'var(--color-accent)';
  }, []);

  const handleMouseLeave: ButtonMouseHandler = useCallback((e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.color = 'var(--color-text)';
  }, []);

  const buttonStyle = useMemo(() => ({
    padding: '0.5rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-text)'
  }), []);

  if (!mounted) {
    return (
      <div style={{ width: '40px', height: '40px' }} />
    );
  }

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
