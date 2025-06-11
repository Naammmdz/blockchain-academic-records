import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'PGS.TS Nguyễn Văn Minh',
    position: 'Phó Hiệu trưởng',
    organization: 'Đại học Bách Khoa Hà Nội',
    avatar: '👨‍🏫',
    rating: 5,
    content: 'Hệ thống blockchain đã cách mạng hóa cách chúng tôi quản lý và cấp phát bằng cấp. Việc xác thực giờ đây chỉ mất vài giây thay vì vài tuần như trước.',
    highlight: 'Tiết kiệm 95% thời gian xử lý',
    category: 'education',
    video: true
  },
  {
    id: 2,
    name: 'Nguyễn Thu Hương',
    position: 'Sinh viên năm 4',
    organization: 'Đại học Kinh tế Quốc dân',
    avatar: '👩‍🎓',
    rating: 5,
    content: 'Tôi hoàn toàn yên tâm về tính bảo mật của bằng cấp. Khi nộp hồ sơ xin việc, nhà tuyển dụng có thể xác thực ngay lập tức mà không cần chờ đợi.',
    highlight: 'Xác thực tức thì khi xin việc',
    category: 'student'
  },
  {
    id: 3,
    name: 'Trần Đức Anh',
    position: 'Giám đốc Nhân sự',
    organization: 'FPT Software',
    avatar: '👨‍💼',
    rating: 5,
    content: 'Chúng tôi đã giảm được 80% thời gian kiểm tra hồ sơ ứng viên. Tính năng xác thực tự động giúp chúng tôi tuyển dụng nhanh chóng và chính xác hơn.',
    highlight: 'Giảm 80% thời gian tuyển dụng',
    category: 'recruiter'
  },
  {
    id: 4,
    name: 'TS. Lê Thị Lan',
    position: 'Trưởng phòng Đào tạo',
    organization: 'Trường THPT Chu Văn An',
    avatar: '👩‍🏫',
    rating: 5,
    content: 'Việc số hóa hồ sơ học sinh giúp chúng tôi quản lý hiệu quả hơn. Phụ huynh và học sinh đều hài lòng với tính minh bạch và bảo mật của hệ thống.',
    highlight: 'Tăng 40% hiệu quả quản lý',
    category: 'education'
  },
  {
    id: 5,
    name: 'Phạm Văn Hưng',
    position: 'Chuyên viên xác thực',
    organization: 'Bộ Giáo dục & Đào tạo',
    avatar: '👨‍💻',
    rating: 5,
    content: 'Hệ thống đáp ứng đầy đủ các tiêu chuẩn quốc gia về bảo mật và xác thực. Đây là bước tiến quan trọng trong số hóa ngành giáo dục Việt Nam.',
    highlight: 'Tuân thủ 100% tiêu chuẩn quốc gia',
    category: 'government'
  },
  {
    id: 6,
    name: 'Hoàng Minh Tuấn',
    position: 'Học sinh lớp 12',
    organization: 'Trường THPT Nguyễn Tất Thành',
    avatar: '👨‍🎓',
    rating: 5,
    content: 'Mình thích cách hệ thống cho phép chia sẻ thành tích học tập với bạn bè và gia đình. Giao diện thân thiện, dễ sử dụng ngay cả với học sinh như mình.',
    highlight: 'Giao diện thân thiện với học sinh',
    category: 'student'
  }
];

const stats = [
  {
    icon: Star,
    value: '4.9/5',
    label: 'Đánh giá trung bình',
    description: 'Từ 10,000+ người dùng'
  },
  {
    icon: Users,
    value: '98%',
    label: 'Tỷ lệ hài lòng',
    description: 'Người dùng sẽ giới thiệu'
  },
  {
    icon: TrendingUp,
    value: '150%',
    label: 'Tăng trưởng',
    description: 'Người dùng mới hàng tháng'
  },
  {
    icon: Award,
    value: '50+',
    label: 'Giải thưởng',
    description: 'Công nghệ & giáo dục'
  }
];

const categories = [
  { id: 'all', name: 'Tất cả', count: testimonials.length },
  { id: 'education', name: 'Giáo dục', count: testimonials.filter(t => t.category === 'education').length },
  { id: 'student', name: 'Sinh viên', count: testimonials.filter(t => t.category === 'student').length },
  { id: 'recruiter', name: 'Tuyển dụng', count: testimonials.filter(t => t.category === 'recruiter').length },
  { id: 'government', name: 'Chính phủ', count: testimonials.filter(t => t.category === 'government').length }
];

export const Testimonials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const toggleVideo = (id: number) => {
    setIsPlaying(prev => ({
      ...prev,
      [id]: !prev[id]
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
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hàng nghìn tổ chức giáo dục, sinh viên và nhà tuyển dụng đã tin tưởng 
            và hài lòng với dịch vụ của chúng tôi
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-blue-200">
              <Quote size={48} />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="text-6xl mr-4">
                  {filteredTestimonials[currentIndex]?.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {filteredTestimonials[currentIndex]?.name}
                  </h3>
                  <p className="text-gray-600">
                    {filteredTestimonials[currentIndex]?.position}
                  </p>
                  <p className="text-blue-600 font-medium">
                    {filteredTestimonials[currentIndex]?.organization}
                  </p>
                </div>
                {filteredTestimonials[currentIndex]?.video && (
                  <div className="ml-auto">
                    <button
                      onClick={() => toggleVideo(filteredTestimonials[currentIndex].id)}
                      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300"
                    >
                      <Play size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(filteredTestimonials[currentIndex]?.rating || 5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "{filteredTestimonials[currentIndex]?.content}"
              </blockquote>

              {/* Highlight */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-800 font-semibold">
                  ✨ {filteredTestimonials[currentIndex]?.highlight}
                </p>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredTestimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                "{testimonial.content.substring(0, 120)}..."
              </p>
              
              <div className="text-xs text-blue-600 font-medium">
                {testimonial.organization}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Tham Gia Cộng Đồng Hài Lòng
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Hơn 50,000 người dùng đã tin tưởng. Bạn sẽ là người tiếp theo?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Bắt Đầu Miễn Phí
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Xem Thêm Đánh Giá
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
