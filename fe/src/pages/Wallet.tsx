import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, CreditCard, TrendingUp, Clock, RefreshCw, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { Card, Button, SkeletonCard } from '../components/common';
import { TransactionHistory } from '../components/wallet';
import { useStore } from '../store';
import { useNotifications } from '../hooks';

const Wallet: React.FC = () => {
  const { wallet, transactions } = useStore();
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadWalletData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    
    loadWalletData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      addNotification({
        type: 'success',
        title: 'Dữ liệu ví đã được cập nhật',
        message: 'Thông tin ví và giao dịch đã được làm mới'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi làm mới',
        message: 'Không thể cập nhật dữ liệu ví. Vui lòng thử lại.'
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addNotification({
        type: 'success',
        title: 'Đã sao chép',
        message: `${label} đã được sao chép vào clipboard`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Lỗi sao chép',
        message: 'Không thể sao chép văn bản'
      });
    }
  };

  const handleQuickAction = (action: string) => {
    addNotification({
      type: 'info',
      title: 'Tính năng đang phát triển',
      message: `Tính năng ${action} sẽ sớm được cập nhật`
    });
  };

  const stats = [
    {
      title: 'Số dư ví',
      value: wallet.balance ? `${wallet.balance} ETH` : '0.00 ETH',
      icon: WalletIcon,
      color: 'blue',
      change: '+2.4%'
    },
    {
      title: 'Tổng giao dịch',
      value: transactions.length.toString(),
      icon: CreditCard,
      color: 'green',
      change: '+12.3%'
    },
    {
      title: 'Phí gas đã trả',
      value: `${transactions.reduce((acc, tx) => acc + parseFloat(tx.gasUsed || '0'), 0).toFixed(4)} ETH`,
      icon: TrendingUp,
      color: 'purple',
      change: '-5.1%'
    },
    {
      title: 'Giao dịch cuối',
      value: transactions.length > 0 ? 'Vừa xong' : 'Chưa có',
      icon: Clock,
      color: 'orange',
      change: ''
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ví Blockchain</h1>
          <p className="text-gray-600 mt-1">
            Quản lý ví blockchain và xem lịch sử giao dịch
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={handleRefresh}
          loading={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Làm mới
        </Button>
      </div>

      {/* Wallet Status */}
      {!wallet.isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-6 text-center border-2 border-dashed border-gray-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Chưa kết nối ví
                </h3>
                <p className="text-gray-600 mb-4">
                  Vui lòng kết nối ví MetaMask từ header để xem thông tin chi tiết
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>💡</span>
                  <span>Nhấn nút "Kết nối ví" ở góc phải trên header</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : null}

      {/* Stats Grid */}
      {wallet.isConnected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} className="h-32" />
            ))
          ) : (
            stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {stat.change && (
                      <span className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
        </div>
      )}

      {/* Wallet Details */}
      {wallet.isConnected && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Chi tiết ví
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Địa chỉ ví
                </label>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <p className="font-mono text-sm text-gray-900 break-all mr-2">
                    {wallet.address}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(wallet.address || '', 'Địa chỉ ví')}
                      className="p-1"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                      className="p-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Mạng lưới
                </label>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-900">
                    {wallet.network || 'Ethereum Mainnet'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >      <TransactionHistory />
      </motion.div>      {/* Quick Actions */}
      {wallet.isConnected && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Thao tác nhanh
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => handleQuickAction('gửi giao dịch')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Gửi giao dịch</h3>
                  <p className="text-sm text-gray-600">Chuyển tiền đến ví khác</p>
                </div>
              </button>

              <button 
                onClick={() => handleQuickAction('nhận tiền')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <WalletIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Nhận tiền</h3>
                  <p className="text-sm text-gray-600">Lấy địa chỉ ví của bạn</p>
                </div>
              </button>

              <button 
                onClick={() => handleQuickAction('xem phân tích')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Xem phân tích</h3>
                  <p className="text-sm text-gray-600">Phân tích mẫu giao dịch</p>
                </div>
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

// Export the component with the expected name for index.ts
export default Wallet;
