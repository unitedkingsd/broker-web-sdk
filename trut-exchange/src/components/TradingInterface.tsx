'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              supportNetworks: ['bnb', 'arb'],
              supportLanguages: ['en', 'zh-CN', 'ja', 'ko'],
              enableThemeToggle: false,
            },
            state: {
              symbol: 'BTCUSD',
              lng: 'en',
            },
          });

          // Set up event listeners
          window.FuturesSDK.eventListener.on('symbolChange', (data) => {
            console.log('Symbol changed to:', data.symbol);
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
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Trading Interface Error</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <h3 className="text-lg font-semibold text-white mb-2">Loading Trading Interface</h3>
            <p className="text-gray-400">Initializing ApolloX SDK...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="w-full h-full trading-container"
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      />
    </div>
  );
};

export default TradingInterface;