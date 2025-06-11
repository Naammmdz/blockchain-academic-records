import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  UserPlus, 
  Upload, 
  Shield, 
  Search, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Award
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Đăng Ký Tài Khoản',
    description: 'Tạo tài khoản cá nhân hoặc tổ chức trong vài phút với xác thực bảo mật đa lớp',
    details: [
      'Xác thực email và số điện thoại',
      'Thiết lập bảo mật 2FA',
      'Chọn vai trò phù hợp'
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    number: '02',
    icon: Upload,
    title: 'Tải Lên Hồ Sơ',
    description: 'Upload bằng cấp, chứng chỉ hoặc thông tin học tập để được số hóa và mã hóa',
    details: [
      'Hỗ trợ nhiều định dạng file',
      'Tự động trích xuất thông tin',
      'Xác thực tài liệu gốc'
    ],
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50'
  },
  {
    number: '03',
    icon: Shield,
    title: 'Xác Thực Blockchain',
    description: 'Hệ thống tự động xác thực và ghi nhận thông tin lên blockchain với mã hash duy nhất',
    details: [
      'Mã hóa 256-bit',
      'Ghi nhận bất biến',
      'Timestamp chính xác'
    ],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    number: '04',
    icon: Search,
    title: 'Chia Sẻ & Xác Minh',
    description: 'Chia sẻ thông tin với các bên liên quan hoặc cho phép họ xác minh tức thì',
    details: [
      'QR Code xác thực',
      'Link chia sẻ bảo mật',
      'Kiểm tra thời gian thực'
    ],
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50'
  }
];

const benefits = [
  {
    icon: Clock,
    title: 'Tiết Kiệm Thời Gian',
    description: 'Xác thực trong vài giây thay vì vài tuần',
    stat: '99%',
    statLabel: 'giảm thời gian xử lý'
  },
  {
    icon: Shield,
    title: 'Bảo Mật Tuyệt Đối',
    description: 'Công nghệ blockchain bảo vệ khỏi giả mạo',
    stat: '100%',
    statLabel: 'chống giả mạo'
  },
  {
    icon: Users,
    title: 'Kết Nối Toàn Cầu',
    description: 'Được công nhận bởi các tổ chức quốc tế',
    stat: '150+',
    statLabel: 'đối tác tin cậy'
  },
  {
    icon: Award,
    title: 'Chuẩn Quốc Tế',
    description: 'Tuân thủ các tiêu chuẩn bảo mật toàn cầu',
    stat: 'ISO 27001',
    statLabel: 'chứng nhận'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const stepVariants = {
  hidden: { 
    opacity: 0, 
    x: -30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const HowItWorks: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cách Thức Hoạt Động
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quy trình đơn giản 4 bước để bảo vệ và xác thực hồ sơ học tập của bạn 
            với công nghệ blockchain tiên tiến nhất
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                variants={stepVariants}
                className={`flex items-center mb-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 ${isEven ? 'pr-12' : 'pl-12'}`}>
                  <div className={`${isEven ? 'text-left' : 'text-right'}`}>
                    <span className={`inline-block text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      {step.description}
                    </p>
                    <ul className={`space-y-2 ${isEven ? '' : 'text-right'}`}>
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className={`flex items-center text-gray-700 ${isEven ? '' : 'justify-end'}`}>
                          {isEven && <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />}
                          <span className="text-sm">{detail}</span>
                          {!isEven && <CheckCircle size={16} className="text-green-500 ml-2 flex-shrink-0" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full ${step.bgColor} flex items-center justify-center border-4 border-white shadow-lg`}>
                    <IconComponent size={32} className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-300" />
                  )}
                </div>

                {/* Spacer */}
                <div className={`flex-1 ${isEven ? 'pl-12' : 'pr-12'}`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          ref={benefitsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Lợi Ích Vượt Trội
            </h3>
            <p className="text-lg text-gray-600">
              Những giá trị cốt lõi mà chúng tôi mang lại cho hệ sinh thái giáo dục
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    {benefit.statLabel}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Sẵn Sàng Bắt Đầu?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Tham gia cùng hàng nghìn người dùng đã tin tưởng hệ thống của chúng tôi
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center">
              Bắt Đầu Ngay
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
