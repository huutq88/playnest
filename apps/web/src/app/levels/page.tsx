'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Star } from 'lucide-react';
import { LevelLoader } from '@playnest/puzzle-engine/loader';
import { LevelManifest } from '@playnest/level-schema';
import { useGameStore } from '@/store/useGameStore';

export default function LevelsPage() {
  const [manifest, setManifest] = useState<LevelManifest | null>(null);
  const [loading, setLoading] = useState(true);
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

  const levelTitles: Record<number, string> = {
    1: 'Feed the Hungry Cat',
    2: 'Open the Mystery Box',
    3: 'Find the Hidden Key',
    4: 'Balance the Scale',
    5: 'Extinguish the Fire',
    6: 'Rescue the Puppy',
    7: 'Find the Real Diamond',
    8: 'Fix the Broken Clock',
    9: 'Escape the Room',
  };

  const maxUnlockedLevel = Math.max(1, ...completedLevels, currentLevel);
  const totalGridLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="min-h-screen bg-[#0D0F23] text-slate-100 flex flex-col justify-center items-center p-3 md:p-6 overflow-hidden selection:bg-purple-600 selection:text-white relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-96 bg-gradient-to-b from-blue-600/20 via-purple-600/15 to-transparent blur-3xl pointer-events-none" />

      {/* Main Centered 9:16 Phone-Style Container matching Gameplay Screen Layout */}
      <div className="w-full max-w-[440px] flex flex-col items-center gap-3 relative z-10 my-auto">
        {/* Top Header matching GameHUD dimensions */}
        <header className="w-full px-3 py-2.5 flex items-center justify-between bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl text-white">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          {/* Top Stats: Stars & Coins */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-extrabold shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{stars}</span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-xs font-extrabold shadow-sm">
              <span className="text-sm">🪙</span>
              <span>{coins}</span>
            </div>
          </div>
        </header>

        {/* 9:16 Canvas/Container Wrapper matching Gameplay Frame */}
        <div className="w-full aspect-[9/16] bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between overflow-y-auto">
          {/* Section Title */}
          <div className="text-center space-y-1 py-1">
            <h1 className="text-3xl font-black text-white tracking-wider uppercase">LEVELS</h1>
            <p className="text-slate-400 text-xs font-medium">Select a level to play and challenge your brain!</p>
          </div>

          {/* Level Buttons Grid (3x3 Grid matching Section 3) */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 py-2 my-auto">
              {totalGridLevels.map((num) => {
                const manifestLvl = manifest?.levels.find((l) => l.levelNumber === num);
                const isAvailableInManifest = !!manifestLvl;
                const isUnlocked = num <= maxUnlockedLevel && isAvailableInManifest;
                const isCompleted = completedLevels.includes(num);
                const isCurrent = num === currentLevel && isAvailableInManifest;

                return (
                  <div key={num} className="flex flex-col items-center gap-1.5">
                    {isUnlocked ? (
                      <Link
                        href={`/play/tricky-brain?level=${num}`}
                        className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center text-xl font-black transition-all shadow-xl active:scale-95 border-2 cursor-pointer ${
                          isCurrent
                            ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-500 text-white border-pink-400 shadow-purple-500/40 animate-pulse'
                            : 'bg-gradient-to-b from-purple-700 via-purple-800 to-indigo-900 text-white border-purple-400/40 hover:border-purple-300'
                        }`}
                      >
                        <span>{num}</span>
                      </Link>
                    ) : (
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center text-slate-600 shadow-inner">
                        <Lock className="w-6 h-6 text-slate-600" />
                      </div>
                    )}

                    {/* 3 Stars Rating under each level number matching Section 3 */}
                    <div className="flex items-center gap-0.5">
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

                    <span className="text-[10px] font-semibold text-slate-400 text-center truncate max-w-[80px]">
                      {levelTitles[num] || `Level ${num}`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer inside mobile frame */}
          <div className="text-center text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
            <p>© 2026 PlayNest.zone</p>
          </div>
        </div>
      </div>
    </div>
  );
}
