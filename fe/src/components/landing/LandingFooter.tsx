import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Github,
  ArrowRight,
  Shield,
  Award,
  Users,
  Globe
} from 'lucide-react';

const footerSections = [
  {
    title: 'Sản Phẩm',
    links: [
      { name: 'Hệ thống Blockchain', href: '#features' },
      { name: 'API Documentation', href: '#api' },
      { name: 'Mobile App', href: '#mobile' },
      { name: 'Tích hợp Enterprise', href: '#enterprise' },
      { name: 'Bảng giá', href: '#pricing' }
    ]
  },
  {
    title: 'Đối Tượng',
    links: [
      { name: 'Sinh viên', href: '#students' },
      { name: 'Trường học', href: '#schools' },
      { name: 'Nhà tuyển dụng', href: '#recruiters' },
      { name: 'Cơ quan xác thực', href: '#verifiers' },
      { name: 'Nhà phát triển', href: '#developers' }
    ]
  },
  {
    title: 'Tài Nguyên',
    links: [
      { name: 'Trung tâm trợ giúp', href: '#help' },
      { name: 'Blog & Tin tức', href: '#blog' },
      { name: 'Webinar', href: '#webinars' },
      { name: 'Case Studies', href: '#cases' },
      { name: 'White Papers', href: '#papers' }
    ]
  },
  {
    title: 'Công Ty',
    links: [
      { name: 'Về chúng tôi', href: '#about' },
      { name: 'Nghề nghiệp', href: '#careers' },
      { name: 'Đối tác', href: '#partners' },
      { name: 'Báo chí', href: '#press' },
      { name: 'Liên hệ', href: '#contact' }
    ]
  }
];

const socialLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Youtube, href: '#', name: 'YouTube' },
  { icon: Github, href: '#', name: 'GitHub' }
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@blockchainacademicrecords.vn',
    href: 'mailto:contact@blockchainacademicrecords.vn'
  },
  {
    icon: Phone,
    label: 'Điện thoại',
    value: '+84 24 3933 4567',
    href: 'tel:+842439334567'
  },
  {
    icon: MapPin,
    label: 'Địa chỉ',
    value: '123 Nguyễn Văn Cừ, Ba Đình, Hà Nội',
    href: '#'
  }
];

const certifications = [
  { icon: Shield, text: 'ISO 27001' },
  { icon: Award, text: 'SOC 2 Type II' },
  { icon: Users, text: 'GDPR Compliant' },
  { icon: Globe, text: 'Global Standards' }
];

const stats = [
  { value: '50,000+', label: 'Người dùng' },
  { value: '200+', label: 'Trường học' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Hỗ trợ' }
];

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Top Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Blockchain Academic Records
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Nền tảng bảo vệ và xác thực hồ sơ học tập hàng đầu Việt Nam, 
                  sử dụng công nghệ blockchain tiên tiến để đảm bảo tính minh bạch 
                  và bảo mật tuyệt đối.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center bg-gray-800 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-400">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert, index) => {
                    const IconComponent = cert.icon;
                    return (
                      <div key={index} className="flex items-center bg-gray-800 px-3 py-2 rounded-lg">
                        <IconComponent size={16} className="text-green-400 mr-2" />
                        <span className="text-xs text-gray-300">{cert.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold mb-6 text-blue-300">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                        >
                          {link.name}
                          <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Newsletter Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-blue-300">
                  Thông Tin Liên Hệ
                </h4>
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <a
                        key={index}
                        href={contact.href}
                        className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group"
                      >
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500 transition-colors duration-300">
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">{contact.label}</div>
                          <div className="font-medium">{contact.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-blue-300">
                  Nhận Thông Tin Mới Nhất
                </h4>
                <p className="text-gray-300 mb-6">
                  Đăng ký nhận newsletter để cập nhật các tính năng mới, 
                  tin tức ngành và insights về công nghệ blockchain trong giáo dục.
                </p>
                <form className="space-y-4">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Nhập email của bạn"
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-300 flex items-center"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter-consent"
                      className="mr-2 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="newsletter-consent" className="text-sm text-gray-400">
                      Tôi đồng ý nhận email marketing từ Blockchain Academic Records
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Legal */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Social Links */}
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <span className="text-gray-400 text-sm">Theo dõi chúng tôi:</span>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.name}
                      className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <a href="#privacy" className="hover:text-white transition-colors duration-300">
                  Chính sách bảo mật
                </a>
                <a href="#terms" className="hover:text-white transition-colors duration-300">
                  Điều khoản sử dụng
                </a>
                <a href="#cookies" className="hover:text-white transition-colors duration-300">
                  Chính sách Cookie
                </a>
                <a href="#security" className="hover:text-white transition-colors duration-300">
                  Bảo mật
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <div>
                © 2024 Blockchain Academic Records. Tất cả quyền được bảo lưu.
              </div>
              <div className="mt-2 md:mt-0">
                Được phát triển với ❤️ tại Việt Nam
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
