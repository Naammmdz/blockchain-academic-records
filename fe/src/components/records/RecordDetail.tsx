import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoCloseOutline,
  IoCalendarOutline,
  IoSchoolOutline,
  IoPersonOutline,
  IoDocumentTextOutline,
  IoCopyOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoCloseCircleOutline,
  IoOpenOutline
} from 'react-icons/io5';
import { Card, Button } from '../common';
import { AcademicRecord } from '../../types';

interface RecordDetailProps {
  record: AcademicRecord;
  isOpen: boolean;
  onClose: () => void;
}

export const RecordDetail: React.FC<RecordDetailProps> = ({ record, isOpen, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusIcon = (status: AcademicRecord['status']) => {
    switch (status) {
      case 'verified':
        return <IoCheckmarkCircleOutline className="w-6 h-6 text-secondary-600" />;
      case 'pending':
        return <IoTimeOutline className="w-6 h-6 text-accent-600" />;
      case 'rejected':
        return <IoCloseCircleOutline className="w-6 h-6 text-red-600" />;
    }
  };

  const getStatusText = (status: AcademicRecord['status']) => {
    switch (status) {
      case 'verified':
        return 'Đã xác thực';
      case 'pending':
        return 'Đang chờ xác thực';
      case 'rejected':
        return 'Bị từ chối';
    }
  };

  const getStatusBadgeClass = (status: AcademicRecord['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      case 'pending':
        return 'bg-accent-100 text-accent-800 border-accent-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <IoDocumentTextOutline className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Chi tiết hồ sơ học tập</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusBadgeClass(record.status)}`}>
                {getStatusIcon(record.status)}
                <span className="font-medium">{getStatusText(record.status)}</span>
              </div>
              <div className="text-sm text-gray-500">
                ID: {record.id}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student Information */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <IoPersonOutline className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Thông tin sinh viên</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Họ và tên</label>
                      <p className="text-base text-gray-900">{record.studentName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Mã sinh viên</label>
                      <p className="text-base text-gray-900">{record.studentId}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Institution Information */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <IoSchoolOutline className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Thông tin trường học</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Tên trường</label>
                      <p className="text-base text-gray-900">{record.institutionName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Ngành học</label>
                      <p className="text-base text-gray-900">{record.major}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Academic Information */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <IoDocumentTextOutline className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Thông tin học tập</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Loại bằng</label>
                      <p className="text-base text-gray-900">{record.degree}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Điểm GPA</label>
                      <p className="text-base text-gray-900">{record.gpa}/4.0</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Ngày tốt nghiệp</label>
                      <div className="flex items-center space-x-2">
                        <IoCalendarOutline className="w-4 h-4 text-gray-400" />
                        <p className="text-base text-gray-900">
                          {new Date(record.graduationDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Blockchain Information */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <IoCheckmarkCircleOutline className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Thông tin Blockchain</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Certificate Hash</label>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                          {record.certificateHash.slice(0, 20)}...
                        </p>
                        <button
                          onClick={() => copyToClipboard(record.certificateHash, 'cert')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <IoCopyOutline className="w-4 h-4" />
                        </button>
                        {copied === 'cert' && (
                          <span className="text-xs text-secondary-600">Đã sao chép!</span>
                        )}
                      </div>
                    </div>
                    {record.transactionHash && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Transaction Hash</label>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                            {record.transactionHash.slice(0, 20)}...
                          </p>
                          <button
                            onClick={() => copyToClipboard(record.transactionHash!, 'tx')}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <IoCopyOutline className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => window.open(`https://etherscan.io/tx/${record.transactionHash}`, '_blank')}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <IoOpenOutline className="w-4 h-4" />
                          </button>
                          {copied === 'tx' && (
                            <span className="text-xs text-secondary-600">Đã sao chép!</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Timestamps */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử thời gian</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày tạo</label>
                    <p className="text-base text-gray-900">
                      {new Date(record.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Cập nhật lần cuối</label>
                    <p className="text-base text-gray-900">
                      {new Date(record.updatedAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
            {record.status === 'pending' && (
              <>
                <Button variant="secondary">
                  Phê duyệt
                </Button>
                <Button variant="accent">
                  Từ chối
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
