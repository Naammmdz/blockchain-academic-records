import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoDocumentTextOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoSchoolOutline,
  IoRefreshOutline
} from 'react-icons/io5';
import { StatCard, Charts, RecentActivity } from '../components/dashboard';
import { Button, SkeletonCard, SkeletonText } from '../components/common';
import { useStore } from '../store';
import { useNotifications } from '../hooks';
import { mockDashboardStats, mockRecords } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const { dashboardStats, setDashboardStats } = useStore();
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = async (showRefreshNotification = false) => {
    try {
      setIsLoading(!dashboardStats);
      setIsRefreshing(showRefreshNotification);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDashboardStats(mockDashboardStats);
      
      if (showRefreshNotification) {
        addNotification({
          type: 'success',
          title: 'Dữ liệu đã được cập nhật',
          message: 'Thông tin dashboard đã được làm mới'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi tải dữ liệu',
        message: 'Không thể tải thông tin dashboard. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    loadDashboardData(true);
  };

  // Generate chart data
  const recordsOverTime = [
    { name: 'T7', value: 12 },
    { name: 'T8', value: 19 },
    { name: 'T9', value: 15 },
    { name: 'T10', value: 25 },
    { name: 'T11', value: 22 },
    { name: 'T12', value: 30 },
  ];
  const verificationStats = [
    { name: 'T7', value: 12, verified: 10, pending: 2 },
    { name: 'T8', value: 19, verified: 16, pending: 3 },
    { name: 'T9', value: 15, verified: 12, pending: 3 },
    { name: 'T10', value: 25, verified: 20, pending: 5 },
    { name: 'T11', value: 22, verified: 18, pending: 4 },
    { name: 'T12', value: 30, verified: 25, pending: 5 },
  ];
  // Error state
  if (!dashboardStats && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="text-gray-400 text-4xl">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900">Không thể tải dữ liệu</h3>
        <p className="text-gray-600 text-center">Có lỗi xảy ra khi tải thông tin dashboard</p>
        <Button onClick={handleRefresh} variant="primary">
          <IoRefreshOutline className="w-4 h-4 mr-2" />
          Thử lại
        </Button>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div>
            <SkeletonText lines={1} className="w-48 mb-2" />
            <SkeletonText lines={1} className="w-80" />
          </div>
          <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonCard className="h-80" />
          <SkeletonCard className="h-80" />
        </div>

        {/* Activity Skeleton */}
        <SkeletonCard className="h-96" />
      </div>    );
  }

  // Ensure we have data before rendering
  if (!dashboardStats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Tổng quan hệ thống quản lý hồ sơ học tập blockchain
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          loading={isRefreshing}
          className="flex items-center space-x-2"
        >
          <IoRefreshOutline className="w-4 h-4" />
          <span>Làm mới</span>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Tổng hồ sơ"
          value={dashboardStats.totalRecords}
          change="+12% so với tháng trước"
          changeType="increase"
          icon={<IoDocumentTextOutline className="w-6 h-6" />}
          color="primary"
        />
        <StatCard
          title="Đã xác thực"
          value={dashboardStats.verifiedRecords}
          change="+8% so với tháng trước"
          changeType="increase"
          icon={<IoCheckmarkCircleOutline className="w-6 h-6" />}
          color="secondary"
        />
        <StatCard
          title="Đang chờ"
          value={dashboardStats.pendingRecords}
          change="+2 hồ sơ mới"
          changeType="neutral"
          icon={<IoTimeOutline className="w-6 h-6" />}
          color="accent"
        />
        <StatCard
          title="Trường học"
          value={dashboardStats.totalInstitutions}
          change="Không thay đổi"
          changeType="neutral"
          icon={<IoSchoolOutline className="w-6 h-6" />}
          color="gray"
        />
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Charts 
          recordsOverTime={recordsOverTime}
          verificationStats={verificationStats}
        />
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RecentActivity activities={dashboardStats.recentActivity} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
