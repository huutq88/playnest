"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, Smartphone, Gamepad2, Sparkles, ExternalLink } from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Social Videos", href: "/videos", icon: Video },
    { label: "App Showcase", href: "/apps", icon: Smartphone },
    { label: "Web Games & SDK", href: "/games", icon: Gamepad2 },
    { label: "Live Game Studio", href: "/studio", icon: Sparkles },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 flex flex-col justify-between p-4 min-h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/25">
            PN
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide gradient-text">PlayNest CMS</h1>
            <p className="text-xs text-gray-400">Admin Control Panel</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/80 to-cyan-600/80 text-white shadow-lg shadow-purple-900/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/20 transition-all"
        >
          <span>Xem trang PlayNest Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <div className="px-3 text-[11px] text-gray-500">
          <p>Version 1.0.0 Monorepo</p>
          <p>Email: contact@playnest.zone</p>
        </div>
      </div>
    </aside>
  );
}
