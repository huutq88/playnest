'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lightbulb, RotateCcw, Star, Heart, Trophy } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

interface GameHUDProps {
  levelNumber: number;
  totalLevels: number;
  hintText: string;
  onRestart: () => void;
  onOpenLeaderboard?: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  levelNumber,
  totalLevels,
  hintText,
  onRestart,
  onOpenLeaderboard,
}) => {
  const { hintBalance, coins, stars, lives, useHint, openHintModal } = useGameStore();

  const handleHintClick = () => {
    if (useHint()) {
      openHintModal(hintText);
    } else {
      alert('You have run out of hints!');
    }
  };

  return (
    <header className="w-full max-w-[440px] mx-auto px-3 py-2.5 flex items-center justify-between bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl text-white mb-3">
      {/* Left: Back Button & Stats (Stars & Coins) */}
      <div className="flex items-center gap-2">
        <Link
          href="/levels"
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
          aria-label="Back to level list"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        {/* Stars Pill */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{stars}</span>
        </div>

        {/* Leaderboard Button */}
        {onOpenLeaderboard && (
          <button
            onClick={onOpenLeaderboard}
            className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25 transition-colors cursor-pointer"
            aria-label="Open Leaderboard"
          >
            <Trophy className="w-4 h-4 fill-amber-400" />
          </button>
        )}
      </div>

      {/* Center: Level Pill Badge */}
      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-extrabold shadow-sm tracking-wide uppercase">
        Lvl {levelNumber}/{totalLevels}
      </div>

      {/* Right: Hint (with + badge), Lives, Restart */}
      <div className="flex items-center gap-2">
        {/* Hint Button */}
        <button
          onClick={handleHintClick}
          className="relative p-2 rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-400/20 border border-amber-500/40 text-amber-300 hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-sm"
          aria-label="Hint"
        >
          <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-amber-500 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-md border border-amber-300">
            {hintBalance}
          </span>
        </button>

        {/* Lives Pill */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>{lives}</span>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Restart Level"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
