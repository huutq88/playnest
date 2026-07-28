import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'PlayNest.zone - Instant Brain & Casual Web Games',
  description: 'Hundreds of fun puzzle games waiting for you. No download required, play instantly on any device.',
  keywords: ['playnest', 'web game', 'casual game', 'brain test', 'puzzle game', 'playnest.zone'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} dark`}>
      <body className="min-h-screen bg-[#0D0F23] text-slate-100 font-sans antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
