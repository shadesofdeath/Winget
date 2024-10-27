import React from 'react';
import { Github, Twitter, Globe, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Heart className="w-4 h-4 text-red-400" />
            <span>Made with love by ShadesOfDeath</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/shadesofdeath/Winget"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="View source on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;