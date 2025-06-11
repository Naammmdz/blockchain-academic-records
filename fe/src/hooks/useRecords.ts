import { useCallback } from 'react';
import { useStore } from '../store';
import { useNotifications } from './useNotifications';
import { AcademicRecord } from '../types';

export const useRecords = () => {
  const { 
    records, 
    setRecords, 
    addRecord, 
    updateRecord, 
    loadRecordsFromSupabase,
    isLoading,
    setIsLoading 
  } = useStore();
  const { addNotification } = useNotifications();

  const loadRecords = useCallback(async () => {
    try {
      const loadedRecords = await loadRecordsFromSupabase();
      addNotification({
        type: 'success',
        title: 'Dữ liệu đã được tải',
        message: `Đã tải ${loadedRecords.length} hồ sơ từ cơ sở dữ liệu`
      });
      return loadedRecords;
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi tải dữ liệu',
        message: 'Không thể tải danh sách hồ sơ từ cơ sở dữ liệu'
      });
      return [];
    }
  }, [loadRecordsFromSupabase, addNotification]);

  const refreshRecords = useCallback(async () => {
    try {
      const loadedRecords = await loadRecordsFromSupabase();
      addNotification({
        type: 'success',
        title: 'Dữ liệu đã được làm mới',
        message: `Đã cập nhật ${loadedRecords.length} hồ sơ từ cơ sở dữ liệu`
      });
      return loadedRecords;
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi làm mới dữ liệu',
        message: 'Không thể làm mới danh sách hồ sơ'
      });
      return [];
    }
  }, [loadRecordsFromSupabase, addNotification]);

  const createRecord = useCallback((record: AcademicRecord) => {
    addRecord(record);
    addNotification({
      type: 'success',
      title: 'Hồ sơ đã được tạo',
      message: `Hồ sơ của ${record.studentName} đã được thêm thành công`
    });
  }, [addRecord, addNotification]);

  const editRecord = useCallback((id: string, updates: Partial<AcademicRecord>) => {
    updateRecord(id, updates);
    addNotification({
      type: 'success',
      title: 'Hồ sơ đã được cập nhật',
      message: 'Thông tin hồ sơ đã được lưu thành công'
    });
  }, [updateRecord, addNotification]);

  return {
    records,
    isLoading,
    loadRecords,
    refreshRecords,
    createRecord,
    editRecord,
    setRecords,
    setIsLoading
  };
};
