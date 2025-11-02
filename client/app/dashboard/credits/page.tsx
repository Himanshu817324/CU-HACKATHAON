'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Coins, Sparkles, TrendingUp, Clock, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CreditsModal from '@/components/CreditsModal';
import CreditBadge from '@/components/CreditBadge';

export default function CreditsPage() {
  const { user } = useAuth();
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);

  // Mock usage history
  const usageHistory = [
    { id: 1, type: 'Website Analysis', credits: -5, date: '2 hours ago', description: 'Analyzed google.com' },
    { id: 2, type: 'GitHub Analysis', credits: -10, date: '1 day ago', description: 'Analyzed facebook/react' },
    { id: 3, type: 'Purchase', credits: 100, date: '3 days ago', description: 'Purchased 100 credits package' },
    { id: 4, type: 'Website Analysis', credits: -5, date: '4 days ago', description: 'Analyzed example.com' },
    { id: 5, type: 'Website Analysis', credits: -5, date: '5 days ago', description: 'Analyzed demo.com' },
    { id: 6, type: 'GitHub Analysis', credits: -10, date: '1 week ago', description: 'Analyzed vercel/next.js' },
  ];

  const stats = [
    { label: 'Total Credits Used', value: 35, icon: TrendingUp, color: '#38BDF8' },
    { label: 'Credits Remaining', value: user?.credits || 0, icon: Coins, color: '#FACC15' },
    { label: 'Analyses Completed', value: 5, icon: FileText, color: '#34D399' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#FACC15] to-[#34D399] bg-clip-text text-transparent">
              Credits & Usage
            </h1>
            <p className="text-xl text-text-secondary">
              Manage your credits and view usage history
            </p>
          </div>
          {user && <CreditBadge credits={user.credits} showLabel />}
        </div>
        
        {/* Animated eco-glow line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#FACC15] to-transparent rounded-full"
        />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-opacity-30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}20` }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: stat.color }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Get More Credits CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-8 border border-white/10 bg-gradient-to-br from-accent/10 to-primary/10 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FACC15] to-[#34D399] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#071428]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Need More Credits?</h3>
              <p className="text-text-secondary">
                Purchase credits to continue your sustainability journey
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCreditsModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-[#FACC15] to-[#34D399] text-[#071428] font-bold rounded-2xl hover:shadow-lg hover:shadow-[#FACC15]/30 transition-all"
          >
            Get More Credits
          </motion.button>
        </div>
      </motion.div>

      {/* Usage History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-[#34D399]" />
          <h3 className="text-xl font-bold">Usage History</h3>
        </div>
        <div className="space-y-4">
          {usageHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl glass border border-white/10 hover:border-opacity-30 transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.credits > 0 ? 'bg-success/20' : 'bg-primary/20'
                }`}>
                  <Coins className={`w-5 h-5 ${
                    item.credits > 0 ? 'text-success' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary mb-1">{item.type}</p>
                  <p className="text-sm text-text-secondary truncate">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    item.credits > 0 ? 'text-success' : 'text-danger'
                  }`}>
                    {item.credits > 0 ? '+' : ''}{item.credits}
                  </p>
                  <p className="text-xs text-text-secondary">{item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Credits Modal */}
      <CreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
    </div>
  );
}

