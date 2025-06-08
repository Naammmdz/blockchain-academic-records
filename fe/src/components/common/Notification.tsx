import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoInformationCircleOutline,
  IoCloseCircleOutline,
  IoClose 
} from 'react-icons/io5';

export interface NotificationProps {
  id?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  persistent?: boolean;
}

export const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  persistent = false
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, persistent, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-green-600" />;
      case 'error':
        return <IoCloseCircleOutline className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <IoWarningOutline className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <IoInformationCircleOutline className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={`relative p-4 rounded-lg border shadow-sm ${getStyles()}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium">{title}</h4>
          {message && (
            <p className="text-sm mt-1 opacity-90">{message}</p>
          )}
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoClose className="w-4 h-4" />
        </button>
      </div>

      {!persistent && duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-current opacity-30"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
};

// Notification Container Component
interface NotificationContainerProps {
  notifications: NotificationProps[];
  onRemove: (id: string) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onRemove
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={() => onRemove(notification.id!)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
