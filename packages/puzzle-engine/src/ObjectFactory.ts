import * as Phaser from 'phaser';
import { GameObjectSpec } from '@playnest/level-schema';

export class ObjectFactory {
  public static createObject(
    scene: Phaser.Scene,
    spec: GameObjectSpec,
    canvasWidth: number,
    canvasHeight: number
  ): Phaser.GameObjects.GameObject {
    const x = spec.position.x * canvasWidth;
    const y = spec.position.y * canvasHeight;

    let gameObject: Phaser.GameObjects.GameObject;

    switch (spec.type) {
      case 'sprite': {
        const key = spec.asset && scene.textures.exists(spec.asset) ? spec.asset : 'default_box';
        const sprite = scene.add.sprite(x, y, key);
        sprite.setScale(spec.scale);
        sprite.setRotation(Phaser.Math.DegToRad(spec.rotation));
        gameObject = sprite;
        break;
      }
      case 'shape': {
        const color = spec.color ? parseInt(spec.color.replace('#', '0x'), 16) : 0x3b82f6;
        if (spec.shapeType === 'circle') {
          const radius = spec.radius || 40;
          const circle = scene.add.circle(x, y, radius, color);
          circle.setStrokeStyle(2, 0xffffff);
          gameObject = circle;
        } else {
          const w = spec.width || 100;
          const h = spec.height || 100;
          const rect = scene.add.rectangle(x, y, w, h, color);
          rect.setStrokeStyle(2, 0xffffff);
          gameObject = rect;
        }
        break;
      }
      case 'text': {
        const textStr = spec.text || '';
        const textObj = scene.add.text(x, y, textStr, {
          fontFamily: 'Outfit, sans-serif',
          fontSize: `${24 * spec.scale}px`,
          color: spec.color || '#1e293b',
          align: 'center',
          wordWrap: { width: canvasWidth * 0.8 },
        });
        textObj.setOrigin(0.5, 0.5);
        gameObject = textObj;
        break;
      }
      case 'zone': {
        const w = (spec.width || 100) * spec.scale;
        const h = (spec.height || 100) * spec.scale;
        const zone = scene.add.zone(x, y, w, h);
        gameObject = zone;
        break;
      }
      default:
        throw new Error(`Unsupported game object type: ${spec.type}`);
    }

    gameObject.setName(spec.id);
    if ('setVisible' in gameObject && typeof (gameObject as any).setVisible === 'function') {
      (gameObject as any).setVisible(spec.visible);
    }

    if ('setDepth' in gameObject && typeof (gameObject as any).setDepth === 'function') {
      (gameObject as any).setDepth(spec.zIndex);
    }

    return gameObject;
  }
}
