import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Button } from '../common';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const stats = [
    { number: '1,247+', label: 'Hồ sơ học tập' },
    { number: '52+', label: 'Trường học' },
    { number: '99.9%', label: 'Độ chính xác' },
    { number: '8,934+', label: 'Lần xác thực' }
  ];
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Công nghệ Blockchain bảo mật
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Bảo Mật{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Hồ Sơ Học Tập
                </span>{' '}
                Với Blockchain
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Hệ thống quản lý và xác thực bằng cấp số minh bạch, an toàn và không thể giả mạo. 
                Đảm bảo tính toàn vẹn của thông tin học tập trong kỷ nguyên số.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >              <Button
                size="lg"
                className="flex items-center gap-2 px-8 py-4 text-lg"
                onClick={() => navigate('/login')}
              >
                Vào Dashboard
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 px-8 py-4 text-lg"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                Tìm Hiểu Thêm
              </Button>
            </motion.div>            {/* Trust Indicators */}
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 pt-8"
            >
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">100% Bảo mật</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Minh bạch tuyệt đối</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Không thể giả mạo</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border">
              {/* Mock Certificate */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Chứng chỉ Blockchain</h3>
                    <p className="text-sm text-gray-600">Được xác thực và bảo mật</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tên:</span>
                    <span className="text-sm font-medium">Nguyễn Văn An</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Trường:</span>
                    <span className="text-sm font-medium">ĐH Bách Khoa Hà Nội</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bằng cấp:</span>
                    <span className="text-sm font-medium">Kỹ sư CNTT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hash:</span>
                    <span className="text-xs font-mono text-blue-600">0x1a2b3c...</span>
                  </div>
                </div>
                
                <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR Code</span>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
