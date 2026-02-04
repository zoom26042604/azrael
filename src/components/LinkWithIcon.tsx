import { LucideIcon } from 'lucide-react';

interface LinkWithIconProps {
  href: string;
  text: string;
  icon?: LucideIcon;
  external?: boolean;
  className?: string;
}

export default function LinkWithIcon({ 
  href, 
  text, 
  icon: Icon, 
  external = false, 
  className = '' 
}: LinkWithIconProps) {
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center gap-1.5 transition-colors duration-200 ${className}`}
      style={{ color: 'var(--color-subtext1)' }}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
    >
      {Icon && <Icon size={18} strokeWidth={1.5} className="shrink-0" />}
      <span>{text}</span>
    </a>
  );
}
