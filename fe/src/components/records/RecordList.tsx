import React, { useState, useMemo, useCallback } from 'react';
import { 
  IoEyeOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoCloseCircleOutline,
  IoDownloadOutline,
  IoFilterOutline
} from 'react-icons/io5';
import { Card, Button, Search, Table } from '../common';
import { useNotifications } from '../../hooks';
import { AcademicRecord } from '../../types';

interface RecordListProps {
  records: AcademicRecord[];
  onViewRecord: (record: AcademicRecord) => void;
}

export const RecordList: React.FC<RecordListProps> = ({ records, onViewRecord }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending' | 'rejected'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { addNotification } = useNotifications();

  // Process data for the table
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchesSearch = 
        record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.major.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [records, searchTerm, statusFilter]);
  // Search suggestions
  const searchSuggestions = useMemo(() => {
    const suggestions = new Set<string>();
    records.forEach(record => {
      suggestions.add(record.studentName);
      suggestions.add(record.institutionName);
      suggestions.add(record.degree);
      suggestions.add(record.major);
    });
    return Array.from(suggestions);
  }, [records]);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Handle record actions
  const handleViewRecord = useCallback((record: AcademicRecord) => {
    onViewRecord(record);
    addNotification({
      type: 'info',
      title: 'Đang tải hồ sơ',
      message: `Đang mở hồ sơ của ${record.studentName}`
    });
  }, [onViewRecord, addNotification]);

  const handleDownloadRecord = useCallback((record: AcademicRecord) => {
    // Simulate download
    addNotification({
      type: 'success',
      title: 'Tải xuống thành công',
      message: `Đã tải hồ sơ của ${record.studentName}`
    });
  }, [addNotification]);

  // Status badge helpers
  const getStatusIcon = (status: AcademicRecord['status']) => {
    switch (status) {
      case 'verified':
        return <IoCheckmarkCircleOutline className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <IoTimeOutline className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <IoCloseCircleOutline className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusText = (status: AcademicRecord['status']) => {
    switch (status) {
      case 'verified':
        return 'Đã xác thực';
      case 'pending':
        return 'Đang chờ';
      case 'rejected':
        return 'Bị từ chối';
    }
  };

  const getStatusBadgeClass = (status: AcademicRecord['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };
  // Table columns configuration
  const columns = [
    {
      key: 'student',
      title: 'Sinh viên',
      sortable: true,
      render: (value: any, record: AcademicRecord) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
          <div className="text-sm text-gray-500">ID: {record.studentId}</div>
        </div>
      )
    },
    {
      key: 'institution',
      title: 'Trường học',
      sortable: true,
      dataIndex: 'institutionName' as keyof AcademicRecord,
      render: (value: any, record: AcademicRecord) => (
        <div className="text-sm text-gray-900">{record.institutionName}</div>
      )
    },
    {
      key: 'degree',
      title: 'Bằng cấp',
      render: (value: any, record: AcademicRecord) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{record.degree}</div>
          <div className="text-sm text-gray-500">{record.major}</div>
        </div>
      )
    },
    {
      key: 'gpa',
      title: 'GPA',
      sortable: true,
      dataIndex: 'gpa' as keyof AcademicRecord,
      render: (value: any, record: AcademicRecord) => (
        <div className="text-sm text-gray-900 font-medium">{record.gpa}</div>
      )
    },
    {
      key: 'status',
      title: 'Trạng thái',
      sortable: true,
      dataIndex: 'status' as keyof AcademicRecord,
      render: (value: any, record: AcademicRecord) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(record.status)}
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(record.status)}`}>
            {getStatusText(record.status)}
          </span>
        </div>
      )
    },
    {
      key: 'graduationDate',
      title: 'Ngày tốt nghiệp',
      sortable: true,
      dataIndex: 'graduationDate' as keyof AcademicRecord,
      render: (value: any, record: AcademicRecord) => (
        <div className="text-sm text-gray-900">
          {new Date(record.graduationDate).toLocaleDateString('vi-VN')}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Hành động',
      render: (value: any, record: AcademicRecord) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewRecord(record)}
            className="flex items-center space-x-1"
          >
            <IoEyeOutline className="w-4 h-4" />
            <span>Xem</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDownloadRecord(record)}
            className="flex items-center space-x-1"
          >
            <IoDownloadOutline className="w-4 h-4" />
            <span>Tải</span>
          </Button>
        </div>
      )
    }
  ];
  return (
    <Card>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Danh sách hồ sơ học tập</h3>
            <p className="text-sm text-gray-600 mt-1">
              Tổng cộng {filteredRecords.length} hồ sơ
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Search */}
            <Search
              placeholder="Tìm kiếm hồ sơ..."
              value={searchTerm}
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              className="w-full sm:w-64"
            />
            
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="appearance-none rounded-lg border-gray-300 pr-10 pl-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="verified">Đã xác thực</option>
                <option value="pending">Đang chờ</option>
                <option value="rejected">Bị từ chối</option>
              </select>
              <IoFilterOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>      {/* Records Table */}
      <div className="p-6">
        <Table
          data={filteredRecords}
          columns={columns}
          rowKey={(record: AcademicRecord) => record.id}
          emptyText="Không tìm thấy hồ sơ nào. Thử thay đổi tiêu chí tìm kiếm hoặc bộ lọc."
          loading={false}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredRecords.length,
            onChange: (page: number, newPageSize: number) => {
              setCurrentPage(page);
              setPageSize(newPageSize);
            }
          }}
          hoverable={true}
          striped={false}
        />
      </div>
    </Card>
  );
};
