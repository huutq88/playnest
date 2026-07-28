import { useEffect } from 'react';
import { initAnalytics, db } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const useFirebaseSync = (userId: string = 'guest_user') => {
  // Key Analytics Event Logger
  const logGameEvent = async (eventName: string, params?: Record<string, any>) => {
    try {
      const analytics = await initAnalytics();
      if (analytics) {
        logEvent(analytics, eventName, params);
      }
    } catch (error) {
      console.warn('Analytics logging skipped:', error);
    }
  };

  // Sync Level Progress to Firestore
  const syncLevelProgress = async (gameId: string, levelIndex: number, stars: number = 3) => {
    try {
      const userProgressRef = doc(db, 'users', userId, 'progress', gameId);
      await setDoc(
        userProgressRef,
        {
          currentLevel: levelIndex,
          [`level_${levelIndex}_stars`]: stars,
          lastPlayedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Also log event
      await logGameEvent('level_complete', {
        game_id: gameId,
        level_index: levelIndex,
        stars,
      });
    } catch (error) {
      console.warn('Firestore progress sync skipped:', error);
    }
  };

  useEffect(() => {
    // Initial pageview / app launch event
    logGameEvent('page_view', { page_title: 'PlayNest Home' });
  }, []);

  return {
    logGameEvent,
    syncLevelProgress,
  };
};
