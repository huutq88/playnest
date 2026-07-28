import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

const MOCK_LEADERBOARD = [
  { rank: 1, nickname: 'CyberDragon #88', stars: 150, completedCount: 50, coins: 500, isCurrentUser: false },
  { rank: 2, nickname: 'PuzzleMaster #99', stars: 144, completedCount: 48, coins: 480, isCurrentUser: false },
  { rank: 3, nickname: 'SpeedyFox #102', stars: 135, completedCount: 45, coins: 450, isCurrentUser: false },
  { rank: 4, nickname: 'CleverOwl #304', stars: 120, completedCount: 40, coins: 400, isCurrentUser: false },
  { rank: 5, nickname: 'ShadowWolf #77', stars: 111, completedCount: 37, coins: 370, isCurrentUser: false },
  { rank: 6, nickname: 'ApexFalcon #55', stars: 99, completedCount: 33, coins: 330, isCurrentUser: false },
  { rank: 7, nickname: 'HyperPanda #12', stars: 90, completedCount: 30, coins: 300, isCurrentUser: false },
  { rank: 8, nickname: 'GoldenViper #89', stars: 84, completedCount: 28, coins: 280, isCurrentUser: false },
  { rank: 9, nickname: 'CosmicTiger #44', stars: 75, completedCount: 25, coins: 250, isCurrentUser: false },
  { rank: 10, nickname: 'MysticPanther #31', stars: 66, completedCount: 22, coins: 220, isCurrentUser: false },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guestId = searchParams.get('guestId');
  const userStars = parseInt(searchParams.get('stars') || '0', 10);
  const userNickname = searchParams.get('nickname') || 'You (Guest)';

  try {
    const scoresRef = collection(db, 'leaderboards', 'tricky-brain', 'scores');
    const q = query(scoresRef, orderBy('stars', 'desc'), limit(20));
    const snapshot = await getDocs(q);

    let list: any[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        guestId: data.guestId,
        nickname: data.nickname || 'Gamer',
        stars: data.stars || 0,
        completedCount: data.completedCount || 0,
        coins: data.coins || 0,
        isCurrentUser: data.guestId === guestId,
      });
    });

    if (list.length === 0) {
      list = [...MOCK_LEADERBOARD];
    }

    // Merge current user if user has stars & not in top list
    if (guestId) {
      const foundIndex = list.findIndex((item) => item.guestId === guestId || item.isCurrentUser);
      if (foundIndex >= 0) {
        list[foundIndex].stars = Math.max(list[foundIndex].stars, userStars);
        list[foundIndex].nickname = userNickname;
        list[foundIndex].isCurrentUser = true;
      } else {
        list.push({
          guestId,
          nickname: userNickname,
          stars: userStars,
          completedCount: Math.floor(userStars / 3),
          coins: userStars * 10,
          isCurrentUser: true,
        });
      }
    }

    // Sort list by stars desc
    list.sort((a, b) => b.stars - a.stars);
    list = list.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    return NextResponse.json({
      success: true,
      leaderboard: list,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      leaderboard: MOCK_LEADERBOARD,
    });
  }
}
