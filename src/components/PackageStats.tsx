import React from 'react';
import { Download, Clock, Star } from 'lucide-react';

interface PackageStatsProps {
  downloads: number;
  lastUpdated: Date;
  rating?: number;
}

function PackageStats({ downloads, lastUpdated, rating }: PackageStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <div className="flex items-center space-x-4 text-sm text-gray-400">
      <div className="flex items-center space-x-1" title="Downloads">
        <Download className="w-4 h-4" />
        <span>{formatNumber(downloads)}</span>
      </div>
      
      <div className="flex items-center space-x-1" title="Last Updated">
        <Clock className="w-4 h-4" />
        <span>{getTimeAgo(lastUpdated)}</span>
      </div>
      
      {rating !== undefined && (
        <div className="flex items-center space-x-1" title="Rating">
          <Star className="w-4 h-4" />
          <span>{rating.toFixed(1)}</span>
        </div>
      )}
    </div>
  );
}

export default PackageStats;