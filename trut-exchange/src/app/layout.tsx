import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/WagmiProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trut Crypto Exchange - Perpetual Futures Trading',
  description: 'Advanced perpetual futures trading platform powered by ApolloX. Trade crypto derivatives with up to 750x leverage.',
  keywords: 'crypto, futures, trading, perpetual, derivatives, DeFi, Web3',
  authors: [{ name: 'Trut Exchange' }],
  openGraph: {
    title: 'Trut Crypto Exchange',
    description: 'Advanced perpetual futures trading platform',
    url: 'https://trut.io',
    siteName: 'Trut Exchange',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trut Crypto Exchange',
    description: 'Advanced perpetual futures trading platform',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}