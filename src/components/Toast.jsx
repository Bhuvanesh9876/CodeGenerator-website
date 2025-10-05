import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setIsVisible(true);
    
    const duration = 5000;
    const interval = 50;
    const steps = duration / interval;
    const decrement = 100 / steps;

    const progressTimer = setInterval(() => {
      setProgress(prev => Math.max(0, prev - decrement));
    }, interval);

    const dismissTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const toastConfig = {
    success: {
      bg: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      progress: 'bg-green-500'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      progress: 'bg-red-500'
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
      progress: 'bg-yellow-500'
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-600" />,
      progress: 'bg-blue-500'
    }
  };

  const config = toastConfig[type];

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full border rounded-xl shadow-2xl p-4 ${config.bg} ${config.text}
      transform transition-all duration-300 ease-out ${
        isVisible 
          ? 'animate-in slide-in-from-right-5 fade-in-100' 
          : 'animate-out slide-out-to-right-5 fade-out-100'
      } glass-premium`}>
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-xl">
        <div 
          className={`h-full rounded-t-xl ${config.progress} transition-all duration-50`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {config.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 flex-shrink-0 rounded-lg p-1 inline-flex text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;