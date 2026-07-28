import * as Phaser from 'phaser';
import { LevelSpec } from '@playnest/level-schema';
import { ObjectFactory, InteractionEngine, RuleEngine } from '@playnest/puzzle-engine';

export interface GameplaySceneData {
  levelSpec: LevelSpec;
  onLevelComplete: () => void;
  onLevelFailed?: () => void;
}

export class GameplayScene extends Phaser.Scene {
  private levelSpec!: LevelSpec;
  private objectsMap: Map<string, Phaser.GameObjects.GameObject> = new Map();
  private interactionEngine!: InteractionEngine;
  private ruleEngine!: RuleEngine;
  private onLevelCompleteCallback!: () => void;
  private questionText!: Phaser.GameObjects.Text;

  constructor() {
    super('GameplayScene');
  }

  init(data: GameplaySceneData) {
    this.levelSpec = data.levelSpec;
    this.onLevelCompleteCallback = data.onLevelComplete;
    this.objectsMap.clear();
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    if (this.levelSpec.background.type === 'color') {
      const colorNum = parseInt(this.levelSpec.background.value.replace('#', '0x'), 16);
      this.cameras.main.setBackgroundColor(colorNum);
    }

    // Question / Instruction Header Text
    const qPos = this.levelSpec.question.position || { x: 0.5, y: 0.12 };
    this.questionText = this.add.text(
      width * qPos.x,
      height * qPos.y,
      this.levelSpec.question.text,
      {
        fontFamily: 'Outfit, sans-serif',
        fontSize: '26px',
        color: '#1e293b',
        align: 'center',
        wordWrap: { width: width * 0.85 },
      }
    );
    this.questionText.setOrigin(0.5, 0.5);
    this.questionText.setDepth(100);

    // Spawn Game Objects from Specs
    this.levelSpec.objects.forEach((objSpec) => {
      const obj = ObjectFactory.createObject(this, objSpec, width, height);
      this.objectsMap.set(objSpec.id, obj);
    });

    // Initialize Rule Engine
    this.ruleEngine = new RuleEngine(
      this,
      this.levelSpec.rules,
      this.levelSpec.variables || {},
      this.objectsMap,
      width,
      height,
      {
        onLevelComplete: () => {
          this.handleLevelCompleted();
        },
        onLevelFailed: () => {
          this.handleLevelFailed();
        },
      }
    );

    // Initialize Interaction Engine
    this.interactionEngine = new InteractionEngine(this);
    this.interactionEngine.setupInteractions(this.objectsMap, this.levelSpec.objects, {
      onTap: (objectId, tapCount) => {
        this.ruleEngine.evaluateEvent('tap', objectId, { tapCount });
      },
      onDrop: (objectId, x, y) => {
        const handled = this.ruleEngine.evaluateEvent('drop', objectId, { dropX: x, dropY: y });
        if (!handled && this.interactionEngine.shouldSnapBack(objectId)) {
          const obj = this.objectsMap.get(objectId);
          if (obj) {
            this.interactionEngine.resetInitialPosition(objectId, obj);
          }
        }
      },
    });
  }

  private handleLevelCompleted() {
    this.input.enabled = false;

    this.objectsMap.forEach((obj) => {
      this.tweens.add({
        targets: obj,
        scaleX: (obj as any).scaleX * 1.15,
        scaleY: (obj as any).scaleY * 1.15,
        duration: 250,
        yoyo: true,
        repeat: 1,
      });
    });

    this.time.delayedCall(700, () => {
      if (this.onLevelCompleteCallback) {
        this.onLevelCompleteCallback();
      }
    });
  }

  private handleLevelFailed() {
    this.cameras.main.shake(200, 0.01);
  }

  public getHintHighlightId(): string | undefined {
    return this.levelSpec.hint.highlightObjectId;
  }

  public getHintText(): string {
    return this.levelSpec.hint.text;
  }

  public highlightHintObject(objectId: string): void {
    const obj = this.objectsMap.get(objectId);
    if (obj) {
      this.tweens.add({
        targets: obj,
        scaleX: (obj as any).scaleX * 1.3,
        scaleY: (obj as any).scaleY * 1.3,
        duration: 300,
        yoyo: true,
        repeat: 3,
      });
    }
  }
}
