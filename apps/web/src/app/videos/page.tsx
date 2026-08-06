"use client";

import { useState, useEffect } from "react";
import { Video, Play, ExternalLink, Filter } from "lucide-react";
import { SocialVideo } from "@playnest/shared-types";

export default function SocialVideosHubPage() {
  const [videos, setVideos] = useState<SocialVideo[]>([]);
  const [activePlatform, setActivePlatform] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<SocialVideo | null>(null);

  useEffect(() => {
    fetch("/api/v1/videos")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setVideos(json.data);
      })
      .catch(() => {});
  }, []);

  const filteredVideos = activePlatform === "all"
    ? videos
    : videos.filter((v) => v.platform === activePlatform);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
          Social Video Hub
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Video Giải Trí Nổi Bật Trên <span className="gradient-text">PlayNest</span>
        </h1>
        <p className="text-sm text-gray-400">
          Tổng hợp các video clips hài hước, gameplay đố mẹo độc đáo từ YouTube, TikTok và Facebook!
        </p>
      </div>

      {/* Platform Filters */}
      <div className="flex justify-center items-center gap-2">
        {[
          { label: "Tất cả Nền tảng", value: "all" },
          { label: "YouTube", value: "youtube" },
          { label: "TikTok", value: "tiktok" },
          { label: "Facebook", value: "facebook" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActivePlatform(tab.value)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activePlatform === tab.value
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "glass-panel text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-white/10 max-w-xl mx-auto">
          <Video className="w-12 h-12 text-purple-400 mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white">Chưa có Social Video nào</h3>
          <p className="text-xs text-gray-400">
            Hãy dán URL video mới từ YouTube, TikTok hoặc Facebook thông qua trang Admin CMS để xuất bản.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
            >
              <div className="relative aspect-video bg-black/60 overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-all">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md text-[10px] font-black uppercase text-purple-300 border border-white/10 shadow-md">
                  {video.platform}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">{video.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-gray-500">
                  <span>Tác giả: {video.authorName}</span>
                  <span>{video.viewsCount.toLocaleString()} lượt xem</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-4xl rounded-2xl overflow-hidden border border-white/20 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold text-white text-base line-clamp-1">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
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
