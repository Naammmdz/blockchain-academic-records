import { create } from 'zustand';
import { User, AcademicRecord, Institution, WalletState, DashboardStats, Activity } from '../types';
import { mockUser, mockRecords, mockInstitutions, mockActivities, mockDashboardStats } from '../utils/mockData';

// Mock transactions data
const mockTransactions = [
  {
    id: 'tx_1',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    type: 'Record Verification',
    amount: '0.001 ETH',
    timestamp: '2023-12-22T10:30:00Z',
    status: 'confirmed'
  },
  {
    id: 'tx_2',
    hash: '0xbcdef12345678901bcdef12345678901bcdef12345678901bcdef12345678901',
    type: 'Certificate Upload',
    amount: '0.002 ETH',
    timestamp: '2023-12-20T14:45:00Z',
    status: 'confirmed'
  },
  {
    id: 'tx_3',
    hash: '0xcdef123456789012cdef123456789012cdef123456789012cdef123456789012',
    type: 'Institution Verification',
    amount: '0.005 ETH',
    timestamp: '2023-12-18T09:15:00Z',
    status: 'pending'
  }
];

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Wallet state
  wallet: WalletState;
  setWallet: (wallet: WalletState) => void;
  
  // Records state
  records: AcademicRecord[];
  setRecords: (records: AcademicRecord[]) => void;
  addRecord: (record: AcademicRecord) => void;
  updateRecord: (id: string, updates: Partial<AcademicRecord>) => void;
  
  // Institutions state
  institutions: Institution[];
  setInstitutions: (institutions: Institution[]) => void;
  
  // Transactions state
  transactions: any[];
  setTransactions: (transactions: any[]) => void;
  
  // Activities state
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  
  // Dashboard stats
  dashboardStats: DashboardStats | null;
  setDashboardStats: (stats: DashboardStats) => void;
  
  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // User state
  user: mockUser,
  setUser: (user: User | null) => set({ user }),
  
  // Wallet state
  wallet: {
    isConnected: false,
  },
  setWallet: (wallet: WalletState) => set({ wallet }),
  
  // Records state
  records: mockRecords,
  setRecords: (records: AcademicRecord[]) => set({ records }),
  addRecord: (record: AcademicRecord) => set((state) => ({ 
    records: [record, ...state.records] 
  })),
  updateRecord: (id: string, updates: Partial<AcademicRecord>) => set((state) => ({
    records: state.records.map(record => 
      record.id === id ? { ...record, ...updates } : record
    )
  })),
  
  // Institutions state
  institutions: mockInstitutions,
  setInstitutions: (institutions: Institution[]) => set({ institutions }),
  
  // Transactions state
  transactions: mockTransactions,
  setTransactions: (transactions: any[]) => set({ transactions }),
  
  // Activities state
  activities: mockActivities,
  setActivities: (activities: Activity[]) => set({ activities }),
  
  // Dashboard stats
  dashboardStats: mockDashboardStats,
  setDashboardStats: (dashboardStats: DashboardStats) => set({ dashboardStats }),
  
  // UI state
  sidebarOpen: true,
  setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
  
  // Loading states
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));