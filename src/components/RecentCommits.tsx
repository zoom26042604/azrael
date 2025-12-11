"use client";

import { useState, useEffect, useMemo, memo } from 'react';
import { GitGraph, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface Commit {
  sha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
  additions: number;
  deletions: number;
}

interface LanguageStats {
  name: string;
  size: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  'TypeScript': '#3178c6',
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C': '#555555',
  'C#': '#178600',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'Swift': '#ffac45',
  'Kotlin': '#A97BFF',
  'CSS': '#563d7c',
  'SCSS': '#c6538c',
  'HTML': '#e34c26',
  'Svelte': '#ff3e00',
  'Shell': '#89e051',
} as const;

// Cache configuration
const CACHE_KEY = 'github-commits-cache';
const CACHE_TIME_KEY = 'github-commits-cache-time';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const GITHUB_USERNAME = 'zoom26042604';

const RecentCommits = memo(function RecentCommits() {
  const { t } = useLanguage();
  const [commits, setCommits] = useState<Commit[]>([]);
  const [languages, setLanguages] = useState<LanguageStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommits() {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
      
      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime, 10);
        
        if (age < CACHE_DURATION) {
          const data = JSON.parse(cached);
          setCommits(data.commits);
          setLanguages(data.languages);
          setLoading(false);
          return;
        }
      }

      try {
        // Utiliser la nouvelle API route pour récupérer les commits depuis l'API GitHub publique
        const response = await fetch('/api/github-commits?limit=5');
        
        if (!response.ok) {
          console.error('Failed to fetch commits:', response.status);
          setLoading(false);
          return;
        }

        const commitData = await response.json();
        
        if (!Array.isArray(commitData) || commitData.length === 0) {
          setLoading(false);
          return;
        }

        // Formater les commits pour l'affichage
        const formattedCommits: Commit[] = commitData.map((commit: Commit) => ({
          sha: commit.sha,
          message: commit.message,
          repo: commit.repo,
          date: commit.date,
          url: commit.url,
          additions: commit.additions || 0,
          deletions: commit.deletions || 0
        }));

        // Récupérer les langages des repos concernés
        const repoNames = [...new Set(commitData.map((c: Commit) => c.repo))];
        const languagePromises = repoNames.map(async (repoName) => {
          try {
            const langResponse = await fetch(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
              {
                headers: {
                  'Accept': 'application/vnd.github.v3+json',
                  'User-Agent': 'azrael-portfolio'
                }
              }
            );
            if (langResponse.ok) {
              return await langResponse.json();
            }
          } catch {
            return {};
          }
          return {};
        });

        const languagesData = await Promise.all(languagePromises);
        const languageCount: { [key: string]: number } = {};
        
        languagesData.forEach((langData) => {
          Object.entries(langData).forEach(([lang, bytes]) => {
            languageCount[lang] = (languageCount[lang] || 0) + (bytes as number);
          });
        });

        const formattedLanguages = Object.entries(languageCount)
          .map(([name, size]) => ({
            name,
            size,
            color: LANGUAGE_COLORS[name] || '#6e7681'
          }))
          .sort((a, b) => b.size - a.size);

        setLanguages(formattedLanguages);

        setCommits(formattedCommits);
        
        // Cache the results
        localStorage.setItem(CACHE_KEY, JSON.stringify({ commits: formattedCommits, languages: formattedLanguages }));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch (error) {
        console.error('Error fetching commits:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCommits();
  }, []);

  // Memoize language total calculation
  const langTotal = useMemo(() => 
    languages.reduce((acc, l) => acc + l.size, 0), 
    [languages]
  );

  return (
    <div 
      className="rounded-xl border p-4 shadow-lg md:col-span-2"
      style={{
        borderColor: 'var(--color-surface0)',
        backgroundColor: 'var(--color-base)'
      }}
    >
      <div className="mb-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
          <span className="text-xl">🧠</span>
          <span>{t('commits.title')}</span>
        </h3>
      </div>

      {loading ? (
        <p className="text-sm italic" style={{ color: 'var(--color-subtext1)' }}>
          {t('commits.loading')}
        </p>
      ) : commits.length > 0 ? (
        <div className="space-y-0.5 text-sm">
          {commits.map((commit) => (
            <div key={commit.sha}>
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline block overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ color: 'var(--color-subtext0)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext0)'}
              >
                <span style={{ color: 'var(--color-text)' }}>{commit.repo}</span>
                <span>: {commit.message} </span>
                <span style={{ color: 'var(--color-green)' }}>+{commit.additions}</span>
                <span> / </span>
                <span style={{ color: 'var(--color-red)' }}>-{commit.deletions}</span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic" style={{ color: 'var(--color-subtext1)' }}>
          No recent public commits.
        </p>
      )}

      <div className="mt-3 space-y-2">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-sm hover:underline"
          style={{ color: 'var(--color-accent)' }}
        >
          <span>View on GitHub</span>
          <ExternalLink
            size={12}
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
        
        {langTotal > 0 && (
          <div className="w-full">
            <div 
              className="h-2 w-full rounded-sm overflow-hidden flex"
              style={{ backgroundColor: 'var(--color-surface2)' }}
            >
              {languages.map((lang) => {
                const percentage = (lang.size / langTotal) * 100;
                return (
                  <div
                    key={lang.name}
                    className="group relative h-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-20"
                      style={{
                        backgroundColor: 'var(--color-mantle)',
                        color: 'var(--color-text)'
                      }}
                    >
                      {lang.name} • {percentage.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default RecentCommits;
