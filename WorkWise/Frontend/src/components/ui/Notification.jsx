import React from 'react';
import { AlertCircle, Check, X } from 'lucide-react';

const Notification = ({ 
  type = 'info', 
  message, 
  onClose,
  showClose = true 
}) => {
  if (!message) return null;

  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };

  const icons = {
    success: <Check className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <AlertCircle className="h-5 w-5 text-blue-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  };

  return (
    <div className={`rounded-md border p-4 ${typeStyles[type]} shadow-md`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {showClose && onClose && (
          <div>
            <button
              type="button"
              className="inline-flex rounded-md p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
