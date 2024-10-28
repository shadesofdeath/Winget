import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package as PackageType } from '../types';
import { Terminal, ExternalLink, Copy, Check, Globe, Tag, Info, ArrowLeft, Shield, Download, Clock, Star } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedVersion, setCopiedVersion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('versions');

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`https://api.winget.run/v2/packages/${id}`);
        const data = await response.json();
        setPkg(data.Package);
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const copyVersionCommand = async (version: string) => {
    await navigator.clipboard.writeText(`winget install -e --id ${pkg?.Id} -v ${version}`);
    setCopiedVersion(version);
    setTimeout(() => setCopiedVersion(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex justify-center items-center">
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex flex-col items-center justify-center text-white">
        <Package className="w-16 h-16 text-gray-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-300 mb-4">Package not found</h2>
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to packages</span>
        </Link>
      </div>
    );
  }

  const logoUrl = pkg.Logo || pkg.IconUrl || `https://logo.clearbit.com/${pkg.Latest.Homepage?.replace(/^https?:\/\//, '')}`;

  // Enhanced chart data with gradient
  const chartData = {
    labels: pkg.Versions.slice(0, 10).reverse(),
    datasets: [
      {
        label: 'Version History',
        data: pkg.Versions.slice(0, 10).reverse().map((_, index) => index + 1),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: 'rgb(156, 163, 175)',
        bodyColor: 'rgb(255, 255, 255)',
        padding: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: () => 'Version',
          label: (context: any) => pkg.Versions.slice(0, 10).reverse()[context.dataIndex],
        },
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      
      <div className="relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-black/40 to-transparent border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to packages
            </Link>

            <div className="flex items-start space-x-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative w-24 h-24 bg-black rounded-2xl p-4 flex items-center justify-center border border-white/10">
                  <img
                    src={logoUrl}
                    alt={pkg.Latest.Name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/96?text=' + pkg.Latest.Name.charAt(0);
                    }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold">{pkg.Latest.Name}</h1>
                  {pkg.Latest.Homepage && (
                    <a
                      href={pkg.Latest.Homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-lg text-gray-400 mt-1">{pkg.Latest.Publisher}</p>
                
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Download className="w-4 h-4" />
                    <span>10K+ downloads</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Updated {new Date(pkg.UpdatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>4.8/5</span>
                  </div>
                </div>

                {pkg.Latest.Tags && pkg.Latest.Tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pkg.Latest.Tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed">
                  {pkg.Latest.Description || 'No description available'}
                </p>
              </div>

              {/* Version History Chart */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold mb-6">Version History</h2>
                <div className="h-[300px]">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              {/* Latest Version Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Latest Version</h2>
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-400">
                    v{pkg.Versions[0]}
                  </span>
                </div>
                <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                  <code className="text-sm text-gray-300 break-all">
                    winget install -e --id {pkg.Id} -v {pkg.Versions[0]}
                  </code>
                  <button
                    onClick={() => copyVersionCommand(pkg.Versions[0])}
                    className="mt-3 w-full flex items-center justify-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-colors border border-blue-500/30 hover:border-blue-500/50"
                  >
                    {copiedVersion === pkg.Versions[0] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Command</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* All Versions Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold mb-4">All Versions</h2>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {pkg.Versions.map((version) => (
                    <div
                      key={version}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/10 hover:border-blue-500/50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <Terminal className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                        <span className="text-sm font-mono">{version}</span>
                      </div>
                      <button
                        onClick={() => copyVersionCommand(version)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Copy install command"
                      >
                        {copiedVersion === version ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* License Info Card */}
              {(pkg.Latest.License || pkg.Latest.LicenseUrl) && (
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <h2 className="text-xl font-semibold">License</h2>
                  </div>
                  <div className="space-y-3">
                    {pkg.Latest.License && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Info className="w-4 h-4" />
                        <span>{pkg.Latest.License}</span>
                      </div>
                    )}
                    {pkg.Latest.LicenseUrl && (
                      <a
                        href={pkg.Latest.LicenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 group"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View license details</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;