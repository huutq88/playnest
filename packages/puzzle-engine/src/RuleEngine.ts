import * as Phaser from 'phaser';
import { RuleSpec, ConditionSpec, ActionSpec } from '@playnest/level-schema';

export interface RuleEngineCallbacks {
  onLevelComplete: () => void;
  onLevelFailed?: () => void;
  onVariableChanged?: (key: string, value: any) => void;
}

export class RuleEngine {
  private scene: Phaser.Scene;
  private rules: RuleSpec[];
  private variables: Record<string, any>;
  private objectsMap: Map<string, Phaser.GameObjects.GameObject>;
  private callbacks: RuleEngineCallbacks;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(
    scene: Phaser.Scene,
    rules: RuleSpec[],
    initialVariables: Record<string, any>,
    objectsMap: Map<string, Phaser.GameObjects.GameObject>,
    canvasWidth: number,
    canvasHeight: number,
    callbacks: RuleEngineCallbacks
  ) {
    this.scene = scene;
    this.rules = rules;
    this.variables = { ...initialVariables };
    this.objectsMap = objectsMap;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.callbacks = callbacks;
  }

  public evaluateEvent(eventType: string, sourceId: string, extraParams: Record<string, any> = {}): boolean {
    let handledAny = false;

    const matchingRules = this.rules.filter(
      (r) => r.event === eventType && (!r.source || r.source === sourceId)
    );

    for (const rule of matchingRules) {
      if (this.evaluateCondition(rule.condition, sourceId, extraParams)) {
        this.executeActions(rule.actions);
        handledAny = true;
      }
    }

    return handledAny;
  }

  private evaluateCondition(condition: ConditionSpec, sourceId: string, extraParams: Record<string, any>): boolean {
    switch (condition.type) {
      case 'overlap': {
        const sourceObj = this.objectsMap.get(sourceId);
        const targetObj = condition.target ? this.objectsMap.get(condition.target) : undefined;
        if (!sourceObj || !targetObj) return false;

        const boundsA = (sourceObj as any).getBounds
          ? (sourceObj as any).getBounds()
          : new Phaser.Geom.Rectangle((sourceObj as any).x - 20, (sourceObj as any).y - 20, 40, 40);

        const boundsB = (targetObj as any).getBounds
          ? (targetObj as any).getBounds()
          : new Phaser.Geom.Rectangle((targetObj as any).x - 20, (targetObj as any).y - 20, 40, 40);

        const isOverlapping = Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
        if (isOverlapping) return true;

        const dist = Phaser.Math.Distance.Between(
          (sourceObj as any).x,
          (sourceObj as any).y,
          (targetObj as any).x,
          (targetObj as any).y
        );
        return dist <= (condition.distanceThreshold || 80);
      }

      case 'variableEquals': {
        if (!condition.variable) return false;
        return this.variables[condition.variable] === condition.value;
      }

      case 'tappedCount': {
        const count = extraParams.tapCount || 0;
        return count >= (condition.count || 1);
      }

      case 'movedToTarget': {
        const sourceObj = this.objectsMap.get(sourceId);
        const targetObj = condition.target ? this.objectsMap.get(condition.target) : undefined;
        if (!sourceObj || !targetObj) return false;
        const dist = Phaser.Math.Distance.Between(
          (sourceObj as any).x,
          (sourceObj as any).y,
          (targetObj as any).x,
          (targetObj as any).y
        );
        return dist <= (condition.distanceThreshold || 50);
      }

      case 'allConditionsCompleted': {
        if (!condition.conditions || condition.conditions.length === 0) return true;
        return condition.conditions.every((cond) => this.evaluateCondition(cond, sourceId, extraParams));
      }

      default:
        return false;
    }
  }

  private executeActions(actions: ActionSpec[]): void {
    actions.forEach((action) => {
      switch (action.type) {
        case 'setVariable': {
          if (action.key) {
            this.variables[action.key] = action.value;
            this.callbacks.onVariableChanged?.(action.key, action.value);
          }
          break;
        }

        case 'playAnimation': {
          const targetObj = action.target ? this.objectsMap.get(action.target) : undefined;
          if (targetObj) {
            if (action.animation === 'eat' || action.animation === 'bounce') {
              this.scene.tweens.add({
                targets: targetObj,
                scaleX: (targetObj as any).scaleX * 1.3,
                scaleY: (targetObj as any).scaleY * 1.3,
                duration: 200,
                yoyo: true,
                repeat: 1,
              });
            } else if (action.animation === 'shake') {
              this.scene.tweens.add({
                targets: targetObj,
                x: (targetObj as any).x + 10,
                duration: 50,
                yoyo: true,
                repeat: 5,
              });
            }
          }
          break;
        }

        case 'moveObject': {
          const targetObj = action.target ? this.objectsMap.get(action.target) : undefined;
          if (targetObj && action.position) {
            const destX = action.position.x * this.canvasWidth;
            const destY = action.position.y * this.canvasHeight;
            this.scene.tweens.add({
              targets: targetObj,
              x: destX,
              y: destY,
              duration: action.duration || 400,
              ease: 'Power2',
            });
          }
          break;
        }

        case 'hideObject': {
          const targetObj = action.target ? this.objectsMap.get(action.target) : undefined;
          if (targetObj && 'setVisible' in targetObj) (targetObj as any).setVisible(false);
          break;
        }

        case 'showObject': {
          const targetObj = action.target ? this.objectsMap.get(action.target) : undefined;
          if (targetObj && 'setVisible' in targetObj) (targetObj as any).setVisible(true);
          break;
        }

        case 'changeSprite': {
          const targetObj = action.target ? this.objectsMap.get(action.target) : undefined;
          if (targetObj && action.newAsset && 'setTexture' in targetObj) {
            if (this.scene.textures.exists(action.newAsset)) {
              (targetObj as any).setTexture(action.newAsset);
            }
          }
          break;
        }

        case 'updateText': {
          const targetObj = action.target ? this.objectsMap.get(action.target) : undefined;
          if (targetObj && action.newText && 'setText' in targetObj) {
            (targetObj as any).setText(action.newText);
          }
          break;
        }

        case 'completeLevel': {
          this.callbacks.onLevelComplete();
          break;
        }

        case 'failAttempt': {
          this.callbacks.onLevelFailed?.();
          break;
        }
      }
    });
  }

  public getVariable(key: string): any {
    return this.variables[key];
  }
}
