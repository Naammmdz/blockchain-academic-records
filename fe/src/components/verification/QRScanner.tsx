import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoQrCodeOutline,
  IoScanOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoRefreshOutline,
  IoCameraOutline
} from 'react-icons/io5';
import { Card, Button } from '../common';
import { QRScanResult } from '../../types';

interface QRScannerProps {
  onScanResult: (result: QRScanResult) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScanResult }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const mockScanResult = () => {
    // Simulate QR scan result
    const mockResults: QRScanResult[] = [
      {
        recordId: 'rec_1',
        valid: true,
        message: 'Bằng cấp hợp lệ và đã được xác thực',
        data: {
          id: 'rec_1',
          studentId: 'SV001',
          studentName: 'Nguyễn Văn Anh',
          institutionId: 'inst_1',
          institutionName: 'Đại học Bách khoa Hà Nội',
          degree: 'Cử nhân',
          major: 'Công nghệ Thông tin',
          gpa: 3.8,
          graduationDate: '2023-06-15',
          certificateHash: '0x1234567890abcdef1234567890abcdef12345678',
          transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          status: 'verified',
          createdAt: '2023-06-20T10:30:00Z',
          updatedAt: '2023-06-25T14:15:00Z',
        }
      },
      {
        recordId: 'invalid',
        valid: false,
        message: 'Mã QR không hợp lệ hoặc bằng cấp chưa được xác thực'
      }
    ];

    const result = mockResults[Math.random() > 0.7 ? 1 : 0];
    setScanResult(result);
    onScanResult(result);
    stopScanning();
  };

  const resetScan = () => {
    setScanResult(null);
    setError(null);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <IoQrCodeOutline className="w-6 h-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Quét mã QR</h3>
        </div>

        {!isScanning && !scanResult && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <IoScanOutline className="w-12 h-12 text-primary-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Quét mã QR trên bằng cấp
            </h4>
            <p className="text-gray-600 mb-6">
              Sử dụng camera để quét mã QR và xác thực tính hợp lệ của bằng cấp
            </p>
            <Button 
              variant="primary" 
              onClick={startScanning}
              className="flex items-center space-x-2"
            >
              <IoCameraOutline className="w-5 h-5" />
              <span>Bắt đầu quét</span>
            </Button>
          </div>
        )}

        {/* Camera View */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary-500 rounded-br-lg"></div>
                    
                    {/* Scanning line animation */}
                    <motion.div
                      className="absolute w-full h-0.5 bg-primary-500"
                      animate={{ y: [0, 192, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center space-y-4">
                <p className="text-gray-600">Đưa mã QR vào khung hình để quét</p>
                <div className="flex items-center justify-center space-x-3">
                  <Button variant="outline" onClick={stopScanning}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={mockScanResult}>
                    Demo quét QR
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan Result */}
        <AnimatePresence>
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`p-6 rounded-lg border-2 ${
                scanResult.valid 
                  ? 'bg-secondary-50 border-secondary-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                {scanResult.valid ? (
                  <IoCheckmarkCircleOutline className="w-8 h-8 text-secondary-600 flex-shrink-0 mt-1" />
                ) : (
                  <IoCloseCircleOutline className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                )}
                
                <div className="flex-1">
                  <h4 className={`text-lg font-semibold mb-2 ${
                    scanResult.valid ? 'text-secondary-900' : 'text-red-900'
                  }`}>
                    {scanResult.valid ? 'Xác thực thành công!' : 'Xác thực thất bại!'}
                  </h4>
                  
                  <p className={`mb-4 ${
                    scanResult.valid ? 'text-secondary-700' : 'text-red-700'
                  }`}>
                    {scanResult.message}
                  </p>

                  {scanResult.valid && scanResult.data && (
                    <div className="bg-white p-4 rounded-lg border space-y-2">
                      <h5 className="font-medium text-gray-900">Thông tin bằng cấp:</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Sinh viên:</span>
                          <p className="font-medium">{scanResult.data.studentName}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Trường:</span>
                          <p className="font-medium">{scanResult.data.institutionName}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Bằng cấp:</span>
                          <p className="font-medium">{scanResult.data.degree}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Ngành:</span>
                          <p className="font-medium">{scanResult.data.major}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-end space-x-3">
                <Button variant="outline" onClick={resetScan}>
                  <IoRefreshOutline className="w-4 h-4 mr-2" />
                  Quét lại
                </Button>
                {scanResult.valid && (
                  <Button variant="primary">
                    Xem chi tiết
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <IoCloseCircleOutline className="w-5 h-5 text-red-600" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};
