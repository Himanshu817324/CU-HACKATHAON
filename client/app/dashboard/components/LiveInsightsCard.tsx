'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award } from 'lucide-react';

export default function LiveInsightsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6 border border-white/10"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">Live Insights</h3>
        <p className="text-sm text-text-secondary">Real-time updates</p>
      </div>

      {/* This Week Stats */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#34D399]" />
          <h4 className="font-semibold">This Week</h4>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">CO₂ Saved</span>
            <span className="text-[#34D399] font-bold">1.2 kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Optimizations</span>
            <span className="text-[#38BDF8] font-bold">18</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Projects</span>
            <span className="text-[#FACC15] font-bold">12</span>
          </div>
        </div>
      </div>

      {/* Eco Champion Section */}
      <div className="glass rounded-xl p-4 border border-white/10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#34D399]/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-[#34D399]" />
          </div>
          <div className="flex-1">
            <h5 className="font-semibold text-sm mb-1">Eco Champion</h5>
            <p className="text-xs text-text-secondary">
              You've reduced emissions by 24% this month
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
