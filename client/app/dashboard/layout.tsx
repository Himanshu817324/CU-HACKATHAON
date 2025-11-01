'use client';

import { ReactNode } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import LeftSidebar from './components/LeftSidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 pt-16 h-[calc(100vh-4rem)]">
          <LeftSidebar />
          <main className="flex-1 lg:pl-64 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
