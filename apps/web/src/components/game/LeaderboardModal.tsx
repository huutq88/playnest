'use client';

import React, { useEffect, useState } from 'react';
import { Trophy, Star, X, Edit2, Check, Flame, Shield, Award } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

interface LeaderboardItem {
  rank: number;
  nickname: string;
  stars: number;
  completedCount: number;
  isCurrentUser: boolean;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const { guestId, nickname, stars, updateNickname } = useGameStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
      setEditName(nickname);
    }
  }, [isOpen, stars, nickname]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?guestId=${guestId}&stars=${stars}&nickname=${encodeURIComponent(nickname)}`);
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.leaderboard);
      }
    } catch (e) {
      console.error('Failed to fetch leaderboard:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNickname = () => {
    if (editName.trim().length > 0) {
      updateNickname(editName.trim());
      setIsEditing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-[#0F122B] border border-purple-500/30 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Global Leaderboard</h2>
              <p className="text-xs text-slate-400">Tricky Brain Quest Champions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Card */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-slate-900 border border-purple-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
              YOU
            </div>
            <div className="flex flex-col">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-2 py-1 rounded bg-slate-800 border border-purple-500 text-white text-xs font-bold focus:outline-none"
                    maxLength={20}
                  />
                  <button
                    onClick={handleSaveNickname}
                    className="p-1 rounded bg-emerald-500 text-white hover:bg-emerald-400"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{nickname || 'Guest Gamer'}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <span className="text-[11px] text-purple-300 font-medium">Anonymous ID: {guestId.slice(0, 12)}...</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{stars} Stars</span>
          </div>
        </div>

        {/* Leaderboard Table List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs animate-pulse">Loading rankings...</div>
          ) : (
            leaderboard.map((item) => {
              const isTop3 = item.rank <= 3;
              const badgeColors =
                item.rank === 1
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : item.rank === 2
                  ? 'bg-slate-300 text-slate-950 font-black'
                  : item.rank === 3
                  ? 'bg-amber-700 text-white font-black'
                  : 'bg-slate-800 text-slate-300 font-bold';

              return (
                <div
                  key={item.rank + item.nickname}
                  className={`p-3.5 rounded-2xl flex items-center justify-between border transition-all ${
                    item.isCurrentUser
                      ? 'bg-purple-950/60 border-purple-500 shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-7 h-7 rounded-xl text-xs flex items-center justify-center shrink-0 ${badgeColors}`}>
                      #{item.rank}
                    </span>
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold ${item.isCurrentUser ? 'text-purple-300' : 'text-slate-200'}`}>
                        {item.nickname} {item.isCurrentUser && '(You)'}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.completedCount} levels completed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.stars}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
