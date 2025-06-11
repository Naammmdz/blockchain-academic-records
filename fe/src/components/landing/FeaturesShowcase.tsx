import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  Lock,
  Smartphone,
  Download,
  CheckCircle,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Bảo Mật Blockchain',
    description: 'Công nghệ mã hóa tiên tiến đảm bảo dữ liệu không thể bị thay đổi hoặc giả mạo',
    details: [
      'Mã hóa AES-256',
      'Hash SHA-256',
      'Chữ ký số đa lớp',
      'Audit trail đầy đủ'
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    demo: {
      type: 'animation',
      title: 'Xem quy trình mã hóa',
      content: 'blockchain-encryption'
    }
  },
  {
    icon: Zap,
    title: 'Xác Thực Tức Thì',
    description: 'Kiểm tra tính xác thực của bằng cấp chỉ trong vài giây thông qua QR code hoặc link',
    details: [
      'Quét QR code',
      'Xác thực real-time',
      'Kết quả tức thì',
      'Lịch sử xác thực'
    ],
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    demo: {
      type: 'interactive',
      title: 'Thử tính năng xác thực',
      content: 'qr-verification'
    }
  },
  {
    icon: Globe,
    title: 'Tương Thích Quốc Tế',
    description: 'Tuân thủ các tiêu chuẩn giáo dục quốc tế, được công nhận bởi các tổ chức toàn cầu',
    details: [
      'Chuẩn ISO 21500',
      'GDPR compliant',
      'Multi-language',
      'Global recognition'
    ],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    demo: {
      type: 'showcase',
      title: 'Xem các đối tác quốc tế',
      content: 'global-partners'
    }
  },
  {
    icon: Users,
    title: 'Quản Lý Đa Vai Trò',
    description: 'Hệ thống phân quyền linh hoạt cho sinh viên, nhà trường, nhà tuyển dụng và cơ quan xác thực',
    details: [
      'Phân quyền chi tiết',
      'Dashboard riêng biệt',
      'Workflow tùy chỉnh',
      'Báo cáo theo vai trò'
    ],
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    demo: {
      type: 'interface',
      title: 'Khám phá các dashboard',
      content: 'role-management'
    }
  },
  {
    icon: BarChart3,
    title: 'Thống Kê & Báo Cáo',
    description: 'Cung cấp insights chi tiết về việc sử dụng, xu hướng và hiệu quả của hệ thống',
    details: [
      'Real-time analytics',
      'Custom reports',
      'Data visualization',
      'Export multiple formats'
    ],
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    demo: {
      type: 'chart',
      title: 'Xem dashboard analytics',
      content: 'analytics-demo'
    }
  },
  {
    icon: Lock,
    title: 'Quyền Riêng Tư',
    description: 'Người dùng hoàn toàn kiểm soát dữ liệu cá nhân và quyết định chia sẻ với ai',
    details: [
      'Self-sovereign identity',
      'Granular permissions',
      'Data ownership',
      'Privacy by design'
    ],
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    demo: {
      type: 'simulation',
      title: 'Mô phỏng kiểm soát quyền riêng tư',
      content: 'privacy-control'
    }
  },
  {
    icon: Smartphone,
    title: 'Đa Nền Tảng',
    description: 'Sử dụng trên mọi thiết bị: web, mobile app, và tích hợp API cho các hệ thống khác',
    details: [
      'Progressive Web App',
      'iOS & Android native',
      'REST API',
      'SDK integration'
    ],
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    demo: {
      type: 'responsive',
      title: 'Xem trên các thiết bị',
      content: 'cross-platform'
    }
  },
  {
    icon: Download,
    title: 'Xuất & Chia Sẻ',
    description: 'Xuất hồ sơ theo nhiều định dạng và chia sẻ một cách bảo mật với các bên liên quan',
    details: [
      'PDF, JSON, XML export',
      'Secure sharing links',
      'Time-limited access',
      'Download tracking'
    ],
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    demo: {
      type: 'download',
      title: 'Thử tính năng xuất file',
      content: 'export-demo'
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const FeaturesShowcase: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const toggleDemo = (index: number) => {
    setIsPlaying(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tính Năng Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá những tính năng mạnh mẽ giúp bảo vệ, quản lý và xác thực 
            hồ sơ học tập một cách hiệu quả nhất
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
                className={`${feature.bgColor} rounded-xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                  selectedFeature === index ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4 relative z-10`}>
                  <IconComponent size={24} className="text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Demo Button */}
                <div className="mt-4 relative z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDemo(index);
                    }}
                    className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                  >
                    {isPlaying[index] ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
                    {feature.demo.title}
                  </button>
                </div>

                {/* Expand Indicator */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{ rotate: selectedFeature === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight size={16} className="text-gray-400" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detailed View */}
        <AnimatePresence>
          {selectedFeature !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className={`${features[selectedFeature].bgColor} rounded-2xl p-8 border-2 border-blue-200`}>
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left: Feature Details */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${features[selectedFeature].color} flex items-center justify-center mr-4`}>
                        {React.createElement(features[selectedFeature].icon, { size: 28, className: 'text-white' })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {features[selectedFeature].title}
                        </h3>
                        <p className="text-gray-600">
                          Chi tiết tính năng
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-gray-700 mb-6">
                      {features[selectedFeature].description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-3">Điểm nổi bật:</h4>
                      {features[selectedFeature].details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Interactive Demo */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                      <div className={`w-full h-48 bg-gradient-to-br ${features[selectedFeature].color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                        {/* Demo Placeholder */}
                        <div className="text-white text-center">
                          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                            {React.createElement(features[selectedFeature].icon, { size: 32 })}
                          </div>
                          <p className="text-sm opacity-90">
                            {features[selectedFeature].demo.title}
                          </p>
                        </div>

                        {/* Animated Elements */}
                        {isPlaying[selectedFeature] && (
                          <>
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 border-4 border-white border-opacity-30 rounded-lg"
                            />
                            <motion.div
                              initial={{ x: -100, opacity: 0 }}
                              animate={{ x: 100, opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                              className="absolute top-1/2 left-4 w-2 h-2 bg-white rounded-full"
                            />
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => toggleDemo(selectedFeature)}
                        className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${features[selectedFeature].color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300`}
                      >
                        {isPlaying[selectedFeature] ? (
                          <>
                            <Pause size={16} className="mr-2" />
                            Dừng Demo
                          </>
                        ) : (
                          <>
                            <Play size={16} className="mr-2" />
                            Chạy Demo
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Trải Nghiệm Đầy Đủ Tính Năng
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Khám phá toàn bộ sức mạnh của hệ thống với bản dùng thử miễn phí 30 ngày
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Dùng Thử Miễn Phí
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                Xem Demo Live
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
