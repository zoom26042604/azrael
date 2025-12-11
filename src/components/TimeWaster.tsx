"use client";

import { useState, useEffect, useCallback } from 'react';
import { Info } from 'lucide-react';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';

const STORAGE_KEY = 'waste-clicks';
const SCALE_DURATION = 100;
const SPARKLE_DURATION = 1000;

export default function TimeWaster() {
  const [personalCount, setPersonalCount] = useLocalStorage(STORAGE_KEY, 0);
  const [globalCount, setGlobalCount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [buttonScale, setButtonScale] = useState(1);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const newCount = personalCount + 1;
    setPersonalCount(newCount);

    // Animation
    setButtonScale(0.95);
    setTimeout(() => setButtonScale(1), SCALE_DURATION);

    // Add sparkle
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setSparkles(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, SPARKLE_DURATION);
  }, [personalCount]);

  return (
    <div 
      className="flex flex-col rounded-xl border p-4 shadow-lg"
      style={{
        borderColor: 'var(--color-surface0)',
        backgroundColor: 'var(--color-base)'
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: 'var(--color-text)' }}
        >
          ⏱️ Time Waster
        </h3>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="cursor-pointer rounded p-1 transition-colors"
          style={{ color: 'var(--color-subtext1)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
          aria-label="Info"
        >
          <Info size={14} />
        </button>
      </div>

      {showInfo && (
        <div 
          className="mb-3 rounded-lg p-3 text-xs"
          style={{
            backgroundColor: 'var(--color-surface0)',
            color: 'var(--color-subtext0)'
          }}
        >
          <p>Click the button to waste some time! Your personal count is saved locally.</p>
        </div>
      )}

      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <button
          onClick={handleClick}
          className="relative overflow-hidden rounded-xl px-6 py-3 font-semibold transition-all"
          style={{
            backgroundColor: 'var(--color-surface0)',
            color: 'var(--color-text)',
            transform: `scale(${buttonScale})`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-accent) 30%, var(--color-surface0))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface0)';
          }}
        >
          Waste Time
          {sparkles.map(sparkle => (
            <span
              key={sparkle.id}
              className="pointer-events-none absolute text-xl animate-ping"
              style={{
                left: sparkle.x,
                top: sparkle.y,
                color: 'var(--color-accent)'
              }}
            >
              ✨
            </span>
          ))}
        </button>

        <div className="text-center">
          <p className="text-xs" style={{ color: 'var(--color-subtext1)' }}>
            Your clicks: <span style={{ color: 'var(--color-accent)' }} className="font-mono font-semibold">{personalCount}</span>
          </p>
          {globalCount > 0 && (
            <p className="text-xs mt-1" style={{ color: 'var(--color-subtext1)' }}>
              Global: <span className="font-mono">{globalCount.toLocaleString()}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
