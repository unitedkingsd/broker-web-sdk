import dynamic from 'next/dynamic';
import Script from 'next/script';
import Header from '@/components/Header';

// Dynamically import TradingInterface to avoid SSR issues
const TradingInterface = dynamic(() => import('@/components/TradingInterface'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        <h3 className="text-lg font-semibold text-white mb-2">Loading Trading Platform</h3>
        <p className="text-gray-400">Preparing your trading experience...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="relative">
        <TradingInterface />
      </main>

      {/* Load ApolloX SDK */}
      <Script 
        src="/sdk/sdk.2.0.0.js" 
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('ApolloX SDK loaded successfully');
        }}
        onError={(e) => {
          console.error('Failed to load ApolloX SDK:', e);
        }}
      />
    </div>
  );
}