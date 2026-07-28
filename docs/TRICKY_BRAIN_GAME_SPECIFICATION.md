# Tài Liệu Mô Tả Game: Tricky Brain Quest

> **Tên game:** Tricky Brain Quest  
> **Thể loại:** Casual Web Puzzle / Brain Test / Interactive Riddles  
> **Nền tảng:** Web HTML5 / Mobile & Desktop Browser / PWA Offline  
> **Công nghệ:** Phaser 3 Game Engine + Next.js App Router (TypeScript)  
> **Trạng thái:** Bản thiết kế & Triển khai MVP (Data-Driven Engine)

---

## 1. Tổng Quan Tựa Game (Game Overview)

**Tricky Brain Quest** là tựa game giải đố tương tác thông minh, nơi các câu đố không hề giải quyết theo lối suy nghĩ thông thường mà đòi hỏi người chơi phải **"Tư duy ngoài chiếc hộp" (Think Outside The Box)**.

Game hướng tới trải nghiệm chơi ngay tức thì (**Instant Play**) trên mọi trình duyệt di động và máy tính mà không cần cài đặt. Mỗi màn chơi kéo dài từ 5 đến 30 giây, mang lại cảm giác bất ngờ, hài hước và kích thích tư duy logic sáng tạo.

### 1.1 Khán giả mục tiêu (Target Audience)
* **Casual Gamers:** Người chơi giải trí nhanh trong lúc rảnh rỗi, đi xe buýt, giờ nghỉ trưa.
* **Mọi lứa tuổi:** Học sinh, sinh viên, nhân viên văn phòng, gia đình cùng giải đố.
* **Yêu thích game tư duy:** Người hâm mộ dòng game *Brain Test*, *Brain Out*, *Brain Find*.

---

## 2. Đặc Điểm Nổi Bật & Triết Lý Thiết Kế

```
┌─────────────────────────────────────────────────────────────┐
│                 ĐẶC ĐIỂM NỔI BẬT DỰ ÁN                      │
├──────────────────┬──────────────────┬───────────────────────┤
│ Micro-Gameplay   │ Data-Driven      │ PWA & Offline-First   │
│ 5–30s mỗi màn    │ Màn chơi dạng    │ Chơi không cần mạng,  │
│ chơi tức thì.    │ JSON linh hoạt.  │ lưu tiến trình local. │
└──────────────────┴──────────────────┴───────────────────────┘
```

### 2.1 Tương tác đa dạng (Rich Interactions)
* **Kéo & Thả (Drag & Drop):** Di chuyển các vật thể trên màn hình để kết hợp, che phủ hoặc kéo vật thể bị giấu ra ngoài (VD: kéo bụi cây để tìm chìa khóa).
* **Chạm liên tiếp (Multi-Tap):** Gõ/chạm nhiều lần vào một vật thể để tương tác hoặc phá vỡ lớp bảo vệ (VD: gõ 3 lần mở nắp hộp).
* **Đa điểm & Giữ (Hold & Multi-touch):** Giữ một vật thể trong khi chạm vật thể khác.
* **Xoay & Phóng to (Rotate & Pinch):** Xoay vật thể để thay đổi hướng hoặc thay đổi góc nhìn.

### 2.2 Triết lý Data-Driven Level Design
Tất cả các màn chơi của Tricky Brain Quest được định nghĩa 100% bằng file cấu hình **JSON**. Điều này cho phép:
* **Không cần viết code riêng cho từng màn:** Engine tự động đọc dữ liệu JSON, render sprites và lắng nghe các quy tắc tương tác (Rule Engine).
* **Tối ưu tốc độ sản xuất nội dung:** Designer có thể nhanh chóng tạo hàng trăm màn chơi mới bằng Level Editor hoặc công cụ hỗ trợ AI.
* **Responsive 9:16:** Sử dụng hệ tọa độ chuẩn hóa `0.0 -> 1.0`, hiển thị hoàn hảo trên mọi kích thước màn hình thiết bị.

---

## 3. Vòng Lặp Trò Chơi (Core Game Loop)

