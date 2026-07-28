'use client';

import React, { useEffect, useState } from 'react';
import { Users, Calendar, Trophy, Activity } from 'lucide-react';
import { AppStats } from '@/app/api/stats/route';

interface StatsSectionProps {
  initialStats?: AppStats;
}

const DEFAULT_STATS: AppStats = {
  dau: 15420,
  mau: 385000,
  totalLevelsCompleted: 2450000,
  onlineNow: 1280,
  lastUpdated: new Date().toISOString(),
};

export const StatsSection: React.FC<StatsSectionProps> = ({ initialStats }) => {
  const [stats, setStats] = useState<AppStats>(initialStats || DEFAULT_STATS);

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data: AppStats) => {
        if (data && typeof data.dau === 'number') {
          setStats(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching stats:', err);
      });
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="w-full max-w-5xl my-12">
      {/* Live Online Badge */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <Activity className="w-3.5 h-3.5" />
          <span>{formatNumber(stats.onlineNow)} players online now</span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* DAU Card */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/20 shadow-xl overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              DAU (Daily)
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {formatNumber(stats.dau)}+
            </div>
            <p className="text-xs text-slate-400 font-medium">Daily Active Users</p>
          </div>
        </div>

        {/* MAU Card */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/20 shadow-xl overflow-hidden group hover:border-indigo-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400/90 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
              MAU (Monthly)
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {formatNumber(stats.mau)}+
            </div>
            <p className="text-xs text-slate-400 font-medium">Monthly Active Users</p>
          </div>
        </div>

        {/* Total Levels Completed Card */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/20 shadow-xl overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              Puzzles Solved
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {formatNumber(stats.totalLevelsCompleted)}+
            </div>
            <p className="text-xs text-slate-400 font-medium">Total puzzles completed worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
};
