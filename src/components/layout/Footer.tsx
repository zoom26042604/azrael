"use client";

import { useEffect, useState } from 'react';
import { Clock, Github, Linkedin } from 'lucide-react';

const year = new Date().getFullYear();
const version = process.env.NEXT_PUBLIC_VERSION || '0.1.0';

// Link to master branch on GitHub
const repoUrl = 'https://github.com/zoom26042604/azrael/tree/master';

export default function Footer() {
  const [timeOnSite, setTimeOnSite] = useState('00:00');

  useEffect(() => {
    const sessionStart = Date.now();
    let initialTime = 0;

    // Load from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('total-time-on-site');
      if (stored) {
        initialTime = parseInt(stored, 10);
      }
    }

    const interval = setInterval(() => {
      const sessionElapsed = Math.floor((Date.now() - sessionStart) / 1000);
      const totalSeconds = initialTime + sessionElapsed;
      
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      if (hours > 0) {
        setTimeOnSite(
          `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      } else {
        setTimeOnSite(
          `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    const saveTime = () => {
      const sessionElapsed = Math.floor((Date.now() - sessionStart) / 1000);
      if (typeof window !== 'undefined') {
        localStorage.setItem('total-time-on-site', String(initialTime + sessionElapsed));
      }
    };

    window.addEventListener('beforeunload', saveTime);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', saveTime);
      saveTime();
    };
  }, []);

  return (
    <div className="relative mx-auto mb-5" style={{ width: '95%' }}>
      {/* Main footer */}
      <footer
        className="flex h-auto flex-col items-center justify-center gap-y-3 rounded-lg border p-5 text-sm md:flex-row md:justify-between md:gap-y-0"
        style={{
          backgroundColor: 'var(--color-mantle)',
          color: 'var(--color-subtext0)',
          borderColor: 'color-mix(in srgb, var(--color-surface0) 20%, transparent)'
        }}
      >
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
          <span>© {year} Nathan FERRE</span>
          <span className="hidden md:inline" style={{ color: 'var(--color-text)' }} aria-hidden="true">•</span>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View version ${version} on GitHub`}
            className="flex items-center gap-1 transition-colors duration-200 rounded"
            style={{ color: 'var(--color-subtext1)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
          >
            <Github size={14} aria-hidden="true" />
            <span className="font-mono text-xs">v{version}</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-label={`Time on site: ${timeOnSite}`}>
            <Clock size={14} style={{ color: 'var(--color-text)' }} aria-hidden="true" />
            <span style={{ color: 'var(--color-subtext1)' }}>
              <span className="font-mono" style={{ color: 'var(--color-peach)' }}>{timeOnSite}</span>
            </span>
          </div>

          <span className="hidden sm:inline" style={{ color: 'var(--color-text)' }} aria-hidden="true">•</span>

          <div className="flex items-center gap-x-3">
            <a
              href="https://github.com/zoom26042604"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-colors duration-200 rounded"
              style={{ color: 'var(--color-subtext1)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-ferre-9ab76723a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors duration-200 rounded"
              style={{ color: 'var(--color-subtext1)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
