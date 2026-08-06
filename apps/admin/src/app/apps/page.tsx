"use client";

import { useState, useEffect } from "react";
import { Smartphone, Plus, Star, Download, ExternalLink } from "lucide-react";
import { AppStoreShowcase } from "@playnest/shared-types";

export default function AdminAppsPage() {
  const [apps, setApps] = useState<AppStoreShowcase[]>([]);
  const [formData, setFormData] = useState<Partial<AppStoreShowcase>>({
    developer: "PlayNest Game Studio",
    category: "puzzle",
    rating: 4.9,
  });

  const fetchApps = async () => {
    try {
      const res = await fetch("/api/v1/apps");
      const json = await res.json();
      if (json.success) setApps(json.data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.iconUrl) {
      alert("Tên ứng dụng và Icon URL là bắt buộc!");
      return;
    }

    try {
      const res = await fetch("/api/v1/apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          tagline: formData.tagline || "",
          description: formData.description || "",
          developer: formData.developer || "PlayNest Game Studio",
          category: formData.category || "puzzle",
          iconUrl: formData.iconUrl,
          bannerUrl: formData.bannerUrl || "",
          screenshots: [],
          playStoreUrl: formData.playStoreUrl || "",
          appStoreUrl: formData.appStoreUrl || "",
          rating: Number(formData.rating) || 4.8,
          downloadsCount: 10000,
          featured: formData.featured || false,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFormData({ developer: "PlayNest Game Studio", category: "puzzle", rating: 4.9 });
        fetchApps();
      }
    } catch (err: any) {
      alert("Lỗi khi thêm ứng dụng: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Smartphone className="w-7 h-7 text-cyan-400" />
          Quản Lý App Store Showcase
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Trưng bày các ứng dụng Mobile trên Google Play Store và Apple App Store.
        </p>
      </div>

      {/* Add New App Form */}
      <form onSubmit={handleCreateApp} className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4">
        <h2 className="text-lg font-bold text-white">Thêm Ứng Dụng Mới Vừa Xuất Bản</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Tên Ứng Dụng</label>
            <input
              type="text"
              required
              placeholder="VD: Tricky Brain Quest"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Tagline Khẩu Hiệu</label>
            <input
              type="text"
              placeholder="VD: Game Giải Đố Hại Não Hài Hước"
              value={formData.tagline || ""}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">URL App Icon</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={formData.iconUrl || ""}
              onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Google Play Store Link</label>
            <input
              type="url"
              placeholder="https://play.google.com/store/apps/details?id=..."
              value={formData.playStoreUrl || ""}
              onChange={(e) => setFormData({ ...formData, playStoreUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Apple App Store Link</label>
            <input
              type="url"
              placeholder="https://apps.apple.com/app/..."
              value={formData.appStoreUrl || ""}
              onChange={(e) => setFormData({ ...formData, appStoreUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Đánh giá Rating (0-5★)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating || 4.9}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold shadow-lg"
        >
          Đăng Tải Lên Showcase
        </button>
      </form>

      {/* Apps List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Danh Sách App Store Showcase ({apps.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app) => (
            <div key={app.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex gap-4 items-center">
              <img src={app.iconUrl} alt={app.name} className="w-16 h-16 rounded-2xl object-cover shadow-md border border-white/10" />
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-base text-white">{app.name}</h3>
                <p className="text-xs text-gray-400">{app.tagline}</p>
                <div className="flex items-center gap-3 text-xs text-cyan-400 pt-1">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-cyan-400" /> {app.rating}</span>
                  <span>{app.clickCount} clicks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
