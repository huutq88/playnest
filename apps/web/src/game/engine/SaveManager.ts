export interface UserSaveData {
  gameId: string;
  currentLevel: number;
  completedLevels: number[];
  hintBalance: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  lastPlayedAt: string;
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
      return JSON.parse(raw) as UserSaveData;
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

  public completeLevel(levelNumber: number): UserSaveData {
    const data = this.getSaveData();
    if (!data.completedLevels.includes(levelNumber)) {
      data.completedLevels.push(levelNumber);
    }
    if (levelNumber >= data.currentLevel) {
      data.currentLevel = levelNumber + 1;
    }
    data.lastPlayedAt = new Date().toISOString();
    this.saveData(data);
    return data;
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
      hintBalance: 5,
      soundEnabled: true,
      musicEnabled: true,
      lastPlayedAt: new Date().toISOString(),
    };
  }
}

export const saveManager = new SaveManager('tricky-brain');
