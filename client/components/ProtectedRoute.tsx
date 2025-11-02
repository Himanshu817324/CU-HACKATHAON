'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && requiredRole && user.role !== requiredRole) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#34D399]/30 border-t-[#34D399] rounded-full animate-spin mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
