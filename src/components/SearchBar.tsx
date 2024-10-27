import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search packages (e.g., 'Visual Studio Code', 'Chrome', 'Node.js')"
          className="w-full bg-white/5 text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                   border border-white/10 focus:border-blue-500/50
                   backdrop-blur-xl transition-all duration-200"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 
                 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 
                 px-6 py-2 rounded-lg transition-all duration-200
                 border border-blue-500/30 hover:border-blue-500/50"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;