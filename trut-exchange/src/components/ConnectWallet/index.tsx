'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import NeonButton from '../NeonButton';
import { Wallet, LogOut } from 'lucide-react';

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        if (isConnected) {
          return (
            <div className="flex items-center gap-3">
              {/* Wallet Address Display */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
                <span className="text-sm font-mono text-gray-200 tracking-wider">
                  {ensName || truncatedAddress}
                </span>
                <Wallet className="w-4 h-4 text-purple-400" />
              </div>
              
              {/* Disconnect Button */}
              <NeonButton 
                variant="secondary" 
                size="sm"
                onClick={() => disconnect()}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Disconnect</span>
              </NeonButton>
            </div>
          );
        }

        return (
          <NeonButton 
            onClick={show} 
            size="md"
            glowIntensity="high"
            className="flex items-center gap-2 min-w-[140px] justify-center"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </NeonButton>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectWallet;