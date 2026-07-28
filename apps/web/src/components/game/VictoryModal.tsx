'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, ArrowRight, Home, Trophy, Sparkles } from 'lucide-react';
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
  const { isVictoryModalOpen, closeVictoryModal } = useGameStore();

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

        {/* 3 Glowing Stars matching Win Modal in Section 3 */}
        <div className="flex items-center gap-3 pt-2">
          <Star className="w-10 h-10 text-amber-400 fill-amber-400 -rotate-12 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-bounce" style={{ animationDelay: '100ms' }} />
          <Star className="w-14 h-14 text-amber-400 fill-amber-400 drop-shadow-[0_0_16px_rgba(245,158,11,0.8)] animate-bounce" style={{ animationDelay: '0ms' }} />
          <Star className="w-10 h-10 text-amber-400 fill-amber-400 rotate-12 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-bounce" style={{ animationDelay: '200ms' }} />
        </div>

        {/* Header & Subtitle */}
        <div className="space-y-1 z-10">
          <h2 className="text-3xl font-black text-white tracking-tight">
            {hasNextLevel ? 'Awesome!' : 'Congratulations! 🎉'}
          </h2>
          <p className="text-slate-300 text-sm font-medium">
            {hasNextLevel
              ? `You completed Level ${levelNumber}`
              : `You completed all ${totalLevels} available levels!`}
          </p>
        </div>

        {/* Reward Badge or All Completed Banner */}
        {hasNextLevel ? (
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-extrabold text-base shadow-inner">
            <span className="text-xl">🪙</span>
            <span>+10</span>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-400/30 text-left space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Brain Master Unlocked!</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              New tricky puzzle levels are under active development. Stay tuned for upcoming updates!
            </p>
          </div>
        )}

        {/* Action Buttons matching Section 3 */}
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
            href="/"
            onClick={closeVictoryModal}
            className="w-full py-3.5 px-6 bg-slate-800/90 hover:bg-slate-750 text-slate-200 font-bold rounded-2xl border border-slate-700/60 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
