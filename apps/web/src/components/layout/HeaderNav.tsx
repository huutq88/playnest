"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Mail, Phone, ShoppingBag, ShieldCheck, Heart } from "lucide-react";

export function HeaderNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Thời Trang Trẻ Em", href: "#products", icon: ShoppingBag },
    { label: "Bán Buôn May Mặc", href: "#wholesale", icon: Sparkles },
    { label: "Pháp Lý & Uy Tín", href: "#legals", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 backdrop-blur-xl bg-[#090d16]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-all">
            BTK
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight gradient-text">BẢO TRÂM KIDS</span>
            <span className="text-[10px] block text-pink-400 font-semibold tracking-wider uppercase -mt-1">Thời Trang Trẻ Em Cao Cấp</span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          <Link
            href="/"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              pathname === "/" ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            Trang Chủ
          </Link>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <Icon className="w-4 h-4 text-pink-400" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="tel:0989987331"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white text-xs font-extrabold shadow-lg shadow-pink-900/30 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>0989987331</span>
          </a>
        </div>
      </div>
    </header>
  );
}
