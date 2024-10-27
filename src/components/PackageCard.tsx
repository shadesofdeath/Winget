import React, { useState } from 'react';
import { Package as PackageType } from '../types';
import { Terminal, ExternalLink, Copy, Check, Globe } from 'lucide-react';
import PackageStats from './PackageStats';

interface PackageCardProps {
  package: PackageType;
  isSelected: boolean;
  onToggleSelect: () => void;
}

function PackageCard({ package: pkg, isSelected, onToggleSelect }: PackageCardProps) {
  const [copied, setCopied] = useState(false);
  const installCommand = `winget install -e --id ${pkg.Id}`;
  const logoUrl = `https://logo.clearbit.com/${pkg.Latest.Homepage?.replace(/^https?:\/\//, '')}`;

  const copyCommand = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`
        relative group overflow-hidden
        bg-white/5 backdrop-blur-xl rounded-xl p-6
        border border-white/10 hover:border-blue-500/50
        transition-all duration-300
        ${isSelected ? 'ring-2 ring-blue-500 border-transparent' : ''}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={logoUrl}
              alt={pkg.Latest.Name}
              className="w-12 h-12 rounded-xl bg-gray-800 object-contain p-2 border border-white/10"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/48?text=' + pkg.Latest.Name.charAt(0);
              }}
            />
            <div>
              <h3 className="text-lg font-semibold text-white">{pkg.Latest.Name}</h3>
              <p className="text-sm text-gray-400">{pkg.Latest.Publisher}</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <p className="mt-4 text-sm text-gray-300 line-clamp-2">
          {pkg.Latest.Description || 'No description available'}
        </p>

        {pkg.Latest.Tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.Latest.Tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          <PackageStats
            downloads={Math.floor(Math.random() * 1000000)} // Example data
            lastUpdated={new Date(pkg.UpdatedAt)}
          />
        </div>

        <div className="mt-4 flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <code className="text-sm text-gray-300">{installCommand}</code>
          </div>
          <button
            onClick={copyCommand}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Copy install command"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {pkg.Latest.Homepage && (
          <a
            href={pkg.Latest.Homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
          >
            <Globe className="w-4 h-4 mr-2" />
            Visit website
            <ExternalLink className="ml-1 w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

export default PackageCard;