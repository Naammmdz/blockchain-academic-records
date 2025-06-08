import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoNotificationsOutline, 
  IoPersonCircleOutline,
  IoChevronDown,
  IoWalletOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoCopyOutline
} from 'react-icons/io5';
import { useStore } from '../../store';
import { Button } from '../common';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { user, wallet } = useStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Search & Title */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Hệ thống quản lý hồ sơ học tập
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Blockchain Academic Records System
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Wallet Connection */}
          <div className="relative">
            {wallet.isConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWalletMenu(!showWalletMenu)}
                className="flex items-center space-x-2"
              >
                <IoWalletOutline className="w-4 h-4" />
                <span>{shortenAddress(wallet.address!)}</span>
                <IoChevronDown className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {/* TODO: Connect wallet */}}
                className="flex items-center space-x-2"
              >
                <IoWalletOutline className="w-4 h-4" />
                <span>Kết nối ví</span>
              </Button>
            )}

            {/* Wallet Dropdown */}
            <AnimatePresence>
              {showWalletMenu && wallet.isConnected && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Thông tin ví</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-600">{wallet.address}</p>
                      <button
                        onClick={() => copyToClipboard(wallet.address!)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <IoCopyOutline className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Số dư: {wallet.balance || '0'} ETH
                    </p>
                    <p className="text-xs text-gray-600">
                      Mạng: {wallet.network || 'Ethereum'}
                    </p>
                  </div>
                  <button
                    onClick={() => {/* TODO: Disconnect wallet */}}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <IoLogOutOutline className="w-4 h-4" />
                    <span>Ngắt kết nối</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <IoNotificationsOutline className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <IoPersonCircleOutline className="w-8 h-8 text-gray-600" />
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.role}</p>
              </div>
              <IoChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <IoPersonCircleOutline className="w-4 h-4" />
                    <span>Hồ sơ cá nhân</span>
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <IoSettingsOutline className="w-4 h-4" />
                    <span>Cài đặt</span>
                  </a>
                  <button
                    onClick={() => {/* TODO: Logout */}}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <IoLogOutOutline className="w-4 h-4" />
                    <span>Đăng xuất</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
