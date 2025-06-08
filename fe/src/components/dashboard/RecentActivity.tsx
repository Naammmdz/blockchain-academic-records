import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCheckmarkCircleOutline, 
  IoDocumentTextOutline,
  IoCloudUploadOutline,
  IoTimeOutline
} from 'react-icons/io5';
import { Card } from '../common';
import { Activity } from '../../types';

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'record_verified':
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-secondary-600" />;
      case 'record_created':
        return <IoDocumentTextOutline className="w-5 h-5 text-primary-600" />;
      case 'certificate_uploaded':
        return <IoCloudUploadOutline className="w-5 h-5 text-accent-600" />;
      default:
        return <IoTimeOutline className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Card>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
        <p className="text-sm text-gray-600 mt-1">Các thay đổi và cập nhật mới nhất</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  {activity.description}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{activity.user}</span>
                  <span className="mx-1">•</span>
                  <span>{formatTime(activity.timestamp)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Xem tất cả hoạt động →
          </button>
        </div>
      </div>
    </Card>
  );
};
