import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { ErrorBoundary, NotificationContainer } from './components/common';
import { useNotifications } from './hooks';
import {
  Landing,
  Dashboard,
  Records,
  Verification,
  Institutions,
  Wallet,
  Profile,
  Settings
} from './pages';
import { useStore } from './store';

const App: React.FC = () => {
  const { user } = useStore();
  const { notifications, removeNotification } = useNotifications();

  // Mock authentication check - in a real app, this would be more sophisticated
  const isAuthenticated = !!user;

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {isAuthenticated ? (
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/records" element={<Records />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/institutions" element={<Institutions />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>          ) : (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
          
          {/* Global Notifications */}
          <NotificationContainer
            notifications={notifications}
            onRemove={removeNotification}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

// Simple login page component
const LoginPage: React.FC = () => {
  const { setUser } = useStore();
  
  const handleLogin = () => {
    // Mock login - in a real app, this would authenticate with a backend
    setUser({
      id: '1',
      name: 'Nguyễn Văn Admin',
      email: 'admin@example.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      walletAddress: '0x742d35Cc6634C0532925a3b8D45C6F1e4A8e5469'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center mb-6">
            <a 
              href="/"
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              ← Quay lại trang chủ
            </a>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng Nhập Hệ Thống
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Blockchain Academic Records Management
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                defaultValue="admin@example.com"
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                defaultValue="password"
              />
            </div>
          </div>

          <div>            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Đăng Nhập
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Demo: admin@example.com / password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
