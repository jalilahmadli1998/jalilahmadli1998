import '@/styles/globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans, Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.example.com'),
  title: {
    default: 'Gelişmiş Mühendislik & Üretim',
    template: '%s | Gelişmiş Mühendislik & Üretim'
  },
  description:
    'Tasarımdan teste tek çatı altında yüksek hassasiyetli üretim çözümleri sunuyoruz. Havacılık, enerji, petrol-gaz ve savunma için güvenilir ortak.',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'ru_RU'],
    url: 'https://www.example.com',
    siteName: 'Gelişmiş Mühendislik & Üretim',
    title: 'Tasarımdan teste tek çatı altında yüksek hassasiyetli üretim.',
    description:
      'Havacılık, enerji, petrol-gaz ve savunma endüstrileri için toleransı garantili üretim ve mühendislik çözümleri.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092795360-9449033d6d87?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Gelişmiş üretim hattı'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gelişmiş Mühendislik & Üretim',
    description: 'Tasarımdan teste tek çatı altında yüksek hassasiyetli üretim.',
    images: ['https://images.unsplash.com/photo-1581092795360-9449033d6d87?auto=format&fit=crop&w=1200&q=80']
  },
  alternates: {
    canonical: 'https://www.example.com'
  }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${plex.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
