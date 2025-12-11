"use client";

import { useState, useEffect, useCallback, memo } from 'react';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';

type Board = number[][];

const getTileColor = (value: number): string => {
  const colors: { [key: number]: string } = {
    0: 'var(--color-surface0)',
    2: 'var(--color-rosewater)',
    4: 'var(--color-flamingo)',
    8: 'var(--color-peach)',
    16: 'var(--color-yellow)',
    32: 'var(--color-green)',
    64: 'var(--color-teal)',
    128: 'var(--color-sky)',
    256: 'var(--color-sapphire)',
    512: 'var(--color-blue)',
    1024: 'var(--color-lavender)',
    2048: 'var(--color-mauve)',
    4096: 'var(--color-pink)',
  };
  return colors[value] || 'var(--color-accent)';
};

const getTileBrightness = (): string => {
  return '#000000';
};

const Game2048 = memo(function Game2048() {
  const { t } = useLanguage();
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useLocalStorage('2048-high-score', 0);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    initBoard();
  }, []);

  const initBoard = () => {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setHasWon(false);
  };

  const addRandomTile = (board: Board) => {
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) emptyCells.push([i, j]);
      }
    }
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const moveLeft = (board: Board): [Board, number] => {
    let newScore = 0;
    const newBoard = board.map(row => {
      const filtered = row.filter(x => x !== 0);
      const merged: number[] = [];
      let skip = false;
      
      for (let i = 0; i < filtered.length; i++) {
        if (skip) {
          skip = false;
          continue;
        }
        if (filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2);
          newScore += filtered[i] * 2;
          skip = true;
        } else {
          merged.push(filtered[i]);
        }
      }
      
      while (merged.length < 4) merged.push(0);
      return merged;
    });
    return [newBoard, newScore];
  };

  const rotateBoard = (board: Board): Board => {
    return board[0].map((_, i) => board.map(row => row[i]).reverse());
  };

  const move = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver || animating) return;

    let newBoard = board.map(row => [...row]);
    let moves = 0;

    // Rotate board to make all moves work like left
    if (direction === 'right') {
      newBoard = rotateBoard(rotateBoard(newBoard));
    } else if (direction === 'up') {
      newBoard = rotateBoard(rotateBoard(rotateBoard(newBoard)));
    } else if (direction === 'down') {
      newBoard = rotateBoard(newBoard);
    }

    const [movedBoard, earnedScore] = moveLeft(newBoard);

    // Rotate back
    if (direction === 'right') {
      newBoard = rotateBoard(rotateBoard(movedBoard));
    } else if (direction === 'up') {
      newBoard = rotateBoard(movedBoard);
    } else if (direction === 'down') {
      newBoard = rotateBoard(rotateBoard(rotateBoard(movedBoard)));
    } else {
      newBoard = movedBoard;
    }

    // Check if board changed
    const hasChanged = JSON.stringify(board) !== JSON.stringify(newBoard);
    
    if (hasChanged) {
      setAnimating(true);
      addRandomTile(newBoard);
      setBoard(newBoard);
      const newScore = score + earnedScore;
      setScore(newScore);

      // Check for 2048 tile (win condition)
      if (!hasWon && newBoard.some(row => row.includes(2048))) {
        setHasWon(true);
      }

      // Update high score
      if (newScore > highScore) {
        setHighScore(newScore);
      }

      // Check game over
      if (isGameOver(newBoard)) {
        setGameOver(true);
      }

      setTimeout(() => setAnimating(false), 150);
    }
  }, [board, score, highScore, gameOver, animating, hasWon]);

  const isGameOver = (board: Board): boolean => {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) return false;
      }
    }

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = board[i][j];
        if (j < 3 && board[i][j + 1] === current) return false;
        if (i < 3 && board[i + 1][j] === current) return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowLeft') move('left');
        if (e.key === 'ArrowRight') move('right');
        if (e.key === 'ArrowUp') move('up');
        if (e.key === 'ArrowDown') move('down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  // Touch controls
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    };

    const handleSwipe = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 30;

      if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          move('right');
        } else {
          move('left');
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          move('down');
        } else {
          move('up');
        }
      }
    };

    const gameBoard = document.getElementById('game-2048-board');
    if (gameBoard) {
      gameBoard.addEventListener('touchstart', handleTouchStart);
      gameBoard.addEventListener('touchend', handleTouchEnd);

      return () => {
        gameBoard.removeEventListener('touchstart', handleTouchStart);
        gameBoard.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [move]);

  return (
    <div 
      className="flex flex-col rounded-xl border p-4 shadow-lg"
      style={{
        borderColor: 'var(--color-surface0)',
        backgroundColor: 'var(--color-base)'
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
            {t('game2048.title')}
        </h3>
        <button
          onClick={initBoard}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors"
          style={{
            backgroundColor: 'var(--color-surface0)',
            color: 'var(--color-text)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface0)'}
        >
          <RotateCcw size={12} />
          {t('game2048.new_game')}
        </button>
      </div>

      <div className="mb-3 flex gap-3">
        <div 
          className="flex-1 rounded-lg p-2 text-center"
          style={{ backgroundColor: 'var(--color-surface0)' }}
        >
          <div className="text-xs" style={{ color: 'var(--color-subtext0)' }}>{t('game2048.score')}</div>
          <div className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{score}</div>
        </div>
        <div 
          className="flex-1 rounded-lg p-2 text-center"
          style={{ backgroundColor: 'var(--color-surface0)' }}
        >
          <div className="text-xs" style={{ color: 'var(--color-subtext0)' }}>{t('game2048.best')}</div>
          <div className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{highScore}</div>
        </div>
      </div>

      <div 
        id="game-2048-board"
        className="relative mx-auto rounded-lg p-3 touch-none"
        style={{ 
          backgroundColor: 'var(--color-mantle)',
          width: 'fit-content'
        }}
      >
        <div className="grid grid-cols-4 gap-3">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className="flex items-center justify-center rounded-lg font-bold transition-all duration-150"
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: getTileColor(cell),
                  color: getTileBrightness(),
                  fontSize: cell > 512 ? '1.5rem' : cell > 64 ? '1.75rem' : '2rem',
                  transform: animating ? 'scale(0.95)' : 'scale(1)'
                }}
              >
                {cell !== 0 && cell}
              </div>
            ))
          )}
        </div>

        {hasWon && !gameOver && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold mb-2" style={{ color: 'var(--color-yellow)' }}>
                {t('game2048.you_win')}
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text)' }}>
                {t('game2048.you_reached')}
              </p>
              <button
                onClick={() => setHasWon(false)}
                className="rounded-lg px-4 py-2 text-sm font-bold transition-colors"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-base)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('game2048.keep_playing')}
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold mb-2" style={{ color: 'var(--color-red)' }}>
                {t('game2048.game_over')}
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text)' }}>
                {t('game2048.final_score')}: {score}
              </p>
              <button
                onClick={initBoard}
                className="rounded-lg px-6 py-2 text-sm font-bold transition-colors"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-base)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('game2048.try_again')}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-center" style={{ color: 'var(--color-subtext0)' }}>
        {t('game2048.instructions')}
      </p>
    </div>
  );
});

export default Game2048;
