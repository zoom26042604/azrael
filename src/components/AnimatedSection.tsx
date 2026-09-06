import type { ReactNode, CSSProperties } from 'react';
import { useScrollAnimation } from '@/src/hooks/useScrollAnimation';
import { memo, useMemo } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
}

const animations: Record<string, { initial: CSSProperties; animate: CSSProperties }> = {
  'fade-up': {
    initial: { opacity: 0, transform: 'translateY(30px)' },
    animate: { opacity: 1, transform: 'translateY(0)' }
  },
  'fade-in': {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  'slide-left': {
    initial: { opacity: 0, transform: 'translateX(30px)' },
    animate: { opacity: 1, transform: 'translateX(0)' }
  },
  'slide-right': {
    initial: { opacity: 0, transform: 'translateX(-30px)' },
    animate: { opacity: 1, transform: 'translateX(0)' }
  }
};

const AnimatedSection = memo(function AnimatedSection({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0
}: AnimatedSectionProps) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const animationConfig = animations[animation];
  const style: CSSProperties = useMemo(() => ({
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
    ...(isVisible ? animationConfig.animate : animationConfig.initial)
  }), [isVisible, delay, animationConfig]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
});

export default AnimatedSection;
