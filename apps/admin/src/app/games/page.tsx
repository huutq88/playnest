"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Plus, PlayCircle, Key, Code2 } from "lucide-react";
import { WebGame } from "@playnest/shared-types";

export default function AdminGamesPage() {
  const [games, setGames] = useState<WebGame[]>([]);
  const [formData, setFormData] = useState<Partial<WebGame>>({
    engine: "phaser",
    orientation: "portrait",
    developer: "PlayNest Studio",
    sdkVersion: "1.0.0",
  });

  const fetchGames = async () => {
    try {
      const res = await fetch("/api/v1/games");
      const json = await res.json();
      if (json.success) setGames(json.data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.gameUrl || !formData.thumbnailUrl) {
      alert("Vui lòng điền đủ Tên game, Slug, Game URL và Thumbnail!");
      return;
    }

    if (!formData.sdkIntegrated) {
      alert("❌ KHÔNG THỂ XUẤT BẢN!\n\nPlayNest bắt buộc game phải tích hợp thư viện PlayNest Game SDK (@playnest/game-sdk) trước khi submit lên hệ thống.");
      return;
    }

    try {
      const res = await fetch("/api/v1/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          description: formData.description || "",
          thumbnailUrl: formData.thumbnailUrl,
          bannerUrl: formData.bannerUrl || "",
          gameUrl: formData.gameUrl,
          orientation: formData.orientation || "portrait",
          engine: formData.engine || "phaser",
          developer: formData.developer || "PlayNest Studio",
          version: "1.0.0",
          sdkVersion: "1.0.0",
          sdkIntegrated: true,
          featured: formData.featured || false,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFormData({ engine: "phaser", orientation: "portrait", developer: "PlayNest Studio", sdkVersion: "1.0.0", sdkIntegrated: false });
        fetchGames();
      } else {
        alert("Lỗi từ server: " + json.error);
      }
    } catch (err: any) {
      alert("Lỗi khi thêm game: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Gamepad2 className="w-7 h-7 text-pink-400" />
          Quản Lý Web Games & Game SDK
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Quản lý danh mục game web và thông số kết nối thư viện <code className="text-pink-300">@playnest/game-sdk</code>.
        </p>
      </div>

      {/* Add New Game Form */}
      <form onSubmit={handleCreateGame} className="glass-panel p-6 rounded-2xl border border-pink-500/20 space-y-4">
        <h2 className="text-lg font-bold text-white">Đăng Ký Game Web Mới Trên PlayNest</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Tên Game</label>
            <input
              type="text"
              required
              placeholder="VD: Tricky Brain Quest"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Slug URL</label>
            <input
              type="text"
              required
              placeholder="VD: tricky-brain-quest"
              value={formData.slug || ""}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Game URL hoặc Path</label>
            <input
              type="text"
              required
              placeholder="VD: /play hoặc https://..."
              value={formData.gameUrl || ""}
              onChange={(e) => setFormData({ ...formData, gameUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">URL Thumbnail</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={formData.thumbnailUrl || ""}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Game Engine</label>
            <select
              value={formData.engine || "phaser"}
              onChange={(e) => setFormData({ ...formData, engine: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
            >
              <option value="phaser">Phaser 3 Engine</option>
              <option value="canvas">HTML5 Canvas</option>
              <option value="html5">Standard HTML5</option>
              <option value="threejs">Three.js 3D</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Hướng Màn Hình</label>
            <select
              value={formData.orientation || "portrait"}
              onChange={(e) => setFormData({ ...formData, orientation: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
            >
              <option value="portrait">Màn dọc (Portrait 9:16)</option>
              <option value="landscape">Màn ngang (Landscape 16:9)</option>
              <option value="any">Tự động (Responsive)</option>
            </select>
          </div>
        </div>

        {/* SDK Compatibility Mandatory Checkbox */}
        <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-500/30 space-y-2">
          <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-white">
            <input
              type="checkbox"
              checked={formData.sdkIntegrated || false}
              onChange={(e) => setFormData({ ...formData, sdkIntegrated: e.target.checked })}
              className="w-4 h-4 rounded border-pink-500 text-pink-600 focus:ring-pink-500"
            />
            <span>Xác nhận Web Game này ĐÃ tích hợp PlayNest Game SDK (@playnest/game-sdk)</span>
          </label>
          <p className="text-[11px] text-pink-200/80 leading-relaxed pl-7">
            🔒 Quy tắc chất lượng: Cổng PlayNest từ chối các game không tích hợp SDK để đảm bảo tính tương thích Bảng xếp hạng & Cloud Save.
          </p>
        </div>

        <button
          type="submit"
          disabled={!formData.sdkIntegrated}
          className={`px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg transition-all ${
            formData.sdkIntegrated
              ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 cursor-pointer"
              : "bg-gray-800 text-gray-500 border border-white/10 cursor-not-allowed"
          }`}
        >
          Kích Hoạt Game Trên Portal
        </button>
      </form>

      {/* Games List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Danh Sách Game Web Đã Kích Hoạt ({games.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((g) => (
            <div key={g.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex gap-4 items-center">
              <img src={g.thumbnailUrl} alt={g.title} className="w-20 h-20 rounded-2xl object-cover shadow-md border border-white/10" />
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-base text-white">{g.title}</h3>
                <p className="text-xs text-gray-400">{g.description}</p>
                <div className="flex items-center gap-3 text-xs text-pink-400 pt-1">
                  <span className="bg-pink-950/60 border border-pink-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{g.engine}</span>
                  <span>{g.playsCount.toLocaleString()} lượt chơi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
