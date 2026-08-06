"use client";

import React, { useEffect, useState, useRef } from "react";
import { ShieldAlert, BookOpen, ExternalLink, CheckCircle2 } from "lucide-react";
import { WebGame } from "@playnest/shared-types";

interface IframeGameContainerProps {
  game: WebGame;
}

export const IframeGameContainer: React.FC<IframeGameContainerProps> = ({ game }) => {
  const [sdkConnected, setSdkConnected] = useState<boolean | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 5 seconds timeout to verify SDK compatibility handshake
    const timer = setTimeout(() => {
      if (sdkConnected === null) {
        setSdkConnected(false); // Incompatible if no SDK signal received
      }
    }, 5000);

    const handleWindowMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      const { type, payload } = event.data;

      if (type === "PLAYNEST_GAME_READY") {
        setSdkConnected(true);
      } else if (type === "PLAYNEST_SUBMIT_SCORE") {
        setSdkConnected(true);
        if (payload && typeof payload.score === "number") {
          setLastScore(payload.score);
          fetch(`/api/v1/games/${game.id}/score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }).catch(() => {});
        }
      }
    };

    window.addEventListener("message", handleWindowMessage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("message", handleWindowMessage);
    };
  }, [game.id, sdkConnected]);

  // Strict Incompatibility Block Overlay
  if (sdkConnected === false) {
    return (
      <div className="w-full max-w-[480px] mx-auto glass-panel p-8 rounded-3xl border border-red-500/30 text-center space-y-6 shadow-2xl bg-gradient-to-b from-red-950/40 via-black to-red-950/20">
        <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto shadow-lg shadow-red-900/30">
          <ShieldAlert className="w-9 h-9 text-red-400 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-white">Game Không Tương Thích Với PlayNest</h3>
          <p className="text-xs text-red-200/80 leading-relaxed max-w-sm mx-auto">
            Tựa game <strong className="text-white">"{game.title}"</strong> chưa cài đặt thư viện{" "}
            <code className="text-pink-300 font-mono font-bold bg-pink-950/60 px-1.5 py-0.5 rounded border border-pink-500/30">
              @playnest/game-sdk
            </code>
            . Cổng PlayNest bắt buộc tất cả Web Game phải tích hợp SDK để đảm bảo tính tương thích.
          </p>
        </div>

        <div className="pt-2">
          <a
            href="https://github.com/huutq88/playnest/blob/main/docs/GAME_SDK_INTEGRATION_GUIDE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 hover:opacity-90 text-white text-xs font-black shadow-lg shadow-red-900/40 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Xem Hướng Dẫn Tích Hợp SDK</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Compatibility Status Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel border border-white/10 text-xs">
        <div className="flex items-center gap-2">
          {sdkConnected === true ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-300">PlayNest SDK Verified ⚡ (Tương thích 100%)</span>
            </>
          ) : (
            <>
              <div className="w-3.5 h-3.5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
              <span className="text-gray-400">Đang xác thực kết nối PlayNest SDK...</span>
            </>
          )}
        </div>

        {lastScore !== null && (
          <span className="font-extrabold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-500/30">
            Điểm số: {lastScore.toLocaleString()}
          </span>
        )}
      </div>

      {/* Frame Container */}
      <div className="relative w-full max-w-[440px] aspect-[9/16] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black">
        <iframe
          ref={iframeRef}
          src={game.gameUrl}
          title={game.title}
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; keyboard; geolocation"
        />
      </div>
    </div>
  );
};
