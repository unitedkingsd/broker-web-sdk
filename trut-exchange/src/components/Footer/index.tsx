'use client';

import { Github, Twitter, Telegram, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm border-t border-purple-500/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Trut Exchange
                </h3>
                <p className="text-sm text-gray-400">BNB Smart Chain Perpetuals</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Professional perpetual futures trading platform on BNB Smart Chain. 
              Trade crypto derivatives with advanced features and deep liquidity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#trading" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Trading
                </a>
              </li>
              <li>
                <a href="#markets" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Markets
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-purple-600/20 transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-purple-600/20 transition-colors group"
                aria-label="Telegram"
              >
                <Telegram className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-purple-600/20 transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
              </a>
              <a 
                href="https://trut.io" 
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-purple-600/20 transition-colors group"
                aria-label="Website"
              >
                <Globe className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Trut Exchange. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Risk Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;