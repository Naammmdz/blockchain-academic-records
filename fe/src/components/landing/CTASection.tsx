import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Users,
  ChevronRight,
  Clock,
  Gift
} from 'lucide-react';
import { Button } from '../common';

const ctaOptions = [
  {
    id: 'student',
    title: 'Sinh Viên',
    subtitle: 'Bảo vệ bằng cấp của bạn',
    description: 'Tạo tài khoản miễn phí và bắt đầu bảo vệ hồ sơ học tập ngay hôm nay',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    benefits: [
      'Miễn phí trọn đời',
      'Bảo mật tuyệt đối',
      'Chia sẻ dễ dàng',
      'Hỗ trợ 24/7'
    ],
    cta: 'Đăng Ký Miễn Phí',
    popular: true
  },
  {
    id: 'school',
    title: 'Trường Học',
    subtitle: 'Số hóa quy trình cấp bằng',
    description: 'Tham gia chương trình thí điểm với gói ưu đãi dành cho trường học',
    icon: Shield,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    benefits: [
      'Dùng thử 30 ngày',
      'Đào tạo miễn phí',
      'Tích hợp dễ dàng',
      'Hỗ trợ chuyển đổi'
    ],
    cta: 'Đăng Ký Thí Điểm',
    badge: 'Ưu đãi đặc biệt'
  },
  {
    id: 'enterprise',
    title: 'Doanh Nghiệp',
    subtitle: 'Tích hợp xác thực tự động',
    description: 'API mạnh mẽ để tích hợp vào hệ thống tuyển dụng hiện có',
    icon: Zap,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    benefits: [
      'API RESTful',
      'Tài liệu chi tiết',
      'Sandbox testing',
      'SLA 99.9%'
    ],
    cta: 'Tư Vấn Giải Pháp',
    badge: 'Tích hợp nhanh'
  }
];

const urgencyFactors = [
  {
    icon: Clock,
    text: 'Chỉ còn 48 giờ để nhận ưu đãi đặc biệt',
    color: 'text-red-600'
  },
  {
    icon: Gift,
    text: '500 tài khoản đầu tiên được miễn phí Premium',
    color: 'text-orange-600'
  },
  {
    icon: Users,
    text: 'Hơn 1,000 người đã đăng ký trong tuần này',
    color: 'text-green-600'
  }
];

export const CTASection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleSubmit = async (optionId: string) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Handle success
    alert(`Đăng ký thành công cho ${optionId}!`);
  };

  const selectedCTA = ctaOptions.find(option => option.id === selectedOption);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Urgency Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium animate-pulse">
            <Sparkles size={16} className="mr-2" />
            Ưu đãi có thời hạn - Đăng ký ngay!
          </div>
        </motion.div>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sẵn Sàng Bắt Đầu
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Hành Trình</span>
            <br />
            Bảo Vệ Hồ Sơ Học Tập?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Tham gia cùng hàng nghìn tổ chức và cá nhân đã tin tưởng công nghệ blockchain 
            của chúng tôi để bảo vệ và xác thực hồ sơ giáo dục
          </p>

          {/* Urgency Factors */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            {urgencyFactors.map((factor, index) => {
              const IconComponent = factor.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3"
                >
                  <IconComponent size={20} className={`mr-2 ${factor.color}`} />
                  <span className="text-white text-sm font-medium">{factor.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Option Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {ctaOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`relative flex items-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOption === option.id
                      ? 'bg-white text-gray-900 shadow-xl scale-105'
                      : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      Phổ biến
                    </div>
                  )}
                  {option.badge && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {option.badge}
                    </div>
                  )}
                  <IconComponent size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="font-bold">{option.title}</div>
                    <div className={`text-sm ${selectedOption === option.id ? 'text-gray-600' : 'text-gray-300'}`}>
                      {option.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Option Details */}
          {selectedCTA && (
            <motion.div
              key={selectedOption}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 md:p-12"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedCTA.color} flex items-center justify-center mr-4`}>
                      {React.createElement(selectedCTA.icon, { size: 28, className: 'text-white' })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedCTA.title}</h3>
                      <p className="text-blue-200">{selectedCTA.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 mb-8">
                    {selectedCTA.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {selectedCTA.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center text-white">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Form */}
                <div className="bg-white rounded-xl p-8 shadow-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">
                    Bắt đầu ngay hôm nay
                  </h4>

                  <form onSubmit={(e) => { e.preventDefault(); handleSubmit(selectedOption); }}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email của bạn
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tên tổ chức (tùy chọn)
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tên trường/công ty"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+84 xxx xxx xxx"
                        />
                      </div>
                    </div>                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r ${selectedCTA.color} hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center`}
                      size="lg"
                      onClick={() => navigate('/login')}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Đang xử lý...
                        </div>
                      ) : (
                        <>
                          {selectedCTA.cta}
                          <ArrowRight size={20} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Bằng cách đăng ký, bạn đồng ý với{' '}
                    <a href="#" className="text-blue-600 hover:underline">Điều khoản dịch vụ</a> và{' '}
                    <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Alternative Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Bạn cần thêm thông tin trước khi quyết định?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center">
              Xem Demo Trực Tiếp
              <ChevronRight size={20} className="ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center">
              Tải Tài Liệu Chi Tiết
              <ChevronRight size={20} className="ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center">
              Liên Hệ Tư Vấn
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        </motion.div>

        {/* Security Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <Shield size={16} className="mr-2" />
            <span>Dữ liệu được bảo vệ bởi mã hóa cấp độ ngân hàng</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
