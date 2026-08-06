"use client";

import { useState, useEffect } from "react";
import { Video, Plus, Link as LinkIcon, Sparkles, Trash2, ExternalLink } from "lucide-react";
import { SocialVideo } from "@playnest/shared-types";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<SocialVideo[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [loadingEmbed, setLoadingEmbed] = useState(false);
  const [formData, setFormData] = useState<Partial<SocialVideo>>({
    platform: "youtube",
    category: "gaming",
    authorName: "PlayNest Studio",
  });

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/v1/videos");
      const json = await res.json();
      if (json.success) setVideos(json.data);
    } catch {
      // ignore or fallback
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFetchOembed = async () => {
    if (!videoUrl) return;
    setLoadingEmbed(true);
    try {
      const res = await fetch("/api/v1/videos/oembed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });
      const json = await res.json();
      if (json.success) {
        setFormData((prev) => ({
          ...prev,
          url: json.data.url,
          platform: json.data.platform,
          embedUrl: json.data.embedUrl,
          title: json.data.title,
          thumbnailUrl: json.data.thumbnailUrl,
        }));
      }
    } finally {
      setLoadingEmbed(false);
    }
  };

  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url || !formData.thumbnailUrl) {
      alert("Vui lòng nhập đầy đủ Tiêu đề, URL và Thumbnail!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || "",
          platform: formData.platform || "youtube",
          url: formData.url,
          embedUrl: formData.embedUrl || formData.url,
          thumbnailUrl: formData.thumbnailUrl,
          authorName: formData.authorName || "PlayNest Studio",
          category: formData.category || "gaming",
          featured: formData.featured || false,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setVideoUrl("");
        setFormData({ platform: "youtube", category: "gaming", authorName: "PlayNest Studio" });
        fetchVideos();
      }
    } catch (err: any) {
      alert("Lỗi khi thêm video: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Video className="w-7 h-7 text-purple-400" />
            Quản Lý Video Social
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Nhập URL YouTube, TikTok hoặc Facebook để tự động bóc tách và xuất bản video.
          </p>
        </div>
      </div>

      {/* Add New Video Form */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Thêm Video Mới Qua URL (oEmbed Auto-Fetch)
        </h2>

        {/* Step 1: URL input */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <LinkIcon className="w-5 h-5 text-gray-500 absolute left-3.5 top-3.5" />
            <input
              type="url"
              placeholder="Dán đường dẫn video YouTube, TikTok hoặc Facebook vào đây..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>
          <button
            onClick={handleFetchOembed}
            disabled={loadingEmbed}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loadingEmbed ? "Đang xử lý..." : "Tự Động Bóc Tách"}
          </button>
        </div>

        {/* Step 2: Form details */}
        <form onSubmit={handleCreateVideo} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Tiêu đề Video</label>
            <input
              type="text"
              required
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Nền tảng</label>
            <select
              value={formData.platform || "youtube"}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">URL Thumbnail Image</label>
            <input
              type="url"
              required
              value={formData.thumbnailUrl || ""}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Thể loại</label>
            <select
              value={formData.category || "gaming"}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="gaming">Gaming</option>
              <option value="funny">Hài hước</option>
              <option value="music">Âm nhạc</option>
              <option value="review">Review</option>
              <option value="tutorial">Hướng dẫn</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 bg-black/40 border-white/10"
              />
              Nổi bật trên Trang Chủ (Featured Video)
            </label>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-bold shadow-lg transition-all"
            >
              Xuất Bản Video
            </button>
          </div>
        </form>
      </div>

      {/* Videos List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Danh Sách Video ({videos.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div key={vid.id} className="glass-panel rounded-2xl overflow-hidden border border-white/10 space-y-3">
              <div className="relative aspect-video bg-black/60">
                <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-extrabold uppercase text-purple-300 border border-white/10">
                  {vid.platform}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-white line-clamp-2">{vid.title}</h3>
                <p className="text-xs text-gray-400">Tác giả: {vid.authorName}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-400">
                  <span>{vid.viewsCount.toLocaleString()} views</span>
                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    Xem <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
