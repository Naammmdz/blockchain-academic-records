import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Save, 
  Edit, 
  Upload,
  Shield,
  Lock,
  Smartphone,
  Activity,
  Award,
  Clock
} from 'lucide-react';
import { Button, Card, Input } from '../components/common';
import { useStore } from '../store';
import { useNotifications } from '../hooks';

const Profile: React.FC = () => {
  const { user } = useStore();
  const { addNotification } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+84 123 456 789',
    address: 'Hà Nội, Việt Nam',
    dateOfBirth: '1990-01-15',
    bio: 'Quản trị viên hệ thống chuyên về công nghệ blockchain và quản lý hồ sơ học tập.'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEditing(false);
      
      addNotification({
        type: 'success',
        title: 'Cập nhật thành công',
        message: 'Thông tin hồ sơ đã được lưu thành công'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi cập nhật',
        message: 'Không thể lưu thông tin hồ sơ. Vui lòng thử lại.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+84 123 456 789',
      address: 'Hà Nội, Việt Nam',
      dateOfBirth: '1990-01-15',
      bio: 'Quản trị viên hệ thống chuyên về công nghệ blockchain và quản lý hồ sơ học tập.'
    });
    setIsEditing(false);
    
    addNotification({
      type: 'info',
      title: 'Đã hủy thay đổi',
      message: 'Các thay đổi đã được hoàn tác'
    });
  };

  const handleAvatarUpload = async () => {
    setIsUploadingAvatar(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addNotification({
        type: 'success',
        title: 'Tải ảnh thành công',
        message: 'Ảnh đại diện đã được cập nhật thành công'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi tải ảnh',
        message: 'Không thể tải ảnh đại diện. Vui lòng thử lại.'
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSecurityAction = async (action: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let message = '';
      switch (action) {
        case 'password':
          message = 'Yêu cầu thay đổi mật khẩu đã được gửi đến email của bạn';
          break;
        case '2fa':
          message = 'Xác thực 2 bước đã được kích hoạt thành công';
          break;
        case 'sessions':
          message = 'Đã hiển thị danh sách phiên đăng nhập';
          break;
        default:
          message = 'Thao tác đã được thực hiện thành công';
      }
      
      addNotification({
        type: 'success',
        title: 'Thành công',
        message
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi',
        message: 'Không thể thực hiện thao tác. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy dữ liệu người dùng</h3>
        <p className="text-gray-600">Vui lòng đăng nhập để xem hồ sơ của bạn</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="text-gray-600 mt-1">
          Quản lý thông tin cá nhân và tùy chọn bảo mật của bạn
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative mb-4">
                <img
                  src={user.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button 
                  onClick={handleAvatarUpload}
                  disabled={isUploadingAvatar}
                  className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploadingAvatar ? (
                    <Upload className="w-4 h-4 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 text-center lg:text-left">
                {user.name}
              </h2>
              <p className="text-gray-600 text-center lg:text-left">{user.role}</p>
              <div className="mt-4 flex gap-2">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa hồ sơ
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      loading={isSaving}
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Lưu
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Hủy
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{formData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ email
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập địa chỉ email"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{formData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{formData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  {isEditing ? (
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">
                        {new Date(formData.dateOfBirth).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ
                </label>
                {isEditing ? (
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{formData.address}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới thiệu
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Viết vài dòng giới thiệu về bản thân..."
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">{formData.bio}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hoàn thành hồ sơ
            </h3>
            <p className="text-3xl font-bold text-blue-600 mb-1">85%</p>
            <p className="text-sm text-gray-600">Hoàn thành hồ sơ để mở khóa tất cả tính năng</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Thành viên từ
            </h3>
            <p className="text-lg font-semibold text-green-600 mb-1">
              Tháng 3, 2023
            </p>
            <p className="text-sm text-gray-600">Thành viên tích cực của hệ thống</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Trạng thái xác minh
            </h3>
            <p className="text-lg font-semibold text-purple-600 mb-1">Đã xác minh</p>
            <p className="text-sm text-gray-600">Tài khoản đã được xác minh đầy đủ</p>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Bảo mật tài khoản</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mật khẩu</h3>
                  <p className="text-sm text-gray-600">Thay đổi lần cuối 3 tháng trước</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSecurityAction('password')}
                loading={isLoading}
              >
                Đổi mật khẩu
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Xác thực 2 bước</h3>
                  <p className="text-sm text-gray-600">Thêm lớp bảo mật bổ sung</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSecurityAction('2fa')}
                loading={isLoading}
              >
                Kích hoạt 2FA
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phiên đăng nhập</h3>
                  <p className="text-sm text-gray-600">Quản lý các phiên đăng nhập đang hoạt động</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSecurityAction('sessions')}
                loading={isLoading}
              >
                Xem phiên
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
// For module compatibility
export { Profile };