```
┌──────────────┐      ┌──────────────┐      ┌─────────────────┐
│  Chọn Màn    │ ───► │ Đọc Câu Hỏi  │ ───► │ Tương Tác Game  │
│ (Level List) │      │ (Instruction)│      │  (Phaser Canvas)│
└──────────────┘      └──────────────┘      └────────┬────────┘
                                                     │
┌──────────────┐      ┌──────────────┐               │
│ Thăng Cấp /  │ ◄─── │ Màn Chúc Mừng│ ◄─────────────┘
│ Màn Tiếp Theo│      │(VictoryModal)│   (Nối đúng Rule & Overlap)
└──────────────┘      └──────────────┘
```

1. **Khởi động:** Người chơi xem danh sách các màn chơi (màn đã hoàn thành / màn hiện tại).
2. **Tiếp cận câu đố:** Đọc câu hỏi/yêu cầu ở đầu màn hình.
3. **Thao tác tương tác:** Kéo, thả, chạm, xoay các đối tượng trên màn hình để tìm lời giải.
4. **Nhận kết quả:** Khi quy tắc chiến thắng thỏa mãn, hiệu ứng pháo hoa xuất hiện kèm bảng chúc mừng, thưởng sao và mở khóa màn tiếp theo.
5. **Trợ giúp (Hint):** Nếu gặp khó khăn, người chơi có thể bấm nút **Gợi ý** (Lightbulb) để xem manh mối.

---

## 4. Chi Tiết Các Màn Chơi Mẫu (Sample Levels)

### Màn 1: "Cho chú mèo ăn cá" (Drag & Drop + Overlap)
* **Câu hỏi:** *"Hãy giúp chú mèo lấy được con cá!"*
* **Đối tượng:** Chú mèo đói (gốc trái), Con cá tươi (gốc phải).
* **Cách giải:** Người chơi giữ và kéo con cá thả đè lên vị trí chú mèo.
* **Phản hồi:** Con cá biến mất, chú mèo đổi biểu cảm sang vui sướng (`cat_happy`) và phát animation ăn cá.

### Màn 2: "Mở chiếc hộp bí ẩn" (Tap Counter)
* **Câu hỏi:** *"Làm thế nào để mở chiếc hộp này?"*
* **Đối tượng:** Chiếc hộp nắp gỗ đang đóng ở chính giữa màn hình.
* **Cách giải:** Người chơi chạm (click/tap) 3 lần liên tiếp vào chiếc hộp.
* **Phản hồi:** Nắp hộp nảy lên và mở ra (`box_open`), dòng chữ thông báo nổ ra chúc mừng.

### Màn 3: "Tìm chìa khóa bị giấu" (Layering & Snapback Config)
* **Câu hỏi:** *"Mở ổ khóa để qua màn!"*
* **Đối tượng:** Ổ khóa ở giữa, Bụi cây xanh giấu chiếc chìa khóa bên dưới ở góc phải.
* **Cách giải:** Người chơi kéo bụi cây sang vị trí khác (bụi cây được cài đặt `"snapBack": false` nên đứng yên ở chỗ mới), sau đó kéo chiếc chìa khóa vừa lộ ra thả vào ổ khóa.
* **Phản hồi:** Ổ khóa mở ra và kích hoạt hoàn thành màn chơi.

---

## 5. Quy Chuẩn Định Dạng File JSON Level (`Level Spec Format`)

Mỗi màn chơi được lưu trữ dưới dạng một file JSON chuẩn mực theo Zod Schema:

