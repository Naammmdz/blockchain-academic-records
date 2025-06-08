import { AcademicRecord, Institution, User, DashboardStats, Activity } from '../types';

export const mockInstitutions: Institution[] = [
  {
    id: 'inst_1',
    name: 'Đại học Bách khoa Hà Nội',
    type: 'university',
    address: 'Hà Nội, Việt Nam',
    verified: true,
  },
  {
    id: 'inst_2', 
    name: 'Đại học Kinh tế Quốc dân',
    type: 'university',
    address: 'Hà Nội, Việt Nam',
    verified: true,
  },
  {
    id: 'inst_3',
    name: 'Đại học FPT',
    type: 'university', 
    address: 'Hà Nội, Việt Nam',
    verified: true,
  },
  {
    id: 'inst_4',
    name: 'Trường THPT Chu Văn An',
    type: 'high-school',
    address: 'Hà Nội, Việt Nam',
    verified: true,
  },
  {
    id: 'inst_5',
    name: 'Trường THPT Lê Quý Đôn',
    type: 'high-school',
    address: 'Hà Nội, Việt Nam',
    verified: false,
  },
];

export const mockRecords: AcademicRecord[] = [
  {
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
  },
  {
    id: 'rec_2',
    studentId: 'SV002',
    studentName: 'Trần Thị Bình',
    institutionId: 'inst_2',
    institutionName: 'Đại học Kinh tế Quốc dân',
    degree: 'Thạc sĩ',
    major: 'Quản trị Kinh doanh',
    gpa: 3.9,
    graduationDate: '2023-08-20',
    certificateHash: '0x2345678901bcdef12345678901bcdef123456789',
    transactionHash: '0xbcdef12345678901bcdef12345678901bcdef12345678901bcdef12345678901',
    status: 'verified',
    createdAt: '2023-08-25T09:15:00Z',
    updatedAt: '2023-08-30T16:45:00Z',
  },
  {
    id: 'rec_3',
    studentId: 'SV003',
    studentName: 'Lê Văn Cường',
    institutionId: 'inst_3',
    institutionName: 'Đại học FPT',
    degree: 'Cử nhân',
    major: 'Khoa học Máy tính',
    gpa: 3.7,
    graduationDate: '2023-09-10',
    certificateHash: '0x3456789012cdef123456789012cdef1234567890',
    status: 'pending',
    createdAt: '2023-09-15T11:20:00Z',
    updatedAt: '2023-09-15T11:20:00Z',
  },
  {
    id: 'rec_4',
    studentId: 'HS001',
    studentName: 'Phạm Thị Dung',
    institutionId: 'inst_4',
    institutionName: 'Trường THPT Chu Văn An',
    degree: 'Tốt nghiệp THPT',
    major: 'Khối A',
    gpa: 8.5,
    graduationDate: '2023-05-30',
    certificateHash: '0x456789013def12345678903def12345678901a',
    transactionHash: '0xcdef123456789012cdef123456789012cdef123456789012cdef123456789012',
    status: 'verified',
    createdAt: '2023-06-05T08:30:00Z',
    updatedAt: '2023-06-10T12:00:00Z',
  },
  {
    id: 'rec_5',
    studentId: 'SV004',
    studentName: 'Hoàng Văn Em',
    institutionId: 'inst_1',
    institutionName: 'Đại học Bách khoa Hà Nội',
    degree: 'Thạc sĩ',
    major: 'Điện tử Viễn thông',
    gpa: 3.6,
    graduationDate: '2023-12-15',
    certificateHash: '0x56789014ef123456789014ef123456789012b',
    status: 'pending',
    createdAt: '2023-12-20T14:45:00Z',
    updatedAt: '2023-12-20T14:45:00Z',
  }
];

export const mockUser: User = {
  id: 'user_1',
  name: 'Quản trị viên',
  email: 'admin@blockchain-records.com',
  role: 'admin',
  walletAddress: '0x742d35Cc6634C0532925a3b8D45C6F1e4A8e5469',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

export const mockActivities: Activity[] = [
  {
    id: 'act_1',
    type: 'record_verified',
    description: 'Hồ sơ của Nguyễn Văn Anh đã được xác thực',
    timestamp: '2023-12-22T10:30:00Z',
    user: 'Quản trị viên'
  },
  {
    id: 'act_2',
    type: 'record_created',
    description: 'Hồ sơ mới của Hoàng Văn Em đã được tạo',
    timestamp: '2023-12-20T14:45:00Z',
    user: 'Đại học Bách khoa Hà Nội'
  },
  {
    id: 'act_3',
    type: 'certificate_uploaded',
    description: 'Bằng tốt nghiệp của Trần Thị Bình đã được tải lên',
    timestamp: '2023-12-18T09:15:00Z',
    user: 'Đại học Kinh tế Quốc dân'
  },
  {
    id: 'act_4',
    type: 'record_verified',
    description: 'Hồ sơ của Phạm Thị Dung đã được xác thực',
    timestamp: '2023-12-15T16:20:00Z',
    user: 'Quản trị viên'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalRecords: 20,
  verifiedRecords: 15,
  pendingRecords: 5,
  totalInstitutions: 5,
  recentActivity: mockActivities
};

// Generate transaction hashes
export const generateTransactionHash = (): string => {
  return '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

// Generate certificate hash
export const generateCertificateHash = (): string => {
  return '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
};
