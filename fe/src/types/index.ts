export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'institution' | 'student';
  walletAddress?: string;
  avatar?: string;
}

export interface Institution {
  id: string;
  name: string;
  type: 'university' | 'college' | 'high-school';
  address: string;
  verified: boolean;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  studentName: string;
  institutionId: string;
  institutionName: string;
  degree: string;
  major: string;
  gpa: number;
  graduationDate: string;
  certificateHash: string;
  transactionHash?: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  recordId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  verified: boolean;
  qrCode?: string;
}

export interface BlockchainTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  timestamp: string;
  status: 'pending' | 'success' | 'failed';
}

export interface DashboardStats {
  totalRecords: number;
  verifiedRecords: number;
  pendingRecords: number;
  totalInstitutions: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'record_created' | 'record_verified' | 'certificate_uploaded';
  description: string;
  timestamp: string;
  user: string;
}

export interface QRScanResult {
  recordId: string;
  valid: boolean;
  message: string;
  data?: AcademicRecord;
}

export interface WalletState {
  isConnected: boolean;
  address?: string;
  balance?: string;
  network?: string;
  chainId?: number;
}