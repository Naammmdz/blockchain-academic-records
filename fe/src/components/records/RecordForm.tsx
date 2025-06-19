import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Calendar, User, BookOpen, Award } from 'lucide-react';
import { Button, Input, Modal, Card } from '../common';
import { useStore } from '../../store';
import { useNotifications } from '../../hooks';
import { AcademicRecord } from '../../types';
import { CertificateService } from '../../lib/certificateService';

interface RecordFormProps {
  isOpen: boolean;
  onClose: () => void;
  record?: AcademicRecord | null;
}

const RecordForm: React.FC<RecordFormProps> = ({ isOpen, onClose, record }) => {
  const { institutions, addRecord, updateRecord, loadInstitutionsFromSupabase } = useStore();
  const { addNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(false);
  const [formData, setFormData] = useState({
    studentName: record?.studentName || '',
    studentId: record?.studentId || '',
    degree: record?.degree || '',
    major: record?.major || '',
    gpa: record?.gpa?.toString() || '',
    graduationDate: record?.graduationDate || '',
    institutionId: record?.institutionId || '',
    certificateHash: record?.certificateHash || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.studentName || !formData.studentId || !formData.degree || !formData.major || !formData.gpa || !formData.graduationDate || !formData.institutionId) {
        addNotification({
          type: 'error',
          title: 'Thiếu thông tin',
          message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
        });
        setIsSubmitting(false);
        return;
      }

      // Find selected institution
      const selectedInstitution = institutions.find(inst => inst.id === formData.institutionId);
      
      if (!selectedInstitution) {
        addNotification({
          type: 'error',
          title: 'Lỗi cơ sở giáo dục',
          message: 'Không tìm thấy cơ sở giáo dục đã chọn'
        });
        setIsSubmitting(false);
        return;
      }

      // Tạo certificate trong Supabase
      const certificateData = {
        student_name: formData.studentName,
        student_id: formData.studentId,
        institution_id: formData.institutionId,
        certificate_hash: formData.certificateHash || `0x${Math.random().toString(16).substr(2, 40)}`, // Generate random hash if not provided
        degree_type: formData.degree,
        major: formData.major,
        graduation_date: formData.graduationDate,
        university: selectedInstitution.name,
        gpa: parseFloat(formData.gpa)
      };

      const createdCertificate = await CertificateService.createCertificate(certificateData);
      
      if (!createdCertificate) {
        throw new Error('Failed to create certificate in database');
      }
      
      const recordData: Omit<AcademicRecord, 'id'> = {
        studentName: formData.studentName,
        studentId: formData.studentId,
        degree: formData.degree,
        major: formData.major,
        gpa: parseFloat(formData.gpa),
        graduationDate: formData.graduationDate,
        institutionId: formData.institutionId,
        institutionName: selectedInstitution.name, // Properly set institution name
        certificateHash: createdCertificate.certificate_hash || formData.certificateHash || `0x${Math.random().toString(16).substr(2, 40)}`,
        transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (record) {
        updateRecord(record.id, recordData);
        addNotification({
          type: 'success',
          title: 'Cập nhật thành công',
          message: `Hồ sơ của ${formData.studentName} tại ${selectedInstitution.name} đã được cập nhật`
        });
      } else {
        addRecord({
          id: `REC-${Date.now()}`,
          ...recordData
        });
        addNotification({
          type: 'success',
          title: 'Tạo hồ sơ thành công',
          message: `Hồ sơ của ${formData.studentName} tại ${selectedInstitution.name} đã được tạo`
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving record:', error);
      addNotification({
        type: 'error',
        title: 'Có lỗi xảy ra',
        message: error instanceof Error ? error.message : 'Không thể lưu hồ sơ. Vui lòng thử lại.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setFormData({
      studentName: '',
      studentId: '',
      degree: '',
      major: '',
      gpa: '',
      graduationDate: '',
      institutionId: '',
      certificateHash: ''
    });
  };

  const handleClose = () => {
    if (!record) resetForm();
    onClose();
  };

  // Always reload institutions from Supabase when modal opens
  useEffect(() => {
    if (isOpen) {
      const loadInstitutions = async () => {
        setIsLoadingInstitutions(true);
        try {
          await loadInstitutionsFromSupabase();
        } catch (error) {
          addNotification({
            type: 'error',
            title: 'Lỗi tải dữ liệu',
            message: 'Không thể tải danh sách cơ sở giáo dục'
          });
        } finally {
          setIsLoadingInstitutions(false);
        }
      };
      loadInstitutions();
    }
  }, [isOpen, loadInstitutionsFromSupabase, addNotification]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={record ? 'Edit Academic Record' : 'Create New Academic Record'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Information */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Student Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Student Name"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              placeholder="Enter student's full name"
              required
            />
            
            <Input
              label="Student ID"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              placeholder="Enter student ID"
              required
            />
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Degree"
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              placeholder="e.g., Bachelor of Science"
              required
            />
            
            <Input
              label="Major"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              placeholder="e.g., Computer Science"
              required
            />
            
            <Input
              label="GPA"
              name="gpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={formData.gpa}
              onChange={handleInputChange}
              placeholder="e.g., 3.75"
              required
            />
            
            <Input
              label="Graduation Date"
              name="graduationDate"
              type="date"
              value={formData.graduationDate}
              onChange={handleInputChange}
              required
              max={new Date().toISOString().split('T')[0]} // Không cho chọn ngày lớn hơn hôm nay
            />
          </div>
        </Card>

        {/* Institution Information */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Institution Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              {isLoadingInstitutions ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-gray-500">Đang tải cơ sở giáo dục...</span>
                </div>
              ) : (
                <select
                  name="institutionId"
                  value={formData.institutionId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">-- Chọn cơ sở giáo dục --</option>
                  {institutions.map(institution => (
                    <option key={institution.id} value={institution.id}>
                      {institution.name} ({institution.type === 'university' ? 'Đại học' : institution.type === 'college' ? 'Cao đẳng' : 'THPT'})
                    </option>
                  ))}
                </select>
              )}
              
              {!isLoadingInstitutions && institutions.length === 0 && (
                <p className="text-sm text-red-500 mt-1">
                  Chưa có cơ sở giáo dục nào. Vui lòng thêm cơ sở giáo dục trước.
                </p>
              )}
              
              {!isLoadingInstitutions && institutions.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Có {institutions.length} cơ sở giáo dục khả dụng
                </p>
              )}
            </div>
            
            {/* Show selected institution info */}
            {formData.institutionId && !isLoadingInstitutions && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="text-sm">
                  <strong>Cơ sở đã chọn:</strong>
                  <p className="text-blue-800">
                    {institutions.find(inst => inst.id === formData.institutionId)?.name}
                  </p>
                  <p className="text-blue-600 text-xs">
                    {institutions.find(inst => inst.id === formData.institutionId)?.address}
                  </p>
                  <p className="text-blue-600 text-xs">
                    Trạng thái: {institutions.find(inst => inst.id === formData.institutionId)?.verified ? '✅ Đã xác minh' : '⏳ Chờ xác minh'}
                  </p>
                </div>
              </div>
            )}
            
            <Input
              label="Certificate Hash (Optional)"
              name="certificateHash"
              value={formData.certificateHash}
              onChange={handleInputChange}
              placeholder="Blockchain certificate hash"
            />
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {record ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              record ? 'Update Record' : 'Create Record'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RecordForm;