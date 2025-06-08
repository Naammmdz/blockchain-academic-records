import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Monitor,
  Smartphone,
  Mail,
  Database,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw
} from 'lucide-react';
import { Button, Card, Input } from '../components/common';
import { useNotifications } from '../hooks';

const Settings: React.FC = () => {
  const { addNotification } = useNotifications();
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    dataSharing: true
  });

  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('vi');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    
    addNotification({
      type: 'success',
      title: 'Đã cập nhật',
      message: `Cài đặt thông báo đã được thay đổi`
    });
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    
    addNotification({
      type: 'info',
      title: 'Cài đặt quyền riêng tư',
      message: 'Cài đặt quyền riêng tư đã được cập nhật'
    });
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addNotification({
        type: 'success',
        title: 'Lưu thành công',
        message: 'Tất cả cài đặt đã được lưu thành công'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi lưu cài đặt',
        message: 'Không thể lưu cài đặt. Vui lòng thử lại.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset to defaults
      setNotifications({
        email: true,
        push: false,
        sms: false,
        marketing: true
      });
      setPrivacy({
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        dataSharing: true
      });
      setTheme('system');
      setLanguage('vi');
      
      addNotification({
        type: 'info',
        title: 'Đặt lại thành công',
        message: 'Tất cả cài đặt đã được đặt lại về mặc định'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi đặt lại',
        message: 'Không thể đặt lại cài đặt. Vui lòng thử lại.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const ToggleSwitch: React.FC<{ 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    disabled?: boolean;
  }> = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const settingSections = [
    {
      title: 'Thông báo',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Thông báo email</h4>
              <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
            </div>
            <ToggleSwitch
              checked={notifications.email}
              onChange={(checked) => handleNotificationChange('email', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Thông báo đẩy</h4>
              <p className="text-sm text-gray-600">Nhận thông báo đẩy trên trình duyệt</p>
            </div>
            <ToggleSwitch
              checked={notifications.push}
              onChange={(checked) => handleNotificationChange('push', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Thông báo SMS</h4>
              <p className="text-sm text-gray-600">Nhận thông báo qua tin nhắn</p>
            </div>
            <ToggleSwitch
              checked={notifications.sms}
              onChange={(checked) => handleNotificationChange('sms', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Thông báo marketing</h4>
              <p className="text-sm text-gray-600">Nhận cập nhật về tính năng mới</p>
            </div>
            <ToggleSwitch
              checked={notifications.marketing}
              onChange={(checked) => handleNotificationChange('marketing', checked)}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Quyền riêng tư & Bảo mật',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hiển thị hồ sơ
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">Công khai</option>
              <option value="private">Riêng tư</option>
              <option value="friends">Chỉ bạn bè</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Hiển thị địa chỉ email</h4>
              <p className="text-sm text-gray-600">Hiển thị email trên hồ sơ công khai</p>
            </div>
            <ToggleSwitch
              checked={privacy.showEmail}
              onChange={(checked) => handlePrivacyChange('showEmail', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Hiển thị số điện thoại</h4>
              <p className="text-sm text-gray-600">Hiển thị số điện thoại trên hồ sơ công khai</p>
            </div>
            <ToggleSwitch
              checked={privacy.showPhone}
              onChange={(checked) => handlePrivacyChange('showPhone', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Chia sẻ dữ liệu</h4>
              <p className="text-sm text-gray-600">Cho phép chia sẻ dữ liệu phân tích</p>
            </div>
            <ToggleSwitch
              checked={privacy.dataSharing}
              onChange={(checked) => handlePrivacyChange('dataSharing', checked)}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Giao diện & Ngôn ngữ',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chủ đề giao diện
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'light', label: 'Sáng', icon: Sun },
                { value: 'dark', label: 'Tối', icon: Moon },
                { value: 'system', label: 'Hệ thống', icon: Monitor }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    theme === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <option.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngôn ngữ
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: 'API & Tích hợp',
      icon: Database,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  value="sk-1234567890abcdef1234567890abcdef"
                  readOnly
                  className="pr-10"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button variant="outline" size="sm">
                Tạo mới
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Sử dụng API key này để tích hợp với các ứng dụng bên ngoài
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Webhook URL</h4>
              <p className="text-sm text-gray-600">Nhận thông báo qua webhook</p>
            </div>
            <Button variant="outline" size="sm">
              Cấu hình
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Xuất dữ liệu</h4>
              <p className="text-sm text-gray-600">Tải xuống tất cả dữ liệu của bạn</p>
            </div>
            <Button variant="outline" size="sm">
              Xuất
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-600 mt-1">
            Quản lý tùy chọn tài khoản và ứng dụng của bạn
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleResetSettings}
            loading={isSaving}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Đặt lại
          </Button>
          <Button
            onClick={handleSaveSettings}
            loading={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Lưu cài đặt
          </Button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              {section.content}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 border-red-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Vùng nguy hiểm</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
              <div>
                <h4 className="font-medium text-red-900">Xóa tài khoản</h4>
                <p className="text-sm text-red-700">Xóa vĩnh viễn tài khoản và tất cả dữ liệu</p>
              </div>
              <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                Xóa tài khoản
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
              <div>
                <h4 className="font-medium text-orange-900">Đăng xuất tất cả thiết bị</h4>
                <p className="text-sm text-orange-700">Đăng xuất khỏi tất cả thiết bị và phiên</p>
              </div>
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                Đăng xuất tất cả
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;
