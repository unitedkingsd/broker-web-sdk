import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/WagmiProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trut Crypto Exchange - BNB Smart Chain Perpetuals',
  description: 'Professional perpetuals crypto exchange on BNB Smart Chain powered by ApolloX. Trade crypto derivatives with advanced features.',
  keywords: 'crypto, futures, trading, perpetual, derivatives, DeFi, Web3, BNB, Smart Chain, BSC',
  authors: [{ name: 'Trut Exchange' }],
  openGraph: {
    title: 'Trut Crypto Exchange',
    description: 'Advanced perpetual futures trading platform',
    url: 'https://trut.io',
    siteName: 'Trut Exchange',
    type: 'website',
  },
  twitter: {
    title: 'Trut Crypto Exchange - BNB Smart Chain Perpetuals',
    description: 'Professional perpetuals crypto exchange on BNB Smart Chain powered by ApolloX',
    description: 'Professional perpetuals crypto exchange on BNB Smart Chain powered by ApolloX',
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