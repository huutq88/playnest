import { create } from 'zustand';
import { saveManager } from '@playnest/puzzle-engine/save';
import { db, initAnalytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getOrCreateGuestUser, setGuestNickname } from '@/lib/user';

interface GameState {
  currentLevel: number;
  completedLevels: number[];
  hintBalance: number;
  coins: number;
  stars: number;
  lives: number;
  soundEnabled: boolean;
  isVictoryModalOpen: boolean;
  isHintModalOpen: boolean;
  hintText: string;
  guestId: string;
  nickname: string;

  // Actions
  initSaveData: () => void;
  updateNickname: (name: string) => void;
  setCurrentLevel: (level: number) => void;
  completeCurrentLevel: () => void;
  useHint: () => boolean;
  toggleSound: () => void;
  openVictoryModal: () => void;
  closeVictoryModal: () => void;
  openHintModal: (hintText: string) => void;
  closeHintModal: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentLevel: 1,
  completedLevels: [],
  hintBalance: 3,
  coins: 0,
  stars: 0,
  lives: 3,
  soundEnabled: true,
  isVictoryModalOpen: false,
  isHintModalOpen: false,
  hintText: '',
  guestId: '',
  nickname: '',

  initSaveData: () => {
    const data = saveManager.getSaveData();
    const { guestId, nickname } = getOrCreateGuestUser();
    set({
      currentLevel: data.currentLevel,
      completedLevels: data.completedLevels,
      hintBalance: data.hintBalance,
      coins: data.coins ?? 0,
      stars: data.stars ?? 0,
      lives: data.lives ?? 3,
      soundEnabled: data.soundEnabled,
      guestId,
      nickname,
    });
  },

  updateNickname: (name: string) => {
    const newName = setGuestNickname(name);
    set({ nickname: newName });
    const { guestId, stars, coins, completedLevels } = get();

    if (typeof window !== 'undefined' && guestId) {
      try {
        const userRef = doc(db, 'leaderboards', 'tricky-brain', 'scores', guestId);
        setDoc(
          userRef,
          {
            guestId,
            nickname: newName,
            stars,
            coins,
            completedCount: completedLevels.length,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        ).catch(() => {});
      } catch (e) {
        // Silently handle offline mode
      }
    }
  },

  setCurrentLevel: (level: number) => {
    set({ currentLevel: level });
    // Log level start to Firebase Analytics
    initAnalytics()
      .then((analytics) => {
        if (analytics) {
          logEvent(analytics, 'level_start', {
            game_id: 'tricky-brain',
            level_number: level,
          });
        }
      })
      .catch(() => {});
  },

  completeCurrentLevel: () => {
    const state = get();
    const updated = saveManager.completeLevel(state.currentLevel);
    set({
      completedLevels: updated.completedLevels,
      coins: updated.coins,
      stars: updated.stars,
      isVictoryModalOpen: true,
    });

    // 1. Sync to Firebase GA4 Analytics
    initAnalytics()
      .then((analytics) => {
        if (analytics) {
          logEvent(analytics, 'level_complete', {
            game_id: 'tricky-brain',
            level_number: state.currentLevel,
            coins_earned: 10,
            stars_earned: 3,
          });
        }
      })
      .catch(() => {});

    // 2. Sync to Cloud Firestore Leaderboard
    if (typeof window !== 'undefined' && state.guestId) {
      try {
        const userRef = doc(db, 'leaderboards', 'tricky-brain', 'scores', state.guestId);
        setDoc(
          userRef,
          {
            guestId: state.guestId,
            nickname: state.nickname || 'Guest Gamer',
            stars: updated.stars,
            coins: updated.coins,
            completedCount: updated.completedLevels.length,
            lastLevelCompleted: state.currentLevel,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        ).catch(() => {});
      } catch (e) {
        // Silently handle offline/guest mode
      }
    }
  },

  useHint: () => {
    const success = saveManager.useHint();
    if (success) {
      const data = saveManager.getSaveData();
      set({ hintBalance: data.hintBalance });

      // Log hint usage to Firebase Analytics
      initAnalytics()
        .then((analytics) => {
          if (analytics) {
            logEvent(analytics, 'use_hint', {
              game_id: 'tricky-brain',
              level_number: get().currentLevel,
              hints_remaining: data.hintBalance,
            });
          }
        })
        .catch(() => {});
    }
    return success;
  },

  toggleSound: () => {
    const sound = saveManager.toggleSound();
    set({ soundEnabled: sound });
  },

  openVictoryModal: () => set({ isVictoryModalOpen: true }),
  closeVictoryModal: () => set({ isVictoryModalOpen: false }),
  openHintModal: (hintText: string) => set({ isHintModalOpen: true, hintText }),
  closeHintModal: () => set({ isHintModalOpen: false, hintText: '' }),
}));
