import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, QrCode, Upload, Camera, AlertCircle } from 'lucide-react';
import { Button, Card, SkeletonCard } from '../components/common';
import { FileUpload, QRScanner } from '../components/verification';
import { useNotifications } from '../hooks';

const Verification: React.FC = () => {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'upload' | 'qr'>('upload');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleFileVerification = async (file: File) => {
    setIsVerifying(true);
    setVerificationError(null);
    
    addNotification({
      type: 'info',
      title: 'Đang xác thực chứng chỉ',
      message: 'Vui lòng chờ trong khi hệ thống kiểm tra tính xác thực...'
    });

    try {
      // Mock verification process with possible failure
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure (90% success rate)
      if (Math.random() < 0.9) {
        const result = {
          status: 'verified',
          recordId: 'REC-' + Math.random().toString(36).substr(2, 9),
          studentName: 'Nguyễn Văn A',
          institution: 'Đại học Bách khoa Hà Nội',
          degree: 'Kỹ sư Công nghệ Thông tin',
          graduationDate: '2023-06-15',
          blockchainHash: '0x' + Math.random().toString(16).substr(2, 40),
          timestamp: new Date().toISOString()
        };
        
        setVerificationResult(result);
        addNotification({
          type: 'success',
          title: 'Xác thực thành công',
          message: 'Chứng chỉ đã được xác thực trên blockchain'
        });
      } else {
        throw new Error('Certificate not found in blockchain');
      }
    } catch (error) {
      const errorMessage = 'Không thể xác thực chứng chỉ. Chứng chỉ có thể không hợp lệ hoặc chưa được ghi nhận trên blockchain.';
      setVerificationError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Xác thực thất bại',
        message: errorMessage
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleQRScan = async (result: any) => {
    setIsVerifying(true);
    setVerificationError(null);
    
    addNotification({
      type: 'info',
      title: 'Đang quét mã QR',
      message: 'Đang xử lý thông tin từ mã QR...'
    });

    try {
      // Mock QR verification with possible failure
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random success/failure (85% success rate)
      if (Math.random() < 0.85) {
        const qrResult = {
          status: 'verified',
          qrData: result.recordId || 'QR-SCAN-DATA',
          recordId: 'REC-QR123456',
          studentName: 'Trần Thị B',
          institution: 'Đại học Quốc gia Hà Nội',
          degree: 'Thạc sĩ Khoa học Máy tính',
          graduationDate: '2023-09-20',
          blockchainHash: '0x' + Math.random().toString(16).substr(2, 40),
          timestamp: new Date().toISOString()
        };
        
        setVerificationResult(qrResult);
        addNotification({
          type: 'success',
          title: 'Quét QR thành công',
          message: 'Đã xác thực chứng chỉ từ mã QR'
        });
      } else {
        throw new Error('Invalid QR code or certificate not found');
      }
    } catch (error) {
      const errorMessage = 'Mã QR không hợp lệ hoặc chứng chỉ không tồn tại trên blockchain.';
      setVerificationError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Lỗi quét QR',
        message: errorMessage
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setVerificationError(null);
    addNotification({
      type: 'info',
      title: 'Sẵn sàng xác thực',
      message: 'Hệ thống đã sẵn sàng cho việc xác thực chứng chỉ mới'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Xác thực chứng chỉ
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Xác thực tính xác thực của chứng chỉ học tập bằng công nghệ blockchain. 
          Tải lên tệp chứng chỉ hoặc quét mã QR để kiểm tra trạng thái xác thực.
        </p>
      </div>

      {/* Verification Methods */}
      <div className="flex justify-center">        <div className="bg-white rounded-lg shadow-sm border p-1 flex">
          <button
            onClick={() => setActiveTab('upload')}
            disabled={isVerifying}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50 ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            Tải lên tệp
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            disabled={isVerifying}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50 ${
              activeTab === 'qr'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            Quét mã QR
          </button>
        </div>
      </div>      {/* Verification Interface */}
      {isVerifying ? (
        // Loading State
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <SkeletonCard className="h-64" />
        </motion.div>
      ) : verificationError ? (
        // Error State
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                Xác thực thất bại
              </h3>
              <p className="text-gray-600 mb-6">
                {verificationError}
              </p>
              <Button onClick={resetVerification} variant="outline">
                Thử lại
              </Button>
            </div>
          </Card>
        </motion.div>
      ) : !verificationResult ? (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {activeTab === 'upload' ? (
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <FileCheck className="w-8 h-8 text-blue-600" />
                </div>                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tải lên chứng chỉ
                </h3>
                <p className="text-gray-600">
                  Tải lên tệp chứng chỉ học tập để xác thực trên blockchain
                </p>
              </div>              <FileUpload
                onFileUpload={(files) => handleFileVerification(files[0])}
                acceptedTypes={['.pdf', '.jpg', '.jpeg', '.png']}
                maxSize={10 * 1024 * 1024} // 10MB
              />
            </Card>
          ) : (
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quét mã QR
                </h3>
                <p className="text-gray-600">
                  Sử dụng camera để quét mã QR trên chứng chỉ
                </p>
              </div>
              <QRScanner onScanResult={handleQRScan} />
            </Card>
          )}
        </motion.div>
      ) : (
        /* Verification Result */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Chứng chỉ đã được xác thực ✓
              </h3>
              <p className="text-gray-600">
                Chứng chỉ này đã được xác thực thành công trên blockchain
              </p>
            </div>

            {/* Certificate Details */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Mã hồ sơ
                  </label>
                  <p className="text-gray-900 font-mono text-sm">
                    {verificationResult.recordId}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tên sinh viên
                  </label>
                  <p className="text-gray-900">{verificationResult.studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Cơ sở giáo dục
                  </label>
                  <p className="text-gray-900">{verificationResult.institution}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bằng cấp
                  </label>
                  <p className="text-gray-900">{verificationResult.degree}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ngày tốt nghiệp
                  </label>
                  <p className="text-gray-900">{verificationResult.graduationDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ngày xác thực
                  </label>
                  <p className="text-gray-900">
                    {new Date(verificationResult.timestamp).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Mã băm Blockchain
                </label>
                <p className="text-gray-900 font-mono text-sm break-all">
                  {verificationResult.blockchainHash}
                </p>
              </div>
            </div>            <div className="flex justify-center mt-6">
              <Button onClick={resetVerification} variant="outline">
                Xác thực chứng chỉ khác
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Bảo mật Blockchain
            </h3>
            <p className="text-gray-600 text-sm">
              Tất cả chứng chỉ được bảo mật bằng công nghệ blockchain, đảm bảo 
              tính bất biến và chống giả mạo trong xác thực.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <FileCheck className="w-6 h-6 text-green-600" />
            </div>            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Xác thực tức thì
            </h3>
            <p className="text-gray-600 text-sm">
              Nhận kết quả xác thực ngay lập tức với thông tin chi tiết chứng chỉ 
              và bằng chứng blockchain.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <QrCode className="w-6 h-6 text-purple-600" />
            </div>            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nhiều phương thức
            </h3>
            <p className="text-gray-600 text-sm">
              Xác thực chứng chỉ thông qua tải lên tệp hoặc quét mã QR 
              để có sự tiện lợi tối đa.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Verification;
