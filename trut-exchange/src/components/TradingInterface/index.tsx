'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { Loader2, AlertCircle, TrendingUp } from 'lucide-react';
import NeonButton from '../NeonButton';

// Define the FuturesSDK object on the window for TypeScript
declare global {
  interface Window {
    FuturesSDK: {
      createTradeUI: (config: {
        container: HTMLElement;
        config: {
          staticBaseUrl: string;
          brokerId: number;
          futuresWsHost: string;
          graphqlTemplateUrl: string;
          apiBaseUrl?: string;
          defaultTheme: string;
          customCssUrl?: string;
          headerConfig: any;
          supportNetworks: string[];
          supportLanguages: string[];
          enableThemeToggle: boolean;
          [key: string]: any;
        };
        state: {
          symbol: string;
          lng: string;
        };
      }) => void;
      eventListener: {
        on: (event: string, callback: (data: any) => void) => void;
      };
    };
  }
}

const TradingInterface = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSymbol, setCurrentSymbol] = useState('BTCUSD');

  useEffect(() => {
    const initializeSDK = () => {
      if (window.FuturesSDK && containerRef.current) {
        try {
          const { origin, protocol } = window.location;
          const isDev = protocol === 'http:';

          window.FuturesSDK.createTradeUI({
            container: containerRef.current,
            config: {
              staticBaseUrl: '/static/',
              brokerId: parseInt(process.env.NEXT_PUBLIC_APOLLOX_BROKER_ID || '2046'),
              futuresWsHost: 'wss://fstream.apollox.finance/plain',
              graphqlTemplateUrl: 'https://api.thegraph.com/subgraphs/name/apollx-apx/apollox-perp-{{network}}',
              apiBaseUrl: isDev ? origin : undefined,
              defaultTheme: 'dark',
              customCssUrl: '/custom-trading.css',
              headerConfig: {
                disable: true, // We're using our own header
              },
              supportNetworks: ['bnb'], // Only BNB Smart Chain
              supportLanguages: ['en', 'zh-CN', 'ja', 'ko'],
              enableThemeToggle: false,
            },
            state: {
              symbol: currentSymbol,
              lng: 'en',
            },
          });

          // Set up event listeners
          window.FuturesSDK.eventListener.on('symbolChange', (data) => {
            console.log('Symbol changed to:', data.symbol);
            setCurrentSymbol(data.symbol);
          });

          window.FuturesSDK.eventListener.on('startLoad', () => {
            setIsLoading(false);
          });

          setIsLoading(false);
        } catch (err) {
          console.error('Failed to initialize ApolloX SDK:', err);
          setError('Failed to load trading interface');
          setIsLoading(false);
        }
      }
    };

    // Check if SDK is already loaded
    if (window.FuturesSDK) {
      initializeSDK();
    } else {
      // Wait for SDK to load
      const checkSDK = setInterval(() => {
        if (window.FuturesSDK) {
          clearInterval(checkSDK);
          initializeSDK();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkSDK);
        if (!window.FuturesSDK) {
          setError('Failed to load ApolloX SDK');
          setIsLoading(false);
        }
      }, 10000);

      return () => clearInterval(checkSDK);
    }
  }, [currentSymbol]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Trading Interface Error</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">{error}</p>
          <NeonButton 
            onClick={() => window.location.reload()} 
            variant="primary"
            size="lg"
            className="w-full"
          >
            Reload Trading Interface
          </NeonButton>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-transparent border-r-blue-500 rounded-full animate-spin animate-reverse"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Loading Trading Interface</h3>
            <p className="text-gray-400 mb-2">Initializing ApolloX SDK...</p>
            <p className="text-sm text-purple-400">Connecting to BNB Smart Chain</p>
          </div>
        </div>
      )}

      {/* Wallet Connection Notice */}
      {!isConnected && !isLoading && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 max-w-md mx-auto">
          <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-xl px-6 py-4 shadow-lg shadow-yellow-500/10">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="text-yellow-300 text-sm font-medium">
                Connect your wallet to start trading on BNB Smart Chain
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Trading Interface Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full trading-container relative"
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      />
    </div>
  );
};

export default TradingInterface;