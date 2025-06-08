import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  IoChevronUpOutline, 
  IoChevronDownOutline,
  IoFilterOutline,
  IoEllipsisVerticalOutline
} from 'react-icons/io5';
import { Button } from './Button';
import { LoadingSpinner } from './LoadingSpinner';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  rowKey?: keyof T | ((record: T) => string);
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  onRowClick?: (record: T, index: number) => void;
  emptyText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  striped?: boolean;
  hoverable?: boolean;
}

export function Table<T = any>(props: TableProps<T>) {
  const {
    columns,
    data,
    loading = false,
    rowKey = 'id',
    pagination,
    onRowClick,
    emptyText = 'No data available',
    className = '',
    size = 'md',
    striped = false,
    hoverable = true
  } = props;

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey as keyof T] as string || index.toString();
  };

  const handleSort = (columnKey: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: columnKey, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    const { key, direction } = sortConfig;
    const column = columns.find(col => col.key === key);
    
    return [...data].sort((a, b) => {
      const aVal = column?.dataIndex ? a[column.dataIndex] : a[key as keyof T];
      const bVal = column?.dataIndex ? b[column.dataIndex] : b[key as keyof T];

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, columns]);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const paddingClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4'
  };

  const renderCell = (column: TableColumn<T>, record: T, index: number) => {
    // Fix: Always use column.dataIndex if defined, else fallback to column.key
    const value = column.dataIndex !== undefined ? record[column.dataIndex] : record[column.key as keyof T];
    if (column.render) {
      return column.render(value, record, index);
    }
    return value as React.ReactNode;
  };

  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return null;
    }

    return sortConfig.direction === 'asc' ? (
      <IoChevronUpOutline className="w-4 h-4 ml-1" />
    ) : (
      <IoChevronDownOutline className="w-4 h-4 ml-1" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-white border border-gray-200 rounded-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    ${paddingClasses[size]} ${sizeClasses[size]}
                    font-medium text-gray-900 uppercase tracking-wider
                    ${column.align === 'center' ? 'text-center' : ''}
                    ${column.align === 'right' ? 'text-right' : 'text-left'}
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}
                  `}
                  style={{ width: column.width }}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.title}</span>
                    <div className="flex items-center space-x-1">
                      {column.sortable && getSortIcon(column.key)}
                      {column.filterable && (
                        <IoFilterOutline className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={`${paddingClasses[size]} ${sizeClasses[size]} text-center text-gray-500`}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => (
                <motion.tr
                  key={getRowKey(record, index)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className={`
                    ${striped && index % 2 === 1 ? 'bg-gray-25' : ''}
                    ${hoverable ? 'hover:bg-gray-50' : ''}
                    ${onRowClick ? 'cursor-pointer' : ''}
                    transition-colors duration-150
                  `}
                  onClick={onRowClick ? () => onRowClick(record, index) : undefined}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        ${paddingClasses[size]} ${sizeClasses[size]}
                        text-gray-900 whitespace-nowrap
                        ${column.align === 'center' ? 'text-center' : ''}
                        ${column.align === 'right' ? 'text-right' : 'text-left'}
                      `}
                      style={{ width: column.width }}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current <= 1}
                onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current * pagination.pageSize >= pagination.total}
                onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
              >
                Next
              </Button>
            </div>
            
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">
                    {(pagination.current - 1) * pagination.pageSize + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.current * pagination.pageSize, pagination.total)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{pagination.total}</span> results
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.current <= 1}
                  onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
                >
                  Previous
                </Button>
                
                {/* Page numbers */}
                {Array.from(
                  { length: Math.min(5, Math.ceil(pagination.total / pagination.pageSize)) },
                  (_, i) => {
                    const page = i + Math.max(1, pagination.current - 2);
                    return (
                      <Button
                        key={page}
                        variant={page === pagination.current ? "primary" : "outline"}
                        size="sm"
                        onClick={() => pagination.onChange(page, pagination.pageSize)}
                      >
                        {page}
                      </Button>
                    );
                  }
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.current * pagination.pageSize >= pagination.total}
                  onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
