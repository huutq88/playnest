"use client";

import { useEffect, useState } from "react";
import { Video, Smartphone, Gamepad2, PlayCircle, Eye, MousePointerClick, RefreshCw, Mail } from "lucide-react";
import { SystemStats } from "@playnest/shared-types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/stats");
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch {
      // Strictly live API data. If backend API is unreachable, do not display mock numbers.
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Tổng Quan Hệ Thống <span className="gradient-text">PlayNest CMS</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Quản lý nội dung Social Videos, App Store Showcase và Web Games SDK
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-sm font-medium text-gray-300 hover:text-white transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-purple-400" : ""}`} />
            Làm mới
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-300">
            <Mail className="w-3.5 h-3.5" />
            contact@playnest.zone
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Social Videos */}
        <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Social Videos</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{stats?.totalVideos || 0}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>{stats?.totalVideoViews.toLocaleString() || 0} lượt xem</span>
            </div>
          </div>
        </div>

        {/* Card 2: App Showcase */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">App Store Items</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{stats?.totalApps || 0}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <MousePointerClick className="w-3.5 h-3.5 text-pink-400" />
              <span>{stats?.totalAppClicks.toLocaleString() || 0} lượt click chuyển hướng</span>
            </div>
          </div>
        </div>

        {/* Card 3: Web Games */}
        <div className="glass-panel p-6 rounded-2xl border border-pink-500/20 relative overflow-hidden group hover:border-pink-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Web Games Active</span>
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{stats?.totalGames || 0}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <PlayCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>{stats?.totalGamePlays.toLocaleString() || 0} lượt chơi tổng cộng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" />
            Quản Lý Video Social
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Dán URL video từ YouTube, TikTok hoặc Facebook. Hệ thống API oEmbed sẽ tự động lấy Tiêu đề, Thumbnail và Mã nhúng chuẩn để hiển thị trên Portal.
          </p>
          <a
            href="/videos"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all"
          >
            Đến trang quản lý Video →
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            Tích Hợp Game Web & SDK
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Quản lý danh mục game web, phân quyền SDK Keys cho lập trình viên và theo dõi điểm số gửi về từ package <code className="text-cyan-300">@playnest/game-sdk</code>.
          </p>
          <a
            href="/games"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition-all"
          >
            Đến trang quản lý Game SDK →
          </a>
        </div>
      </div>
    </div>
  );
}
