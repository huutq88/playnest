export interface PlayNestSDKConfig {
  gameId: string;
  debug?: boolean;
  onPause?: () => void;
  onResume?: () => void;
}

export interface ScoreData {
  score: number;
  level?: number;
  metadata?: Record<string, any>;
}

export class PlayNestSDK {
  private static instance: PlayNestSDK | null = null;
  private config: PlayNestSDKConfig | null = null;
  private initialized = false;
  private listeners: Map<string, Array<(data?: any) => void>> = new Map();

  private constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("message", this.handleHostMessage.bind(this));
    }
  }

  public static getInstance(): PlayNestSDK {
    if (!PlayNestSDK.instance) {
      PlayNestSDK.instance = new PlayNestSDK();
    }
    return PlayNestSDK.instance;
  }

  public init(config: PlayNestSDKConfig): Promise<boolean> {
    this.config = config;
    this.initialized = true;
    this.log("PlayNest Game SDK v1.0.0 Initialized for Game:", config.gameId);

    // Send ready event to parent window if in iframe
    this.postToHost("PLAYNEST_GAME_READY", { gameId: config.gameId });

    return Promise.resolve(true);
  }

  public submitScore(scoreData: ScoreData): void {
    this.ensureInitialized();
    this.log("Submitting score to PlayNest Leaderboard:", scoreData);
    this.postToHost("PLAYNEST_SUBMIT_SCORE", {
      gameId: this.config!.gameId,
      ...scoreData,
      timestamp: new Date().toISOString(),
    });
  }

  public saveProgress(key: string, value: any): void {
    this.ensureInitialized();
    this.log(`Saving progress key [${key}]:`, value);
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(`playnest_save_${this.config!.gameId}_${key}`, JSON.stringify(value));
      } catch (err) {
        console.warn("[PlayNest SDK] LocalStorage save failed", err);
      }
    }
    this.postToHost("PLAYNEST_SAVE_PROGRESS", {
      gameId: this.config!.gameId,
      key,
      value,
    });
  }

  public loadProgress<T = any>(key: string): T | null {
    this.ensureInitialized();
    if (typeof localStorage !== "undefined") {
      try {
        const item = localStorage.getItem(`playnest_save_${this.config!.gameId}_${key}`);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    }
    return null;
  }

  public completeLevel(levelId: string | number, score?: number): void {
    this.ensureInitialized();
    this.log(`Level Complete [${levelId}], Score:`, score);
    this.postToHost("PLAYNEST_LEVEL_COMPLETE", {
      gameId: this.config!.gameId,
      levelId,
      score: score ?? 0,
    });
  }

  public on(event: "pause" | "resume" | "mute" | "unmute", callback: (data?: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  private handleHostMessage(event: MessageEvent): void {
    if (!event.data || typeof event.data !== "object") return;
    const { type, payload } = event.data;

    if (type === "PLAYNEST_HOST_PAUSE") {
      this.triggerEvent("pause", payload);
      this.config?.onPause?.();
    } else if (type === "PLAYNEST_HOST_RESUME") {
      this.triggerEvent("resume", payload);
      this.config?.onResume?.();
    }
  }

  private triggerEvent(event: string, data?: any): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((fn) => fn(data));
    }
  }

  private postToHost(type: string, payload: any): void {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      window.parent.postMessage({ type, payload }, "*");
    }
  }

  private ensureInitialized(): void {
    if (!this.initialized || !this.config) {
      throw new Error("[PlayNest SDK] Must call PlayNestSDK.getInstance().init(...) before using SDK methods!");
    }
  }

  private log(...args: any[]): void {
    if (this.config?.debug) {
      console.log("[PlayNest Game SDK]", ...args);
    }
  }
}

export const sdk = PlayNestSDK.getInstance();
