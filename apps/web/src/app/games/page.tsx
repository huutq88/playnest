"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gamepad2, Play, Star, Code2, Sparkles } from "lucide-react";
import { WebGame } from "@playnest/shared-types";

export default function WebGamesHubPage() {
  const [games, setGames] = useState<WebGame[]>([]);

  useEffect(() => {
    fetch("/api/v1/games")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setGames(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider">
          Web Games Portal
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Chơi Game Ngay Không Cần Cài Đặt Tại <span className="gradient-text">PlayNest</span>
        </h1>
        <p className="text-sm text-gray-400">
          Danh mục trò chơi giải đố và casual web tương thích hoàn hảo trên Mobile & Desktop!
        </p>
      </div>

      {/* Games Catalog Grid */}
      {games.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-white/10 max-w-xl mx-auto">
          <Gamepad2 className="w-12 h-12 text-pink-400 mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white">Chưa có Web Game nào</h3>
          <p className="text-xs text-gray-400">
            Hãy đăng ký hoặc xuất bản game mới thông qua trang Admin CMS.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 group hover:border-pink-500/50 transition-all duration-300 shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-black/60 overflow-hidden">
                <img
                  src={game.thumbnailUrl}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="px-3 py-1 rounded-xl bg-pink-600/90 text-white text-[10px] font-black uppercase tracking-wider">
                    Engine: {game.engine}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-pink-300 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{game.description}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {game.rating}
                  </span>
                  <span>{game.playsCount.toLocaleString()} lượt chơi</span>
                </div>

                <Link
                  href={game.gameUrl}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white text-xs font-black shadow-lg shadow-pink-900/30 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>CHƠI NGAY THAM GIA</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Developer SDK Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-cyan-950/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            <span>PlayNest Game SDK Package</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Bạn Là Nhà Phát Triển Game Web?</h2>
          <p className="text-sm text-gray-300 max-w-xl">
            Tích hợp thư viện <code className="text-purple-300 bg-black/40 px-2 py-0.5 rounded">@playnest/game-sdk</code> vào game của bạn để tự động lưu tiến trình, xếp hạng điểm số và phát hành trên cổng <code className="text-cyan-300">playnest.zone</code>.
          </p>
        </div>
        <a
          href="mailto:contact@playnest.zone"
          className="px-6 py-3.5 rounded-2xl bg-white text-purple-950 font-black text-xs hover:bg-gray-100 shadow-xl whitespace-nowrap"
        >
          Đăng Ký Xuất Bản Game →
        </a>
      </div>
    </div>
  );
}
