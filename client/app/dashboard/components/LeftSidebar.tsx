'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  Settings, 
  FileText, 
  Users, 
  LogOut,
  Menu,
  X,
  LucideIcon
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: string | number;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
  { icon: Users, label: 'Projects', path: '/dashboard/projects' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function LeftSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative
                ${isActive 
                  ? 'bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/30' 
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gradient-to-r from-[#34D399]/20 to-transparent rounded-xl border border-[#34D399]/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-[#34D399] text-[#071428] text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <div className="glass rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#34D399] to-[#38BDF8] flex items-center justify-center">
              <span className="text-[#071428] font-bold text-sm">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">
                {user?.name}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-[#E85A4F]/20 hover:text-[#E85A4F] transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-22 w-64 h-[calc(97vh-4rem)] flex-col bg-midnight border-r border-white/10 overflow-hidden z-40">
        {SidebarContent()}
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-midnight border-b border-white/10 p-4 flex items-center justify-end">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-midnight border-r border-white/10 z-50 lg:hidden">
            {SidebarContent()}
          </aside>
        </>
      )}
    </>
  );
}
