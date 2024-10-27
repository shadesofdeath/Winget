import React, { useState, useEffect } from 'react';
import { Search, Download, Terminal, Package, ExternalLink, Copy, Check } from 'lucide-react';
import PackageCard from './components/PackageCard';
import SearchBar from './components/SearchBar';
import InstallOptionsModal from './components/InstallOptionsModal';
import Footer from './components/Footer';
import { Package as PackageType } from './types';

function App() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installOptions, setInstallOptions] = useState({
    scriptType: 'bat',
    force: false,
    acceptLicense: true,
    interactive: false,
  });
  const [totalPackages, setTotalPackages] = useState<number>(0);

  useEffect(() => {
    // Fetch total number of packages
    fetch('https://api.winget.run/v2/packages?take=1')
      .then(res => res.json())
      .then(data => setTotalPackages(data.Total))
      .catch(console.error);
  }, []);

  const searchPackages = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.winget.run/v2/packages?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setPackages(data.Packages);
      setSearchQuery(query);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePackageSelection = (packageId: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const generateScript = () => {
    const options = [];
    if (installOptions.force) options.push('--force');
    if (installOptions.acceptLicense) options.push('--accept-package-agreements --accept-source-agreements');
    if (installOptions.interactive) options.push('-i');
    
    const optionsString = options.length > 0 ? ' ' + options.join(' ') : '';
    const commands = selectedPackages.map(id => `winget install -e --id ${id}${optionsString}`);
    
    let script;
    if (installOptions.scriptType === 'bat') {
      script = `@echo off
echo Installing ${selectedPackages.length} package(s)...
echo.
${commands.join('\necho.\n')}
echo.
echo Installation complete!
pause`;
    } else {
      script = `Write-Host "Installing ${selectedPackages.length} package(s)..." -ForegroundColor Cyan
Write-Host ""
${commands.map(cmd => `Write-Host "> ${cmd}" -ForegroundColor Gray\n${cmd}`).join('\nWrite-Host ""\n')}
Write-Host ""
Write-Host "Installation complete!" -ForegroundColor Green
pause`;
    }
    
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `install-packages.${installOptions.scriptType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10" />
      
      <div className="relative flex-1">
        <header className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <Package className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Winget Store
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {totalPackages.toLocaleString()} packages available
                  </p>
                </div>
              </div>
              {selectedPackages.length > 0 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-6 py-3 rounded-xl transition-all duration-200 border border-blue-500/30 hover:border-blue-500/50 backdrop-blur-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Script ({selectedPackages.length})</span>
                </button>
              )}
            </div>
            <div className="mt-8">
              <SearchBar onSearch={searchPackages} />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard 
                  key={pkg.Id} 
                  package={pkg} 
                  isSelected={selectedPackages.includes(pkg.Id)}
                  onToggleSelect={() => togglePackageSelection(pkg.Id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-blue-500/10 p-6 rounded-2xl inline-flex">
                <Package className="w-16 h-16 text-blue-400" />
              </div>
              <p className="mt-6 text-gray-400 text-lg">
                {searchQuery ? 'No packages found' : 'Search for Windows packages to get started'}
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />

      <InstallOptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        options={installOptions}
        setOptions={setInstallOptions}
        onGenerate={generateScript}
      />
    </div>
  );
}

export default App;