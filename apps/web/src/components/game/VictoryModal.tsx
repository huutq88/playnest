'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, ArrowRight, Home, Trophy, Sparkles, Zap, Timer } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/store/useGameStore';

interface VictoryModalProps {
  levelNumber: number;
  totalLevels: number;
  onNextLevel: () => void;
  onRestartLevel: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  levelNumber,
  totalLevels,
  onNextLevel,
}) => {
  const { isVictoryModalOpen, closeVictoryModal, lastEarnedStars, lastEarnedCoins, lastSolveTimeSeconds } = useGameStore();

  useEffect(() => {
    if (isVictoryModalOpen) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#facc15'],
      });
    }
  }, [isVictoryModalOpen]);

  if (!isVictoryModalOpen) return null;

  const hasNextLevel = levelNumber < totalLevels;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="w-full max-w-sm p-7 bg-slate-900 border border-purple-500/40 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-5 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* 3 Stars Dynamic Rating */}
        <div className="flex items-center gap-3 pt-2">
          {/* Star 1 */}
          <Star
            className={`w-10 h-10 -rotate-12 transition-all ${
              lastEarnedStars >= 1
                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-bounce'
                : 'text-slate-700 fill-slate-800 opacity-40'
            }`}
            style={{ animationDelay: '100ms' }}
          />

          {/* Star 2 (Center) */}
          <Star
            className={`w-14 h-14 transition-all ${
              lastEarnedStars >= 2
                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_16px_rgba(245,158,11,0.9)] animate-bounce'
                : 'text-slate-700 fill-slate-800 opacity-40'
            }`}
            style={{ animationDelay: '0ms' }}
          />

          {/* Star 3 */}
          <Star
            className={`w-10 h-10 rotate-12 transition-all ${
              lastEarnedStars >= 3
                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-bounce'
                : 'text-slate-700 fill-slate-800 opacity-40'
            }`}
            style={{ animationDelay: '200ms' }}
          />
        </div>

        {/* Header & Subtitle */}
        <div className="space-y-1 z-10">
          <h2 className="text-3xl font-black text-white tracking-tight">
            {lastEarnedStars === 3 ? 'Lightning Speed! ⚡' : lastEarnedStars === 2 ? 'Great Job! 🎉' : 'Level Solved! 👍'}
          </h2>
          <p className="text-slate-300 text-sm font-medium">
            Completed Level {levelNumber} in <span className="text-cyan-400 font-extrabold">{lastSolveTimeSeconds}s</span>
          </p>
        </div>

        {/* Time Rating & Rewards Badge */}
        <div className="w-full flex flex-col gap-2 z-10">
          {/* Time Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
            <Timer className="w-4 h-4 text-cyan-400" />
            <span>
              {lastSolveTimeSeconds < 10
                ? 'Under 10s: 3 Stars ⭐⭐⭐'
                : lastSolveTimeSeconds < 20
                ? 'Under 20s: 2 Stars ⭐⭐'
                : 'Over 20s: 1 Star ⭐'}
            </span>
          </div>

          {/* Coins Earned Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-extrabold text-base shadow-inner">
            <span className="text-xl">🪙</span>
            <span>+{lastEarnedCoins} Coins</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 pt-1 z-10">
          {hasNextLevel ? (
            <button
              onClick={() => {
                closeVictoryModal();
                onNextLevel();
              }}
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 text-base active:scale-95 cursor-pointer"
            >
              <span>Next Level</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link
              href="/levels"
              onClick={closeVictoryModal}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 hover:from-emerald-400 text-white font-extrabold rounded-2xl shadow-xl shadow-teal-600/30 flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              <span>View All Levels</span>
            </Link>
          )}

          <Link
            href="/levels"
            onClick={closeVictoryModal}
            className="w-full py-3.5 px-6 bg-slate-800/90 hover:bg-slate-750 text-slate-200 font-bold rounded-2xl border border-slate-700/60 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Level List</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
