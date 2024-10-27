import React from 'react';
import { X } from 'lucide-react';

interface InstallOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: {
    scriptType: 'bat' | 'ps1';
    force: boolean;
    acceptLicense: boolean;
    interactive: boolean;
  };
  setOptions: (options: any) => void;
  onGenerate: () => void;
}

function InstallOptionsModal({
  isOpen,
  onClose,
  options,
  setOptions,
  onGenerate,
}: InstallOptionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-6">Installation Options</h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium">Script Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-3 rounded-lg border ${
                  options.scriptType === 'bat'
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-gray-600 hover:border-gray-500'
                } transition-all duration-200`}
                onClick={() => setOptions({ ...options, scriptType: 'bat' })}
              >
                Batch Script (.bat)
              </button>
              <button
                className={`p-3 rounded-lg border ${
                  options.scriptType === 'ps1'
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-gray-600 hover:border-gray-500'
                } transition-all duration-200`}
                onClick={() => setOptions({ ...options, scriptType: 'ps1' })}
              >
                PowerShell (.ps1)
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Additional Options
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={options.force}
                  onChange={(e) =>
                    setOptions({ ...options, force: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm">Force install (--force)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={options.acceptLicense}
                  onChange={(e) =>
                    setOptions({ ...options, acceptLicense: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm">
                  Accept license (--accept-package-agreements
                  --accept-source-agreement)
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={options.interactive}
                  onChange={(e) =>
                    setOptions({ ...options, interactive: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm">Interactive mode (-i)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onGenerate();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Generate Script
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallOptionsModal;