```json
{
  "id": "tricky-brain-003",
  "gameId": "tricky-brain",
  "version": 1,
  "title": "Tìm chìa khóa bị giấu",
  "question": {
    "text": "Mở ổ khóa để qua màn!",
    "position": { "x": 0.5, "y": 0.15 }
  },
  "background": {
    "type": "color",
    "value": "#F0FDF4"
  },
  "objects": [
    {
      "id": "lock",
      "type": "sprite",
      "asset": "lock",
      "position": { "x": 0.5, "y": 0.4 },
      "scale": 1.2,
      "interactive": false,
      "zIndex": 10
    },
    {
      "id": "key",
      "type": "sprite",
      "asset": "key",
      "position": { "x": 0.75, "y": 0.75 },
      "scale": 1,
      "interactive": true,
      "interactions": [{ "type": "drag" }],
      "zIndex": 15
    },
    {
      "id": "bush",
      "type": "sprite",
      "asset": "bush",
      "position": { "x": 0.75, "y": 0.75 },
      "scale": 1.3,
      "interactive": true,
      "interactions": [{ "type": "drag", "snapBack": false }],
      "zIndex": 25
    }
  ],
  "variables": {
    "unlocked": false,
    "bushMoved": false
  },
  "rules": [
    {
      "event": "drop",
      "source": "bush",
      "condition": { "type": "allConditionsCompleted", "conditions": [] },
      "actions": [{ "type": "setVariable", "key": "bushMoved", "value": true }]
    },
    {
      "event": "drop",
      "source": "key",
      "condition": { "type": "overlap", "target": "lock", "distanceThreshold": 80 },
      "actions": [
        { "type": "setVariable", "key": "unlocked", "value": true },
        { "type": "playAnimation", "target": "lock", "animation": "bounce" },
        { "type": "hideObject", "target": "key" },
        { "type": "completeLevel" }
      ]
    }
  ],
  "hint": {
    "text": "Có điều gì đó được giấu phía sau bụi cây xanh. Thử kéo bụi cây ra vị trí khác!",
    "highlightObjectId": "bush"
  }
}
```

---

## 6. Mô Hình Hóa Doanh Thu (Monetization Strategy)

```
┌─────────────────────────────────────────────────────────────┐
│                 HỆ THỐNG MONETIZATION                       │
├──────────────────┬──────────────────┬───────────────────────┤
│ Rewarded Ads     │ Interstitial Ads │ In-App Purchases      │
│ Xem quảng cáo    │ Tự động xuất hiện│ Gói bỏ quảng cáo      │
│ để nhận thêm     │ sau mỗi 4-5 màn, │ (Remove Ads) &        │
│ lượt Gợi ý (Hint)│ chỉnh bằng       │ Gói màn chơi đặc biệt │
│                  │ Remote Config.   │ (Premium Packs).      │
└──────────────────┴──────────────────┴───────────────────────┘
```

1. **Quảng cáo Rewarded Ads:**
   * Mỗi người chơi bắt đầu với 5 lượt Gợi ý miễn phí.
   * Khi hết lượt, bấm nút Gợi ý sẽ kích hoạt xem video ngắn để cộng thêm +3 lượt Gợi ý.
2. **Quảng cáo Interstitial (Xen kẽ):**
   * Không hiển thị ở 3 màn đầu để giữ chân người chơi tốt nhất (High Retention).
   * Xuất hiện giãn cách 90 giây hoặc sau 4–5 màn chơi hoàn thành.
3. **Gói Premium / Subscription:**
   * Mua gói "Bỏ Quảng Cáo" (Remove Ads) vĩnh viễn.
   * Mở khóa các gói màn chơi độc quyền (Exclusive Seasonal Packs).

---

## 7. Kế Hoạch Mở Rộng (Future Roadmap)

* **Phase 1 (Đã hoàn thành):** Core Puzzle Engine, responsive 9:16 canvas, 3 màn chơi mẫu Brain Test.
* **Phase 2:** Mở rộng lên **50 Màn chơi JSON**, hoàn thiện bộ thư viện âm thanh vui nhộn (SFX/BGM).
* **Phase 3:** Ra mắt công cụ **Web Level Editor (WYSIWYG)** cho Game Designer tự tạo và chỉnh sửa màn chơi kéo thả trực quan.
* **Phase 4:** Tích hợp Backend API (NestJS), Đăng nhập Anonymous/OAuth (Google/Apple), đồng bộ Cloud Save & Bảng xếp hạng (Leaderboard).
