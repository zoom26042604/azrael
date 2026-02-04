"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '@/src/data/projects';
import { useLanguage } from '@/src/contexts/LanguageContext';

// Generate all available routes dynamically
const generateRoutes = () => {
  const baseRoutes = ['/', '/projects', '/about', '/contact', '/socials'];
  
  // Add all project routes
  const projectRoutes = projects.map(p => `/projects/${p.slug}`);
  
  return [...baseRoutes, ...projectRoutes];
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const availableRoutes = generateRoutes();
  
  // Handle SSR when pathname is null
  if (!pathname) {
    return null;
  }
  
  const breadcrumbs = pathname.split('/').filter(Boolean).slice(0, 4);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Global keydown listener to activate editing mode
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't activate if already editing or if typing in another input
      if (isEditing) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      // Activate only on Space key
      if (e.key === ' ') {
        e.preventDefault();
        // Add trailing slash if not present and not root
        const pathWithSlash = pathname === '/' ? pathname : pathname.endsWith('/') ? pathname : pathname + '/';
        setInputValue(pathWithSlash);
        setIsEditing(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isEditing, pathname]);

  const handleClick = () => {
    // Add trailing slash if not present and not root
    const pathWithSlash = pathname === '/' ? pathname : pathname.endsWith('/') ? pathname : pathname + '/';
    setInputValue(pathWithSlash);
    setIsEditing(true);
  };

  const getMatchingRoutes = (input: string) => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || trimmed === '/') {
      // Show only base routes when input is empty or just "/"
      return ['/', '/projects', '/about', '/contact', '/socials'];
    }
    
    // Count the depth of the input
    const inputSegments = trimmed.split('/').filter(Boolean);
    const inputDepth = inputSegments.length;
    
    // If input ends with "/", we want next level routes
    const expectingNextLevel = trimmed.endsWith('/');
    const targetDepth = expectingNextLevel ? inputDepth + 1 : inputDepth;
    
    // Filter routes that match the input and are at the right depth
    const matches = availableRoutes.filter(route => {
      const routeLower = route.toLowerCase();
      
      // Route must start with the input
      if (!routeLower.startsWith(trimmed)) return false;
      
      // Count route segments
      const routeSegments = route.split('/').filter(Boolean);
      
      // Match routes at the target depth
      if (expectingNextLevel) {
        return routeSegments.length === targetDepth;
      } else {
        // When typing partial segment, show routes at current depth
        return routeSegments.length === targetDepth;
      }
    });
    
    return matches;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      // Prevent spaces in input
      e.preventDefault();
      return;
    }
    
    if (e.key === 'Tab') {
      e.preventDefault();
      
      if (!showSuggestions) {
        // First Tab: show suggestions
        const matches = getMatchingRoutes(inputValue);
        if (matches.length > 0) {
          setSuggestions(matches);
          setShowSuggestions(true);
          setSelectedIndex(0);
          setInputValue(matches[0]);
        }
      } else {
        // Continue cycling through visible suggestions
        const nextIndex = (selectedIndex + 1) % suggestions.length;
        setSelectedIndex(nextIndex);
        setInputValue(suggestions[nextIndex]);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      let targetPath = inputValue.trim();
      
      // Add leading slash if missing
      if (!targetPath.startsWith('/')) {
        targetPath = '/' + targetPath;
      }
      
      // Try to navigate, will fallback to 404 or home if route doesn't exist
      router.push(targetPath);
      setIsEditing(false);
      setShowSuggestions(false);
      setSelectedIndex(0);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue('');
      setShowSuggestions(false);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
      setSelectedIndex(0);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsEditing(false);
      setInputValue('');
      setShowSuggestions(false);
      setSelectedIndex(0);
    }, 200);
  };

  if (isEditing) {
    return (
      <>
        <nav aria-label="Breadcrumbs" className="relative">
          <div className="flex items-center overflow-hidden">
            <span style={{ color: 'var(--color-accent)' }} className="shrink-0">~</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="ml-1 bg-transparent outline-none font-mono w-full"
              style={{ 
                color: 'var(--color-text)',
                caretColor: 'var(--color-accent)',
                minWidth: '300px',
                maxWidth: '600px'
              }}
              placeholder="/path/to/route"
            />
          </div>
        </nav>
        
        {showSuggestions && suggestions.length > 0 && createPortal(
          <div 
            className="fixed rounded-lg border shadow-xl font-mono text-sm max-h-96 overflow-y-auto"
            style={{
              backgroundColor: 'var(--color-mantle)',
              borderColor: 'var(--color-surface1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              top: '60px',
              left: '20px',
              minWidth: '300px',
              maxWidth: '600px'
            }}
          >
            <div className="p-2 border-b" style={{ 
              borderColor: 'var(--color-surface1)',
              backgroundColor: 'var(--color-crust)'
            }}>
              <span style={{ color: 'var(--color-subtext0)' }} className="text-xs">
                {suggestions.length} {suggestions.length > 1 ? t('breadcrumb.routes_found_plural') : t('breadcrumb.routes_found')} {suggestions.length > 1 ? t('breadcrumb.found_plural') : t('breadcrumb.found')} - {t('breadcrumb.tab_help')}
              </span>
            </div>
            <div className="p-3 grid grid-cols-1 gap-1">
              {suggestions.map((route, idx) => (
                <div 
                  key={idx}
                  className="px-3 py-2 rounded transition-all"
                  style={{ 
                    color: idx === selectedIndex ? 'var(--color-text)' : 'var(--color-accent)',
                    backgroundColor: idx === selectedIndex ? 'var(--color-surface0)' : 'transparent',
                    fontWeight: idx === selectedIndex ? '600' : '400',
                    borderLeft: idx === selectedIndex ? '3px solid var(--color-accent)' : '3px solid transparent'
                  }}
                >
                  {route}
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }

  return (
    <nav aria-label="Breadcrumbs" className="cursor-text">
      <ul className="text-md flex items-center" onClick={handleClick}>
        <li className="inline-flex items-center">
          <Link 
            href="/" 
            className="hover:opacity-40 transition-colors wiggle-animation"
            style={{ color: 'var(--color-accent)' }}
            onClick={(e) => e.stopPropagation()}
          >
            ~
          </Link>
        </li>

        {breadcrumbs.map((text, i) => {
          const href = '/' + breadcrumbs.slice(0, i + 1).join('/');
          const isLast = i === breadcrumbs.length - 1;

          return (
            <div key={`bred-${i}`} className="inline-flex items-center">
              <li className="mx-0.5 inline-flex items-center">/</li>
              <li className="inline-flex items-center">
                {isLast ? (
                  <span aria-current="page" style={{ color: 'var(--color-text)' }}>{text}</span>
                ) : (
                  <Link 
                    href={href} 
                    className="transition-colors"
                    style={{ color: 'var(--color-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {text}
                  </Link>
                )}
              </li>
            </div>
          );
        })}
        
        <li className="mx-0.5 inline-flex items-center" aria-hidden="true">/</li>
        <li className="ml-1 inline-flex items-center">
          <span 
            className="cursor-blink h-4 w-2" 
            style={{ backgroundColor: 'var(--color-accent)' }}
            aria-hidden="true"
          />
        </li>
      </ul>
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          20% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 3s cubic-bezier(0.2, 1, 0.8, 1) infinite;
        }
      `}</style>
    </nav>
  );
}
