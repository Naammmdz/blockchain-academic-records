import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Award,
  Shield,
  Users,
  CheckCircle2,
  Star,
  TrendingUp,
  Globe,
  Clock
} from 'lucide-react';

const trustMetrics = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Người dùng tin tưởng',
    description: 'Sinh viên và tổ chức giáo dục'
  },
  {
    icon: Award,
    value: '200+',
    label: 'Trường học đối tác',
    description: 'Từ phổ thông đến đại học'
  },
  {
    icon: CheckCircle2,
    value: '99.9%',
    label: 'Độ chính xác',
    description: 'Xác thực hồ sơ học tập'
  },
  {
    icon: TrendingUp,
    value: '150%',
    label: 'Tăng trưởng năm',
    description: 'Số lượng người dùng mới'
  }
];

const certifications = [
  {
    title: 'ISO 27001',
    subtitle: 'Bảo mật thông tin',
    description: 'Chứng nhận quản lý bảo mật thông tin quốc tế',
    icon: Shield,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'SOC 2 Type II',
    subtitle: 'Kiểm toán bảo mật',
    description: 'Đánh giá độc lập về tính bảo mật và khả năng sẵn sàng',
    icon: CheckCircle2,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'GDPR Compliant',
    subtitle: 'Bảo vệ dữ liệu',
    description: 'Tuân thủ quy định bảo vệ dữ liệu châu Âu',
    icon: Globe,
    color: 'from-purple-500 to-purple-600'
  }
];

const partnerships = [
  {
    name: 'Bộ Giáo Dục & Đào Tạo',
    role: 'Đối tác chiến lược',
    logo: '🏛️',
    description: 'Hợp tác phát triển chuẩn quốc gia'
  },
  {
    name: 'Microsoft',
    role: 'Đối tác công nghệ',
    logo: '💻',
    description: 'Azure Blockchain Service'
  },
  {
    name: 'IEEE',
    role: 'Chuẩn kỹ thuật',
    logo: '🔬',
    description: 'Blockchain Education Standards'
  },
  {
    name: 'UNESCO',
    role: 'Tổ chức quốc tế',
    logo: '🌏',
    description: 'Global Education Coalition'
  }
];

const securityFeatures = [
  {
    title: 'Mã Hóa End-to-End',
    description: 'Dữ liệu được mã hóa từ thiết bị người dùng đến blockchain',
    icon: '🔐'
  },
  {
    title: 'Multi-Signature',
    description: 'Yêu cầu nhiều chữ ký để thực hiện giao dịch quan trọng',
    icon: '✍️'
  },
  {
    title: 'Zero-Knowledge Proof',
    description: 'Xác thực thông tin mà không tiết lộ dữ liệu nhạy cảm',
    icon: '🕵️'
  },
  {
    title: 'Immutable Ledger',
    description: 'Dữ liệu không thể thay đổi sau khi ghi nhận',
    icon: '📋'
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

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const TrustSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [metricsRef, metricsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Được Tin Tưởng Bởi Hàng Nghìn Tổ Chức
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cam kết đảm bảo tính bảo mật, độ tin cậy và tuân thủ 
            các tiêu chuẩn quốc tế nghiêm ngặt nhất
          </p>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          ref={metricsRef}
          variants={containerVariants}
          initial="hidden"
          animate={metricsInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {trustMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent size={28} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-500">
                  {metric.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Chứng Nhận & Tuân Thủ
            </h3>
            <p className="text-lg text-gray-600">
              Đạt được các chứng nhận bảo mật và tuân thủ quốc tế hàng đầu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${cert.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent size={36} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-lg font-medium text-gray-600 mb-3">
                    {cert.subtitle}
                  </p>
                  <p className="text-gray-500">
                    {cert.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Đối Tác Chiến Lược
            </h3>
            <p className="text-lg text-gray-600">
              Hợp tác với các tổ chức uy tín để xây dựng hệ sinh thái giáo dục toàn cầu
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{partner.logo}</div>
                <h4 className="font-bold text-gray-900 mb-1">{partner.name}</h4>
                <p className="text-sm text-blue-600 font-medium mb-2">{partner.role}</p>
                <p className="text-xs text-gray-500">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Bảo Mật Cấp Độ Ngân Hàng
            </h3>
            <p className="text-lg opacity-90">
              Công nghệ bảo mật tiên tiến nhất để bảo vệ dữ liệu của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                <p className="text-sm opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Star className="text-yellow-400 mr-1" size={24} />
              <Star className="text-yellow-400 mr-1" size={24} />
              <Star className="text-yellow-400 mr-1" size={24} />
              <Star className="text-yellow-400 mr-1" size={24} />
              <Star className="text-yellow-400" size={24} />
            </div>
            <p className="text-lg opacity-90 mb-6">
              "Hệ thống blockchain giáo dục đáng tin cậy nhất tại Việt Nam"
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Tìm Hiểu Thêm Về Bảo Mật
            </button>
          </motion.div>
        </motion.div>

        {/* Uptime Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center"
        >
          <Clock size={48} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">99.9% Uptime Guarantee</h3>
          <p className="text-lg opacity-90 mb-4">
            Hệ thống luôn sẵn sàng phục vụ bạn 24/7/365
          </p>
          <p className="text-sm opacity-80">
            Cam kết hoàn tiền nếu thời gian hoạt động dưới 99.9% trong tháng
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
