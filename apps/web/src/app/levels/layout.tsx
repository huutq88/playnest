import type { Metadata } from 'next';

const siteUrl = 'https://playnest.zone';

export const metadata: Metadata = {
  title: 'Select Level - Tricky Brain Quest | PlayNest.zone',
  description: 'Select and play all 50 unlocked puzzle levels in Tricky Brain Quest. Challenge your brain on PlayNest.zone!',
  alternates: {
    canonical: `${siteUrl}/levels`,
  },
  openGraph: {
    title: 'Select Level - Tricky Brain Quest (50 Puzzles)',
    description: 'Select and play all 50 unlocked puzzle levels in Tricky Brain Quest. Challenge your brain on PlayNest.zone!',
    url: `${siteUrl}/levels`,
    siteName: 'PlayNest.zone',
    images: ['/og-image.png'],
  },
};

export default function LevelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
