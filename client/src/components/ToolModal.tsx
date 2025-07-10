import React from 'react';
import { X } from 'lucide-react';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  children?: React.ReactNode;
}

const ToolModal: React.FC<ToolModalProps> = ({ isOpen, onClose, toolName, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{toolName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          {children || (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {toolName} Demo
              </h3>
              <p className="text-gray-600">
                This is a preview of the {toolName} tool. In the full version, you would have access to all features and functionality.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolModal;