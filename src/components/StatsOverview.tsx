import React from 'react';
import { Package, Download, Clock, Users } from 'lucide-react';

function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-white/10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Package className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Packages</p>
            <h3 className="text-2xl font-bold text-white">10,000+</h3>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-white/10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Download className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Daily Downloads</p>
            <h3 className="text-2xl font-bold text-white">50,000+</h3>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-xl p-6 border border-white/10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-pink-500/20 rounded-lg">
            <Users className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Publishers</p>
            <h3 className="text-2xl font-bold text-white">1,000+</h3>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-white/10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-500/20 rounded-lg">
            <Clock className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Last Updated</p>
            <h3 className="text-2xl font-bold text-white">Just Now</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsOverview;