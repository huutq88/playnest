import type { Metadata } from 'next';
import { GamePlayClient } from '@/components/game/GamePlayClient';

const siteUrl = 'https://playnest.zone';

interface GamePageProps {
  params: Promise<{ gameId: string }>;
}

const gameCatalog: Record<
  string,
  {
    name: string;
    description: string;
    category: string;
    keywords: string[];
    bgImage: string;
  }
> = {
  'tricky-brain': {
    name: 'Tricky Brain Quest',
    description:
      'Play Tricky Brain Quest online for free on PlayNest.zone! Solve 50 tricky brain-teaser puzzle levels, test your logic IQ, and compete on the global leaderboard.',
    category: 'Puzzle / Brain Games',
    keywords: [
      'tricky brain quest',
      'brain test online',
      'free puzzle game',
      'iq test game',
      'riddle games',
      'playnest games',
    ],
    bgImage: '/og-image.png',
  },
};

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const gameId = resolvedParams.gameId || 'tricky-brain';
  const game = gameCatalog[gameId] || {
    name: gameId.replace('-', ' ').toUpperCase(),
    description: `Play ${gameId} online for free on PlayNest.zone!`,
    category: 'Casual Game',
    keywords: [gameId, 'web game', 'playnest'],
    bgImage: '/og-image.png',
  };

  const pageUrl = `${siteUrl}/play/${gameId}`;

  return {
    title: `${game.name} - Free Online Brain Puzzle Game`,
    description: game.description,
    keywords: game.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${game.name} - 50 Tricky Puzzle Levels | PlayNest.zone`,
      description: game.description,
      url: pageUrl,
      siteName: 'PlayNest.zone',
      images: [
        {
          url: game.bgImage,
          width: 1200,
          height: 630,
          alt: game.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} - Play Free Online`,
      description: game.description,
      images: [game.bgImage],
    },
  };
}

export default async function GamePlayPage({ params }: GamePageProps) {
  const resolvedParams = await params;
  const gameId = resolvedParams.gameId || 'tricky-brain';

  const game = gameCatalog[gameId] || {
    name: 'Tricky Brain Quest',
    description: 'Play Tricky Brain Quest online for free on PlayNest.zone!',
    category: 'Puzzle',
  };

  const jsonLdGame = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: game.name,
    operatingSystem: 'Any (Web Browser)',
    applicationCategory: 'GameApplication',
    genre: game.category,
    url: `${siteUrl}/play/${gameId}`,
    description: game.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '12800',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGame) }}
      />
      <GamePlayClient gameId={gameId} />
    </>
  );
}
