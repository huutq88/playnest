export interface UserSaveData {
  gameId: string;
  currentLevel: number;
  completedLevels: number[];
  hintBalance: number;
  coins: number;
  stars: number;
  lives: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  lastPlayedAt: string;
}

export interface LevelCompleteResult {
  savedData: UserSaveData;
  earnedStars: number;
  earnedCoins: number;
  solveTimeSeconds: number;
}

const SAVE_KEY_PREFIX = 'playnest_save_';

export class SaveManager {
  private gameId: string;

  constructor(gameId: string = 'tricky-brain') {
    this.gameId = gameId;
  }

  private getKey(): string {
    return `${SAVE_KEY_PREFIX}${this.gameId}`;
  }

  public getSaveData(): UserSaveData {
    if (typeof window === 'undefined') {
      return this.getDefaultSaveData();
    }

    try {
      const raw = localStorage.getItem(this.getKey());
      if (!raw) {
        const defaultData = this.getDefaultSaveData();
        this.saveData(defaultData);
        return defaultData;
      }
      const parsed = JSON.parse(raw) as UserSaveData;
      if (!Array.isArray(parsed.completedLevels)) {
        parsed.completedLevels = [];
      }
      if (parsed.coins === undefined) parsed.coins = parsed.completedLevels.length * 5;
      if (parsed.stars === undefined) parsed.stars = parsed.completedLevels.length * 3;
      if (parsed.lives === undefined) parsed.lives = 3;
      if (parsed.hintBalance === undefined) parsed.hintBalance = 3;
      return parsed;
    } catch (e) {
      console.error('Error loading save data:', e);
      return this.getDefaultSaveData();
    }
  }

  public saveData(data: UserSaveData): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.getKey(), JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }

  /**
   * Complete Level with dynamic time-based rating:
   * - Under 10s: 3 Stars ⭐⭐⭐ & 5 Points 🪙
   * - Under 20s: 2 Stars ⭐⭐ & 3 Points 🪙
   * - Otherwise: 1 Star ⭐ & 1 Point 🪙
   */
  public completeLevel(levelNumber: number, solveTimeSeconds: number = 15): LevelCompleteResult {
    const data = this.getSaveData();

    // Calculate rating based on solve time
    let earnedStars = 1;
    let earnedCoins = 1;

    if (solveTimeSeconds < 10) {
      earnedStars = 3;
      earnedCoins = 5;
    } else if (solveTimeSeconds < 20) {
      earnedStars = 2;
      earnedCoins = 3;
    } else {
      earnedStars = 1;
      earnedCoins = 1;
    }

    if (!data.completedLevels.includes(levelNumber)) {
      data.completedLevels.push(levelNumber);
      data.coins += earnedCoins;
      data.stars += earnedStars;
    }

    if (levelNumber >= data.currentLevel) {
      data.currentLevel = levelNumber + 1;
    }
    data.lastPlayedAt = new Date().toISOString();
    this.saveData(data);

    return {
      savedData: data,
      earnedStars,
      earnedCoins,
      solveTimeSeconds,
    };
  }

  public useHint(): boolean {
    const data = this.getSaveData();
    if (data.hintBalance > 0) {
      data.hintBalance -= 1;
      this.saveData(data);
      return true;
    }
    return false;
  }

  public addHints(count: number = 3): number {
    const data = this.getSaveData();
    data.hintBalance += count;
    this.saveData(data);
    return data.hintBalance;
  }

  public toggleSound(enabled?: boolean): boolean {
    const data = this.getSaveData();
    data.soundEnabled = enabled !== undefined ? enabled : !data.soundEnabled;
    this.saveData(data);
    return data.soundEnabled;
  }

  private getDefaultSaveData(): UserSaveData {
    return {
      gameId: this.gameId,
      currentLevel: 1,
      completedLevels: [],
      hintBalance: 3,
      coins: 0,
      stars: 0,
      lives: 3,
      soundEnabled: true,
      musicEnabled: true,
      lastPlayedAt: new Date().toISOString(),
    };
  }
}

export const saveManager = new SaveManager('tricky-brain');
