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
    // 1. Cat Hungry
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
    catGraphic.generateTexture('cat_normal', 120, 120);
    catGraphic.generateTexture('cat_hungry', 120, 120);
    catGraphic.destroy();

    // 2. Cat Happy
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

    // 3. Fish
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

    // 4. Box Close
    const boxClosed = this.make.graphics({ x: 0, y: 0 });
    boxClosed.fillStyle(0xa16207, 1);
    boxClosed.fillRect(10, 20, 100, 80);
    boxClosed.fillStyle(0xca8a04, 1);
    boxClosed.fillRect(5, 10, 110, 20);
    boxClosed.lineStyle(4, 0x713f12, 1);
    boxClosed.strokeRect(10, 20, 100, 80);
    boxClosed.generateTexture('box_close', 120, 110);
    boxClosed.generateTexture('box_closed', 120, 110);
    boxClosed.destroy();

    // 5. Box Open
    const boxOpen = this.make.graphics({ x: 0, y: 0 });
    boxOpen.fillStyle(0x713f12, 1);
    boxOpen.fillRect(10, 30, 100, 70);
    boxOpen.fillStyle(0xa16207, 1);
    boxOpen.fillRect(5, 5, 40, 25);
    boxOpen.fillRect(75, 5, 40, 25);
    boxOpen.generateTexture('box_open', 120, 110);
    boxOpen.destroy();

    // 6. Key
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

    // 7. Lock
    const lockGraphic = this.make.graphics({ x: 0, y: 0 });
    lockGraphic.lineStyle(10, 0x94a3b8, 1);
    lockGraphic.strokeCircle(50, 35, 20);
    lockGraphic.fillStyle(0xeab308, 1);
    lockGraphic.fillRect(20, 35, 60, 55);
    lockGraphic.fillStyle(0x0f172a, 1);
    lockGraphic.fillCircle(50, 58, 8);
    lockGraphic.generateTexture('lock', 100, 100);
    lockGraphic.destroy();

    // 8. Bush
    const bushGraphic = this.make.graphics({ x: 0, y: 0 });
    bushGraphic.fillStyle(0x22c55e, 1);
    bushGraphic.fillCircle(40, 50, 35);
    bushGraphic.fillCircle(75, 40, 40);
    bushGraphic.fillCircle(110, 50, 35);
    bushGraphic.generateTexture('bush', 150, 100);
    bushGraphic.destroy();

    // 9. Sun
    const sunGraphic = this.make.graphics({ x: 0, y: 0 });
    sunGraphic.fillStyle(0xf59e0b, 1);
    sunGraphic.fillCircle(60, 60, 40);
    sunGraphic.lineStyle(6, 0xfbbf24, 1);
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      sunGraphic.lineBetween(
        60 + Math.cos(angle) * 45,
        60 + Math.sin(angle) * 45,
        60 + Math.cos(angle) * 58,
        60 + Math.sin(angle) * 58
      );
    }
    sunGraphic.generateTexture('sun', 120, 120);
    sunGraphic.destroy();

    // 10. Cloud
    const cloudGraphic = this.make.graphics({ x: 0, y: 0 });
    cloudGraphic.fillStyle(0xe2e8f0, 0.95);
    cloudGraphic.fillCircle(40, 50, 30);
    cloudGraphic.fillCircle(75, 35, 38);
    cloudGraphic.fillCircle(115, 50, 32);
    cloudGraphic.fillRect(40, 45, 75, 35);
    cloudGraphic.generateTexture('cloud', 150, 90);
    cloudGraphic.destroy();

    // 11. Tree (empty & with apples)
    const treeGraphic = this.make.graphics({ x: 0, y: 0 });
    treeGraphic.fillStyle(0x78350f, 1);
    treeGraphic.fillRect(50, 90, 30, 70);
    treeGraphic.fillStyle(0x15803d, 1);
    treeGraphic.fillCircle(65, 60, 55);
    treeGraphic.generateTexture('tree', 130, 160);
    
    treeGraphic.fillStyle(0xef4444, 1);
    treeGraphic.fillCircle(45, 45, 10);
    treeGraphic.fillCircle(85, 55, 10);
    treeGraphic.fillCircle(65, 80, 10);
    treeGraphic.generateTexture('tree_apples', 130, 160);
    treeGraphic.destroy();

    // 12. Egg & Hatch
    const eggGraphic = this.make.graphics({ x: 0, y: 0 });
    eggGraphic.fillStyle(0xfef3c7, 1);
    eggGraphic.fillEllipse(40, 50, 30, 40);
    eggGraphic.lineStyle(3, 0xfde68a, 1);
    eggGraphic.strokeEllipse(40, 50, 30, 40);
    eggGraphic.generateTexture('egg', 80, 100);

    eggGraphic.clear();
    eggGraphic.fillStyle(0x38bdf8, 1);
    eggGraphic.fillCircle(40, 50, 25);
    eggGraphic.fillStyle(0xf59e0b, 1);
    eggGraphic.fillTriangle(40, 50, 40, 60, 55, 55);
    eggGraphic.generateTexture('chick', 80, 100);
    eggGraphic.destroy();

    // 13. Nest
    const nestGraphic = this.make.graphics({ x: 0, y: 0 });
    nestGraphic.fillStyle(0x92400e, 1);
    nestGraphic.fillEllipse(60, 40, 55, 25);
    nestGraphic.fillStyle(0xb45309, 1);
    nestGraphic.fillEllipse(60, 35, 48, 18);
    nestGraphic.generateTexture('nest', 120, 80);
    nestGraphic.destroy();

    // 14. Bird
    const birdGraphic = this.make.graphics({ x: 0, y: 0 });
    birdGraphic.fillStyle(0x0284c7, 1);
    birdGraphic.fillCircle(40, 40, 25);
    birdGraphic.fillTriangle(15, 40, 0, 30, 15, 50);
    birdGraphic.fillStyle(0xf59e0b, 1);
    birdGraphic.fillTriangle(55, 35, 70, 40, 55, 45);
    birdGraphic.fillStyle(0xffffff, 1);
    birdGraphic.fillCircle(48, 33, 6);
    birdGraphic.fillStyle(0x0f172a, 1);
    birdGraphic.fillCircle(50, 33, 3);
    birdGraphic.generateTexture('bird', 80, 70);
    birdGraphic.destroy();

    // 15. Car & Wheel
    const carGraphic = this.make.graphics({ x: 0, y: 0 });
    carGraphic.fillStyle(0xd97706, 1);
    carGraphic.fillRect(10, 40, 140, 40);
    carGraphic.fillRect(40, 15, 80, 30);
    carGraphic.fillStyle(0x38bdf8, 0.8);
    carGraphic.fillRect(45, 20, 30, 20);
    carGraphic.fillRect(80, 20, 35, 20);
    carGraphic.generateTexture('car_no_wheel', 160, 90);

    carGraphic.fillStyle(0x1e293b, 1);
    carGraphic.fillCircle(35, 75, 18);
    carGraphic.fillCircle(125, 75, 18);
    carGraphic.fillStyle(0x94a3b8, 1);
    carGraphic.fillCircle(35, 75, 8);
    carGraphic.fillCircle(125, 75, 8);
    carGraphic.generateTexture('car_fixed', 160, 100);
    carGraphic.destroy();

    const wheelGraphic = this.make.graphics({ x: 0, y: 0 });
    wheelGraphic.fillStyle(0x1e293b, 1);
    wheelGraphic.fillCircle(25, 25, 20);
    wheelGraphic.fillStyle(0x94a3b8, 1);
    wheelGraphic.fillCircle(25, 25, 8);
    wheelGraphic.generateTexture('wheel', 50, 50);
    wheelGraphic.destroy();

    // 16. Rock
    const rockGraphic = this.make.graphics({ x: 0, y: 0 });
    rockGraphic.fillStyle(0x64748b, 1);
    rockGraphic.fillCircle(40, 35, 30);
    rockGraphic.fillCircle(65, 40, 25);
    rockGraphic.generateTexture('rock', 100, 70);
    rockGraphic.destroy();

    // 17. Candle & Match
    const candleGraphic = this.make.graphics({ x: 0, y: 0 });
    candleGraphic.fillStyle(0xf1f5f9, 1);
    candleGraphic.fillRect(20, 30, 30, 70);
    candleGraphic.lineStyle(4, 0x334155, 1);
    candleGraphic.lineBetween(35, 15, 35, 30);
    candleGraphic.generateTexture('candle_off', 70, 110);

    candleGraphic.fillStyle(0xf59e0b, 1);
    candleGraphic.fillTriangle(35, 0, 20, 20, 50, 20);
    candleGraphic.fillStyle(0xef4444, 1);
    candleGraphic.fillTriangle(35, 5, 26, 20, 44, 20);
    candleGraphic.generateTexture('candle_on', 70, 110);
    candleGraphic.destroy();

    const matchGraphic = this.make.graphics({ x: 0, y: 0 });
    matchGraphic.fillStyle(0xd97706, 1);
    matchGraphic.fillRect(10, 20, 8, 60);
    matchGraphic.fillStyle(0xef4444, 1);
    matchGraphic.fillCircle(14, 15, 8);
    matchGraphic.generateTexture('match', 30, 90);
    matchGraphic.destroy();

    // 18. Ice Cube & Diamond
    const iceGraphic = this.make.graphics({ x: 0, y: 0 });
    iceGraphic.fillStyle(0xbae6fd, 0.75);
    iceGraphic.fillRect(10, 10, 80, 80);
    iceGraphic.lineStyle(4, 0x38bdf8, 0.9);
    iceGraphic.strokeRect(10, 10, 80, 80);
    iceGraphic.fillStyle(0xa855f7, 1);
    iceGraphic.fillTriangle(50, 30, 30, 50, 70, 50);
    iceGraphic.fillTriangle(50, 70, 30, 50, 70, 50);
    iceGraphic.generateTexture('ice_cube', 100, 100);
    iceGraphic.destroy();

    const diamondGraphic = this.make.graphics({ x: 0, y: 0 });
    diamondGraphic.fillStyle(0xa855f7, 1);
    diamondGraphic.fillTriangle(50, 20, 25, 50, 75, 50);
    diamondGraphic.fillTriangle(50, 80, 25, 50, 75, 50);
    diamondGraphic.generateTexture('diamond', 100, 100);
    diamondGraphic.destroy();

    const magGraphic = this.make.graphics({ x: 0, y: 0 });
    magGraphic.lineStyle(8, 0x3b82f6, 1);
    magGraphic.strokeCircle(35, 35, 25);
    magGraphic.lineStyle(10, 0x1e293b, 1);
    magGraphic.lineBetween(52, 52, 75, 75);
    magGraphic.generateTexture('magnifying_glass', 90, 90);
    magGraphic.destroy();

    // 19. Owl
    const owlGraphic = this.make.graphics({ x: 0, y: 0 });
    owlGraphic.fillStyle(0x78350f, 1);
    owlGraphic.fillEllipse(50, 50, 40, 45);
    owlGraphic.fillStyle(0xfef3c7, 1);
    owlGraphic.fillCircle(35, 38, 14);
    owlGraphic.fillCircle(65, 38, 14);
    owlGraphic.lineStyle(3, 0x1e293b, 1);
    owlGraphic.lineBetween(23, 38, 47, 38);
    owlGraphic.lineBetween(53, 38, 77, 38);
    owlGraphic.generateTexture('owl_sleeping', 100, 100);

    owlGraphic.clear();
    owlGraphic.fillStyle(0x78350f, 1);
    owlGraphic.fillEllipse(50, 50, 40, 45);
    owlGraphic.fillStyle(0xfef3c7, 1);
    owlGraphic.fillCircle(35, 38, 14);
    owlGraphic.fillCircle(65, 38, 14);
    owlGraphic.fillStyle(0x0f172a, 1);
    owlGraphic.fillCircle(35, 38, 7);
    owlGraphic.fillCircle(65, 38, 7);
    owlGraphic.fillStyle(0xf59e0b, 1);
    owlGraphic.fillTriangle(45, 45, 55, 45, 50, 55);
    owlGraphic.generateTexture('owl_awake', 100, 100);
    owlGraphic.destroy();

    // 20. Moon
    const moonGraphic = this.make.graphics({ x: 0, y: 0 });
    moonGraphic.fillStyle(0xfde047, 1);
    moonGraphic.fillCircle(40, 40, 30);
    moonGraphic.fillStyle(0x0f172a, 1);
    moonGraphic.fillCircle(55, 35, 26);
    moonGraphic.generateTexture('moon', 80, 80);
    moonGraphic.destroy();

    // 21. Phone & Socket
    const phoneGraphic = this.make.graphics({ x: 0, y: 0 });
    phoneGraphic.fillStyle(0x1e293b, 1);
    phoneGraphic.fillRoundedRect(10, 10, 60, 100, 10);
    phoneGraphic.fillStyle(0xef4444, 1);
    phoneGraphic.fillRect(18, 20, 44, 70);
    phoneGraphic.generateTexture('phone_empty', 80, 120);

    phoneGraphic.fillStyle(0x22c55e, 1);
    phoneGraphic.fillRect(18, 20, 44, 70);
    phoneGraphic.generateTexture('phone_charged', 80, 120);
    phoneGraphic.destroy();

    const sofaGraphic = this.make.graphics({ x: 0, y: 0 });
    sofaGraphic.fillStyle(0x475569, 1);
    sofaGraphic.fillRoundedRect(10, 20, 130, 80, 12);
    sofaGraphic.fillStyle(0x334155, 1);
    sofaGraphic.fillRoundedRect(20, 10, 110, 30, 8);
    sofaGraphic.generateTexture('sofa', 150, 110);
    sofaGraphic.destroy();

    const chargerGraphic = this.make.graphics({ x: 0, y: 0 });
    chargerGraphic.fillStyle(0x94a3b8, 1);
    chargerGraphic.fillRect(10, 20, 30, 30);
    chargerGraphic.lineStyle(6, 0x64748b, 1);
    chargerGraphic.lineBetween(40, 35, 90, 35);
    chargerGraphic.generateTexture('charger', 100, 60);
    chargerGraphic.destroy();

    // 22. Chest
    const chestGraphic = this.make.graphics({ x: 0, y: 0 });
    chestGraphic.fillStyle(0x78350f, 1);
    chestGraphic.fillRect(10, 30, 80, 50);
    chestGraphic.fillStyle(0xb45309, 1);
    chestGraphic.fillRoundedRect(5, 15, 90, 20, 5);
    chestGraphic.fillStyle(0xeab308, 1);
    chestGraphic.fillRect(43, 40, 14, 18);
    chestGraphic.generateTexture('chest', 100, 90);
    chestGraphic.destroy();

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
