import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/layout/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

const siteUrl = 'https://playnest.zone';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hộ Kinh Doanh Bảo Trâm Kids - Thời Trang Trẻ Em & Bán Buôn May Mặc',
    template: '%s | Hộ Kinh Doanh Bảo Trâm Kids',
  },
  description: 'Chuyên sản xuất, bán buôn và bán lẻ thời trang trẻ em, hàng may mặc, giày dép và phụ kiện cao cấp. Mã số đăng ký hộ kinh doanh: 040190008784.',
  keywords: [
    'Bảo Trâm Kids',
    'Hộ Kinh Doanh Bảo Trâm Kids',
    'thời trang trẻ em',
    'bán buôn hàng may mặc',
    'quần áo trẻ em giá sỉ',
    'giày dép trẻ em',
    '040190008784',
  ],
  authors: [{ name: 'Hộ Kinh Doanh Bảo Trâm Kids' }],
  creator: 'Hộ Kinh Doanh Bảo Trâm Kids',
  publisher: 'Hộ Kinh Doanh Bảo Trâm Kids',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Hộ Kinh Doanh Bảo Trâm Kids - Thời Trang Trẻ Em Cao Cấp',
    description: 'Chuyên sản xuất, bán buôn và bán lẻ thời trang trẻ em, hàng may mặc, giày dép và phụ kiện cao cấp. MST: 040190008784.',
    url: siteUrl,
    siteName: 'Hộ Kinh Doanh Bảo Trâm Kids',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hộ Kinh Doanh Bảo Trâm Kids - Thời Trang Trẻ Em Cao Cấp',
    description: 'Chuyên sản xuất, bán buôn và bán lẻ thời trang trẻ em, hàng may mặc, giày dép và phụ kiện cao cấp.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hộ Kinh Doanh Bảo Trâm Kids',
    taxID: '040190008784',
    url: siteUrl,
    telephone: '0989987331',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Số LK18-09, Khu Dọc Bún 2, Phường Hà Đông',
      addressLocality: 'Thành phố Hà Nội',
      addressCountry: 'VN',
    },
    founder: {
      '@type': 'Person',
      name: 'Đặng Thị Nguyên',
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
      <body className="min-h-screen bg-[#090d16] text-slate-100 font-sans antialiased selection:bg-purple-600 selection:text-white flex flex-col justify-between">
        <HeaderNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
