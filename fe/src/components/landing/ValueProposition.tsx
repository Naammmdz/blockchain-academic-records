import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Zap, Globe, CheckCircle } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'Giả mạo bằng cấp',
      description: 'Khó phát hiện bằng cấp giả, gây thiệt hại cho cả người sử dụng và nhà tuyển dụng'
    },
    {
      icon: AlertTriangle,
      title: 'Xác thực phức tạp',
      description: 'Quy trình xác minh bằng cấp tốn thời gian và chi phí cao'
    },
    {
      icon: AlertTriangle,
      title: 'Mất mát hồ sơ',
      description: 'Hồ sơ giấy dễ bị thất lạc, hư hỏng hoặc mất mát vĩnh viễn'
    }
  ];

  const solutions = [
    {
      icon: Shield,
      title: 'Bảo mật tuyệt đối',
      description: 'Công nghệ blockchain đảm bảo dữ liệu không thể bị thay đổi hoặc giả mạo',
      color: 'blue'
    },
    {
      icon: CheckCircle,
      title: 'Minh bạch hoàn toàn',
      description: 'Mọi giao dịch và thay đổi đều được ghi lại và có thể kiểm tra',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Xác thực tức thì',
      description: 'Quét QR code để xác minh bằng cấp trong vài giây',
      color: 'orange'
    },
    {
      icon: Globe,
      title: 'Truy cập toàn cầu',
      description: 'Hồ sơ có thể được truy cập và xác thực từ bất kỳ đâu trên thế giới',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Giải Pháp Cho Thách Thức{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Giáo Dục Số
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi hiểu những thách thức trong quản lý và xác thực hồ sơ học tập. 
            Blockchain là câu trả lời cho tương lai giáo dục minh bạch và bảo mật.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
                ⚠️ Thách thức hiện tại
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Những Vấn Đề Cần Giải Quyết
              </h3>
            </div>

            <div className="space-y-6">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-red-100"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <problem.icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {problem.title}
                    </h4>
                    <p className="text-gray-600">
                      {problem.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                ✨ Giải pháp của chúng tôi
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Blockchain Giải Quyết Tất Cả
              </h3>
            </div>

            <div className="grid gap-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(solution.color)}`}>
                      <solution.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {solution.title}
                      </h4>
                      <p className="text-gray-600">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Sẵn sàng chuyển đổi số hồ sơ học tập?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Tham gia cùng hàng trăm trường học và tổ chức đã tin tưởng sử dụng giải pháp của chúng tôi
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
