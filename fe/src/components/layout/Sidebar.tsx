import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  IoHomeOutline, 
  IoDocumentTextOutline, 
  IoShieldCheckmarkOutline,
  IoWalletOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoChevronBack,
  IoSchoolOutline
} from 'react-icons/io5';
import { useStore } from '../../store';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { sidebarOpen, setSidebarOpen } = useStore();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: IoHomeOutline },
    { name: 'Hồ sơ học tập', href: '/records', icon: IoDocumentTextOutline },
    { name: 'Xác thực bằng cấp', href: '/verification', icon: IoShieldCheckmarkOutline },
    { name: 'Quản lý trường học', href: '/institutions', icon: IoSchoolOutline },
    { name: 'Ví blockchain', href: '/wallet', icon: IoWalletOutline },
    { name: 'Hồ sơ cá nhân', href: '/profile', icon: IoPersonOutline },
    { name: 'Cài đặt', href: '/settings', icon: IoSettingsOutline },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 64 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`bg-white border-r border-gray-200 flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <motion.div
          initial={false}
          animate={{ opacity: sidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-2"
        >
          {sidebarOpen && (
            <>
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <IoSchoolOutline className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">BlockchainEdu</span>
            </>
          )}
        </motion.div>
        
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <motion.div
            animate={{ rotate: sidebarOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <IoChevronBack className="w-5 h-5 text-gray-600" />
          </motion.div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <motion.span
              initial={false}
              animate={{ opacity: sidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="font-medium"
            >
              {sidebarOpen && item.name}
            </motion.span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <motion.div
          initial={false}
          animate={{ opacity: sidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-gray-500 text-center"
        >
          {sidebarOpen && (
            <>
              <p>Blockchain Academic Records</p>
              <p className="mt-1">v1.0.0</p>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
