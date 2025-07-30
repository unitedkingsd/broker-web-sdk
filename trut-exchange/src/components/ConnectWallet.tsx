'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import NeonButton from './NeonButton';
import { useState } from 'react';

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect({ connector: injected() });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-mono text-gray-300">
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </span>
        </div>
        <NeonButton 
          onClick={() => disconnect()} 
          variant="secondary" 
          size="sm"
        >
          Disconnect
        </NeonButton>
      </div>
    );
  }

  return (
    <NeonButton 
      onClick={handleConnect} 
      disabled={isPending || isConnecting}
      size="sm"
    >
      {isPending || isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </NeonButton>
  );
};

export default ConnectWallet;