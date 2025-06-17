import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoNotificationsOutline, 
  IoChevronDown,
  IoWalletOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoCopyOutline,
  IoShieldCheckmarkOutline
} from 'react-icons/io5';
import { useStore } from '../../store';
import { useNotifications } from '../../hooks';
import { web3Service } from '../../services/web3Service';
import { Button } from '../common';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { wallet, setWallet } = useStore();
  const { addNotification } = useNotifications();
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userRole, setUserRole] = useState<string>('USER');
  // Connect wallet function
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const walletAddress = await web3Service.connectWallet();
      const walletBalance = await web3Service.getBalance(walletAddress);
      
      // Check user role
      const hasIssuerRole = await web3Service.checkCurrentUserIssuerRole();
      setUserRole(hasIssuerRole ? 'ISSUER' : 'USER');
      
      // Update wallet state in store
      setWallet({
        address: walletAddress,
        balance: parseFloat(walletBalance).toFixed(4),
        isConnected: true,
        network: wallet.network || 'Ethereum Testnet'
      });

      addNotification({
        type: 'success',
        title: 'Kết nối ví thành công',
        message: `Đã kết nối với ví ${walletAddress.slice(0, 10)}...${walletAddress.slice(-8)}`
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Lỗi kết nối ví',
        message: error.message || 'Không thể kết nối với MetaMask'
      });
    } finally {
      setIsConnecting(false);
    }
  };  // Disconnect wallet function
  const handleDisconnectWallet = () => {
    setWallet({
      address: undefined,
      balance: '0',
      isConnected: false,
      network: undefined
    });
    
    setUserRole('USER'); // Reset role
    
    addNotification({
      type: 'info',
      title: 'Đã ngắt kết nối ví',
      message: 'Ví đã được ngắt kết nối thành công'
    });
    
    setShowWalletMenu(false);
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      addNotification({
        type: 'success',
        title: 'Đã sao chép',
        message: 'Địa chỉ ví đã được sao chép vào clipboard'
      });
    }).catch(() => {
      addNotification({
        type: 'error',
        title: 'Lỗi sao chép',
        message: 'Không thể sao chép địa chỉ ví'
      });
    });
  };

  // Helper function to get role description
  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'ISSUER':
        return {
          name: 'Issuer',
          description: 'Có quyền cấp chứng chỉ',
          color: 'blue',
          icon: '🎓'
        };
      default:
        return {
          name: 'User',
          description: 'Xem & Xác minh chứng chỉ',
          color: 'gray',
          icon: '👤'
        };
    }
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
              </Button>            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleConnectWallet}
                className="flex items-center space-x-2"
                loading={isConnecting}
              >
                <IoWalletOutline className="w-4 h-4" />
                <span>{isConnecting ? 'Đang kết nối...' : 'Kết nối ví'}</span>
              </Button>
            )}            {/* Wallet Dropdown */}
            <AnimatePresence>
              {showWalletMenu && wallet.isConnected && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <IoShieldCheckmarkOutline className="w-4 h-4 text-green-600" />
                        Ví đã kết nối
                      </p>                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        userRole === 'ISSUER' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {getRoleDescription(userRole).icon} {getRoleDescription(userRole).name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 font-mono">{shortenAddress(wallet.address!)}</p>
                      <button
                        onClick={() => copyToClipboard(wallet.address!)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                        title="Sao chép địa chỉ"
                      >
                        <IoCopyOutline className="w-4 h-4" />
                      </button>
                    </div>                    <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-500">Số dư</p>
                        <p className="font-medium text-gray-900">{wallet.balance || '0'} ETH</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-500">Mạng</p>
                        <p className="font-medium text-gray-900">{wallet.network || 'Ethereum'}</p>
                      </div>                      <div className={`rounded p-2 ${
                        userRole === 'ISSUER' ? 'bg-blue-50' : 'bg-gray-50'
                      }`}>
                        <p className="text-gray-500">Quyền</p>
                        <p className={`font-medium ${
                          userRole === 'ISSUER' ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {getRoleDescription(userRole).description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        window.open(`https://etherscan.io/address/${wallet.address}`, '_blank');
                        setShowWalletMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <IoSettingsOutline className="w-4 h-4" />
                      <span>Xem trên Etherscan</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleDisconnectWallet}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <IoLogOutOutline className="w-4 h-4" />
                      <span>Ngắt kết nối ví</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <IoNotificationsOutline className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
