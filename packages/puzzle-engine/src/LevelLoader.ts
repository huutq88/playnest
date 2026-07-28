import { LevelSpec, LevelSchema, LevelManifest, LevelManifestSchema } from '@playnest/level-schema';

export class LevelLoader {
  private static manifestCache: Map<string, LevelManifest> = new Map();
  private static levelCache: Map<string, LevelSpec> = new Map();

  public static async loadManifest(gameId: string = 'tricky-brain'): Promise<LevelManifest> {
    if (this.manifestCache.has(gameId)) {
      return this.manifestCache.get(gameId)!;
    }

    const response = await fetch(`/levels/manifest.json?v=${Date.now()}`, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to load level manifest for game ${gameId}`);
    }

    const data = await response.json();
    const parsed = LevelManifestSchema.parse(data);
    this.manifestCache.set(gameId, parsed);
    return parsed;
  }

  public static async loadLevel(gameId: string, levelNumber: number): Promise<LevelSpec> {
    const cacheKey = `${gameId}_${levelNumber}`;
    if (this.levelCache.has(cacheKey)) {
      return this.levelCache.get(cacheKey)!;
    }

    const manifest = await this.loadManifest(gameId);
    let levelInfo = manifest.levels.find((l) => l.levelNumber === levelNumber);

    // Fallback if levelInfo is missing
    const fileName = levelInfo ? levelInfo.file : `level-${String(levelNumber).padStart(3, '0')}.json`;

    const response = await fetch(`/levels/${fileName}?v=${Date.now()}`, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch level file ${fileName}`);
    }

    const rawData = await response.json();
    const parsedLevel = LevelSchema.parse(rawData);

    this.levelCache.set(cacheKey, parsedLevel);
    return parsedLevel;
  }
}
