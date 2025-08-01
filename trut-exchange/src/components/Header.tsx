'use client';

import { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import { TrendingUp, Zap, BarChart3 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Trut
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Crypto Exchange</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              <TrendingUp className="w-4 h-4" />
              Trading
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              <Zap className="w-4 h-4" />
              Markets
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              Portfolio
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            <ConnectWallet />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Trading
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Markets
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Portfolio
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;