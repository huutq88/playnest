"use client";

import { useState, useEffect } from "react";
import { Smartphone, Star, Download, ExternalLink, CheckCircle } from "lucide-react";
import { AppStoreShowcase } from "@playnest/shared-types";

export default function AppShowcaseHubPage() {
  const [apps, setApps] = useState<AppStoreShowcase[]>([]);

  useEffect(() => {
    fetch("/api/v1/apps")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setApps(json.data);
      })
      .catch(() => {});
  }, []);

  const handleAppClick = (id: string, url?: string) => {
    if (!url) return;
    fetch(`/api/v1/apps/${id}/click`, { method: "POST" }).catch(() => {});
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          App Store Showcase
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Ứng Dụng Mobile Từ <span className="gradient-text">PlayNest Studio</span>
        </h1>
        <p className="text-sm text-gray-400">
          Khám phá các tựa game và ứng dụng độc quyền đã phát hành trên Google Play Store & Apple App Store!
        </p>
      </div>

      {/* Apps Grid */}
      {apps.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-white/10 max-w-xl mx-auto">
          <Smartphone className="w-12 h-12 text-cyan-400 mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white">Chưa có App Store Item nào</h3>
          <p className="text-xs text-gray-400">
            Hãy thêm thông tin ứng dụng Google Play hoặc App Store mới thông qua trang Admin CMS.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <div
              key={app.id}
              className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6"
            >
              <div className="flex items-start gap-5">
                <img
                  src={app.iconUrl}
                  alt={app.name}
                  className="w-20 h-20 rounded-3xl object-cover shadow-xl border border-white/10"
                />
                <div className="space-y-1 flex-1">
                  <h3 className="text-xl font-extrabold text-white">{app.name}</h3>
                  <p className="text-xs font-semibold text-cyan-400">{app.tagline}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 pt-1">{app.description}</p>
                </div>
              </div>

              {/* Badges & Rating */}
              <div className="flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/20">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{app.rating} / 5.0</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{app.downloadsCount.toLocaleString()} lượt tải</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {app.playStoreUrl && (
                  <button
                    onClick={() => handleAppClick(app.id, app.playStoreUrl)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold transition-all"
                  >
                    <span>Google Play</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                )}
                {app.appStoreUrl && (
                  <button
                    onClick={() => handleAppClick(app.id, app.appStoreUrl)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 transition-all"
                  >
                    <span>App Store</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
