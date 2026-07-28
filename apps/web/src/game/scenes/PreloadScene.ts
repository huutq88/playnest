import * as Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.createFallbackTextures();
  }

  create() {
    const gameData = this.game.registry.get('gameData');
    this.scene.start('GameplayScene', gameData);
  }

  private createFallbackTextures(): void {
    // Cat Hungry texture
    const catGraphic = this.make.graphics({ x: 0, y: 0 });
    catGraphic.fillStyle(0xfb923c, 1);
    catGraphic.fillCircle(60, 60, 50);
    catGraphic.fillTriangle(20, 30, 40, 10, 50, 40);
    catGraphic.fillTriangle(70, 40, 80, 10, 100, 30);
    catGraphic.fillStyle(0xffffff, 1);
    catGraphic.fillCircle(45, 50, 12);
    catGraphic.fillCircle(75, 50, 12);
    catGraphic.fillStyle(0x1e293b, 1);
    catGraphic.fillCircle(45, 50, 5);
    catGraphic.fillCircle(75, 50, 5);
    catGraphic.fillStyle(0xf43f5e, 1);
    catGraphic.fillTriangle(55, 65, 65, 65, 60, 72);
    catGraphic.generateTexture('cat_hungry', 120, 120);
    catGraphic.destroy();

    // Cat Happy texture
    const catHappy = this.make.graphics({ x: 0, y: 0 });
    catHappy.fillStyle(0xfb923c, 1);
    catHappy.fillCircle(60, 60, 50);
    catHappy.fillTriangle(20, 30, 40, 10, 50, 40);
    catHappy.fillTriangle(70, 40, 80, 10, 100, 30);
    catHappy.fillStyle(0x1e293b, 1);
    catHappy.fillTriangle(50, 70, 70, 70, 60, 85);
    catHappy.fillStyle(0xf43f5e, 1);
    catHappy.fillCircle(60, 78, 6);
    catHappy.generateTexture('cat_happy', 120, 120);
    catHappy.destroy();

    // Fish texture
    const fishGraphic = this.make.graphics({ x: 0, y: 0 });
    fishGraphic.fillStyle(0x38bdf8, 1);
    fishGraphic.fillEllipse(50, 35, 40, 25);
    fishGraphic.fillTriangle(80, 35, 100, 20, 100, 50);
    fishGraphic.fillStyle(0xffffff, 1);
    fishGraphic.fillCircle(30, 30, 6);
    fishGraphic.fillStyle(0x0f172a, 1);
    fishGraphic.fillCircle(30, 30, 3);
    fishGraphic.generateTexture('fish', 110, 70);
    fishGraphic.destroy();

    // Box Closed texture
    const boxClosed = this.make.graphics({ x: 0, y: 0 });
    boxClosed.fillStyle(0xa16207, 1);
    boxClosed.fillRect(10, 20, 100, 80);
    boxClosed.fillStyle(0xca8a04, 1);
    boxClosed.fillRect(5, 10, 110, 20);
    boxClosed.lineStyle(4, 0x713f12, 1);
    boxClosed.strokeRect(10, 20, 100, 80);
    boxClosed.generateTexture('box_closed', 120, 110);
    boxClosed.destroy();

    // Box Open texture
    const boxOpen = this.make.graphics({ x: 0, y: 0 });
    boxOpen.fillStyle(0x713f12, 1);
    boxOpen.fillRect(10, 30, 100, 70);
    boxOpen.fillStyle(0xa16207, 1);
    boxOpen.fillRect(5, 5, 40, 25);
    boxOpen.fillRect(75, 5, 40, 25);
    boxOpen.generateTexture('box_open', 120, 110);
    boxOpen.destroy();

    // Key texture
    const keyGraphic = this.make.graphics({ x: 0, y: 0 });
    keyGraphic.fillStyle(0xeab308, 1);
    keyGraphic.fillCircle(25, 25, 18);
    keyGraphic.fillStyle(0x0f172a, 1);
    keyGraphic.fillCircle(25, 25, 8);
    keyGraphic.fillStyle(0xeab308, 1);
    keyGraphic.fillRect(38, 20, 45, 10);
    keyGraphic.fillRect(68, 30, 8, 12);
    keyGraphic.fillRect(78, 30, 8, 12);
    keyGraphic.generateTexture('key', 90, 50);
    keyGraphic.destroy();

    // Lock texture
    const lockGraphic = this.make.graphics({ x: 0, y: 0 });
    lockGraphic.lineStyle(10, 0x94a3b8, 1);
    lockGraphic.strokeCircle(50, 35, 20);
    lockGraphic.fillStyle(0xeab308, 1);
    lockGraphic.fillRect(20, 35, 60, 55);
    lockGraphic.fillStyle(0x0f172a, 1);
    lockGraphic.fillCircle(50, 58, 8);
    lockGraphic.generateTexture('lock', 100, 100);
    lockGraphic.destroy();

    // Bush texture
    const bushGraphic = this.make.graphics({ x: 0, y: 0 });
    bushGraphic.fillStyle(0x22c55e, 1);
    bushGraphic.fillCircle(40, 50, 35);
    bushGraphic.fillCircle(75, 40, 40);
    bushGraphic.fillCircle(110, 50, 35);
    bushGraphic.generateTexture('bush', 150, 100);
    bushGraphic.destroy();

    // Default Fallback Box
    const defaultBox = this.make.graphics({ x: 0, y: 0 });
    defaultBox.fillStyle(0x6366f1, 1);
    defaultBox.fillRect(0, 0, 80, 80);
    defaultBox.lineStyle(4, 0x4338ca, 1);
    defaultBox.strokeRect(0, 0, 80, 80);
    defaultBox.generateTexture('default_box', 80, 80);
    defaultBox.destroy();
  }
}
