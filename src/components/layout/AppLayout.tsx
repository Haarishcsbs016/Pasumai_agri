
import React from 'react';
import Sidebar from './Sidebar';
import BottomNavbar from './BottomNavbar';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 md:ml-64 overflow-auto pb-16 md:pb-0">
        <main className="h-full max-w-7xl mx-auto px-4 py-4 md:py-6">
          {children}
        </main>
      </div>
      
      <BottomNavbar />
    </div>
  );
};

export default AppLayout;
