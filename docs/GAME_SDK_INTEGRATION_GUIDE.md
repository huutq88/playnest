# Hướng Dẫn Tích Hợp PlayNest Game SDK (`@playnest/game-sdk`)

Tài liệu này hướng dẫn lập trình viên (Game Developers / Studios) tích hợp thư viện `@playnest/game-sdk` để phát hành game web lên cổng **PlayNest (`playnest.zone`)**.

---

## ⚡ 0. Khởi Tạo Nhanh Dự Án Game Mới (CLI Project Starter)

Nếu bạn muốn tạo một dự án Web Game mới hoàn chỉnh đã được cấu hình sẵn SDK, giao diện Canvas và nút gửi điểm số:

```bash
npx @playnest/game-sdk init my-super-game
```

Lệnh trên sẽ tự động khởi tạo thư mục `my-super-game` chứa đầy đủ `index.html`, `game.js`, `package.json` cùng tài nguyên mẫu đã được tích hợp sẵn PlayNest Game SDK!

---

## 🚀 1. Cách Cài Đặt & Nhúng SDK Cho Dự Án Có Sẵn (2 Cách)

### Cách A: Nhúng qua CDN Script (Dành cho HTML5 Canvas / Construct 3 / Cocos / Game Tĩnh)
Chèn 1 dòng duy nhất vào file `index.html` của game:

```html
<script src="https://playnest.zone/sdk/v1/playnest-sdk.js"></script>
<script>
  window.playnestSDK.init({
    gameId: "ten-game-cua-ban",
    debug: true
  });
</script>
```

---

### Cách B: Cài Đặt qua NPM Package (Dành cho Node.js / React / Phaser TS)

```bash
npm install @playnest/game-sdk
# hoặc
pnpm add @playnest/game-sdk
```

Sau đó import trong code TypeScript:

```typescript
import { sdk } from "@playnest/game-sdk";
```

---

## ⚡ 2. Các Bước Tích Hợp Đơn Giản (4 Bước)

### Bước 1: Khởi Tạo SDK Ngay Khi Game Vừa Load (Boot / Preload)

Gọi `sdk.init()` ở điểm khởi đầu game của bạn (ví dụ: `BootScene` trong Phaser, hoặc `main.ts` / `App.tsx`):

```typescript
sdk.init({
  gameId: "my-custom-game-slug", // Slug game của bạn đăng ký trên Admin CMS
  debug: process.env.NODE_ENV !== "production",
});
```

---

### Bước 2: Lưu & Tải Tiến Trình Chơi Game (Save & Load Progress)

Khi người chơi mở game, kiểm tra tiến trình đã lưu:

```typescript
// 1. Tải tiến trình cũ
const savedState = sdk.loadProgress("user_progress");
if (savedState) {
  console.log("Tiếp tục màn chơi:", savedState.currentLevel);
}

// 2. Lưu tiến trình khi qua màn
function onLevelComplete(nextLevel: number, coins: number) {
  sdk.saveProgress("user_progress", {
    currentLevel: nextLevel,
    coinsEarned: coins,
  });

  // Thông báo cho Host Portal ghi nhận lượt hoàn thành level
  sdk.completeLevel(nextLevel, coins);
}
```

---

### Bước 3: Gửi Điểm Số Lên Bảng Xếp Hạng (Leaderboard)

Khi kết thúc trận đấu (Game Over) hoặc đạt điểm số cao:

```typescript
function onGameOver(finalScore: number) {
  sdk.submitScore({
    score: finalScore,
    level: currentLevel,
    metadata: {
      totalTimeSec: 65,
      comboStreak: 12,
    },
  });
}
```

---

### Bước 4: Lắng Nghe Sự Kiện Pause / Resume Từ Host Portal

Đảm bảo game tự động tạm dừng âm thanh và game loop khi người chơi chuyển tab hoặc mở menu hệ thống:

```typescript
// Khi người chơi mở Menu Portal hoặc chuyển tab
sdk.on("pause", () => {
  myGameEngine.pause();
  soundManager.mute();
});

// Khi tiếp tục chơi
sdk.on("resume", () => {
  myGameEngine.resume();
  soundManager.unmute();
});
```

---

## 🎮 3. Ví Dụ Tích Hợp Hoàn Chỉnh Trên Phaser 3 Engine

```typescript
import Phaser from "phaser";
import { sdk } from "@playnest/game-sdk";

export class MainGameScene extends Phaser.Scene {
  constructor() {
    super("MainGameScene");
  }

  create() {
    // 1. Khởi tạo SDK
    sdk.init({ gameId: "tricky-brain-quest", debug: true });

    // 2. Đăng ký sự kiện Pause/Resume
    sdk.on("pause", () => this.scene.pause());
    sdk.on("resume", () => this.scene.resume());

    // 3. Tải tiến trình
    const savedData = sdk.loadProgress("player_save");
    this.score = savedData?.score || 0;
  }

  onVictory(levelScore: number) {
    this.score += levelScore;

    // 4. Gửi điểm số & lưu tiến trình
    sdk.submitScore({ score: this.score });
    sdk.saveProgress("player_save", { score: this.score });
    sdk.completeLevel(this.currentLevelId, levelScore);
  }
}
```
