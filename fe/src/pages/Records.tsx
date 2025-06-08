import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, Upload, RefreshCw, FileText, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Button, SkeletonTable, SkeletonCard } from '../components/common';
import { RecordList, RecordDetail, RecordForm } from '../components/records';
import { useStore } from '../store';
import { useNotifications } from '../hooks';
import { AcademicRecord } from '../types';

const Records: React.FC = () => {
  const { records = [], user } = useStore();
  const { addNotification } = useNotifications();
  const [selectedRecord, setSelectedRecord] = useState<AcademicRecord | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const handleRecordSelect = (record: AcademicRecord) => {
    setSelectedRecord(record);
  };

  const handleCloseDetail = () => {
    setSelectedRecord(null);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification({
        type: 'success',
        title: 'Dữ liệu đã được cập nhật',
        message: 'Danh sách hồ sơ đã được làm mới'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi làm mới',
        message: 'Không thể cập nhật dữ liệu. Vui lòng thử lại.'
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExportRecords = async () => {
    setIsExporting(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const dataStr = JSON.stringify(records, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `academic_records_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      addNotification({
        type: 'success',
        title: 'Xuất dữ liệu thành công',
        message: `Đã xuất ${records.length} hồ sơ học tập`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi xuất dữ liệu',
        message: 'Không thể xuất dữ liệu. Vui lòng thử lại.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCreateRecord = () => {
    setShowCreateForm(true);
    addNotification({
      type: 'info',
      title: 'Tạo hồ sơ mới',
      message: 'Điền thông tin để tạo hồ sơ học tập mới'
    });
  };

  const handleImportRecords = () => {
    // Mock import functionality
    addNotification({
      type: 'info',
      title: 'Tính năng đang phát triển',
      message: 'Tính năng nhập dữ liệu sẽ sớm được cập nhật'
    });
  };

  const statsData = [
    {
      title: 'Tổng số hồ sơ',
      value: records.length,
      icon: FileText,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Đã xác thực',
      value: records.filter(r => r.status === 'verified').length,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Đang chờ',
      value: records.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Tháng này',
      value: records.filter(r => {
        const recordDate = new Date(r.createdAt);
        const now = new Date();
        return recordDate.getMonth() === now.getMonth() && 
               recordDate.getFullYear() === now.getFullYear();
      }).length,
      icon: Calendar,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hồ sơ học tập</h1>
          <p className="text-gray-600 mt-1">
            Quản lý và xem hồ sơ học tập được lưu trữ trên blockchain
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            loading={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExportRecords}
            loading={isExporting}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Xuất dữ liệu
          </Button>
          
          <Button
            variant="outline"
            onClick={handleImportRecords}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Nhập dữ liệu
          </Button>
          
          <Button
            variant="primary"
            onClick={handleCreateRecord}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tạo hồ sơ mới
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} className="h-24" />
          ))
        ) : (
          statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.textColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Records List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading ? (
          <SkeletonTable rows={8} columns={6} />
        ) : (
          <RecordList
            records={records}
            onViewRecord={handleRecordSelect}
          />
        )}
      </motion.div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <RecordDetail
          record={selectedRecord}
          isOpen={!!selectedRecord}
          onClose={handleCloseDetail}
        />
      )}

      {/* Create/Edit Record Form */}
      <RecordForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </div>
  );
};

export default Records;
