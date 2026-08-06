"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Video, Smartphone, Sparkles, Mail, ExternalLink } from "lucide-react";

export function HeaderNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Web Games", href: "/games", icon: Gamepad2, badge: "SDK Ready" },
    { label: "Social Videos", href: "/videos", icon: Video, badge: "YouTube/TikTok/FB" },
    { label: "App Showcase", href: "/apps", icon: Smartphone, badge: "Google Play/App Store" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 backdrop-blur-xl bg-[#090d16]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-all">
            PN
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight gradient-text">PlayNest</span>
            <span className="text-[10px] block text-purple-400 font-semibold tracking-wider uppercase -mt-1">Entertainment Hub</span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          <Link
            href="/"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              pathname === "/" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            Trang Chủ
          </Link>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all"
          >
            <span>Admin CMS</span>
            <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
          </a>
          <a
            href="mailto:contact@playnest.zone"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:opacity-90 text-white text-xs font-extrabold shadow-lg shadow-purple-900/30 transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Liên Hệ</span>
          </a>
        </div>
      </div>
    </header>
  );
}
