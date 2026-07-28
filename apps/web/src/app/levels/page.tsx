'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Star, Trophy } from 'lucide-react';
import { LevelLoader } from '@playnest/puzzle-engine/loader';
import { LevelManifest } from '@playnest/level-schema';
import { useGameStore } from '@/store/useGameStore';
import { LeaderboardModal } from '@/components/game/LeaderboardModal';

export default function LevelsPage() {
  const [manifest, setManifest] = useState<LevelManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const { currentLevel, completedLevels, stars, coins, initSaveData } = useGameStore();

  useEffect(() => {
    initSaveData();
    LevelLoader.loadManifest('tricky-brain')
      .then((data) => {
        setManifest(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading manifest:', err);
        setLoading(false);
      });
  }, [initSaveData]);

  const totalLevelsCount = 50;
  const maxUnlockedLevel = Math.max(1, ...completedLevels, currentLevel);
  const levelsList = Array.from({ length: totalLevelsCount }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0D0F23] text-slate-100 flex flex-col justify-start items-center p-3 sm:p-6 overflow-y-auto selection:bg-purple-600 selection:text-white relative">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-96 bg-gradient-to-b from-blue-600/20 via-purple-600/15 to-transparent blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[500px] flex flex-col items-center gap-4 relative z-10 py-2">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-30 w-full px-4 py-3 flex items-center justify-between bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl text-white">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{stars} Stars</span>
            </div>

            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25 transition-colors cursor-pointer"
              aria-label="Open Leaderboard"
            >
              <Trophy className="w-4 h-4 fill-amber-400" />
            </button>
          </div>
        </header>

        {/* Levels Selection Board Frame */}
        <div className="w-full bg-gradient-to-b from-slate-900/90 via-[#131738]/90 to-[#0F122B]/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex flex-col space-y-6">
          {/* Section Title */}
          <div className="text-center space-y-1 pt-2">
            <h1 className="text-3xl font-black text-white tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SELECT LEVEL
            </h1>
            <p className="text-slate-400 text-xs font-medium">50 Tricky Brain Quest Puzzles Unlocked</p>
          </div>

          {/* Level Buttons Grid (3 Columns, 50 Levels Total) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 py-2">
            {levelsList.map((num) => {
              const manifestLvl = manifest?.levels.find((l) => l.levelNumber === num);
              const isUnlocked = num <= maxUnlockedLevel;
              const isCompleted = completedLevels.includes(num);
              const isCurrent = num === currentLevel;

              return (
                <div key={num} className="flex flex-col items-center gap-1.5">
                  {isUnlocked ? (
                    <Link
                      href={`/play/tricky-brain?level=${num}`}
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center text-xl font-black transition-all shadow-xl active:scale-95 border-2 cursor-pointer ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-500 text-white border-pink-400 shadow-purple-500/50 animate-pulse'
                          : isCompleted
                          ? 'bg-gradient-to-b from-purple-700 via-purple-800 to-indigo-900 text-white border-purple-400/50 hover:border-purple-300'
                          : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-purple-400'
                      }`}
                    >
                      <span className="text-2xl font-black">{num}</span>
                    </Link>
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center text-slate-600 shadow-inner">
                      <Lock className="w-6 h-6 text-slate-600" />
                    </div>
                  )}

                  {/* 3 Stars Rating */}
                  <div className="flex items-center gap-0.5 pt-0.5">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-3 h-3 ${
                          isCompleted
                            ? 'fill-amber-400 text-amber-400'
                            : isUnlocked && starIdx <= 2
                            ? 'fill-amber-400/80 text-amber-400/80'
                            : 'text-slate-700 fill-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 text-center truncate max-w-[90px] leading-tight">
                    {manifestLvl?.title || `Level ${num}`}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer inside mobile frame */}
          <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-800/60">
            <p>© 2026 PlayNest.zone • All 50 Puzzles Ready</p>
          </div>
        </div>
      </div>

      <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    </div>
  );
}
