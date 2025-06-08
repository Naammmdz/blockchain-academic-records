import { useState, useCallback } from 'react';
import { NotificationProps } from '../components/common/Notification';

export interface UseNotificationsReturn {
  notifications: NotificationProps[];
  addNotification: (notification: Omit<NotificationProps, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationProps, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: NotificationProps = {
      ...notification,
      id
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove after duration if not persistent
    if (!notification.persistent && notification.duration !== 0) {
      const duration = notification.duration || 5000;
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  };
};
