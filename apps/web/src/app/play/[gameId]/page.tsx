'use client';

import React, { useEffect, useState, use } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { LevelLoader } from '@playnest/puzzle-engine/loader';
import { LevelSpec, LevelManifest } from '@playnest/level-schema';
import { GameHUD } from '@/components/game/GameHUD';
import { VictoryModal } from '@/components/game/VictoryModal';
import { HintModal } from '@/components/game/HintModal';
import { useGameStore } from '@/store/useGameStore';

// Dynamically import GameContainer with ssr: false so Phaser isn't executed on Node server
const GameContainer = dynamic(
  () => import('@/components/game/GameContainer').then((mod) => mod.GameContainer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[420px] aspect-[9/16] rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-amber-300 font-medium text-sm">Initializing game engine...</span>
      </div>
    ),
  }
);

export default function GamePlayPage({ params }: { params: Promise<{ gameId: string }> }) {
  const resolvedParams = use(params);
  const gameId = resolvedParams.gameId || 'tricky-brain';
  const searchParams = useSearchParams();
  const router = useRouter();

  const levelParam = searchParams.get('level');
  const { currentLevel, setCurrentLevel, initSaveData } = useGameStore();

  const [levelSpec, setLevelSpec] = useState<LevelSpec | null>(null);
  const [manifest, setManifest] = useState<LevelManifest | null>(null);
  const [activeLevelNumber, setActiveLevelNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    initSaveData();
  }, [initSaveData]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const rawRequestedLevel = levelParam ? parseInt(levelParam, 10) : currentLevel;

    LevelLoader.loadManifest(gameId)
      .then((manifestData) => {
        setManifest(manifestData);
        const totalAvailable = manifestData.levels.length;

        // Clamp level number to max available level in manifest so players are not pushed back to level 1
        const validLevelNumber = Math.max(1, Math.min(rawRequestedLevel, totalAvailable));

        setActiveLevelNumber(validLevelNumber);

        return LevelLoader.loadLevel(gameId, validLevelNumber).then((specData) => {
          setLevelSpec(specData);
          setCurrentLevel(validLevelNumber);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error('Failed to load level:', err);
        setError('Failed to load level data!');
        setLoading(false);
      });
  }, [gameId, levelParam, currentLevel, restartKey, setCurrentLevel]);

  const handleRestartLevel = () => {
    setRestartKey((prev) => prev + 1);
  };

  const handleNextLevel = () => {
    const nextLvl = activeLevelNumber + 1;
    if (manifest && nextLvl <= manifest.levels.length) {
      router.push(`/play/${gameId}?level=${nextLvl}`);
    } else {
      router.push('/levels');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-between p-3 md:p-6 overflow-hidden">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Game HUD Header */}
        <GameHUD
          levelNumber={activeLevelNumber}
          totalLevels={manifest?.levels.length || 5}
          hintText={levelSpec?.hint.text || 'Observe the items on screen carefully!'}
          onRestart={handleRestartLevel}
        />

        {/* Main Canvas Area */}
        <main className="w-full flex justify-center items-center my-auto py-1">
          {loading ? (
            <div className="w-full max-w-[420px] aspect-[9/16] rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-amber-300 font-medium text-sm">Loading level data...</span>
            </div>
          ) : error ? (
            <div className="w-full max-w-[420px] aspect-[9/16] rounded-3xl bg-slate-900/80 border border-rose-500/30 flex flex-col items-center justify-center p-6 text-center gap-4">
              <span className="text-rose-400 font-semibold text-sm">{error}</span>
              <button
                onClick={handleRestartLevel}
                className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Try Again
              </button>
            </div>
          ) : levelSpec ? (
            <GameContainer key={`${activeLevelNumber}_${restartKey}`} levelSpec={levelSpec} />
          ) : null}
        </main>
      </div>

      {/* Modals */}
      <VictoryModal
        levelNumber={activeLevelNumber}
        totalLevels={manifest?.levels.length || 5}
        onNextLevel={handleNextLevel}
        onRestartLevel={handleRestartLevel}
      />
      <HintModal />
    </div>
  );
}
