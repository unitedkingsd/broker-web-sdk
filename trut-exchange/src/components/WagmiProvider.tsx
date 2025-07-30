'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { ReactNode } from 'react';

const config = createConfig(
  getDefaultConfig({
    chains: [bsc],
    transports: {
      [bsc.id]: http(),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: 'Trut Crypto Exchange',
    appDescription: 'Professional Perpetuals Crypto Exchange on BNB Smart Chain',
    appUrl: 'https://trut.io',
    appIcon: 'https://trut.io/favicon.ico',
    connectors: [
      injected({
        target: {
          id: 'injected',
          name: 'Browser Wallet (MetaMask, Trust Wallet)',
          provider: typeof window !== 'undefined' ? window.ethereum : undefined,
        },
      }),
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        metadata: {
          name: 'Trut Crypto Exchange',
          description: 'Professional Perpetuals Crypto Exchange on BNB Smart Chain',
          url: 'https://trut.io',
          icons: ['https://trut.io/favicon.ico'],
        },
      }),
      coinbaseWallet({
        appName: 'Trut Crypto Exchange',
        appLogoUrl: 'https://trut.io/favicon.ico',
      }),
    ],
  })
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}