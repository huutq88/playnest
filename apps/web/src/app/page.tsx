"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gamepad2, Video, Smartphone, Play, Star, ExternalLink, Mail, Sparkles, Trophy, Download } from "lucide-react";
import { SocialVideo, AppStoreShowcase, WebGame, SystemStats } from "@playnest/shared-types";

export default function EntertainmentPortalHomePage() {
  const [videos, setVideos] = useState<SocialVideo[]>([]);
  const [apps, setApps] = useState<AppStoreShowcase[]>([]);
  const [games, setGames] = useState<WebGame[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<SocialVideo | null>(null);

  useEffect(() => {
    fetch("/api/v1/videos?featured=true")
      .then((res) => res.json())
      .then((json) => json.success && setVideos(json.data))
      .catch(() => {});

    fetch("/api/v1/apps?featured=true")
      .then((res) => res.json())
      .then((json) => json.success && setApps(json.data))
      .catch(() => {});

    fetch("/api/v1/games?featured=true")
      .then((res) => res.json())
      .then((json) => json.success && setGames(json.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-purple-600/20 via-pink-500/20 to-cyan-400/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 text-xs font-bold text-purple-300 shadow-xl">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Nền Tảng Giải Trí Tổng Hợp Đa Nền Tảng • PlayNest.Zone</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Chơi Game Web, Xem Video & Khám Phá <span className="gradient-text">App Mobile</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Nơi trải nghiệm hàng trăm game giải đố instant web, theo dõi video shorts hot nhất và ứng dụng Google Play / App Store độc quyền.
          </p>

          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
            <Link
              href="/games"
              className="glass-panel p-5 rounded-3xl border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 group shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-white text-base">Web Games Hub</h3>
              <p className="text-xs text-gray-400 mt-1">Chơi ngay không cần cài đặt</p>
            </Link>

            <Link
              href="/videos"
              className="glass-panel p-5 rounded-3xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 group shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-white text-base">Social Videos</h3>
              <p className="text-xs text-gray-400 mt-1">YouTube, TikTok, Facebook</p>
            </Link>

            <Link
              href="/apps"
              className="glass-panel p-5 rounded-3xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 group shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-white text-base">App Showcase</h3>
              <p className="text-xs text-gray-400 mt-1">Google Play & App Store</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Pillar 1: Web Games Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-pink-400 uppercase tracking-wider">Pillar 01</span>
            <h2 className="text-3xl font-extrabold text-white">Web Games Nổi Bật</h2>
          </div>
          <Link href="/games" className="text-xs font-extrabold text-pink-400 hover:text-pink-300 flex items-center gap-1">
            Xem Tất Cả Game →
          </Link>
        </div>

        {games.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl text-center space-y-2 border border-white/10">
            <p className="text-sm font-semibold text-gray-400">Chưa có Web Game nào được đăng tải từ API.</p>
            <p className="text-xs text-gray-500">Truy cập Admin CMS để thêm game mới.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game) => (
              <div key={game.id} className="glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col sm:flex-row group hover:border-pink-500/50 transition-all shadow-xl">
                <img src={game.thumbnailUrl} alt={game.title} className="w-full sm:w-48 aspect-video sm:aspect-square object-cover" />
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-pink-300 transition-colors">{game.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{game.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1 font-bold text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /> {game.rating}</span>
                    <span>{game.playsCount.toLocaleString()} lượt chơi</span>
                  </div>
                  <Link
                    href={game.gameUrl}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-black shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-white" /> CHƠI NGAY
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pillar 2: Social Videos Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">Pillar 02</span>
            <h2 className="text-3xl font-extrabold text-white">Social Video Shorts</h2>
          </div>
          <Link href="/videos" className="text-xs font-extrabold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            Xem Tất Cả Video →
          </Link>
        </div>

        {videos.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl text-center space-y-2 border border-white/10">
            <p className="text-sm font-semibold text-gray-400">Chưa có Social Video nào từ API.</p>
            <p className="text-xs text-gray-500">Truy cập Admin CMS để dán URL video mới.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-purple-500/50 transition-all shadow-xl"
              >
                <div className="relative aspect-video bg-black/60">
                  <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 text-[10px] font-black uppercase text-purple-300 border border-white/10">
                    {vid.platform}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-sm text-white line-clamp-1">{vid.title}</h3>
                  <p className="text-xs text-gray-400">{vid.viewsCount.toLocaleString()} views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pillar 3: App Store Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Pillar 03</span>
            <h2 className="text-3xl font-extrabold text-white">App Store Showcase</h2>
          </div>
          <Link href="/apps" className="text-xs font-extrabold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            Xem Tất Cả Apps →
          </Link>
        </div>

        {apps.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl text-center space-y-2 border border-white/10">
            <p className="text-sm font-semibold text-gray-400">Chưa có ứng dụng App Store nào từ API.</p>
            <p className="text-xs text-gray-500">Truy cập Admin CMS để thêm thông tin ứng dụng mới.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apps.map((app) => (
              <div key={app.id} className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center gap-5">
                <img src={app.iconUrl} alt={app.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10 shadow-lg" />
                <div className="space-y-1 flex-1">
                  <h3 className="font-extrabold text-lg text-white">{app.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">{app.tagline}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                    <span className="text-amber-400 font-bold">★ {app.rating}</span>
                    <span>{app.downloadsCount.toLocaleString()} lượt tải</span>
                  </div>
                </div>
                <Link href="/apps" className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-extrabold">
                  Tải Ngay
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-4xl rounded-2xl overflow-hidden border border-white/20 relative">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold text-white text-base line-clamp-1">{selectedVideo.title}</h3>
              <button onClick={() => setSelectedVideo(null)} className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center">
                ✕
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
