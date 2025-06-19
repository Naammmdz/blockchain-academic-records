import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, Phone, Mail, Plus, Edit, Trash2, Search, Check, Clock } from 'lucide-react';
import { Button, Card, Input, Modal, Skeleton } from '../components/common';
import { useNotifications } from '../hooks';
import { useStore } from '../store';
import { Institution } from '../types';
import { InstitutionService } from '../lib/institutionService';
import { web3Service } from '../services/web3Service';

const Institutions: React.FC = () => {
  const { institutions, loadInstitutionsFromSupabase } = useStore();
  const { addNotification } = useNotifications();
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [verifyingInstitutions, setVerifyingInstitutions] = useState<Set<string>>(new Set());
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    type: '',
    address: '',
    establishedYear: '',
    phone: '',
    email: '',
    studentCount: ''
  });

  // Load institutions from Supabase
  useEffect(() => {
    const fetchInstitutions = async () => {
      setIsLoading(true);
      await loadInstitutionsFromSupabase();
      setIsLoading(false);
    };
    fetchInstitutions();
  }, [loadInstitutionsFromSupabase]);

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institution.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInstitutionSelect = (institution: Institution) => {
    setSelectedInstitution(institution);
  };

  const handleCreateInstitution = async () => {
    if (!newInstitution.name || !newInstitution.type || !newInstitution.address) {
      addNotification({
        type: 'error',
        title: 'Thiếu thông tin',
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      });
      return;
    }

    setIsCreating(true);
    try {
      // Gửi dữ liệu lên Supabase
      await InstitutionService.createInstitution({
        name: newInstitution.name,
        type: newInstitution.type as 'university' | 'college' | 'high-school',
        address: newInstitution.address,
        // Các trường bổ sung nếu có:
        established_year: newInstitution.establishedYear ? Number(newInstitution.establishedYear) : undefined,
        phone: newInstitution.phone,
        email: newInstitution.email,
        student_count: newInstitution.studentCount ? Number(newInstitution.studentCount) : undefined,
        verified: false // hoặc true nếu muốn mặc định đã xác minh
      });

      // Sau khi thêm thành công, reload lại danh sách institutions
      await loadInstitutionsFromSupabase();

      addNotification({
        type: 'success',
        title: 'Thêm thành công',
        message: `Đã thêm cơ sở giáo dục ${newInstitution.name} thành công`
      });

      setShowCreateModal(false);
      setNewInstitution({
        name: '',
        type: '',
        address: '',
        establishedYear: '',
        phone: '',
        email: '',
        studentCount: ''
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi thêm cơ sở',
        message: error instanceof Error ? error.message : 'Không thể thêm cơ sở giáo dục. Vui lòng thử lại.'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateInstitution = async () => {
    if (!selectedInstitution) return;

    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addNotification({
        type: 'success',
        title: 'Cập nhật thành công',
        message: `Đã cập nhật thông tin ${selectedInstitution.name} thành công`
      });
      
      setSelectedInstitution(null);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi cập nhật',
        message: 'Không thể cập nhật thông tin. Vui lòng thử lại.'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteInstitution = async (institution: Institution) => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addNotification({
        type: 'success',
        title: 'Xóa thành công',
        message: `Đã xóa ${institution.name} khỏi hệ thống`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi xóa',
        message: 'Không thể xóa cơ sở giáo dục. Vui lòng thử lại.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleVerifyInstitution = async (institution: Institution) => {
    if (verifyingInstitutions.has(institution.id)) return;
    
    try {
      console.log('=== VERIFICATION START ===');
      
      // Add to verifying set
      setVerifyingInstitutions(prev => new Set(prev).add(institution.id));
      
      // Step 1: Connect wallet & add to blockchain
      try {
        await web3Service.connectWallet();
      } catch (error) {
        throw new Error('Vui lòng kết nối ví MetaMask để tiếp tục');
      }

      addNotification({
        type: 'info',
        title: 'Đang xử lý',
        message: 'Đang thêm trường vào blockchain...'
      });

      const response = await web3Service.approveUniversity(institution.name);
      
      if (!response.success) {
        throw new Error(response.error || 'Không thể thêm trường vào blockchain');
      }

      // Step 2: Only update Supabase if blockchain operation succeeded
      addNotification({
        type: 'info',
        title: 'Đang cập nhật',
        message: 'Blockchain thành công, đang cập nhật database...'
      });

      await InstitutionService.verifyInstitution(institution.id);
      
      // Step 3: Reload data
      await loadInstitutionsFromSupabase();

      const txHashDisplay = response.txHash ? `TX: ${response.txHash.slice(0, 10)}...` : '';
      
      addNotification({
        type: 'success',
        title: 'Xác minh thành công',
        message: `${institution.name} đã được thêm vào blockchain. ${txHashDisplay}`
      });
      
    } catch (error) {
      console.error('=== VERIFICATION ERROR ===', error);
      addNotification({
        type: 'error',
        title: 'Lỗi xác minh',
        message: error instanceof Error ? error.message : 'Không thể xác minh cơ sở. Vui lòng thử lại.'
      });
    } finally {
      setVerifyingInstitutions(prev => {
        const newSet = new Set(prev);
        newSet.delete(institution.id);
        return newSet;
      });
    }
  };

  const InstitutionCard: React.FC<{ institution: Institution; index: number }> = ({ 
    institution, 
    index 
  }) => {
    const isVerifying = verifyingInstitutions.has(institution.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {institution.name}
                </h3>
                <p className="text-sm text-gray-600">{institution.type}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleInstitutionSelect(institution)}
                disabled={isUpdating}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDeleteInstitution(institution)}
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{institution.address || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{institution.phone || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{institution.email || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>
                {typeof institution.student_count === 'number'
                  ? institution.student_count.toLocaleString() + ' sinh viên'
                  : 'Chưa cập nhật'}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  institution.verified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {institution.verified ? (
                    <>
                      <Check className="w-3 h-3" />
                      Đã xác minh
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      Chờ xác minh
                    </>
                  )}
                </span>
                {!institution.verified && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex items-center gap-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVerifyInstitution(institution);
                    }}
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Đang xác minh...
                      </>
                    ) : (
                      <>
                        <Check className="w-3 h-3" />
                        Xác minh ngay
                      </>
                    )}
                  </Button>
                )}
              </div>
              <span className="text-xs text-gray-500">
                Thành lập {institution.established_year || 'N/A'}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  const SkeletonCard = () => (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
      
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cơ sở giáo dục</h1>
          <p className="text-gray-600 mt-1">
            Quản lý các cơ sở giáo dục trong mạng lưới blockchain
          </p>
        </div>
        
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Thêm cơ sở
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng cơ sở</p>
                  <p className="text-2xl font-bold text-gray-900">{institutions.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã xác minh</p>
                  <p className="text-2xl font-bold text-green-600">
                    {institutions.filter(i => i.verified).length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng sinh viên</p>
                  <p className="text-2xl font-bold text-purple-600">
                    25,000
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Năm thành lập TB</p>
                  <p className="text-2xl font-bold text-orange-600">
                    1985
                  </p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Search */}
      <div className="max-w-md relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Tìm kiếm cơ sở giáo dục..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10"
          disabled={isLoading}
        />
      </div>

      {/* Institutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </>
        ) : (
          <>
            {filteredInstitutions.map((institution, index) => (
              <InstitutionCard 
                key={institution.id} 
                institution={institution} 
                index={index}
              />
            ))}
          </>
        )}
      </div>

      {!isLoading && filteredInstitutions.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'Không tìm thấy cơ sở' : 'Chưa có cơ sở giáo dục'}
          </h3>
          <p className="text-gray-600">
            {searchQuery ? 'Thử điều chỉnh từ khóa tìm kiếm' : 'Thêm cơ sở giáo dục đầu tiên để bắt đầu'}
          </p>
        </div>
      )}

      {/* Create Institution Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => !isCreating && setShowCreateModal(false)}
        title="Thêm cơ sở giáo dục mới"
      >
        <div className="space-y-4">
          <Input
            label="Tên cơ sở"
            placeholder="Nhập tên cơ sở giáo dục"
            value={newInstitution.name}
            onChange={(e) => setNewInstitution(prev => ({ ...prev, name: e.target.value }))}
            required
            disabled={isCreating}
          />
          {/* Loại hình */}
          <select
            value={newInstitution.type}
            onChange={e => setNewInstitution(prev => ({ ...prev, type: e.target.value }))}
            required
            disabled={isCreating}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Chọn loại hình</option>
            <option value="university">Đại học</option>
            <option value="college">Cao đẳng</option>
            <option value="high-school">Trung học phổ thông</option>
          </select>
          <Input
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            value={newInstitution.address}
            onChange={(e) => setNewInstitution(prev => ({ ...prev, address: e.target.value }))}
            required
            disabled={isCreating}
          />
          <Input
            label="Năm thành lập"
            type="number"
            placeholder="VD: 1956"
            value={newInstitution.establishedYear}
            onChange={(e) => setNewInstitution(prev => ({ ...prev, establishedYear: e.target.value }))}
            disabled={isCreating}
          />
          <Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={newInstitution.phone}
            onChange={(e) => setNewInstitution(prev => ({ ...prev, phone: e.target.value }))}
            disabled={isCreating}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Nhập địa chỉ email"
            value={newInstitution.email}
            onChange={(e) => setNewInstitution(prev => ({ ...prev, email: e.target.value }))}
            disabled={isCreating}
          />
          <Input
            label="Số lượng sinh viên"
            type="number"
            placeholder="Nhập số lượng sinh viên"
            value={newInstitution.studentCount}
            onChange={(e) => setNewInstitution(prev => ({ ...prev, studentCount: e.target.value }))}
            disabled={isCreating}
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowCreateModal(false)}
              disabled={isCreating}
            >
              Hủy
            </Button>
            <Button 
              onClick={handleCreateInstitution}
              loading={isCreating}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Thêm cơ sở
            </Button>
          </div>
        </div>
      </Modal>

      {/* Institution Detail Modal */}
      {selectedInstitution && (
        <Modal
          isOpen={!!selectedInstitution}
          onClose={() => !isUpdating && setSelectedInstitution(null)}
          title="Chỉnh sửa cơ sở giáo dục"
        >
          <div className="space-y-4">
            <Input
              label="Tên cơ sở"
              defaultValue={selectedInstitution.name}
              disabled={isUpdating}
            />
            <Input
              label="Loại hình"
              defaultValue={selectedInstitution.type}
              disabled={isUpdating}
            />
            <Input
              label="Địa chỉ"
              defaultValue={selectedInstitution.address}
              disabled={isUpdating}
            />
            <Input
              label="Năm thành lập"
              type="number"
              defaultValue="1995"
              disabled={isUpdating}
            />
            <Input
              label="Số điện thoại"
              defaultValue="+84 123 456 789"
              disabled={isUpdating}
            />
            <Input
              label="Email"
              type="email"
              defaultValue={`contact@${selectedInstitution.name.toLowerCase().replace(/\s+/g, '')}.edu.vn`}
              disabled={isUpdating}
            />
            <Input
              label="Số lượng sinh viên"
              type="number"
              defaultValue="5000"
              disabled={isUpdating}
            />
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedInstitution(null)}
                disabled={isUpdating}
              >
                Hủy
              </Button>
              <Button 
                onClick={handleUpdateInstitution}
                loading={isUpdating}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Institutions;
// For module compatibility
export { Institutions };
