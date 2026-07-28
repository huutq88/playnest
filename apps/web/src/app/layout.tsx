import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

const siteUrl = 'https://playnest.zone';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PlayNest.zone - Instant Brain & Casual Web Games',
    template: '%s | PlayNest.zone',
  },
  description: 'Hundreds of fun puzzle and brain-teaser web games. No download required, play instantly on any device.',
  keywords: [
    'playnest',
    'web game',
    'casual game',
    'brain test',
    'puzzle game',
    'instant web games',
    'tricky brain quest',
    'free html5 games',
    'browser games',
    'playnest.zone',
  ],
  authors: [{ name: 'PlayNest Studio' }],
  creator: 'PlayNest Studio',
  publisher: 'PlayNest Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'PlayNest.zone - Instant Brain & Casual Web Games',
    description: 'Hundreds of fun puzzle and brain-teaser web games. No download required, play instantly on any device.',
    url: siteUrl,
    siteName: 'PlayNest.zone',
    images: [
      {
        url: '/images/logo-playnest.png',
        width: 1200,
        height: 630,
        alt: 'PlayNest.zone Web Games',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlayNest.zone - Instant Brain & Casual Web Games',
    description: 'Hundreds of fun puzzle and brain-teaser web games. No download required, play instantly on any device.',
    images: ['/images/logo-playnest.png'],
    creator: '@playnestzone',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PlayNest.zone',
    url: siteUrl,
    description: 'Hundreds of fun puzzle and casual web games.',
    publisher: {
      '@type': 'Organization',
      name: 'PlayNest Studio',
      logo: `${siteUrl}/images/logo-playnest.png`,
    },
  };

  const jsonLdGame = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Tricky Brain Quest',
    operatingSystem: 'Any (Web Browser)',
    applicationCategory: 'GameApplication',
    genre: 'Puzzle',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '124000',
    },
  };

  return (
    <html lang="en" className={`${poppins.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGame) }}
        />
      </head>
      <body className="min-h-screen bg-[#0D0F23] text-slate-100 font-sans antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
