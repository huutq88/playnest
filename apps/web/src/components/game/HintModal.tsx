'use client';

import React from 'react';
import { Lightbulb, X } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const HintModal: React.FC = () => {
  const { isHintModalOpen, hintText, closeHintModal } = useGameStore();

  if (!isHintModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm p-6 bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-4">
        <button
          onClick={closeHintModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center text-amber-400">
          <Lightbulb className="w-8 h-8 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-white">Level Hint</h3>

        <div className="w-full p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-200 text-sm leading-relaxed font-medium">
          "{hintText}"
        </div>

        <button
          onClick={closeHintModal}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Got It!
        </button>
      </div>
    </div>
  );
};
