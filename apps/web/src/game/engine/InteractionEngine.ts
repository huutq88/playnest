import * as Phaser from 'phaser';
import { GameObjectSpec } from '@playnest/level-schema';

export interface InteractionCallbacks {
  onTap?: (objectId: string, tapCount: number) => void;
  onDragStart?: (objectId: string, x: number, y: number) => void;
  onDrag?: (objectId: string, x: number, y: number) => void;
  onDrop?: (objectId: string, x: number, y: number) => void;
}

export class InteractionEngine {
  private scene: Phaser.Scene;
  private tapCounts: Map<string, number> = new Map();
  private initialPositions: Map<string, { x: number; y: number }> = new Map();
  private snapBackConfig: Map<string, boolean> = new Map();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public setupInteractions(
    gameObjectsMap: Map<string, Phaser.GameObjects.GameObject>,
    specs: GameObjectSpec[],
    callbacks: InteractionCallbacks
  ): void {
    specs.forEach((spec) => {
      if (!spec.interactive) return;

      const gameObject = gameObjectsMap.get(spec.id);
      if (!gameObject) return;

      const dragInteraction = spec.interactions?.find((i) => i.type === 'drag');
      const isDraggable = !!dragInteraction;
      const isTappable = spec.interactions?.some((i) => i.type === 'tap') || !isDraggable;

      const snapBack = dragInteraction?.snapBack !== undefined ? dragInteraction.snapBack : true;
      this.snapBackConfig.set(spec.id, snapBack);

      if (typeof (gameObject as any).setInteractive === 'function') {
        (gameObject as any).setInteractive({ useHandCursor: true });
      }
      if (!(gameObject as any).input) {
        this.scene.input.enable(gameObject);
      }

      if (isDraggable) {
        this.scene.input.setDraggable(gameObject);
        this.initialPositions.set(spec.id, { x: (gameObject as any).x, y: (gameObject as any).y });

        gameObject.on('dragstart', (pointer: Phaser.Input.Pointer) => {
          this.scene.children.bringToTop(gameObject);
          callbacks.onDragStart?.(spec.id, pointer.x, pointer.y);
        });

        gameObject.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
          (gameObject as any).x = dragX;
          (gameObject as any).y = dragY;
          callbacks.onDrag?.(spec.id, dragX, dragY);
        });

        gameObject.on('dragend', (pointer: Phaser.Input.Pointer) => {
          callbacks.onDrop?.(spec.id, (gameObject as any).x, (gameObject as any).y);
        });
      }

      if (isTappable) {
        (gameObject as any).on('pointerdown', () => {
          const currentCount = (this.tapCounts.get(spec.id) || 0) + 1;
          this.tapCounts.set(spec.id, currentCount);

          this.scene.tweens.add({
            targets: gameObject,
            scaleX: (gameObject as any).scaleX * 0.9,
            scaleY: (gameObject as any).scaleY * 0.9,
            duration: 80,
            yoyo: true,
          });

          callbacks.onTap?.(spec.id, currentCount);
        });
      }
    });
  }

  public shouldSnapBack(objectId: string): boolean {
    return this.snapBackConfig.get(objectId) ?? true;
  }

  public getTapCount(objectId: string): number {
    return this.tapCounts.get(objectId) || 0;
  }

  public resetInitialPosition(objectId: string, gameObject: Phaser.GameObjects.GameObject): void {
    const initPos = this.initialPositions.get(objectId);
    if (initPos) {
      this.scene.tweens.add({
        targets: gameObject,
        x: initPos.x,
        y: initPos.y,
        duration: 250,
        ease: 'Power2',
      });
    }
  }
}
