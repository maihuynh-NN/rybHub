import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/common/layout/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';


const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Placeholder routes for future sprints */}
            
            <Route path="/apartments" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Apartments Page - Coming in Sprint 2</div>
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/maintenance" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Maintenance Page - Coming in Sprint 3</div>
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/billing" element={
              <ProtectedRoute requiredRoles={['admin', 'privileged']}>
                <MainLayout>
                  <div>Billing Page - Coming in Sprint 3</div>
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/customers" element={
              <ProtectedRoute requiredRoles={['admin', 'privileged']}>
                <MainLayout>
                  <div>Customers Page - Coming in Sprint 6</div>
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Profile Page - Coming in Sprint 4</div>
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
