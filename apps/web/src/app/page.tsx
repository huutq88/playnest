'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Sparkles,
  Zap,
  Smartphone,
  CloudOff,
  Gift,
  Search,
  Brain,
  Grid,
  Trophy,
  ArrowRight,
  Send,
  Facebook,
  Youtube,
  Gamepad2,
  BookOpen,
  Calculator,
  Layers,
  Star,
  Flame,
  Clock,
  Lock,
} from 'lucide-react';
import { StatsSection } from '@/components/landing/StatsSection';
import { useFirebaseSync } from '@/hooks/useFirebaseSync';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto initialize Firebase Analytics & log page_view
  useFirebaseSync();

  const categories = [
    { name: 'All', icon: Grid },
    { name: 'Brain', icon: Brain },
    { name: 'Object Hunt', icon: Search },
    { name: 'Word', icon: BookOpen },
    { name: 'Logic', icon: Gamepad2 },
    { name: 'Math', icon: Calculator },
    { name: 'Other', icon: Layers },
  ];

  const topGames = [
    {
      id: 'tricky-brain',
      title: 'Tricky Brain Quest',
      category: 'Brain & Logic',
      rating: 4.9,
      plays: '124K',
      badge: 'HOT',
      status: 'active',
      logo: '/images/logo-tricky-brain-quest.png',
      desc: 'Interactive brain-teasing riddles. Think outside the box to solve puzzles.',
    },
    {
      id: 'find-the-dog',
      title: 'Find the Dog',
      category: 'Object Hunt',
      rating: 4.8,
      plays: '98K',
      badge: 'IN DEV',
      status: 'dev',
      logo: '/images/logo-playnest.png',
      desc: 'Spot hidden puppies across detailed cartoon scenes.',
    },
    {
      id: 'word-connect',
      title: 'Word Connect',
      category: 'Word Puzzle',
      rating: 4.8,
      plays: '85K',
      badge: 'IN DEV',
      status: 'dev',
      logo: '/images/logo-playnest.png',
      desc: 'Connect letter blocks to form valid vocabulary words.',
    },
    {
      id: 'find-difference',
      title: 'Find the Difference',
      category: 'Observation',
      rating: 4.7,
      plays: '72K',
      badge: 'IN DEV',
      status: 'dev',
      logo: '/images/logo-playnest.png',
      desc: 'Compare two images and uncover 5 subtle differences.',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleDisabledGameClick = (title: string) => {
    setToastMessage(`"${title}" is currently under active development. Stay tuned!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0D0F23] text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white relative overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-2xl border border-purple-400/40 flex items-center gap-2 animate-bounce">
          <Clock className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Background Ambient Lighting Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/20 via-purple-600/15 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-pink-500/10 blur-[150px] pointer-events-none" />

      {/* ---------------- 01. NAVIGATION BAR ---------------- */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
            <Image
              src="/images/logo-playnest.png"
              alt="PlayNest Logo"
              width={44}
              height={44}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-0.5">
              PlayNest<span className="text-pink-500 text-lg">.zone</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <Link href="#hero" className="hover:text-white transition-colors text-white">
            Home
          </Link>
          <Link href="#categories" className="hover:text-white transition-colors">
            Games
          </Link>
          <Link href="#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#top-games" className="hover:text-white transition-colors">
            Leaderboards
          </Link>
          <Link href="#footer" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/play/tricky-brain"
            className="gradient-btn-primary px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-lg flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play Now</span>
          </Link>
        </div>
      </header>

      {/* ---------------- 01. HERO SECTION ---------------- */}
      <section id="hero" className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-10 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Where Brain Puzzle & Casual Games Meet</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Play Instant. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Think Different.
            </span> <br />
            Relax Daily.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Hundreds of fun puzzle games waiting for you. No download required, play instantly on any device.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/play/tricky-brain"
              className="gradient-btn-primary px-8 py-4 rounded-full text-base font-extrabold text-white flex items-center gap-3 shadow-xl"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Explore Games</span>
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-base font-bold transition-all shadow-md"
            >
              View Features
            </Link>
          </div>

          {/* 4 Micro Feature Pill Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 w-full max-w-2xl">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Instant Browser Play</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <Smartphone className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Smooth on All Devices</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <CloudOff className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">No Download Needed</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <Gift className="w-4 h-4 text-pink-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Weekly Game Updates</span>
            </div>
          </div>
        </div>

        {/* Right Hero Logo Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 opacity-30 blur-3xl animate-pulse" />

          <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#131738]/90 to-[#0F122B]/90 border border-purple-500/30 shadow-2xl backdrop-blur-xl text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative mx-auto w-36 h-36 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-600 to-pink-500 opacity-40 blur-xl animate-spin" style={{ animationDuration: '12s' }} />
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-400/40">
                <Image
                  src="/images/logo-tricky-brain-quest.png"
                  alt="Tricky Brain Quest Official Logo"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Tricky Brain Quest</h3>
            <p className="text-xs text-slate-400 mb-6">Levels 1 - 5 • Featured Game of the Week!</p>

            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>7 Day Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-purple-400" />
                <span>150 PTS</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Top 12%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 02. GAME CATEGORIES SECTION ---------------- */}
      <section id="categories" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Popular Game Categories</h2>
          <p className="text-slate-400 text-sm sm:text-base">Pick your favorite genre and jump into the action</p>
        </div>

        {/* Category Chips Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'gradient-btn-primary text-white shadow-lg shadow-purple-500/25'
                    : 'bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Feature Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Brain', icon: Brain, color: 'from-blue-600 to-cyan-500' },
            { title: 'Object Hunt', icon: Search, color: 'from-purple-600 to-pink-500' },
            { title: 'Word', icon: BookOpen, color: 'from-amber-500 to-orange-500' },
            { title: 'Logic', icon: Gamepad2, color: 'from-emerald-500 to-teal-500' },
            { title: 'Math', icon: Calculator, color: 'from-indigo-600 to-blue-500' },
            { title: 'Other', icon: Layers, color: 'from-rose-500 to-pink-600' },
          ].map((item, idx) => {
            const CardIcon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 cursor-pointer group transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <CardIcon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-200 group-hover:text-white">{item.title}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            href="/levels"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------------- 03. FEATURE HIGHLIGHTS ---------------- */}
      <section id="features" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why Choose PlayNest?</h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Smooth web gaming experience optimized for you anywhere, anytime
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant Browser Play</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              No downloads, no installations. Open web and start playing immediately.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Light & Smooth</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ultra-lightweight memory footprint optimized for mobile, tablet, and PC.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/15 text-pink-400 flex items-center justify-center border border-pink-500/30">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Hundreds of Free Games</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Rich game catalog with new puzzle challenges added every week.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Challenges & Rank</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Compete score rankings with friends and gamers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 04. TOP GAMES SECTION ---------------- */}
      <section id="top-games" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Top Rated Games</h2>
          <p className="text-slate-400 text-sm sm:text-base">Handpicked and top-rated by our gaming community</p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {topGames.map((game) => (
            <div
              key={game.id}
              className="glass-card p-5 rounded-3xl flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Game Thumbnail Cover */}
                <div className="relative w-full h-44 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-lg mb-4">
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-extrabold text-white tracking-wider">
                      {game.category}
                    </span>
                    {game.badge && (
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black text-white ${
                        game.status === 'active' ? 'bg-pink-500' : 'bg-slate-700'
                      }`}>
                        {game.badge}
                      </span>
                    )}
                  </div>

                  <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto shadow-2xl group-hover:scale-110 transition-transform">
                    <Image
                      src={game.logo}
                      alt={game.title}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-white z-10">
                    <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{game.rating}</span>
                    </div>
                    <span className="text-slate-300">{game.plays} plays</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors flex items-center justify-between">
                  <span>{game.title}</span>
                  {game.status === 'dev' && <Lock className="w-4 h-4 text-slate-500 shrink-0" />}
                </h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">
                  {game.desc}
                </p>
              </div>

              <div className="mt-5">
                {game.status === 'active' ? (
                  <Link
                    href={`/play/${game.id}`}
                    className="w-full py-2.5 rounded-xl gradient-btn-primary text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Now</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleDisabledGameClick(game.title)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-slate-850 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>In Development</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/levels"
            className="gradient-btn-primary px-8 py-3.5 rounded-full text-sm font-bold text-white inline-flex items-center gap-2 shadow-xl"
          >
            <span>View All Games</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------------- LIVE DAU & MAU STATS ---------------- */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-center">
        <StatsSection />
      </section>

      {/* ---------------- 05. CTA SECTION ---------------- */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 my-16 text-center">
        <div className="relative p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-500/90 shadow-2xl overflow-hidden border border-purple-400/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Ready to Play?</h2>
            <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed">
              Join PlayNest today and start your amazing brain puzzle entertainment journey!
            </p>

            <div className="pt-2">
              <Link
                href="/play/tricky-brain"
                className="px-10 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-base transition-all shadow-xl inline-flex items-center gap-3 active:scale-95"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Play Free Now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 06. FOOTER SECTION ---------------- */}
      <footer id="footer" className="relative z-10 border-t border-slate-800/80 bg-[#0A0C1C] pt-16 pb-12">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left mb-12">
          {/* Col 1: Brand Info with Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/logo-playnest.png"
                  alt="PlayNest Logo"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xl font-black text-white">PlayNest<span className="text-pink-500">.zone</span></span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              PlayNest is an online brain game platform designed for entertainment, mental training, and daily relaxation on any device.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/levels" className="hover:text-white transition-colors">Games</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="#top-games" className="hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="/play/tricky-brain" className="hover:text-white transition-colors">Daily Challenge</Link></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get Latest Updates</h4>
            <p className="text-slate-400 text-xs">News, new games, and exciting events.</p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shrink-0 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-medium">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Bottom Bar Copyright */}
        <div className="w-full max-w-7xl mx-auto px-6 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
          <p>© 2026 PlayNest.zone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
