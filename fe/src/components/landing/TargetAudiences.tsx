import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, School, Briefcase, CheckCircle } from 'lucide-react';
import { Button } from '../common';

const audiences = [
  {
    icon: GraduationCap,
    title: 'Sinh Viên',
    subtitle: 'Bảo Vệ Tương Lai Học Tập',
    description: 'Lưu trữ và quản lý bằng cấp, chứng chỉ một cách an toàn. Chia sẻ thông tin học tập với nhà tuyển dụng một cách minh bạch và đáng tin cậy.',
    benefits: [
      'Bảo mật tuyệt đối',
      'Truy cập mọi lúc mọi nơi',
      'Chia sẻ dễ dàng',
      'Miễn phí sử dụng'
    ],
    cta: 'Tạo Hồ Sơ',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: School,
    title: 'Trường Học',
    subtitle: 'Quản Lý Bằng Cấp Hiệu Quả',
    description: 'Số hóa quy trình cấp bằng, giảm thiểu gian lận và tăng cường uy tín của tổ chức giáo dục. Quản lý toàn bộ hồ sơ học sinh trên một nền tảng.',
    benefits: [
      'Tự động hóa quy trình',
      'Giảm chi phí vận hành',
      'Tăng uy tín trường học',
      'Báo cáo chi tiết'
    ],
    cta: 'Đăng Ký Trường',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: Briefcase,
    title: 'Nhà Tuyển Dụng',
    subtitle: 'Xác Thực Ứng Viên Tức Thì',
    description: 'Kiểm tra tính xác thực của bằng cấp, chứng chỉ trong vài giây. Đưa ra quyết định tuyển dụng nhanh chóng và chính xác hơn.',
    benefits: [
      'Xác thực tức thì',
      'Giảm rủi ro tuyển dụng',
      'Tiết kiệm thời gian',
      'API tích hợp dễ dàng'
    ],
    cta: 'Thử Xác Thực',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  },
  {
    icon: CheckCircle,
    title: 'Cơ Quan Xác Thực',
    subtitle: 'Đảm Bảo Độ Tin Cậy',
    description: 'Cung cấp dịch vụ xác thực độc lập cho các tổ chức. Tích hợp vào hệ thống hiện có để nâng cao chất lượng dịch vụ.',
    benefits: [
      'Độ chính xác 99.9%',
      'Tích hợp API',
      'Báo cáo chi tiết',
      'Hỗ trợ 24/7'
    ],
    cta: 'Tích Hợp API',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
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
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const TargetAudiences: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dành Cho Mọi Đối Tượng
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hệ thống blockchain của chúng tôi phục vụ toàn bộ hệ sinh thái giáo dục, 
            từ sinh viên đến các tổ chức giáo dục và nhà tuyển dụng
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className={`${audience.bgColor} rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group cursor-pointer`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`${audience.iconColor} mb-6 relative z-10`}>
                  <IconComponent size={48} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-lg font-medium text-gray-700 mb-4">
                    {audience.subtitle}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {audience.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-8">
                    {audience.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-gray-700">
                        <CheckCircle size={16} className={`${audience.iconColor} mr-2 flex-shrink-0`} />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="relative z-10">
                  <Button
                    variant="primary"
                    size="md"
                    className={`w-full bg-gradient-to-r ${audience.color} hover:shadow-lg transform transition-all duration-300 group-hover:scale-105`}
                  >
                    {audience.cta}
                  </Button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full translate-y-8 -translate-x-8" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Không chắc chắn về vai trò của bạn? Chúng tôi sẽ giúp bạn tìm ra giải pháp phù hợp
          </p>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Tư Vấn Miễn Phí
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudiences;
