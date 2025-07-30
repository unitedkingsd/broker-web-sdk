'use client';

import { useState } from 'react';
import ConnectWallet from '../ConnectWallet';
import { TrendingUp, Zap, BarChart3, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/90 border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* Logo with neon effect */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/30 border border-purple-400/50">
                  <span className="text-white font-bold text-lg tracking-wider">T</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
              </div>
              
              {/* Brand Text */}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent tracking-wide">
                  Trut
                </h1>
                <p className="text-xs text-gray-400 -mt-1 font-medium">BNB Smart Chain</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#trading" 
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105 group"
            >
              <TrendingUp className="w-4 h-4 group-hover:text-purple-400" />
              <span className="font-medium">Trading</span>
            </a>
            <a 
              href="#markets" 
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105 group"
            >
              <Zap className="w-4 h-4 group-hover:text-purple-400" />
              <span className="font-medium">Markets</span>
            </a>
            <a 
              href="#portfolio" 
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105 group"
            >
              <BarChart3 className="w-4 h-4 group-hover:text-purple-400" />
              <span className="font-medium">Portfolio</span>
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <ConnectWallet />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800/50 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#trading" 
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors py-2 px-2 rounded-lg hover:bg-gray-800/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <TrendingUp className="w-5 h-5" />
                Trading
              </a>
              <a 
                href="#markets" 
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors py-2 px-2 rounded-lg hover:bg-gray-800/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <Zap className="w-5 h-5" />
                Markets
              </a>
              <a 
                href="#portfolio" 
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors py-2 px-2 rounded-lg hover:bg-gray-800/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart3 className="w-5 h-5" />
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