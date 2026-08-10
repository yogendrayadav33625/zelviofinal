import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zelvio — We Engineer Digital Growth',
  description:
    'Zelvio is a premium digital marketing and tech agency specializing in SEO, paid advertising, web development, and next-gen growth strategies.',
  openGraph: {
    title: 'Zelvio — We Engineer Digital Growth',
    description:
      'Premium digital marketing and tech agency. SEO, PPC, web development, and next-gen growth strategies.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
