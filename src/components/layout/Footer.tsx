"use client";

import { useEffect, useState } from 'react';
import { Clock, GitCommit, Github, Linkedin } from 'lucide-react';

const year = new Date().getFullYear();
const commitSha = process.env.NEXT_PUBLIC_COMMIT_SHA || 'dev';
const shortSha = commitSha.substring(0, 7);

// Determine the environment-based link URL
const getCommitLinkUrl = () => {
  if (commitSha !== 'dev') {
    // Production: link to the specific commit
    return `https://github.com/zoom26042604/azrael/commit/${commitSha}`;
  }
  
  // Development: determine the current branch
  const currentBranch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 
                       process.env.VERCEL_GIT_COMMIT_REF || 
                       'dev';
  
  // Link to the branch on GitHub
  return `https://github.com/zoom26042604/azrael/tree/${currentBranch}`;
};

const commitLinkUrl = getCommitLinkUrl();

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
          <span className="hidden md:inline" style={{ color: 'var(--color-surface1)' }}>•</span>
          <a
            href={commitLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors duration-200"
            style={{ color: 'var(--color-subtext1)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
          >
            <GitCommit size={14} />
            <span className="font-mono text-xs">{shortSha}</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Clock size={14} style={{ color: 'var(--color-text)' }} />
            <span style={{ color: 'var(--color-subtext1)' }}>
              <span className="font-mono" style={{ color: 'var(--color-peach)' }}>{timeOnSite}</span>
            </span>
          </div>

          <span className="hidden sm:inline" style={{ color: 'var(--color-surface1)' }}>•</span>

          <div className="flex items-center gap-x-3">
            <a
              href="https://github.com/zoom26042604"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors duration-200"
              style={{ color: 'var(--color-subtext1)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-ferre-9ab76723a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors duration-200"
              style={{ color: 'var(--color-subtext1)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
