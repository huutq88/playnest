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
    // 1-5
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

    const boxOpen = this.make.graphics({ x: 0, y: 0 });
    boxOpen.fillStyle(0x713f12, 1);
    boxOpen.fillRect(10, 30, 100, 70);
    boxOpen.fillStyle(0xa16207, 1);
    boxOpen.fillRect(5, 5, 40, 25);
    boxOpen.fillRect(75, 5, 40, 25);
    boxOpen.generateTexture('box_open', 120, 110);
    boxOpen.destroy();

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

    const lockGraphic = this.make.graphics({ x: 0, y: 0 });
    lockGraphic.lineStyle(10, 0x94a3b8, 1);
    lockGraphic.strokeCircle(50, 35, 20);
    lockGraphic.fillStyle(0xeab308, 1);
    lockGraphic.fillRect(20, 35, 60, 55);
    lockGraphic.fillStyle(0x0f172a, 1);
    lockGraphic.fillCircle(50, 58, 8);
    lockGraphic.generateTexture('lock', 100, 100);
    lockGraphic.destroy();

    const bushGraphic = this.make.graphics({ x: 0, y: 0 });
    bushGraphic.fillStyle(0x22c55e, 1);
    bushGraphic.fillCircle(40, 50, 35);
    bushGraphic.fillCircle(75, 40, 40);
    bushGraphic.fillCircle(110, 50, 35);
    bushGraphic.generateTexture('bush', 150, 100);
    bushGraphic.destroy();

    // 6-15
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

    const cloudGraphic = this.make.graphics({ x: 0, y: 0 });
    cloudGraphic.fillStyle(0xe2e8f0, 0.95);
    cloudGraphic.fillCircle(40, 50, 30);
    cloudGraphic.fillCircle(75, 35, 38);
    cloudGraphic.fillCircle(115, 50, 32);
    cloudGraphic.fillRect(40, 45, 75, 35);
    cloudGraphic.generateTexture('cloud', 150, 90);
    cloudGraphic.destroy();

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

    const nestGraphic = this.make.graphics({ x: 0, y: 0 });
    nestGraphic.fillStyle(0x92400e, 1);
    nestGraphic.fillEllipse(60, 40, 55, 25);
    nestGraphic.fillStyle(0xb45309, 1);
    nestGraphic.fillEllipse(60, 35, 48, 18);
    nestGraphic.generateTexture('nest', 120, 80);
    nestGraphic.destroy();

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

    const rockGraphic = this.make.graphics({ x: 0, y: 0 });
    rockGraphic.fillStyle(0x64748b, 1);
    rockGraphic.fillCircle(40, 35, 30);
    rockGraphic.fillCircle(65, 40, 25);
    rockGraphic.generateTexture('rock', 100, 70);
    rockGraphic.destroy();

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

    const moonGraphic = this.make.graphics({ x: 0, y: 0 });
    moonGraphic.fillStyle(0xfde047, 1);
    moonGraphic.fillCircle(40, 40, 30);
    moonGraphic.fillStyle(0x0f172a, 1);
    moonGraphic.fillCircle(55, 35, 26);
    moonGraphic.generateTexture('moon', 80, 80);
    moonGraphic.destroy();

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

    const chestGraphic = this.make.graphics({ x: 0, y: 0 });
    chestGraphic.fillStyle(0x78350f, 1);
    chestGraphic.fillRect(10, 30, 80, 50);
    chestGraphic.fillStyle(0xb45309, 1);
    chestGraphic.fillRoundedRect(5, 15, 90, 20, 5);
    chestGraphic.fillStyle(0xeab308, 1);
    chestGraphic.fillRect(43, 40, 14, 18);
    chestGraphic.generateTexture('chest', 100, 90);
    chestGraphic.destroy();

    // 16-25
    const glassGraphic = this.make.graphics({ x: 0, y: 0 });
    glassGraphic.lineStyle(6, 0x94a3b8, 0.9);
    glassGraphic.lineBetween(20, 10, 30, 100);
    glassGraphic.lineBetween(30, 100, 70, 100);
    glassGraphic.lineBetween(70, 100, 80, 10);
    glassGraphic.generateTexture('glass_empty', 100, 110);
    glassGraphic.fillStyle(0x38bdf8, 0.85);
    glassGraphic.fillRect(32, 40, 36, 58);
    glassGraphic.generateTexture('glass_full', 100, 110);
    glassGraphic.destroy();

    const sheepGraphic = this.make.graphics({ x: 0, y: 0 });
    sheepGraphic.fillStyle(0xf8fafc, 1);
    sheepGraphic.fillCircle(50, 50, 35);
    sheepGraphic.fillCircle(30, 45, 25);
    sheepGraphic.fillCircle(70, 45, 25);
    sheepGraphic.fillStyle(0x334155, 1);
    sheepGraphic.fillCircle(85, 45, 15);
    sheepGraphic.generateTexture('sheep', 110, 90);
    sheepGraphic.destroy();

    const wolfGraphic = this.make.graphics({ x: 0, y: 0 });
    wolfGraphic.fillStyle(0x475569, 1);
    wolfGraphic.fillEllipse(50, 50, 40, 30);
    wolfGraphic.fillTriangle(70, 35, 95, 45, 75, 60);
    wolfGraphic.fillStyle(0xef4444, 1);
    wolfGraphic.fillCircle(80, 42, 4);
    wolfGraphic.generateTexture('wolf', 110, 90);
    wolfGraphic.destroy();

    const fenceGraphic = this.make.graphics({ x: 0, y: 0 });
    fenceGraphic.fillStyle(0x9a3412, 1);
    fenceGraphic.fillRect(10, 10, 12, 70);
    fenceGraphic.fillRect(40, 10, 12, 70);
    fenceGraphic.fillRect(70, 10, 12, 70);
    fenceGraphic.fillRect(5, 25, 80, 10);
    fenceGraphic.fillRect(5, 50, 80, 10);
    fenceGraphic.generateTexture('fence', 90, 90);
    fenceGraphic.destroy();

    const tvGraphic = this.make.graphics({ x: 0, y: 0 });
    tvGraphic.fillStyle(0x0f172a, 1);
    tvGraphic.fillRoundedRect(10, 10, 120, 80, 8);
    tvGraphic.fillStyle(0x334155, 1);
    tvGraphic.fillRect(18, 18, 104, 64);
    tvGraphic.generateTexture('tv_off', 140, 100);
    tvGraphic.fillStyle(0x0284c7, 1);
    tvGraphic.fillRect(18, 18, 104, 64);
    tvGraphic.fillStyle(0xfde047, 1);
    tvGraphic.fillCircle(70, 50, 20);
    tvGraphic.generateTexture('tv_on', 140, 100);
    tvGraphic.destroy();

    const remoteGraphic = this.make.graphics({ x: 0, y: 0 });
    remoteGraphic.fillStyle(0x334155, 1);
    remoteGraphic.fillRoundedRect(10, 10, 30, 80, 6);
    remoteGraphic.fillStyle(0xef4444, 1);
    remoteGraphic.fillCircle(25, 25, 6);
    remoteGraphic.fillStyle(0x94a3b8, 1);
    remoteGraphic.fillCircle(25, 45, 5);
    remoteGraphic.fillCircle(25, 65, 5);
    remoteGraphic.generateTexture('remote', 50, 100);
    remoteGraphic.destroy();

    const batteryGraphic = this.make.graphics({ x: 0, y: 0 });
    batteryGraphic.fillStyle(0xeab308, 1);
    batteryGraphic.fillRect(10, 15, 25, 45);
    batteryGraphic.fillStyle(0x94a3b8, 1);
    batteryGraphic.fillRect(17, 8, 11, 7);
    batteryGraphic.generateTexture('battery', 45, 70);
    batteryGraphic.destroy();

    const boyGraphic = this.make.graphics({ x: 0, y: 0 });
    boyGraphic.fillStyle(0xf87171, 1);
    boyGraphic.fillCircle(30, 25, 15);
    boyGraphic.fillStyle(0x2563eb, 1);
    boyGraphic.fillRect(20, 40, 20, 35);
    boyGraphic.generateTexture('boy', 60, 90);
    boyGraphic.destroy();

    const riverGraphic = this.make.graphics({ x: 0, y: 0 });
    riverGraphic.fillStyle(0x0284c7, 0.9);
    riverGraphic.fillRect(0, 0, 250, 70);
    riverGraphic.generateTexture('river', 250, 70);
    riverGraphic.destroy();

    const plankGraphic = this.make.graphics({ x: 0, y: 0 });
    plankGraphic.fillStyle(0x854d0e, 1);
    plankGraphic.fillRect(5, 10, 110, 25);
    plankGraphic.generateTexture('plank', 120, 45);
    plankGraphic.fillRect(5, 5, 230, 35);
    plankGraphic.generateTexture('bridge_fixed', 240, 45);
    plankGraphic.destroy();

    const frogGraphic = this.make.graphics({ x: 0, y: 0 });
    frogGraphic.fillStyle(0x16a34a, 1);
    frogGraphic.fillEllipse(40, 40, 30, 25);
    frogGraphic.fillCircle(25, 25, 10);
    frogGraphic.fillCircle(55, 25, 10);
    frogGraphic.fillStyle(0xffffff, 1);
    frogGraphic.fillCircle(25, 25, 5);
    frogGraphic.fillCircle(55, 25, 5);
    frogGraphic.generateTexture('frog', 80, 70);
    frogGraphic.destroy();

    const flyGraphic = this.make.graphics({ x: 0, y: 0 });
    flyGraphic.fillStyle(0x0f172a, 1);
    flyGraphic.fillCircle(20, 20, 8);
    flyGraphic.fillStyle(0x94a3b8, 0.7);
    flyGraphic.fillEllipse(12, 14, 8, 5);
    flyGraphic.fillEllipse(28, 14, 8, 5);
    flyGraphic.generateTexture('fly', 40, 40);
    flyGraphic.destroy();

    const pondGraphic = this.make.graphics({ x: 0, y: 0 });
    pondGraphic.fillStyle(0x0369a1, 0.85);
    pondGraphic.fillEllipse(80, 50, 75, 45);
    pondGraphic.generateTexture('pond', 160, 100);
    pondGraphic.destroy();

    const vaultGraphic = this.make.graphics({ x: 0, y: 0 });
    vaultGraphic.fillStyle(0x334155, 1);
    vaultGraphic.fillRoundedRect(10, 10, 110, 110, 12);
    vaultGraphic.fillStyle(0x94a3b8, 1);
    vaultGraphic.fillCircle(65, 65, 30);
    vaultGraphic.fillStyle(0x0f172a, 1);
    vaultGraphic.fillCircle(65, 65, 18);
    vaultGraphic.generateTexture('vault_closed', 130, 130);
    vaultGraphic.fillStyle(0x22c55e, 1);
    vaultGraphic.fillRect(20, 20, 90, 90);
    vaultGraphic.fillStyle(0xeab308, 1);
    vaultGraphic.fillTriangle(65, 35, 45, 75, 85, 75);
    vaultGraphic.generateTexture('vault_open', 130, 130);
    vaultGraphic.destroy();

    const alarmGraphic = this.make.graphics({ x: 0, y: 0 });
    alarmGraphic.fillStyle(0xd97706, 1);
    alarmGraphic.fillCircle(50, 55, 35);
    alarmGraphic.fillCircle(25, 25, 12);
    alarmGraphic.fillCircle(75, 25, 12);
    alarmGraphic.fillStyle(0xffffff, 1);
    alarmGraphic.fillCircle(50, 55, 27);
    alarmGraphic.lineStyle(4, 0x0f172a, 1);
    alarmGraphic.lineBetween(50, 55, 50, 38);
    alarmGraphic.lineBetween(50, 55, 65, 55);
    alarmGraphic.generateTexture('alarm_ringing', 100, 100);
    alarmGraphic.clear();
    alarmGraphic.fillStyle(0x64748b, 1);
    alarmGraphic.fillCircle(50, 55, 35);
    alarmGraphic.generateTexture('alarm_stopped', 100, 100);
    alarmGraphic.destroy();

    const solarGraphic = this.make.graphics({ x: 0, y: 0 });
    solarGraphic.fillStyle(0x1e3a8a, 1);
    solarGraphic.fillRect(10, 10, 100, 60);
    solarGraphic.lineStyle(3, 0x60a5fa, 1);
    solarGraphic.strokeRect(10, 10, 100, 60);
    solarGraphic.lineBetween(43, 10, 43, 70);
    solarGraphic.lineBetween(76, 10, 76, 70);
    solarGraphic.lineBetween(10, 40, 110, 40);
    solarGraphic.generateTexture('solar_panel', 120, 80);
    solarGraphic.destroy();

    const bulbGraphic = this.make.graphics({ x: 0, y: 0 });
    bulbGraphic.fillStyle(0x64748b, 1);
    bulbGraphic.fillCircle(30, 30, 20);
    bulbGraphic.fillRect(23, 45, 14, 15);
    bulbGraphic.generateTexture('bulb_off', 60, 70);
    bulbGraphic.fillStyle(0xfacc15, 1);
    bulbGraphic.fillCircle(30, 30, 20);
    bulbGraphic.generateTexture('bulb_on', 60, 70);
    bulbGraphic.destroy();

    const coinGraphic = this.make.graphics({ x: 0, y: 0 });
    coinGraphic.fillStyle(0x94a3b8, 1);
    coinGraphic.fillCircle(25, 25, 20);
    coinGraphic.generateTexture('coin_fake', 50, 50);
    coinGraphic.fillStyle(0xeab308, 1);
    coinGraphic.fillCircle(25, 25, 20);
    coinGraphic.fillStyle(0xfef08a, 1);
    coinGraphic.fillCircle(25, 25, 14);
    coinGraphic.generateTexture('coin_gold', 50, 50);
    coinGraphic.destroy();

    const magnetGraphic = this.make.graphics({ x: 0, y: 0 });
    magnetGraphic.lineStyle(16, 0xef4444, 1);
    magnetGraphic.strokeCircle(40, 35, 25);
    magnetGraphic.fillStyle(0x0f172a, 1);
    magnetGraphic.fillRect(0, 35, 80, 40);
    magnetGraphic.generateTexture('magnet', 80, 75);
    magnetGraphic.destroy();

    const trophyBase = this.make.graphics({ x: 0, y: 0 });
    trophyBase.fillStyle(0x78350f, 1);
    trophyBase.fillRect(10, 40, 80, 30);
    trophyBase.generateTexture('trophy_base', 100, 80);
    trophyBase.destroy();

    const trophyCup = this.make.graphics({ x: 0, y: 0 });
    trophyCup.fillStyle(0xeab308, 1);
    trophyCup.fillTriangle(40, 10, 10, 60, 70, 60);
    trophyCup.fillRect(35, 60, 10, 20);
    trophyCup.generateTexture('trophy_cup', 80, 90);
    trophyCup.destroy();

    const trophyStar = this.make.graphics({ x: 0, y: 0 });
    trophyStar.fillStyle(0xfacc15, 1);
    trophyStar.fillTriangle(30, 5, 15, 45, 45, 45);
    trophyStar.fillTriangle(30, 55, 15, 15, 45, 15);
    trophyStar.generateTexture('trophy_star', 60, 60);
    trophyStar.clear();
    trophyStar.fillStyle(0xeab308, 1);
    trophyStar.fillRect(20, 60, 80, 30);
    trophyStar.fillTriangle(60, 20, 30, 70, 90, 70);
    trophyStar.fillStyle(0xfde047, 1);
    trophyStar.fillCircle(60, 20, 15);
    trophyStar.generateTexture('trophy_full', 120, 100);
    trophyStar.destroy();

    // --- NEW Levels 26-50 textures ---
    // Plant
    const plantGraphic = this.make.graphics({ x: 0, y: 0 });
    plantGraphic.fillStyle(0x78350f, 1);
    plantGraphic.fillRect(35, 60, 30, 30);
    plantGraphic.fillStyle(0x15803d, 1);
    plantGraphic.fillCircle(50, 40, 20);
    plantGraphic.generateTexture('plant_wilted', 100, 100);
    plantGraphic.fillStyle(0xef4444, 1);
    plantGraphic.fillCircle(50, 20, 15);
    plantGraphic.generateTexture('plant_blooming', 100, 100);
    plantGraphic.destroy();

    // Seesaw & Animals
    const seesawGraphic = this.make.graphics({ x: 0, y: 0 });
    seesawGraphic.fillStyle(0x475569, 1);
    seesawGraphic.fillTriangle(75, 70, 50, 110, 100, 110);
    seesawGraphic.fillStyle(0x94a3b8, 1);
    seesawGraphic.fillRect(10, 60, 130, 15);
    seesawGraphic.generateTexture('seesaw', 150, 120);
    seesawGraphic.destroy();

    // Pan & Cooking
    const panGraphic = this.make.graphics({ x: 0, y: 0 });
    panGraphic.fillStyle(0x1e293b, 1);
    panGraphic.fillCircle(50, 50, 40);
    panGraphic.fillRect(90, 43, 50, 14);
    panGraphic.generateTexture('pan_empty', 150, 100);
    panGraphic.fillStyle(0xffffff, 1);
    panGraphic.fillCircle(50, 50, 20);
    panGraphic.fillStyle(0xf59e0b, 1);
    panGraphic.fillCircle(50, 50, 10);
    panGraphic.generateTexture('pan_fried', 150, 100);
    panGraphic.destroy();

    // Gate
    const gateGraphic = this.make.graphics({ x: 0, y: 0 });
    gateGraphic.fillStyle(0x334155, 1);
    gateGraphic.fillRect(10, 10, 15, 100);
    gateGraphic.fillRect(95, 10, 15, 100);
    gateGraphic.fillRect(25, 20, 70, 10);
    gateGraphic.fillRect(25, 50, 70, 10);
    gateGraphic.fillRect(25, 80, 70, 10);
    gateGraphic.generateTexture('gate_locked', 120, 120);
    gateGraphic.clear();
    gateGraphic.fillStyle(0x22c55e, 1);
    gateGraphic.fillRect(10, 10, 15, 100);
    gateGraphic.fillRect(105, 10, 15, 100);
    gateGraphic.generateTexture('gate_open', 130, 120);
    gateGraphic.destroy();

    // Bunny & Carrot
    const bunnyGraphic = this.make.graphics({ x: 0, y: 0 });
    bunnyGraphic.fillStyle(0xf8fafc, 1);
    bunnyGraphic.fillCircle(40, 55, 30);
    bunnyGraphic.fillEllipse(30, 18, 8, 20);
    bunnyGraphic.fillEllipse(50, 18, 8, 20);
    bunnyGraphic.fillStyle(0xf43f5e, 1);
    bunnyGraphic.fillCircle(40, 55, 4);
    bunnyGraphic.generateTexture('bunny', 80, 90);
    bunnyGraphic.destroy();

    const carrotGraphic = this.make.graphics({ x: 0, y: 0 });
    carrotGraphic.fillStyle(0xea580c, 1);
    carrotGraphic.fillTriangle(25, 75, 10, 15, 40, 15);
    carrotGraphic.fillStyle(0x16a34a, 1);
    carrotGraphic.fillCircle(25, 10, 8);
    carrotGraphic.generateTexture('carrot', 50, 85);
    carrotGraphic.destroy();

    // Cake & Fan
    const cakeGraphic = this.make.graphics({ x: 0, y: 0 });
    cakeGraphic.fillStyle(0xf472b6, 1);
    cakeGraphic.fillRect(15, 40, 90, 50);
    cakeGraphic.fillStyle(0xfbcfe8, 1);
    cakeGraphic.fillRect(10, 30, 100, 15);
    cakeGraphic.generateTexture('cake', 120, 100);
    cakeGraphic.destroy();

    const fanGraphic = this.make.graphics({ x: 0, y: 0 });
    fanGraphic.lineStyle(6, 0x0284c7, 1);
    fanGraphic.strokeCircle(40, 40, 30);
    fanGraphic.fillStyle(0x38bdf8, 1);
    fanGraphic.fillCircle(40, 40, 10);
    fanGraphic.fillRect(35, 70, 10, 30);
    fanGraphic.generateTexture('fan', 80, 110);
    fanGraphic.destroy();

    // Crown Champion
    const crownGraphic = this.make.graphics({ x: 0, y: 0 });
    crownGraphic.fillStyle(0xeab308, 1);
    crownGraphic.fillTriangle(60, 20, 10, 70, 110, 70);
    crownGraphic.fillRect(10, 70, 100, 15);
    crownGraphic.fillStyle(0xef4444, 1);
    crownGraphic.fillCircle(60, 20, 8);
    crownGraphic.fillStyle(0x3b82f6, 1);
    crownGraphic.fillCircle(25, 45, 7);
    crownGraphic.fillStyle(0x22c55e, 1);
    crownGraphic.fillCircle(95, 45, 7);
    crownGraphic.generateTexture('crown_master', 120, 95);
    crownGraphic.destroy();

    // Gems
    const gemRed = this.make.graphics({ x: 0, y: 0 });
    gemRed.fillStyle(0xef4444, 1);
    gemRed.fillTriangle(25, 5, 5, 25, 45, 25);
    gemRed.fillTriangle(25, 45, 5, 25, 45, 25);
    gemRed.generateTexture('gem_red', 50, 50);
    gemRed.destroy();

    const gemBlue = this.make.graphics({ x: 0, y: 0 });
    gemBlue.fillStyle(0x3b82f6, 1);
    gemBlue.fillTriangle(25, 5, 5, 25, 45, 25);
    gemBlue.fillTriangle(25, 45, 5, 25, 45, 25);
    gemBlue.generateTexture('gem_blue', 50, 50);
    gemBlue.destroy();

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
