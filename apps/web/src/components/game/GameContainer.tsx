'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { LevelSpec } from '@playnest/level-schema';
import { createPhaserConfig } from '@/game/config';
import { GameplaySceneData } from '@/game/scenes/GameplayScene';
import { useGameStore } from '@/store/useGameStore';

interface GameContainerProps {
  levelSpec: LevelSpec;
}

export const GameContainer: React.FC<GameContainerProps> = ({ levelSpec }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const completeCurrentLevel = useGameStore((state) => state.completeCurrentLevel);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerId = 'phaser-canvas-container';
    containerRef.current.id = containerId;

    const sceneData: GameplaySceneData = {
      levelSpec,
      onLevelComplete: (solveTimeSeconds: number) => {
        completeCurrentLevel(solveTimeSeconds);
      },
    };

    const config = createPhaserConfig(containerId);
    const game = new Phaser.Game(config);
    gameRef.current = game;

    game.registry.set('gameData', sceneData);

    setIsLoaded(true);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [levelSpec, completeCurrentLevel]);

  return (
    <div className="relative w-full max-w-[420px] aspect-[9/16] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
      <div ref={containerRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white font-medium">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-amber-300 font-semibold tracking-wide">Loading level...</span>
          </div>
        </div>
      )}
    </div>
  );
};
